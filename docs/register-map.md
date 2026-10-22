# 寄存器映射

> 本文件是骨架示例，地址与位定义参照常见 SPI 步进驱动芯片。
> 接入真实芯片前请对照其数据手册修改 `include/ums_regs.h`。

## SPI 帧格式

固定 5 字节，MSB first：

| 字节 | 写操作 | 读操作 |
| --- | --- | --- |
| 0 | `addr | 0x80` | `addr` |
| 1..4 | 32 位数据 | 占位 0，返回 32 位数据 |

CS 由软件控制，传输期间保持低电平。

## 寄存器列表

| 地址 | 名称 | 访问 | 说明 |
| --- | --- | --- | --- |
| 0x00 | `GCONF` | R/W | bit0 = EN，使能输出 |
| 0x01 | `IHOLD_IRUN` | R/W | bit4:0 IHOLD，bit12:8 IRUN，bit19:16 IHOLDDELAY |
| 0x02 | `TPOWERDOWN` | R/W | 掉电延时 |
| 0x03 | `VACTUAL` | R/W | 内部速度模式，骨架中未使用 |
| 0x06 | `CHOPCONF` | R/W | bit3:0 TOFF，bit27:24 MRES |
| 0x10 | `DRV_STATUS` | R | 驱动状态，只读 |

## MRES 编码

| MRES | 细分 |
| --- | --- |
| 0 | 256 |
| 1 | 128 |
| 2 | 64 |
| 3 | 32 |
| 4 | 16 |
| 5 | 8 |
| 6 | 4 |
| 7 | 2 |
| 8 | 1 |

## 电流编码

采用常见模型：

```
I_rms = (CS + 1) / 32 * Vfs / (Rsense + 0.02) / sqrt(2)
```

其中 `Vfs = 0.325 V`，`Rsense` 单位欧姆。骨架用整数运算实现
（`ums_current_cs`），结果钳位到 0..31。
