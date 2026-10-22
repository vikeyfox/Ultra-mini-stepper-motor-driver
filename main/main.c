#include "driver/spi_master.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "ums_driver.h"
#include "ums_port_esp32.h"

static const char *TAG = "ums_demo";

/* 按实际接线修改，详见 docs/wiring.md */
#define UMS_PIN_SCLK 4
#define UMS_PIN_MOSI 6
#define UMS_PIN_MISO 5
#define UMS_PIN_CS 7
#define UMS_PIN_EN 10
#define UMS_PIN_DIR 3
#define UMS_PIN_STEP 2

#define UMS_STEPS_PER_REV 200
#define UMS_MICROSTEPS 16

void app_main(void)
{
    ums_port_t port;
    ums_port_esp32_config_t port_cfg = {
        .spi_host = SPI2_HOST,
        .pin_sclk = UMS_PIN_SCLK,
        .pin_mosi = UMS_PIN_MOSI,
        .pin_miso = UMS_PIN_MISO,
        .pin_cs = UMS_PIN_CS,
        .pin_en = UMS_PIN_EN,
        .pin_dir = UMS_PIN_DIR,
        .pin_step = UMS_PIN_STEP,
        .clock_hz = 1000000,
    };

    ums_err_t err = ums_port_esp32_init(&port, &port_cfg);
    if (err != UMS_OK) {
        ESP_LOGE(TAG, "port init failed: %d", (int)err);
        return;
    }

    ums_driver_t drv;
    ums_config_t cfg = {
        .address = 0,
        .microsteps = UMS_MICROSTEPS,
        .run_current_ma = 800,
        .hold_current_ma = 400,
        .invert_dir = false,
    };

    err = ums_init(&drv, &port, &cfg);
    if (err != UMS_OK) {
        ESP_LOGE(TAG, "driver init failed: %d", (int)err);
        return;
    }

    err = ums_apply_config(&drv);
    if (err == UMS_OK) {
        err = ums_enable(&drv, true);
    }
    if (err != UMS_OK) {
        ESP_LOGE(TAG, "driver config failed: %d", (int)err);
        return;
    }

    ESP_LOGI(TAG, "spin forward");

    const uint32_t full_turn = UMS_STEPS_PER_REV * UMS_MICROSTEPS;

    while (true) {
        ums_step(&drv, full_turn, UMS_DIR_FORWARD, 200);
        vTaskDelay(pdMS_TO_TICKS(1000));

        ums_step(&drv, full_turn, UMS_DIR_REVERSE, 200);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
