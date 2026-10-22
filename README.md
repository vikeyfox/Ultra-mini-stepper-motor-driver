# Ultra-mini-stepper-motor-driver

面向 ESP32（ESP-IDF）的超小型步进电机驱动组件骨架，通过 SPI 配置寄存器，
STEP/DIR 输出脉冲。驱动核心与 MCU SDK 解耦，可在主机上做单元测试。

## 特性

- 组件化结构：`components/ultra_mini_stepper` 可直接复用到其他工程
- 硬件抽象层 `ums_port_t`，便于移植与 mock 测试
- SPI 寄存器读写、细分 / 电流 / 使能配置、阻塞式脉冲输出
- 主机侧单元测试（无需硬件）与 GitHub Actions CI

> 寄存器地址、位定义和电流公式均为骨架示例，接入真实芯片前请对照数据手册修改
> `components/ultra_mini_stepper/include/ums_regs.h`。

## 目录结构

```
.
├── CMakeLists.txt                 # ESP-IDF 工程入口
├── sdkconfig.defaults             # 默认目标 esp32c3
├── main/
│   ├── CMakeLists.txt
│   └── main.c                     # 示例：匀速正反转
├── components/ultra_mini_stepper/ # 驱动组件
│   ├── CMakeLists.txt
│   ├── include/
│   │   ├── ums_types.h
│   │   ├── ums_port.h
│   │   ├── ums_port_esp32.h
│   │   ├── ums_regs.h
│   │   └── ums_driver.h
│   └── src/
│       ├── ums_driver.c
│       ├── ums_regs.c
│       └── ums_port_esp32.c
├── test/host/                     # 主机侧单元测试
│   ├── Makefile
│   ├── test_harness.h
│   ├── mock_port.c/.h
│   └── test_ums_driver.c
├── docs/
│   ├── api.md
│   ├── wiring.md
│   └── register-map.md
└── .github/workflows/ci.yml
```

## 环境要求

- ESP-IDF v5.2 及以上（组件使用 `esp_driver_spi` / `esp_driver_gpio`）
- 主机测试仅需 C11 编译器与 make

## 快速开始

```bash
# 构建并烧录示例
idf.py set-target esp32c3
idf.py build
idf.py -p /dev/ttyUSB0 flash monitor

# 运行主机侧单元测试
make -C test/host test
```

默认引脚：SCLK=GPIO4、MOSI=GPIO6、MISO=GPIO5、CS=GPIO7、
EN=GPIO10、DIR=GPIO3、STEP=GPIO2，详见 [docs/wiring.md](docs/wiring.md)。

## 在其它工程中复用

将 `components/ultra_mini_stepper` 复制（或作为子模块）到目标工程的
`components/` 目录，在代码中：

```c
#include "ums_driver.h"
#include "ums_port_esp32.h"
```

然后按 [docs/api.md](docs/api.md) 的调用顺序初始化即可。

## 文档

- [API 说明](docs/api.md)
- [接线说明](docs/wiring.md)
- [寄存器映射](docs/register-map.md)

## 后续可扩展

- STEP 改为 RMT / MCPWM 输出，支持加减速曲线
- 读取 `DRV_STATUS` 实现堵转与过温检测
- 增加多驱动实例支持（当前 ESP32 端口为单实例）
- 补充许可证文件
