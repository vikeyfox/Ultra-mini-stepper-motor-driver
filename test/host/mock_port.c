#include "mock_port.h"

#include <string.h>

#include "ums_regs.h"

static uint32_t s_regs[128];
static int s_spi_fail;
static int s_cs_toggles;
static int s_en_level;
static int s_dir_level;
static int s_step_toggles;

static int mock_spi_transfer(void *ctx, const uint8_t *tx, uint8_t *rx, size_t len)
{
    (void)ctx;

    if (s_spi_fail || tx == NULL || len != UMS_FRAME_LEN) {
        return -1;
    }

    uint8_t addr = tx[0];

    if ((addr & UMS_WRITE_BIT) != 0) {
        uint32_t value = ((uint32_t)tx[1] << 24) | ((uint32_t)tx[2] << 16) |
                         ((uint32_t)tx[3] << 8) | (uint32_t)tx[4];
        s_regs[addr & UMS_ADDR_MASK] = value;
        if (rx != NULL) {
            memset(rx, 0, len);
        }
        return 0;
    }

    uint32_t value = s_regs[addr & UMS_ADDR_MASK];
    if (rx != NULL) {
        rx[0] = 0;
        rx[1] = (uint8_t)(value >> 24);
        rx[2] = (uint8_t)(value >> 16);
        rx[3] = (uint8_t)(value >> 8);
        rx[4] = (uint8_t)value;
    }
    return 0;
}

static void mock_cs_set(void *ctx, bool level)
{
    (void)ctx;
    (void)level;
    s_cs_toggles++;
}

static void mock_en_set(void *ctx, bool level)
{
    (void)ctx;
    s_en_level = level ? 1 : 0;
}

static void mock_dir_set(void *ctx, bool level)
{
    (void)ctx;
    s_dir_level = level ? 1 : 0;
}

static void mock_step_set(void *ctx, bool level)
{
    (void)ctx;
    (void)level;
    s_step_toggles++;
}

static void mock_delay_us(void *ctx, uint32_t us)
{
    (void)ctx;
    (void)us;
}

static uint32_t mock_millis(void *ctx)
{
    (void)ctx;
    return 0;
}

void mock_port_init(ums_port_t *port)
{
    memset(s_regs, 0, sizeof(s_regs));
    s_spi_fail = 0;
    s_cs_toggles = 0;
    s_en_level = 0;
    s_dir_level = 0;
    s_step_toggles = 0;

    memset(port, 0, sizeof(*port));
    port->spi_transfer = mock_spi_transfer;
    port->cs_set = mock_cs_set;
    port->en_set = mock_en_set;
    port->dir_set = mock_dir_set;
    port->step_set = mock_step_set;
    port->delay_us = mock_delay_us;
    port->millis = mock_millis;
}

uint32_t mock_reg_get(uint8_t reg)
{
    return s_regs[reg & UMS_ADDR_MASK];
}

void mock_reg_set(uint8_t reg, uint32_t value)
{
    s_regs[reg & UMS_ADDR_MASK] = value;
}

void mock_spi_fail(int fail)
{
    s_spi_fail = fail;
}

int mock_cs_toggles(void)
{
    return s_cs_toggles;
}

int mock_en_level(void)
{
    return s_en_level;
}

int mock_dir_level(void)
{
    return s_dir_level;
}

int mock_step_toggles(void)
{
    return s_step_toggles;
}
