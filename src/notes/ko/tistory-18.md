---
title: "[GStreamer] About GStreamer"
date: 2017-12-11
updated: 2023-02-27
summary: "GStreamer는 미디어 스트리밍 애플리케이션을 만들기 위한 프레임워크입니다."
tags: ["FFmpeg", "GStreamer"]
key: tistory-18
---

GStreamer는 미디어 스트리밍 애플리케이션을 만들기 위한 프레임워크입니다.

GStreamer의 개발 프레임워크를 이용하면 모든 유형의 스트리밍 애플리케이션을 개발이 가능합니다. GStreamer 프레임워크는 오디오와 비디오를 쉽게 처리할 수 있게 설계되었습니다. GStreamer는 오디오나 비디오에 제한 없이, 모든 종류의 데이터 흐름도 처리할 수 있습니다. 파이프라인 디자인은 적용하는 필터에 따라 오버헤드가 약간 발생할 수 있습니다. 이러한 사항은 GStreamer가 높은 지연(latency) 요구 사항의 고사양 오디오 애플리케이션 개발에도 적용할 수 있는 좋은 프레임워크가 되게 합니다.

GStreamer는 아래와 같은 패키지로 구성됩니다.

- gstreamer : 핵심 패키지 기본 기능과 라이브러리, 테스트 코드 등을 포함
- gst-plugins-base : 핵심적인 검증된 엘리먼트의 집합
- gst-plugins-good : LGPL을 따르는 양질의 플러그인 집합
- gst-plugins-ugly : 배포 문제를 야기할 수 있는 양질의 플러그인 집합
- gst-plugins-bad : 질이 부족한 플러그인의 집합
- gst-libav : 디코딩과 인코딩을 위해 libav로 포장된 플러그인의 집합
- 몇 개의 다른 패키지

argv[1] = "imxv4l2videosrc device=/dev/video0 imx-capture-mode=0 latency=0 ! imxipuvideotransform ! imxvpuenc_h264 bitrate=5000 ! rtph264pay name=pay0 pt=96";    loop = g_main_loop_new (NULL, FALSE);  
  /* 서버 인스턴스 생성*/  server = gst_rtsp_server_new ();  
  /* 이 서버의 마운트 지점을 가져 온다.모든 서버에는 uri 마운트 지점을 미디어 팩토리에 매핑하는 데 사용되는 기본 객체가 있습니다.

*/

mounts = gst_rtsp_server_get_mount_points (server);  
  /* 스트림을위한 미디어 팩토리를 만든다.

*/

factory = gst_rtsp_media_factory_new ();  gst_rtsp_media_factory_set_launch (factory, argv[1]);  
  /* 테스트 팩토리를 / test url에 첨부 */  gst_rtsp_mount_points_add_factory (mounts, "/test", factory);  
  /* 더 이상 매퍼에 대한 참조가 필요하지 않습니다. */  g_object_unref (mounts);  
  /* 서버를 기본 maincontext에 연결 */  gst_rtsp_server_attach (server, NULL);  
  /* start serving */  g_print ("stream ready at rtsp://127.0.0.1:8554/test\n");

g_main_loop_run (loop);
