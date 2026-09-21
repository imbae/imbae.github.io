---
title: "UDP (C++)"
date: 2018-08-20
summary: "UDP (C++)"
tags: ["네트워크"]
key: tistory-47
---

UDP

- 패킷 순서 보장 안함

- 니는 받아라 내는 보낼란다 마인드

- TCP 보다 빠름

- 보통 영상 데이터 송수신시 사용

UDP Server

```
//////////// Server.cpp /////////////
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>
using namespace std;

#define BUFSIZE 512

int main()
{
 int sock=socket(AF_INET, SOCK_DGRAM, 0);
 int retval;

 sockaddr_in serveraddr;
 bzero(&serveraddr, sizeof(serveraddr));
 serveraddr.sin_family=AF_INET;
 serveraddr.sin_port=htons(9000);
 serveraddr.sin_addr.s_addr=htonl(INADDR_ANY);
 retval=bind(sock, (sockaddr*)&serveraddr, sizeof(serveraddr));

 sockaddr_in clientaddr;
 int addrlen;
 char buf[BUFSIZE+1];

 while(1)
{

  addrlen=sizeof(clientaddr);
  retval=recvfrom(sock,buf,BUFSIZE,0,(sockaddr*)&clientaddr,
                       (socklen_t*)&addrlen);

  buf[retval]='\0';
  cout<<"[UDP/"<<inet_ntoa(clientaddr.sin_addr)<<":"
        <<ntohs(clientaddr.sin_port)<<"] "<<buf<<endl;

  retval=sendto(sock,"send to client",retval,0,(sockaddr*)&clientaddr, sizeof(clientaddr));
 }

 close(sock);
 return 0;
}
```

UDP Client

```
//////////// Client.cpp /////////////
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>
using namespace std;

#define BUFSIZE 512

int main()
{
    int sock=socket(AF_INET, SOCK_DGRAM, 0);

    sockaddr_in serveraddr;
    bzero(&serveraddr, sizeof(serveraddr));
    serveraddr.sin_family=AF_INET;
    serveraddr.sin_port=htons(9000);
    serveraddr.sin_addr.s_addr=inet_addr("127.0.0.1");

    char buf[BUFSIZE + 1] = "";
    double tempLat = 34.611021;
    double tempLon = 127.2046907;
    float tempHeading = 10;
    float tempAlt = 0;

     while(1)
     {
        cout<<endl<<"[send data] ";

        char temp[BUFSIZE + 1];

        memset(&buf, 0, sizeof(buf));

        sprintf(temp, "%lf ", tempLat);
        strcat(buf, temp);
        sprintf(temp, "%lf ", tempLon);
        strcat(buf, temp);
        sprintf(temp, "%lf ", tempHeading);
        strcat(buf, temp);
        sprintf(temp, "%lf ", tempAlt);
        strcat(buf, temp);

        int retval;
        retval=sendto(sock,buf,strlen(buf),0,(sockaddr*)&serveraddr,sizeof(serveraddr));
        cout<<"[UDP client] "<<retval<<"send byte"<<endl;

        usleep(1000000);

        tempLat = tempLat + 0.000001;
        tempLon = tempLon + 0.0000001;
        tempHeading = tempHeading + 0.5;
        tempAlt = tempAlt + 1;
     }

     close(sock);
     return 0;
}
```
