---
title: fflux
projectSlug: fflux
description: ffmpeg.autogen를 직접 호출하는 개발자용 WPF 비디오 플레이어. 기능 소개.
---

`ffmpeg.exe`를 외부 프로세스로 부르지 않고 **ffmpeg.autogen API를 직접** 호출하는
WPF 비디오 플레이어입니다. GPL 코덱을 링크하지 않아 **LGPL 조건을 완전히 준수**하며,
개발·검수 현장에서 필요한 기능(실시간 통계, 무손실 구간 녹화, 자막 편집, FFmpeg
커맨드 빌더)을 한 앱에 모았습니다.

## 무료 기능

### 재생 · 스트리밍
- MP4 · MKV · AVI · MOV · WMV · WebM · TS 등 주요 컨테이너 재생
- `rtsp://` · `rtp://` · `udp://` · `srt://` · `rtmp://` 라이브 스트림 직접 입력
- WASAPI 저지연 오디오 출력, 배속 0.25×–2×, 프레임 단위 스텝/시크

### 실시간 통계 · 미디어 정보
- FPS · 비트레이트 · 프레임 번호를 재생 중 실시간 표시
- 코덱 · 해상도 · 스트림 정보를 우측 슬라이딩 패널에서 확인
- 실시간 비트레이트 롤링 차트

### 구간 녹화
- **Stream Copy** 방식 — 재인코딩 없이 선택 구간을 원본 품질 그대로 MKV/MP4/TS로 저장
- GIF 내보내기

### 자막 편집기
- SRT / VTT 불러오기 → DataGrid에서 타임스탬프·텍스트 인라인 편집 → 저장
- "위치로 이동" — 해당 자막 시점의 영상 프레임을 미리보기
- 동영상을 열면 같은 이름의 자막을 자동 로드

### FFmpeg Explorer
- 입력/출력·비디오/오디오/필터 옵션을 GUI로 조립해 FFmpeg 커맨드라인 자동 생성
- 클립보드 복사 또는 즉시 실행

## PRO 기능

별도 private 서브모듈이 포함된 빌드에서만 활성화됩니다.

### AI 자막 생성
- **Whisper**로 음성 전사 → **Groq(Llama 4)** 또는 **DeepL**로 번역 → `.srt` 출력
- 내장 UI에서 로컬 Python(faster-whisper) 서버를 직접 시작
- 번역 구문은 SQLite에 캐시해 중복 API 호출 방지
- 재생 중 실시간 전사·번역 오버레이

### MISB KLV 메타데이터
- **MISB ST 0601**(UAS Datalink) · **ST 0903**(VMTI) 파싱
- 프레임별 VMTI 바운딩 박스 + 분류 레이블 오버레이
- 센서 위치(위/경도·고도), 플랫폼 자세(Heading/Pitch/Roll), FOV 패널
- 시크 시 해당 위치의 KLV 즉시 동기화

## 기술 메모

- WPF · .NET 10 · ffmpeg.autogen 8.1.0, MVVM(CommunityToolkit.Mvvm) + DI
- `unsafe` 디코더 코드는 래퍼로 격리하고 인터페이스로만 노출
- 녹화는 항상 Stream Copy — x264/x265 등 GPL 인코더 링크 금지
- `Directory.Build.props`가 서브모듈 존재 여부를 감지해, 없으면 PRO 블록을
  컴파일에서 제외하고 무료 기능만으로 빌드
