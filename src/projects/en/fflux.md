---
title: fflux
projectSlug: fflux
description: A developer-focused WPF video player built directly on ffmpeg.autogen. Feature overview.
---

A WPF video player that calls the **ffmpeg.autogen API directly** instead of
spawning `ffmpeg.exe`. It links no GPL codecs, so it stays **fully LGPL-compliant**,
and it bundles the things you actually need while developing or reviewing video —
live stats, lossless segment recording, subtitle editing, an FFmpeg command
builder — into one app.

## Free features

### Playback · streaming
- Plays MP4 · MKV · AVI · MOV · WMV · WebM · TS and other common containers
- Direct URL input for `rtsp://` · `rtp://` · `udp://` · `srt://` · `rtmp://` live streams
- Low-latency WASAPI audio, 0.25×–2× speed, frame-step and seek

### Live stats · media info
- FPS, bitrate and frame number shown live during playback
- Codec / resolution / stream info in a sliding side panel
- Rolling real-time bitrate chart

### Segment recording
- **Stream Copy** — extracts the selected range at original quality (MKV/MP4/TS) with no re-encode
- GIF export

### Subtitle editor
- Load SRT / VTT → edit timestamps and text inline in a DataGrid → save
- "Go to position" previews the video frame at a cue's timestamp
- Opening a video auto-loads a same-named subtitle

### FFmpeg Explorer
- Assemble input/output, video/audio and filter options via GUI to generate an FFmpeg command line
- Copy to clipboard or run directly

## PRO features

Enabled only in builds that include the private submodules.

### AI subtitle generation
- **Whisper** transcription → translation via **Groq (Llama 4)** or **DeepL** → `.srt`
- Starts a local Python (faster-whisper) server from the built-in UI
- Translated phrases cached in SQLite to avoid redundant API calls
- Live transcription/translation overlay during playback

### MISB KLV metadata
- Parses **MISB ST 0601** (UAS Datalink) and **ST 0903** (VMTI)
- Per-frame VMTI bounding boxes with classification labels
- Panel for sensor lat/lon/alt, platform heading/pitch/roll, and FOV
- KLV re-syncs instantly on seek

## Engineering notes

- WPF · .NET 10 · ffmpeg.autogen 8.1.0, MVVM (CommunityToolkit.Mvvm) + DI
- `unsafe` decoder code is isolated behind wrappers and exposed only via interfaces
- Recording is always Stream Copy — no GPL encoder linking (x264/x265)
- `Directory.Build.props` detects the submodules; without them the PRO blocks are
  excluded from compilation and the app builds with free features only
