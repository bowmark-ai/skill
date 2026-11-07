---
name: bowmark-goodreads
description: |
  Read Goodreads for your agent. A social network for book readers: book details and
  ratings, member reviews, curated lists, genre browsing, and (once a caller signs in)
  shelving, rating and reviewing. Typed results through Bowmark, tested on a schedule,
  no Goodreads API key. Use when the user names Goodreads or a link to goodreads.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Goodreads through Bowmark

1. `get_library({ query: "goodreads.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const goodreads = bowmark.providers.goodreads;
return await goodreads.searchBooks("project hail mary");
```

Public, no sign-in: searchBooks, getBook, getBookReviews, listGenreBooks, getList, getAuthor, searchQuotes, getMemberProfile, getMemberShelf.

Your own Goodreads account (the run returns a sign-in link the first time): rateBook, addToShelf, removeFromShelf, getOwnProfile, writeReview, followUser, getNewsFeed.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
