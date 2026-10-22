#ifndef UMS_REGS_H
#define UMS_REGS_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/*
 * 寄存器映射（骨架示例）。
 *
 * 这里的地址和位定义参考了常见的 SPI 步进驱动芯片，
 * 实际使用时请以目标芯片数据手册为准进行修改。
 */

#define UMS_REG_GCONF 0x00       /**< 全局配置 */
#define UMS_REG_IHOLD_IRUN 0x01  /**< 保持 / 运行电流 */
#define UMS_REG_TPOWERDOWN 0x02  /**< 掉电延时 */
#define UMS_REG_VACTUAL 0x03     /**< 内部速度模式 */
#define UMS_REG_CHOPCONF 0x06    /**< 斩波 / 细分配置 */
#define UMS_REG_DRV_STATUS 0x10  /**< 驱动状态（只读） */

#define UMS_ADDR_MASK 0x7Fu
#define UMS_WRITE_BIT 0x80u
#define UMS_FRAME_LEN 5u /**< 1 字节地址 + 4 字节数据（MSB first） */

/* GCONF */
#define UMS_GCONF_EN (1u << 0)

/* CHOPCONF */
#define UMS_CHOPCONF_TOFF_SHIFT 0
#define UMS_CHOPCONF_TOFF_MASK 0x0Fu
#define UMS_CHOPCONF_MRES_SHIFT 24
#define UMS_CHOPCONF_MRES_MASK 0x0Fu

/* IHOLD_IRUN */
#define UMS_IHOLD_IRUN_IHOLD_SHIFT 0
#define UMS_IHOLD_IRUN_IRUN_SHIFT 8
#define UMS_IHOLD_IRUN_IHOLDDELAY_SHIFT 16

/** 构造写寄存器帧（地址 + 写标志 + 32 位数据）。 */
void ums_reg_build_write_frame(uint8_t reg, uint32_t value, uint8_t frame[UMS_FRAME_LEN]);

/** 构造读寄存器帧（地址 + 4 个占位字节）。 */
void ums_reg_build_read_frame(uint8_t reg, uint8_t frame[UMS_FRAME_LEN]);

/** 从接收帧中解析 32 位数据。 */
uint32_t ums_reg_parse_value(const uint8_t frame[UMS_FRAME_LEN]);

/**
 * 细分 -> MRES 编码。
 * @return 0..8，非法细分（非 2 的幂或超出 1..256）返回 -1。
 */
int ums_mres_from_microsteps(uint16_t microsteps);

/**
 * 电流 -> CS 编码。
 *
 * 采用 I_rms = (CS+1)/32 * Vfs / (Rsense + 0.02) / sqrt(2) 的常见模型，
 * Vfs = 0.325 V，Rsense 单位 mOhm。结果被钳位到 0..31。
 */
uint8_t ums_current_cs(uint16_t current_ma, uint16_t rsense_mohm);

#ifdef __cplusplus
}
#endif

#endif /* UMS_REGS_H */
