---
title: "[UDOO] UDOO Camera - OpenCV 3.1(with Cmake) (Ubuntu 14.04)"
date: 2017-12-11
summary: "UDOO Camera - OpenCV 3.1(with Cmake) (Ubuntu 14.04)"
tags: ["삽질", "UDOO"]
key: tistory-22
---

#1. for opencv with gstreamer 0.10 (on UDOO - UDOObuntu quad v1.1 )

#2. for opencv with gstreamer 1.24 (on UDOO-UDOObuntu quad rc2)

0 step.

#1. 바탕화면에 UDOO Configuration Tool을 실행시켜 Enable UDOO Camera Module을 활성화 시켜준다.

#2. 생략

1st step.

#1.

To install the dependencies required from OpenCV, just run the following commands:

```
sudo apt-get -y install libopencv-dev build-essential cmake git pkg-config gstreamer0.10-0 gstreamer0.10-plugins-base gstreamer0.10-plugins-good gstreamer0.10-tools gstreamer0.10-plugins-bad gstreamer0.10-plugins-ugly
```

#2.

```
sudo apt-get -y install libopencv-dev build-essential cmake git pkg-config gstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-tools gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly
```

2nd step.

#1, #2 공통

- OpenCV 3.1 다운로드 및 압축 해제

- 그리고 압축푼 OpenCV 폴더 안에 새폴더를 하나 만든다.

(OpenCV 홈페이지에서 다운 받은 파일들은 기본적인 기능만 사용할 수 있는 라이브러리이다.

ffmpeg, TBB, gstreamer 와 같은 외부 라이브러리와 함께 사용하려면 cmake를 통해 다시 빌드해줘야 한다.)

```
cd opencv-3.1
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_V4L=ON -D WITH_GSTREAMER=ON ..
make -j $(nproc)
sudo make install
```

3rd step.

#1, #2 공통

To get OpenCV working properly, we need to tell Ubuntu:

```
sudo /bin/bash -c 'echo "/usr/local/lib" > /etc/ld.so.conf.d/opencv.conf'
sudo ldconfig
```

4th step.

Source Code - geany tool 사용

-main.cpp

```
#include "opencv2/opencv.hpp"#include <stdio.h>#include <iostream>using namespace std;using namespace cv;int main(void){//#1VideoCapture cap("mfw_v4lsrc ! ffmpegcolorspace ! video/x-raw-rgb ! appsink");//#2 (video/x-raw, format=I420, video/x-raw, format=BGR 생략 가능)VideoCapture cap("imxv4l2videosrc ! video/x-raw, format=I420 ! videoconvert ! video/x-raw, format=BGR ! appsink");for(;;){Mat frame;cap >> frame;imshow("camera", frame);if(waitKey(27) >= 0)break;}cap.release();return 0;}
```

build -> excute

하면 아마 빌드가 안될것이다. reference to ... 하면서 opencv lib가 linking이 되어 있지 않기 때문

Geany 에서 상단 메뉴에 Build 메뉴 선택 -> Set Build Commands -> Build 탭

C++ commands에 1. compile, 2. build 이렇게 있다.

이 중 build 옆에 command가

```
2. Build: g++ Wall -o "%e" "%f"
```

```
2. Build: g++ Wall -o "%e" "%f" `pkg-config --cflags --libs opencv`
```

로 변경해주고 다시 Build하면 성공 -> 실행하면 카메라가 실행 된다.

출처1: [http://rodrigoberriel.com/2014/10/installing-opencv-3-0-0-on-ubuntu-14-04/](http://rodrigoberriel.com/2014/10/installing-opencv-3-0-0-on-ubuntu-14-04/)

출처2: [http://highsineburgh.com/udoo-camera-and-opencv.html](http://highsineburgh.com/udoo-camera-and-opencv.html)
