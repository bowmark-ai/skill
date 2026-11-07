---
name: bowmark-apple
description: |
  Read Apple for your agent. Search apple.com, read product pages, prices and
  configurations, compare models, list refurbished stock, trade-in values, stores and
  support articles. Typed results through Bowmark, tested on a schedule, no Apple API
  key. Use when the user names Apple or a link to apple.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Apple through Bowmark

1. `get_library({ query: "apple.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const apple = bowmark.providers.apple;
return await apple.listFamilyModels("mac");
```

Public, no sign-in: search, suggestSearches, getProduct, getProductByPartNumber, getConfigurationOptions, getPurchaseOptions, compareModels, listFamilyModels, listRefurbished, listAccessories, getTradeInEstimate, listTradeInValues, searchSupport, getSupportArticle, resolveLocation, findStoresNear, getPickupAvailability, getDeliveryEstimate, listStores, getStore, listTodaySessions, listNewsroomPosts, getNewsroomPost, getSystemStatus, getRepairPricing, checkCoverage, addToBag, getBag, removeFromBag.

Your own Apple account (the run returns a sign-in link the first time): getOrderStatus, listOrders, bookGeniusBarAppointment.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
