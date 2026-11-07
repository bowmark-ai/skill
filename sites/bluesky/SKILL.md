---
name: bowmark-bluesky
description: |
  Read Bluesky for your agent. Bluesky: look people up, read their profiles and posts,
  open whole threads, search posts, read custom feeds, lists, starter packs and what is
  trending, and (signed in as yourself) read your timeline, notifications and DMs, post,
  reply. Typed results through Bowmark, tested on a schedule, no Bluesky API key. Use
  when the user names Bluesky or a link to bsky.app.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Bluesky through Bowmark

1. `get_library({ query: "bsky.app" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const bluesky = bowmark.providers.bluesky;
return await bluesky.getProfile("bsky.app");
```

Public, no sign-in: resolveHandle, searchUsers, getProfile, getUserPosts, getPost, getThread, getTrendingTopics, getTrends, searchPosts, searchFeeds, getFeed, suggestUsers, getPostLikes, getPostReposts, getPostQuotes, getFollowers, getFollows, getRelationships, getSuggestedFollows, getSuggestedFeeds, getFeedInfo, getSuggestedUsers, getUserFeeds, getUserLists, getList, getListFeed, getUserStarterPacks, getStarterPack, searchStarterPacks, getLabelers.

Your own Bluesky account (the run returns a sign-in link the first time): getMe, getTimeline, getMyLikes, listMutedUsers, listBlockedUsers, listBookmarks, listNotifications, listConversations, getConversation, getKnownFollowers.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
