---
title: Counter-drone detection monitor
projectSlug: drone-detecting-monitor
description: An integrated monitor that plots UDP data from drone-detection equipment on a map and logs it in fixed-size binary for replay.
---

A Windows desktop monitor that **receives data from drone-detection equipment (radar, RF scanners…) over UDP → plots it on
a live map → stores it in a binary log → replays it exactly**. Since December 2023 I have designed, built and
maintained all of it alone — protocol, data pipeline, map visualization, logging and UI.

## Why it was needed

- Detection equipment emits rows of numbers and coordinates, so it is hard to see at a glance where a drone is and how far.
- Events were not recorded, so false alarms versus real threats could not be verified afterwards.
- Different devices (detectors, GPS reference stations…) each send data their own way, with no single integrated view.

## Key features

- **Live monitoring** — reference-device position, detected-drone position/speed, and detector position/bearing as map markers
- **Alert zones** — four alert levels judged by distance from a reference point (radii adjustable in a config file)
- **Link-loss detection** — markers change color when packets stop for a set time
- **Binary log and replay** — data stored in a fixed-size format and replayed at the original (or scaled) timing with tracks and a position-error chart
- **Log unpacking** — converts binary to tab-separated text for Excel and other analysis
- **Mock sender simulator** — verify the protocol without hardware
- **KML import** — overlay boundaries and routes on the map

## Architecture

```
[detection equipment / mock simulator]
      │ UDP packets (in-house protocol)
      ▼
Communication layer (DMLink)  UdpTransport → packet walking → CRC check → message deserialization → events
      ▼
Application (MVVM)  events → unified data model
      ├──────────────► Map visualization (DMGMap)  markers, tracks, zones
      └──────────────► Logging  binary writer / async replay engine
```

Communication (DMLink) and map rendering (DMGMap) are **standalone libraries** separate from the main app, so the main
app and the simulator share the same protocol code and adding a message or marker type has a bounded blast radius.

## Key design decisions

- **UDP plus an in-house binary protocol** — position data is real-time, so connectionless UDP fit. I designed a lightweight
  `[sync][length][groupId][messageId][count][payload][CRC]` packet, an async packet walker that finds boundaries from the sync byte,
  and a lookup-table **CRC16-CCITT** check.
- **Fixed-size log (117 bytes per record)** — replay is a sequential read with no index. The trade-off is that adding a field
  breaks compatibility with old logs, so the file header carries a **version string**. Interval event markers reuse the same
  record format by changing only the type value.
- **Async replay engine** — `async/await` with `TaskCompletionSource` lets pause and speed changes apply instantly without blocking the UI thread.
- **DB access through an SSH tunnel** — the account database (MongoDB) is never exposed directly.

## Troubleshooting

| Problem | Cause → fix |
|---|---|
| Control commands delayed / unanswered | Spin-lock waiting caused CPU load and timing issues → switched to blocking waits |
| Session lingering after login | SSH connection not cleaned up → explicitly released on login completion |
| Crash loading a replay log | Missing exception handling → hardened, fixed against reproduction cases |
| Map tiles not loading | Map API key expired → replaced the key; recognized the need to monitor expiry |
| Unit mismatch (m ↔ cm) | Conversions mixed between logging and unpacking → store raw units (cm), convert for display in one place at unpack time |

## What I learned

A fixed-size log bought performance but made every added field a compatibility question. Next time I would design a
variable-length format or a version-migration strategy up front. I also practiced migrating gradually — keeping the existing
event-driven singleton structure while building new features on `CommunityToolkit.Mvvm` and `WeakReferenceMessenger`.

## Stack

C# · .NET 8 · WPF · MVVM (CommunityToolkit.Mvvm) · UDP · CRC16-CCITT · GMap.NET (custom VWorld provider) · OxyPlot · MahApps.Metro ·
MongoDB (SSH tunnel) · Newtonsoft.Json
