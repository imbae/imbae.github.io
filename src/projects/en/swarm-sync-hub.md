---
title: Swarm operations GCS
projectSlug: swarm-sync-hub
description: A military GCS that controls many unmanned vehicles from one ground station — five shared libraries, a three-layer protocol stack, an input pipeline, and a state-evaluation system.
---

A military ground control system (GCS) that **monitors, plans and controls many unmanned vehicles at once** from a single ground station.
It integrates communication, video, maps and hardware input into one application, and I led it alone from the initial architecture through development and
maintenance. As a military project, **mission, operational and performance details are not published** — only the software design and implementation are described.
The main app plus five shared libraries come to roughly 500 C# source files.

## Design challenges

- **Heterogeneous vehicles** — one GCS must talk to flight controllers with different airframes and firmware, so the communication structure had to be extensible and not tied to any one type.
- **Cognitive load** — watching many vehicles on one screen demands filtering state and alarms so the operator's judgment isn't overloaded.
- **Safe control hand-over** — several consoles must never command the same vehicle at once, so authority has to be passed and received through a safe procedure.
- **Video plus position** — frames had to carry position and attitude metadata in a standard format.
- **Many input devices** — everything from ordinary joysticks to a dedicated console controller had to be unified into one control scheme.

## 1. Architecture — main app plus five shared libraries

```
SwarmSyncHub (WPF · MVVM)
 ├─ Views / ViewModels   pre-flight (connect → inspect → ready) · mission planning · monitoring · info/parameter panels · settings · developer diagnostics
 ├─ Controller           control-input pipeline (device handlers · scaler · offset)
 ├─ Functions            state evaluation & alarm checks, value-comparison monitor, data conversion
 └─ Datas                models and validation rules
        │  (Git submodules, version-pinned)
        ├─ Communication protocol   Core · Flight (uplink/downlink managers, messages, parser, transport) · External (external-device adapters)
        ├─ Video                    FFmpeg decoding · MISB metadata
        ├─ Map                      customized GMap.NET
        ├─ Shared UI controls       alarm dialogs · gauges · numeric inputs
        └─ Shared utilities         GNSS correction (RTCM) parser · SRTM terrain · signal filtering
```

Each library lives in its **own Git repository**, and the main app **references a pinned version as a submodule**. The reasons:

- **Reuse** — communication, video and map code is used unchanged by other GCS products (the previous-generation GCS, the cross-platform successor BGCS, and others).
- **Independent versioning** — each library has its own release and test cadence, and the submodule pointer states explicitly which version is in use.
- **Separation of concerns** — upper-level logic is isolated behind interfaces from low-level communication and hardware details.

## 2. Communication — three layers and extension points

An in-house lightweight binary protocol split into **Transport → Packet → Message** layers.

- **Transport abstraction** — Serial/TCP/UDP differ, but upper logic behaves identically.
- **Packet framing** — finds "this is where one message starts and ends" inside an unbroken byte stream.
- **Uplink (ground → vehicle commands) and downlink (vehicle → ground telemetry) are separate channels**, each with its own manager and message definitions.
- **`External` adapter layer** — several joystick families, simulation and instrumentation devices are independent adapters inside the communication library, so adding a device never touches flight-communication code.

## 3. Control-input pipeline

Ordinary joysticks and a dedicated console controller (Loupedeck) are unified into one control scheme.

- A **device handler** receives each device's input → a **scaler** calibrates each axis → an **offset** sets the neutral point.
- A **low-pass filter** removes fine jitter (high-frequency components) to smooth control input.
- Splitting input handling into single-responsibility stages means swapping a device leaves later stages reusable and each stage independently testable
  (carrying over the redesign of a single-class approach into a filter → scaler → handler structure from an earlier generation).

## 4. Multi-vehicle state display and control hand-over

- A **per-vehicle state model** keeps telemetry for many vehicles at once, and the screen shows a filtered, summarized state and alarms.
- **State-evaluation system** — validation rules (`ValidationRule`) and an alarm checker judge values as normal or warning, and alarms reach the user through dedicated dialogs.
- **Control authority transfer** — manages the state in which only one of several operators/consoles may command a vehicle and hands it over safely, and visualizes formation state.
- The **pre-flight flow** is split into connect → inspect → ready screens to enforce the procedure.

## 5. Map, terrain and coordinates

- Customized open-source **GMap.NET** (vehicle markers and track overlays), with **ProjNet** for coordinate-system transforms (lat/lon ↔ planar).
- Implemented a **GNSS correction (RTCM) parser** and process **SRTM terrain elevation** data to use terrain information alongside position.

## 6. Video and metadata

- **FFmpeg.AutoGen** low-latency decoding and **MISB ST0601/ST0903** metadata interpretation, so video frames and position/attitude information are handled together.
- **Lifetime and reset of the metadata buffer** across video start/stop is managed explicitly, so information from one stream never lingers into the next.

## 7. Storage, logging and diagnostics

- **Serilog** structured logging, **SQLite / MongoDB.Bson** for local and document storage, **CsvHelper / Newtonsoft.Json** for mission and settings serialization.
- A **developer diagnostics screen (Dev Tools)** shows real-time per-vehicle state, so field issues can be reproduced and analyzed quickly.

## 8. Issues handled in service

I analyzed and fixed **calculation errors, library-version incompatibilities and synchronization bugs** found in real use, reaching service-grade stability.
Pinning versions through submodules helped narrow compatibility problems to "which combination broke," and for data that easily drifts out of time — video and
position — I settled on managing state lifetime explicitly.

## Stack

C# · .NET 8 · WPF · MVVM (CommunityToolkit.Mvvm) · MahApps.Metro · MaterialDesign · System.IO.Ports · TCP/UDP · FFmpeg.AutoGen ·
GMap.NET · ProjNet · SharpDX.DirectInput · OxyPlot · Serilog · SQLite · MongoDB.Bson · Git submodules
