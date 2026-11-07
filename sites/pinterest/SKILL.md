---
name: bowmark-pinterest
description: |
  Read Pinterest for your agent. Pinterest: search its pins, boards, people and videos,
  read one pin in full with the product behind it when it is shoppable, walk anyone's
  boards and board sections, and browse its idea topics. Typed results through Bowmark, tested on a schedule, no Pinterest API
  key. Use when the user names Pinterest or a link to pinterest.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Pinterest through Bowmark

1. `get_library({ query: "pinterest.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const pinterest = bowmark.providers.pinterest;
return await pinterest.searchPins("small apartment desk setup");
```

Public, no sign-in: searchPins, searchBoards, searchUsers, searchVideos, getPin, getProduct, listVisualObjects, suggestSearches, getUser, listUserBoards, listUserSavedPins, listUserCreatedPins, getBoard, listBoardPins, listBoardSections, listBoardSectionPins, listTopics, getTopic, listTopicPins.

Your own Pinterest account (the run returns a sign-in link the first time): getCurrentUser, getHomeFeed, searchMyPins, listUserFollowing, listConversations.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
