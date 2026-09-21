---
title: PILS 시뮬레이션 앱
projectSlug: pils-app
description: 상용 비행 시뮬레이터와 실제 비행제어컴퓨터를 시리얼로 잇는 PILS(Processor-In-the-Loop Simulation) 브리지.
---

**PILS(Processor-In-the-Loop Simulation)** 환경을 구성하는 데스크톱 브리지입니다.
상용 비행 시뮬레이터의 비행 동역학을 그대로 쓰면서, **실제 비행제어컴퓨터(FCC) 하드웨어**를 시리얼로 연결해
그 위에서 시험할 수 있게 해줍니다. 실제 기체 없이 반복 시험이 가능하고, GCS의 하드웨어 통합 테스트에도 쓰입니다.

## 구성

```
[비행제어컴퓨터]  ←(시리얼)→  [PILS App]  ←→  [MSFS / X-Plane]
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

## 활용

JDAD-GCS2에서 시뮬레이터 연동으로 실비행 없이 소프트웨어를 반복 검증하는 체계를 만들었고,
[BGCS](/work/bgcs/)에서는 실제 FCC를 시리얼로 연결하는 통합 테스트로 단위 테스트가 못 잡던 결함(재연결 미구현, 특정 설정 명령 후 재부팅)을 찾아냈습니다.
