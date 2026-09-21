// 프로젝트 통합 목록 (업무 + 개인 + 취미).
//   type:       "work" | "personal" | "hobby"
//   featured:   /portfolio 에 노출할지 여부 (featured 는 highlights 를 포트폴리오 불릿으로 씀)
//   status:     "active" | "wip" | "archived"
//   highlights: /portfolio 페이지에서만 쓰이는 불릿. 상세 본문(.md)에는 표시되지 않음.
// 언어별 필드는 ko / en 하위에. 상세 본문은 src/projects/{ko,en}/<slug>.md 에.
//
// 업무 프로젝트는 사내/방산 프로젝트라 저장소 링크가 없고, 방산 과제(AVTE·군집 GCS·JDAD-GCS)는
// 기술 역량 중심으로만 서술한다 (임무·운용·성능·고객·구체 구성은 공개하지 않음).

export default [
  {
    slug: "bgcs",
    type: "work",
    featured: true,
    period: "2026 —",
    status: "wip",
    stack: ["Avalonia", "C#", ".NET 10", "Clean Architecture", "Mapsui", "FFmpeg.AutoGen", "xUnit"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "BGCS — 크로스플랫폼 GCS",
      role: "단독 설계 · 개발",
      summary:
        "WPF 기반 드론 지상통제소(GCS)를 Avalonia UI로 재구현해 Windows·Android·iOS(추후 Web)를 한 코드베이스로 지원하는 프로젝트. 계층 의존 규칙을 컴파일러로 강제하고, 다기종·다버전 펌웨어 대응 구조와 자동화 테스트 2,656개를 갖췄다.",
      highlights: [
        "프로토콜 라이브러리를 UI가 참조하지 못하도록 컴파일 타임에 차단 — 계층 의존 방향과 플랫폼 분기를 규칙과 컴파일러로 강제",
        "VehicleRegistry + 그룹별 다운링크 핸들러 + 메시지별 이벤트 채널, 새 메시지 ID 발급 방식의 펌웨어 버전 호환 정책",
        "자동화 테스트 2,656개 + Avalonia Headless UI 테스트 + 하드웨어(PILS) 통합 테스트",
      ],
    },
    en: {
      title: "BGCS — cross-platform GCS",
      role: "Solo design · development",
      summary:
        "A rebuild of a WPF drone ground control station (GCS) on Avalonia UI, targeting Windows, Android, iOS (and later the web) from one codebase. Layer dependencies are enforced by the compiler, with a structure for many firmware versions and 2,656 automated tests.",
      highlights: [
        "The UI cannot reference the protocol library — enforced at compile time; layer direction and platform branching are held by rules and the compiler",
        "VehicleRegistry + per-group downlink handlers + per-message event channels, and a firmware-compatibility policy that issues new message IDs",
        "2,656 automated tests, Avalonia Headless UI tests, and hardware (PILS) integration tests",
      ],
    },
  },
  {
    slug: "gcsdev",
    type: "work",
    featured: true,
    period: "2019 — 2026",
    status: "archived",
    stack: ["WPF", "C#", ".NET 8", "MVVM", "자체 프로토콜(OFP)", "RTK / NTRIP", "HelixToolkit", "YOLO"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "GCSdev — 드론 지상통제소",
      role: "단독 설계 · 개발",
      summary:
        "자체 개발한 OFP(Open Flight Protocol)로 비행제어컴퓨터와 통신하는 Windows GCS. 하이브리드(VTOL)·고정익·멀티콥터·헬리콥터 4종 기체를 지원하며 7년 이상 운영한 뒤, 현재는 크로스플랫폼(BGCS)으로 이관 중이다.",
      highlights: [
        "자체 프로토콜 통신 라이브러리를 독립 서브모듈로 설계, 4종 기체의 파라미터 체계를 하나의 UI로 통합",
        "RTK 보정(RTCM3)을 NTRIP으로 수신해 기체에 분할 전송 — 센티미터급 정밀도",
        "단일 기체 구조를 다중 기체(군집) 식별·개별 업/다운링크 라우팅으로 확장, YOLO 객체 탐지 통합",
      ],
    },
    en: {
      title: "GCSdev — ground control station",
      role: "Solo design · development",
      summary:
        "A Windows GCS that talks to the flight-control computer over an in-house protocol, OFP (Open Flight Protocol). Supports hybrid (VTOL), fixed-wing, multicopter and rotary-wing vehicles; ran for 7+ years and is now being succeeded by the cross-platform BGCS.",
      highlights: [
        "Designed the protocol stack as a standalone submodule; unified the parameter schemes of four vehicle types in one UI",
        "Receives RTK corrections (RTCM3) over NTRIP and relays them to the vehicle in chunks — centimeter-level accuracy",
        "Extended a single-vehicle design to multi-vehicle (swarm) identification and per-vehicle uplink/downlink routing; integrated YOLO detection",
      ],
    },
  },
  {
    slug: "air-vehicle-test-equipment",
    type: "work",
    featured: true,
    period: "2025 — 2026",
    status: "archived",
    stack: ["K4586 (STANAG 4586 국산화)", "C#", ".NET 8", "WPF", "Code Generator", "UDP Multicast"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "UAV 지상시험장비 (AVTE) — K4586",
      role: "단독 설계 · 개발",
      summary:
        "UAV 지상시험장비(AVTE)의 소프트웨어. NATO STANAG 4586을 국산화한 K4586 프로토콜의 통신 라이브러리(K4586Link)를 직접 설계·구현하고, 그 위에서 동작하는 자동/수동 점검·BIT 판정·보고서 생성 클라이언트를 개발했다.",
      highlights: [
        "ICD(규격 문서)에서 메시지 클래스를 자동 생성하는 코드 제너레이터 — 규격이 바뀌어도 재생성으로 대응",
        "직렬화·엔디안·체크섬·UDP 멀티캐스트·비동기 큐를 포함한 K4586 통신 계층 자체 구현",
        "CBIT/PBIT/IBIT 자동 점검과 HTML 보고서, 동시성 결함 8건의 근본 원인 분석·수정",
      ],
    },
    en: {
      title: "UAV Ground Test Equipment (AVTE) — K4586",
      role: "Solo design · development",
      summary:
        "Software for UAV ground test equipment (AVTE). Designed and built K4586Link, the communication library for K4586 — the Korean localization of NATO STANAG 4586 — and the client on top of it for automatic/manual checks, BIT evaluation and report generation.",
      highlights: [
        "Code generator that turns the ICD (interface spec) into message classes — regenerate when the spec changes",
        "In-house K4586 stack: serialization, endianness, checksums, UDP multicast and async queues",
        "CBIT/PBIT/IBIT automated checks with HTML reports; root-caused and fixed 8 concurrency defects",
      ],
    },
  },
  {
    slug: "swarm-sync-hub",
    type: "work",
    featured: false,
    period: "2023 — 2026",
    status: "archived",
    stack: ["WPF", "C#", ".NET 8", "MVVM", "FFmpeg", "MISB", "GMap.NET"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "군집 운용 GCS",
      role: "단독 설계 · 개발",
      summary:
        "다수 무인기를 하나의 지상국에서 동시에 감시·계획·관제하는 군사용 GCS. 통신·영상·지도·UI·유틸리티를 5개 공용 라이브러리로 분리한 모듈형 구조로 설계했다. 임무·운용 세부는 공개하지 않는다.",
      highlights: [],
    },
    en: {
      title: "Swarm operations GCS",
      role: "Solo design · development",
      summary:
        "A military GCS that monitors, plans and controls many unmanned vehicles from one ground station. Designed as a modular system with five shared libraries for communication, video, map, UI and utilities. Mission and operational details are withheld.",
      highlights: [],
    },
  },
  {
    slug: "jdad-gcs",
    type: "work",
    featured: false,
    period: "2019 — 2021",
    status: "archived",
    stack: ["WPF", "C#", ".NET Framework", "MVVM Light", "Serial", "FFmpeg", "GMap.NET", "HelixToolkit"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "JDAD-GCS — 단일 기체 임무 GCS",
      role: "단독 설계 · 개발",
      summary:
        "단일 무인기 임무 운용용 군사 지상통제시스템. GCS1은 통신 프로토콜부터 UI까지 0→1로 개발했고, 후속 GCS2에서는 통신·영상·지도를 독립 라이브러리로 분리하는 아키텍처 고도화와 PILS 연동을 수행했다. 이후 군집 운용 GCS의 전신.",
      highlights: [],
    },
    en: {
      title: "JDAD-GCS — single-vehicle mission GCS",
      role: "Solo design · development",
      summary:
        "A military ground control system for single-vehicle mission operations. GCS1 was built from zero — protocol to UI; in the follow-on GCS2, communication, video and map code were split into standalone libraries and a PILS link was added. Precursor to the swarm operations GCS.",
      highlights: [],
    },
  },
  {
    slug: "drone-detecting-monitor",
    type: "work",
    featured: false,
    period: "2023 — 2026",
    status: "archived",
    stack: ["WPF", "C#", ".NET 8", "UDP", "CRC16", "GMap.NET", "OxyPlot"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "드론 탐지 장비 모니터",
      role: "단독 설계 · 개발",
      summary:
        "UDP로 수신되는 드론 탐지장비 데이터를 실시간 지도에 시각화하고, 모든 교신을 고정 크기 바이너리 로그로 저장해 그대로 리플레이하는 통합 모니터링 시스템. 통신·지도 계층을 독립 라이브러리로 분리했다.",
      highlights: [],
    },
    en: {
      title: "Counter-drone detection monitor",
      role: "Solo design · development",
      summary:
        "An integrated monitor that plots UDP data from drone-detection equipment on a live map and stores every exchange in a fixed-size binary log for exact replay. Communication and map layers are standalone libraries.",
      highlights: [],
    },
  },
  {
    slug: "pils-app",
    type: "work",
    featured: false,
    period: "2020 —",
    status: "active",
    stack: ["WPF", "C#", ".NET 8", "Serial", "MSFS / X-Plane", "GMap.NET"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "PILS 시뮬레이션 앱",
      role: "단독 설계 · 개발",
      summary:
        "상용 비행 시뮬레이터(MSFS·X-Plane)와 실제 비행제어컴퓨터를 시리얼로 연결해, 실제 기체 없이 비행 동역학 위에서 시험하게 해주는 PILS(Processor-In-the-Loop Simulation) 브리지.",
      highlights: [],
    },
    en: {
      title: "PILS simulation app",
      role: "Solo design · development",
      summary:
        "A PILS (Processor-In-the-Loop Simulation) bridge that links a commercial flight simulator (MSFS / X-Plane) to the real flight-control computer over serial, so it can be tested against flight dynamics with no aircraft.",
      highlights: [],
    },
  },

  // ── 개인 프로젝트 ──
  {
    slug: "fflux",
    type: "personal",
    featured: true,
    period: "2026 —",
    status: "active",
    stack: ["WPF", ".NET 10", "ffmpeg.autogen", "MVVM", "Whisper", "MISB"],
    links: { repo: "https://github.com/imbae/fflux", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "fflux",
      role: "설계 · 개발",
      summary:
        "ffmpeg.autogen API를 직접 호출하는 개발자용 WPF 비디오 플레이어. 외부 ffmpeg.exe 프로세스 없이, LGPL 조건을 지키며 실시간 통계·구간 녹화·자막 편집·AI 자막·MISB KLV까지 다룬다.",
      highlights: [],
    },
    en: {
      title: "fflux",
      role: "Design · Development",
      summary:
        "A developer-focused WPF video player that calls the ffmpeg.autogen API directly — no external ffmpeg.exe process, LGPL-compliant — covering live stats, segment recording, subtitle editing, AI subtitles and MISB KLV.",
      highlights: [],
    },
  },
  {
    slug: "portsight",
    type: "personal",
    featured: false,
    period: "2026 —",
    status: "active",
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "FastAPI", "Python"],
    links: { repo: "", demo: "", writeup: "" }, // private repo
    cover: "",
    ko: {
      title: "PortSight",
      role: "전체",
      summary:
        "실제 주식 투자자를 위한 포트폴리오 분석 앱. 보유 종목을 넣으면 기술적 지표 분석, 계좌 유형별 전략 추천, 세금·배당 계산, 리밸런싱 가이드를 제공한다. 모의투자 기능은 없다.",
      highlights: [],
    },
    en: {
      title: "PortSight",
      role: "Everything",
      summary:
        "A portfolio-analysis app for real stock investors. Enter your holdings and it runs technical-indicator analysis, account-type strategy suggestions, tax and dividend math, and a rebalancing guide. No paper trading.",
      highlights: [],
    },
  },
  {
    slug: "whenwhere",
    type: "personal",
    featured: false,
    period: "2026 —",
    status: "wip",
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "Mapbox"],
    links: { repo: "", demo: "", writeup: "" }, // private repo
    cover: "",
    ko: {
      title: "WhenWhere (기억달력)",
      role: "전체",
      summary:
        "캘린더를 중심에 두고, 장소 기반 근접 알림과 하루 동선 자동 요약을 얹은 크로스플랫폼 개인 기록 앱. 모든 기록은 개인/업무 워크스페이스로 나뉜다.",
      highlights: [],
    },
    en: {
      title: "WhenWhere",
      role: "Everything",
      summary:
        "A cross-platform personal-log app built around the calendar, adding place-based proximity reminders and an automatic daily-route summary. Every entry is split into personal / work workspaces.",
      highlights: [],
    },
  },
  {
    slug: "this-site",
    type: "personal",
    featured: false,
    period: "2026 —",
    status: "active",
    stack: ["Eleventy", "Nunjucks", "Vanilla JS"],
    links: { repo: "https://github.com/imbae/imbae.github.io", demo: "https://imbae.github.io", writeup: "" },
    cover: "",
    ko: {
      title: "개인 홈페이지",
      role: "전체",
      summary: "지금 보고 있는 사이트. Eleventy 정적 빌드, 한/영 병행, 빌드 도구 최소화.",
      highlights: ["프레임워크 없는 정적 출력", "글·프로젝트 상호 링크", "RSS 제공"],
    },
    en: {
      title: "This website",
      role: "Everything",
      summary: "The site you are looking at. Static Eleventy build, bilingual, minimal tooling.",
      highlights: ["Framework-free static output", "Cross-linked notes and projects", "RSS feed"],
    },
  },
];
