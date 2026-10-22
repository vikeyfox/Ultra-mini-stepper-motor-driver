#ifndef UMS_PORT_ESP32_H
#define UMS_PORT_ESP32_H

#include <stdint.h>

#include "ums_port.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * ESP32 端口配置。引脚使用 GPIO 编号，不需要的引脚可填 -1。
 * spi_host 取 SPI2_HOST / SPI3_HOST。
 */
typedef struct {
    int spi_host;
    int pin_sclk;
    int pin_mosi;
    int pin_miso;
    int pin_cs;
    int pin_en;
    int pin_dir;
    int pin_step;
    uint32_t clock_hz;
} ums_port_esp32_config_t;

/**
 * 创建 ESP32 端口实现（SPI 主机 + GPIO）。
 *
 * 注意：内部使用单实例上下文，一个固件只应初始化一次。
 */
ums_err_t ums_port_esp32_init(ums_port_t *port, const ums_port_esp32_config_t *cfg);

#ifdef __cplusplus
}
#endif

#endif /* UMS_PORT_ESP32_H */
