---
name: bowmark-twitch
description: |
  Read Twitch for your agent. Twitch: cut a Highlight of your own broadcast, including
  the one still live, and read any public video's length and status. Typed results
  through Bowmark, tested on a schedule, no Twitch API key. Use when the user names
  Twitch or a link to twitch.tv.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Twitch through Bowmark

1. `get_library({ query: "twitch.tv" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const twitch = bowmark.providers.twitch;
return await twitch.getChannelInfo({ login: "twitchdev" });
```

Public, no sign-in: getVideo, getChannelInfo, getStream, listLiveStreams, searchChannels, searchVideos, listCategories, listChannelVods, listChannelClips, getClip, getChannelSchedule.

Your own Twitch account (the run returns a sign-in link the first time): createHighlight, getChannel, setChannel, listFollowedChannels, getFollowStatus, sendChatMessage, listWatchLater, listWatchHistory, listSubscriptions, getSubscriptionStatus, followChannel, unfollowChannel.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
