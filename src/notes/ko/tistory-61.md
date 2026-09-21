---
title: "[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 1"
date: 2019-02-14
summary: "오랜만에 가장 유명한 멀티미디어 오픈소스 라이브러리 중 하나인 FFmpeg로"
tags: ["C#", "WPF"]
key: tistory-61
---

오랜만에 가장 유명한 멀티미디어 오픈소스 라이브러리 중 하나인 FFmpeg로

C#, WPF 환경에서 웹캠 영상을 받아와 화면에 디스플레이하는 기능을 구현해본다.

1장에서는 FFmpeg 패키지 설치부터 기본 환경설정에 대해 다루고

2장에서 관련된 소스를 코딩하는 작업을 다룰까 한다.

먼저 WPF App 프로젝트를 생성하고 NuGet 패키지 관리자로 들어간다.

(C# 프로젝트로 생성해도 무방하다. 대신 영상을 디스플레이하는 컨트롤이 달라질수도 있다.)

![](/assets/images/notes/61/1.png)

![](/assets/images/notes/61/2.png)

NuGet 패키지 관리자에서 찾아보기로 들어가 ffmpeg.Autogen을 검색해서 설치한다.

그러면 아래 그림과 같이 프로젝트 참조파일에 FFmpeg.AutoGen이 추가된걸 확인할 수 있다.

![](/assets/images/notes/61/3.png)        ![](/assets/images/notes/61/4.png)

그리고 프로젝트 아래에 FFmpeg 폴더를 만들어 주고 그 아래에 Decoder, Plugins 폴더를 만들어주자.

그리고 위 그림과 같이

**FFmpeg폴더** 하위단으로

**FFmpegBinariesHelper.cs**

**FFmpegHelper.cs**

FFmpeg폴더 - Decoder폴더 하위단으로

**VideoFrameConverter.cs**

**VideoStreamDecoder.cs**

이렇게 4개의 파일을 생성해준다.

현재 소스코드는 없으며 2장에서 다룰 예정이다. 껍데기만 만든다.

이제 FFmpeg 라이브러리를 사용하기 위한 dll 파일을 다운받아야 한다.

FFmpeg 공식 홈페이지로 들어가서 윈도우용 FFmpeg 다운로드 페이지로 들어간다.

![](/assets/images/notes/61/5.png)

![](/assets/images/notes/61/6.png)

Shared 버전으로 다운을 받고 압축을 풀고 Bin 폴더로 들어가면 아래와 같이 파일이 있을 것이다.

**(*Window 32bit용으로 받아야 한다.)**

그 중 아래 그림에 노란 박스에 있는 8개 파일을 조금전에 생성한 프로젝트 폴더내에

FFmpeg - Plugins 폴더에 붙여넣어 준다.

![](/assets/images/notes/61/7.png)

그리고 프로젝트에서 기존 항목을 추가하여 dll파일들을 모두 추가하면 아래 그림과 같이 보일 것이다.

![](/assets/images/notes/61/8.png)

이제 기본적인 환경 설정은 끝났다.

다음엔 내부 소스 코딩을 통해 웹캠에서 영상을 읽어들어 화면에 디스플레이해보자.
