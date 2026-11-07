---
name: bowmark-deviantart
description: |
  Read DeviantArt for your agent. DeviantArt artwork: search deviations, read one with
  its comments, browse a tag or the Daily Deviations, and pull an artist's profile,
  gallery, favourites and posts. Typed results through Bowmark, tested on a schedule, no
  DeviantArt API key. Use when the user names DeviantArt or a link to deviantart.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# DeviantArt through Bowmark

1. `get_library({ query: "deviantart.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const deviantart = bowmark.providers.deviantart;
return await deviantart.getDailyDeviations({});
```

Public, no sign-in: searchDeviations, getDeviation, getUserProfile, getUserGallery, listGalleryFolders, getUserFavourites, getUserPosts, getDailyDeviations, getRelatedDeviations, searchShop, suggestTags, browseTag, getComments.

Your own DeviantArt account (the run returns a sign-in link the first time): favouriteDeviation, unfavouriteDeviation, postComment, watchUser, unwatchUser, getWatchFeed, sendNote.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
