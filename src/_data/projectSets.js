// projects.js 를 type 별로 갈라 pagination 에서 쓰기 쉽게 제공.
import projects from "./projects.js";

export default {
  work: projects.filter((p) => p.type === "work"),
  personal: projects.filter((p) => p.type !== "work"),
  featured: projects.filter((p) => p.featured),
};
