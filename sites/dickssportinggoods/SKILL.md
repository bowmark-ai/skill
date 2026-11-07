---
name: bowmark-dickssportinggoods
description: |
  Read DICK'S Sporting Goods for your agent. DICK'S Sporting Goods store locator: stores
  near a place, nearest first, with address, phone, hours, curbside window and in-store
  services. Typed results through Bowmark, tested on a schedule, no DICK'S Sporting
  Goods API key. Use when the user names DICK'S Sporting Goods or a link to
  dickssportinggoods.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# DICK'S Sporting Goods through Bowmark

1. `get_library({ query: "dickssportinggoods.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const dickssportinggoods = bowmark.providers.dickssportinggoods;
return await dickssportinggoods.findStores({ near: "Austin, TX", limit: 3 });
```

Public, no sign-in: findStores.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
