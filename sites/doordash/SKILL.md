---
name: bowmark-doordash
description: |
  Read DoorDash for your agent. Search DoorDash for real, currently listed stores for a
  free-text query with the delivery fee, rating and ETA DoorDash itself advertises on
  the results card. Typed results through Bowmark, tested on a schedule, no DoorDash API
  key. Use when the user names DoorDash or a link to doordash.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# DoorDash through Bowmark

1. `get_library({ query: "doordash.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const doordash = bowmark.providers.doordash;
return await doordash.browseStores({ city: "Austin, TX" });
```

Public, no sign-in: findAddress, search, getStore, getMenu, getMenuItem, browseStores, listCuisines, searchDishes.

Your own DoorDash account (the run returns a sign-in link the first time): listOrders.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
