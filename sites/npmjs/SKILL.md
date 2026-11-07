---
name: bowmark-npmjs
description: |
  Read npm for your agent. npm: find published packages by keyword with their current
  version and weekly downloads, or read daily, weekly or monthly download totals for one
  package. Typed results through Bowmark,
  tested on a schedule, no npm API key. Use when the user names npm or a link to
  npmjs.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# npm through Bowmark

1. `get_library({ query: "npmjs.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const npmjs = bowmark.providers.npmjs;
return await npmjs.getDownloads("react");
```

Public, no sign-in: getDownloads, search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
