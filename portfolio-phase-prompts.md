# 포트폴리오 웹사이트 — 단계별 개발 프롬프트
# GitHub Pages + Cloudflare 기반

---

## 🔰 공통 컨텍스트 (모든 프롬프트 앞에 붙이기)

```
나는 GitHub Pages로 호스팅하는 개인 포트폴리오 웹사이트를 개발 중이야.

기술 스택:
- 순수 HTML5 + CSS3 + Vanilla JavaScript
- 빌드 도구 없음 (Webpack, Vite 등 사용 안 함)
- 외부 라이브러리 최소화 (Google Fonts만 허용)
- 단일 페이지 구조 (SPA 방식, 스크롤로 섹션 이동)

디자인 방향:
- 다크 테마 (배경: #0e0e0e)
- 포인트 컬러: 라임 (#c8f53e)
- 폰트: Bebas Neue (제목) + DM Sans (본문) + DM Mono (코드/태그)
- 모던하고 개성 있는 개발자 포트폴리오 느낌

파일 구조:
- index.html: 메인 페이지
- assets/css/main.css: 전역 스타일
- assets/js/data.js: 콘텐츠 데이터 (이곳만 수정)
- assets/js/renderer.js: 렌더링 로직
- assets/js/main.js: 초기화

코드 규칙:
1. 시맨틱 HTML 사용 (section, article, nav, main 등)
2. CSS 변수로 색상/폰트 관리
3. JS는 type="module"로 로드
4. 반응형: Mobile First (기본 → 768px → 1024px)
5. 애니메이션: prefers-reduced-motion 미디어쿼리 포함
```

---

## 📌 Phase 0 — 프로젝트 초기 세팅

### 프롬프트 0-1: GitHub 레포지토리 세팅 가이드
```
위 공통 컨텍스트를 참고해서,
GitHub Pages 포트폴리오 프로젝트의 초기 세팅을 도와줘.

다음 내용을 단계별로 설명해줘:
1. GitHub 레포지토리 생성 (이름: username.github.io)
2. GitHub Pages 활성화 방법 (Settings → Pages)
3. .github/workflows/deploy.yml 작성
   - main 브랜치 push 시 자동 배포
   - peaceiris/actions-gh-pages 사용
4. .gitignore 파일 내용
5. 로컬 개발 환경 실행 방법 (Python http.server 또는 Live Server)

실제로 복사해서 쓸 수 있는 파일 내용도 포함해줘.
```

### 프롬프트 0-2: Cloudflare 연결 가이드
```
GitHub Pages에 Cloudflare를 연결하는 방법을 설명해줘.

현재 상황:
- GitHub Pages URL: username.github.io (커스텀 도메인 없음)
- Cloudflare 무료 플랜 사용 예정

다음 내용 포함해줘:
1. Cloudflare 가입 및 사이트 추가 방법
2. GitHub Pages와 연결 시 DNS 설정
3. SSL/TLS 설정 (Full 모드 권장 이유)
4. 캐시 규칙 설정
   - HTML: 캐시 안 함 (항상 최신)
   - CSS/JS/이미지: 장기 캐시
5. 나중에 커스텀 도메인 연결 시 추가 작업

커스텀 도메인 없이도 Cloudflare 사용이 가능한지,
username.github.io 그대로 쓸 때의 설정도 알려줘.
```

---

## 📌 Phase 1 — 기반 구조 구축

### 프롬프트 1-1: index.html 기본 구조
```
위 공통 컨텍스트를 참고해서,
포트폴리오 웹사이트의 index.html 기본 구조를 작성해줘.

포함할 내용:
1. <head> 설정
   - 메타태그 (SEO, OG 태그 포함)
   - Google Fonts 로드 (Bebas Neue, DM Sans, DM Mono)
   - CSS 파일 링크
   - favicon

2. <body> 구조 (섹션별 빈 컨테이너)
   - <nav> 고정 네비게이션
   - <section id="hero"> 메인 히어로
   - <div id="stats"> 통계 바
   - <section id="skills"> 기술 스택
   - <section id="projects"> 프로젝트
   - <section id="experience"> 경력
   - <section id="contact"> 연락처
   - <footer> 푸터
   - JS 파일 로드 (type="module")

3. 접근성: lang="ko", aria 속성, 시맨틱 태그

실제로 사용할 수 있는 완전한 HTML 파일로 작성해줘.
JS 렌더링 전 보여줄 로딩 상태도 간단히 포함해줘.
```

