---
title: BGCS — 크로스플랫폼 GCS
projectSlug: bgcs
description: WPF 기반 드론 지상통제소를 Avalonia로 재구현한 크로스플랫폼 GCS.
---

수년간 WPF로 발전시켜 온 드론 지상통제소(GCS)를 **Avalonia UI**로 다시 구현하는
리뉴얼 프로젝트입니다. 하나의 코드베이스로 **Windows · Android · iOS · 브라우저**를
지원하는 것이 목표입니다.

## 하는 일

- 레이어드 아키텍처 설계 — `Core`(도메인) / `Infrastructure`(서비스) / `Shared`(Avalonia UI) / `Platforms`(플랫폼 헤드) 분리
- MVVM(CommunityToolkit.Mvvm) + DI, ViewLocator 기반 VM↔View 매핑
- 전송 계층 추상화 — UDP · TCP · Serial, 릴레이 서버 경유 연결
- 지도(Mapsui), 영상(FFmpeg.AutoGen, Windows 전용), 인증(EF Core SQLite) 통합
- 드론 통신은 자체 프로토콜 라이브러리(서브모듈)로 처리

## 스택

Avalonia 11 · .NET 10 · CommunityToolkit.Mvvm · Mapsui · FFmpeg.AutoGen · Serilog · xUnit

> 진행 중. 플랫폼별 기능 매트릭스(Serial·영상은 데스크톱 우선)를 두고 단계적으로 확장.
