// 프로젝트 통합 목록 (업무 + 개인 + 취미).
//   type:     "work" | "personal" | "hobby"
//   featured: /portfolio 에 노출할지 여부
//   status:   "active" | "wip" | "archived"
// 언어별 필드는 ko / en 하위에.
//
// TODO(owner): 아래는 이전 초안에서 옮겨온 샘플입니다. 실제 프로젝트 정보(설명,
//   기간, 역할, GitHub 레포 URL, 성과)로 교체하세요. links.repo 는 현재 전부
//   프로필 주소라 개별 레포 주소로 바꿔야 합니다.

export default [
  {
    slug: "videoplayer-pro",
    type: "work",
    featured: true,
    period: "2024",
    status: "active",
    stack: ["WPF", "C#", ".NET 8", "FFmpeg", "MISB", "Whisper"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "VideoPlayer Pro",
      role: "설계 · 개발",
      summary:
        "WPF 기반 드론 영상 재생기. MISB KLV 메타데이터 오버레이와 AI 자막 생성을 통합.",
      highlights: [
        "ffmpeg.autogen 으로 디코딩 파이프라인 직접 구성",
        "MISB ST0601 KLV 실시간 파싱 후 지도·HUD 오버레이",
        "OpenAI Whisper 연동 자동 자막",
      ],
    },
    en: {
      title: "VideoPlayer Pro",
      role: "Design · Development",
      summary:
        "WPF drone-video player with MISB KLV metadata overlay and AI subtitle generation.",
      highlights: [
        "Custom decode pipeline via ffmpeg.autogen",
        "Real-time MISB ST0601 KLV parsing with map/HUD overlay",
        "Automatic subtitles through OpenAI Whisper",
      ],
    },
  },
  {
    slug: "klv-parser",
    type: "work",
    featured: true,
    period: "2024",
    status: "wip",
    stack: ["C#", "MISB ST0601", ".NET", "KLV"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "MISB KLV Parser",
      role: "개발",
      summary: "드론 영상 스트림에서 MISB ST0601 메타데이터를 실시간 파싱하는 라이브러리.",
      highlights: ["ST0601 태그 세트 구현", "스트리밍 파서 (부분 프레임 대응)"],
    },
    en: {
      title: "MISB KLV Parser",
      role: "Development",
      summary: "Library that parses MISB ST0601 metadata from drone video streams in real time.",
      highlights: ["ST0601 tag-set implementation", "Streaming parser tolerant of partial frames"],
    },
  },
  {
    slug: "rtsp-monitor",
    type: "work",
    featured: false,
    period: "2023",
    status: "active",
    stack: ["WPF", "RTSP", "FFmpeg", "C#"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "RTSP Stream Monitor",
      role: "개발",
      summary: "다중 RTSP 채널을 동시에 모니터링하는 관제 클라이언트.",
      highlights: ["채널별 독립 디코드 스레드", "재연결·백오프 처리"],
    },
    en: {
      title: "RTSP Stream Monitor",
      role: "Development",
      summary: "Surveillance client that monitors many RTSP channels at once.",
      highlights: ["Independent decode thread per channel", "Reconnect with backoff"],
    },
  },
  {
    slug: "gis-overlay",
    type: "work",
    featured: false,
    period: "2023",
    status: "archived",
    stack: ["WPF", "OpenLayers", "GIS", "C#"],
    links: { repo: "", demo: "", writeup: "" },
    cover: "",
    ko: {
      title: "GIS Map Overlay",
      role: "개발",
      summary: "드론 비행 경로와 센서 데이터를 지도에 실시간 오버레이하는 WPF 컴포넌트.",
      highlights: ["좌표 변환 유틸", "WebView2 ↔ WPF 브리지"],
    },
    en: {
      title: "GIS Map Overlay",
      role: "Development",
      summary: "WPF component that overlays drone flight paths and sensor data on a map.",
      highlights: ["Coordinate transform utilities", "WebView2 ↔ WPF bridge"],
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
