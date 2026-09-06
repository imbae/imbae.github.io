# CLAUDE.md — 임배현 개인 홈페이지

## 개요

임배현(Baehyeon Lim)의 개인 홈페이지. **Eleventy(11ty)** 로 빌드하는 정적 사이트로,
GitHub Pages(`imbae.github.io`)에 GitHub Actions 로 자동 배포한다.
한국어(`/`)와 영어(`/en/`)를 병행한다.

- **빌드**: Eleventy 3.x + Nunjucks 템플릿 (`npm run build` → `_site/`)
- **런타임**: 프레임워크 없음. 정적 HTML + `src/assets/js/main.js` (점진적 향상용 바닐라 JS)
- **호스팅**: GitHub Pages (Source = GitHub Actions)
- **디자인**: 다크 테마(`#0e0e0e`) + 라임 포인트(`#c8f53e`), Bebas Neue / DM Sans / DM Mono

## 디렉터리 구조

```
eleventy.config.js          빌드 설정 (컬렉션·필터·패스스루)
package.json                의존성 · 스크립트
src/
  _data/
    site.js                 사이트 전역 (이름/URL/nav/UI 문구, 언어별 { ko, en })
    projects.js             프로젝트 통합 배열 ★ 프로젝트 수정은 여기
    projectSets.js          projects.js 를 type 별로 분리 (pagination 용, 수정 불필요)
    books.js                독서 기록 ★ 책 수정은 여기
  _includes/
    layouts/  base · page · note · project
    partials/ header · footer · macros (projectRow / noteCard / bookRow)
  assets/
    css/  tokens · base · components · animations
    js/   main.js
  ko/                       한국어 페이지 (permalink 에서 /ko 제거 → 루트)
  en/                       영어 페이지 (permalink /en/... 유지)
    {index, work/, projects/, notes/, bookshelf/, portfolio/, about, now, uses}
  notes/
    ko/*.md  en/*.md        글(노트). frontmatter 로 project·tags·key 연결
  feed/ko.njk feed/en.njk   Atom 피드
  sitemap.njk  404.njk  root/robots.txt
docs/                       개발 메모 (빌드 산출물서 제외)
```

## 콘텐츠 수정 가이드

| 무엇을 | 어디를 |
|--------|--------|
| 프로필·연락처·내비게이션·UI 문구 | `src/_data/site.js` |
| 프로젝트 추가/수정 (업무·개인·취미) | `src/_data/projects.js` |
| 독서 기록 | `src/_data/books.js` |
| 글 추가 | `src/notes/ko/<슬러그>.md` (+ 영어면 `src/notes/en/<슬러그>.md`) |
| 정적 페이지 문구 (about/now/uses) | `src/ko/*.md`, `src/en/*.md` |

### 프로젝트 항목 스키마 (`projects.js`)

```js
{
  slug, type: "work" | "personal" | "hobby", featured: bool,
  period, status: "active" | "wip" | "archived",
  stack: [], links: { repo, demo, writeup }, cover,
  ko: { title, role, summary, highlights: [] },
  en: { title, role, summary, highlights: [] },
}
```
- `/work` = `type==="work"`, `/projects` = 그 외, `/portfolio` = `featured`
- 상세 페이지는 pagination 으로 자동 생성 (`src/{ko,en}/{work,projects}/detail.njk`)

### 글 frontmatter

```yaml
title:    글 제목
date:     2024-11-12
updated:  2025-01-05     # 선택
summary:  한 줄 요약      # 목록·피드에 노출
tags:     [MISB, "C#"]
project:  klv-parser      # projects.js 의 slug — 프로젝트 상세의 "관련 글" 에 연결
key:      misb-klv-basics # 한/영 짝 연결용(선택)
draft:    true            # 선택 — 빌드에서 제외
```
`lang` 과 `permalink` 은 경로(`notes/ko` vs `notes/en`)로 자동 결정된다.

## i18n 규칙

- `src/ko/**` → `/…`, `src/en/**` → `/en/…` (`ko.11tydata.js` / `en.11tydata.js` 의 `permalink`)
- 공유 데이터는 `entry[lang]` 로 언어별 필드 접근 (`p.ko.title` 등)
- 언어 스위처 URL 은 `altLangUrl` 필터로 생성 (`eleventy.config.js`)
- 새 페이지는 **반드시 ko/en 양쪽에** 만들 것. 한쪽만 있으면 스위처가 깨진다.

## 로컬 개발

```bash
npm install
npm run dev      # http://localhost:8080, 파일 감시
npm run build    # _site/ 정적 빌드
```

## 배포

`main` 브랜치 push → `.github/workflows/deploy.yml`
(checkout → setup-node 20 → `npm ci` → `npm run build` → upload `_site` → deploy-pages).

## 성능·접근성 원칙 (유지할 것)

- 외부 의존: Google Fonts 만. 그 외 라이브러리 금지
- 폰트는 `<link>` + `preconnect` + `display=swap` (`@import` 쓰지 말 것)
- 애니메이션은 `transform`/`opacity` 만, `prefers-reduced-motion` 항상 대응
- 이미지: WebP, `width`/`height` 명시, 상대경로 (`/assets/images/…`)
- 색 대비 4.5:1 이상 (`--color-muted-2` 는 이 하한에 맞춘 값)
- 모든 이미지 `alt`, 제목 계층 `h1→h2→h3`, `<html lang>` 정확히

## 아직 안 된 것 (TODO)

- `projects.js` / `books.js` / `about·now·uses` 의 `TODO(owner)` — 실제 정보로 교체
- `links.repo` 가 전부 프로필 주소 → 개별 레포 주소로
- `assets/images/` 아래 프로필 사진·프로젝트 스크린샷·`og-image.png`(1200×630),
  준비되면 `base.njk` 의 `og:image` 주석 해제
- Cloudflare / 커스텀 도메인 (선택)
