---
name: bowmark-tripadvisor
description: |
  Read Tripadvisor for your agent. Travel data worldwide: find a city, hotel, restaurant
  or attraction by name. Typed results through Bowmark, tested on a schedule, no
  Tripadvisor API key. Use when the user names Tripadvisor or a link to tripadvisor.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Tripadvisor through Bowmark

1. `get_library({ query: "tripadvisor.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const tripadvisor = bowmark.providers.tripadvisor;
return await tripadvisor.search({ query: "Lisbon" });
```

Public, no sign-in: search, searchHotels, getHotel, getHotelPrices, getRestaurant, searchRestaurants, getAttraction, searchAttractions, getReviews, getDestination, getReview, getQuestions, getPhotos, getNearby.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
