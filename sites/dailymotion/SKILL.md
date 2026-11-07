---
name: bowmark-dailymotion
description: |
  Read Dailymotion for your agent. Search Dailymotion videos by keyword and read one
  video's title, channel, duration, views and watch URL. Typed results through
  Bowmark, tested on a schedule, no Dailymotion API key. Use when the user names Dailymotion or a link to dailymotion.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Dailymotion through Bowmark

1. `get_library({ query: "dailymotion.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const dailymotion = bowmark.providers.dailymotion;
return await dailymotion.searchChannels("nasa");
```

Public, no sign-in: searchVideos, getVideo, searchChannels, getChannel, listChannelVideos, listChannelPlaylists, getPlaylist, listPlaylistVideos, searchPlaylists, listTrendingVideos, listCategories, listCategoryVideos, listLiveStreams, listHashtagVideos, listRelatedVideos, listCaptionTracks, getTranscript, listStreamFormats.

Your own Dailymotion account (the run returns a sign-in link the first time): getMyProfile, likeVideo, followChannel, listMyLikedVideos, listFollowedChannels, addToWatchLater, listWatchLater, listWatchHistory.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
