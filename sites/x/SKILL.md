---
name: bowmark-x
description: |
  Read X for your agent. Read public user timelines and post data from X (Twitter).
  Typed results through Bowmark, tested on a schedule, no X API key. Use when the user
  names X or a link to x.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# X through Bowmark

1. `get_library({ query: "x.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const x = bowmark.providers.x;
return await x.profile({ handle: "AnthropicAI" });
```

Public, no sign-in: userTimeline, profile, post, getPostReplies.

Your own X account (the run returns a sign-in link the first time): search, listHomeFeed, listBookmarks, listNotifications, sendDirectMessage, listFollowers, listFollowing, listConversations, getConversation, createPost, replyToPost, likePost, repost, bookmarkPost, followUser.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
