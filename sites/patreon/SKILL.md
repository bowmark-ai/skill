---
name: bowmark-patreon
description: |
  Read Patreon for your agent. Reads a Patreon creator's page, tiers, and public posts
  and comments. Typed results through Bowmark, tested on a schedule, no
  Patreon API key. Use when the user names Patreon or a link to patreon.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Patreon through Bowmark

1. `get_library({ query: "patreon.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const patreon = bowmark.providers.patreon;
return await patreon.searchCreators({ query: "podcast" });
```

Public, no sign-in: searchCreators, getCreator, listCreatorTiers, listCreatorPosts, searchCreatorPosts, listCreatorCollections, getPost, listPostComments.

Your own Patreon account (the run returns a sign-in link the first time): listMemberOnlyPosts, listPledges, getCurrentUserFeed, likePost, commentOnPost, followCreator.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
