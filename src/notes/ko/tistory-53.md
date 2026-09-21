---
title: "[Raspberry Pi 3] RTSP Server 설정"
date: 2018-10-18
updated: 2023-02-27
summary: "라즈베리 파이 3에 GStreamer RTSP Server를 설치해서 카메라 영상을 스트리밍하는 서버를 구축한다."
tags: ["FFmpeg", "GStreamer", "Raspberry Pi 3"]
key: tistory-53
---

라즈베리 파이 3에 GStreamer RTSP Server를 설치해서 카메라 영상을 스트리밍하는 서버를 구축한다.

- Hardware: Raspberry Pi 3 (with Pi Camera v2)
- OS: Raspbian (Stretch with desktop)

필요한 패키지 설치에 앞서 라즈베리 파이 환경 설정이 필요.

**메뉴 - Preference - Raspberry Pi Configuration**

- Enable ssh (Option)
- Enable camera
- Increase memory split to 256MB

![](/assets/images/notes/53/1.png)

![](/assets/images/notes/53/2.png)

**1. GStreamer 기본 패키지 설치**

- sudo apt install vim git
- sudo apt-get install gstreamer1.0-plugins-bad gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly gstreamer1.0-tools libgstreamer1.0-dev libgstreamer1.0-0-dbg libgstreamer1.0-0 libgstreamer-plugins-base1.0-dev gtk-doc-tools

**2. GStreamer Camera Source 설치**

- git clone https://github.com/thaytan/gst-rpicamsrc.git
- cd gst-rpicamsrc
- ./autogen.sh
- make
- sudo make install

설치 후 아래 명령어를 입력하여 파이 카메라가 잡히는지 확인

- gst-inspect-1.0 |grep rpicamsrc

![](/assets/images/notes/53/3.png)

**3. GStreamer RTSP Server 라이브러리 설치**

라즈비안 OS는 현재 최신 버전의 GStreamer이 호환되지 않는다. 불안정적이기도 하고... 무슨 에러를 발생시킬지 모른다.

그래서 검증된(?) 안정된 1.4 버전으로 설치한다.

- git clone git://anongit.freedesktop.org/gstreamer/gst-rtsp-server
- cd gst-rtsp-server
- git checkout 1.4
- ./autogen.sh
- make
- sudo make install

**4. RTSP Server 실행**

먼저 Pi Camera의 지원 사양부터 확인한다.

- gst-inspect-1.0 rpicamsrc

기존에 다운받은 gst-rtsp-server/example 폴더로 이동해서 아래 명령어를 실행한다.

- ./test-launch "( rpicamsrc preview=false bitrate=2000000 keyframe-interval=15 ! video/x-h264, framerate=15/1 ! h264parse ! rtph264pay name=pay0 pt=96 )"

![](/assets/images/notes/53/4.png)

**5. Client에서 RTSP Server 연결**

여기서 Client는 윈도우 기반 PC이다.

RTSP Server에 접속하여 영상을 디스플레이하기 위해 팟플레이어를 사용한다.

팟플레이어에서 열기 - 주소 열기 실행 (Ctrl + U)

주소 입력창에 아래와 같이 입력

- rtsp://xxx.xxx.x.x:8554/test (xxx.xxx.x.x: Raspberry IP주소 = RTSP Server 주소)

![](/assets/images/notes/53/5.png)

![](/assets/images/notes/53/6.png)
