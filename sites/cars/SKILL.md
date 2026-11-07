---
name: bowmark-cars
description: |
  Read Cars.com for your agent. The US marketplace for new, used and certified cars:
  for-sale inventory with dealer asking prices, one listing's full detail, and per-model
  research (trims, specs, expert and owner reviews). Typed results through Bowmark,
  tested on a schedule, no Cars.com API key. Use when the user names Cars.com or a link
  to cars.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Cars.com through Bowmark

1. `get_library({ query: "cars.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const cars = bowmark.providers.cars;
return await cars.search({ zipCode: "94105", make: "toyota", model: "rav4", stockType: "used", pageSize: 3 });
```

Public, no sign-in: search, getListing, getModelResearch.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
