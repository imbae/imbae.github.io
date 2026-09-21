---
title: "[C#/WPF] FFmpeg로 WebCam / RTP / RTSP 영상 Display & Recode"
date: 2019-02-27
updated: 2019-03-04
summary: "이전에 웹캠, RTSP 영상을 단순히 출력하는 프로그램을 작성해보았다."
tags: ["C#", "WPF"]
key: tistory-66
---

이전에 웹캠, RTSP 영상을 단순히 출력하는 프로그램을 작성해보았다.

이번에는 출력과 동시에 녹화까지 하도록 수정해 볼 것이다.

시작을 위한 환경설정은 이전 포스팅과 동일하다.

**[[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 1](/notes/tistory-61/)**

영상 녹화를 위해서는 트랜스코딩을 해야 한다. 물론 비디오 프레임을 읽어서 그대로 파일로 저장할 수도 있지만

대게 입력 비디오의 코덱이 다 다르고 내가 원하는 출력 비디오의 코덱이 다르기 때문이다.

(ex. Rawvideo -> H.264)

요즘엔 H.264 코덱을 가장 널리 쓰기 때문에(손실 압축이지만 괜찮은 화질은 보장한다)

H.264로 압축해서 비디오 파일을 만들어본다.

트랜스 코딩의 대략적인 과정은 아래 그림과 같다.

![](/assets/images/notes/66/1.png)

Input File에서 특정 코덱으로 압축된 영상패킷를 읽어오고 디코딩하여 압축되지 않은 프레임데이터를 얻는다.

다시 압축되지 않은 프레임데이터를 인코더에 집어넣어 특정 코덱으로 영상패킷을 압축하여 파일에 저장한다.

간단하다.

그런데 삽질을 많이 했다.

대부분 ffmpeg.exe로 영상을 편집하는 자료들이었고 C#으로 구현한 것은 거의 없었다.

심지어 최근 ffmpeg 4.1 버전이 아닌 옛날 버전... 지원되지 않는 함수..

코딩 중 발생한 에러들을 구글링하면 몇몇은 질문글은 있는데 답변이 없다.

운좋게 해결방법을 올려 놓은 글을 찾아도 나에겐 해당이 안된다...

답변 글에 저도 안되요. 저는 이렇게 안되요 어떻게 해야되나요 라는 또 다른 질문 글이..

정말 ffmpeg.Autogen은 신의 한수다.

아래 FFmpeg.AutoGen 깃허브에서 파일을 다운받아서 한 번 돌려보면 일단 반은 한 셈이다.

**[FFmpeg.Autogen Example](https://github.com/Ruslan-B/FFmpeg.AutoGen)**

예제에서는 비디오 파일을 읽어 모든 프레임을 .jpg 이미지 파일로 저장한다.

그리고 저장한 .jpg 이미지 파일을 모두 읽어 동영상 파일로 만드는 소스를 구현해 놓았다.

하지만 내가 원하는 방식은 입력 영상으로부터 디코딩된 데이터를 다시 내가 원하는 코덱으로

인코딩하여 바로 영상파일로 만드는 것이기 때문에 이 예제소스를 바탕으로 손을 좀 봤다.

인코딩 디코딩 모두 동일하게 사용하는 핵심 클래스는 아래 2가지이다.

- AVFormatContext: 영상 파일(스트림)의 정보를 담고 있다.
- AVCodecContext: 코덱에 관한 모든 정보를 담고 있다.

**입력 영상 디코딩**

디코딩의 처음 과정은 다음과 같다.

1. 비디오 파일을 읽어서 비디오 스트림 정보를 AVFormatContext에 저장한다.

- avformat_open_input

- avformat_find_stream_info

2. AVFormatContext에 저장된 코덱 정보를 읽어 해당 코덱으로 압축을 풀 준비를 한다.

(비디오에서 사용된 코덱을 통해서만 압축을 풀 수 있다. - for Decoding)

- avcodec_find_decoder

- avcodec_open2

3. AVFormatContext로부터 비디오 패킷을 하나씩 얻는다.

- av_read_frame

4. 획득한 비디오 패킷을 코덱 정보(AVCodecContext)와 함께 디코더에 집어 넣는다.

- avcodec_send_packet

5. 디코더로부터 디코딩 된 비디오 프레임을 획득한다.

- avcodec_receive_frame

6. 획득한 디코딩된 비디오 프레임의 픽셀 포맷을 BGR24로 Convert해주고

Bitmap으로 변환시켜 화면에 디스플레이한다.

**출력 영상 인코딩**

1. 비디오 파일을 쓰기 위해 AVFormatContext를 할당하고

기본적인 비디오 스트림 정보를 AVFormatContext에 저장한다.

(ex. width, height, codec, pix_fmt, time_base, framerate etc.)

- avformat_alloc_output_context2

2. 사용자가 설정한 코덱을 사용할 준비를 한다.

- avcodec_open2

3. 설정한 AVFormatContext정보를 바탕으로 출력할 비디오 파일의 헤더를 써준다.

-avformat_write_header

4. 디코딩된 비디오 프레임의 픽셀 포맷을 YUV420P으로 Convert하고

pts(영상 재생 속도 관련)를 설정한다.

5. 디코딩된 비디오 프레임을 AVCodecContext 정보와 함께 인코더에 집어넣는다.

- avcodec_send_frame

6. 인코더로부터 사용자가 설정한 코덱으로 압축된 비디오 패킷을 획득한다.

- avcodec_receive_packet

7. 획득한 비디오 패킷을 파일에 쓴다.

- av_write_frame(AVCodecContext,  encoded_packet)

8. flush

- av_write_frame(AVCodecContext, null)

9. 출력할 비디오 파일의 테일을 작성한다.

- av_write_trailer

는 비디오 스트림의 끝까지 반복되는 부분이다.

![](/assets/images/notes/66/2.png)

대략적인 다이어그램은 위 그림과 같다.

인코딩 과정에서 신경써줘야 할 부분은 Frame의 **pixel format**과 **PTS, DTS** 설정이다.

pixcel format은 사용자가 정의한 코덱 ID에 따라 다르고

(H.264 같은 경우에는 Pixel format이 보통 YUV420P이다. YUV422P, YUV444P도 가능하다.

즉 코덱마다 지원되는 Pixel format이 다르기 때문에 확인 후 변환해야 한다.)

참고로 만약 입력 비디오가 H.264로 압축이 되서 오는데 나도 H.264로 녹화를 하고 싶다면

Convert할 필요없이 다이렉트로 바로 av_write_frame을 해버려도 무방하다.

물론 그에 따라 Codec 정보나 Timestamp 등 몇 가지 정보는 맞춰줘야 할 수도 있다.

![](/assets/images/notes/66/3.png)

PTS는 Presentation Time Stamp의 약자이며

못해도 이때까지는 화면에 보여야한다" 라는 것을 알려주는 것이 PTS 이다.

자세한 내용은 아래 블로그를 참조하면 된다.

**[Time Stamp? PTS? DTS?](http://egloos.zum.com/muzie/v/7252569)**

현재 예제에서는 pts 설정을 단순히 frameNumber를 카운팅시켜 넣었지만 영상에 따라 달라질 수 있으니

적절한 pts, dts 설정이 필요하다.

비디오 녹화가 끝나면 반드시 flush작업과

av_write_trailer 작업을 해줘야 정상적인 비디오 파일이 생성된다.

**[소스코드](https://github.com/imbae/FFmpeg-usbCam.git)**
