#ifndef UMS_TYPES_H
#define UMS_TYPES_H

#include <stdbool.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/** 驱动返回值。 */
typedef enum {
    UMS_OK = 0,
    UMS_ERR_INVALID_ARG,
    UMS_ERR_SPI,
    UMS_ERR_NOT_READY,
} ums_err_t;

/** 旋转方向。 */
typedef enum {
    UMS_DIR_FORWARD = 0,
    UMS_DIR_REVERSE = 1,
} ums_direction_t;

#ifdef __cplusplus
}
#endif

#endif /* UMS_TYPES_H */
