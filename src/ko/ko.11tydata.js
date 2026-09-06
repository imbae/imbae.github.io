// src/ko/** → 한국어. permalink 에서 /ko 접두를 떼어 루트에 배포.
// (템플릿 front matter 가 permalink 를 직접 지정하면 그쪽이 우선)
export default {
  lang: "ko",
  permalink(data) {
    const stem = data.page.filePathStem.replace(/^\/ko/, "");
    if (stem === "" || stem === "/index") return "/index.html";
    return stem.replace(/\/index$/, "") + "/index.html";
  },
};
