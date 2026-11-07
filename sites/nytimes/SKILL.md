---
name: bowmark-nytimes
description: |
  Read The New York Times for your agent: articles, sections, search results, trending
  lists, writers, podcasts and the daily games. Typed results through Bowmark, tested on
  a schedule, no New York Times API key. Use when the user names the New York Times, NYT
  or a link to nytimes.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# The New York Times through Bowmark

1. `get_library({ query: "nytimes.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const nytimes = bowmark.providers.nytimes;
return await nytimes.searchArticles("artificial intelligence", 5);
```

Public, no sign-in: listSections, listArticles, getSection, getArticle, searchArticles, getArticleComments, listTrending, getTrending, searchWriters, getWriter, listWriterArticles, listTopics, getTopicArticles, getLiveBlog, listNewsletters, getNewsletter, listPodcasts, getPodcast, listEpisodes, getWordle, getConnections, getSpellingBee, listRSSFeeds.

Your own New York Times account (the run returns a sign-in link the first time): listSavedArticles, saveArticle, unsaveArticle.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
