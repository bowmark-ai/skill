---
name: bowmark-gap
description: |
  Read Gap for your agent. Gap (www.gap.com, and the Canadian store www.gapcanada.ca)
  clothing store. Typed results through Bowmark, tested on a schedule, no Gap API key.
  Use when the user names Gap or a link to www.gap.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Gap through Bowmark

1. `get_library({ query: "www.gap.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const gap = bowmark.providers.gap;
return await gap.searchProducts({ query: "denim jacket", limit: 5 });
```

Public, no sign-in: searchProducts, getProduct.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
