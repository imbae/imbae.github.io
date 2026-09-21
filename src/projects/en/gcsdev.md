---
title: GCSdev — ground control station
projectSlug: gcsdev
description: A Windows GCS that talks to the flight-control computer over the in-house OFP protocol. 7+ years in service, four vehicle types.
---

A Windows ground control station (GCS) that communicates with the flight-control computer (FCC) over
**OFP (Open Flight Protocol)**, a protocol I designed in-house. It was the first project I owned after joining, taken
from design through release and maintenance, and it grew for **7+ years** alongside feedback from real flight
operations. It is now being succeeded by the cross-platform [BGCS](/en/work/bgcs/).

## Why build it in-house

Off-the-shelf GCS software assumes an open protocol (MAVLink), so it cannot easily support a company's own
FCC protocol and its fine-grained parameter scheme. I designed a GCS around an in-house protocol (OFP) from scratch.

## Architecture

```
View (XAML) ⇄ ViewModel ⇄ Model
              ⇕ WeakReferenceMessenger (loosely coupled messaging)

BLinkManager (communication hub, singleton)
 ├─ Serial / TCP / UDP transports
 ├─ DownlinkHandler : FCC → GCS (position, attitude, system state)
 └─ UplinkHandler   : GCS → FCC (mode change, mission start, RTK corrections …)
```

- **MVVM + messaging** — screens never reference each other directly; publish/subscribe keeps coupling low as screens grow.
- **OFP communication layer** — 85+ packet-event handlers over Serial (57600/115200 bps) or TCP/UDP at up to 100 Hz.
- **Libraries as assets** — communication (BrainsLink), map (BrainsGMap), utilities (BrainsToolkit) and video (BrainsCV)
  are Git submodules, reusable independently of the GCS itself.

## Highlights

- **Four vehicle types in one app** — hybrid (VTOL), fixed-wing, multicopter and rotary-wing, each with its own parameter scheme, behind one UI/UX.
- **RTK positioning** — implemented receiving RTK corrections (RTCM3) from an NTRIP base station and relaying them to the
  vehicle in chunks, tightening a few meters of GPS error to centimeter level.
- **Swarm extension** — added a vehicle ID to the protocol and routed uplink/downlink per vehicle, growing a single-vehicle
  design into multi-vehicle identification, monitoring and control.
- **AI object detection** — wired a Python YOLO model into the C# app with `pythonnet` for real-time detection in video.
- 3D attitude view (HelixToolkit), live charts (LiveCharts · OxyPlot), remote equipment control (SSH · FTP), logging to MongoDB/MySQL.

## Retrospective — why BGCS

Years of operation accumulated technical debt: aging UI libraries, a Windows-only ceiling, the cost of hand-branching
per-firmware ICD differences in code, and a bloated file holding 85+ handlers. Rather than rewrite blindly, BGCS
**diagnoses the root causes** and redesigns around cross-platform, layered architecture. Diagnosing that aging myself and
designing the next generation is, to me, the heart of this project.

## Stack

C# · .NET 8 · WPF · CommunityToolkit.Mvvm · MaterialDesign + MahApps · HelixToolkit · LiveCharts / OxyPlot ·
Serilog · MongoDB / MySQL · SSH.NET / FluentFTP · pythonnet (YOLO)
