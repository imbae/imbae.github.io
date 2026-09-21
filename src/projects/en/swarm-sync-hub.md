---
title: Swarm operations GCS
projectSlug: swarm-sync-hub
description: A military GCS that controls many unmanned vehicles from one ground station, built from five shared libraries.
---

A military ground control system (GCS) that **monitors, plans and controls many unmanned vehicles at once** from a single
ground station. It integrates communication, video, maps and hardware input into one application, and I led it alone from
the initial architecture through development and maintenance. As a military project, **mission and operational details are
not published** — only the technical design is described.

## Design challenges

- **Heterogeneous vehicles** — one GCS must talk to flight controllers with different airframes and firmware, so the communication structure could not be tied to any one type.
- **Cognitive load** — watching many vehicles on one screen demands filtering state and alarms so the operator's judgment isn't overloaded.
- **Safe control hand-over** — several consoles must never command the same vehicle at once, so authority has to be passed and received through a safe procedure.
- **Video plus position** — frames had to carry position and attitude metadata in a standard format.

## Architecture

A modular design: the main app plus **five reusable in-house libraries**, each in its own repository and referenced
from the main app as a **Git submodule** pinned to a version.

| Library | Role |
|---|---|
| Communication protocol | Transport · Packet · Message layers; Serial/TCP/UDP; separate uplink/downlink channels |
| Video processing | Low-latency FFmpeg decoding; MISB ST0601/ST0903 video metadata |
| Map | Customized open-source GMap.NET; ProjNet coordinate transforms |
| Shared UI controls | Alarm dialogs, gauges, numeric inputs — design-system elements |
| Shared utilities | GNSS correction (RTCM) parser, SRTM terrain elevation, signal filtering |

**Why split it this way** — reuse across other GCS products, independent versioning, and separation of concerns
(upper-level logic is isolated behind interfaces from low-level communication and hardware details).

## Key implementation

- **Communication** — an in-house lightweight binary protocol; a transport abstraction lets the same upper logic run over any link.
- **UI** — WPF + MVVM (CommunityToolkit.Mvvm), showing multi-vehicle state in a maintainable structure.
- **Map and terrain** — vehicle position and track display, with an RTCM correction parser and SRTM terrain data implemented/integrated in-house.
- **Video** — low-latency FFmpeg.AutoGen decoding and MISB metadata interpretation.
- **Input devices** — joysticks (DirectInput) and a dedicated console controller unified into one control scheme, with a low-pass filter to smooth jitter.
- **Multi-vehicle operations** — control-authority hand-over state across operators; formation state visualization.
- **Logging and diagnostics** — Serilog, SQLite/MongoDB.Bson storage, and a developer diagnostics screen (Dev Tools).

## Issues handled in service

I analyzed and fixed calculation errors, library-version incompatibilities and synchronization bugs found in real use,
reaching service-grade stability.

## Stack

C# · .NET 8 · WPF · MVVM · System.IO.Ports · TCP/UDP · FFmpeg.AutoGen · GMap.NET · ProjNet · SharpDX.DirectInput ·
Serilog · SQLite · Git submodules
