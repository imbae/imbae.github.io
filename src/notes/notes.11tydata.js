// src/notes/{ko,en}/*.md → 글 컬렉션.
//   frontmatter: title, date, updated(선택), summary(선택), tags[], project(슬러그, 선택),
//                key(짝 연결, 선택), draft(선택)
export default {
  layout: "layouts/note.njk",
  tags: ["note"],
  permalink(data) {
    const isEn = data.page.filePathStem.includes("/notes/en/");
    return `${isEn ? "/en" : ""}/notes/${data.page.fileSlug}/index.html`;
  },
  eleventyComputed: {
    lang: (data) => (data.page.filePathStem.includes("/notes/en/") ? "en" : "ko"),
  },
};
