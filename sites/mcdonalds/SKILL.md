---
name: bowmark-mcdonalds
description: |
  Read McDonald's for your agent. Read the McDonald's menu by category, one item's full
  detail, and find the restaurants near a ZIP or a point. Typed results through
  Bowmark, tested on a schedule, no McDonald's API key. Use when the user names
  McDonald's or a link to mcdonalds.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# McDonald's through Bowmark

1. `get_library({ query: "mcdonalds.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const mcdonalds = bowmark.providers.mcdonalds;
return await mcdonalds.findStores({ zip: "60601" });
```

Public, no sign-in: getMenu, getMenuItem, findStores.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
