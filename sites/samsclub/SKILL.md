---
name: bowmark-samsclub
description: |
  Read Sam's Club for your agent. Sam's Club (samsclub.com): club-priced product search,
  product detail, club-level stock, club locator, membership plans and more. Typed
  results through Bowmark, tested on a schedule, no Sam's Club API key. Use when the
  user names Sam's Club or a link to samsclub.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Sam's Club through Bowmark

1. `get_library({ query: "samsclub.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const samsclub = bowmark.providers.samsclub;
return await samsclub.search("paper towels");
```

Public, no sign-in: search, getInstantSavings, browseCategory, getFuelPrices, getProduct, checkStock, findClubs, getMembershipPlans.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
