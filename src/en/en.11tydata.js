// src/en/** → 영어. permalink 은 /en/... 유지.
// (템플릿 front matter 가 permalink 를 직접 지정하면 그쪽이 우선)
export default {
  lang: "en",
  permalink(data) {
    const stem = data.page.filePathStem; // 예: /en/about
    if (stem === "/en/index") return "/en/index.html";
    return stem.replace(/\/index$/, "") + "/index.html";
  },
};
