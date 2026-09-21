---
title: "[PX4] NuttX Shell 접근"
date: 2017-12-11
updated: 2018-11-08
summary: "펌웨어 버전 v1.4.4."
tags: ["PX4", "Pixhawk"]
key: tistory-12
---

펌웨어 버전 v1.4.4.

경로: ROMFS/px4fmu_common/init.d/rcS

658라인

**# Start MAVLink**

**mavlink start -r 800000 -d /dev/ttyS0 -m config -x**

이걸

**# Start USB shell if no microSD present, MAVLink else**

**if [ $LOG_FILE == /dev/null ]**

**then**

**# Try to get an USB console**

**nshterm /dev/ttyACM0 &**

**else**

**mavlink start -r 800000 -d /dev/ttyACM0 -m config -x**

**fi**

이렇게 바꿔준다.

이전 버전(v1.3.4)에서는 sd카드를 제거하고 usb를 연결하면 nuttx shell로 접근이 가능하도록 조건문이 걸려 있는데

최신 릴리즈 버전에서는 그런 조건문이 사라져서

sd카드를 빼고 usb 연결해도 shell에 접근이 안된다.
