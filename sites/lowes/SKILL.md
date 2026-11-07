---
name: bowmark-lowes
description: |
  Read Lowe's for your agent. Searches Lowe's catalog of tools, hardware, appliances and
  home improvement, with each listing's price, brand, model, item number, rating and
  link. Typed results through Bowmark, tested on a schedule, no Lowe's API key. Use when
  the user names Lowe's or a link to lowes.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Lowe's through Bowmark

1. `get_library({ query: "lowes.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const lowes = bowmark.providers.lowes;
return await lowes.search({ query: "cordless drill", limit: 3 });
```

Public, no sign-in: search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
