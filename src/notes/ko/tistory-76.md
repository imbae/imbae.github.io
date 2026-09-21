---
title: "[Ubuntu] .py 시작 프로그램 등록"
date: 2023-02-27
updated: 2023-03-03
summary: "이전에 RTSP Server를 파이썬으로 만드는 것을 포스팅했습니다."
tags: ["삽질", "Ubuntu"]
key: tistory-76
---

이전에 RTSP Server를 파이썬으로 만드는 것을 포스팅했습니다.

[[GStreamer] RTSP 서버 구축 (Python, Odroid)](/notes/tistory-75/)

이번에는 이어서 부팅이 되면 자등으로 RTSP Server가 실행되도록 구성해볼 예정입니다.

테스트 환경은 다음과 같습니다.

| 하드웨어 | Odroid C4 |
|---|---|
| 운영체제 | Ubuntu 20.04.5 LTS |
| 파이썬 버전 | 3 |

#### 1. service 파일 생성

- Visual Studio Code나 텍스트 에디터를 사용하여 *.service 파일을 생성해줍니다.

*.service에 입력할 내용은 아래와 같습니다.

![Screenshot at 2023-02-27 08-33-02](/assets/images/notes/76/1.png)

- Decription: 서비스 설명
- After: 수행 후 시스템 run-level 설정
- Type: 프로세스 기동 타입
- WorkingDirectory: 아래 명령어가 동작할 기본 경로
- ExecStart: 실행할 명령어 #절대 경로
- StandardOutput: 로그 저장 경로 #절대 경로
- StandardError: 에러 로그 저장 경로 #절대 경로
- WantedBy: 나중에 "systemctl enable" 명령어로 등록 시 필요한 run-level 설정

유닛 run-level의 종류는 아래를 참조하시면 됩니다.

![Screenshot at 2023-02-27 08-42-57](/assets/images/notes/76/2.png)

위 옵션들의 세부적인 사항은 구글링 or ChatGPT가 알려줄겁니다...

작성했다면 해당 서비스 파일을 아래 경로에 이동합니다.

- sudo mv rtsp.service /etc/systemd/system

(주황색은 위에서 만든 *.service의 파일 이름입니다.)

#### 2. 권한 수정 및 서비스 등록 시작

- sudo chmod 755 /etc/systemd/system/rtsp.service
- sudo systemctl daemon-reload
- sudo systemctl enable rtsp.service

#### 3. 재부팅 및 확인

- sudo systemctl status rtsp.service

![Screenshot at 2023-02-27 08-28-08](/assets/images/notes/76/3.png)

재부팅 후 정상적으로 서비스가 동작하고 있다면 위와 같은 상태로 표시됩니다.

이후로는 부팅만 해도 클라이언트 PC에서 RTSP에 연결하여 영상을 디스플레이 할 수 있습니다.

#### 4. 기타

- 서비스 중단 명령어

- sudo systemctl stop rtsp.service

참고 사이트

[https://naknaklee.github.io/etc/2020/07/19/linux-auto-start/](https://naknaklee.github.io/etc/2020/07/19/linux-auto-start/)
