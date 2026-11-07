---
name: bowmark-hackernews
description: |
  Read Hacker News for your agent. Hacker News (news.ycombinator.com): the current top /
  new / best / Ask HN / Show HN / job stories with title, link, points and comment
  count, one item (story or comment) by id. Typed results through Bowmark, tested on a
  schedule, no Hacker News API key. Use when the user names Hacker News or a link to
  news.ycombinator.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Hacker News through Bowmark

1. `get_library({ query: "news.ycombinator.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const hackernews = bowmark.providers.hackernews;
return await hackernews.search("model context protocol");
```

Public, no sign-in: topStories, getItem, search, searchComments.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
