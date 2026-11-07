---
name: bowmark-devto
description: |
  Read DEV Community for your agent. DEV Community's public articles and member
  profiles: list recent or tag-filtered articles, then look up an author profile. Typed
  results through Bowmark, tested on a schedule, no DEV Community API key. Use when the
  user names DEV Community or a link to dev.to.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# DEV Community through Bowmark

1. `get_library({ query: "dev.to" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const devto = bowmark.providers.devto;
return await devto.searchArticles({ tag: "mcp" });
```

Public, no sign-in: searchArticles, getProfile.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
