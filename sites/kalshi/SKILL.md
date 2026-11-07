---
name: bowmark-kalshi
description: |
  Read Kalshi for your agent. List live prediction-market contracts and filter by
  status, series or event, then read one market by ticker: yes/no prices, last price,
  volume, open interest, close time and settlement rules. Typed results through Bowmark, tested on a schedule, no Kalshi API key. Use when the user names
  Kalshi or a link to kalshi.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Kalshi through Bowmark

1. `get_library({ query: "kalshi.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const kalshi = bowmark.providers.kalshi;
return await kalshi.getMarkets({ status: "open", limit: 5 });
```

Public, no sign-in: getMarkets, getMarket.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
