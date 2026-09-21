---
title: "정적 분석 툴 [Sonar Qube] 소개 및 사용법 2"
date: 2020-06-24
updated: 2020-12-04
summary: "이전 포스트에서 Sonar Qube를 사용하기 위한 모든 준비를 마쳤다."
tags: ["정적분석"]
key: tistory-71
---

이전 포스트에서 Sonar Qube를 사용하기 위한 모든 준비를 마쳤다.

이제 정적 분석 툴을 돌려보자.

커맨드 창을 열어 정적 분석을 원하는 솔루션 폴더의 경로로 이동한다. (.sln)

![](/assets/images/notes/71/1.png)
*솔루션 경로 이동 후 Sonar Scanner 시작 명령 입력*

앞서 봤던 절차대로 하나씩 카피하면서 커맨드창에 입력 해준다.

(아래 3가지 명령어는 따로 복사해서 저장해두는 것을 추천)

SonarScanner.MSBuild.exe begin 명령어 실행 시 위와 같은 화면이 나와야 정상이다.

혹시나 에러 발생 시 구글에 해당 에러를 검색하면 원인을 알 수 있을 것이다...

![](/assets/images/notes/71/2.png)

2번째 명령어 입력...

![](/assets/images/notes/71/3.png)
*MSBuild.exe /t:Rebuild 명령 수행 시 결과 창*

마지막 명령어 입력...

![](/assets/images/notes/71/4.png)
*SonarScanner.MSBuild.exe end ... 명령어 결과*

3개 명령어 수행이 잘 끝났다면 다시 Sonar Qube 웹서버로 가보자.

프로젝트 정보가 아래와 같이 갱신되었을 것이다.

![](/assets/images/notes/71/5.png)

여기서 결과를 보고 현재 자신의 코드에서 어느 부분이 잠재적 결함이 있는지,

그런 부분들을 어떻게 수정해야 하는지도 가이드를 해준다.

그리고 어? 내가 생각한거보다 결과가 너무 안좋은데...? 라고 생각할 수 있는데,

이는 빌드 할 때 참조한 외부 라이브러리까지 모두 빌드해서 반영한 결과이기 때문이다.

순수하게 자기가 코딩한 코드만 분석을 하고 싶다면 외부 라이브러리의 경로를 예외로 처리해야 한다.

먼저 예외 처리할 폴더 경로를 확인하기 위해 Code 탭으로 들어간다.

![](/assets/images/notes/71/6.png)

기존 내 코드 외에 lib라는 라이브러리 폴더가 같이 존재할 것이다.

그럼 나는 lib 폴더 내에 3rdParty 폴더안에 있는 모든 소스는 예외로 하고 싶다! 라고 할 때

![](/assets/images/notes/71/7.png)

관리자 페이지에서 Analysis Scope 설정 창이 있다.

여기서 Source File Exclusions 항목이 있는데

lib/3rdParty/**/*

라고 입력을 하면 3rdParty 폴더 내의 하위 폴더 포함 모든 소스코드를 예외로 하겠다는 말이다.

그리고 다시 Sonar Scanner를 돌리면 해당 프로젝트는 제외하고 결과가 반영될 것이다.

저 자세한 예외 처리 방법은 아래를 참고하자.

[https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/)

[Narrowing the Focus | SonarQube Docs
If SonarQube's results aren't relevant, no one will want to use it. That's why precisely configuring what to analyze for each project is a very important step. Doing so allows you to remove noise, like the issues and duplications marked on generated code,
docs.sonarqube.org](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/)

일단 가장 기본적인 동작과 결과에 대해서만 봤는데 조금씩 세부 기능들을 파악해 가봐야겠다.
