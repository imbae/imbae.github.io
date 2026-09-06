import rssPlugin from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAnchor from "markdown-it-anchor";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ── 정적 자원 ──────────────────────────────
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/root": "/" }); // robots.txt, favicon 등
  eleventyConfig.addWatchTarget("src/assets/");

  // ── 마크다운: 헤딩 앵커 ─────────────────────
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
      level: [2, 3],
      slugify: (s) =>
        s
          .trim()
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s-]/gu, "")
          .replace(/\s+/g, "-"),
    });
  });

  // ── 컬렉션 ─────────────────────────────────
  const notesByLang = (api, lang) =>
    api
      .getFilteredByTag("note")
      .filter((n) => n.data.lang === lang && !n.data.draft)
      .sort((a, b) => b.date - a.date);

  eleventyConfig.addCollection("notesKo", (api) => notesByLang(api, "ko"));
  eleventyConfig.addCollection("notesEn", (api) => notesByLang(api, "en"));

  // ── 필터 ───────────────────────────────────
  eleventyConfig.addFilter("localdate", (value, lang = "ko") => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "ko-KR", {
      year: "numeric",
      month: lang === "en" ? "short" : "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(d);
  });

  eleventyConfig.addFilter("where", (arr = [], key, val) =>
    (arr || []).filter((item) => item && item[key] === val)
  );

  eleventyConfig.addFilter("hasType", (arr = [], type) =>
    (arr || []).filter((p) => (type === "personal" ? p.type !== "work" : p.type === type))
  );

  eleventyConfig.addFilter("relatedNotes", (notes = [], slug, lang) =>
    (notes || []).filter((n) => n.data.project === slug && n.data.lang === lang)
  );

  eleventyConfig.addFilter("uniqueTags", (notes = []) => {
    const set = new Set();
    for (const n of notes) for (const t of n.data.tags || []) if (t !== "note") set.add(t);
    return [...set].sort();
  });

  eleventyConfig.addFilter("limit", (arr = [], n) => (arr || []).slice(0, n));

  eleventyConfig.addFilter("findBySlug", (arr = [], slug) =>
    (arr || []).find((p) => p.slug === slug)
  );

  // 반대 언어 URL: /about/ <-> /en/about/
  eleventyConfig.addFilter("altLangUrl", (url, lang) => {
    if (lang === "ko") return url === "/" ? "/en/" : `/en${url}`;
    return url.replace(/^\/en\/?/, "/") || "/";
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"],
  };
}
