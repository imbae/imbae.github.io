---
title: "[Raspberry Pi 3] OpenVPN Client 구축"
date: 2018-10-18
updated: 2018-10-22
summary: "부득이하게 라즈베리파에서 openVPN을 클리이언트로 돌려야할 상황이다."
tags: ["삽질", "Raspberry Pi 3"]
key: tistory-54
---

부득이하게 라즈베리파에서 openVPN을 클리이언트로 돌려야할 상황이다.

openVPN 서버는 윈도우환경이다.

- sudo apt update
- sudo apt install openvpn

기본적인 openVPN 설치는 끝났고 인증서 생성을 해야한다.

아래 사이트에서 인증서 생성할 EasyRSA를 다운받고 압축을 해제한다. (사용 버전 3.0.5)

[https://github.com/OpenVPN/easy-rsa/releases](https://github.com/OpenVPN/easy-rsa/releases)

![](/assets/images/notes/54/1.png)

- cd EasyRSA-3.0.5
- cp vars.example vars
- sudo leafpad vars

EasyRSA 폴더를 보면 vars.example이라는 파일이 있는데 이는 기본적인 설정 정보인데 default로 사용해도 무방하다.

굳이 바꾸고 싶으면

#set_var EASYRSA_REQ_COUNTRY    "US"

#set_var EASYRSA_REQ_PROVINCE   "California"

#set_var EASYRSA_REQ_CITY       "San Francisco"

#set_var EASYRSA_REQ_ORG        "Copyleft Certificate Co"

#set_var EASYRSA_REQ_EMAIL      "me@example.net"

#set_var EASYRSA_REQ_OU         "My Organizational Unit"

이 부분을 찾아서 ""안에 있는 내용을 입맛에 맞게 수정하면 된다.

easyRAS 초기화 옵션

- ./easyrsa init-pki

인증서와 키 파일 생성

인증할 때마다 비번 넣기 귀찮으면 nopass 옵션 줘서 키 생성

- ./easyrsa build-ca nopass

명령을 실행하면 아래와 같이 Common Name을 묻는데 걍 엔터.

![](/assets/images/notes/54/2.png)

이번에는 openVPN에서 사용할 서버의 인증서와 key파일을 생성한다.

- ./easyrsa gen-req server nopass

![](/assets/images/notes/54/3.png)

- ./easyrsa sign-req server server

![](/assets/images/notes/54/4.png)

Diffie-Hellman key 라는걸 생성해주는데 실행하면 작업이 상당히 오래 걸린다.

라즈베리 파이에서 약 30분 정도... 참고 기다리자.

- ./easyrsa gen-dh

![](/assets/images/notes/54/5.png)

마지막으로 ta.key 파일을 생성

- openvpn --genkey --sercret ta.key

여기까지가 서버에 대한 인증서와 키파일 생성이다.

다음으로 클라리언트에 대한 인증서와 키파일을 생성한다.

클라이언트 인증서는 VPN 유저 1명당 하나씩 발급해야 한다. 따라서 VPN 계정을 여러개 사용하고 싶을 경우

아래 명령을 반복해야 한다.

- ./easyrsa gen-req client nopass

![](/assets/images/notes/54/6.png)

- ./easyrsa sign-req client client

![](/assets/images/notes/54/7.png)

마지막으로 생성된 키, 인증서 파일들을 특정 위치에 옮겨줘야한다.

VPN Server를 위해 필요한 파일 목록과 생성된 경로는 아래와 같다.

1. ca.crt ~/EasyRSA-3.0.5/pki
2. ca.key ~/EasyRSA-3.0.5/pki/private
3. server.crt ~/EasyRSA-3.0.5/pki/issued
4. server.key ~/EasyRSA-3.0.5/pki/private
5. dh.pem ~/EasyRSA-3.0.5/pki

- sudo cp /EasyRSA-3.0.5/pki/ca.crt /media/pi/usb
- sudo cp /EasyRSA-3.0.5/pki/private/ca.key /media/pi/usb
- sudo cp /EasyRSA-3.0.5/pki/issued/server.crt /media/pi/usb
- sudo cp /EasyRSA-3.0.5/pki/private/server.key /media/pi/usb
- sudo cp /EasyRSA-3.0.5/pki/dh.pem /media/pi/usb

서버 관련 인증 파일들은 서버 PC로 옮겨야 하니까 일단 USB에 저장하자.

(혹시나 위 파일 이동 명령어 중 저 usb를 명령어에 그대로 적으면 안된다.

USB를 라즈베리파이에 연결했을 때 /media/pi 폴더에

특정한 이름을 가진 경로가 뜬다. 그 이름를 입력해준다.)

VPN Client를 위해 필요한 파일 목록과 생성된 경로는 아래와 같다.

1. ca.crt ~/EasyRSA-3.0.5/pki
2. ca.key ~/EasyRSA-3.0.5/pki/private
3. client.crt ~/EasyRSA-3.0.5/pki/issued
4. client.key ~/EasyRSA-3.0.5/pki/private
5. ta.key (option) ~/EasyRSA-3.0.5

클라이언트 관련 인증 파일들은 /etc/openvpn/ 폴더에 모두 잡아 넣는다.

- sudo cp /EasyRSA-3.0.5/pki/ca.crt /etc/openvpn
- sudo cp /EasyRSA-3.0.5/pki/private/ca.key /etc/openvpn
- sudo cp /EasyRSA-3.0.5/pki/issued/client.crt /etc/openvpn
- sudo cp /EasyRSA-3.0.5/pki/private/client.key /etc/openvpn
- sudo cp /EasyRSA-3.0.5/ta.key /etc/openvpn

![](/assets/images/notes/54/8.png)

![](/assets/images/notes/54/9.png)

![](/assets/images/notes/54/10.png)

![](/assets/images/notes/54/11.png)

관련된 파일을 모두 옮겼으면 클라이언트에 대한 설정을 해주자.

클라이언트 관련 설정 파일은

/usr/share/doc/openvpn/examples/sample-config-files

에 client.conf 라는 파일이 있다.

해당 파일을 /etc/openvpn 폴더에 복사한다.

- cd /usr/share/doc/openvpn/examples/sample-config-files
- sudo cp client.conf /etc/openvpn

![](/assets/images/notes/54/12.png)

복사한 클라이언트 설정 파일 내용을 수정해야 한다.

아래 명령어를 통해 파일을 열어서 수정한다.

- sudo leafpad /etc/openvpn/client.conf

remote my-server-1 1194 가 있는 라인에서

아래와 같이 수정해준다.

remote test.iptime.org 1194

또는

remote 192.168.0.2 1194

서버의 IP를 적거나 DDNS 이름을 적어도 무방하다.

여기서 ; 세미콜론은 주석의 의미이다. (비활성화)

![](/assets/images/notes/54/13.png)  
다음은 인증서 경로 설정이다.특정 위치에 인증서를 놓고 관리하려면 해당 경로로 변경해주고 아니면 디폴트로 쓰면 된다.  
![](/assets/images/notes/54/14.png)  
정확히 뭔지 잘 모르겠는데 지금은 보안에 별 신경안쓰니까 비활성화 한다.![](/assets/images/notes/54/15.png)

이정도 수정하고 저장한다.

클라이언트의 설정과 실행은 모두 끝났다.

이제 openVPN 서버 환경을 구축한다.

여기서 사용하는 openVPN 서버는 윈도우 환경이다.

아래 사이트에서 설치 파일을 다운받아 openVPN을 기본 설정으로 설치해준다.

https://openvpn.net/community-downloads/

![](/assets/images/notes/54/16.png)

설치 완료 후 아래 경로로 가면 server.ovpn 이라는 샘플 파일이 있다.

C:\Program Files\OpenVPN\sample-config

이 파일을 notepad로 열어서 클라이언트와 마찬가지로 서버 설정을 해준다.

![](/assets/images/notes/54/17.png)

포트는 default로 설정된 1194로 설정 (클라이언트 설정과 동일)

인증서 위치도 기본 설정으로 놔둔다.

diffle hellman parameter 설정에서 이전에 생성한 dh.pem 파일 이름으로 변경해준다.

이제 모든 설정이 끝났다.

바탕화면에 생성된 OpenVPN 바로가기 아이콘을 관리자 권한으로 실행하면 트레이 아이콘에 OpenVPN이 떠 있을거다.

우클릭해서 파일 불러오기 -> server.ovpn을 읽자.

그러면 C:\사용자\계정\OpenVPN\config\ 경로에 server.ovpn 파일이 복사된다.

이 폴더에 이전에 생성했던 서버 관련 인증키 파일들을 모두 이동한다.

![](/assets/images/notes/54/18.png)

이후 OpenVPN 트레이 아이콘에서 연결을 누르면 서버가 오픈된다.

서버 오픈 후 IP주소를 확인해보면 아래 그림과 같이 새로운 이더넷 어댑터와 함께 10.8.0.1 이라는 아이피가 할당되어 있다. (ipconfig)

![](/assets/images/notes/54/19.png)

마지막으로 라즈베리 파이에서

VPN Client를 실행하면 아래와 같이 연결이 수립된다.

클라이언트의 실행은 아래의 명령어를 입력하면 된다.

- cd /etc/openvpn
- sudo openvpn client.conf

![](/assets/images/notes/54/20.png)  
  
라즈베리 파이에서도 VPN Client 실행 후 아이피 주소가 새로 할당된 것을 확인할 수 있다. (ifconfig)

![](/assets/images/notes/54/21.png)  
  
서버에서도 클라이언트와의 연결이 정상적으로 수립되었다는 걸 확인 할 수 있다.

![](/assets/images/notes/54/22.png)
