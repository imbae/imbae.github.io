# CLAUDE.md — 개인 포트폴리오 웹사이트

## 📌 프로젝트 개요

GitHub Pages로 호스팅하는 개인 포트폴리오 정적 웹사이트.
Cloudflare를 CDN/보안 레이어로 사용하며, 순수 HTML/CSS/JS로 구성된 단일 파일 기반 구조.

- **호스팅**: GitHub Pages (`username.github.io`)
- **CDN/보안**: Cloudflare (무료 플랜)
- **기술 스택**: Vanilla HTML5 + CSS3 + JavaScript (빌드 도구 없음)
- **배포 방식**: `git push` → GitHub Actions 자동 배포
- **목표**: 빠른 로딩, 쉬운 콘텐츠 수정, 모던한 디자인

---

## 🗂️ 프로젝트 구조

```
devfolio/
├── CLAUDE.md                   ← 이 파일
├── README.md                   ← 프로젝트 설명
├── index.html                  ← 메인 페이지 (단일 페이지)
│
├── assets/
│   ├── css/
│   │   ├── main.css            ← 전역 스타일 + CSS 변수
│   │   ├── components.css      ← 컴포넌트 스타일
│   │   └── animations.css      ← 애니메이션
│   │
│   ├── js/
│   │   ├── main.js             ← 진입점 (초기화)
│   │   ├── data.js             ← ★ 콘텐츠 데이터 (이곳만 수정!)
│   │   ├── renderer.js         ← 데이터 → DOM 렌더링
│   │   └── animations.js       ← 스크롤 애니메이션, 인터랙션
│   │
│   └── images/
│       ├── profile.jpg         ← 프로필 사진
│       └── projects/           ← 프로젝트 스크린샷
│
└── .github/
    └── workflows/
        └── deploy.yml          ← GitHub Actions 자동 배포
```

---

## ✏️ 콘텐츠 수정 방법

### ★ `assets/js/data.js` 파일만 수정하면 됩니다!

```javascript
// 이 파일만 수정하면 웹사이트 전체가 반영됩니다.

export const PROFILE = {
  name: "홍길동",
  title: "WPF · C# · FFmpeg Developer",
  description: "영상 처리와 드론 데이터 분석을 전문으로 하는 ...",
  email: "your@email.com",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  availableForWork: true,
};

export const STATS = [
  { value: "5+", label: "years experience" },
  { value: "12", label: "projects delivered" },
  { value: "3",  label: "open source repos" },
];

export const SKILLS = [
  {
    icon: "🖥",
    name: "Desktop Development",
    tags: ["WPF", "C#", ".NET 8", "MVVM"],
    color: "green",           // green | blue | amber | purple
  },
  // ...
];

export const PROJECTS = [
  {
    id: "videoplayer-pro",
    name: "VideoPlayer Pro",
    description: "WPF · ffmpeg.autogen · MISB · AI Subtitle",
    tags: ["WPF", "FFmpeg", "Whisper"],
    year: "2024",
    status: "active",         // active | wip | archived
    github: "https://github.com/...",
    demo: "",                 // 데모 URL (없으면 빈 문자열)
  },
  // ...
];

export const EXPERIENCES = [
  {
    period: "2022 — present",
    company: "회사명 주식회사",
    role: "Senior Software Engineer",
    description: "WPF 기반 영상 처리 시스템 개발...",
  },
  // ...
];
```

---

## 🎨 디자인 시스템

### 컬러 팔레트 (CSS 변수)

```css
/* assets/css/main.css */
:root {
  --color-bg:        #0e0e0e;   /* 배경 */
  --color-surface:   #161616;   /* 카드/섹션 배경 */
  --color-border:    rgba(255, 255, 255, 0.08);
  --color-text:      #f5f2ec;   /* 본문 텍스트 */
  --color-muted:     #888888;   /* 보조 텍스트 */
  --color-accent:    #c8f53e;   /* 포인트 컬러 (라임) */
  --color-accent-2:  #3e8ef5;   /* 보조 포인트 (블루) */
}
```

> 포인트 컬러를 바꾸고 싶으면 `--color-accent` 값만 변경하세요.

### 타이포그래피

```css
/* 제목: Bebas Neue (임팩트 있는 디스플레이 폰트) */
/* 본문: DM Sans (가독성 좋은 본문 폰트) */
/* 코드/태그: DM Mono */
```

