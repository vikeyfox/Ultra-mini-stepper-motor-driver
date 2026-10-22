#ifdef ESP_PLATFORM

#include "ums_port_esp32.h"

#include <string.h>

#include "driver/gpio.h"
#include "driver/spi_master.h"
#include "esp_rom_sys.h"
#include "esp_timer.h"

typedef struct {
    spi_device_handle_t spi;
    int pin_cs;
    int pin_en;
    int pin_dir;
    int pin_step;
} ums_esp32_ctx_t;

/* 单实例上下文，ESP32 端口实现不做多驱动实例管理。 */
static ums_esp32_ctx_t s_ctx;

static int esp32_spi_transfer(void *ctx, const uint8_t *tx, uint8_t *rx, size_t len)
{
    ums_esp32_ctx_t *self = (ums_esp32_ctx_t *)ctx;
    spi_transaction_t transaction = {
        .length = len * 8,
        .tx_buffer = tx,
        .rx_buffer = rx,
    };

    return spi_device_transmit(self->spi, &transaction) == ESP_OK ? 0 : -1;
}

static void esp32_cs_set(void *ctx, bool level)
{
    ums_esp32_ctx_t *self = (ums_esp32_ctx_t *)ctx;
    gpio_set_level((gpio_num_t)self->pin_cs, level ? 1 : 0);
}

static void esp32_en_set(void *ctx, bool level)
{
    ums_esp32_ctx_t *self = (ums_esp32_ctx_t *)ctx;
    gpio_set_level((gpio_num_t)self->pin_en, level ? 1 : 0);
}

static void esp32_dir_set(void *ctx, bool level)
{
    ums_esp32_ctx_t *self = (ums_esp32_ctx_t *)ctx;
    gpio_set_level((gpio_num_t)self->pin_dir, level ? 1 : 0);
}

static void esp32_step_set(void *ctx, bool level)
{
    ums_esp32_ctx_t *self = (ums_esp32_ctx_t *)ctx;
    gpio_set_level((gpio_num_t)self->pin_step, level ? 1 : 0);
}

static void esp32_delay_us(void *ctx, uint32_t us)
{
    (void)ctx;
    esp_rom_delay_us(us);
}

static uint32_t esp32_millis(void *ctx)
{
    (void)ctx;
    return (uint32_t)(esp_timer_get_time() / 1000);
}

static bool config_output(int pin)
{
    if (pin < 0) {
        return true;
    }

    gpio_config_t io = {
        .pin_bit_mask = 1ULL << pin,
        .mode = GPIO_MODE_OUTPUT,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_DISABLE,
    };

    return gpio_config(&io) == ESP_OK;
}

ums_err_t ums_port_esp32_init(ums_port_t *port, const ums_port_esp32_config_t *cfg)
{
    if (port == NULL || cfg == NULL || cfg->pin_mosi < 0 || cfg->pin_sclk < 0 ||
        cfg->pin_cs < 0) {
        return UMS_ERR_INVALID_ARG;
    }

    memset(&s_ctx, 0, sizeof(s_ctx));
    s_ctx.pin_cs = cfg->pin_cs;
    s_ctx.pin_en = cfg->pin_en;
    s_ctx.pin_dir = cfg->pin_dir;
    s_ctx.pin_step = cfg->pin_step;

    if (!config_output(cfg->pin_cs) || !config_output(cfg->pin_en) ||
        !config_output(cfg->pin_dir) || !config_output(cfg->pin_step)) {
        return UMS_ERR_INVALID_ARG;
    }

    spi_bus_config_t bus = {
        .mosi_io_num = cfg->pin_mosi,
        .miso_io_num = cfg->pin_miso,
        .sclk_io_num = cfg->pin_sclk,
        .quadwp_io_num = -1,
        .quadhd_io_num = -1,
        .max_transfer_sz = 8,
    };

    esp_err_t err = spi_bus_initialize((spi_host_device_t)cfg->spi_host, &bus, SPI_DMA_CH_AUTO);
    if (err != ESP_OK && err != ESP_ERR_INVALID_STATE) {
        return UMS_ERR_SPI;
    }

    spi_device_interface_config_t device = {
        .clock_speed_hz = cfg->clock_hz,
        .mode = 3,
        .spics_io_num = -1,
        .queue_size = 1,
    };

    if (spi_bus_add_device((spi_host_device_t)cfg->spi_host, &device, &s_ctx.spi) != ESP_OK) {
        return UMS_ERR_SPI;
    }

    if (cfg->pin_cs >= 0) {
        gpio_set_level((gpio_num_t)cfg->pin_cs, 1);
    }
    if (cfg->pin_en >= 0) {
        gpio_set_level((gpio_num_t)cfg->pin_en, 0);
    }

    port->ctx = &s_ctx;
    port->spi_transfer = esp32_spi_transfer;
    port->cs_set = esp32_cs_set;
    port->en_set = cfg->pin_en >= 0 ? esp32_en_set : NULL;
    port->dir_set = cfg->pin_dir >= 0 ? esp32_dir_set : NULL;
    port->step_set = cfg->pin_step >= 0 ? esp32_step_set : NULL;
    port->delay_us = esp32_delay_us;
    port->millis = esp32_millis;

    return UMS_OK;
}

#endif /* ESP_PLATFORM */
