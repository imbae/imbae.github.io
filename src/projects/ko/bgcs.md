---
title: BGCS — 크로스플랫폼 GCS
projectSlug: bgcs
description: WPF 기반 드론 지상통제소를 Avalonia로 재구현한 크로스플랫폼 GCS. 계층·의존 규칙, 상태 모델, 프로토콜 버전 대응, 테스트 전략.
---

기존 WPF(Windows 전용) 드론 지상통제소(GCS)를 **Avalonia UI**로 재구현해
**Windows · Android · iOS(추후 Web)** 를 하나의 코드베이스로 지원하는 프로젝트입니다.
GCS는 조종사가 무인기의 상태(위치·자세·배터리 등)를 실시간으로 확인하고 임무를 계획·지시하는 관제 소프트웨어입니다.
아키텍처 설계와 핵심 기능 구현을 단독으로 진행하고 있으며, 소스 파일은 약 1,000개, 자동화 테스트는 **2,656개**(전부 통과)입니다.

## 왜 다시 만드나

- **플랫폼 종속** — WPF는 Windows에서만 동작합니다. 태블릿·모바일 관제 요구가 늘었습니다.
- **다기종·다버전 펌웨어** — 비행제어컴퓨터(FC) 펌웨어마다 통신 규격(ICD)이 미묘하게 달라, 코드 안에서 수기로 분기하던 방식은 유지보수 비용이 컸습니다.
- **기술 부채** — 이전 세대에서 한 파일에 85개 이상의 패킷 핸들러가 몰리고, 노후화된 UI 라이브러리에 묶여 있었습니다.
- **품질 신뢰성** — 국내 SW 품질 인증(GS)을 염두에 두고, 테스트·문서화·정적 분석 기준을 처음부터 엄격하게 관리합니다.

## 1. 계층 구조와 의존 규칙

```
BGcs.Shared      순수 유틸 (다른 프로젝트 미참조)
   ↑
BGcs.Core        도메인 모델·인터페이스 (UI 프레임워크 미참조)
   ↑
BGcs.Infrastructure / Media / Map     통신·영상·지도 구현체
   ↑
BGcs             Avalonia 공유 View·ViewModel
   ↑
플랫폼 헤드      Desktop · Android · iOS · Browser (진입점만)
```

계층을 나누는 것보다 **경계를 규칙과 컴파일러로 지키는 것**에 무게를 뒀습니다.

- `Core`·`Shared`는 Avalonia를 참조할 수 없고, ViewModel은 구현체가 아닌 `I*Service` 인터페이스만 압니다.
- **UI는 프로토콜 라이브러리를 참조할 수 없습니다.** 프로토콜 프로젝트 참조에 `PrivateAssets="all"`을 걸어
  UI 프로젝트로 전이되지 않게 해서, 규칙 위반이 코드 리뷰가 아니라 **컴파일 오류**로 드러납니다.
- **프로토콜 값의 의미(enum)는 `Core`가 유일한 원본**입니다. 프로토콜 라이브러리는 메시지 ID·패킷 구조·raw 필드만 소유하는
  순수 전송 계층이고, raw 값 → 도메인 enum 변환은 `Infrastructure`에서만 수행합니다.
- 플랫폼 분기(`OperatingSystem.Is*`, `#if ANDROID`)는 앱 시작의 **DI 등록 코드 한 곳**에서만 허용합니다.
  모바일에서 지원하지 않는 기능(Serial, 영상)은 아무것도 하지 않는 **Stub 구현체**를 등록해 앱이 죽지 않게 합니다.
- **제품 라인 확장** — 범용 템플릿 프로젝트가 화면·로그인·내비게이션을 100% 재사용하고, 고객별 커스터마이징이 필요한 화면 **하나만**
  그때 포크하는 "지연 포크" 방식으로 화이트라벨 제품을 만듭니다(참조 방향은 템플릿 → 공유 UI, 역방향 금지).

## 2. 통신과 상태 모델

```
IVehicleService (Core)
  └─ VehicleService (Infrastructure) ─ IBLinkAdapter ─ 프로토콜 라이브러리
IVehicleRegistry (Core)
  └─ VehicleRegistry ─ 메시지 ID → 그룹별 다운링크 핸들러 디스패치
       ├─ Common     홈 위치·버전·시스템 속성
       ├─ Periodic   비행 정보·시스템 상태·제어 입출력 (고빈도)
       ├─ Swarm      다중 기체 주기 메시지
       ├─ Parameter  파라미터·명령 제한
       └─ Mission    임무 블록 정보
```

