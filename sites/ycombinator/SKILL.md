---
name: bowmark-ycombinator
description: |
  Read Y Combinator for your agent: search and read the Startup Library and the YC blog
  (applying, interviews, fundraising, pitching, growth). Typed results through Bowmark, tested on a
  schedule, no Y Combinator API key. Use when the user names Y Combinator or a link to
  ycombinator.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Y Combinator through Bowmark

1. `get_library({ query: "ycombinator.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const ycombinator = bowmark.providers.ycombinator;
return await ycombinator.search("how to apply");
```

Public, no sign-in: getArticle, getBlogPost, search.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
