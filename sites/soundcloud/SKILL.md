---
name: bowmark-soundcloud
description: |
  Read SoundCloud for your agent. SoundCloud (soundcloud.com): live track search over
  SoundCloud's own catalogue, reading one track URL back to its full detail (artwork,
  description, genre, release date, label). Typed results through Bowmark, tested on a
  schedule, no SoundCloud API key. Use when the user names SoundCloud or a link to
  soundcloud.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# SoundCloud through Bowmark

1. `get_library({ query: "soundcloud.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const soundcloud = bowmark.providers.soundcloud;
return await soundcloud.search("aphex twin", 3);
```

Public, no sign-in: search, getTrack, getPlaylist.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
