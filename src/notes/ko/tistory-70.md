---
title: "정적 분석 툴 [Sonar Qube] 소개 및 사용법 1"
date: 2020-06-24
updated: 2020-12-04
summary: "이번에는 Sonar Lint보다 더 강력한 정적 분석 툴인 Sonarqube에 대해 알아보려 한다."
tags: ["정적분석"]
key: tistory-70
---

이번에는 Sonar Lint보다 더 강력한 정적 분석 툴인 Sonarqube에 대해 알아보려 한다.

이 놈도 무료이긴한데, VS 처럼 Community(무료), Developer, Enterprise 등의 유료버전이 있다.

다행히도 무료버전에서도 기본적인 언어 15개를 지원한다. (C++, C#, Java, JS, Phython 등)

다운로드 사이트: [https://www.sonarqube.org/downloads/](https://www.sonarqube.org/downloads/)

[Download | SonarQube
Download SonarQube 7.9.x LTS
www.sonarqube.org](https://www.sonarqube.org/downloads/)

무료 버전인 커뮤니티버전을 다운받는다.

다운받으면 압축파일이 하나 생기는데 압축을 풀고 자신의 최애 경로로 이동시켜준다.

\sonarqube-8.3.1.34397\bin\windows-x86-64 경로 안에

![path](/assets/images/notes/70/1.png)

위와 같은 내용물들이 있을텐데, **StartSonar.bat**를 실행 시켜주면 소나 로컬 서버가 동작된다.

**- 실행 전 사전 준비 사항: Java JDK 11 버전 이상 설치 및 환경변수 설정**

실행 하면 쏼라쏼라 하면서 SonarQube is up 이란 메시지가 뜨고 서버에 접속할 수 있게 된다.

![](/assets/images/notes/70/2.png)

Sonar Qube 접속 주소: **http://localhost:9000**

기본 아이디 / 암호: **admin / admin**

![](/assets/images/notes/70/3.png)
*Sonar Qube 접속 화면*

서버 오픈까지는 했고 이제 내가 개발중인 프로젝트를 등록하고 연동하는 일만 남았다.

Projects 패널에서 저기 화면 중앙에 누가봐도 눌러보라고 만들어 놓은

'Create new projet' 버튼을 눌러 project key, display name을 입력하고 프로젝트를 생성한다.

![](/assets/images/notes/70/4.png)
*토큰 생성*

토큰을 생성하라고 하는데 이는 나중에 코드 스캔할때 꼭 필요하니까

![](/assets/images/notes/70/5.png)

생성 된 토큰을 꼭 복사해서 저장해놓자.

이후에 확인하고 싶어도 못한다. (user account에서 토큰을 지우고 재생성 해야한다.)

토큰 저장 후 Continue 버튼을 누르면 아래 화면이 나온다.

원하는 언어를 선택하고 아래 절차대로 수행하면 되는데, 여기서는 C#에 대해서만 설명한다.

![](/assets/images/notes/70/6.png)

MSBuild 용 Scanner를 다운받으란다. Download 링크에서 받아도 되지만 아래 링크에서 받는게 최신버전이다.

.NET Framework4.6+ 버전을 다운받는다.

Sonar Scanner: [https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/)

[SonarScanner for MSBuild | SonarQube Docs
Since version 4.7.0 of the Scanner, you can invoke it using arguments with both dash (-) or forward-slash (/) separators. Example : SonarScanner.MSBuild.exe begin /k:"project-key" or SonarScanner.MSBuild.exe begin -k:"project-key" will work.
docs.sonarqube.org](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/)

SonarQube와 마찬가지로 압축 파일인데 압축 풀고 자신의 최애 폴더로 이동시켜준다.

(왠만하면 Sonar Qube랑 같은 경로면 좋을 것 같다.)

이녀석도 Java JDK와 마찬가지로 환경변수 설정을 해줘야 한다.

시스템 Path 변수 편집에서 SonarScanner.MSBuild.exe 실행 파일이 있는 경로를 넣어준다.

그리고 MSBuild도 환경 변수에 추가해줘야 하는데

MSBuild.exe 파일이 있는 곳을 찾아 마찬가지로 시스템 Path 변수에 추가해준다.

VS2019 기준 경로: C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin

![](/assets/images/notes/70/7.png)

마지막으로 Sonar Scanner 폴더에 SonarQube.Analysis.xml 파일이 있다.

파일을 열어 아래와 같이 수정한다.

![](/assets/images/notes/70/8.png)
*SonarQube.Analysis.xml*

sonar.login 속성에 있는 값은 토큰 값으로 이전에 복사해놨던걸 그대로 붙여넣어준다.

이제 Sonar Qube에 접속하고 빌드할 수 있는 모든 준비가 끝났다.

남은건 실전이다.
