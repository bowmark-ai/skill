---
name: bowmark-etsy
description: |
  Read Etsy for your agent. Search active listings on etsy.com by keyword, read one
  listing, its reviews, a shop and its sales, and browse categories. Typed results through
  Bowmark, tested on a schedule, no Etsy API key. Use when the user names Etsy or a link
  to etsy.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Etsy through Bowmark

1. `get_library({ query: "etsy.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const etsy = bowmark.providers.etsy;
return await etsy.getShop("CaitlynMinimalist");
```

Public, no sign-in: search, getListing, listListingReviews, getShop, listShopListings, listShopReviews, searchShops, getUserProfile, listCategories, browseCategory, suggestSearches, listTrendingSearches, estimateShipping.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
