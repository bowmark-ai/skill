---
name: bowmark-amazon
description: |
  Read Amazon for your agent. Search Amazon's catalogue and read a product the way a
  shopper does: price, stock, rating, the customer reviews, the other products it
  recommends, every size and colour the listing sells. Typed results through Bowmark,
  tested on a schedule, no Amazon API key. Use when the user names Amazon or a link to
  www.amazon.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Amazon through Bowmark

1. `get_library({ query: "www.amazon.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const amazon = bowmark.providers.amazon;
return await amazon.getProduct("B0BSHF7WHW");
```

Public, no sign-in: searchProducts, searchWholeFoods, listCategoryProducts, suggestKeywords, listBestSellerCategories, getProduct, listVariations, listReviews, listRelatedProducts, listBestSellers, listNewReleases, listDeals, getSeller, getDeliveryEstimate, listSellerOffers, getCart, addToCart.

Your own Amazon account (the run returns a sign-in link the first time): listOrders.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
