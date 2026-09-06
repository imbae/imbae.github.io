---
title: ffmpeg.autogen 에서 프레임 메모리 누수 잡기
date: 2024-08-03
summary: WPF 영상 재생기에서 장시간 재생 시 메모리가 새던 원인 — AVFrame / AVPacket 해제 누락.
tags: [FFmpeg, "C#", WPF]
project: videoplayer-pro
key: ffmpeg-autogen-memory
---

장시간 재생하면 메모리가 계속 올라가는 문제가 있었다. 원인은 단순했지만
찾는 데 오래 걸렸다.

## 원인

`av_frame_alloc()` / `av_packet_alloc()` 로 만든 것을 루프마다 해제하지 않고 있었다.
관리되는 코드가 아니라 GC 가 건드리지 않는다.

## 정리한 패턴

```csharp
var packet = ffmpeg.av_packet_alloc();
var frame  = ffmpeg.av_frame_alloc();
try
{
    while (ffmpeg.av_read_frame(fmtCtx, packet) >= 0)
    {
        try
        {
            // decode ...
        }
        finally
        {
            ffmpeg.av_packet_unref(packet);   // 매 루프 unref
            ffmpeg.av_frame_unref(frame);
        }
    }
}
finally
{
    ffmpeg.av_packet_free(&packet);            // 종료 시 free
    ffmpeg.av_frame_free(&frame);
}
```

`unref` 와 `free` 를 헷갈리면 안 된다. 루프 안에서는 `unref`,
자원 자체를 버릴 때만 `free`.

## 확인

`GC.GetTotalMemory` 말고 작업 관리자의 native 메모리로 확인해야 보인다.
