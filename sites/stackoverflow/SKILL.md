---
name: bowmark-stackoverflow
description: |
  Read Stack Overflow for your agent. Stack Overflow programming questions and answers:
  search questions, then read one question with its accepted and top-voted answers.
  Typed results through Bowmark, tested on a schedule, no Stack Overflow API key. Use
  when the user names Stack Overflow or a link to stackoverflow.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Stack Overflow through Bowmark

1. `get_library({ query: "stackoverflow.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const stackoverflow = bowmark.providers.stackoverflow;
return await stackoverflow.searchQuestions("model context protocol");
```

Public, no sign-in: searchQuestions, getQuestion.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
