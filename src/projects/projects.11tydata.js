// src/projects/{ko,en}/<slug>.md → 프로젝트 상세(롱폼) 페이지. (업무 + 개인 공통)
//   파일명 = _data/projects.js 의 slug.
//   frontmatter: title, projectSlug(= slug, 명시용), description(선택)
//   lang · permalink 은 경로/타입으로 자동 결정.
import projects from "../_data/projects.js";

export default {
  layout: "layouts/project.njk",
  permalink(data) {
    const isEn = data.page.filePathStem.includes("/projects/en/");
    const p = projects.find((x) => x.slug === data.page.fileSlug);
    const seg = p && p.type === "work" ? "work" : "projects";
    return `${isEn ? "/en" : ""}/${seg}/${data.page.fileSlug}/index.html`;
  },
  eleventyComputed: {
    lang: (data) => (data.page.filePathStem.includes("/projects/en/") ? "en" : "ko"),
  },
};
