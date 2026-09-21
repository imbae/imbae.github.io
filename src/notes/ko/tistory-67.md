---
title: "[C#/WPF] Joystick 입력 데이터 디스플레이 [MVVM]"
date: 2019-02-28
summary: "WPF 기반에서 조이스틱 입력값을 화면에 실시간으로 디스플레이"
tags: ["C#", "WPF"]
key: tistory-67
---

WPF 기반에서 조이스틱 입력값을 화면에 실시간으로 디스플레이

1. 참조 파일 설정

- Microsoft.DirectX

- Microsoft.DirectX.DirectInput

위 2가지 dll 파일 참조가 필요하다.

참조파일 위치는 아래와 같다. (C:\\Windows\...)

![](/assets/images/notes/67/1.png)

그리고 WPF에서 DirectX.DirectInput을 사용하기 위한 패키지를 설치해준다.

SharpDX.DirectInput 패키지를 설치하면 아래 패키지 2개가 설치된다.

![](/assets/images/notes/67/2.png)

SharpDX의 샘플 코드는 아래 사이트에서 참고하면 된다.

**[SharpDX.DirectInput Sample Code](https://github.com/sharpdx/SharpDX-Samples/blob/master/Desktop/DirectInput/JoystickApp/Program.cs)**

해당 샘플 코드를 바탕으로 WPF에서 MVVM 패턴으로 소스를 짜봤다.

Joystick 입력 값을 받는 Thread를 돌리고 값의 입력이나 변화가 있을 때마다

해당 값을 업데이트해서 화면에 출력하는 식이다.

테스트에 사용한 조이스틱의 모델은 JS-2901V 로 아주 오래된 제품이다.

USB 포트에 꽂으면 PC에서 조이스틱 입력장치로 인식을 할 것이다.

그리고 아래 샘플 코드를 실행해서 확인해보면 된다.

**[WPF Joystick Input Sample Code (MVVM)](https://github.com/imbae/Joystick_Test.git)**

**실행화면**

![](/assets/images/notes/67/3.png)

![](/assets/images/notes/67/4.png)

조이스틱마다 나오는 Offset값이 다를테니 콘솔창에서 어떤 Offset이 입력되고 값의 범위를 확인한 후

윈도우 창에 해당 부분만 적용해서 수정해서 쓰면 될듯하다.
