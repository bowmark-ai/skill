---
name: bowmark-instacart
description: |
  Read Instacart for your agent. Instacart grocery delivery: find the stores that
  deliver to a ZIP, search one store or compare a product's price across every nearby
  store, read products, deals, departments, weekly ads, store hours and delivery
  estimates. Typed results through Bowmark, tested on a schedule, no Instacart API key.
  Use when the user names Instacart or a link to instacart.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Instacart through Bowmark

1. `get_library({ query: "instacart.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const instacart = bowmark.providers.instacart;
return await instacart.findLocation("10001");
```

Public, no sign-in: findLocation, listStores, getStore, compareStores, getProduct, listDeals, listDepartments, listDepartmentProducts, getDeliveryEstimate, suggestSearches, getWeeklyAd, getStoreHours.

Your own Instacart account (the run returns a sign-in link the first time): listOrders.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
