---
name: bowmark-kohls
description: |
  Read Kohl's for your agent. Searches Kohl's catalog of apparel, shoes, home, bedding,
  bath, kitchen and toys, with each listing's regular, sale and Kohl's "Your Price",
  rating, review count, colors and link. Typed results through Bowmark, tested on a
  schedule, no Kohl's API key. Use when the user names Kohl's or a link to kohls.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Kohl's through Bowmark

1. `get_library({ query: "kohls.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const kohls = bowmark.providers.kohls;
return await kohls.search({ query: "bath towels", limit: 3 });
```

Public, no sign-in: search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
