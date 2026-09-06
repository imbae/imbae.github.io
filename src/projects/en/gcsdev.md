---
title: GCSdev — ground control station
projectSlug: gcsdev
description: A Windows drone GCS talking to the flight-control computer over an in-house flight protocol.
---

A Windows GCS that communicates with the flight-control computer (FCC) over an
in-house flight protocol (ICD), covering the full feature set the ICD defines
across **fixed-wing, multicopter and rotary-wing** vehicles. It is now being
migrated to a cross-platform successor (BGCS).

## Areas I worked on

- Real-time monitoring — instruments (PFD/HUD), map, telemetry, 80+ protocol packet-event handlers
- Ground setup — system · IMU · servos · receiver · calibration
- Flight-parameter editing per vehicle type, with file save/load
- Mission planning — waypoints and survey patterns
- Handlers for GNSS/RTK, joystick, landing pattern, hotkeys
- MVVM (CommunityToolkit.Mvvm), Serilog logging, MongoDB/MySQL integration

## Stack

WPF · .NET 8 · CommunityToolkit.Mvvm · MaterialDesign + MahApps · HelixToolkit (3D) · LiveCharts/OxyPlot · Serilog