### 프롬프트 1-2: CSS 변수 및 전역 스타일
```
포트폴리오 웹사이트의 assets/css/main.css를 작성해줘.

포함할 내용:
1. CSS 변수 정의 (:root)
   - 컬러 (배경, 텍스트, 포인트, 보조, 보더)
   - 폰트 패밀리
   - 간격 (spacing scale)
   - 전환 속도 (transition)

2. CSS 리셋 및 기본 설정
   - box-sizing: border-box
   - scroll-behavior: smooth
   - 커스텀 스크롤바

3. 전역 타이포그래피
   - h1~h4, p, a 기본 스타일
   - .display-font (Bebas Neue 적용)
   - .mono-font (DM Mono 적용)

4. 레이아웃 유틸리티
   - .container (max-width + padding)
   - .section (섹션 공통 padding)
   - .grid, .flex 헬퍼

5. 공통 컴포넌트 기본 스타일
   - 버튼 (.btn-primary, .btn-ghost)
   - 태그/뱃지 (.tag, .tag-blue)
   - 상태 표시 (.status-active, .status-wip, .status-archived)

6. 반응형 기본 설정 (Mobile First)

7. prefers-reduced-motion 설정

디자인 방향: 다크 테마, 라임 포인트, 세련된 개발자 포트폴리오
```

### 프롬프트 1-3: data.js 콘텐츠 데이터 구조
```
포트폴리오의 모든 콘텐츠를 관리하는
assets/js/data.js 파일을 작성해줘.

포함할 데이터 구조:
1. PROFILE (이름, 직함, 소개글, 연락처, SNS, 재직가능여부)
2. STATS (숫자 + 레이블 배열)
3. SKILLS (아이콘, 이름, 태그 배열, 색상 테마)
4. PROJECTS (이름, 설명, 태그, 연도, 상태, GitHub URL, 데모 URL)
5. EXPERIENCES (기간, 회사, 직책, 상세 설명)
6. CONTACT (이메일, GitHub, LinkedIn 등)

예시 데이터 포함 조건:
- 직종: WPF/C# 개발자
- 주요 프로젝트: VideoPlayer Pro (WPF + ffmpeg.autogen)
- 기술: WPF, C#, .NET 8, FFmpeg, MISB, AI (Whisper, GPT)

ES Module 형식 (export const)으로 작성해줘.
나중에 쉽게 수정할 수 있도록 주석도 충분히 달아줘.
```

---

## 📌 Phase 2 — 핵심 UI 구현

### 프롬프트 2-1: 네비게이션 바
```
포트폴리오 웹사이트의 고정 네비게이션 바를 구현해줘.

기능 요구사항:
- 최상단 고정 (position: sticky 또는 fixed)
- 스크롤 시 배경 블러 효과
- 로고: "DEV.PORTFOLIO" (Bebas Neue, 라임색)
- 메뉴: about / projects / experience / contact
- CTA 버튼: "hire me ↗" (라임 배경, 검정 텍스트, pill 형태)
- 현재 섹션 활성화 표시 (Intersection Observer 활용)
- 모바일: 햄버거 메뉴 → 풀스크린 오버레이

구현 방식:
- HTML: index.html의 <nav> 부분
- CSS: 네비게이션 전용 스타일
- JS: 스크롤 감지, 모바일 토글

스크롤 진행률 바 (상단 1px 라인)도 포함해줘.
```

### 프롬프트 2-2: 히어로 섹션
```
포트폴리오의 메인 히어로 섹션을 구현해줘.

레이아웃:
- 좌측: 텍스트 콘텐츠
- 우측: 장식 요소 (도트 그리드 패턴)

포함할 요소:
1. 상태 뱃지: "● available for work" (점멸 애니메이션)
2. 메인 제목: 이름 (대형) + "DEVELOPER" (라임색)
   - Bebas Neue, 매우 큰 폰트 (clamp 활용)
3. 서브 설명: 직군 소개 (DM Sans, 밝은 회색)
4. CTA 버튼 2개: "프로젝트 보기 →" + "이력서 다운로드"
5. 하단: 스크롤 힌트 (가로선 + "SCROLL TO EXPLORE")

애니메이션:
- 페이지 진입 시 순차적 페이드인 (stagger)
- 도트 그리드 배경 (CSS로 구현)
- 버튼 hover 효과

data.js의 PROFILE 데이터를 renderer.js로 동적 주입하는 방식으로 구현해줘.
```

