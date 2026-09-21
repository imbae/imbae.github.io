---
title: "Visual Studio에서 GitHub 사용하기"
date: 2019-02-12
summary: "Visual Studio 2017 과 GitHub를 연동해서 프로젝트를 생성하고 Init Commit을 하기까지의 과정을 알아본다."
tags: ["Git"]
key: tistory-57
---

Visual Studio 2017 과 GitHub를 연동해서 프로젝트를 생성하고 Init Commit을 하기까지의 과정을 알아본다.

들어가기에 앞서 당연히 GitHub 회원가입을 해야되니 아래 사이트에서 회원가입을 하자.

[https://github.com/](https://github.com/)

1. Visual Studio 설치 구성요소에 GitHub 추가하기

![](/assets/images/notes/57/1.png)

![](/assets/images/notes/57/2.png)

Visual Studio에서 상단 메뉴에 도구 -> 도구 및 기능 가져오기를 클릭하면 위와 같은 창이 나온다.

여기서 Git과 관련된 항목이 2개 있는데 모두 체크하고 설치하자.

2. 예제 프로젝트 생성

이제 프로젝트를 생성해서 GitHub가 어떻게 변경사항을 추적하고 관리하는지 맛만 보자.

![](/assets/images/notes/57/3.png)

나는 현재 C# WPF를 주로 쓰기 때문에 이걸로 프로젝트를 생성했는데, 언어는 무엇을 쓰던지 상관이 없다.

프로젝트 생성 시 우측 하단에 **'새 Git 리포지토리 만들기'**에 체크를 하고 확인을 누른다.

3. 초기 커밋

프로젝트를 생성하고 팀 탐색기(보기 - 팀탐색기)에서 GitHub에 대한 관리를 할 수 있다.

여기서 동기화 창에 들어가면 아래와 같은 화면이 나타나는데 이전에 가입한 GitHub로 로그인을 하고 Publish를 한다.

![](/assets/images/notes/57/4.png)

GitHub 로그인을 하면 아래와 같이 저장소 이름과 설정창이 뜨는데 입력하고 Publish를 누르면 초기 커밋이 완료된다.

(여기서 Private Repository를 체크하고 Publish하면 개인 저장소로 게시가 되며 Default는 공용 저장소이다. )

성공했다는 메시지가 나타나면 이제 GitHub 홈페이지로 가서 로그인하면

조금 전에 게시한 코드가 저장소에 할당되어 있는 것을 확인할 수 있을 것이다.

![](/assets/images/notes/57/5.png)

가장 기본적인 프로젝트를 생성하고 초기 커밋하는 것까지 했다.

Git에는 다양한 용어들이 있는데 (push, pull, commit, merge, branch, checkout etc.)

공부해봤자 금방 잊어버리더라...

하나씩 직접 해보면서 조금씩 알아가자...
