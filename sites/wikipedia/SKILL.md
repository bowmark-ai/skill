---
name: bowmark-wikipedia
description: |
  Read Wikipedia for your agent. The encyclopedia: read an article, its summary,
  sections, infobox, links, categories, images and full edit history, search across ~340
  language editions, and (signed in as yourself) watch, edit and discuss pages. Typed
  results through Bowmark, tested on a schedule, no Wikipedia API key. Use when the user
  names Wikipedia or a link to wikipedia.org.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Wikipedia through Bowmark

1. `get_library({ query: "wikipedia.org" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const wikipedia = bowmark.providers.wikipedia;
return await wikipedia.getSummary("Model Context Protocol");
```

Public, no sign-in: search, suggestTitles, getArticle, getSummary, getSections, getSection, getArticleHtml, getWikitext, getInfobox, listLinks, listBacklinks, listExternalLinks, listCategories, listCategoryMembers, listRelated, listLanguages, listImages, getImage, listRevisions, getRevision, compareRevisions, listRecentChanges, getUser, listUserContributions, searchNearby, getPageviews, listMostViewed, getFeaturedContent, getOnThisDay, getRandomArticle.

Your own Wikipedia account (the run returns a sign-in link the first time): getCurrentUser, listWatchlist, watchPage, unwatchPage, listNotifications, editPage, createPage, undoRevision, postTalkMessage, thankUser.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
