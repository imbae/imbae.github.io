// 독서 기록.
//   status: "reading" | "done" | "want"
//   rating: 0–5 (done 만 의미 있음)
// TODO(owner): 실제 읽은 책으로 교체.

export default [
  {
    title: "클린 아키텍처",
    author: "로버트 C. 마틴",
    status: "done",
    rating: 4,
    finished: "2025-06",
    link: "",
    ko: { note: "경계와 의존성 방향에 대한 감각을 정리하기 좋았다." },
    en: { note: "A good reset on boundaries and the direction of dependencies." },
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
    rating: 0,
    finished: "",
    link: "https://dataintensive.net/",
    ko: { note: "스트리밍 처리 장을 읽는 중." },
    en: { note: "Currently on the stream-processing chapters." },
  },
  {
    title: "Video Demystified",
    author: "Keith Jack",
    status: "want",
    rating: 0,
    finished: "",
    link: "",
    ko: { note: "코덱·신호 기초를 제대로 잡고 싶어서." },
    en: { note: "To get the codec and signal fundamentals straight." },
  },
];
