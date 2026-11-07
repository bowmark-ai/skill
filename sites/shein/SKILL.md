---
name: bowmark-shein
description: |
  Read Shein for your agent. Shein: search, categories and products with prices and
  every size variant. Typed results through Bowmark, tested on a schedule, no Shein API
  key. Use when the user names Shein or a link to shein.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Shein through Bowmark

1. `get_library({ query: "shein.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const shein = bowmark.providers.shein;
return await shein.search({ query: "linen dress" });
```

Public, no sign-in: listCategories, search, listProductsByCategory, getProduct.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
