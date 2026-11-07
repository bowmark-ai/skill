---
name: bowmark-target
description: |
  Read Target for your agent. Big-box general merchandise: search, product detail, store
  stock and store lookup on target.com. Typed results through Bowmark, tested on a
  schedule, no Target API key. Use when the user names Target or a link to target.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Target through Bowmark

1. `get_library({ query: "target.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const target = bowmark.providers.target;
return await target.search({ query: "air fryer", limit: 3 });
```

Public, no sign-in: search, getProduct, checkStock, findStore, listCategories, listCategoryProducts, listDeals, reviewPhotos, listReviews, listQuestions, getRegistry.

Your own Target account (the run returns a sign-in link the first time): listOrders, listWishlists, getCart, addToCart, removeFromCart, addToList, writeReview.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
