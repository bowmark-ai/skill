---
name: bowmark-expedia
description: |
  Read Expedia for your agent. Expedia hotel search: the hotels Expedia lists for a
  destination and dates, each with its total price for the stay, nightly price, guest
  rating, review count, amenities and Expedia link. Typed results through Bowmark,
  tested on a schedule, no Expedia API key. Use when the user names Expedia or a link to
  expedia.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Expedia through Bowmark

1. `get_library({ query: "expedia.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const expedia = bowmark.providers.expedia;
return await expedia.searchHotels({ destination: "Lisbon, Portugal", limit: 3 });
```

Public, no sign-in: searchHotels.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
