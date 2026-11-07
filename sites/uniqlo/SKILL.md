---
name: bowmark-uniqlo
description: |
  Read Uniqlo for your agent. Uniqlo clothing store, US (uniqlo.com/us, USD) or Canada
  (uniqlo.com/ca, CAD) via country. Typed results through Bowmark, tested on a schedule,
  no Uniqlo API key. Use when the user names Uniqlo or a link to uniqlo.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Uniqlo through Bowmark

1. `get_library({ query: "uniqlo.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const uniqlo = bowmark.providers.uniqlo;
return await uniqlo.searchProducts({ query: "heattech", limit: 5 });
```

Public, no sign-in: searchProducts, getProduct.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
