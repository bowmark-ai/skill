---
name: bowmark-google-news
description: |
  Read Google News for your agent. Headlines from every publisher at once: today's top
  stories as clusters, a section or a city's local news, one outlet's own coverage, and
  everything indexed about a subject with Google's own when: and site: operators. Typed
  results through Bowmark, tested on a schedule, no Google News API key. Use when the
  user names Google News or a link to news.google.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Google News through Bowmark

1. `get_library({ query: "news.google.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const google_news = bowmark.providers.google_news;
return await google_news.searchNews("model context protocol when:7d");
```

Public, no sign-in: searchNews, topStories, listTopicHeadlines, listPublisherHeadlines, listLocalHeadlines, listTopics, listStories, getFullCoverage, resolveArticleUrl.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
