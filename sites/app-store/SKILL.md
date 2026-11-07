---
name: bowmark-app-store
description: |
  Read Apple App Store for your agent. Search every iPhone, iPad and Mac app Apple
  lists, read one app's price, rating, reviews, in-app purchases and privacy labels, and
  see what is charting right now. Typed results through Bowmark, tested on a schedule, no
  Apple App Store API key. Use when the user names Apple App Store or a link to
  apps.apple.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Apple App Store through Bowmark

1. `get_library({ query: "apps.apple.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const app_store = bowmark.providers.app_store;
return await app_store.getApp({ app: 310633997 });
```

Public, no sign-in: searchApps, getApp, getApps, getAppDetails, listSimilarApps, listDeveloperApps, listCategories, listTopCharts, getStory, listReviews, listTodayStories.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
