---
name: bowmark-huggingface
description: |
  Read Hugging Face for your agent. Hugging Face (huggingface.co): the trending models
  on the Hub right now, keyword search over every public model (by name, author or task,
  sorted by trending, downloads or likes), and one model's details: task, library,
  license, likes. Typed results through Bowmark, tested on a schedule, no Hugging Face
  API key. Use when the user names Hugging Face or a link to huggingface.co.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Hugging Face through Bowmark

1. `get_library({ query: "huggingface.co" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const huggingface = bowmark.providers.huggingface;
return await huggingface.searchModels("text-to-speech");
```

Public, no sign-in: listTrendingModels, searchModels, getModel.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
