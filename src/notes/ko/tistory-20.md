---
title: "[OpenCV] cMake를 이용하여 OpenCV 3.0 빌드하기 (for Visual Studio 2013)"
date: 2017-12-11
summary: "cMake를 이용하여 OpenCV 3.0 빌드하기 (for Visual Studio 2013)"
tags: ["삽질", "OpenCV"]
key: tistory-20
---

1. OpenCV 소스 다운로드

OpenCV: [http://opencv.org/](http://opencv.org/)

GitHub: [https://github.com/itseez/opencv](https://github.com/itseez/opencv)

두 사이트 중 아무곳에서 다운을 받고 경로에 압축을 푼다. (C:\OpenCV 3.0\opencv_master)

(github를 추천, 공식홈피에서 제공하는 소스는 직접 빌드하기엔 에러가 많이 난다는 소리가...)

2. 추가 모듈 다운로드

SURF, SIFT 등 추가 모듈을 활용하려면 아래 링크에서 다운로드 및 설치 경로에 압축 해제

(C:\OpenCV 3.0\opencv_contrib)

[https://github.com/Itseez/opencv_contrib](https://github.com/Itseez/opencv_contrib)

3. CMake 다운로드 및 설치

[https://cmake.org/download/](https://cmake.org/download/)

4. CMake로 configure & generate

a) openCV 3.0 소스 경로와 솔루션이 생성될 경로 설정

b) configure를 눌러 compiler 선택 (난 visual studio 2013(x86)이니까... )

c) configure가 되면 빨간 놈들이 쭉 뜬다.

extra로 검색해서 OPENCV_EXTRA_MODULES_PATH에 2번에서 다운받은 파일의 경로 입력

(C:/OpenCV 3.0/opencv_contrib/modules)

d) BUILD_opencv_world 체크 (대부분의 주요함수가 들어 있다고 한다.)

BUILD_opencv_stitching 체크 해제 (발암물질이 있다고 한다. 똥은 피하자)

나머지 옵션들은 선택 사항 (내가 선택한 것은 WITH_OPENMP, WITH_OPENGL 이 두개)

e) 빨간색이 없어질 때까지 configure 클릭 후 generate 클릭

5. Visual Studio로 빌드하기

a) 생성된 C:/OpenCV 폴더 안에 OpenCV.sln 클릭

b) ALL_BUILD -> 우클릭 -> 다시 빌드 : 모두 정상 빌드 되어야 함.

하지만 에러가 2개 뜸. (본 포스트와 똑같은 설정으로 했다면)

하나는 opencv 관련 헤더 파일을 찾을 수 없다는 거고 다른 하나는 외부참조를 알 수 없다는 것이었나.. 기억이 잘 안남

하여튼 그 에러를 발생시킨 솔루션을 지워버리면 해결.

c) 정상 빌드 되었다면 CMkaeTarget 솔루션 -> INSTALL 프로젝트 -> 우클릭 -> 프로젝트만 -> INSTALL만 다시 빌드

그러면 C:\OpenCV\install 경로에 아래 파일들이 생성 됨

6. 가져다 쓰기

5번에서 생성된 include 폴더, x86/vc12/bin 폴더에 생성된 .dll 파일들, x86/vc12/lib 폴더에 생성된 .lib 파일들을 사용.

a) 프로젝트를 생성 (C++, 콘솔응용프로그램, 빈 프로젝트)

b) 솔루션 선택 -> 우클릭 -> 속성 -> C/C++ -> 일반 -> 추가 포함 디렉터리 -> include 경로 설정

-> 링커 -> 추가 라이브러리 디렉터리 -> lib 경로 설정

-> 링커 -> 입력 -> 추가 종속성 -> lib 이름 입력

c) 솔루션 컴파일 -> 솔루션 폴더에 Debug 또는 Release 폴더가 생성 되어 있을 것.

해당 폴더에 .dll 파일들 복사

d) 예제를 돌려 openCV를 활용해보자.

참고: [http://zacurr.tistory.com/553](http://zacurr.tistory.com/553)

[![](/assets/images/notes/20/6.jpg)](http://zacurr.tistory.com/553)

[OpenCV 3.0 + Visual Studio 2013 으로 CompileOpenCV 3.0이 공개되었다. http://opencv.org/ http://docs.opencv.org/3.0.0/ https://github.com/itseez/opencv 튜토리얼 http://docs.opencv...zacurr.tistory.com](http://zacurr.tistory.com/553)