### 프롬프트 2-3: 통계 바 & 스킬 섹션
```
통계 바와 스킬 섹션을 구현해줘.

[통계 바]
- 4개 항목 (years experience, projects, repos, satisfaction)
- 항목 사이 세로 구분선
- 숫자는 크게 (라임색), 레이블은 작게 (회색)
- 스크롤 진입 시 숫자 카운트업 애니메이션

[스킬 섹션]
- 섹션 번호: "01 / 04" (우측 상단)
- 섹션 제목: "Skills" (Bebas Neue)
- 2열 그리드 카드 레이아웃
- 각 카드:
  - 아이콘 (이모지)
  - 스킬 이름
  - 태그 목록 (라임 또는 블루 색상)
  - hover 시 테두리 라임색으로 변경
- 모바일: 1열

data.js의 STATS, SKILLS 데이터 기반으로 renderer.js에서 동적 생성.
CSS Grid 활용, 완전한 HTML/CSS/JS 코드로 작성해줘.
```

### 프롬프트 2-4: 프로젝트 섹션
```
프로젝트 목록 섹션을 구현해줘.

레이아웃: 테이블 리스트 형태 (카드 그리드 아님)
- 각 행: [번호] [프로젝트 정보] [메타/상태]

각 프로젝트 행 포함 요소:
- 왼쪽: 순번 (01, 02... — DM Mono, 회색)
- 중앙:
  - 프로젝트 이름 (굵게)
  - 한 줄 설명 (회색)
  - 기술 태그 목록
- 오른쪽:
  - 연도 (DM Mono)
  - 상태 뱃지 (active=라임 / wip=주황 / archived=회색)
  - GitHub / 데모 링크 아이콘

인터랙션:
- 행 hover 시 배경 미묘하게 밝아짐
- 행 클릭 시 프로젝트 상세 모달 (선택사항 — 일단 GitHub 링크로 이동)

스크롤 진입 시 행이 아래에서 순차적으로 나타나는 애니메이션.
data.js의 PROJECTS 기반으로 renderer.js에서 동적 생성.
```

### 프롬프트 2-5: 경력 & 연락처 & 푸터
```
경력, 연락처 섹션과 푸터를 구현해줘.

[경력 섹션]
- 타임라인 형태 (세로 선 + 점)
- 각 항목: 기간(좌) + 회사명/직책/설명(우) 2열 그리드
- 현재 재직 중인 항목에 "present" 뱃지 (라임색)

[연락처 섹션]
- 대형 제목: "Let's work together" (Bebas Neue)
- 서브텍스트
- 연락처 버튼 행: email / GitHub / LinkedIn
- 각 버튼: 아이콘 + 텍스트, 테두리 pill 형태
- 센터 정렬

[푸터]
- 좌: "© 2025 — all rights reserved"
- 우: "designed & built with care"
- 상단 구분선

data.js의 EXPERIENCES, CONTACT 데이터 기반으로 동적 생성.
```

---

## 📌 Phase 3 — 인터랙션 & 애니메이션

### 프롬프트 3-1: 스크롤 애니메이션 시스템
```
포트폴리오 전체의 스크롤 기반 애니메이션을 구현해줘.

assets/js/animations.js 파일로 분리해서 구현:

1. Intersection Observer 기반 진입 애니메이션
   - 대상: [data-animate] 속성을 가진 요소
   - 종류: fade-up, fade-in, slide-left, slide-right
   - 딜레이: [data-delay="0.1"] 속성으로 제어
   - 한 번 실행 후 옵저버 해제 (성능 최적화)

2. 스크롤 진행률 바 (네비게이션 하단)

3. 네비게이션 활성 섹션 감지
   - Intersection Observer로 현재 보이는 섹션 감지
   - 해당 nav 링크에 active 클래스 추가

4. 숫자 카운트업 애니메이션 (통계 바용)
   - requestAnimationFrame 활용
   - easing 함수 적용 (easeOutCubic)

5. 커스텀 커서 효과 (선택)
   - 링크/버튼 hover 시 커서 확대

모든 애니메이션에 prefers-reduced-motion: reduce 대응 포함.
```

