# 03. 콘텐츠 수정하기

실제로 자주 하게 될 작업들을 단계별로 정리했습니다.

**공통 흐름은 항상 이렇습니다:**

1. `npm run dev` 실행 (안 켰으면)
2. 아래 설명대로 `src/` 안의 파일 수정 → 저장
3. 브라우저(<http://localhost:8080>)에서 확인
4. 괜찮으면 `git add . && git commit -m "..." && git push`

> **`.js` 파일을 고칠 때 주의:** 쉼표(`,`), 중괄호(`{ }`), 대괄호(`[ ]`),
> 따옴표(`"`)의 짝이 안 맞으면 빌드가 깨집니다. **기존 항목을 통째로 복사해서
> 값만 바꾸는** 방식으로 하면 안전합니다. 텍스트 안에 큰따옴표가 필요하면
> `\"` 처럼 역슬래시를 붙이거나 문장을 작은따옴표로 감쌉니다.

---

## A. 독서 기록 추가/수정

**파일 하나만:** [`src/_data/books.js`](../../src/_data/books.js)

### 새 책 추가

배열(`[ ... ]`) 안에 항목(`{ ... }`)을 하나 더 넣습니다. 기존 걸 복사하세요.

```js
{
  title: "함께 자라기",
  author: "김창준",
  status: "done",          // "reading"(읽는 중) | "done"(완독) | "want"(읽고 싶음)
  rating: 5,               // 0~5. "done"일 때만 별로 표시됨. 없으면 0
  finished: "2026-02",     // 완독 시점 "YYYY-MM". reading/want면 "" 로 둠
  link: "",                // 소개 페이지 URL (없으면 "")
  ko: { note: "한 줄 감상 (한국어)" },
  en: { note: "One-line take (English)" },
},
```

- 마지막 줄의 **쉼표를 빠뜨리지 마세요** (`},`).
- 순서는 파일에 적은 순서대로 그룹(읽는 중 / 완독 / 읽고 싶음) 안에서 표시됩니다.
- 영어 감상을 안 쓰겠으면 `en: { note: "" }` 로 둡니다.

### 상태 바꾸기 (읽는 중 → 완독)

해당 항목에서 `status`를 `"done"`으로, `finished`에 날짜를, `rating`에 별점을
넣으면 됩니다.

확인: <http://localhost:8080/bookshelf/> (영어: `/en/bookshelf/`)

---

## B. 프로젝트 추가/수정

프로젝트는 **두 부분**으로 되어 있습니다.

| 파일 | 담는 것 | 어디에 보임 |
|------|---------|-------------|
| `src/_data/projects.js` 의 항목 | 제목·기간·상태·기술 스택·요약 | 목록(`/work/`, `/projects/`), 포트폴리오 |
| `src/projects/ko/<slug>.md` + `en/<slug>.md` | 상세 설명 본문 | 상세 페이지(`/work/<slug>/` 등) |

`<slug>` 는 주소에 쓰이는 짧은 영문 이름입니다 (예: `bgcs`, `fflux`,
`air-vehicle-test-equipment`). **데이터 항목의 `slug` 값과 마크다운 파일
이름이 똑같아야** 연결됩니다.

### 1단계 — 데이터 항목 추가

[`src/_data/projects.js`](../../src/_data/projects.js) 배열에 추가:

```js
{
  slug: "my-new-project",          // 영소문자, 하이픈. 파일명과 동일하게.
  type: "personal",                // "work"(업무) | "personal"(개인) | "hobby"
  featured: false,                 // true면 /portfolio 페이지에도 노출
  period: "2026 —",                // 표시용 문자열. "2024 — 2025", "2026 —" 등
  status: "active",                // "active"(진행) | "wip"(작업중) | "archived"(보관)
  stack: ["Flutter", "Dart"],      // 기술 태그. 빈 배열 [] 가능
  links: { repo: "", demo: "", writeup: "" },   // 공개 안 하면 "" 로
  cover: "",
  ko: {
    title: "새 프로젝트",
    role: "전체",                  // 내 역할. "개발", "설계 · 개발" 등
    summary: "한두 문장 요약. 목록 카드에 보임.",
    highlights: [],                // 상세 본문(.md)이 있으면 비워두면 됨
  },
  en: {
    title: "New project",
    role: "Everything",
    summary: "One or two sentence summary.",
    highlights: [],
  },
},
```

- `type` 이 `"work"` 면 `/work/` 목록과 `/work/<slug>/` 주소,
  아니면 `/projects/` 목록과 `/projects/<slug>/` 주소로 자동 배치됩니다.
- `summary` 는 **마크다운이 아니라 그냥 글자**입니다. `**굵게**` 같은 표기를
  넣어도 그대로 별표가 보입니다. 강조는 상세 본문(.md)에서 하세요.

### 2단계 — 상세 본문 만들기

`src/projects/ko/my-new-project.md` (파일명 = slug):

```markdown
---
title: 새 프로젝트
projectSlug: my-new-project
description: 검색·SNS 미리보기에 쓰일 한 줄 설명.
---

여기에 마크다운으로 자유롭게 설명을 씁니다.

## 주요 기능

- 기능 1
- 기능 2

## 구조

Flutter · Riverpod · ...
```

그리고 영어판 `src/projects/en/my-new-project.md` 도 같은 방식으로.
(당장 영어를 못 쓰면 한국어 내용을 그대로 복사해두고 나중에 번역)

### 프로젝트 정보만 고치기

- 기간·상태·스택·요약 → `projects.js` 의 해당 항목
- 상세 설명 문장 → `src/projects/ko/<slug>.md` 본문
- 포트폴리오에 넣기/빼기 → `projects.js` 의 `featured: true` / `false`

### 포트폴리오 페이지의 "기술" 목록

`/portfolio` 의 기술 태그 줄은 프로젝트와 별개로,
`src/ko/portfolio/index.njk` 와 `src/en/portfolio/index.njk` 파일 위쪽의
`skills = [...]` 배열에 직접 적혀 있습니다. 거기서 추가/삭제하세요.

확인: <http://localhost:8080/work/> , `/projects/` , 개별 상세 페이지

---

## C. 글(노트) 쓰기

**폴더:** `src/notes/ko/` (영어는 `src/notes/en/`)

파일 하나가 글 하나입니다. 파일 이름이 주소가 됩니다
(`troubleshoot-klv.md` → `/notes/troubleshoot-klv/`).

````markdown
---
title: KLV 파싱하다 만난 정렬 문제
date: 2026-01-20
summary: 목록과 RSS에 나오는 한 줄 요약. (선택)
tags: [MISB, "C#"]
project: bgcs
key: klv-alignment
draft: false
---

본문을 마크다운으로 씁니다.

## 원인

...

## 해결

```csharp
// 코드 블록은 이렇게. 언어 이름을 붙이면 색칠됩니다.
var x = 1;
```
````

### 프론트매터 항목 설명

| 항목 | 필수 | 설명 |
|------|:----:|------|
| `title` | ✅ | 글 제목 |
| `date` | ✅ | 작성일 `YYYY-MM-DD`. 목록 정렬 기준(최신순) |
| `summary` | — | 목록·RSS에 보이는 한 줄. 없으면 제목만 |
| `tags` | — | `[]` 배열. 영어/기호가 섞이면 `"C#"` 처럼 따옴표로 감싸기. `/notes` 페이지에서 태그 필터로 쓰임 |
| `updated` | — | 나중에 고쳤을 때 `YYYY-MM-DD` |
| `project` | — | `projects.js` 의 `slug`. 넣으면 **그 프로젝트 상세 페이지의 "관련 글"에 자동으로 링크됨** |
| `key` | — | 한국어판과 영어판을 짝지을 때 쓰는 아무 문자열. 양쪽 파일에 같은 값을 넣음 |
| `draft` | — | `true` 면 글 목록과 RSS에서 숨김(임시 저장용). 완성되면 지우거나 `false` |

### 언어

- 한국어 글: `src/notes/ko/파일.md` → `/notes/파일/`
- 영어 글: `src/notes/en/파일.md` → `/en/notes/파일/`
- `lang`(언어)과 주소는 **폴더 위치로 자동 결정**됩니다. 프론트매터에 안 적어도 됩니다.
- 영어판이 없어도 됩니다. 그 글이 영어 목록(`/en/notes/`)에 안 나타날 뿐입니다.

확인: <http://localhost:8080/notes/>

---

## D. 소개 / Now / Uses 페이지 고치기

각각 한 파일씩, 마크다운입니다. 프론트매터는 그대로 두고 `---` 아래 본문만 고치세요.

| 페이지 | 한국어 | 영어 |
|--------|--------|------|
| 소개 | `src/ko/about.md` | `src/en/about.md` |
| Now (근황) | `src/ko/now.md` | `src/en/now.md` |
| Uses (장비/환경) | `src/ko/uses.md` | `src/en/uses.md` |

- `now.md` 는 분기마다 갱신하는 용도입니다. 맨 아래 `마지막 갱신: 2026-09` 날짜도 같이 바꾸세요.
- 다른 페이지로 링크할 땐 `/work/bgcs/` 처럼 **`/` 로 시작하는 주소**를 씁니다.
  영어 문서에서는 `/en/work/bgcs/` 처럼 `/en` 을 붙입니다.

---

## E. 이름·이메일·메뉴·공통 문구

**파일 하나:** [`src/_data/site.js`](../../src/_data/site.js)

- 이름, 이메일, GitHub 주소
- `role` / `tagline` — 브라우저 탭 제목과 홈 히어로에 쓰이는 한 줄 소개
- `nav` — 상단 메뉴 항목 (순서·이름)
- `ui` — 버튼/라벨의 공통 번역 문구

`{ ko: "...", en: "..." }` 형태는 두 언어를 다 채우세요.

---

## F. 이미지 넣기

`src/assets/images/` 에 파일을 두고, 마크다운/템플릿에서
`/assets/images/파일명.png` 로 참조합니다.

```markdown
![설명 글(대체 텍스트)](/assets/images/profile.webp)
```

- 가능하면 **WebP** 포맷으로, 너무 크지 않게(가로 1600px 이하 권장) 줄여서 넣으세요.
- 대체 텍스트(대괄호 안)는 접근성을 위해 꼭 적습니다.

### SNS 공유 미리보기 이미지 (선택)

카카오톡·트위터 등에서 링크를 붙였을 때 뜨는 썸네일입니다. 하려면:

1. `src/assets/images/og-image.png` (1200×630 권장) 파일을 둡니다.
2. `src/_includes/layouts/base.njk` 의 `twitter:description` 줄 **아래**에
   다음 두 줄을 추가합니다:

   ```nunjucks
     <meta property="og:image" content="{{ site.url }}/assets/images/og-image.png">
     <meta name="twitter:card" content="summary_large_image">
   ```

   (이러면 그 위에 있던 `twitter:card content="summary"` 줄은 지워도 됩니다.)

   이 파일이 헷갈리면 그냥 이미지만 넣어두고 "og 이미지 연결해줘" 라고 요청하세요.

---

## 커밋 메시지 참고

```
content: 책 3권 추가
content: PortSight 상세 기능 추가
feat: 새 글 - KLV 정렬 문제
fix: about 페이지 오타
```

작은 단위로 자주 커밋하고, `git push` 하면 배포됩니다.
