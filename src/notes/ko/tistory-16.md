---
title: "[FFMpeg] vlc 플레이어를 이용하여 rtsp 스트림 열기 및 ffmpeg로 재생하기"
date: 2017-12-11
updated: 2023-02-27
summary: "cmd에서 ffplay가 있는 경로로 찾아가서 아래 명령어 입력"
tags: ["FFmpeg", "GStreamer"]
key: tistory-16
---

1. 로컬 비디오 파일을 rtsp 스트림으로 오픈 하는 방법은 다음과 같다.

[http://dg087.tistory.com/66](http://dg087.tistory.com/66)

[VLC Player - RTSP Streaming Server 설정(파일사용)
RTSP Streaming Server 설정 먼저, 파일을 이용하여 RTSP Streaming Server 설정하기 위해 비디오 파일을 준비한다. 1. 스트림할 파일...
dg087.tistory.com](http://dg087.tistory.com/66)

![](/assets/images/notes/16/2.gif)

2. 다운 받은 ffmpeg-shared 폴더안에 ffplay를 이용하여 위에서 오픈한 rtsp 서버에 접근하여 영상을 재생한다.

cmd에서 ffplay가 있는 경로로 찾아가서 아래 명령어 입력

ffplay.exe rtsp://127.0.0.1:8554/test -threads 4 -x 640 -y 480
