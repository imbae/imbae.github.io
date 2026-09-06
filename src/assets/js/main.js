// main.js — 점진적 향상용 바닐라 스크립트 (defer 로드)

/* 스크롤 진입 애니메이션 */
function initScrollAnimations() {
  const targets = document.querySelectorAll("[data-animate]");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((el) => io.observe(el));
}

/* 내비게이션 — 스크롤 배경, 진행바, 모바일 토글 */
function initNav() {
  const nav = document.querySelector(".nav");
  const bar = document.querySelector(".nav__progress");
  const burger = document.querySelector(".nav__hamburger");
  const mobile = document.querySelector(".nav__mobile");

  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
    if (bar) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : "0%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && mobile) {
    const setOpen = (open) => {
      burger.classList.toggle("open", open);
      mobile.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => setOpen(!burger.classList.contains("open")));
    mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }
}

/* 프로젝트 행 클릭 / 키보드 내비게이션 */
function initProjectRows() {
  const list = document.querySelector(".project-list");
  if (!list) return;
  const open = (row) => {
    const href = row.dataset.href;
    if (href) window.open(href, row.dataset.external === "true" ? "_blank" : "_self", "noopener");
  };
  list.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const row = e.target.closest(".project-row[data-href]");
    if (row) open(row);
  });
  list.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const row = e.target.closest(".project-row[data-href]");
    if (!row) return;
    e.preventDefault();
    open(row);
  });
}

/* 노트 태그 필터 (정적, 클라이언트) */
function initNoteFilter() {
  const filter = document.querySelector(".note-filter");
  const list = document.querySelector(".note-list");
  if (!filter || !list) return;
  const cards = [...list.querySelectorAll("[data-tags]")];
  filter.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tag]");
    if (!btn) return;
    const tag = btn.dataset.tag;
    filter.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    cards.forEach((c) => {
      const tags = (c.dataset.tags || "").split(",");
      c.hidden = tag !== "*" && !tags.includes(tag);
    });
  });
}

function init() {
  initScrollAnimations();
  initNav();
  initProjectRows();
  initNoteFilter();
  const loading = document.getElementById("loading-screen");
  if (loading) {
    loading.classList.add("hidden");
    setTimeout(() => loading.remove(), 500);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
