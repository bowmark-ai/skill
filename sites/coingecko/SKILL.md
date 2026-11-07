---
name: bowmark-coingecko
description: |
  Read CoinGecko for your agent. Live cryptocurrency prices in any currency, and coin
  lookup, from CoinGecko. Typed results through Bowmark, tested on a schedule, no
  CoinGecko API key. Use when the user names CoinGecko or a link to coingecko.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# CoinGecko through Bowmark

1. `get_library({ query: "coingecko.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const coingecko = bowmark.providers.coingecko;
return await coingecko.searchCoins("solana");
```

Public, no sign-in: getPrice, searchCoins.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
