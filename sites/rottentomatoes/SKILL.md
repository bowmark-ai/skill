---
name: bowmark-rottentomatoes
description: |
  Read Rotten Tomatoes for your agent. Rotten Tomatoes: critic and audience scores for
  movies and TV. Typed results through Bowmark, tested on a schedule, no Rotten Tomatoes
  API key. Use when the user names Rotten Tomatoes or a link to rottentomatoes.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Rotten Tomatoes through Bowmark

1. `get_library({ query: "rottentomatoes.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const rottentomatoes = bowmark.providers.rottentomatoes;
return await rottentomatoes.getTitle("/m/inception");
```

Public, no sign-in: search, getTitle.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