- **`VehicleRegistry`는 수명주기와 디스패치만** 맡고, 메시지 해석은 그룹별 `IDownlinkHandler`로 나눴습니다(이전 세대의 비대한 단일 파일 문제를 구조로 해결).
- **`VehicleInfo`(저빈도 정보·설정)와 `VehicleState`(고빈도 수신 메시지 서브모델)를 물리적으로 분리**했습니다.
  이벤트 인자로 `VehicleInfo`가 실려 나가는 저빈도 채널에서 고빈도 상태가 딸려 나와 채널 분리 원칙을 우회하는 일을 막기 위해서입니다.
  `VehicleInfo`는 자주 쓰는 값을 짧은 경로로 노출하는 읽기 전용 파사드이고, 쓰기는 핸들러만 합니다.
- **이벤트 채널을 메시지 단위로 분리**했습니다. 주기 메시지를 하나의 "정보 변경" 이벤트로 합치면 관심 없는 구독자까지 매번
  깨어나 프로퍼티 이름을 비교해야 합니다. 메시지별 전용 채널에 서브모델을 직접 실어 보내면 관심 있는 ViewModel만 구독합니다.
- **개방-폐쇄 원칙으로 새 메시지를 추가**합니다 — ① Core에 서브모델 추가 ② 담당 그룹 핸들러에 case 추가 ③ 필요하면 이벤트 채널 추가.
  `VehicleRegistry`와 UI는 수정하지 않습니다.
- **프로토콜 버전 호환 정책** — 레이아웃이 바뀌면 기존 메시지를 고치지 않고 **새 메시지 ID를 발급**(예: `SYS_STATUS` ↔ `SYS_STATUS_EXP`)해
  GCS에서는 핸들러와 nullable 필드만 추가합니다. 의미만 바뀌면 `OfpVersion` 분기를 `VehicleRegistry` 안에서만 수행하고, 와이어 포맷이
  비호환으로 갈라지면 버전 브랜치로 분리하되 차이를 프로토콜 서브모듈 포인터와 Infrastructure로 한정합니다.

### 연결 감시와 재연결

- **드론별 신호 두절 감시** — 트랜스포트 상태와 별개로 애플리케이션 계층에서 5초 주기 타이머가 기체별 마지막 수신 시각을 검사해
  10초를 넘기면 `VehicleTimedOut`을, 연결이 끊기면 활성 기체 전체에 `VehicleLost`를, 처음 보는 ID에는 `VehicleDiscovered`를 발행합니다.
  한 기체의 두절이 다른 기체 감시에 영향을 주지 않습니다.
- **요청 추적** — 같은 메시지 ID를 여러 기체에 동시에 요청해도 응답이 섞이지 않도록 `(메시지ID, 기체ID)` 복합 키로 관리합니다.
- **재연결의 현실** — TCP는 고정 간격 자동 재연결이 있지만 UDP(연결 개념 없음)와 Serial은 없습니다. 이 사실은 문서가 아니라
  하드웨어 통합 테스트에서 실측으로 확인했고, 그래서 두절 통지와 재연결 정책을 분리해 설계했습니다.

## 3. MVVM · DI · 동시성

```
ObservableObject (CommunityToolkit.Mvvm)
  └─ ViewModelBase  (다이얼로그·알림 주입, IDisposable)
       ├─ MenuViewModelBase   메뉴 네비게이션
       ├─ MapViewModelBase    지도 공유
       └─ InfoViewModelBase   상세정보 패널
```

- **소스 제너레이터** — `[ObservableProperty]`·`[RelayCommand]`·`[NotifyPropertyChangedFor]`로 반복 코드를 없앴습니다.
- **DI** — 어셈블리의 `*ViewModel`/`*View`를 **이름 규칙으로 자동 등록(Transient)** 하고, 상태를 공유해야 하는 소수만 Singleton으로 수동 등록합니다.
  **로그인 세션 단위 `IServiceScope`** 를 두어, 로그아웃 시 세션에 속한 ViewModel과 리소스가 한 번에 정리됩니다.
- **`ViewLocator`** — `FooViewModel` → `FooView`를 이름 규칙으로 찾아 DI에서 꺼내 DataContext에 연결합니다.
  코드 비하인드에는 비즈니스 로직을 두지 않고, View가 화면에서 분리될 때 ViewModel을 `Dispose()`합니다.
- **스레드 경계** — 다운링크는 백그라운드 스레드에서 수신하고 `Dispatcher.UIThread.Post()`로 UI에 넘깁니다.
  고빈도 카운터는 `Interlocked`로 lock-free 처리하고, 고빈도 수신 데이터는 `Channel<T>`(bounded, `DropOldest`)로 받아 UI가 밀리지 않게 합니다.
- Infrastructure·Media에는 `ConfigureAwait(false)`, UI에는 사용 금지(Dispatcher 컨텍스트 유지), 신규 I/O에는 `CancellationToken` 필수.

## 4. 화면 구조

