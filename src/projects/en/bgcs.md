---
title: BGCS — cross-platform GCS
projectSlug: bgcs
description: A WPF drone ground control station rebuilt on Avalonia as a cross-platform GCS.
---

A rebuild of a drone ground control station (GCS) — grown in WPF over several
years — on **Avalonia UI**, targeting **Windows, Android, iOS and the browser**
from a single codebase.

## What I do on it

- Layered architecture — `Core` (domain) / `Infrastructure` (services) / `Shared` (Avalonia UI) / `Platforms` (platform heads)
- MVVM (CommunityToolkit.Mvvm) + DI, VM↔View mapping via a ViewLocator
- Transport abstraction — UDP · TCP · Serial, connecting through a relay server
- Map (Mapsui), video (FFmpeg.AutoGen, Windows-only) and auth (EF Core SQLite) integration
- Drone communication handled by an in-house protocol library (submodule)

## Stack

Avalonia 11 · .NET 10 · CommunityToolkit.Mvvm · Mapsui · FFmpeg.AutoGen · Serilog · xUnit

> In progress, expanding per a platform capability matrix (Serial and video are desktop-first).
