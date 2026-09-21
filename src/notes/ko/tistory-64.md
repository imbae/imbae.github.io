---
title: "[FFmpeg] FFplay 로 USB Camera(WebCam) Display 하기"
date: 2019-02-14
updated: 2023-02-27
summary: "ffplay.exe로 웹캠 영상을 디스플레이하는 명령어를 알아본다."
tags: ["FFmpeg", "GStreamer"]
key: tistory-64
---

ffplay.exe로 웹캠 영상을 디스플레이하는 명령어를 알아본다.

FFmpeg 다운은 아래 포스팅을 참고

[[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 1](/notes/tistory-61/)

FFmpeg를 다운받고 압축을 풀었으면 커맨드창을 통해 해당 경로의 Bin폴더로 들어간다.

폴더안에 ffmpeg.exe 와 ffplay.exe 등이 있을 것이다.

그리고 아래 명령어를 입력한다.

**ffplay -f dshow -i video="AVerMedia GC550 Video Capture"**

여기서 video="camera device name" 이다.

명령어를 입력하고 엔터를 치면 아래와 같이 새 창이 뜨면서 영상이 재생될 것이다.

![](/assets/images/notes/64/1.png)

계륜미는 이쁘다.
