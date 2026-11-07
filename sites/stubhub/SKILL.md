---
name: bowmark-stubhub
description: |
  Read StubHub for your agent. Secondary ticket marketplace for sports, concerts,
  theater and other live events: and viagogo, its international brand, on the same
  inventory. Typed results through Bowmark, tested on a schedule, no StubHub API key.
  Use when the user names StubHub or a link to stubhub.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# StubHub through Bowmark

1. `get_library({ query: "stubhub.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const stubhub = bowmark.providers.stubhub;
return await stubhub.search("hamilton");
```

Public, no sign-in: search, getEventListings, getEvent, listCategories, findPerformers, findVenues, findEventsToSell.

Your own StubHub account (the run returns a sign-in link the first time): getCheckoutHandoff, createListing, listMyOrders, listFavorites.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
