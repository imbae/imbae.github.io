---
title: PILS simulation app
projectSlug: pils-app
description: A PILS bridge linking a commercial flight simulator to the flight software over serial.
---

A desktop bridge that sets up a **PILS (Pilot-In-the-Loop Simulation)**
environment. It reuses a commercial flight simulator's flight dynamics while the
real flight software (flight-control computer / GCS / autopilot) runs on top of
it — so it can be tested repeatedly with no real aircraft.

## Setup

```
[flight software]  ←(serial)→  [PILS App]  ←→  [MSFS / X-Plane]
```

- **PILS model link** — connects to the flight model over serial (configurable
  baud), requests vehicle info, shows terrain with a map (GMap.NET) + SRTM elevation data
- **Simulator link** — connect to Microsoft Flight Simulator or X-Plane
- **Initial conditions** — start position (lat/lon), heading, wind direction/strength
- **Periodic output** — sends PILS-out packets at a fixed rate (`Define.HZ`) plus a
  camera-control stream at 10 Hz (camera pitch/bank for the simulator view)
- SWARM tab — multi-vehicle simulation links

## Implementation notes

- Serial transport split into two protocols, **Basic / Expansion**, each with its own packet walker and handler
- `BlockingCircularStream` ring buffer handles partial-frame reception
- WPF · .NET 8 · CommunityToolkit.Mvvm; configuration in XML (`ConfigureXmlParser`)
