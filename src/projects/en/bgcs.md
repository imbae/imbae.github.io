---
title: BGCS — cross-platform GCS
projectSlug: bgcs
description: A WPF drone ground control station rebuilt on Avalonia — layering rules, state model, protocol-version handling, and test strategy.
---

A rebuild of a WPF (Windows-only) drone ground control station (GCS) on **Avalonia UI**, targeting
**Windows, Android, iOS (and later the web)** from one codebase. A GCS is the software an operator uses to watch a UAV's
state — position, attitude, battery — and to plan and command missions. I lead the architecture and implement the core
features on my own; the codebase is roughly 1,000 source files with **2,656 automated tests**, all passing.

## Why rebuild

- **Platform lock-in** — WPF runs only on Windows, while tablet/mobile operation was increasingly requested.
- **Many firmware versions** — the interface spec (ICD) differs subtly per flight-controller firmware, and hand-branching it in code was costly to maintain.
- **Technical debt** — the previous generation had 85+ packet handlers packed into one file and was tied to aging UI libraries.
- **Quality assurance** — with Korea's GS software-quality certification in mind, tests, documentation and static analysis are held to a strict standard from day one.

## 1. Layering and dependency rules

```
BGcs.Shared      pure utilities (references no other project)
   ↑
BGcs.Core        domain models & interfaces (no UI framework)
   ↑
BGcs.Infrastructure / Media / Map     communication, video, map implementations
   ↑
BGcs             shared Avalonia Views & ViewModels
   ↑
platform heads   Desktop · Android · iOS · Browser (entry points only)
```

I weighted **enforcing the boundaries with rules and the compiler** over the layering itself.

- `Core` and `Shared` cannot reference Avalonia, and ViewModels know only `I*Service` interfaces, never implementations.
- **The UI cannot reference the protocol library.** The protocol project reference is marked `PrivateAssets="all"`, so it never
  flows to the UI project — a violation surfaces as a **compile error**, not a review comment.
- **`Core` is the single source of truth for protocol value semantics (enums).** The protocol library is a pure transport layer that
  owns only message IDs, packet layout and raw fields; converting raw values to domain enums happens only in `Infrastructure`.
- Platform branching (`OperatingSystem.Is*`, `#if ANDROID`) is allowed in **one place: the DI registration at startup**.
  Features unsupported on mobile (Serial, video) get a do-nothing **stub implementation** so the app never crashes.
- **Product line** — a generic template project reuses screens, login and navigation 100%, and forks only the **one** screen a customer needs
  customized, when it is needed ("lazy fork"), yielding white-label products (references point template → shared UI, never backward).

## 2. Communication and state model

```
IVehicleService (Core)
  └─ VehicleService (Infrastructure) ─ IBLinkAdapter ─ protocol library
IVehicleRegistry (Core)
  └─ VehicleRegistry ─ dispatch message ID → per-group downlink handler
       ├─ Common     home position, version, system attributes
       ├─ Periodic   flight info, system status, control I/O (high frequency)
       ├─ Swarm      multi-vehicle periodic messages
       ├─ Parameter  parameters and command limits
       └─ Mission    mission-block info
```

- **`VehicleRegistry` owns only lifecycle and dispatch**; interpretation is split into per-group `IDownlinkHandler`s — fixing the previous generation's bloated-file problem structurally.
- **`VehicleInfo` (low-frequency info and config) and `VehicleState` (high-frequency received-message submodels) are physically separate.**
  When `VehicleInfo` rides out on a low-frequency event, high-frequency state must not tag along and bypass the channel split. `VehicleInfo` is a read-only
  facade exposing frequently used values by short paths; only handlers write.
- **Event channels are split per message.** Merging periodic messages into one "info changed" event would wake uninterested subscribers to compare
  property names every time. Dedicated per-message channels carry the submodel directly, so only interested ViewModels subscribe.
- **New messages follow the open-closed principle** — ① add a submodel in Core ② add a case to the owning group handler ③ add an event channel if needed.
  `VehicleRegistry` and the UI are left untouched.
- **Protocol-version compatibility policy** — when a layout changes, don't edit the existing message; **issue a new message ID** (e.g. `SYS_STATUS` ↔ `SYS_STATUS_EXP`),
  so the GCS only gains a handler and nullable fields. If only meaning changes, branch on `OfpVersion` inside `VehicleRegistry` alone; if the wire format
  becomes incompatible, split a version branch whose diff is confined to the protocol-submodule pointer and Infrastructure.

### Connection watchdog and reconnection

- **Per-vehicle link-loss watchdog** — independent of transport state, a 5-second application-level timer checks each vehicle's last-received time and
  raises `VehicleTimedOut` after 10 s, `VehicleLost` for all active vehicles when the link drops, and `VehicleDiscovered` for a newly seen ID.
  One vehicle's loss never affects another's monitoring.
- **Request tracking** — keyed by `(messageId, vehicleId)` so simultaneous requests for the same message to several vehicles never mix responses.
- **Reconnection, honestly** — TCP has fixed-interval auto-reconnect, but UDP (connectionless) and Serial have none. I confirmed this by measurement in
  hardware integration testing rather than from documents, and it is why loss notification and reconnect policy are designed as separate concerns.

