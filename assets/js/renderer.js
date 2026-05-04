// renderer.js — 데이터 → DOM 렌더링

import { PROFILE, STATS, SKILLS, PROJECTS, EXPERIENCES, CONTACT } from './data.js';

/* ─ 헬퍼 ─────────────────────────────── */
const el = (tag, cls, ...children) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  children.forEach(c => typeof c === 'string' ? e.insertAdjacentHTML('beforeend', c) : c && e.appendChild(c));
  return e;
};

const skillTagClass = color => ({ green: 'tag-green', blue: 'tag-blue', amber: 'tag-amber', purple: 'tag-purple' }[color] ?? 'tag-gray');

/* ─ 메타 / SEO ─────────────────────────────── */
function renderMeta() {
  document.title = `${PROFILE.nameEn ?? PROFILE.name} — ${PROFILE.title}`;

  const setMeta = (sel, val) => {
    let m = document.querySelector(sel);
    if (!m) { m = document.createElement('meta'); document.head.appendChild(m); }
    m.setAttribute('content', val);
  };

  setMeta('meta[name="description"]', PROFILE.description);
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[property="og:description"]', PROFILE.description);
}

/* ─ 히어로 ─────────────────────────────── */
function renderHero() {
  const badge = document.getElementById('hero-badge-text');
  const name  = document.getElementById('hero-name');
  const sub   = document.getElementById('hero-sub');

  if (badge) badge.textContent = PROFILE.availableForWork ? 'available for work' : 'currently busy';
  if (name)  name.textContent  = PROFILE.name;
  if (sub)   sub.textContent   = PROFILE.description;

  const cta = document.getElementById('hero-cta-email');
  if (cta) cta.href = `mailto:${PROFILE.email}`;
}

/* ─ 통계 ─────────────────────────────── */
function renderStats() {
  const container = document.getElementById('stats-grid');
  if (!container) return;

  container.innerHTML = STATS.map(s => `
    <div class="stats__item">
      <span class="stats__value display-font" data-target="${s.value}">${s.value}</span>
      <span class="stats__label">${s.label}</span>
    </div>
  `).join('');
}

/* ─ 스킬 ─────────────────────────────── */
function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = SKILLS.map((sk, i) => `
    <div class="skill-card" data-animate="fade-up" data-delay="${(i * 0.1 + 0.1).toFixed(1)}">
      <span class="skill-card__icon">${sk.icon}</span>
      <div class="skill-card__name">${sk.name}</div>
      <div class="skill-card__tags">
        ${sk.tags.map(t => `<span class="tag ${skillTagClass(sk.color)}">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ─ 프로젝트 ─────────────────────────────── */
function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = PROJECTS.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const statusClass = { active: 'status-active', wip: 'status-wip', archived: 'status-archived' }[p.status] ?? 'status-archived';
    const statusLabel = { active: 'active', wip: 'in progress', archived: 'archived' }[p.status] ?? p.status;

    const githubLink = p.github
      ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-row__link" title="GitHub" onclick="event.stopPropagation()">GH</a>`
      : '';
    const demoLink = p.demo
      ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-row__link" title="Demo" onclick="event.stopPropagation()">↗</a>`
      : '';

    return `
      <article class="project-row" data-animate="fade-up" data-delay="${Math.min(i * 0.1 + 0.1, 0.5).toFixed(1)}"
               ${p.github ? `onclick="window.open('${p.github}','_blank')"` : ''}>
        <span class="project-row__num mono-font">${num}</span>
        <div class="project-row__info">
          <div class="project-row__name">${p.name}</div>
          <div class="project-row__desc">${p.description}</div>
          <div class="project-row__tags">
            ${p.tags.map(t => `<span class="tag tag-gray">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-row__meta">
          <span class="project-row__year mono-font">${p.year}</span>
          <span class="status ${statusClass}">${statusLabel}</span>
          <div class="project-row__links">${githubLink}${demoLink}</div>
        </div>
      </article>
    `;
  }).join('');
}

/* ─ 경력 ─────────────────────────────── */
function renderExperiences() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  container.innerHTML = EXPERIENCES.map((exp, i) => `
    <div class="exp-item" data-animate="fade-up" data-delay="${(i * 0.15 + 0.1).toFixed(2)}">
      <div class="exp-item__period mono-font">${exp.period}</div>
      <div class="exp-item__content">
        <div class="exp-item__header">
          <span class="exp-item__company">${exp.company}</span>
          ${exp.current ? '<span class="status status-active">present</span>' : ''}
        </div>
        <div class="exp-item__role">${exp.role}</div>
        <p class="exp-item__desc">${exp.description}</p>
      </div>
    </div>
  `).join('');
}

/* ─ 연락처 ─────────────────────────────── */
function renderContact() {
  const emailBtn = document.getElementById('contact-email');
  const githubBtn = document.getElementById('contact-github');
  const linkedinBtn = document.getElementById('contact-linkedin');

  if (emailBtn)   { emailBtn.href = `mailto:${CONTACT.email}`; }
  if (githubBtn)  { CONTACT.github ? githubBtn.href = CONTACT.github : githubBtn.remove(); }
  if (linkedinBtn){ CONTACT.linkedin ? linkedinBtn.href = CONTACT.linkedin : linkedinBtn.remove(); }
}

/* ─ 진입점 ─────────────────────────────── */
export function renderAll() {
  renderMeta();
  renderHero();
  renderStats();
  renderSkills();
  renderProjects();
  renderExperiences();
  renderContact();
}
