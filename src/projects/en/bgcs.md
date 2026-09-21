---
title: BGCS — cross-platform GCS
projectSlug: bgcs
description: A WPF drone ground control station rebuilt on Avalonia. Clean Architecture, multi-vehicle, 2,600+ unit tests.
---

A rebuild of a WPF (Windows-only) drone ground control station (GCS) on
**Avalonia UI**, targeting **Windows, Android, iOS (and later the web)** from one
codebase. A GCS is the software an operator uses to watch a UAV's state — position,
attitude, battery — and to plan and command missions. I lead the architecture and
implement the core features on my own.

## Why rebuild

- **Platform lock-in** — WPF runs only on Windows, while tablet/mobile operation was increasingly requested.
- **Many vehicles, many firmware versions** — the interface spec (ICD) differs subtly per firmware, which made maintenance hard.
- **Quality assurance** — with Korea's GS software-quality certification in mind, tests and documentation are held to a strict standard from day one.

## Architecture

```
[GCS client] ── in-house protocol (UDP/TCP) ──► [relay server] ──► [vehicle]
 Windows · Android · iOS                                  Serial direct (Windows)
```

- **Clean Architecture** — `Shared` → `Core` (domain, no UI references) → `Infrastructure/Media/Map` →
  shared Avalonia UI → platform heads (Desktop · Android · iOS · Browser), with **dependencies enforced one way**.
- ViewModels know only **interfaces** such as `IVehicleService`; DI injects the real UDP/Serial implementation.
- Features unavailable on mobile (Serial, video) are replaced with **stub implementations**, and platform
  branching (`#if`) is allowed in exactly one place — the DI registration at startup — as a team convention.
- A white-label structure lets a generic template and customer-specific products reuse screens, login and navigation.

## Key implementation

- **Multi-vehicle (up to 255)** — request tracking keyed by `(messageId, vehicleId)` so responses never mix,
  a separate heartbeat watchdog per vehicle, and automatic map layers/colors for newly seen vehicles.
- **Communication** — UDP · TCP · Serial, exponential-backoff reconnect (1→30 s), 50 Hz telemetry via `Channels`.
- **Two-stage unit conversion** — wire raw units → SI → the user's display units, so a protocol change never touches UI logic.
- **Mission planning** — waypoint editing on satellite maps with a per-waypoint property panel, plus a **custom-rendered
  chart that overlays SRTM terrain on the planned altitude and flags low-clearance segments** (Avalonia `Render()` override, Catmull-Rom curves).
- **RBAC authentication** — EF Core + SQLite + BCrypt with a cached role→permission map.
- Map/weather API keys managed in-app (settings first, `.env` fallback).

## Problem solving

1. **Vehicle markers not showing — a three-round root-cause hunt.** I first suspected the refresh logic, then the
   layer pattern; both only partly helped. Decompiling the library showed the vehicle's coordinates were **outside the
   app's initial viewport**, compounded by `RefreshGraphics()` and `RefreshData()` being separate operations. Fixed with
   auto-centering on the first position and `Refresh()`.
2. **Freeze after repeatedly opening and closing a screen.** The previous ViewModel's `Dispose()` was never called, so
   communication event handlers piled up and reacted to every packet, saturating the UI thread queue. I made every
   navigation point dispose its predecessor and codified "detaching a View must dispose its ViewModel."
3. **Defects only hardware integration tests could find.** Unit tests all passed, but connecting a real flight-control
   computer over serial (PILS) revealed that reconnection was effectively unimplemented and that certain config commands
   rebooted the device. That confirmed the limits of mock-based tests and led to a written integration-test procedure.

## Quality

- **2,600+ unit tests, all passing** — xUnit v3, Moq, FluentAssertions, Avalonia.Headless (UI tests with no window)
- A code-review checklist — platform-branch location, layer dependency direction, no empty `catch`, resource disposal, and more

## Stack

Avalonia 12 · FluentAvaloniaUI · CommunityToolkit.Mvvm · Mapsui/BruTile · FFmpeg.AutoGen ·
EF Core SQLite · Serilog · xUnit

> In progress (since May 2026). Next: GS certification prep, more on-device Android/iOS validation, a lighter Browser (WebAssembly) client.
