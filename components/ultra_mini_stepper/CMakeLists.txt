idf_component_register(
    SRCS
        "src/ums_driver.c"
        "src/ums_regs.c"
        "src/ums_port_esp32.c"
    INCLUDE_DIRS
        "include"
    PRIV_REQUIRES
        esp_driver_spi
        esp_driver_gpio
        esp_timer
)

# 说明：esp_driver_spi / esp_driver_gpio 需要 ESP-IDF v5.2 及以上；
# 更老的版本请改为 PRIV_REQUIRES driver。
