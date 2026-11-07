---
name: bowmark-facebook
description: |
  Read Facebook for your agent. Facebook: profiles, pages, groups, marketplace, messages
  and posts. Typed results through Bowmark, tested on a schedule, no Facebook API key.
  Use when the user names Facebook or a link to facebook.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Facebook through Bowmark

1. `get_library({ query: "facebook.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const facebook = bowmark.providers.facebook;
return await facebook.getPageInfo({ handle: "NASA" });
```

Public, no sign-in: getPersonProfile, getPageInfo, getBusinessDetails, getPagePosts, listPhotos, listPageReels, getPageReviews, getVideo, getEventDetails, browseMarketplace, listPageEvents, getPost, getPostComments, getMarketplaceListingDetails.

Your own Facebook account (the run returns a sign-in link the first time): searchPeople, listFriends, listConversations, getConversation, sendMessage, getGroupInfo, getGroupPosts, postToTimeline, commentOnPost, reactToPost, getPhotoAlbum, likePhoto, savePost, replyToComment, sharePost, followPage, joinGroup, searchPages, searchGroups, postToPage, postToGroup, listEvents, getMarketplaceListings, listNotifications, getPrivacySettings, updatePrivacySettings, updateProfile.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
