---
name: bowmark-marriott
description: |
  Read Marriott for your agent. Lists Marriott hotels by US state or country, with brand
  and property page. Typed results through Bowmark, tested on a schedule, no Marriott
  API key. Use when the user names Marriott or a link to marriott.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Marriott through Bowmark

1. `get_library({ query: "marriott.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const marriott = bowmark.providers.marriott;
return await marriott.findHotels({ place: "Maryland", query: "Baltimore" });
```

Public, no sign-in: findHotels.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