### 섹션 구조 (index.html에서 ID로 참조)

| 섹션 ID | 설명 |
|---------|------|
| `#hero` | 메인 소개, 이름, CTA 버튼 |
| `#stats` | 숫자 통계 바 |
| `#skills` | 기술 스택 카드 그리드 |
| `#projects` | 프로젝트 목록 |
| `#experience` | 경력 사항 |
| `#contact` | 연락처 + SNS 링크 |

---

## 🚀 배포 파이프라인

### 자동 배포 흐름

```
로컬 수정
    ↓
git add . && git commit -m "update: 프로젝트 추가"
    ↓
git push origin main
    ↓
GitHub Actions 자동 실행 (.github/workflows/deploy.yml)
    ↓
GitHub Pages에 배포 (1~2분 소요)
    ↓
https://username.github.io 에서 확인
    ↓
Cloudflare 캐시 자동 갱신
```

### GitHub Actions 워크플로우 (`deploy.yml`)

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./        # 루트 디렉토리 배포
```

---

## ☁️ Cloudflare 설정

### 초기 연결 방법

```
1. cloudflare.com 가입
2. 사이트 추가 → username.github.io 입력
3. DNS 설정 → GitHub Pages IP 등록
4. SSL/TLS → Full 모드 선택
5. 캐싱 규칙 → HTML 캐시 무효화 설정 (아래 참고)
```

### 권장 캐시 규칙

```
# HTML 파일: 캐시하지 않음 (항상 최신 버전)
Cache-Control: no-cache
대상: *.html

# CSS/JS/이미지: 1년 캐시 (파일명에 해시 포함)
Cache-Control: max-age=31536000
대상: assets/*
```

### Page Rules (무료 플랜 3개 제한)

```
1. username.github.io/* → Always Use HTTPS
2. username.github.io/assets/* → Cache Level: Cache Everything
3. username.github.io/ → Cache Level: Bypass (항상 최신 HTML)
```

---

## ⚡ 성능 최적화 원칙

### 지켜야 할 규칙

```
✅ 외부 폰트는 Google Fonts 에서 preconnect + display=swap
✅ 이미지는 WebP 포맷, width/height 속성 명시
✅ JS는 defer 또는 type="module" 로 비동기 로드
✅ CSS는 <head>에, JS는 </body> 직전에 배치
✅ 애니메이션은 transform/opacity만 사용 (layout shift 방지)
✅ 첫 화면(LCP)에 필요한 CSS는 <style> 인라인으로
```

### 금지 사항

```
❌ jQuery, Bootstrap 등 무거운 라이브러리 금지
❌ 불필요한 npm 패키지 (빌드 도구 없는 프로젝트)
❌ 큰 이미지 원본 그대로 사용 (반드시 압축)
❌ 동기 JS 블로킹 (defer 없는 <script>)
```

---

## ♿ 접근성 체크리스트

```
✅ 모든 이미지에 alt 속성
✅ 색상 대비 비율 4.5:1 이상
✅ 키보드 탐색 가능 (Tab 순서 확인)
✅ 스크린리더용 aria-label
✅ <html lang="ko"> 설정
✅ 제목 태그 계층 구조 (h1 → h2 → h3)
```

---

## 📱 반응형 브레이크포인트

```css
/* 기준 — Mobile First */
/* 기본 */          /* 모바일: ~767px */
@media (min-width: 768px)  { /* 태블릿 */ }
@media (min-width: 1024px) { /* 데스크탑 */ }
@media (min-width: 1280px) { /* 와이드 */ }
```

---

## 🔧 로컬 개발 환경

```bash
# 빌드 도구 없이 바로 실행 (Live Server 추천)
# VS Code 확장: Live Server (ritwickdey.LiveServer)

# 또는 Python으로 간단한 로컬 서버
python -m http.server 3000

# 또는 Node.js
npx serve .
```

---

## 🤖 Claude에게 작업 요청 시 참고사항

- 콘텐츠 수정은 항상 `data.js` 기준으로 작성
- 새 섹션 추가 시 `data.js` → `renderer.js` → `index.html` 순서로 반영
- CSS 변수 (`--color-*`) 를 직접 수정하지 말고 변수로 참조
- 애니메이션은 `prefers-reduced-motion` 미디어쿼리 항상 포함
- 이미지 경로는 항상 상대경로 (`./assets/images/`)
- 외부 API 없음 — 완전 정적 사이트 유지
