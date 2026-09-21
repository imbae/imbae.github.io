---
title: "Git Page 처음 시작하기"
date: 2021-07-28
updated: 2021-07-29
summary: "Git Page란 Github에서 제공하는 정적 웹 호스팅 서비스로 Git 저장소의 내용을 웹페이지로 변환하여 보여준다."
tags: ["Git"]
key: tistory-72
---

## 시작하기에 앞서...

Git Page란 Github에서 제공하는 정적 웹 호스팅 서비스로 Git 저장소의 내용을 웹페이지로 변환하여 보여준다.

이 때 Jekyll을 사용하여 Markdown, Liquid, HTML&CSS를 자동으로 변환하여 웹으로 보여준다.

그럼 이제 간단한 Git Page를 만들어 보자.

(기본적인 git 사용방법/명령어들은 알고 있다는 가정하에 진행한다.)

## 1. Git Page 생성하기

먼저 Git 계정을 생성하고 Repository를 추가한다. 입력하는 Repository name이 홈페이지의 주소가 된다.

즉 Git 계정 아이디가 홈페이지의 주소가 되니 아이디 생성 시 고려하자.

만약 Git 계정 아이디가 testpage 라면 아래처럼 Repository name을 설정하면 된다.

*{Git 계정 아이디}.github.io*

그리고 Public으로 선택하고 Repository를 생성해준다.  
  
(여기서 부끄럽다고 Private로 생성하면 자기 혼자만 볼 수 있는 홈페이지가 된다.

물론 추후에 다시 Public으로 변경가능하다. )

![gitpage0](/assets/images/notes/72/1.png)

※ Repository name을 위 형식을 갖추지 않고 입력하면 아래와 같이 더러운 주소로 만들어진다.

![error](/assets/images/notes/72/2.png)
*ID.github.io 형식을 지키지 않았을 경우 생성되는 페이지 주소*

대신 Repository name에 ID.github.io 형식 대신 그냥 문자열("testpage")만 입력하면 아래와 같은 주소로 생성된다.

*https://ID.github.io/testpage/*

## 2. 샘플 템플릿 설정하기

Git Page를 만들었으니 이제 기본적인 템플릿을 적용시켜 맛을 좀 보고싶다.

여기서는 minimal-mistakes 라는 오픈 템플릿을 적용시켜본다.

업데이트도 최근까지 꾸준히 되고 있고 문서화도 잘되어 있어서 공부하기 편할 것 같다.

아래 Git 사이트에서 소스코드를 다운받아오자.

[https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)

[GitHub - mmistakes/minimal-mistakes: Jekyll theme for building a personal site, blog, project documentation, or portfolio.
:triangular_ruler: Jekyll theme for building a personal site, blog, project documentation, or portfolio. - GitHub - mmistakes/minimal-mistakes: Jekyll theme for building a personal site, blog, proj...
github.com](https://github.com/mmistakes/minimal-mistakes)

그리고 다운받은 폴더의 내용을 그대로 카피해서 내가 만든 Git Page Repository 폴더에다가 그대로 붙여넣고 푸시하자.

![gitpage4](/assets/images/notes/72/3.png)

내용물이 Git에 업데이트된 것을 확인한 후 Setting에서 Page 탭으로 들어간다.

![gitpage1](/assets/images/notes/72/4.png)

여기서 None으로 설정된 콤보박스를 열어서 minimal theme가 있는 branch로 설정하고 Save 버튼을 누른다.

그러면 아래와 같이 화면이 바뀌고 링크된 사이트로 자신의 페이지를 확인할 수 있다.

들어갔는데 404 Error가 발생한다면 조금 기다렸다가 다시 들어가보자.

![gitpage5](/assets/images/notes/72/5.png)

앞선 과정을 정상적으로 수행했다면 minimal-mistakes theme가 적용된 페이지를 확인할 수 있다.

![gitpage3](/assets/images/notes/72/6.png)
*minimal-mistakes sample theme page*

지금까지 가장 기본적인 Git Page 생성하기와 다른 템플릿 적용하기까지 해봤다.

이제 적용된 템플릿을 커스터마이징하기 위한 환경 설정과 기초적인 사항들은 다음 포스트에...
