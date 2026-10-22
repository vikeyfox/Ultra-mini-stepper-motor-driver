#include "ums_driver.h"

#include <string.h>

#include "ums_regs.h"

#define UMS_DEFAULT_TOFF 4u
#define UMS_DEFAULT_IHOLDDELAY 8u
#define UMS_DEFAULT_TPOWERDOWN 20u
#define UMS_SENSE_RESISTOR_MOHM 110u

static bool port_ready(const ums_port_t *port)
{
    return port != NULL && port->spi_transfer != NULL && port->cs_set != NULL;
}

static ums_err_t ums_transfer(ums_driver_t *drv, const uint8_t *tx, uint8_t *rx)
{
    drv->port.cs_set(drv->port.ctx, true);
    int rc = drv->port.spi_transfer(drv->port.ctx, tx, rx, UMS_FRAME_LEN);
    drv->port.cs_set(drv->port.ctx, false);

    return rc == 0 ? UMS_OK : UMS_ERR_SPI;
}

ums_err_t ums_init(ums_driver_t *drv, const ums_port_t *port, const ums_config_t *cfg)
{
    if (drv == NULL || cfg == NULL || !port_ready(port)) {
        return UMS_ERR_INVALID_ARG;
    }
    if (cfg->address > UMS_ADDR_MASK || ums_mres_from_microsteps(cfg->microsteps) < 0) {
        return UMS_ERR_INVALID_ARG;
    }

    memset(drv, 0, sizeof(*drv));
    drv->port = *port;
    drv->cfg = *cfg;
    drv->enabled = false;

    if (drv->port.en_set != NULL) {
        drv->port.en_set(drv->port.ctx, false);
    }

    return UMS_OK;
}

ums_err_t ums_write_reg(ums_driver_t *drv, uint8_t reg, uint32_t value)
{
    if (drv == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    uint8_t frame[UMS_FRAME_LEN];
    ums_reg_build_write_frame(reg, value, frame);

    return ums_transfer(drv, frame, NULL);
}

ums_err_t ums_read_reg(ums_driver_t *drv, uint8_t reg, uint32_t *value)
{
    if (drv == NULL || value == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    uint8_t tx[UMS_FRAME_LEN];
    uint8_t rx[UMS_FRAME_LEN];

    ums_reg_build_read_frame(reg, tx);
    ums_err_t err = ums_transfer(drv, tx, rx);
    if (err != UMS_OK) {
        return err;
    }

    *value = ums_reg_parse_value(rx);
    return UMS_OK;
}

ums_err_t ums_apply_config(ums_driver_t *drv)
{
    if (drv == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    int mres = ums_mres_from_microsteps(drv->cfg.microsteps);
    if (mres < 0) {
        return UMS_ERR_INVALID_ARG;
    }

    drv->chopconf = ((uint32_t)UMS_DEFAULT_TOFF << UMS_CHOPCONF_TOFF_SHIFT) |
                    ((uint32_t)mres << UMS_CHOPCONF_MRES_SHIFT);

    uint8_t irun = ums_current_cs(drv->cfg.run_current_ma, UMS_SENSE_RESISTOR_MOHM);
    uint8_t ihold = ums_current_cs(drv->cfg.hold_current_ma, UMS_SENSE_RESISTOR_MOHM);
    drv->ihold_irun = (UMS_DEFAULT_IHOLDDELAY << UMS_IHOLD_IRUN_IHOLDDELAY_SHIFT) |
                      ((uint32_t)irun << UMS_IHOLD_IRUN_IRUN_SHIFT) |
                      ((uint32_t)ihold << UMS_IHOLD_IRUN_IHOLD_SHIFT);

    ums_err_t err = ums_write_reg(drv, UMS_REG_CHOPCONF, drv->chopconf);
    if (err != UMS_OK) {
        return err;
    }
    err = ums_write_reg(drv, UMS_REG_IHOLD_IRUN, drv->ihold_irun);
    if (err != UMS_OK) {
        return err;
    }
    err = ums_write_reg(drv, UMS_REG_TPOWERDOWN, UMS_DEFAULT_TPOWERDOWN);
    if (err != UMS_OK) {
        return err;
    }

    return ums_write_reg(drv, UMS_REG_GCONF, drv->enabled ? UMS_GCONF_EN : 0u);
}

ums_err_t ums_set_microsteps(ums_driver_t *drv, uint16_t microsteps)
{
    if (drv == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    int mres = ums_mres_from_microsteps(microsteps);
    if (mres < 0) {
        return UMS_ERR_INVALID_ARG;
    }

    drv->cfg.microsteps = microsteps;
    drv->chopconf &= ~(UMS_CHOPCONF_MRES_MASK << UMS_CHOPCONF_MRES_SHIFT);
    drv->chopconf |= (uint32_t)mres << UMS_CHOPCONF_MRES_SHIFT;

    return ums_write_reg(drv, UMS_REG_CHOPCONF, drv->chopconf);
}

ums_err_t ums_set_current(ums_driver_t *drv, uint16_t run_ma, uint16_t hold_ma)
{
    if (drv == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    drv->cfg.run_current_ma = run_ma;
    drv->cfg.hold_current_ma = hold_ma;

    uint8_t irun = ums_current_cs(run_ma, UMS_SENSE_RESISTOR_MOHM);
    uint8_t ihold = ums_current_cs(hold_ma, UMS_SENSE_RESISTOR_MOHM);

    drv->ihold_irun &= ~(0x1Fu | (0x1Fu << UMS_IHOLD_IRUN_IRUN_SHIFT));
    drv->ihold_irun |= ((uint32_t)irun << UMS_IHOLD_IRUN_IRUN_SHIFT) |
                       ((uint32_t)ihold << UMS_IHOLD_IRUN_IHOLD_SHIFT);

    return ums_write_reg(drv, UMS_REG_IHOLD_IRUN, drv->ihold_irun);
}

ums_err_t ums_enable(ums_driver_t *drv, bool enable)
{
    if (drv == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    if (drv->port.en_set != NULL) {
        drv->port.en_set(drv->port.ctx, enable);
    }
    drv->enabled = enable;

    return ums_write_reg(drv, UMS_REG_GCONF, enable ? UMS_GCONF_EN : 0u);
}

ums_err_t ums_step(ums_driver_t *drv, uint32_t steps, ums_direction_t dir, uint32_t pulse_us)
{
    if (drv == NULL || drv->port.step_set == NULL || drv->port.delay_us == NULL) {
        return UMS_ERR_INVALID_ARG;
    }

    if (drv->port.dir_set != NULL) {
        bool level = (dir == UMS_DIR_REVERSE);
        drv->port.dir_set(drv->port.ctx, drv->cfg.invert_dir ? !level : level);
    }

    for (uint32_t i = 0; i < steps; ++i) {
        drv->port.step_set(drv->port.ctx, true);
        drv->port.delay_us(drv->port.ctx, pulse_us);
        drv->port.step_set(drv->port.ctx, false);
        drv->port.delay_us(drv->port.ctx, pulse_us);
    }

    return UMS_OK;
}
