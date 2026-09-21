---
title: "[FFMpeg] ffmpeg.exe로 동영상 인코딩을... (Windows)"
date: 2017-12-11
updated: 2023-02-27
summary: "일단 ffmpeg를 다운받아야 겠지"
tags: ["FFmpeg", "GStreamer"]
key: tistory-14
---

일단 ffmpeg를 다운받아야 겠지

[http://ffmpeg.zeranoe.com/builds/](http://ffmpeg.zeranoe.com/builds/)

[Zeranoe FFmpeg - Builds
 
ffmpeg.zeranoe.com](http://ffmpeg.zeranoe.com/builds/)

![](/assets/images/notes/14/1.gif)

자신의 윈도우 환경(x86, x64)에 맞는 shared 버전을 다운 받는다.

압축을 풀고 bin 폴더에 들어가면 ffmpeg.exe 파일이 있다. 이 파일을 이용해서 동영상 인코딩을 할 것이다.

명령 프롬프트(cmd)를 실행시켜서 이 경로를 따라가자.

그리고 위 명령을 한 번 입력해보자. 옵션은 이 외에도 많지만... 이런게 있다 정보만 알고 넘어가자는 의미에서...

자세한 옵션 정보는 ffmpeg -help 를 치면 쭉 나온다.

ffmpeg -y -f rawvideo -pix_fmt yuv420p -s:v 1280:720 -r 30 -i example.yuv -b:v 3000k -c:v libx264 out.avi -psnr

-y: 덮어쓰기 yes

-f: force fotmat

-pix_fmt: pixel format

-s:v: 영상 크기

-r: fps

-i <input video>: 입력 영상

-b:v: bitrate 설정

-c:v: codec 설정

-psnr: psnr 값 계산한 것을 마지막에 출력 시켜 준다.

여기서 -f, -pix_fmt, -i 를 제외하곤 output 영상의 설정을 해주는 것이라 보면 된다.

따라서 이 예제는 yuv 형식의 rawvideo 파일을 h264 형식의 avi 파일로 변환해주는 것이다.

(yuv 시퀀스 영상은 구글에 검색하면 쭉 뜬다)

위 옵션으로 실행하면 위 그림과 같이 뭐가 좌라락 뜨면서 새로운 out.avi 파일이 bin 폴더에 생성이 된다.

실행시켜서 동영상 정보를 확인해보자.

설정한 옵션 값과 생성된 동영상 정보가 일치... 잘 되었다. (bitrate는 가변)
