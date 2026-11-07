---
name: bowmark-mercari
description: |
  Read Mercari for your agent. Mercari, the peer-to-peer resale marketplace (clothing,
  electronics, collectibles): keyword search over live listings with real, current
  prices. Typed results through Bowmark, tested on a schedule, no Mercari API key. Use
  when the user names Mercari or a link to mercari.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Mercari through Bowmark

1. `get_library({ query: "mercari.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const mercari = bowmark.providers.mercari;
return await mercari.search({ query: "nintendo switch", limit: 3 });
```

Public, no sign-in: search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
