---
name: bowmark-google-play
description: |
  Read Google Play for your agent. Read any Android app's Google Play listing: ratings
  and their histogram, downloads, price, developer contact, permissions and the full
  data-safety form, plus its newest reviews with developer replies, in any store language
  and country. Typed results through Bowmark, tested on a schedule, no Google Play API
  key. Use when the user names Google Play or a link to play.google.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Google Play through Bowmark

1. `get_library({ query: "play.google.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const google_play = bowmark.providers.google_play;
return await google_play.getApp({ app: "com.whatsapp" });
```

Public, no sign-in: getApp, listReviews.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
