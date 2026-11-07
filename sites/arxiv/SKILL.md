---
name: bowmark-arxiv
description: |
  Read arXiv for your agent. arXiv preprints: search papers by keyword, author, title or
  category, and read one paper's abstract, authors and PDF link. Typed results through
  Bowmark, tested on a schedule, no arXiv API key. Use when the user names arXiv or a
  link to arxiv.org.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# arXiv through Bowmark

1. `get_library({ query: "arxiv.org" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const arxiv = bowmark.providers.arxiv;
return await arxiv.search("ti:transformer AND cat:cs.CL", { sort: "submitted", limit: 5 });
```

Public, no sign-in: search, getPaper.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
