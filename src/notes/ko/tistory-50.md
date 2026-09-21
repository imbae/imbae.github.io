---
title: "[Raspberry Pi 3] 라즈베리파이 3 시작프로그램 등록"
date: 2018-09-10
updated: 2018-11-08
summary: "작성한 프로그램을 라즈베리파이 부팅과 함께실행 하는 방법."
tags: ["삽질", "Raspberry Pi 3"]
key: tistory-50
---

작성한 프로그램을 라즈베리파이 부팅과 함께실행 하는 방법.

ctrl + alt + t 터미널 실행

![](/assets/images/notes/50/1.png)

라즈피안 OS에 기본적으로 설치되어 있는 leafpad text editor를 이용해서 편집한다.

vim, nano 등을이용해도 무방하다.

sudo leafpad /etc/rc.local 을 열어 아래와 같이

시작프로그램으로 등록하고 싶은 파일의 경로를 아래의 위치에 입력한다.

fi

//시작프로그램 경로

exit 0

![](/assets/images/notes/50/2.jpg)

여기서 /home/pi/Projects/UVLinkManager  까지가 실행 프로그램의 경로이고

uvlinkManager 는 실행파일 이름이다.

완료했으면 저장하고 재부팅하고 해당 프로그램이 자동으로 실행되는지 확인한다.

여기서 자동 실행할 명령어 라인 뒤에 &을 붙이지 않으면 해당 명령어가 동작할 때까지 시스템 응답을 기다리므로

재수없으면 부팅이 아예 안되는 경우가 있다.

그래서 웬만하면 마지막에 &을 붙이자.   -> /home/pi/Projects/UVLinkManager &
