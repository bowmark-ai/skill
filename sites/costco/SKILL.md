---
name: bowmark-costco
description: |
  Read Costco for your agent. Costco's discounted gift cards with brand, face value,
  member price and savings, plus the search suggestions Costco shows for a typed term.
  Typed results through Bowmark, tested on a schedule, no Costco API key. Use when the
  user names Costco or a link to costco.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Costco through Bowmark

1. `get_library({ query: "costco.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const costco = bowmark.providers.costco;
return await costco.listGiftCards({ query: "restaurant", limit: 3 });
```

Public, no sign-in: search, listGiftCards.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
