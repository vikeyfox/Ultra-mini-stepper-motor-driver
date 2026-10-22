#include "ums_regs.h"

void ums_reg_build_write_frame(uint8_t reg, uint32_t value, uint8_t frame[UMS_FRAME_LEN])
{
    frame[0] = (uint8_t)((reg & UMS_ADDR_MASK) | UMS_WRITE_BIT);
    frame[1] = (uint8_t)(value >> 24);
    frame[2] = (uint8_t)(value >> 16);
    frame[3] = (uint8_t)(value >> 8);
    frame[4] = (uint8_t)value;
}

void ums_reg_build_read_frame(uint8_t reg, uint8_t frame[UMS_FRAME_LEN])
{
    frame[0] = (uint8_t)(reg & UMS_ADDR_MASK);
    frame[1] = 0;
    frame[2] = 0;
    frame[3] = 0;
    frame[4] = 0;
}

uint32_t ums_reg_parse_value(const uint8_t frame[UMS_FRAME_LEN])
{
    return ((uint32_t)frame[1] << 24) | ((uint32_t)frame[2] << 16) |
           ((uint32_t)frame[3] << 8) | (uint32_t)frame[4];
}

int ums_mres_from_microsteps(uint16_t microsteps)
{
    for (int mres = 0; mres <= 8; ++mres) {
        if ((uint16_t)(256u >> mres) == microsteps) {
            return mres;
        }
    }
    return -1;
}

uint8_t ums_current_cs(uint16_t current_ma, uint16_t rsense_mohm)
{
    /* CS+1 = I_rms * sqrt(2) * (Rsense + 0.02) / 0.325 * 32 */
    uint64_t numerator = (uint64_t)current_ma * (uint64_t)(rsense_mohm + 20u) * 45254u;
    uint64_t cs_plus_one = (numerator + 162500000u) / 325000000u;

    if (cs_plus_one <= 1u) {
        return 0;
    }
    if (cs_plus_one - 1u > 31u) {
        return 31u;
    }
    return (uint8_t)(cs_plus_one - 1u);
}
