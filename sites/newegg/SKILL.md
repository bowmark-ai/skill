---
name: bowmark-newegg
description: |
  Read Newegg for your agent. Live product search over Newegg's catalog, cheapest
  matching item first, plus one product's specs and stock. Typed results through
  Bowmark, tested on a schedule, no Newegg API key. Use when the user names Newegg or a
  link to newegg.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Newegg through Bowmark

1. `get_library({ query: "newegg.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const newegg = bowmark.providers.newegg;
return await newegg.search("RTX 4070 Super");
```

Public, no sign-in: search, getProduct, checkStock.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
