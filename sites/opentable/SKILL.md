---
name: bowmark-opentable
description: |
  Read OpenTable for your agent. Restaurant search, real-time table availability and
  booking on OpenTable: find restaurants by name, cuisine or place, read the open times
  for a date, time and party size, book one as a guest with the diner's name. Typed
  results through Bowmark, tested on a schedule, no OpenTable API key. Use when the user
  names OpenTable or a link to opentable.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# OpenTable through Bowmark

1. `get_library({ query: "opentable.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const opentable = bowmark.providers.opentable;
return await opentable.search("italian in Chicago");
```

Public, no sign-in: search, checkAvailability, startBooking, confirmBooking, cancelBooking, getBooking.

Your own OpenTable account (the run returns a sign-in link the first time): listMyReservations.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
