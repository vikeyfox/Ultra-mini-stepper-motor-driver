# 接线说明

以下引脚对应 `main/main.c` 中的默认配置，可按实际硬件修改。

| 信号 | ESP32-C3 引脚 | 说明 |
| --- | --- | --- |
| SCLK | GPIO4 | SPI 时钟 |
| MOSI | GPIO6 | 主机输出 |
| MISO | GPIO5 | 主机输入（只写芯片可留空） |
| CS | GPIO7 | 片选，低有效，由软件控制 |
| EN | GPIO10 | 使能，高有效 |
| DIR | GPIO3 | 方向 |
| STEP | GPIO2 | 脉冲 |
| GND | GND | 与驱动板共地 |
| VM | 电机电源 | 按驱动芯片与电机额定值供电 |

## 注意事项

- SPI 模式为 3（CPOL=1, CPHA=1），时钟默认 1 MHz。
- CS 由驱动软件手动拉低 / 拉高，`spi_bus_add_device` 中 `spics_io_num = -1`。
- EN / DIR / STEP 为普通 GPIO 输出；需要高速或平滑加减速时，
  可将 STEP 改为 RMT / MCPWM 输出，仅需替换 `ums_step` 的实现。
- 电机电源与逻辑电源建议分开供电并共地，必要时加去耦电容。
- 电流参数受采样电阻影响，见 `UMS_SENSE_RESISTOR_MOHM`（默认 110 mOhm）。

## 接线示意

```
ESP32-C3                    驱动芯片
GPIO4  --- SCLK ----------> SCLK
GPIO6  --- MOSI ----------> SDI
GPIO5  <-- MISO ----------- SDO
GPIO7  --- CS   ----------> CSN
GPIO10 --- EN   ----------> EN
GPIO3  --- DIR  ----------> DIR
GPIO2  --- STEP ----------> STEP
GND    -------------------- GND
                           VM  <--- 电机电源
```
