---
title: PortSight
projectSlug: portsight
description: A portfolio-analysis and strategy app for real stock investors (Flutter). Feature overview.
---

A Flutter app aimed at being **a tool real investors use today**, not a paper-trading
sandbox. Enter your holdings and it flows from indicator analysis to account-type
strategy, tax and dividend math, and rebalancing. No login — data is stored
locally (Drift/SQLite).

## Features

### Portfolio management
- Holdings CRUD (ticker, quantity, cost, buy date); average-cost recalculation on add; partial sells
- Account types: domestic / overseas / ISA / pension savings / IRP / gold
- Per-account contribution-limit tracker (ISA ₩20M, IRP ₩9M/yr, …)

### Portfolio analysis
- Batch technical-indicator analysis of holdings (RSI · MACD · Bollinger · ATR · OBV)
- Sector / asset-class allocation charts; return vs benchmark (KOSPI · S&P 500)
- FX gain/loss split for overseas accounts; net-worth trend graph
- Health score (diversification · tax efficiency · risk, graded S–D)

### Strategy suggestions
- Strategy by account type (ISA → dividend/growth ETFs, IRP → bond allocation, …)
- Per-holding action hints (add / hold / trim / review stop-loss)
- [Holdings | Analysis | Strategy] unified in the portfolio tab, with an AI summary and a detail-signal bottom sheet

### Tax
- Overseas capital-gains tax with the annual ₩2.5M exemption tracked; loss-harvesting simulator
- ISA / IRP tax-benefit calculation; annual tax report

### Dividends
- Per-holding dividend history and projected annual income; ex-dividend calendar for your holdings
- Dividend-reinvestment compounding simulation; ISA tax-free dividend flag

### Rebalancing
- Set a target allocation → visualize current vs target → generate an action plan

## Under the hood

- Flutter 3.41 / Dart 3.11, Riverpod 2.x, Clean Architecture (Domain/Data/Presentation)
- Local DB with Drift; routing with go_router
- Python FastAPI backend (yfinance · FinanceDataReader) for quotes, dividends, news, earnings, macro data
- Money math uses a fixed-point rounding pattern (`(x*100).round()/100`)
- AI, tax and dividend figures always carry a "for reference only — your decision" disclaimer

> Quotes can be delayed 15+ minutes on free APIs, and tax/dividend numbers are estimates.
