---
name: bowmark-luma
description: |
  Read Luma for your agent. Luma (lu.ma) events: read one event's date, time, venue,
  price, spots remaining and RSVP registration questions (to draft an application before
  registering), or discover upcoming events in a city by day and topic (AI, tech,
  crypto, arts). Typed results through Bowmark, tested on a schedule, no Luma API key.
  Use when the user names Luma or a link to luma.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Luma through Bowmark

1. `get_library({ query: "luma.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const luma = bowmark.providers.luma;
return await luma.discoverEvents({ place: "sf", category: "ai" });
```

Public, no sign-in: getEvent, discoverEvents, listCalendarEvents, listPlaces, listCategories.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
