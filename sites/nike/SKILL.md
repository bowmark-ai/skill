---
name: bowmark-nike
description: |
  Read Nike SNKRS for your agent. Nike SNKRS launch calendar: the sneaker drops coming
  up on nike.com/launch, each with release date and time, draw or first-come, price and
  colourway. Typed results through Bowmark, tested on a schedule, no Nike SNKRS API key.
  Use when the user names Nike SNKRS or a link to nike.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Nike SNKRS through Bowmark

1. `get_library({ query: "nike.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const nike = bowmark.providers.nike;
return await nike.upcomingLaunches("jordan");
```

Public, no sign-in: upcomingLaunches, getLaunch.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
