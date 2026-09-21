---
title: "시리얼 통신 (feat. polling based c++)"
date: 2018-08-22
summary: "시리얼 통신을 구현할 때 고려해야 할 사항으로 송신부분보다 수신쪽에 '언제 데이터를 수신할 것인가'"
tags: ["네트워크"]
key: tistory-48
---

시리얼 통신을 구현할 때 고려해야 할 사항으로 송신부분보다 수신쪽에 '언제 데이터를 수신할 것인가'

라는 시간적인 문제가 있다. 데이터가 언제 들어올지 모르기 때문인데, 데이터가 수신될 때까지

마냥 read()만 계속 호출 할 순 없고, 데이터 수신외에 이벤트 처리, 에러 유무 확인을 위해서는 또 다른

확인 루틴 if절을 추가할 수 밖에 없다는 문제가 있다.

가장 큰 문제는 read() 함수가 block 되어 버리면 루틴 자체가 block 되어버린다.

이럴 때 사용하는 것이 POLL 이라고 한다.

POLL

poll은 확인하고 싶은 여러 이벤트를 미리 설정해놓고, 그 이벤트들이 발생했는지 확인할 수 있는 방법을 제공해준다.

아래는 poll을 이용한 작업 진행과정이다.

1. 체크하고 싶은 여러 이벤트 등록

2. poll()함수를 호출

3. 이벤트가 발생하면 poll()함수 호출 후에 바로 복귀

4. 발생된 이벤트가 없으면 이벤트가 발생할 때까지 time-out 시간 만큼 대기

5. 이벤트가 발생하면 해당 이벤트의 배열 아이템의 값이 바뀌는데, 이를 확인하여 어떤 이벤트가 발생했는지 파악

아래는 poll을 이용한 시리얼 통신 예제 소스이다. (c++, linux 환경 기반)

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/poll.h>
#include <termios.h> // B115200, CS8 등 상수 정의
#include <fcntl.h> // O_RDWR , O_NOCTTY 등의 상수 정의

int main( void)
{
 int    fd;
 int    ndx;
 int    cnt;
 char   buf[1024];
 struct termios    newtio;
 struct pollfd     poll_events;      // 체크할 event 정보를 갖는 struct
 int    poll_state;

 // 시리얼 포트를 open

   fd = open("/dev/ttyUSB0", O_RDWR | O_NOCTTY );        // 디바이스를 open 한다.
 if ( 0 > fd)
   {
 printf("open error\n");
 return -1;
   }

 // 시리얼 포트 통신 환경 설정

 memset(&newtio, 0, sizeof(newtio) );
   newtio.c_cflag       = B115200 | CS8 | CLOCAL | CREAD;
   newtio.c_oflag       = 0;
   newtio.c_lflag       = 0;
   newtio.c_cc[VTIME]   = 0;
   newtio.c_cc[VMIN]    = 1;

 tcflush(fd, TCIFLUSH);
 tcsetattr(fd, TCSANOW, &newtio);
 fcntl(fd, F_SETFL, FNDELAY);

 // poll 사용을 위한 준비
   poll_events.fd        = fd;
   poll_events.events    = POLLIN | POLLERR;          // 수신된 자료가 있는지, 에러가 있는지
   poll_events.revents   = 0;

 // 자료 송수신
 while (1)
   {
      poll_state = poll(                                // poll()을 호출하여 event 발생 여부 확인
                         (struct pollfd*)&poll_events,  // event 등록 변수
 1,  // 체크할 pollfd 개수
 1000 // time out 시간
                       );

 if (poll_state > 0)                             // 발생한 event 가 있음
      {
 if ( poll_events.revents & POLLIN)            // event 가 자료 수신?
         {
            cnt = read( fd, buf, 1024);
 write( fd, buf, cnt);                       //serial write test
 printf( "data received - %d %s\n", cnt, buf);
         }
 if ( poll_events.revents & POLLERR)      // event 가 에러?
         {
 printf( "통신 라인에 에러가 발생, 프로그램 종료");
 break;
         }
      }
 else if(poll_state < 0)
      {
 printf("Critial Error!\n");
 break;
      }
 else if(poll_state == 0)
      {
 printf("wait...\n");
      }
   }

 close( fd);
 return 0;
}
```

예제에서 struct pollfd를 사용했는데, pollfd의 내용은 아래와 같다.

```
struct pollfd
{
 int fd;                 //대상 파일 디스크립터
 short events;           //발생된 이벤트
 short renvents;         //돌려받은 이벤트
}
```

1. fd는 감시 대상인 디스크립터, 핸들

2. events는 체크하고 싶은 이벤트의 모음인데, 체크 가능한 이벤트는 아래와 같다.

```
#define POLLIN 0x0001 // 읽을 데이터가 있다.#define POLLPRI 0x0002 // 긴급한 읽을 데이타가 있다.#define POLLOUT 0x0004 // 쓰기가 봉쇄(block)가 아니다.#define POLLERR 0x0008 // 에러발생#define POLLHUP 0x0010 // 연결이 끊겼음#define POLLNVAL 0x0020 // 파일지시자가 열리지 않은 것 같은, Invalid request (잘못된 요청)
```

3. revents는 이벤트 발생 여부를 bit별로 갖는 값

예제 소스 코드 분석

```
struct
pollfd
     poll_events;
// 체크할 event 정보를 갖는 struct
```

poll()을 사용하기 위한 변수 선언.

poll_events에서는 감시 대상인 디스크립터와 어떤 이벤트를 감시 할지 결졍해서 bit 값으로 지정

```
int
    poll_state;
```

poll()이 수행한 결과 값. 이 값은 반드시 체크해야 하며 아래와 같은 반환 값을 가진다.

| poll() 수행 후 반환 값 |  |
|---|---|
| 반환 값 | 설명 |
| 음수 | 반환 값이 음수라면 치명적인 에러 발생한 번 이렇게 음수로 에러가 발생하면 이후 계속 음수 값이 반환 |
| 0 | 지정한 time-out이 지나도록 발생한 이벤트가 없을 경우 |
| 양수 | 이벤트 발생 |

```
poll_events.fd        = fd;
```

감시 대상인 디스크립터 저장

```
poll_events.events    = POLLIN | POLLERR;
// 수신된 자료가 있는지, 에러가 있는지
```

체크하고 싶은 이벤트에 대해 비트값으로 설정하여 지정

```
poll_events.revents   =
0
;
```

revents를 0으로 초기화

```
poll_state = poll(                                // poll()을 호출하여 event 발생 여부 확인
                         (struct pollfd*)&poll_events,  // event 등록 변수
 1,  // 체크할 pollfd 개수
 1000 // time out 시간
                       );
```

체크할 이벤트 정보를 넘겨준다.

1은 체크할 pollfd의 개수. 예제에서는 디스크립터가 한 개이지만 프로그램에 따라서 한 번에 여러개의 디스크립터를 관리할 경우가 있는데,

관리할 디스크립터가 많을 때, poll()은 변수 하나 외에도 배열을 받을 수 있기 때문에, 한번의 호출로 모든 이벤트 발생 여부를

확인할 수 있어, 편리하다.

출처: http://forum.falinux.com/zbxe/index.php?document_srl=405838&mid=network_programming
