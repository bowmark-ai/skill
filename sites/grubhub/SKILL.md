---
name: bowmark-grubhub
description: |
  Read Grubhub for your agent. Grubhub food delivery: search restaurants delivering to
  an address (by cuisine, dish or name) with fees, ETAs and ratings, then read a
  restaurant's full menu with prices. Typed results through Bowmark, tested on a
  schedule, no Grubhub API key. Use when the user names Grubhub or a link to
  grubhub.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Grubhub through Bowmark

1. `get_library({ query: "grubhub.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const grubhub = bowmark.providers.grubhub;
return await grubhub.search({ query: "pizza", place: "Union Square, New York, NY" });
```

Public, no sign-in: search, getRestaurant, getMenu, getMenuItem, getDeliveryEstimate, getRestaurantReviews, listCuisines, getPromoOffers, getCart, addToCart, removeFromCart, updateCartItem, applyPromoCode.

Your own Grubhub account (the run returns a sign-in link the first time): getSavedAddresses, getFavoriteRestaurants.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
