---
name: bowmark-ebay
description: |
  Read eBay for your agent. Live eBay listings: search by keyword, category or seller,
  read one listing, autosuggest and deals, returning title, price, condition, buying
  option, seller and the item's own ebay.com URL. Typed results through Bowmark, tested
  on a schedule, no eBay API key. Use when the user names eBay or a link to ebay.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# eBay through Bowmark

1. `get_library({ query: "ebay.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const ebay = bowmark.providers.ebay;
return await ebay.searchAutocomplete("mechanical keyboard");
```

Public, no sign-in: search, getItem, searchByCategory, getSellerListings, getSellerProfile, searchAutocomplete, getDeals.

Your own eBay account (the run returns a sign-in link the first time): getWatchlist, getMyListings.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
