---
name: bowmark-resy
description: |
  Read Resy for your agent. Restaurant search, real-time table availability and booking
  on Resy: venue lookup by name, open slots for a date and party size, and booking one
  for a diner who has a Resy account (Resy texts them a code to confirm), then
  cancelling it. Typed results through Bowmark, tested on a schedule, no Resy API key.
  Use when the user names Resy or a link to resy.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Resy through Bowmark

1. `get_library({ query: "resy.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const resy = bowmark.providers.resy;
return await resy.search("sushi in New York");
```

Public, no sign-in: search, checkAvailability.

For a diner with a Resy account (Resy texts them a code to confirm): startBooking, confirmBooking, cancelBooking, startSignIn, confirmSignIn, listBookings.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
