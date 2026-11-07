---
name: bowmark-threads
description: |
  Read Threads for your agent. Meta's Threads at threads.com: read public profiles,
  their posts, replies and media, a post with its whole reply thread, and search posts,
  accounts and topics. Typed results through Bowmark, tested on a schedule, no Threads
  API key. Use when the user names Threads or a link to threads.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Threads through Bowmark

1. `get_library({ query: "threads.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const threads = bowmark.providers.threads;
return await threads.getProfile({ username: "zuck" });
```

Public, no sign-in: searchAccounts, getProfile, getProfilePosts, getProfileReplies, getProfileMedia, getProfileReposts, searchPosts, searchTopics, getPost, getRelatedPosts.

Your own Threads account (the run returns a sign-in link the first time): getMe, getHomeFeed, getSavedPosts, getActivity.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
