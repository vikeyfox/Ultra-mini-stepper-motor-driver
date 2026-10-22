#include "test_harness.h"

#include <string.h>

#include "mock_port.h"
#include "ums_driver.h"
#include "ums_regs.h"

static void make_config(ums_config_t *cfg)
{
    memset(cfg, 0, sizeof(*cfg));
    cfg->address = 0;
    cfg->microsteps = 16;
    cfg->run_current_ma = 800;
    cfg->hold_current_ma = 400;
    cfg->invert_dir = false;
}

static ums_err_t init_driver(ums_driver_t *drv, ums_port_t *port, const ums_config_t *cfg)
{
    mock_port_init(port);
    return ums_init(drv, port, cfg);
}

UMS_TEST(init_rejects_invalid_args)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    mock_port_init(&port);

    UMS_CHECK_EQ(ums_init(NULL, &port, &cfg), UMS_ERR_INVALID_ARG);
    UMS_CHECK_EQ(ums_init(&drv, NULL, &cfg), UMS_ERR_INVALID_ARG);

    ums_port_t empty_port;
    memset(&empty_port, 0, sizeof(empty_port));
    UMS_CHECK_EQ(ums_init(&drv, &empty_port, &cfg), UMS_ERR_INVALID_ARG);

    cfg.microsteps = 3;
    UMS_CHECK_EQ(ums_init(&drv, &port, &cfg), UMS_ERR_INVALID_ARG);

    make_config(&cfg);
    cfg.address = 200;
    UMS_CHECK_EQ(ums_init(&drv, &port, &cfg), UMS_ERR_INVALID_ARG);
}

UMS_TEST(apply_config_writes_expected_registers)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);
    UMS_CHECK_EQ(ums_apply_config(&drv), UMS_OK);

    uint32_t chopconf = mock_reg_get(UMS_REG_CHOPCONF);
    uint32_t mres = (chopconf >> UMS_CHOPCONF_MRES_SHIFT) & UMS_CHOPCONF_MRES_MASK;
    UMS_CHECK_EQ(mres, 4); /* 16 细分 */
    UMS_CHECK_EQ(chopconf & UMS_CHOPCONF_TOFF_MASK, 4);

    UMS_CHECK_EQ(mock_reg_get(UMS_REG_TPOWERDOWN), 20);
    UMS_CHECK_EQ(mock_reg_get(UMS_REG_GCONF), 0);

    uint32_t ihold_irun = mock_reg_get(UMS_REG_IHOLD_IRUN);
    uint32_t irun = (ihold_irun >> UMS_IHOLD_IRUN_IRUN_SHIFT) & 0x1F;
    uint32_t ihold = (ihold_irun >> UMS_IHOLD_IRUN_IHOLD_SHIFT) & 0x1F;
    UMS_CHECK_TRUE(irun > 0 && irun <= 31);
    UMS_CHECK_TRUE(ihold > 0 && ihold <= 31);
    UMS_CHECK_TRUE(irun > ihold);
    UMS_CHECK_EQ((ihold_irun >> UMS_IHOLD_IRUN_IHOLDDELAY_SHIFT) & 0x0F, 8);
}

UMS_TEST(set_microsteps_updates_chopconf)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);
    UMS_CHECK_EQ(ums_apply_config(&drv), UMS_OK);

    const uint16_t valid[] = {1, 2, 4, 8, 16, 32, 64, 128, 256};
    const uint32_t expected_mres[] = {8, 7, 6, 5, 4, 3, 2, 1, 0};

    for (size_t i = 0; i < sizeof(valid) / sizeof(valid[0]); ++i) {
        UMS_CHECK_EQ(ums_set_microsteps(&drv, valid[i]), UMS_OK);
        uint32_t mres = (mock_reg_get(UMS_REG_CHOPCONF) >> UMS_CHOPCONF_MRES_SHIFT) &
                        UMS_CHOPCONF_MRES_MASK;
        UMS_CHECK_EQ(mres, expected_mres[i]);
        UMS_CHECK_EQ(ums_mres_from_microsteps(valid[i]), (int)expected_mres[i]);
    }

    UMS_CHECK_EQ(ums_set_microsteps(&drv, 3), UMS_ERR_INVALID_ARG);
    UMS_CHECK_EQ(ums_set_microsteps(&drv, 512), UMS_ERR_INVALID_ARG);
    UMS_CHECK_EQ(ums_mres_from_microsteps(0), -1);
}

