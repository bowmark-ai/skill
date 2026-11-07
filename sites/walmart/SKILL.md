---
name: bowmark-walmart
description: |
  Read Walmart for your agent. Walmart.com: product search, product detail, store-level
  stock, store locator and more. Typed results through Bowmark, tested on a schedule, no
  Walmart API key. Use when the user names Walmart or a link to walmart.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Walmart through Bowmark

1. `get_library({ query: "walmart.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const walmart = bowmark.providers.walmart;
return await walmart.listDeals();
```

Public, no sign-in: search, listDepartments, browseCategory, browseBrand, listDeals, suggestSearches, listReviews, listSellerOffers, getProduct, getSeller, getStore.

Your own Walmart account (the run returns a sign-in link the first time): getAccountProfile, listOrders, getOrder, listPurchasedItems, listLists, getList, createList, addToList, removeFromList, getCart, addToCart, updateCartItem, removeFromCart, setPreferredStore, getPickupDeliverySlots, updateProfile, listAddresses.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
