---
title: "Git Page 처음 만져보기 (feat. Jekyll)"
date: 2021-07-28
updated: 2021-07-29
summary: "이전 포스트에서는 Git Page를 생성해보고 샘플 템플릿을 적용시켜보았다."
tags: ["Git"]
key: tistory-73
---

이전 포스트에서는 Git Page를 생성해보고 샘플 템플릿을 적용시켜보았다.

이제는 이 놈들을 잘 어루만져주어야 나만의 페이지를 작성할 수가 있는데 환경 설정부터 하나씩 알아보자.

## 1. Ruby 설치하기

Jekyll은 Ruby언어로 작성되었기 때문에 Ruby를 먼저 설치해야 한다.

[https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/)

[Downloads
Which version to download? If you don’t know what version to install and you’re getting started with Ruby, we recommend that you use the Ruby+Devkit 2.7.X (x64) installer. It provides the biggest number of compatible gems and installs the MSYS2 Devkit
rubyinstaller.org](https://rubyinstaller.org/downloads/)

포스트 기준 최신 버전(Ruby+Devkit 3.0.2-1)을 다운받아서 설치해준다.

![ruby0](/assets/images/notes/73/1.png)

설치가 완료되면 Ruby Installer2라는 화려한 커맨드창이 뜬다.

(만약 자동으로 실행이 안되었으면 cmd창에서 'ridk install' 명령어를 입력하면 된다.)

![ruby1](/assets/images/notes/73/2.png)
*ridk install*

무슨 차이가 있는 건지 모르겠으니 기본 설치로 한다. 1번 선택.

MSYS2까지 설치가 완료되었다면 Ruby 설치는 끝났다.

이제 라이브러리인 Jekyll 과 Bundler를 설치해야 한다.

커맨드창에서 gem 명령어로 설치해준다.

*gem install jekyll*

*gem install bundler*

이제 적용한 샘플 템플릿을 가지고 놀기 위한 기본 환경 설정이 끝났다.

## 2. Git Page 로컬에서 실행하기

다음은 페이지 변경사항이 있을 때마다 Git에 푸시해서 확인하긴 번거로우니

설치된 Jekyll을 활용하여 Git Page를 로컬에서 실행하여 확인하는 방법을 알아보자.

커맨드 창에서 나의 Git Page Repo 폴더로 이동해서 기본 패키지 설치 명령어를 입력한다.

*bundle install*

![ruby2](/assets/images/notes/73/3.png)

그러면 종속 라이브러리들이 주루룩 설치된다.

이제 Jekyll 로컬 서버를 실행해보면

*jekyll serve --trace*

Load Error가 발생한다... 이게 Ruby 3.0 버전이상부터 webric이라는 라이브러리가

기본 구성이 안되어 있어서 그렇다는데, 수동으로 포함시켜줘야 한다.

![webrick](/assets/images/notes/73/4.png)

*bundle add webrick*

이제 다시 Jekyll Server를 돌려보자.

*jekyll serve --trace*

![ruby3](/assets/images/notes/73/5.png)

이제 정상적으로 돌아가는 메시지가 뜬다.

이제 **localhost:4000**을 주소에 입력하면 나의 페이지를 확인할 수 있다.

## 다음은 페이지 커스터 마이징해보기...

인데 이 부분은 공부를 좀 하고 실습해보면서 정리를 좀 해야할 듯 싶다.

가장 기본적으로는 템플릿 폴더 안에 있는 **_config.yml** 파일을 만져보는 것이다.

페이지의 환경설정 정보를 보관하는 파일로 페이지의 기본적인 구성을 담당하는 것 같다.

다음은 여러가지 샘플 템플릿을 적용시켜보며 안에 소스코드를 보면서 공부하는 것이다.

[https://jekyll-themes.com/](https://jekyll-themes.com/)

[Featured Themes | Jekyll Themes
Check out the latest Jekyll Themes and templates. The best and the beautiful jekyll themes are available for free to download. Get the right template for your blog, documentation, portfolio or company site. Read articles on how to customize a jekyll theme
jekyll-themes.com](https://jekyll-themes.com/)

여기에 무료/유료 템플릿들이 많이 있으니 참고하면 좋을듯 싶다.

확실히 프리미엄 템플릿들이 이쁘다.

여기서 구입하는 테마들은 라이센스가 있는데, 아래 사이트에서 해당 라이선스를 잘 설명해놓았으니

참고하면 도움이 될 것 같다.

요약하자면 프리미엄 테마를 구입해서 무료로 배포하려고 한다면 Regula 라이센스로 구매하면 되고,

상업 목적으로 판매하기 원한다면 Extended 라이센스를 구입해야 한다.

[https://www.thewordcracker.com/basic/standard-licenses-of-envato-market/](https://www.thewordcracker.com/basic/standard-licenses-of-envato-market/)

[Envato Market의 Standard 라이센스(Regular 라이선스 vs. Extended 라이선스) - 워드프레스 라이센스 이해 -
엔바토 마켓 (Envato Market)에서 판매하는 워드프레스 테마 또는 플러그인에 적용되는 라이선스에는 레귤러 라이선스와 익스텐디드 라이선스가 있습니다. 엔바토 마켓 라이선스에 대해 자세히 살
www.thewordcracker.com](https://www.thewordcracker.com/basic/standard-licenses-of-envato-market/)

마지막으로 Jeykyll 자체에 대한 공부인데

[https://jekyllrb-ko.github.io/docs/](https://jekyllrb-ko.github.io/docs/)

[Quickstart
Jekyll is a static site generator. It takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site’s look and feel, URLs, the data displayed on the page, and more.
jekyllrb.com](https://jekyllrb-ko.github.io/docs/)

Jeykyll 공식 홈피 문서로 공부를 좀 해봐야겠다.

물론 이밖에도 HTML/CSS 등 여러가지를 공부해야 겠지만 일단 하나씩.. 하나씩...
