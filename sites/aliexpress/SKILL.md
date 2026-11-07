---
name: bowmark-aliexpress
description: |
  Read AliExpress for your agent. AliExpress product search: a keyword in, priced
  product rows out. Typed results through Bowmark, tested on a schedule, no AliExpress
  API key. Use when the user names AliExpress or a link to aliexpress.us.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# AliExpress through Bowmark

1. `get_library({ query: "aliexpress.us" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const aliexpress = bowmark.providers.aliexpress;
return await aliexpress.search({ query: "usb c cable" });
```

Public, no sign-in: search, getProduct, getStore, listCategories.

Your own AliExpress account (the run returns a sign-in link the first time): listCart, addToCart, listOrders, listWishlist.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
