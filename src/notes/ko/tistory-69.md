---
title: "코드 분석 플러그인 [Sonar Lint] 소개 및 사용법"
date: 2020-06-24
updated: 2021-05-10
summary: "무작정 코딩을 하다가 아, 내가 정말 잘 하고 있는가 의심이 들때가 있다. 항상."
tags: ["정적분석"]
key: tistory-69
---

무작정 코딩을 하다가 아, 내가 정말 잘 하고 있는가 의심이 들때가 있다. 항상.

혼자서 개발을 하다보니 코드리뷰를 하기엔 여의치 않은 상황이고

기능상 문제도 없고, 나름의 코딩 규칙을 만들어 코딩을 하고 있지만 검증되지 않은 것이기에 항상 불안하다.

그래서 예전에 수행했던 정적분석 툴이 떠올라서 C# 지원가능한 정적 분석 툴이 뭐가 있는지 찾아보기 시작했다.

이전엔 정보진흥원에서 제공하는 툴로 분석 의뢰를 맡기고 결과 리포트를 받았는데,

매번 그렇게 의뢰를 맡기고 하기엔 귀찮지 않은가..ㅎㅎ

찾으니까 바로 코드소나가 나온다. 음... 예전에 C++로 만든 프로젝트도 코드소나를 사용했던 것 같은데..

오, **Sonar Qube**와 **Sonar Lint** 라는게 있다.

먼저 Sonar Lint를 찾아보니 VS Nuget에 배포되어 있어 바로 설치해봤다.

C#뿐만 아니라 다양한 언어를 지원하고, 이건 단순히 코딩 규칙 위반한 소스에 대해서만 경고를 띄워주는 것 같다.

![소나린트 패키지](/assets/images/notes/69/1.png)

Nuget 솔루션 찾아보기에서 sonarlint를 치면 위 그림과 같이 C#용 패키지가 나온다.

사용법은 간단하다.

패키지 설치하고 빌드하면 된다.

![소나린트 오류](/assets/images/notes/69/2.png)

그러면 위와 같이 코드에 잠재적인 버그와 품질 이슈를 찾아준다.

Sonar Lint 홈페이지: [https://www.sonarlint.org/](https://www.sonarlint.org/)

(국내 디스트리뷰터: [https://www.curvc.com/curvc/product/sonarsource/sonarlint](https://www.curvc.com/curvc/product/sonarsource/sonarlint))

Sonar Lint 규칙 정리: [https://rules.sonarsource.com/](https://rules.sonarsource.com/)

무료이고 오픈소스이고 괜찮은 것 같다.

다만 빌드할 때 시간이 좀 많이 걸린다는 단점이...

위에서 살펴봤듯 Sonar Lint는 빌드를 하면 즉각적인 피드백이 가능하다는 장점이 있다.

다음은 조금 더 강력한 Sonar Qube를 소개하고자 한다.
