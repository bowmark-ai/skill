---
name: bowmark-ubereats
description: |
  Read Uber Eats for your agent. Uber Eats stores, menus, menu items with
  customizations, delivery availability by address and the nearest location of a chain,
  plus your own orders and cart. Typed results through Bowmark, tested on a schedule, no
  Uber Eats API key. Use when the user names Uber Eats or a link to ubereats.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Uber Eats through Bowmark

1. `get_library({ query: "ubereats.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const ubereats = bowmark.providers.ubereats;
return await ubereats.findAddress({ query: "1 Market St, San Francisco, CA" });
```

Public, no sign-in: search, findAddress, getStore, browseStores, checkDeliveryAvailability, findChainStore, getMenuItem, searchStoreProducts, addToCart, updateCartItem, removeFromCart, clearCart.

Your own Uber Eats account (the run returns a sign-in link the first time): listOrders, getCart, getCheckoutTotal, applyPromoCode, getMyAccount.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
