---
name: bowmark-producthunt
description: |
  Read Product Hunt for your agent. Product Hunt: the latest product launches (name,
  tagline, Product Hunt page, website link, hunter, launch time), optionally filtered by
  keyword. Typed results through Bowmark, tested on a schedule, no Product Hunt API key.
  Use when the user names Product Hunt or a link to producthunt.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Product Hunt through Bowmark

1. `get_library({ query: "producthunt.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const producthunt = bowmark.providers.producthunt;
return await producthunt.listLaunches();
```

Public, no sign-in: listLaunches.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
