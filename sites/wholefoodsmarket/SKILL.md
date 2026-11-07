---
name: bowmark-wholefoodsmarket
description: |
  Read Whole Foods for your agent. Searches the Whole Foods catalog by product or
  category, with price, unit price, brand and availability. Typed results through
  Bowmark, tested on a schedule, no Whole Foods API key. Use when the user names Whole
  Foods or a link to wholefoodsmarket.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Whole Foods through Bowmark

1. `get_library({ query: "wholefoodsmarket.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const wholefoodsmarket = bowmark.providers.wholefoodsmarket;
return await wholefoodsmarket.search("organic apples");
```

Public, no sign-in: search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
