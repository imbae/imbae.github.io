---
title: BGCS — 크로스플랫폼 GCS
projectSlug: bgcs
description: WPF 기반 드론 지상통제소를 Avalonia로 재구현한 크로스플랫폼 GCS. Clean Architecture, 멀티 비히클, 단위 테스트 2,600개+.
---

기존 WPF(Windows 전용) 드론 지상통제소(GCS)를 **Avalonia UI**로 재구현해
**Windows · Android · iOS(추후 Web)** 를 하나의 코드베이스로 지원하는 프로젝트입니다.
GCS는 조종사가 무인기의 상태(위치·자세·배터리 등)를 실시간으로 확인하고 임무를
계획·지시하는 관제 소프트웨어입니다. 아키텍처 설계와 핵심 기능 구현을 단독으로 진행하고 있습니다.

## 왜 다시 만드나

- **플랫폼 종속** — WPF는 Windows에서만 동작합니다. 태블릿·모바일 관제 요구가 늘었습니다.
- **다기종·다버전 대응** — 펌웨어 버전마다 통신 규격(ICD)이 미묘하게 달라 유지보수가 어려웠습니다.
- **품질 신뢰성** — 국내 SW 품질 인증(GS)을 염두에 두고, 테스트·문서화 기준을 처음부터 엄격하게 관리합니다.

## 아키텍처

```
[GCS 클라이언트] ── 자체 프로토콜(UDP/TCP) ──► [릴레이 서버] ──► [드론]
 Windows · Android · iOS                              Serial 직접 연결(Windows)
```

- **Clean Architecture** — `Shared` → `Core`(도메인, UI 미참조) → `Infrastructure/Media/Map` →
  Avalonia 공유 UI → 플랫폼 헤드(Desktop·Android·iOS·Browser). **의존 방향을 한쪽으로 강제**했습니다.
- ViewModel은 `IVehicleService` 같은 **인터페이스만** 알고, 실제 UDP/Serial 구현은 DI가 주입합니다.
- 모바일 미지원 기능(Serial, 영상)은 **Stub 구현체**로 대체하고, 플랫폼 분기(`#if`)는
  앱 시작의 DI 등록 한 곳에서만 허용하는 규칙을 팀 컨벤션으로 정했습니다.
- 범용 템플릿과 고객 전용 제품이 화면·로그인·내비게이션을 100% 재사용하는 화이트라벨 구조.

## 주요 구현

- **멀티 비히클(최대 255대)** — 요청 추적 키를 `(메시지ID, 드론ID)` 복합 키로 관리해 응답이 섞이지
  않게 했고, 드론별 하트비트 워치독을 분리했습니다. 새 드론이 처음 패킷을 보내면 지도 레이어와
  색상을 자동 배정합니다.
- **통신** — UDP·TCP·Serial, 지수 백오프 재연결(1→30초), `Channels` 기반 50 Hz 텔레메트리 처리.
- **2단계 단위 변환** — 통신용 raw 단위 → SI → 사용자 표시 단위. 통신 규격이 바뀌어도 화면 로직은 그대로.
- **임무 계획** — 위성지도 위 경로점 편집, 경로점별 속성 패널, 그리고 **SRTM 지형과 비행 고도를 함께 그려
  여유 고도가 부족한 구간을 경고하는 커스텀 렌더링 차트**(Avalonia `Render()` 오버라이드, Catmull-Rom 곡선).
- **권한(RBAC) 인증** — EF Core + SQLite + BCrypt, 역할-권한 매핑 캐시.
- 지도·날씨 API 키를 앱 안에서 관리(설정값 우선 → `.env` 폴백).

## 문제 해결 사례

1. **마커가 안 보이는 버그 — 3차에 걸친 원인 추적.** 갱신 로직 → 레이어 패턴을 차례로 의심했지만
   부분 개선에 그쳤고, 라이브러리를 디컴파일해 보니 드론 좌표가 앱의 **초기 뷰포트 밖**에 있었고
   `RefreshGraphics()`와 `RefreshData()`가 별개 동작이라는 점이 겹쳐 있었습니다. 최초 위치 수신 시
   자동 센터링과 `Refresh()`로 해결했습니다.
2. **화면을 열고 닫기를 반복하면 멈추는 문제.** 이전 ViewModel의 `Dispose()`가 호출되지 않아 통신
   이벤트 핸들러가 누적되고, 패킷마다 중복 반응해 UI 스레드 큐를 포화시켰습니다. 화면 전환 지점마다
   `Dispose()`를 명시하고 "View 분리 시 반드시 ViewModel.Dispose()"를 규칙으로 문서화했습니다.
3. **하드웨어 통합 테스트로 잡은 결함.** 단위 테스트는 모두 통과했지만, 실제 비행제어컴퓨터를 시리얼로
   연결(PILS)해 보니 재연결이 사실상 구현되어 있지 않았고 특정 설정 명령 직후 장비가 재부팅됐습니다.
   모킹 기반 테스트의 한계를 확인하고 통합 테스트 절차를 별도 문서로 정리했습니다.

## 품질 관리

- **단위 테스트 2,600개 이상 전체 통과** — xUnit v3, Moq, FluentAssertions, Avalonia.Headless(화면 없이 UI 테스트)
- 코드 리뷰 체크리스트 — 플랫폼 분기 위치, 계층 의존 방향, 빈 `catch` 금지, 리소스 해제 여부 등

## 스택

Avalonia 12 · FluentAvaloniaUI · CommunityToolkit.Mvvm · Mapsui/BruTile · FFmpeg.AutoGen ·
EF Core SQLite · Serilog · xUnit

> 진행 중(2026.05~). 다음 목표: GS 인증 준비, Android/iOS 실기기 검증 확대, Browser(WebAssembly) 경량화.
