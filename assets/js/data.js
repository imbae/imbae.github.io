// ★ 이 파일만 수정하면 웹사이트 전체가 반영됩니다.

export const PROFILE = {
  name: "배성재",
  nameEn: "Seongjae Bae",
  title: "WPF · C# · FFmpeg Developer",
  description:
    "영상 처리와 드론 데이터 분석을 전문으로 하는 소프트웨어 엔지니어. " +
    "WPF 기반 데스크탑 애플리케이션부터 MISB KLV 파싱, AI 자막 생성까지 — " +
    "복잡한 도메인 문제를 깔끔한 코드로 해결합니다.",
  email: "void.imbae@gmail.com",
  github: "https://github.com/imbae",
  linkedin: "",
  availableForWork: true,
};

export const STATS = [
  { value: "5+", label: "years experience" },
  { value: "12", label: "projects delivered" },
  { value: "3",  label: "open source repos" },
  { value: "99", label: "% satisfaction" },
];

export const SKILLS = [
  {
    icon: "🖥",
    name: "Desktop Development",
    tags: ["WPF", "C#", ".NET 8", "MVVM", "WinForms"],
    color: "green",
  },
  {
    icon: "🎞",
    name: "Video Processing",
    tags: ["FFmpeg", "ffmpeg.autogen", "H.264", "H.265", "RTSP"],
    color: "blue",
  },
  {
    icon: "🛸",
    name: "Drone & MISB",
    tags: ["MISB ST0601", "KLV", "UAS", "GIS", "OpenLayers"],
    color: "amber",
  },
  {
    icon: "🤖",
    name: "AI Integration",
    tags: ["Whisper", "GPT-4o", "OpenAI API", "Python"],
    color: "purple",
  },
];

export const PROJECTS = [
  {
    id: "videoplayer-pro",
    name: "VideoPlayer Pro",
    description: "WPF 기반 군용 드론 영상 재생기 — MISB KLV 메타데이터 오버레이 + AI 자막",
    tags: ["WPF", "FFmpeg", "MISB", "Whisper"],
    year: "2024",
    status: "active",
    github: "https://github.com/imbae",
    demo: "",
  },
  {
    id: "klv-parser",
    name: "MISB KLV Parser",
    description: "드론 영상 스트림에서 MISB ST0601 메타데이터를 실시간 파싱하는 라이브러리",
    tags: ["C#", "MISB ST0601", ".NET", "KLV"],
    year: "2024",
    status: "wip",
    github: "https://github.com/imbae",
    demo: "",
  },
  {
    id: "rtsp-monitor",
    name: "RTSP Stream Monitor",
    description: "다중 RTSP 채널을 동시에 모니터링하는 관제 시스템",
    tags: ["WPF", "RTSP", "FFmpeg", "C#"],
    year: "2023",
    status: "active",
    github: "https://github.com/imbae",
    demo: "",
  },
  {
    id: "gis-overlay",
    name: "GIS Map Overlay",
    description: "드론 비행 경로와 센서 데이터를 지도에 실시간 오버레이하는 WPF 컴포넌트",
    tags: ["WPF", "OpenLayers", "GIS", "C#"],
    year: "2023",
    status: "archived",
    github: "",
    demo: "",
  },
];

export const EXPERIENCES = [
  {
    period: "2022 — present",
    company: "주식회사 예시",
    role: "Senior Software Engineer",
    description:
      "WPF 기반 드론 영상 처리 시스템 설계 및 개발. " +
      "MISB KLV 실시간 파싱 모듈 구현, FFmpeg 파이프라인 최적화, " +
      "AI 자막 생성 기능 통합 (OpenAI Whisper API).",
    current: true,
  },
  {
    period: "2020 — 2022",
    company: "이전 회사",
    role: "Software Engineer",
    description:
      "산업용 영상 분석 솔루션 개발. C# / .NET Framework 기반 " +
      "데스크탑 애플리케이션 유지보수 및 신규 기능 개발.",
    current: false,
  },
  {
    period: "2018 — 2020",
    company: "첫 번째 회사",
    role: "Junior Developer",
    description:
      "WinForms 및 WPF 애플리케이션 개발. SQL Server 연동, " +
      "보고서 생성 모듈 구현.",
    current: false,
  },
];

export const CONTACT = {
  email: "void.imbae@gmail.com",
  github: "https://github.com/imbae",
  linkedin: "",
};
