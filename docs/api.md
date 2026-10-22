# API 说明

## 典型调用顺序

```c
ums_port_t port;
ums_port_esp32_init(&port, &port_cfg);   /* 1. 建立硬件端口 */

ums_driver_t drv;
ums_config_t cfg = {
    .address = 0,
    .microsteps = 16,
    .run_current_ma = 800,
    .hold_current_ma = 400,
    .invert_dir = false,
};
ums_init(&drv, &port, &cfg);             /* 2. 初始化驱动实例（不访问总线） */
ums_apply_config(&drv);                  /* 3. 写入寄存器配置 */
ums_enable(&drv, true);                  /* 4. 使能输出 */
ums_step(&drv, 3200, UMS_DIR_FORWARD, 200);
```

## 数据结构

### `ums_config_t`

| 字段 | 说明 |
| --- | --- |
| `address` | SPI 从机地址，0..127 |
| `microsteps` | 细分倍数，必须为 1/2/4/.../256 |
| `run_current_ma` | 运行电流（RMS，mA） |
| `hold_current_ma` | 保持电流（RMS，mA） |
| `invert_dir` | 是否反转 DIR 引脚极性 |

### `ums_port_t`

硬件抽象层，包含 SPI 传输、CS/EN/DIR/STEP 引脚控制与延时回调。
除 `spi_transfer` 与 `cs_set` 外其余回调可为 `NULL`。

## 函数

| 函数 | 说明 | 是否访问总线 |
| --- | --- | --- |
| `ums_init` | 参数校验、复制端口与配置、关闭使能 | 否 |
| `ums_apply_config` | 写 CHOPCONF / IHOLD_IRUN / TPOWERDOWN / GCONF | 是 |
| `ums_write_reg` | 写 32 位寄存器 | 是 |
| `ums_read_reg` | 读 32 位寄存器 | 是 |
| `ums_set_microsteps` | 运行时修改细分 | 是 |
| `ums_set_current` | 运行时修改电流 | 是 |
| `ums_enable` | 控制 EN 引脚并同步 GCONF | 是 |
| `ums_step` | 阻塞式输出 STEP 脉冲 | 否（仅 GPIO） |

## 错误码

| 值 | 含义 |
| --- | --- |
| `UMS_OK` | 成功 |
| `UMS_ERR_INVALID_ARG` | 参数或端口回调非法 |
| `UMS_ERR_SPI` | SPI 传输失败 |
| `UMS_ERR_NOT_READY` | 预留，当前未使用 |

## 移植到其他平台

实现一组 `ums_port_t` 回调即可，驱动核心不依赖 ESP-IDF。
可参考 `src/ums_port_esp32.c` 与 `test/host/mock_port.c`。
