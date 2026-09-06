---
title: PILS 시뮬레이션 앱
projectSlug: pils-app
description: 상용 비행 시뮬레이터와 비행 소프트웨어를 시리얼로 잇는 PILS 브리지.
---

**PILS(Pilot-In-the-Loop Simulation)** 환경을 구성하는 데스크톱 브리지입니다.
상용 비행 시뮬레이터의 비행 동역학을 그대로 쓰면서, 실제 비행 소프트웨어(비행제어
컴퓨터·GCS·오토파일럿)를 그 위에서 시험할 수 있게 해줍니다. 실제 기체 없이
반복 시험이 가능합니다.

## 구성

```
[비행 소프트웨어]  ←(시리얼)→  [PILS App]  ←→  [MSFS / X-Plane]
```

- **PILS 모델 연결** — 비행 모델과 시리얼로 연결(보레이트 설정), 비행체 정보 요청,
  지도(GMap.NET) + SRTM 표고 데이터로 지형 표시
- **시뮬레이터 연결** — Microsoft Flight Simulator / X-Plane 선택 연결
- **초기 조건 설정** — 시작 위치(위/경도)·헤딩·바람 방향/세기
- **주기 송출** — PILS-out 패킷을 고정 주파수(`Define.HZ`)로, 카메라 제어 스트림을
  10 Hz로 전송 (시뮬레이터 뷰의 카메라 pitch/bank 제어)
- SWARM 탭 — 다중 기체 시뮬레이션 연결

## 구현 메모

- 시리얼 전송 계층을 **Basic / Expansion** 두 프로토콜로 분리, 각각 패킷 워커·핸들러
- `BlockingCircularStream` 링 버퍼로 부분 프레임 수신 처리
- WPF · .NET 8 · CommunityToolkit.Mvvm, 설정은 XML(`ConfigureXmlParser`)
