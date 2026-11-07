---
name: bowmark-eventbrite
description: |
  Read Eventbrite for your agent. Search local or online events by city, date and
  category, then read an event's details, ticket prices, venue and organizer. Typed results through Bowmark, tested on a schedule, no Eventbrite API key.
  Use when the user names Eventbrite or a link to eventbrite.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Eventbrite through Bowmark

1. `get_library({ query: "eventbrite.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const eventbrite = bowmark.providers.eventbrite;
return await eventbrite.searchEvents({ location: "San Francisco, CA", category: "technology" });
```

Public, no sign-in: searchEvents, getEvent, getVenue, getOrganizer, listTicketClasses.

Your own Eventbrite account (the run returns a sign-in link the first time): getSavedEvents, saveEvent, unsaveEvent, followOrganizer, getOrderHistory, getOwnProfile, registerForEvent.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
