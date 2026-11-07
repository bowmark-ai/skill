---
name: bowmark-seatgeek
description: |
  Read SeatGeek for your agent. A ticket marketplace for sports, concerts, comedy and
  theater: event search, performer and venue lookup, and price stats. Typed results through Bowmark, tested on a
  schedule, no SeatGeek API key. Use when the user names SeatGeek or a link to
  seatgeek.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# SeatGeek through Bowmark

1. `get_library({ query: "seatgeek.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const seatgeek = bowmark.providers.seatgeek;
return await seatgeek.searchEvents({ q: "hamilton" });
```

Public, no sign-in: searchEvents, findPerformers, findVenues, getEvent, getPerformer, getVenue, listTaxonomies.

Your own SeatGeek account (the run returns a sign-in link the first time): listTrackedEvents, trackEvent, untrackEvent, listFollowedPerformers, followPerformer, unfollowPerformer, listMyOrders, getOrder.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
