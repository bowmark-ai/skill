---
name: bowmark-discord
description: |
  Read Discord for your agent. Discord, chat for communities: search and browse the
  public server directory, read a server's page and announcements, resolve an invite,
  trending games, the App Directory and the developer docs. Typed results through
  Bowmark, tested on a schedule, no Discord API key. Use when the user names Discord or
  a link to discord.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Discord through Bowmark

1. `get_library({ query: "discord.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const discord = bowmark.providers.discord;
return await discord.searchServers("python");
```

Public, no sign-in: listDocPages, getDocPage, searchServers, listServerCategories, listServers, getServer, getInvite, listServerAnnouncements, getAnnouncement, listTrendingGames, getGame, listBlogPosts, searchApps, getApp, listAppCategories, listFeaturedApps, listSimilarApps.

Your own Discord account (the run returns a sign-in link the first time): getMyProfile, listMyServers, listMessages, listChannels.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
