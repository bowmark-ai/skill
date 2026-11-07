---
name: bowmark-tiktok
description: |
  Read TikTok for your agent. Creator profiles, videos, transcripts and comments, no
  login needed. Typed results through Bowmark, tested on a
  schedule, no TikTok API key. Use when the user names TikTok or a link to tiktok.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# TikTok through Bowmark

1. `get_library({ query: "tiktok.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const tiktok = bowmark.providers.tiktok;
return await tiktok.getProfile({ username: "natgeo" });
```

Public, no sign-in: getProfile, getVideo, getTranscript, listCaptionTracks, listUserVideos, listComments, listCommentReplies, searchVideos, searchUsers, listFollowers, listFollowing, getHashtag, listHashtagVideos, getSound, listSoundVideos.

Your own TikTok account (the run returns a sign-in link the first time): listForYouFeed, listFollowingFeed, getOwnProfile, editProfile, likeVideo, unlikeVideo, postComment, deleteComment, followUser, unfollowUser, bookmarkVideo, deleteVideo, listNotifications.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
