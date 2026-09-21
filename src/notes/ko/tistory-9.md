---
title: "[Mavlink] Custom Mavlink message 생성 (c#)"
date: 2017-12-11
updated: 2018-11-08
summary: "위에 output 옵션 뒤 경로는 GeneratedMessages.cs 파일이 있는 경로로 설정"
tags: ["PX4", "Pixhawk", "Mavlink"]
key: tistory-9
---

1. C# 전용 Mavlink generator 다운

[https://github.com/dsuarezv/mavlink.net](https://github.com/dsuarezv/mavlink.net)

[![](/assets/images/notes/9/1.jpg)](https://github.com/dsuarezv/mavlink.net)

[dsuarezv/mavlink.netmavlink.net - A better MavLink object generation for C#. Richer message classes are generated from the object definitions.github.com](https://github.com/dsuarezv/mavlink.net)

![](/assets/images/notes/9/2.gif)

2. 압축 풀고 Visual Studio 확장자가 실행. (mavlinkobjectgenerator.sln) - Visual Studio 2015 동작 확인

3. 빌드

4. mavlink.net-master\mavlink.net-master\mavlinkgen\bin\Debug 폴더에 mavlinkgen.exe 실행 파일 생성 확인

5. 커맨더 창에서 다음 명령어 실행

```
mavlinkgen --output="mavlink.net\GeneratedMessages.cs" "c:\path to the mavlink repo\message_definitions\v1.0\ardupilotmega.xml"
```

위에 output 옵션 뒤 경로는 GeneratedMessages.cs 파일이 있는 경로로 설정

뒤에는 수정한 Mavlink Message file 경로 설정

6. 다시 mavlinkobjectgenerator.sln 실행 후 빌드

7. mavlink.net-master\mavlink.net-master\mavlink.net\bin\Debug 폴더에 mavlink.dll 과 mavlink.pdb 파일이 생성

8. 요 두개를 가져다 쓰면 됨. - 참조 추가
