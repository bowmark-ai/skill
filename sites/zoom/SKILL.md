---
name: bowmark-zoom
description: |
  Read Zoom for your agent. Video meetings and webinars: check a meeting link, read
  pricing, system status and Marketplace apps, and manage your own meetings and
  recordings. Typed results through Bowmark, tested on a schedule, no Zoom API key. Use
  when the user names Zoom or a link to zoom.us.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Zoom through Bowmark

1. `get_library({ query: "zoom.us" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const zoom = bowmark.providers.zoom;
return await zoom.getSystemStatus();
```

Public, no sign-in: getPricing, getSystemStatus, joinMeeting, searchMarketplaceApps, getMeetingInfo, getMarketplaceApp, searchHelpArticles.

Your own Zoom account (the run returns a sign-in link the first time): getMeeting, deleteMeeting, getMeetingParticipants, listWebinars, getWebinar, listRecordings, getRecording, downloadRecording, getProfile, updateProfile, updateProfilePicture.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
