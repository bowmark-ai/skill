---
name: bowmark-yelp
description: |
  Read Yelp for your agent. Yelp's own business search: returns real, currently-listed
  businesses for a search term and location with Yelp's own star rating, review count,
  price tier and neighborhood. Typed results through Bowmark, tested on a schedule, no
  Yelp API key. Use when the user names Yelp or a link to yelp.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Yelp through Bowmark

1. `get_library({ query: "yelp.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const yelp = bowmark.providers.yelp;
return await yelp.getBusiness("tartine-bakery-san-francisco");
```

Public, no sign-in: search, getBusiness, suggest, getReviews, getMenu.

Your own Yelp account (the run returns a sign-in link the first time): getBookmarks.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
