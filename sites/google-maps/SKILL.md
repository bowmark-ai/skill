---
name: bowmark-google-maps
description: |
  Read Google Maps for your agent. Local business search on Google Maps: find places by
  what a person would say, then read the address, hours, rating, reviews, photos,
  co-located tenants and route. Typed results through Bowmark, tested on a schedule, no
  Google Maps API key. Use when the user names Google Maps or a link to google.com/maps.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Google Maps through Bowmark

1. `get_library({ query: "google.com/maps" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const google_maps = bowmark.providers.google_maps;
return await google_maps.searchPlaces({ query: "coffee shops in Seattle WA" });
```

Public, no sign-in: suggestPlaces, searchPlaces, searchNearby, geocodeAddress, reverseGeocode, getPlace, listReviews, listRelatedPlaces, getDirections, resolvePlaceUrl, listPhotos.

Your own Google Maps account (the run returns a sign-in link the first time): getPopularTimes, listSavedPlaces, listMyContributions, savePlace.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
