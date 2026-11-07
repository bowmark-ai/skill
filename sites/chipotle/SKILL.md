---
name: bowmark-chipotle
description: |
  Read Chipotle for your agent. Chipotle's burrito-bowl builder: every protein with its
  full rice, beans, salsa and topping list. Typed results through Bowmark, tested on a
  schedule, no Chipotle API key. Use when the user names Chipotle or a link to
  chipotle.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Chipotle through Bowmark

1. `get_library({ query: "chipotle.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const chipotle = bowmark.providers.chipotle;
return await chipotle.getBowlBuilder();
```

Public, no sign-in: getBowlBuilder.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
