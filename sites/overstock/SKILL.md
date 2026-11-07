---
name: bowmark-overstock
description: |
  Read Overstock for your agent. Overstock, the online home goods and rug retailer:
  catalog search with name, price and product link. Typed results through Bowmark,
  tested on a schedule, no Overstock API key. Use when the user names Overstock or a
  link to overstock.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Overstock through Bowmark

1. `get_library({ query: "overstock.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const overstock = bowmark.providers.overstock;
return await overstock.search({ query: "area rug", limit: 3 });
```

Public, no sign-in: search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
