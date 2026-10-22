#ifndef TEST_HARNESS_H
#define TEST_HARNESS_H

#include <stdio.h>

/* 极简测试框架，无需外部依赖，便于主机侧运行。 */

static int g_tests_run = 0;
static int g_tests_failed = 0;

#define UMS_TEST(name) static void name(void)

#define UMS_RUN(fn)                                                      \
    do {                                                                 \
        int failed_before = g_tests_failed;                              \
        fn();                                                            \
        printf("%-42s %s\n", #fn,                                        \
               g_tests_failed == failed_before ? "PASS" : "FAIL");       \
    } while (0)

#define UMS_CHECK_TRUE(cond)                                             \
    do {                                                                 \
        g_tests_run++;                                                   \
        if (!(cond)) {                                                   \
            g_tests_failed++;                                            \
            printf("  FAIL %s:%d: %s\n", __FILE__, __LINE__, #cond);     \
        }                                                                \
    } while (0)

#define UMS_CHECK_EQ(actual, expected)                                   \
    do {                                                                 \
        long long a_ = (long long)(actual);                              \
        long long e_ = (long long)(expected);                            \
        g_tests_run++;                                                   \
        if (a_ != e_) {                                                  \
            g_tests_failed++;                                            \
            printf("  FAIL %s:%d: got %lld, want %lld\n", __FILE__,      \
                   __LINE__, a_, e_);                                    \
        }                                                                \
    } while (0)

#endif /* TEST_HARNESS_H */
