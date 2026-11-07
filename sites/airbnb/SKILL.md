---
name: bowmark-airbnb
description: |
  Read Airbnb for your agent. Airbnb's own stays search: a location, optional dates and
  guest counts in, priced listing rows (title, rating, review count, display price,
  photo, url) out, plus one known listing's nightly rate. Typed results through Bowmark,
  tested on a schedule, no Airbnb API key. Use when the user names Airbnb or a link to
  airbnb.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Airbnb through Bowmark

1. `get_library({ query: "airbnb.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const airbnb = bowmark.providers.airbnb;
return await airbnb.search({ location: "Lisbon, Portugal" });
```

Public, no sign-in: search, getListing.

Your own Airbnb account (the run returns a sign-in link the first time): listTrips.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
