---
title: PILS simulation app
projectSlug: pils-app
description: A PILS (Processor-In-the-Loop Simulation) bridge linking a commercial flight simulator to a real flight-control computer over serial.
---

A desktop bridge that sets up a **PILS (Processor-In-the-Loop Simulation)** environment. It reuses a commercial flight
simulator's flight dynamics while a **real flight-control computer (FCC)** is wired in over serial and tested on top of
it — so it can be exercised repeatedly with no aircraft, and it also serves GCS hardware integration tests.

## Setup

```
[flight-control computer]  ←(serial)→  [PILS App]  ←→  [MSFS / X-Plane]
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

## Where it is used

In JDAD-GCS2 the simulator link made repeated verification possible without real flights, and in
[BGCS](/en/work/bgcs/) a hardware integration test over a real FCC found defects unit tests could not — reconnection that was
never implemented, and a device that rebooted after certain config commands.
