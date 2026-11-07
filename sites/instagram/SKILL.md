---
name: bowmark-instagram
description: |
  Read Instagram for your agent. Reads public Instagram (instagram.com) without a login:
  a profile with its bio, links, follower and following counts and twelve latest posts.
  Typed results through Bowmark, tested on a schedule, no Instagram API key. Use when
  the user names Instagram or a link to instagram.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Instagram through Bowmark

1. `get_library({ query: "instagram.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const instagram = bowmark.providers.instagram;
return await instagram.getProfile("natgeo");
```

Public, no sign-in: getProfile, getPosts, getPost, getFeed.

Your own Instagram account (the run returns a sign-in link the first time): searchAccounts, getHomeFeed, getSavedPosts, getDirectMessages, getThreadMessages, getStories, getNotifications, sendDirectMessage, followUser, unfollowUser, likePost, unlikePost, commentOnPost, savePost, unsavePost, blockUser, unblockUser, muteUser, unmuteUser, updateProfile.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
