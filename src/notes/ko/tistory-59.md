---
title: "Git 저장소 - 세 가지 상태 (using Visual Studio)"
date: 2019-02-12
summary: "이전에 포스팅했던 Git 저장소의 세 가지 상태에 대해"
tags: ["Git"]
key: tistory-59
---

이전에 포스팅했던 Git 저장소의 세 가지 상태에 대해

Visual Studio를 사용해서 직접 눈으로 확인해보자.

이전 포스팅: [/notes/tistory-57/?category=802036](/notes/tistory-57/?category=802036)

먼저 이전 포스팅에서 만든 Git에 publish한 프로젝트를 열어보면

파일의 좌측에 자물쇠 모양의 아이콘이 생긴걸 확인할 수 있다.

![](/assets/images/notes/59/1.png)

해당 파일들은 모두 Git Directory에 저장이 되었음을 나타낸다.

여기서 소스파일 하나를 추가해보자.

![](/assets/images/notes/59/2.png)

그러면 위 그림과 같이 Git test 프로젝트 파일은 체크 표시로 바뀌고

Class.cs파일의 좌측에는 +표시가 나타난다.

느낌이 온다. 체크표시는 파일의 변경을 나타내고 +는 새로운 파일의 추가를 나타내는구나!

이제 팀 탐색기에서 변경내용으로 들어가보자.

![](/assets/images/notes/59/3.png)

파일이 추가되고 프로젝트 정보가 변경되었으니 변경 내용항목에 2개가 나타난다.

현재 상태가 바로 **modified** 상태이다.

여기서 Class.cs 파일을 우클릭 후 스테이징을 시켜보자.

![](/assets/images/notes/59/4.png)

![](/assets/images/notes/59/5.png)

Class.cs 파일이 staging된 변경 내용으로 추가되었다.

현재 Class.cs 파일의 상태를 곧 commit 할거라고 표시한 **Staged** 상태라고 한다.

(staging하지 않고 바로 commit을 할 수도 있다. 그러면 자동으로 모든 파일을 staging하고 바로 commit을 수행한다.)

![](/assets/images/notes/59/6.png)

두 파일을 모두 stating 하고 commit을 해보자.

여기서 commit message는 사용자가 명확히 알아볼 수 있도록 입력하는게 좋다.

commit message만 보고도 어떤 기능이 추가되었고 어디가 수정되었는가 파악이 되면 좋겠지.

그러면 아래 그림과 같이 커밋 xxxx를 로컬에서 만들었습니다. 라는 메시지와 함께 commit이 완료된다.

솔루션 탐색기로 돌아가보면 체크표시와 + 표시가 모두 다시 자물쇠 표시로 변경되었음을 확인할 수 있다.

현재 상태를 **committed** 상태라고 한다.

![](/assets/images/notes/59/7.png)

![](/assets/images/notes/59/8.png)

committed 상태는 위 메시지와 같이 로컬에서 만든 것이기 때문에 GitHub에는 아직 동기화가 안되어 있다.

팀 탐색기의 동기화 탭으로 들어가서 나가는 커밋 항목에서 **푸시**를 한다.

![](/assets/images/notes/59/9.png)

그리고 자신의 GitHub 계정으로 들어가서 repository를 확인해보면 아래와 같이 변경이 되어 있을 것이다.

![](/assets/images/notes/59/10.png)

방금 push한 class.cs 파일과 Git test 프로젝트 파일의 내용이 변경되어 업데이트 된 것을 학인할 수 있다.
