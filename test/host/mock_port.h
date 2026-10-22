#ifndef MOCK_PORT_H
#define MOCK_PORT_H

#include <stdint.h>

#include "ums_port.h"

/** 初始化 mock 端口并清空寄存器表与统计计数。 */
void mock_port_init(ums_port_t *port);

/** 读取 mock 寄存器当前值。 */
uint32_t mock_reg_get(uint8_t reg);

/** 预置 mock 寄存器值。 */
void mock_reg_set(uint8_t reg, uint32_t value);

/** 让接下来的 SPI 传输返回失败（0 表示恢复正常）。 */
void mock_spi_fail(int fail);

/** CS 电平变化次数。 */
int mock_cs_toggles(void);

/** EN 引脚当前电平。 */
int mock_en_level(void);

/** DIR 引脚当前电平。 */
int mock_dir_level(void);

/** STEP 引脚电平变化次数。 */
int mock_step_toggles(void);

#endif /* MOCK_PORT_H */
