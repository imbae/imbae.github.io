---
title: Air Vehicle Test Equipment (AVTE)
projectSlug: air-vehicle-test-equipment
description: Software for K4586 ICD-based automated ground testing of an air vehicle.
---

Software for equipment that automates ground checks of an air vehicle. It is a
defense project, so no details are published here — only the technical scope I
owned.

## K4586 ICD

The core of the work was implementing a message interface based on the
**K4586 ICD** (a Korean defense standard).

- Designed a **message generator** (`K4586ObjectGenerator`) that turns the ICD
  definition into code — describe fields, resolution and bit alignment as
  attributes and get serialization/deserialization code out
- Parsers/builders per message set: EGI init, presets, ground-relative states,
  meteorological data, subsystem BIT results, and more
- Multicast UDP with separate TC (command), TM (telemetry) and video channels

## Check automation

- Runs check sequences in order and evaluates results; items include IBIT,
  EO/IR and CCD video confirmation
- Generates check reports and keeps a history

## Stack

WPF · C# · .NET 8 · K4586 ICD · Multicast UDP
