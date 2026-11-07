---
name: bowmark-agoda
description: |
  Read Agoda for your agent. Agoda hotel search: live hotel rates (cheapest room per
  night), star rating and review score for a city and dates. Typed results through
  Bowmark, tested on a schedule, no Agoda API key. Use when the user names Agoda or a
  link to agoda.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Agoda through Bowmark

1. `get_library({ query: "agoda.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const agoda = bowmark.providers.agoda;
return await agoda.findDestinations({ query: "Bangkok" });
```

Public, no sign-in: findDestinations, searchHotels.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
