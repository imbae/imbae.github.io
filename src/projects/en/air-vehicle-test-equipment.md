---
title: UAV Ground Test Equipment (AVTE) — K4586
projectSlug: air-vehicle-test-equipment
description: A K4586 (Korean localization of NATO STANAG 4586) communication library and the UAV ground-test software built on it.
---

**UAV Ground Test Equipment (AVTE, Air Vehicle Test Equipment)** is a WPF application that checks the
subsystems carried on an aircraft — automatically or manually — and evaluates their **BIT (Built-In Test)** results.
It is a defense project, so network setup, spec figures, organization and airframe details are not published; only the
software design and implementation work is described.

## K4586

**K4586** is the **Korean localization of NATO's drone communication standard STANAG 4586**. On this project I **designed
and implemented the K4586 communication library (K4586Link)** and the architecture of the AVTE client above it. The
library is a standalone module (Git submodule) so other GCS products can reuse it.

```
AVTE client (WPF, MVVM)  ── automatic checks · manual checks · BIT
        │  Adapter layer (message → UI model)
        ▼
K4586Link (standalone library) ── (de)serialization · checksum · UDP I/O
        │  UDP (multicast)
   vehicle side  /  ground-control side
```

## What I built

### A generator that produces code from the spec (ICD)
Hand-copying hundreds of messages and fields into C# invites typos and field-order bugs. I built a code generator that
reads the interface spec (ICD) and **emits C# classes and enums**, attaching per-field metadata (unit, min/max,
resolution) as attributes. When the spec changes, regenerate.

### The K4586 communication layer
- Binary (de)serialization, **endianness handling**, checksum verification
- UDP multicast I/O with a **producer-consumer async queue** pipeline — no lost or reordered packets

### Adapter-pattern UI mapping
An **Adapter layer** turns raw protocol data into screen-ready information, built on generics and attribute-based
auto-mapping. Tag a field as "this is a voltage, normal range is X" and the evaluation logic reads it to decide
normal / caution / warning. It scales to 11+ subsystems: follow the rules and a new one appears in the UI with no registration code.

### Automatic checks · BIT
- **CBIT / PBIT / IBIT** support and a Min/Max, caution/warning **evaluation engine**
- `async/await` with `CancellationToken` runs several checks concurrently yet stops instantly on "abort"
- **Handlebars.Net** templates turn results into HTML reports automatically

### Concurrency defects
Controlling video equipment ran heartbeats, user commands and background monitoring concurrently, causing corrupted
register values, timeout drift and resource leaks. I root-caused and fixed **8 latent defects**
(`SemaphoreSlim`, `volatile`/`Interlocked`, `TaskCompletionSource`).

### ICD Diff Viewer
A WPF tool that compares two ICD versions and surfaces changed items at a glance, cutting manual cross-checking and omissions.

## Stack

C# · .NET 8 · WPF · MVVM (CommunityToolkit.Mvvm) · DI · UDP multicast · Handlebars.Net · MahApps.Metro ·
MaterialDesign · LiveCharts · Git submodules