## 3. MVVM, DI and concurrency

```
ObservableObject (CommunityToolkit.Mvvm)
  └─ ViewModelBase  (injected dialog/notification services, IDisposable)
       ├─ MenuViewModelBase   menu navigation
       ├─ MapViewModelBase    shared map behavior
       └─ InfoViewModelBase   detail panels
```

- **Source generators** — `[ObservableProperty]`, `[RelayCommand]`, `[NotifyPropertyChangedFor]` remove boilerplate.
- **DI** — `*ViewModel`/`*View` types in the assembly are **auto-registered by naming convention (Transient)**; the few that must share state are registered as Singletons by hand.
  A **per-login-session `IServiceScope`** means logging out disposes everything belonging to the session at once.
- **`ViewLocator`** — resolves `FooViewModel` → `FooView` by name, pulls it from DI and binds the DataContext. Code-behind holds no business logic, and a View
  disposes its ViewModel when it detaches from the screen.
- **Thread boundaries** — downlink arrives on a background thread and is handed to the UI via `Dispatcher.UIThread.Post()`. High-frequency counters use lock-free
  `Interlocked`; high-frequency inbound data flows through a bounded `Channel<T>` with `DropOldest` so the UI never falls behind.
- `ConfigureAwait(false)` in Infrastructure/Media, forbidden in the UI (keep the dispatcher context), and `CancellationToken` required on new I/O.

## 4. Screen structure

```
MainWindow → MainViewModel
  ├─ Login
  └─ Shell
      ├─ Dashboard   (PFD, flight info — always visible)
      ├─ StatusBar   (link state, notifications — always visible)
      ├─ main mode  MainMode : Monitor ↔ Plan
      └─ overlay    OverlayMode : connection · flight log · detail info · parameters · ground setup · user settings
```

`MainMode` and `OverlayMode` are independent states, and switching the main mode automatically closes any overlay.
Video opens as a separate window (Windows only).

## 5. Map and mission planning

- **Layers are manipulated only through `MapService` and `*LayerBuilder`s.** ViewModels receive an `IMapLayerService` interface rather than the concrete class, enforcing the
  "no direct manipulation" rule at the type level. Tile providers — VWorld (Korea) and Azure Maps (global) — switch from settings.
- **Mission planning** — waypoint editing on satellite maps with a per-waypoint property panel, plus survey-polygon, distance-measure and wind-arrow layers.
- **Altitude-profile chart** — a custom-rendered control that overlays SRTM terrain on the planned altitude and **automatically flags segments with under 30 m of clearance**.
  It overrides Avalonia's `Control.Render()` and draws the route with Catmull-Rom curves.
- **Two-stage unit conversion** — wire raw units (cm, 0.01°, …) → SI → the user's display units. I first used an intermediate model, then simplified it to extension methods,
  so a protocol change never touches UI logic.

## 6. Authentication, permissions and settings

- EF Core + SQLite + BCrypt login, a **cached role→permission map**, and screen access branching only on `PrivilegeCodes` constants (never role-name strings).
- Map/weather API keys are managed in an in-app settings screen, falling back to `.env` when unset.

## 7. Problem solving

1. **Vehicle markers not showing — a three-round root-cause hunt.** I suspected the refresh logic, then the layer pattern; each only partly helped.
   Decompiling the library showed the vehicle's coordinates were **outside the app's initial viewport**, compounded by `RefreshGraphics()` and `RefreshData()` being separate operations.
   Fixed with auto-centering on the first position and `Refresh()`.
2. **Freeze after repeatedly opening and closing a screen.** The previous ViewModel's `Dispose()` was never called, so communication event handlers piled up and reacted to every packet,
   saturating the UI thread queue. I made every navigation point dispose its predecessor, fixed missing unsubscriptions across five classes, and codified
   "detaching a View must dispose its ViewModel."
3. **Defects only hardware integration tests could find.** Unit tests all passed, but connecting a real flight-control computer over serial (PILS) showed that reconnection was not implemented and that
   certain config commands rebooted the device. I excluded that category from automated runs and wrote an integration-test design document to record the limits of mock-based testing.

## 8. Quality

- **2,656 automated tests, all passing** — xUnit v3 · Moq · FluentAssertions · **Avalonia.Headless** (UI tests with no window), plus a separate hardware integration-test project
- **Static analysis** — nullable reference types and CA/IDE rules enforced; suppressions only with a stated reason
- **Code-review checklist** — platform-branch location, layer dependency direction, no empty `catch`, `Dispose`/`using`, log context, no sensitive data in logs
- **Serilog** structured logging, with a written standard for what must be logged

## Stack

Avalonia 12 · FluentAvaloniaUI · CommunityToolkit.Mvvm · Mapsui/BruTile · FFmpeg.AutoGen (MISB/KLV) · EF Core SQLite · BCrypt ·
Serilog · Microsoft.Extensions.DependencyInjection · xUnit v3

> In progress (since May 2026). Next: GS certification prep, more on-device Android/iOS validation, a lighter Browser (WebAssembly) client.
