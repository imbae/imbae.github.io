// 프로젝트 통합 목록 (업무 + 개인 + 취미).
//   type:     "work" | "personal" | "hobby"
//   featured: /portfolio 에 노출할지 여부
//   status:   "active" | "wip" | "archived"
// 언어별 필드는 ko / en 하위에. 상세 본문은 src/projects/{ko,en}/<slug>.md 에.
//
// 업무 프로젝트는 대부분 사내/국방 프로젝트라 저장소 링크가 없고, 설명도 최소한으로만 둔다.
// TODO(owner): 기간(period)·상태(status)는 추정값이니 실제 값으로 확인.

export default [
  {
    slug: "bgcs",
    type: "work",
    featured: true,
    period: "2026 —",
    status: "wip",
    stack: ["Avalonia", "C#", ".NET 10", "MVVM", "Mapsui", "FFmpeg.AutoGen"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "BGCS — 크로스플랫폼 GCS",
      role: "설계 · 개발",
      summary:
        "WPF 기반 드론 지상통제소(GCS)를 Avalonia UI 로 다시 구현해 Windows·Android·iOS·브라우저를 한 코드베이스에서 지원하는 리뉴얼 프로젝트.",
      highlights: [],
    },
    en: {
      title: "BGCS — cross-platform GCS",
      role: "Design · Development",
      summary:
        "A rebuild of a WPF drone ground control station on Avalonia UI, supporting Windows, Android, iOS and the browser from one codebase.",
      highlights: [],
    },
  },
  {
    slug: "gcsdev",
    type: "work",
    featured: true,
    period: "2019 — 2026",
    status: "archived",
    stack: ["WPF", "C#", ".NET 8", "MVVM", "HelixToolkit", "커스텀 ICD"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "GCSdev — 드론 지상통제소",
      role: "개발",
      summary:
        "자체 정의한 비행 프로토콜(ICD)로 비행제어컴퓨터와 통신하는 Windows GCS. 고정익·멀티콥터·헬리콥터를 지원하며, 현재 크로스플랫폼(BGCS)으로 이관 중.",
      highlights: [],
    },
    en: {
      title: "GCSdev — ground control station",
      role: "Development",
      summary:
        "A Windows GCS that talks to the flight-control computer over an in-house flight protocol (ICD), supporting fixed-wing, multicopter and rotary-wing. Now being superseded by the cross-platform BGCS.",
      highlights: [],
    },
  },
  {
    slug: "air-vehicle-test-equipment",
    type: "work",
    featured: true,
    period: "2025 — 2026",
    status: "archived",
    stack: ["WPF", "C#", ".NET 8", "K4586 ICD", "Multicast UDP"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "비행체 점검 장비 (AVTE)",
      role: "개발",
      summary:
        "비행체 지상 점검을 자동화하는 장비 소프트웨어. 국방 규격 K4586 ICD 기반 메시지 인터페이스를 구현해 점검 절차 수행·판정·보고서 생성을 담당한다.",
      highlights: [],
    },
    en: {
      title: "Air Vehicle Test Equipment (AVTE)",
      role: "Development",
      summary:
        "Software for equipment that automates ground checks of an air vehicle. Built on a K4586 ICD-based message interface to run check sequences, evaluate results and generate reports.",
      highlights: [],
    },
  },
  {
    slug: "swarm-sync-hub",
    type: "work",
    featured: false,
    period: "2024 —",
    status: "archived",
    stack: ["WPF", "C#", ".NET 8"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "군집 운용 GCS",
      role: "개발",
      summary: "다수 무인기를 동시에 운용하는 군용 지상통제 소프트웨어. 세부 내용은 비공개.",
      highlights: [],
    },
    en: {
      title: "Swarm operations GCS",
      role: "Development",
      summary:
        "Military ground-control software for operating many unmanned vehicles at once. Details withheld.",
      highlights: [],
    },
  },
  {
    slug: "drone-detecting-monitor",
    type: "work",
    featured: false,
    period: "2023 —",
    status: "active",
    stack: ["WPF", "C#", ".NET 8", "UDP", "GMap.NET"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "드론 탐지 장비 모니터",
      role: "개발",
      summary:
        "드론 탐지 장비가 보내는 UDP 데이터를 받아 지도에 시각화하고, 로그 저장·리플레이까지 처리하는 모니터링 클라이언트.",
      highlights: [],
    },
    en: {
      title: "Counter-drone detection monitor",
      role: "Development",
      summary:
        "A monitoring client that ingests UDP data from drone-detection hardware, plots it on a map, and records logs for replay.",
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
      role: "개발",
      summary:
        "상용 비행 시뮬레이터(MSFS·X-Plane)와 비행 소프트웨어를 시리얼로 연결해, 실제 기체 없이 비행 동역학 위에서 시험하게 해주는 PILS(Pilot-In-the-Loop Simulation) 브리지.",
      highlights: [],
    },
    en: {
      title: "PILS simulation app",
      role: "Development",
      summary:
        "A PILS (Pilot-In-the-Loop Simulation) bridge that links a commercial flight simulator (MSFS / X-Plane) to the flight software over serial, so it can be tested against flight dynamics with no real aircraft.",
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
