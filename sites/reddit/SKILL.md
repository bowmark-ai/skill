---
name: bowmark-reddit
description: |
  Read Reddit for your agent. Communities, threads and comment trees, and the signed-in
  account. Typed results through Bowmark, tested on a schedule, no Reddit API key. Use
  when the user names Reddit or a link to reddit.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Reddit through Bowmark

1. `get_library({ query: "reddit.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const reddit = bowmark.providers.reddit;
return await reddit.getSubreddit("LocalLLaMA");
```

Public, no sign-in: search, getPost, getSubredditPosts, getSubreddit, searchSubreddits, getUser, searchUsers, getUserPosts, getUserComments, findPostsByUrl, listWikiPages, getWikiPage, getSubredditRules, browseSubreddits, getCommentReplies, searchComments.

Your own Reddit account (the run returns a sign-in link the first time): getMyAccount, getHomeFeed, listMySubscriptions, listSaved, listInbox, listPostFlairs, joinSubreddit, leaveSubreddit, savePostOrComment, unsavePostOrComment, hidePost, vote, followUser, blockUser, createSubreddit, submitPost, postComment, replyToComment, editPostOrComment, deletePostOrComment, reportPostOrComment, sendDirectMessage, updateProfile, setProfilePicture.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
