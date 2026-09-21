---
title: "[OpenCV] OpenSIFT (for visual studio 2013)"
date: 2017-12-11
summary: "SIFT (Scale-invariant feature transform) 는 간단히 어떤 이미지에서 크기와 회전에 불변하는 특징점을 추출하여"
tags: ["삽질", "OpenCV"]
key: tistory-21
---

SIFT (Scale-invariant feature transform) 는 간단히 어떤 이미지에서 크기와 회전에 불변하는 특징점을 추출하여

다른 이미지에서 원본 이미지의 특징점을 찾아 검출 해내는 알고리즘. 그냥 물체를 인식하기 위한 그런 거...

[https://robwhess.github.io/opensift/](https://robwhess.github.io/opensift/) 에서 .zip 파일 다운로드

압축을 풀면 SIFT 관련 파일들이 있다.

OpenSIFT 에서 다운 받은 소스파일은 리눅스용으로 작성되어 있다.

이것을 Windows Visual Studio 환경에서 컴파일 하기 위해서는 수정이 필요하다.

0. Visual Studio 프로젝트 생성

프로젝트를 생성하고 다운 받은 SIFT 폴더안에 src 폴더에 있는 c파일, include 폴더안에 있는 .h 파일을 복사한다.

대충 이런 모양이 나올 것이다. 여기서 unistd.h 파일은 임의로 만든 헤더파일로 지금은 존재하지 않을 것이다.

빌드하면 수많은 에러들이 발생하는데 이제 본격적으로 요 환경에 맞게 수정을 해보자.

1. dirent.h 헤더 파일 추가

일단 첨부한 dirent.h 파일을 visual studio가 설치 된 폴더 -> include 폴더에 복사  
(C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\include)

그리고 Visual Studio 재시작

2. unistd.h 헤더 파일 추가

첨부한 unistd 헤더파일을 프로젝트안에 저장한다.

그리고 이 헤더파일을 SIFT 프로젝트 헤더 파일로 추가.

2. 이전 포스트에서 생성한 OpenCV Library, Include, .dll 파일을 추가.

프로젝트 속성 -> C/C++ -> 일반 -> 추가포함라이브러리 -> include 폴더 경로 설정

프로젝트 속성 -> 링커 -> 일반 -> 추가라이브러리디렉터리 -> lib 폴더 경로 설정

프로젝트 속성 -> 링커 -> 입력 -> 추가종속성 -> 위 라이브러리 폴더 안에 있는 lib 파일 이름 모두 입력

ex)

opencv_aruco300.lib  
opencv_bgsegm300.lib  
opencv_bioinspired300.lib  
opencv_ccalib300.lib  
opencv_datasets300.lib  
opencv_dnn300.lib  
opencv_dpm300.lib  
opencv_face300.lib  
opencv_hal300.lib  
opencv_line_descriptor300.lib  
opencv_optflow300.lib  
opencv_reg300.lib  
opencv_rgbd300.lib  
opencv_saliency300.lib  
opencv_stereo300.lib  
opencv_structured_light300.lib  
opencv_surface_matching300.lib  
opencv_text300.lib  
opencv_tracking300.lib  
opencv_ts300.lib  
opencv_world300.lib  
opencv_xfeatures2d300.lib  
opencv_ximgproc300.lib  
opencv_xobjdetect300.lib  
opencv_xphoto300.lib

3번 과정까지 했다면 일단 대부분의 에러는 잡았을 것이다. (적어도 헤더파일을 못찾았단 에러는 뜨지 않는다.)

이제 파일 하나하나씩 에러를 잡아보자.

4. dspfeat.c

이 소스파일은 앞서 헤더파일 경로만 잘 설정해주면 딱히 에러가 발생하지 않을 것이다.

<unistd.h> -> "unistd.h" 로 수정

5. imgfeatures.c

#include <opencv/cxcore.h>  
#include <opencv/cv.h>  
#include <opencv/highgui.h>

위 헤더 파일 추가.

M_PI -> CV_PI 로 수정

calloc -> 적절하게 강제 형변환자를 앞에 붙여 준다. (ex. f = (feature*)calloc(n, sizeof(struct feature)); )

6. kdtree.c

calloc, malloc 적절하게 강제 형변환

kdtree_bbf_knn() 함수안에 struct bbf_data* bbf_data; 로 선언된 것을 struct bbf_data* bbf_data_ 로 변경

아래 그림과 같이 변수명 변경 (원래는 bbf_data 라고 되있다.)

7. match.c

display_big_img( stacked, "Matches" ); ->

cvNamedWindow("Matches", 1);

cvShowImage("Matches", stacked);

로 변경

8. minpq.c

calloc, malloc 적절한 강제 형변환

9. sift.c

calloc, malloc 적절한 강제 형변환

244 line: double sig[_intvls+3] -> double* sig = (double *)calloc(intvls + 3, sizeof(double)); 로 변경

10. siftfeat.c

display_big_img( img, img_file_name ); -> cvShowImage("feat", img); 로 변경

11. utils.c

calloc, malloc 적절한 강제 형변환

#include <gdk/gdk.h> #include <gtk/gtk.h> 이 두 헤더 삭제

93 line: snprintf -> sprintf_s 로 수정

108 line: char* basename( const char* pathname ) -> char* basename(char* pathname ) 로 변경

[![](/assets/images/notes/21/6.gif)](https://t1.daumcdn.net/cfile/tistory/991936335A2DE3BC0D)

[![](/assets/images/notes/21/7.gif)](https://t1.daumcdn.net/cfile/tistory/996C01335A2DE3BD0C)

[![](/assets/images/notes/21/8.gif)](https://t1.daumcdn.net/cfile/tistory/99F7E5335A2DE3BC0A)

278 line: void display_big_img( IplImage* img, char* title ) 함수 통째로 제거

334 line: void vid_view( IplImage** imgs, int n, char* win_name ) 함수 스위치문 내 display_big_img 함수를

cvNamedWindow(win_name, 1);  
cvShowImage(win_name, imgs[i]); 이걸로 모두 대체

12. xform.c

calloc, malloc 적절한 강제 형변환

#include <cstdlib> 헤더파일 추가

94 line: random( time(NULL) ); -> srand(time(NULL)); 수정

485 line: x = random() % n; -> x = rand() % n; 수정

13. 헤더파일들

이놈들은 처음에 헤더파일 선언 부분 경로만 맞춰주면 딱히 문제가 없다.

14. 끝으로

이 소스파일에는 main 문이 3개 존재한다.

dspfeat.c, match.c, siftfeat.c   요 3개

각기 다른 기능을 하니 필요한 것을 제외하곤 나머지 2개 파일은 모두 주석처리하고 컴파일 하면 된다.

첨부된 파일은 visual studio 2013 (win32) 버전에서 c++ 파일로 수정한 것이다. (그렇다고 문법이 c++이 아니다..)

용량 제한으로 3rdparty 폴더 내 opencv 관련 파일들은 모두 삭제했다.
