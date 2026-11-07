---
name: bowmark-ryanair
description: |
  Read Ryanair for your agent. Ryanair's lowest one-way fares: the cheapest
  flight on a route for a day, a month's low-fare calendar, or the cheapest fare to
  every destination from an airport. Typed results through Bowmark, tested on a
  schedule, no Ryanair API key. Use when the user names Ryanair or a
  link to ryanair.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Ryanair through Bowmark

1. `get_library({ query: "ryanair.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const ryanair = bowmark.providers.ryanair;
return await ryanair.searchFares({ from: "STN", to: "BCN" });
```

Public, no sign-in: findAirport, searchFares, fareCalendar.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
