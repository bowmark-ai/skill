---
name: bowmark-imdb
description: |
  Read IMDb for your agent. IMDb: the movie and TV database. Typed results through
  Bowmark, tested on a schedule, no IMDb API key. Use when the user names IMDb or a link
  to imdb.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# IMDb through Bowmark

1. `get_library({ query: "imdb.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const imdb = bowmark.providers.imdb;
return await imdb.getTitle("tt1375666");
```

Public, no sign-in: search, searchTitles, searchSuggestions, getTitle, getPerson, getTitleReviews.

Your own IMDb account (the run returns a sign-in link the first time): listWatchlist, listRatings, listCustomLists.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