### 프롬프트 3-2: 마이크로 인터랙션
```
포트폴리오의 세부 마이크로 인터랙션을 구현해줘.

1. 버튼 효과
   - hover: 약간 위로 이동 (translateY(-2px))
   - active: 눌리는 효과 (scale(0.98))
   - 라임 버튼: hover 시 글로우 효과 (box-shadow)

2. 태그/뱃지 hover
   - 배경색 약간 밝아짐
   - 스케일 미세하게 증가

3. 프로젝트 행 hover
   - 좌측에서 라임색 세로선 나타남
   - 배경 미묘하게 밝아짐

4. 네비게이션 링크
   - hover 시 텍스트 색상 변경 + 하단 라인 슬라이드

5. 연락처 버튼 hover
   - 테두리 색상 → 라임색으로 전환
   - 아이콘 작은 이동 효과

6. 섹션 타이틀 장식
   - 제목 등장 시 좌측에서 라임색 선이 등장

CSS transition만으로 구현 가능한 것은 CSS로,
복잡한 것은 JS 이벤트 리스너로 구현해줘.
```

---

## 📌 Phase 4 — 최적화 & 배포

### 프롬프트 4-1: SEO 및 메타태그 최적화
```
포트폴리오 웹사이트의 SEO와 소셜 공유를 최적화해줘.

index.html의 <head> 부분을 완성해줘:

1. 기본 SEO
   - <title>: 이름 + 직군 + "포트폴리오"
   - <meta description>: 140자 내외 소개
   - <meta keywords>
   - <link rel="canonical">

2. Open Graph (카카오/페이스북 공유)
   - og:title, og:description, og:image, og:url
   - og:image: 1200x630 권장 (assets/images/og-image.png)

3. Twitter Card
   - twitter:card, twitter:title, twitter:description, twitter:image

4. 구조화 데이터 (JSON-LD)
   - Person 스키마 (이름, 직업, SNS URL)

5. favicon 세트
   - favicon.ico, favicon-32x32.png, apple-touch-icon.png
   - <link> 태그 작성법

6. 기타
   - <meta name="theme-color"> (모바일 브라우저 탭 색상)
   - <meta name="robots">

data.js의 PROFILE 데이터를 활용해서
자동으로 메타태그가 생성되는 방식으로도 구현해줘.
```

### 프롬프트 4-2: 성능 최적화
```
포트폴리오 웹사이트의 Lighthouse 점수를 최적화해줘.

목표: Performance 90+, Accessibility 100, Best Practices 100, SEO 100

최적화 항목:
1. 이미지 최적화
   - WebP 변환 방법 (squoosh 또는 cwebp)
   - <img> loading="lazy" 적용
   - width/height 명시 (CLS 방지)
   - srcset으로 반응형 이미지

2. 폰트 최적화
   - font-display: swap
   - preconnect 헤더
   - 필요한 글자만 subsetting (선택)

3. CSS 최적화
   - 첫 화면(above the fold) CSS 인라인 처리
   - 나머지 CSS는 비동기 로드

4. JS 최적화
   - type="module" + defer
   - 불필요한 이벤트 리스너 정리

5. GitHub Pages 최적화
   - _headers 파일 (Cloudflare Pages용)
   - 캐시 컨트롤 헤더

각 항목별 실제 코드 예시 포함해줘.
```

### 프롬프트 4-3: 반응형 완성도 체크
```
포트폴리오 웹사이트의 반응형 디자인을 완성해줘.

각 브레이크포인트별 레이아웃 조정:

[모바일: ~767px]
- 네비게이션: 햄버거 메뉴
- 히어로: 단일 열, 폰트 크기 축소
- 통계 바: 2×2 그리드
- 스킬 카드: 1열
- 프로젝트 행: 연도/상태를 프로젝트 이름 아래로
- 경력: 기간과 내용 세로 배치

[태블릿: 768px~1023px]
- 네비게이션: 전체 메뉴 표시
- 히어로: 폰트 크기 중간
- 스킬 카드: 2열 (데스크탑과 동일)
- 전체적으로 여백 줄임

[데스크탑: 1024px+]
- 현재 목업과 동일

현재 구현된 코드를 리뷰하고
각 브레이크포인트에서 깨지는 부분을 수정해줘.
Chrome DevTools에서 확인할 수 있는 체크리스트도 작성해줘.
```

