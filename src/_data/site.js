// 사이트 전역 설정. 언어별 문구는 { ko, en } 형태.

export default {
  url: "https://imbae.github.io",
  repo: "https://github.com/imbae/imbae.github.io",
  buildYear: new Date().getFullYear(),

  name: { ko: "임배현", en: "Baehyeon Lim" },
  role: {
    ko: "WPF · C# · FFmpeg 개발자",
    en: "WPF · C# · FFmpeg Developer",
  },
  tagline: {
    ko: "영상 처리와 드론 데이터 분석을 다루는 소프트웨어 엔지니어.",
    en: "Software engineer working on video processing and drone data.",
  },

  // TODO(owner): 실제 값으로 교체
  email: "void.imbae@gmail.com",
  github: "https://github.com/imbae",
  linkedin: "",

  // 내비게이션 (경로는 한국어 기준, 영어는 /en 접두)
  nav: [
    { url: "/work/", label: { ko: "업무", en: "Work" } },
    { url: "/projects/", label: { ko: "개인 프로젝트", en: "Projects" } },
    { url: "/notes/", label: { ko: "글", en: "Notes" } },
    { url: "/bookshelf/", label: { ko: "책장", en: "Bookshelf" } },
    { url: "/portfolio/", label: { ko: "포트폴리오", en: "Portfolio" } },
    { url: "/about/", label: { ko: "소개", en: "About" } },
  ],

  ui: {
    skip: { ko: "본문으로 건너뛰기", en: "Skip to content" },
    langName: { ko: "한국어", en: "English" },
    switchTo: { ko: "English", en: "한국어" },
    readMore: { ko: "자세히 →", en: "Read more →" },
    relatedNotes: { ko: "관련 글", en: "Related notes" },
    allNotes: { ko: "글 전체 보기", en: "All notes" },
    koOnly: { ko: "", en: "Korean only" },
    updated: { ko: "수정", en: "Updated" },
    backTo: { ko: "← 목록으로", en: "← Back to list" },
  },
};
