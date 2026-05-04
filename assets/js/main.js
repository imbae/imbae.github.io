// main.js — 진입점

import { renderAll } from './renderer.js';
import { initScrollAnimations, initProgressBar, initNav, initCountUp } from './animations.js';

function init() {
  // 1. 콘텐츠 렌더링
  renderAll();

  // 2. 애니메이션 & 인터랙션 초기화
  //    (renderAll 이후 DOM이 완성된 뒤 실행)
  initScrollAnimations();
  initProgressBar();
  initNav();
  initCountUp();

  // 3. 로딩 화면 제거
  const loading = document.getElementById('loading-screen');
  if (loading) {
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 500);
  }
}

// DOM 준비 확인 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
