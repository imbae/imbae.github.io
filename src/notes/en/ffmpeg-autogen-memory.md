---
title: Fixing a frame memory leak in ffmpeg.autogen
date: 2024-08-03
summary: A WPF player leaked memory on long playback — missing AVFrame / AVPacket cleanup.
tags: [FFmpeg, "C#", WPF]
project: videoplayer-pro
key: ffmpeg-autogen-memory
---

Memory kept climbing during long playback. The cause was simple but took a while
to find.

## Cause

Objects from `av_frame_alloc()` / `av_packet_alloc()` were never released inside
the loop. This is unmanaged memory — the GC never touches it.

## The pattern I settled on

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
            ffmpeg.av_packet_unref(packet);   // unref every iteration
            ffmpeg.av_frame_unref(frame);
        }
    }
}
finally
{
    ffmpeg.av_packet_free(&packet);            // free only on teardown
    ffmpeg.av_frame_free(&frame);
}
```

Don't confuse `unref` with `free`: `unref` inside the loop, `free` only when
discarding the resource itself.

## Verifying

Watch native memory in Task Manager, not `GC.GetTotalMemory` — the managed
number won't show it.