UMS_TEST(set_current_clamps_to_valid_cs_range)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);

    UMS_CHECK_EQ(ums_set_current(&drv, 0, 0), UMS_OK);
    UMS_CHECK_EQ(mock_reg_get(UMS_REG_IHOLD_IRUN) & 0x1F, 0);

    UMS_CHECK_EQ(ums_set_current(&drv, 6000, 6000), UMS_OK);
    uint32_t irun = (mock_reg_get(UMS_REG_IHOLD_IRUN) >> UMS_IHOLD_IRUN_IRUN_SHIFT) & 0x1F;
    UMS_CHECK_EQ(irun, 31);

    UMS_CHECK_TRUE(ums_current_cs(1200, 110) >= ums_current_cs(400, 110));
    UMS_CHECK_EQ(ums_current_cs(0, 110), 0);
    UMS_CHECK_EQ(ums_current_cs(6000, 110), 31);
}

UMS_TEST(read_back_register_value)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;
    uint32_t value = 0;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);

    mock_reg_set(UMS_REG_DRV_STATUS, 0xDEADBEEFu);
    UMS_CHECK_EQ(ums_read_reg(&drv, UMS_REG_DRV_STATUS, &value), UMS_OK);
    UMS_CHECK_EQ(value, 0xDEADBEEFu);

    UMS_CHECK_EQ(ums_read_reg(&drv, UMS_REG_DRV_STATUS, NULL), UMS_ERR_INVALID_ARG);
}

UMS_TEST(enable_drives_pin_and_gconf)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);

    UMS_CHECK_EQ(ums_enable(&drv, true), UMS_OK);
    UMS_CHECK_EQ(mock_en_level(), 1);
    UMS_CHECK_EQ(mock_reg_get(UMS_REG_GCONF) & UMS_GCONF_EN, UMS_GCONF_EN);

    UMS_CHECK_EQ(ums_enable(&drv, false), UMS_OK);
    UMS_CHECK_EQ(mock_en_level(), 0);
    UMS_CHECK_EQ(mock_reg_get(UMS_REG_GCONF) & UMS_GCONF_EN, 0);
}

UMS_TEST(step_generates_pulses_and_direction)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);

    UMS_CHECK_EQ(ums_step(&drv, 10, UMS_DIR_FORWARD, 5), UMS_OK);
    UMS_CHECK_EQ(mock_step_toggles(), 20);
    UMS_CHECK_EQ(mock_dir_level(), 0);

    UMS_CHECK_EQ(ums_step(&drv, 3, UMS_DIR_REVERSE, 5), UMS_OK);
    UMS_CHECK_EQ(mock_step_toggles(), 26);
    UMS_CHECK_EQ(mock_dir_level(), 1);

    cfg.invert_dir = true;
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);
    UMS_CHECK_EQ(ums_step(&drv, 1, UMS_DIR_REVERSE, 5), UMS_OK);
    UMS_CHECK_EQ(mock_dir_level(), 0);
}

UMS_TEST(spi_failure_is_propagated)
{
    ums_port_t port;
    ums_driver_t drv;
    ums_config_t cfg;

    make_config(&cfg);
    UMS_CHECK_EQ(init_driver(&drv, &port, &cfg), UMS_OK);

    mock_spi_fail(1);
    UMS_CHECK_EQ(ums_write_reg(&drv, UMS_REG_GCONF, 0), UMS_ERR_SPI);
    UMS_CHECK_EQ(mock_cs_toggles(), 2); /* 失败时也要释放 CS */

    mock_spi_fail(0);
    UMS_CHECK_EQ(ums_write_reg(&drv, UMS_REG_GCONF, 0), UMS_OK);
}

int main(void)
{
    UMS_RUN(init_rejects_invalid_args);
    UMS_RUN(apply_config_writes_expected_registers);
    UMS_RUN(set_microsteps_updates_chopconf);
    UMS_RUN(set_current_clamps_to_valid_cs_range);
    UMS_RUN(read_back_register_value);
    UMS_RUN(enable_drives_pin_and_gconf);
    UMS_RUN(step_generates_pulses_and_direction);
    UMS_RUN(spi_failure_is_propagated);

    printf("\n%d checks, %d failed\n", g_tests_run, g_tests_failed);
    return g_tests_failed == 0 ? 0 : 1;
}
