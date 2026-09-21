---
title: "[FFMpeg] 명령어"
date: 2017-12-11
updated: 2023-02-27
summary: "두 비디오 파일 PSNR 비교"
tags: ["FFmpeg", "GStreamer"]
key: tistory-19
---

두 비디오 파일 PSNR 비교

ffmpeg -i input_video.mp4 -i reference_video.mp4 -filter_complex "psnr" "output_video.mp4"

RTSP 스트리밍 녹화하기

ffmpeg -i rtsp://127.0.0.1:8554/test -vcodec copy -acodec copy "rtspout.mp4" -threads 8 -y
