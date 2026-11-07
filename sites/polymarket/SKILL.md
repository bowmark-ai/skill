---
name: bowmark-polymarket
description: |
  Read Polymarket for your agent. Polymarket's own prediction markets: search by keyword
  or browse the newest, and read one market's question, live outcome prices, volume and
  status by slug. Typed results through Bowmark, tested on a schedule, no Polymarket API
  key. Use when the user names Polymarket or a link to polymarket.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Polymarket through Bowmark

1. `get_library({ query: "polymarket.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const polymarket = bowmark.providers.polymarket;
return await polymarket.search("bitcoin");
```

Public, no sign-in: search, getMarket.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
