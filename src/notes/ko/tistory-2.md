---
title: "[PX4] Building the Code"
date: 2017-02-02
updated: 2018-11-08
summary: "Toolchain 설치가 끝났으면 Firmware를 다운로드해서 Pixhawk에 업로드 해보는 과정을 소개한다."
tags: ["PX4", "Pixhawk"]
key: tistory-2
---

Toolchain 설치가 끝났으면 Firmware를 다운로드해서 Pixhawk에 업로드 해보는 과정을 소개한다.

우선 터미널에서 현재 경로를 확인한 후 아래 명령어를 입력한다.

```
mkdir -p ~/src
cd ~/src
git clone https://github.com/PX4/Firmware.git
cd Firmware
git submodule update --init --recursive
cd .. 
```

위 명령어는 src 폴더를 생성하고 해당 폴더에 PX4 Firmware를 다운로드 후 서브 모듈을 추가로 다운로드

```
cd Firmware
make px4fmu-v2_default
```

다운받은 Firmware 폴더로 들어가서 make를 수행하면 아래와 같이 px4fmu-v2 하드웨어에 맞는 기본 값으로 Firmware 실행 파일이 생성

```
[100%] Linking CXX executable firmware_nuttx
[100%] Built target firmware_nuttx
Scanning dependencies of target build_firmware_px4fmu-v2
[100%] Generating nuttx-px4fmu-v2-default.px4
[100%] Built target build_firmware_px4fmu-v2
```

업로드 명령어와 함께 수행하면 실행파일 생성 후 아래 그림과 같이 Pixhawk에 Firmware를 업로드 한다.

```
make px4fmu-v2_default upload 
```

```
 Erase  : [====================] 100.0%
 Program: [====================] 100.0%
 Verify : [====================] 100.0%
 Rebooting.

 [100%] Built target upload
```

PX4 Firmware의 구조와 같은 세부적인 사항은 아래 사이트를 참고.

[https://dev.px4.io/](https://dev.px4.io/)
