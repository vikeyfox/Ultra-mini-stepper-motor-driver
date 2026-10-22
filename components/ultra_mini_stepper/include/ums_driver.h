#ifndef UMS_DRIVER_H
#define UMS_DRIVER_H

#include <stdbool.h>
#include <stdint.h>

#include "ums_port.h"
#include "ums_types.h"

#ifdef __cplusplus
extern "C" {
#endif

/** 驱动初始化参数。 */
typedef struct {
    uint8_t address;        /**< SPI 从机地址（0..127）。 */
    uint16_t microsteps;    /**< 细分：1/2/4/.../256。 */
    uint16_t run_current_ma;  /**< 运行电流（mA，RMS）。 */
    uint16_t hold_current_ma; /**< 保持电流（mA，RMS）。 */
    bool invert_dir;        /**< 反转方向引脚极性。 */
} ums_config_t;

/** 驱动实例，可由调用者静态分配。 */
typedef struct {
    ums_port_t port;
    ums_config_t cfg;
    uint32_t chopconf;
    uint32_t ihold_irun;
    bool enabled;
} ums_driver_t;

/**
 * 初始化驱动实例。仅做参数校验与状态复位，不访问 SPI。
 */
ums_err_t ums_init(ums_driver_t *drv, const ums_port_t *port, const ums_config_t *cfg);

/** 写 32 位寄存器。 */
ums_err_t ums_write_reg(ums_driver_t *drv, uint8_t reg, uint32_t value);

/** 读 32 位寄存器。 */
ums_err_t ums_read_reg(ums_driver_t *drv, uint8_t reg, uint32_t *value);

/** 按配置写 CHOPCONF / IHOLD_IRUN / TPOWERDOWN / GCONF。 */
ums_err_t ums_apply_config(ums_driver_t *drv);

/** 运行时修改细分，会立即写入芯片。 */
ums_err_t ums_set_microsteps(ums_driver_t *drv, uint16_t microsteps);

/** 运行时修改运行 / 保持电流，会立即写入芯片。 */
ums_err_t ums_set_current(ums_driver_t *drv, uint16_t run_ma, uint16_t hold_ma);

/** 使能 / 失能驱动输出。 */
ums_err_t ums_enable(ums_driver_t *drv, bool enable);

/**
 * 阻塞式输出指定数量的 STEP 脉冲。
 *
 * @param steps     脉冲数量（每个脉冲对应一个微步）。
 * @param dir       旋转方向。
 * @param pulse_us  脉冲高 / 低电平各持续的微秒数。
 */
ums_err_t ums_step(ums_driver_t *drv, uint32_t steps, ums_direction_t dir, uint32_t pulse_us);

#ifdef __cplusplus
}
#endif

#endif /* UMS_DRIVER_H */
