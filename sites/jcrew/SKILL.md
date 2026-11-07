---
name: bowmark-jcrew
description: |
  Read J.Crew for your agent. Search and read J.Crew's clothing catalogue (products,
  prices, colours, sizes and stock) with no account. Typed results through Bowmark,
  tested on a schedule, no J.Crew API key. Use when the user names J.Crew or a link to
  jcrew.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# J.Crew through Bowmark

1. `get_library({ query: "jcrew.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const jcrew = bowmark.providers.jcrew;
return await jcrew.searchProducts({ query: "oxford shirt" });
```

Public, no sign-in: listCategories, searchProducts, browseCategory, getProduct, getProducts, checkVariantStock, suggestSearchTerms, getCategory, listSearchRefinements, listSortOptions, findStores, listProductReviews.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
