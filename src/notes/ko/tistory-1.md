---
title: "[PX4] 개발 환경 구축 - Linux"
date: 2017-01-30
updated: 2018-11-08
summary: "개발 환경 구축 - Linux"
tags: ["PX4", "Pixhawk"]
key: tistory-1
---

**PX4 Firmware**

PX4 Firmware는 v1.0.0 버전부터 현재 v1.6.0 버전까지 꾸준히 업데이트되고 있으며,

다양한 프레임(Fixed Wing, Quadrotor, VTOL, Etc.)을 지원하고,

오픈 소스로 공개되어 Firmware 내부 소스코드를 사용자가 분석하여 수정할 수 있다는 장점이 있다.

그리고 지상관제 소프트웨어 개발에 앞서 연동되는 Firmware의 분석은 필수적이기 때문에 Firmware 개발 환경 구축이 필요하다.

PX4 Firmware는 Linux 환경에 최적화 되어 있기 때문에 Windows 환경보다는 Ubuntu 환경에서 개발하는 것을 추천한다.

**Development Environment on Linux**

아래 패키지들을 설치하는 이유는 Pixhawk 하드웨어와 컴퓨터와의 연결을 위함이다.

아래에서 명시하는 Toolchain 패키지들을 설치해야 컴퓨터에서 Pixhawk를 인식하고

나아가 내부 OS나 Firmware에 접근하여 분석 및 수정이 가능하다.

**1. Permission Setup**

Firmware 개발에 필요한 패키지 설치에 앞서 사용자 모드를 변경할 필요가 있다.

```
sudo usermod -a -G dialout $USER
```

그리고 사용자 로그아웃 후 다시 로그인하여 아래 작업들을 수행한다.

**2. Installation**

Pixhawk는 NuttX라는 OS를 기반으로 개발된 하드웨어이기 때문에 NuttX OS를 설치한다.

시뮬레이션 툴 설치는 선택사항.

```
sudo add-apt-repository ppa:george-edison55/cmake-3.x -y
sudo apt-get update
sudo apt-get install python-argparse git-core wget zip \
    python-empy python-toml python-numpy python-jinja2 qtcreator cmake build-essential genromfs -y
# simulation tools
sudo apt-get install ant protobuf-compiler libeigen3-dev libopencv-dev \
     openjdk-8-jdk openjdk-8-jre clang-3.5 lldb-3.5 -y
```

**3. NuttX based hardware**

외부 간섭을 방지하기 위해 아래 패키지를 삭제한다.

```
 sudo apt-get remove modemmanager 
```

NuttX를 구성하기 위한 종속 패키지들을 설치한다.

```
 sudo apt-get install python-serial openocd \
     flex bison libncurses5-dev autoconf texinfo \
     libftdi-dev libtool zlib1g-dev
```

이전 패키지들을 삭제 후 Toolchain을 추가한다

```
 sudo apt-get remove gcc-arm-none-eabi gdb-arm-none-eabi binutils-arm-none-eabi gcc-arm-embedded
 sudo add-apt-repository --remove ppa:team-gcc-arm-embedded/ppa
```

```
sudo apt install gcc-arm-none-eabi
```
