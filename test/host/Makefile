ROOT := ../..

CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Werror -g -O1
CPPFLAGS := -I$(ROOT)/components/ultra_mini_stepper/include -I.

BUILD := build
BIN := $(BUILD)/test_ums_driver

SRCS := \
	test_ums_driver.c \
	mock_port.c \
	$(ROOT)/components/ultra_mini_stepper/src/ums_driver.c \
	$(ROOT)/components/ultra_mini_stepper/src/ums_regs.c

.PHONY: all test clean

all: test

test: $(BIN)
	./$(BIN)

$(BIN): $(SRCS) $(wildcard *.h) $(wildcard $(ROOT)/components/ultra_mini_stepper/include/*.h)
	@mkdir -p $(BUILD)
	$(CC) $(CFLAGS) $(CPPFLAGS) $(SRCS) -o $@

clean:
	rm -rf $(BUILD)
