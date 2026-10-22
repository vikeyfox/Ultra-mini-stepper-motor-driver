#ifndef UMS_PORT_H
#define UMS_PORT_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * 硬件抽象层（HAL）。
 *
 * 驱动核心只依赖本结构体，不直接调用任何 MCU SDK，
 * 因此可以在主机上注入 mock 进行单元测试。
 *
 * 除 spi_transfer / cs_set 外，其余回调均可为 NULL，
 * 但对应的功能（如脉冲输出）将不可用。
 */
typedef struct ums_port {
    void *ctx; /**< 回调上下文，透传给每个函数。 */

    /** 全双工 SPI 传输，返回 0 表示成功。CS 由 cs_set 单独控制。 */
    int (*spi_transfer)(void *ctx, const uint8_t *tx, uint8_t *rx, size_t len);

    /** 片选电平控制，true 为选中。 */
    void (*cs_set)(void *ctx, bool level);

    /** 使能引脚控制，true 为驱动输出开启。 */
    void (*en_set)(void *ctx, bool level);

    /** 方向引脚控制，true 对应一个物理方向。 */
    void (*dir_set)(void *ctx, bool level);

    /** STEP 引脚电平控制。 */
    void (*step_set)(void *ctx, bool level);

    /** 微秒级延时。 */
    void (*delay_us)(void *ctx, uint32_t us);

    /** 毫秒时间戳（单调递增）。 */
    uint32_t (*millis)(void *ctx);
} ums_port_t;

#ifdef __cplusplus
}
#endif

#endif /* UMS_PORT_H */
