---
title: JDAD-GCS — single-vehicle mission GCS
projectSlug: jdad-gcs
description: A military GCS for single-vehicle mission operations — GCS1 built from scratch, then re-architected in GCS2.
---

A **military ground control system (GCS)** for single-vehicle mission operations, delivered as two programs.

- **JDAD-GCS1** — built **from zero**, protocol to UI
- **JDAD-GCS2** — a follow-on that **redesigned the software architecture** while adding features

It is the precursor of the [swarm operations GCS](/en/work/swarm-sync-hub/). As a defense program, customer, airframe
specifications and mission details are not published — only the software design and implementation.

## GCS1 — new development

The company had no GCS for the new airframe platform, so I designed and built everything from the communication
protocol to the user screens.

- Designed and implemented an **in-house binary protocol**, serial (RS-232/UART) communication and packet parsing
- **Real-time remote control** — joystick (HID) input scaled and converted into autopilot commands
- **Mission planning** — waypoint based, saved/loaded as XML and uploaded to the vehicle
- **Telemetry** reception and display (attitude, position, battery, link state), plus a **pre-flight check** screen
- Integration of an **automatic antenna-tracking** subsystem and **camera gimbal** (pan/tilt/zoom) control
- Real-time FFmpeg video and a GMap.NET map with markers and tracks

## GCS2 — architecture upgrade

In GCS1, communication, UI controls and map utilities lived inside one project. The follow-on had to support new mission
requirements (multi-screen monitoring, flight-simulator link) and also be reusable by later projects, so I **split
communication, video and map code into standalone libraries (Git submodules)**.

- **Control-input pipeline redesign** — replaced a single-class approach with **filter → scaler → handler** stages
  (per-axis scaling and deadband separated for maintainability and testability)
- **PILS link** — connected to a simulator over serial so software could be verified repeatedly with no flight
- **3D visualization** (HelixToolkit) and **multi-screen monitoring** (main/sub switching between map and video)
- **Data-link status monitoring**, a dedicated **alarm system**, and a logging structure that collects global exceptions into files

**Outcome** — a single-app structure became a reusable multi-library one, and that foundation carried into later
projects such as the swarm operations GCS. The simulator link made repeated verification possible without real flights.

## Stack

C# · .NET Framework · WPF · MVVM Light · in-house binary protocol · serial (RS-232) · FFmpeg · GMap.NET ·
HelixToolkit · MahApps.Metro · XML serialization · Git submodules
