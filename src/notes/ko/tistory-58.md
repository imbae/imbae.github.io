---
title: "Git 저장소 - 세 가지 상태"
date: 2019-02-12
updated: 2019-02-14
summary: "이번에는 Git을 사용할 때 가장 중요한 부분을 짚고 넘어가려한다."
tags: ["Git"]
key: tistory-58
---

이번에는 Git을 사용할 때 가장 중요한 부분을 짚고 넘어가려한다.

먼저 Git의 데이터는 파일 시스템의 크기가 아주 작은 Snapshot이라 할 수 있다.

Git은 프로젝트의 상태를 저장할 때마다 파일이 존재하는 그 순간을 중요시 여기며,

파일 변경내용이 없으면 성능을 위해 파일을 다시 저장하지 않고

단지 이전 상태의 파일에 대한 링크만 저장한다.

Git은 파일을 Committed, Modified, Staged 이렇게 3가지 상태로 관리한다.

**- Committed: 데이터가 로컬 데이터베이스에 안전하게 저장됐다는 것**

**- Modified: 수정한 소스 파일이 아직 로컬 데이터베이스에 commit되지 않은 것**

**- Staged: 현재 수정한 소스 파일을 곧 커밋할 거라고 표시한 상태**

이 세가지 상태는 Git 프로젝트의 세 가지 단계와 연결되어 있다.

- **Git Directory**

- **Working Directory**

- **Stating Area**

이렇게 세 가지 단계가 있다.

![](/assets/images/notes/58/1.png)

**Git Directory는** Git이 프로젝트의 메타데이터와 객체 데이터베이스를 저장하는 곳을 말한다. **(Git의 핵심)**

다른 컴퓨터에 있는 저장소를 Clone할 때 만들어지고,

이전 포스팅에서처럼 프로젝트를 생성할 때 함께 만들 수도 있다.

**Working Directory**는 프로젝트의 특정 버전을 Checkout한 것이다.

다시 말해 Git Directory에 있는 압축된 데이터베이스에서 특정 버전의 파일을 가져와서 Working Directory를 만든다.

(Checkout은 예를 들어 지난주 화요일에 회사에서 작업한 프로젝트 파일을

집에서 수정하기 위해 USB를 통해 내가 작업하는 특정 폴더에 저장하는 명령어라고 할 수 있다.

USB = Git Directory, 내가 작업하는 폴더 = Working Directory)

**Staging Area**는 Git Directory에 있으며 곧 commit할 파일에 대한 정보를 저장한다.

Git으로 하는 일은 기본적으로 아래와 같다.

1. Working Directory에서 파일을 수정한다.

2. Staging Area에 파일을 Stage해서 commit할 snapshot을 만든다.

3. Staging Area에 있는 파일을 commit해서 Git Directory에 영구적인 snapshot으로 저장한다.

Git의 세 가지 상태를 정리하면

Git Directory에 있는 파일들은 committed 상태이다.

파일을 수정하고 Staging Area에 추가했다면 Staged이다.

그리고 Checkout하고 나서 파일을 수정했지만 아직 Stage하지 않았으면 Modified이다.
