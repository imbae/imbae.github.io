---
title: GCSdev — 드론 지상통제소
projectSlug: gcsdev
description: 자체 정의 비행 프로토콜로 FCC와 통신하는 Windows 기반 드론 GCS.
---

자체 정의한 비행 프로토콜(ICD)로 비행제어컴퓨터(FCC)와 통신하는 Windows GCS입니다.
ICD에 명시된 기능 전반을 지원하며, **고정익 · 멀티콥터 · 헬리콥터** 세 기체 유형을 다룹니다.
현재는 크로스플랫폼 후속(BGCS)으로 이관 중입니다.

## 다룬 영역

- 실시간 모니터링 — 계기(PFD/HUD), 지도, 텔레메트리, 80종 이상의 프로토콜 패킷 이벤트 처리
- 지상 설정 — 시스템 · IMU · 서보 · 수신기 · 캘리브레이션
- 비행 파라미터 편집 (기체 유형별), 파일 저장/로드
- 미션 계획 — 경로점 · Survey 패턴
- GNSS/RTK, 조이스틱, 착륙 패턴, 단축키 핸들러
- MVVM(CommunityToolkit.Mvvm), Serilog 로깅, MongoDB/MySQL 연동

## 스택

WPF · .NET 8 · CommunityToolkit.Mvvm · MaterialDesign + MahApps · HelixToolkit(3D) · LiveCharts/OxyPlot · Serilog
