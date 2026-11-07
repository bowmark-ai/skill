---
name: bowmark-pizzahut
description: |
  Read Pizza Hut for your agent. Find the US stores serving an address or ZIP, read a
  store's full menu with prices, and price a basket with tax and fees without placing
  it. Typed results through Bowmark, tested on a schedule, no Pizza Hut API key. Use when the user names Pizza Hut
  or a link to pizzahut.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Pizza Hut through Bowmark

1. `get_library({ query: "pizzahut.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const pizzahut = bowmark.providers.pizzahut;
return await pizzahut.findStores("90210", { limit: 3 });
```

Public, no sign-in: findStores, getMenu, getMenuItem, priceOrder.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
