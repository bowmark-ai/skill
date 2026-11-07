---
name: bowmark-youtube
description: |
  Read YouTube for your agent: search videos, get a video's transcript, comments,
  chapters, views and likes, read a channel's videos, shorts, playlists and
  subscriber count, and work with your own playlists and Watch Later. Typed
  results through Bowmark, tested on a schedule, no YouTube Data API key and no
  quota units. Use when the user names YouTube or a youtube.com / youtu.be URL.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# YouTube through Bowmark

1. `get_library({ query: "youtube.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const yt = bowmark.providers.youtube;
const [video, transcript, comments] = await Promise.allSettled([
  yt.getVideo({ video: "dQw4w9WgXcQ" }),
  yt.getTranscript({ video: "dQw4w9WgXcQ" }),
  yt.listComments({ video: "dQw4w9WgXcQ", sortBy: "top" }),
]);
return { video, transcript, comments };
```

Public, no sign-in: search, suggestSearches, getVideo, getTranscript, listCaptionTracks,
listChapters, listComments, listCommentReplies, listRelatedVideos, getLiveChat, findChannel,
getChannel, listChannelVideos, listChannelShorts, listChannelLiveStreams, listChannelPlaylists,
listChannelPosts, searchWithinChannel, getPlaylist, listPlaylistVideos, listHashtagVideos.

Your own account (sign-in): `bowmark.video_library` homeFeed, watchLater, liked, history,
createPlaylist, addToPlaylist, removeFromPlaylist.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
