---
name: bowmark-letterboxd
description: |
  Read Letterboxd for your agent. The social network for film: read a film's page with
  its directors and cast, and any member's films and diary. Typed results through
  Bowmark, tested on a schedule, no Letterboxd API key. Use when the user names
  Letterboxd or a link to letterboxd.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Letterboxd through Bowmark

1. `get_library({ query: "letterboxd.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const letterboxd = bowmark.providers.letterboxd;
return await letterboxd.film({ slug: "parasite-2019" });
```

Public, no sign-in: film, memberFilms, memberDiary.

Your own Letterboxd account (the run returns a sign-in link the first time): getOwnAccount.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
