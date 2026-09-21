---
title: "[Mavlink] Mavlink Generator 환경 설정"
date: 2017-12-11
updated: 2018-11-08
summary: "Mavlink Generator 환경 설정"
tags: ["PX4", "Pixhawk", "Mavlink"]
key: tistory-11
---

1. Mavlink Generator 다운로드

git clone [https://github.com/mavlink/mavlink](https://github.com/mavlink/mavlink)

[mavlink/mavlinkmavlink - MAVLink micro air vehicle marshalling / communication librarygithub.com](https://github.com/mavlink/mavlink)

![](/assets/images/notes/11/1.gif)

2. 서브 모듈 다운로드

cd mavlink

git submodule update --init --recursive

sudo apt-get install python-pip

sudo pip install future

./mavgenerate.py
