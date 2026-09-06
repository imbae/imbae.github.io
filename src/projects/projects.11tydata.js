// src/projects/{ko,en}/<slug>.md → 개인 프로젝트 상세(롱폼) 페이지.
//   frontmatter: title, projectSlug (_data/projects.js 의 slug), description(선택)
//   lang · permalink 은 경로로 자동 결정 (notes 와 동일 방식)
export default {
  layout: "layouts/project.njk",
  permalink(data) {
    const isEn = data.page.filePathStem.includes("/projects/en/");
    return `${isEn ? "/en" : ""}/projects/${data.page.fileSlug}/index.html`;
  },
  eleventyComputed: {
    lang: (data) => (data.page.filePathStem.includes("/projects/en/") ? "en" : "ko"),
  },
};
