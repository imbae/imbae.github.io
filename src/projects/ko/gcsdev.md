---
title: GCSdev — 드론 지상통제소
projectSlug: gcsdev
description: 자체 개발 OFP 프로토콜로 비행제어컴퓨터와 통신하는 Windows GCS. 7년 이상 운영, 4종 기체 지원.
---

자체 개발한 **OFP(Open Flight Protocol)** 로 비행제어컴퓨터(FCC)와 통신하는 Windows 지상통제소(GCS)입니다.
입사 후 처음 맡아 설계부터 배포·유지보수까지 전 과정을 책임진 프로젝트로, **7년 이상** 실제 비행
현장의 피드백을 받으며 통신 프로토콜과 UI를 함께 키웠습니다. 현재는 크로스플랫폼 후속인
[BGCS](/work/bgcs/)로 이관 중입니다.

## 왜 자체 개발했나

상용 GCS는 오픈소스 프로토콜(MAVLink)을 전제로 해서, 회사 자체 FCC의 독자 프로토콜과 세밀한 파라미터
체계를 그대로 지원하기 어렵습니다. 그래서 자체 프로토콜(OFP) 기반 GCS를 처음부터 설계했습니다.

## 아키텍처

```
View (XAML) ⇄ ViewModel ⇄ Model
              ⇕ WeakReferenceMessenger (약결합 메시징)

BLinkManager (통신 총괄, 싱글톤)
 ├─ Serial / TCP / UDP 전송 계층
 ├─ DownlinkHandler : FCC → GCS (위치·자세·시스템 상태)
 └─ UplinkHandler   : GCS → FCC (모드 전환, 미션 시작, RTK 보정값 전송 …)
```

- **MVVM + 메시징** — 화면끼리 직접 참조하지 않고 발행/구독으로 통신해, 화면이 늘어도 결합도가 낮게 유지됩니다.
- **OFP 통신 계층** — 85개 이상의 패킷 이벤트 핸들러, Serial(57600/115200 bps) 또는 TCP/UDP로 최대 100 Hz 송수신.
- **라이브러리 자산화** — 통신(BrainsLink)·지도(BrainsGMap)·공통 유틸(BrainsToolkit)·영상(BrainsCV)을 Git
  서브모듈로 분리해, GCS 본체와 독립적으로 재사용 가능한 자산으로 관리했습니다.

## 주요 성과

- **4종 기체 통합 지원** — 하이브리드(VTOL) · 고정익 · 멀티콥터 · 헬리콥터의 서로 다른 파라미터 체계를 하나의 UI/UX로.
- **RTK 정밀 측위** — RTK 보정 데이터(RTCM3)를 NTRIP 기준국에서 받아 기체에 분할 전송하는 기능을 직접 구현.
  GPS 수 미터 오차를 센티미터급으로 줄였습니다.
- **군집 기능 확장** — 단일 기체 구조에 기체 식별자(Vehicle ID)를 추가하고 업/다운링크를 기체별로 라우팅해
  다중 기체 식별·모니터링·제어로 단계 확장.
- **AI 객체 탐지 통합** — Python 기반 YOLO 모델을 `pythonnet`으로 C# 앱에 연동(실시간 영상 내 객체 인식).
- 3D 자세 표시(HelixToolkit), 실시간 차트(LiveCharts·OxyPlot), 원격 장비 제어(SSH·FTP), 로그 저장(MongoDB·MySQL).

## 회고 — 왜 BGCS인가

수년간 운영하며 기술 부채가 쌓였습니다. 노후화된 UI 라이브러리, Windows 전용 한계, 펌웨어 버전마다
다른 ICD를 코드 안에서 수기로 분기하는 유지보수 비용, 85개 이상의 핸들러가 몰린 비대한 단일 파일 등입니다.
처음부터 다시 만드는 대신 **근본 원인을 진단**하고 크로스플랫폼·계층형 아키텍처로 재설계하는 것이 BGCS입니다.
노후화 문제를 스스로 진단해 다음 세대 아키텍처를 설계한 과정이 이 프로젝트의 핵심이라고 생각합니다.

## 스택

C# · .NET 8 · WPF · CommunityToolkit.Mvvm · MaterialDesign + MahApps · HelixToolkit · LiveCharts / OxyPlot ·
Serilog · MongoDB / MySQL · SSH.NET / FluentFTP · pythonnet(YOLO)