### 프롬프트 4-4: GitHub Pages 최종 배포
```
포트폴리오를 GitHub Pages에 최종 배포하는 전체 과정을 안내해줘.

1. 배포 전 체크리스트
   - 모든 링크 동작 확인
   - 이미지 경로 (상대경로 사용 확인)
   - data.js 실제 정보로 업데이트
   - console.log 제거
   - HTML 유효성 검사

2. GitHub 레포지토리 설정
   - 레포 이름: username.github.io
   - Public 설정
   - GitHub Pages: Settings → Pages → Source: GitHub Actions

3. 배포 커맨드
   git init
   git add .
   git commit -m "feat: 포트폴리오 초기 배포"
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main

4. 배포 확인
   - GitHub Actions 탭에서 배포 진행 상황 확인
   - https://username.github.io 접속 확인

5. Cloudflare 연결 (선택)
   - Cloudflare 사이트 추가
   - CNAME 설정

6. 이후 업데이트 방법
   - data.js 수정 → git push → 자동 배포

실제 커맨드 라인 명령어 위주로 작성해줘.
```

---

## 📌 Phase 5 — 콘텐츠 관리 & 확장

### 프롬프트 5-1: 프로젝트 추가 방법
```
포트폴리오에 새 프로젝트를 추가하는 방법을 알려줘.

data.js의 PROJECTS 배열에 새 항목 추가:
- 프로젝트명: "MISB KLV Parser"
- 설명: "드론 영상 메타데이터 실시간 파싱 라이브러리"
- 태그: ["C#", "MISB ST0601", ".NET"]
- 연도: "2024"
- 상태: "wip"
- GitHub URL: "https://github.com/..."

추가 후 올바르게 렌더링되는지 확인 방법,
순서 변경 방법, 아카이브 처리 방법도 알려줘.
```

### 프롬프트 5-2: 다크/라이트 테마 토글
```
포트폴리오에 다크/라이트 테마 토글 기능을 추가해줘.

구현 방법:
1. CSS 변수로 두 가지 테마 정의
   - [data-theme="dark"]: 현재 다크 테마 (기본값)
   - [data-theme="light"]: 라이트 테마 (흰 배경, 짙은 텍스트)

2. 토글 버튼
   - 네비게이션 우측에 아이콘 버튼
   - 달/해 아이콘 (SVG)

3. 상태 저장
   - localStorage에 테마 저장
   - 재방문 시 이전 테마 유지

4. 시스템 테마 감지
   - prefers-color-scheme 미디어쿼리로 초기값 결정

5. 전환 애니메이션
   - 부드러운 색상 전환 (transition: all 0.3s)

라이트 테마의 컬러 팔레트도 함께 제안해줘.
```

### 프롬프트 5-3: 블로그/노트 섹션 추가
```
포트폴리오에 간단한 블로그/기술 노트 섹션을 추가해줘.

방식: 외부 서버 없이 정적으로 관리

구현 방법:
1. data.js에 POSTS 배열 추가
   - 제목, 날짜, 태그, 한줄 요약, URL (외부 링크 가능)

2. index.html에 섹션 추가
   - 기존 섹션들 사이에 자연스럽게 삽입

3. 카드 레이아웃
   - 날짜 (DM Mono)
   - 제목
   - 태그
   - "읽기 →" 링크

4. 옵션: 마크다운 파일로 관리
   - posts/ 폴더에 .md 파일 작성
   - marked.js 로 클라이언트에서 렌더링
   - URL 해시로 포스트 전환 (#/post/slug)

두 가지 방법의 장단점 비교 후 추천해줘.
```

---

## 💡 프롬프트 활용 팁

1. **공통 컨텍스트**는 항상 첫 줄에 붙여서 사용하세요
2. 한 번에 하나의 섹션만 요청하고, 결과를 로컬에서 확인 후 다음으로 넘어가세요
3. 코드가 길면 "계속해줘" 또는 "CSS 부분만 작성해줘"로 나눠서 요청하세요
4. 수정 요청 시 기존 코드를 같이 붙여넣으면 더 정확하게 수정해줘요
5. 각 Phase 완료 후 `git commit`으로 스냅샷 남겨두세요

```
# 권장 커밋 메시지 컨벤션
feat: 히어로 섹션 구현
feat: 프로젝트 목록 섹션 추가
fix: 모바일 네비게이션 버그 수정
style: 스킬 카드 hover 효과 개선
content: 프로젝트 데이터 업데이트
chore: 이미지 최적화
```
