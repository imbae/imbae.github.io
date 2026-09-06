---
title: WhenWhere
projectSlug: whenwhere
description: A personal-log app combining a calendar with place-based proximity reminders and automatic daily-route summaries. Feature overview.
---

A cross-platform (mobile + PC) personal-log app built **around the calendar**,
combining location-based auto-capture with a personal/work split. The calendar
aims to match Google/Samsung Calendar on the basics; the differentiator built on
top is **place-based proximity reminders**.

## Calendar core (done)

- Month · week · day (timeline) · year · agenda views
- Event CRUD, time ranges and multi-day events, recurring events, reminders
- Lunar calendar (KASI data, 1391–2050), public holidays
- In-calendar search, per-event color customization, weekday colors + week numbers

## Location features (the differentiator)

- **Two kinds of entry** — (1) schedule-based: events tied to a date/time (can tag a place);
  (2) place-based: a note tied to a location that reminds you when you're nearby
- The map shows both event places and place notes, distinguished by marker label
- **Automatic event check-off** — geofences detect a visit and complete the event
- **Automatic daily-route summary** — with location permission on, the day's visits
  are compiled for you (low-power OS geofencing preferred over continuous GPS)

## Workspaces · platforms

- All data (events, places) is split into **personal / work** workspaces —
  except the daily summary and unified search, which deliberately span both
- Mobile (iOS · Android): full calendar + map + search + summary
- PC (Windows): a calendar-focused always-on floating widget (frameless, always-on-top)

## Structure

- Flutter · Riverpod, local storage with Drift (SQLite), monorepo (`apps/` + `packages/core·data·ui_kit`)
- Maps: mapbox_maps_flutter + a custom Mapbox Studio style
- Visual: greyscale base with a single accent (personal-workspace blue), Noto Sans KR
- Because the author is new to Flutter, every new structural piece ships with a beginner guide in `docs/guides/`

> In development (Phase 2 — location automation). The daily-summary result screen isn't built yet.
