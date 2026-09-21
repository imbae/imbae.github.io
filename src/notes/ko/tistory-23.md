---
title: "[GStreamer] GStreamer RTSP 설치"
date: 2017-12-11
updated: 2023-02-27
summary: "* 설치 환경: Udoo boad quad (lubuntu 14.04), Ubuntu 14.04 LTS"
tags: ["FFmpeg", "GStreamer"]
key: tistory-23
---

* 설치 환경: Udoo boad quad (lubuntu 14.04), Ubuntu 14.04 LTS

* 기존 apt-get install gstreamer-1.0으로 설치하면 1.2.4 버전이 설치된다.

rtsp를 사용하기 위해서는 이 버전으로는 안된다. (good plugin에 버그가 있어 configuration이 안됨)

그래서 1.4.3 버전을 수동으로 다운로드 및 설치

[https://gstreamer.freedesktop.org/src/](https://gstreamer.freedesktop.org/src/)

위 홈페이지에서 gstreamer, good, bad, base, ugly, rtsp-server, libav 를 각각 다운 받는다. (모두 1.4.3 버전으로)

gstreamer를 설치하기 전에

기존에 설치 된 gstreamer 와 plugin 들을 모두 제거해줘야 나중에 pipeline 충돌이 발생하지 않는다.

> $ sudo apt-get -y remove gstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-tools gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly

그리고 필요한 패키지들을 설치

> $ sudo apt-get install update
> 
> 
> $ sudo apt-get install build-essential
> 
> 
> $ sudo apt-get install git cmake pkg-config libglib2.0-dev 
> bison
>  
> flex yasm

준비가 끝났으면 이제 Gstreamer 설치

설치 순서는 gstreamer-1.4.3 -> base -> good -> bad -> ugly -> rtsp-server -> libav(optional)

공통: 1. 해당 폴더로 이동 (e.g. $cd gstreamer-1.4.3)

2. $ ./configure --prefix=/usr

3. $ make

4. $ sudo make install

5. $sudo /bin/bash -c 'echo "/usr/lib" > /etc/ld.so.conf.d/gstreamer.conf' (gstreamer-1.4.3 설치 시에만 해주면 됨)

6. $ sudo ldconfig

만약 gst-rtsp-server make 과정에서 reference error가 발생한다면

$ sudo leafpad /etc/profile

안의 내용에

export LD_LIBRARY_PATH=/usr/lib

추가 후 저장

그리고 터미널 창에

source /etc/profile

재부팅

env | grep LD 로 라이브러리 경로가 등록 되었는지 확인

설치 끝
