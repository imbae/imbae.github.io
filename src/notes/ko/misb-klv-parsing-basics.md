---
title: MISB ST0601 KLV 파싱 처음 잡을 때 헷갈렸던 것
date: 2024-11-12
summary: 드론 영상 스트림에서 KLV 메타데이터를 뽑을 때 마주친 BER 길이 인코딩과 로컬 세트 구조 정리.
tags: [MISB, KLV, "C#"]
project: klv-parser
key: misb-klv-basics
---

드론 영상의 KLV 메타데이터를 처음 파싱할 때, 스펙 문서만 봐서는 감이 안 왔던
부분을 정리해 둔다.

## Universal Key 와 Local Set

ST0601 는 16바이트 Universal Key 로 시작하는 **로컬 세트(Local Set)**다.
키 다음에 전체 길이가 오고, 그 뒤로 `(tag, length, value)` 삼중항이 반복된다.
tag 와 length 는 대부분 1바이트지만 길이가 127을 넘어가면 **BER long form** 으로
바뀐다는 게 첫 함정이었다.

```csharp
int ReadBerLength(ReadOnlySpan<byte> buf, ref int pos)
{
    byte first = buf[pos++];
    if ((first & 0x80) == 0) return first;          // short form
    int count = first & 0x7F;                        // long form: 뒤따르는 바이트 수
    int len = 0;
    for (int i = 0; i < count; i++) len = (len << 8) | buf[pos++];
    return len;
}
```

## 부분 프레임 문제

실시간 스트림에서는 하나의 KLV 유닛이 여러 전송 패킷에 걸쳐 들어온다.
파서를 "버퍼가 충분히 쌓였을 때만 소비" 하도록 만들지 않으면 중간에 깨진다.
결국 링 버퍼에 모으고, 전체 길이만큼 도착했는지 확인한 뒤 파싱하는 구조로 정리했다.

## 체크섬

태그 1 (checksum) 은 패킷 전체에 대한 16비트 합. 파싱 후 검증에 쓰고,
안 맞으면 그 프레임은 버린다.
