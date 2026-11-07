---
name: bowmark-temu
description: |
  Read Temu for your agent. Shop Temu: its shopping categories, plus the signed-in
  caller's cart and live checkout total. Typed results through Bowmark, tested on a
  schedule, no Temu API key. Use when the user names Temu or a link to www.temu.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Temu through Bowmark

1. `get_library({ query: "www.temu.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const temu = bowmark.providers.temu;
return await temu.listCategories();
```

Public, no sign-in: listCategories.

Your own Temu account (the run returns a sign-in link the first time): viewCart, checkout.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
