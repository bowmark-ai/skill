---
name: bowmark-booking-com
description: |
  Read Booking.com for your agent. Global online travel reservation service with
  property search, reviews and booking management. Typed results through Bowmark, tested
  on a schedule, no Booking.com API key. Use when the user names Booking.com or a link
  to booking.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Booking.com through Bowmark

1. `get_library({ query: "booking.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const booking_com = bowmark.providers.booking_com;
return await booking_com.autocompleteDestination({ query: "Lisbon" });
```

Public, no sign-in: autocompleteDestination, search, getProperty, listAvailability, checkPrice, listPropertyReviews, listFilterOptions, listPropertyPhotos, getReviewBreakdown.

Your own Booking.com account (the run returns a sign-in link the first time): listBookings, getBooking, listWishlist, getAccountProfile.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