```
MainWindow → MainViewModel
  ├─ Login
  └─ Shell
      ├─ Dashboard   (PFD·비행 정보, 상시)
      ├─ StatusBar   (연결 상태·알림, 상시)
      ├─ 주화면 MainMode : Monitor ↔ Plan
      └─ 오버레이 OverlayMode : 연결 · 비행 기록 · 상세 정보 · 파라미터 · 지상 설정 · 사용자 설정
```

`MainMode`와 `OverlayMode`를 독립 상태로 관리하고, 주화면을 전환하면 오버레이를 자동으로 닫습니다.
영상은 별도 독립 창(Windows 전용)으로 띄웁니다.

## 5. 지도 · 임무 계획

- **레이어 조작은 `MapService`와 `*LayerBuilder`에서만** 합니다. ViewModel은 구체 클래스가 아니라 `IMapLayerService`를 주입받아
  "직접 조작 금지" 규칙을 타입 수준에서 강제합니다. 타일 공급자는 VWorld(국내)와 Azure Maps(해외)를 설정에서 전환합니다.
- **임무 계획** — 위성지도 위 경로점 편집과 경로점별 속성 패널, 서베이 폴리곤·거리 측정·바람 화살표 레이어.
- **고도 프로파일 차트** — SRTM 지형과 계획 고도를 함께 그려 **여유 고도가 30 m 미만인 구간을 자동 경고**하는 커스텀 렌더링 컨트롤입니다.
  Avalonia `Control.Render()`를 오버라이드하고 Catmull-Rom 곡선으로 경로를 부드럽게 그립니다.
- **2단계 단위 변환** — 통신용 raw 단위(cm, 0.01° 등) → SI → 사용자 표시 단위. 중간 모델을 두었다가 확장 메서드 방식으로 단순화하는
  리팩터링을 거쳐, 통신 규격이 바뀌어도 화면 로직은 그대로 유지되게 했습니다.

## 6. 인증 · 권한 · 설정

- EF Core + SQLite + BCrypt 로그인, **역할-권한 매핑을 캐시**하고 화면 접근은 `PrivilegeCodes` 상수로만 분기합니다(역할 이름 문자열 비교 금지).
- 지도·날씨 API 키를 앱 설정 화면에서 관리하고, 설정값이 없으면 `.env`로 폴백합니다.

## 7. 문제 해결 사례

1. **마커가 안 보이는 버그 — 3차에 걸친 원인 추적.** 갱신 로직 → 레이어 패턴을 차례로 의심했지만 부분 개선에 그쳤고,
   라이브러리를 디컴파일해 보니 기체 좌표가 앱의 **초기 뷰포트 밖**에 있었고 `RefreshGraphics()`와 `RefreshData()`가 별개 동작이라는 점이 겹쳐 있었습니다.
   최초 위치 수신 시 자동 센터링과 `Refresh()`로 해결했습니다.
2. **화면을 열고 닫기를 반복하면 멈추는 문제.** 이전 ViewModel의 `Dispose()`가 호출되지 않아 통신 이벤트 핸들러가 누적되고,
   패킷마다 중복 반응해 UI 스레드 큐를 포화시켰습니다. 화면 전환 지점마다 `Dispose()`를 명시하고 5개 클래스의 구독 해제 누락을 일괄 수정한 뒤,
   "View 분리 시 반드시 ViewModel.Dispose()"를 규칙으로 문서화했습니다.
3. **하드웨어 통합 테스트로 잡은 결함.** 단위 테스트는 모두 통과했지만 실제 비행제어컴퓨터를 시리얼로 연결(PILS)해 보니 재연결이 구현되어 있지 않았고,
   특정 설정 명령 직후 장비가 재부팅됐습니다. 그 카테고리는 자동 실행에서 제외하고, 모킹 테스트의 한계를 프로세스로 남기기 위해 통합 테스트 설계 문서를 따로 작성했습니다.

## 8. 품질 관리

- **자동화 테스트 2,656개, 전부 통과** — xUnit v3 · Moq · FluentAssertions · **Avalonia.Headless**(화면 없이 UI 테스트) + 하드웨어 통합 테스트 프로젝트 분리
- **정적 분석** — nullable 참조 타입, CA/IDE 규칙 준수, 억제는 사유를 남기는 경우에만
- **코드 리뷰 체크리스트** — 플랫폼 분기 위치, 계층 의존 방향, 빈 `catch` 금지, `Dispose`/`using` 여부, 로그 컨텍스트 포함, 민감 정보 로그 금지
- **Serilog** 구조화 로깅 — 무엇을 남길지 기준을 문서로 정의

## 스택

Avalonia 12 · FluentAvaloniaUI · CommunityToolkit.Mvvm · Mapsui/BruTile · FFmpeg.AutoGen(MISB/KLV) · EF Core SQLite · BCrypt ·
Serilog · Microsoft.Extensions.DependencyInjection · xUnit v3

> 진행 중(2026.05~). 다음 목표: GS 인증 준비, Android/iOS 실기기 검증 확대, Browser(WebAssembly) 경량화.
