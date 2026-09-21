---
title: "[Raspberry Pi 3] OpenVPN Client static IP 설정"
date: 2018-10-23
summary: "이전에 OpenVPN Server(Window 10) - OpenVPN Client (Raspberry Pi 3) 환경 구축을 했었다."
tags: ["삽질", "Raspberry Pi 3"]
key: tistory-55
---

이전에 OpenVPN Server(Window 10) - OpenVPN Client (Raspberry Pi 3) 환경 구축을 했었다.

이제 클라이언트 접속 시 고정 아이피를 할당하는 방법을 알아본다.

기본 설정으로는 유동 아이피가 할당되어 특정한 아이피가 고정되어 있어야 하는 상황이 필요하기 때문이다.

(예: 서버에서 특정 장비(클라이언트)에 접속해서 어떤 일을 처리할 때? 아이피가 유동적으로 계속 바뀌면 접속이 어렵겠지?)

**클라이언트에서 설정할 내용은 없다.**

먼저 서버 설정 파일을 열어서 아래와 같은 구문을 수정한다.

해당 구문은 원래 ;로 주석처리되어 있을텐데 주석을 풀고

route IP 주소 를 입력한다. 여기서 IP주소는 마음대로 설정해도 되는 것 같다.

![](/assets/images/notes/55/1.png)

그리고 아래 폴더에 ccd라는 이름의 새폴더를 만들고

ccd 폴더안에 client 이름의 파일을 하나 생성한다.

(client의 이름을 다른걸로 했다면 그 이름으로 파일을 생성해야 한다. 난 이전에 client이름을 걍 client로 했었다.)

![](/assets/images/notes/55/2.png)

![](/assets/images/notes/55/3.png)

이제 client의 파일을 열고 아래 내용을 추가한다.

- ifconfig-push 10.18.0.1 10.18.0.2

이제 모든 설정이 완료되었다.

다시 서버를 오픈하고 클라이언트를 접속해보면 아래와 같은 결과를 확인할 수 있다.

![](/assets/images/notes/55/4.png)
