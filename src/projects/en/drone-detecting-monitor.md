---
title: Counter-drone detection monitor
projectSlug: drone-detecting-monitor
description: A client that visualizes UDP data from drone-detection hardware on a map, with logging and replay.
---

A monitoring client that takes data from drone-detection hardware, shows the
situation on a map, and records it so it can be reviewed later.

## What it does

- **Receive pipeline** — UDP packet intake → CRC16-CCITT validation → events by
  message type (reference device/RTK, detected drone, detector status, control)
- **Map visualization** — GMap.NET markers and tracks for the detector, reference
  position and detected targets
- **Logging & replay** — writes binary log files and plays them back through an
  async replay engine with adjustable speed
- Config (config.json) handling, MongoDB access over an SSH tunnel
- Ships with a mock packet-sender simulator so it can be developed without hardware

## Stack

WPF · C# · .NET 8 · UDP · GMap.NET · MongoDB
