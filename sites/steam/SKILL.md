---
name: bowmark-steam
description: |
  Read Steam for your agent. Steam's PC game store (steampowered.com): game search,
  store pages, reviews, news and the community market. Typed results through Bowmark,
  tested on a schedule, no Steam API key. Use when the user names Steam or a link to
  steampowered.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Steam through Bowmark

1. `get_library({ query: "steampowered.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const steam = bowmark.providers.steam;
return await steam.getGameDetails({ appid: 620 });
```

Public, no sign-in: searchGames, getGameDetails, listFeaturedGames, listGamesByCategory, getGameReviews, getGameScreenshots, getGameVideos, getGameStats, listNews, getNewsItem, searchNews, listGameTags, getAchievements, getProfile, viewInventory.

Your own Steam account (the run returns a sign-in link the first time): addToWishlist, removeFromWishlist, getWishlist, getLibrary, editProfile, viewFriends, addFriend, removeFriend.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
