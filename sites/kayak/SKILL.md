---
name: bowmark-kayak
description: |
  Read Kayak for your agent. Kayak (kayak.com): flight, hotel and rental car results
  across sellers, cheapest first. Typed results through Bowmark, tested on a schedule,
  no Kayak API key. Use when the user names Kayak or a link to kayak.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Kayak through Bowmark

1. `get_library({ query: "kayak.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const kayak = bowmark.providers.kayak;
return await kayak.search({ from: "SFO", to: "JFK", depart: "2026-12-10", stops: "nonstop" });
```

Public, no sign-in: search, getBookingOptions, searchHotels, searchCars.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
