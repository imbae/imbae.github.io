# imbae.github.io

임배현(Baehyeon Lim)의 개인 홈페이지. [Eleventy](https://www.11ty.dev/) 정적 빌드,
한국어(`/`) · 영어(`/en/`) 병행, GitHub Pages 자동 배포.

## 개발

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # → _site/
```

## 처음이라면

웹 개발이 처음이면 [`docs/guides/`](./docs/guides/) 를 순서대로 읽으세요
(환경 구축 → 사이트 구조 → 콘텐츠 수정, 용어부터 풀어서 설명).

## 구조 · 콘텐츠 수정

전체 구조와 "어디를 고치면 되는지"는 [`CLAUDE.md`](./CLAUDE.md) 참고. 요약:

| 수정 대상 | 파일 |
|-----------|------|
| 프로필 · 연락처 · 내비게이션 | `src/_data/site.js` |
| 프로젝트 | `src/_data/projects.js` |
| 독서 기록 | `src/_data/books.js` |
| 글 | `src/notes/ko/*.md`, `src/notes/en/*.md` |
| about / now / uses | `src/ko/*.md`, `src/en/*.md` |

## 배포

`main` 에 push 하면 `.github/workflows/deploy.yml` 이 빌드 후 GitHub Pages 에 배포한다.
저장소 Settings → Pages → Source 를 **GitHub Actions** 로 설정해 두어야 한다.

## 라이선스

코드는 자유롭게 참고하되, 콘텐츠(글·이미지)와 개인 정보는 제외.
