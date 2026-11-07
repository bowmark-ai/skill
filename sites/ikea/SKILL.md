---
name: bowmark-ikea
description: |
  Read IKEA for your agent. IKEA's US store: search the catalogue, read a product's
  price, dimensions and assembly PDFs, check stock at each store, find stores, and
  manage a cart. Typed results through Bowmark, tested on a schedule, no IKEA API key.
  Use when the user names IKEA or a link to ikea.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# IKEA through Bowmark

1. `get_library({ query: "ikea.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const ikea = bowmark.providers.ikea;
return await ikea.searchProducts({ query: "billy bookcase" });
```

Public, no sign-in: searchProducts, suggestSearchTerms, getProduct, getProductRatings, getProductDocuments, findStores, getProductAvailability, getDeliveryOptions, lookupOrder, listCategories, listCategoryProducts, listOffers, listNewProducts, listInspiration, addToCart, getCart, updateCartItem, removeFromCart, addToFavorites, listFavorites, removeFromFavorites.

Your own IKEA account (the run returns a sign-in link the first time): getProfile, listPurchases, getPurchase.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
