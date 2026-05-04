// animations.js — 스크롤 애니메이션 & 인터랙션

/* ─ Intersection Observer 진입 애니메이션 ─ */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 한 번 실행 후 해제
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

/* ─ 스크롤 진행률 바 ─ */
export function initProgressBar() {
  const bar = document.querySelector('.nav__progress');
  if (!bar) return;

  const update = () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─ 네비게이션 — 스크롤 스타일 & 활성 섹션 ─ */
export function initNav() {
  const nav    = document.querySelector('.nav');
  const links  = document.querySelectorAll('.nav__link[data-section]');
  const burger = document.querySelector('.nav__hamburger');
  const mobile = document.querySelector('.nav__mobile');

  if (!nav) return;

  // 스크롤 시 배경 처리
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 활성 섹션 감지
  if (links.length) {
    const sectionIds = [...links].map(l => l.dataset.section);
    const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionEls.forEach(s => sectionObs.observe(s));
  }

  // 햄버거 토글
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobile.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobile.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ─ 숫자 카운트업 ─ */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function countUp(el, target, duration = 1200) {
  const isNumeric = /^\d+$/.test(target);
  if (!isNumeric) return; // "5+" 같은 값은 그냥 유지

  const end = parseInt(target, 10);
  let start = null;

  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(easeOutCubic(progress) * end);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target; // 원래 값 (단위 포함) 복원
  };

  requestAnimationFrame(step);
}

export function initCountUp() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.stats__value[data-target]').forEach(el => {
          countUp(el, el.dataset.target);
        });
        obs.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  obs.observe(statsSection);
}
