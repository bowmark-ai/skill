---
name: bowmark-g2
description: |
  Read G2 for your agent. G2: the world's largest B2B software review marketplace:
  search products, read a product's rating, and list its reviews filtered by stars.
  Typed results through Bowmark, tested on a schedule, no G2 API key. Use when the user
  names G2 or a link to g2.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# G2 through Bowmark

1. `get_library({ query: "g2.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const g2 = bowmark.providers.g2;
return await g2.search({ query: "notion" });
```

Public, no sign-in: search, getProduct, listReviews.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
