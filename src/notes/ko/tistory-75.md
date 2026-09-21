---
title: "[GStreamer] RTSP 서버 구축 (Python, Odroid)"
date: 2023-02-27
updated: 2023-03-13
summary: "오드로이드 보드가 2종류가 있어서 모두 동일하게 기본적인 RTSP 서버 구축을 해보았습니다."
tags: ["FFmpeg", "GStreamer"]
key: tistory-75
---

오드로이드 보드가 2종류가 있어서 모두 동일하게 기본적인 RTSP 서버 구축을 해보았습니다.

|  | 개발 환경 1 | 개발 환경 2 |
|---|---|---|
| 하드웨어 | **Odroid C4** | **Odroid-XU4** |
| 운영체제 | **Ubuntu 20.04.5 LTS** | **Ubuntu 22.04 LTS** |
| 개발 언어 | **Python 2.7.18** | **Python 3.10.4** |
| 라이브러리 | **GStreamer 1.16.3** | **GStreamer 1.20.1** |
| 개발 도구 | **Visual Studio Code** |  |
| 기타 장비 | **웹캠** |  |

이번 환경 구축의 목적은 소형 컴퓨터에 카메라를 장착하여 아래와 같은 환경을 구성하기 위함입니다.

이번 포스팅은 이 중 데이터링크 모뎀은 제외하고 무선 공유기를 사용하고 짐벌 카메라는 웹캠으로 대체합니다.

![blob](/assets/images/notes/75/1.png)

#### 1. 오드로이드 환경 구축

- 오드로이드 공식 홈페이지에서 보드 모델명에 맞는 전용 운영체제를 다운받을 수 있습니다.

사용중인 모델명을 확인하고 해당 운영체제를 다운받아 플래시하고 부팅합니다.

[https://wiki.odroid.com/getting_started/os_installation_guide#operating_systems_we_re_providing](https://wiki.odroid.com/getting_started/os_installation_guide#operating_systems_we_re_providing)

#### 2. 사전에 필요한 패키지 설치

- 터미널에서 아래 명령어를 입력하여 업데이트 해줍니다.

- sudo apt install update
- sudo apt install build-essential
- sudo apt install libbsd2-2.0-0
- sudo apt install libfluidsynth2
- sudo apt install git cmake pkg-config libglib2.0-dev bison flex yasm (optional)

#### 3. GStreamer 라이브러리 설치

- GStreamer 라이브러리를 설치하는데 설치 버전은 우분투 버전에 따라 다를 수 있습니다.

여기서는 **Ubuntu 20.04.5 LTS**에서는 **1.16.3 버전**이 설치되었고, **Ubuntu 22.04 LTS**에서는 **1.20.1 버전**이 설치되었습니다. (그리고 여기 우분투는 오드로이드에서 커스터마이징한 운영체제이기 때문에 공식 우분투와는 또 다를 수 있습니다.)

특정한 버전의 GStreamer를 설치하고 싶다면 원하는 버전의 라이브러리 패키지파일을 받아서 직접 빌드하여 환경 구축을 해야할 겁니다.

- sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly gstreamer1.0-tools libgstreamer1.0-dev
- sudo apt install gir1.2-gst-rtsp-server-1.0
- sudo apt install libgstreamer1.0-0-dbg libgstreamer1.0-0 libgstreamer-plugins-base1.0-dev gtk-doc-tools (optional)
- gst-inspect-1.0 --version (설치된 GStreamer 버전 확인)

만약 패키지 설치 도중 오류가 발생한다면 오류 메시지를 보고 필요한 추가 패키지를 설치하시면 될겁니다.

#### 4. 파이썬 개발 환경 구축

- 여기서는 Visual Studio Code를 활용하여 파이썬을 사용합니다. (Linux용)

Visual Studio Code를 다운로드 한 후 설치하고 확장에서 python을 입력 한 후 설치해줍니다.

(GStreamer와 마찬가지로 우분투 버전에 따라 자동으로 설치되는 파이썬 언어 버전도 다를 수 있습니다.)

![](/assets/images/notes/75/2.png)

#### 5. RTSP Server 예제 소스 코드 (Python)

```
import gi

gi.require_version('Gst', '1.0')
gi.require_version('GstRtspServer', '1.0')
from gi.repository import Gst, GstRtspServer, GObject, GLib

if __name__ == '__main__':
    loop = GLib.MainLoop()
    GObject.threads_init()
    Gst.init(None)

    class RTSPFactory(GstRtspServer.RTSPMediaFactory):
        def __init__(self, **properties):
            GstRtspServer.RTSPMediaFactory.__init__(self)
        
        def do_create_element(self, url):
            pipeline = "v4l2src device=/dev/video0 ! videoconvert ! video/x-raw,format=I420 ! x264enc speed-preset=ultrafast tune=zerolatency ! rtph264pay name=pay0 pt=96"
            return Gst.parse_launch(pipeline)

    class GstServer():
        def __init__(self):
            self.rtspServer = GstRtspServer.RTSPServer()
            self.rtspServer.set_service("8554")   # RTSP port
            factory = RTSPFactory()
            factory.set_shared(True)
            mount = self.rtspServer.get_mount_points()
            mount.add_factory("/test", factory)   # RTSP URL sub string
            self.rtspServer.attach(None)

    rtspServer = GstServer()
    loop.run()
```

여기서 사용자에 따라 변경이 필요한 부분은 다음과 같습니다.

- pipeline = "v4l2src device=/dev/video0 ! ... ..." #웹캠 장비 번호 ! 옵션 ...
- self.rtspServer.set_service("8554") #RTSP 포트 번호
- mount.add_factory("/test", factory) #RTSP URL sub string

pipeline에는 현재 연결된 웹캠 장비의 번호를 입력해야합니다. C4에서는 웹캠을 연결하니 video0에 잡혔고, XU4에서는 video8에 잡혀서 그에 맞게 설정해줬습니다. ! 뒤에 옵션은 좀 더 알아봐야겠습니다.

이렇게 빌드를 성공하면 RTSP Server의 역할을 하고 있는겁니다.

이제 다른 PC에서 RTSP Server에 연결해서 영상을 표시해봅니다.

#### 6. RTSP Server 연결

- VLC Player를 사용하여 방금 구축한 RTSP Server에 접속해줍니다.

- 미디어 -> 네트워크 스트림 열기 (Ctrl + N) 하면 아래와 같은 화면이 나올겁니다.

네트워크 주소에 RTSP Server의 IP 주소를 입력하고 설정한 포트와 Sub string을 입력하여 재생합니다.

![](/assets/images/notes/75/3.png)

만약 연결할 수 없다는 오류가 뜬다면 서버와 클라이언트가 같은 네트워크에 구성되어 있는지 확인한 후

ping 명령어를 이용해서 RTSP Servre와 통신이 되고 있는지 확인하시고,

포트포워드 설정도 확인해보시길 바랍니다. (여기서는 포트포워딩 설정 없이 잘 됐습니다.)

#### 마무리

이상으로 오드로이드(우분투) 환경에서의 RTSP Server 구축을 해보았습니다. 영상 재생 결과 지연이 1초 이상 발생하는데, 현재는 문제가 없지만 추후 문제가 될 수도있기에 pipeline 옵션을 건드려보던지 해서 개선 방안을 찾아야 할 것 같습니다. 그리고 오드로이드가 부팅하면 자동으로 RTSP Server의 역할을 수행하도록 손봐야겠네요.
