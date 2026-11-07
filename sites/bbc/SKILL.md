---
name: bowmark-bbc
description: |
  Read BBC for your agent. BBC News, Sport and Weather: headlines, search, full
  articles, live pages, scores, fixtures and league tables, weather forecasts, and a
  reader's saved articles. Typed results through Bowmark, tested on a schedule, no BBC
  API key. Use when the user names BBC or a link to bbc.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# BBC through Bowmark

1. `get_library({ query: "bbc.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const bbc = bowmark.providers.bbc;
return await bbc.listHeadlines();
```

Public, no sign-in: listSections, listSports, listCompetitions, getFixtures, getStandings, getMatch, getTeam, listHeadlines, listMostRead, listVideos, getVideo, listPodcasts, getPodcast, getPodcastEpisode, listNewsletters, listTopicStories, searchArticles, getArticle, getLivePage, searchWeatherLocations, getForecast, getCurrentWeather, getWeatherWarnings.

Your own BBC account (the run returns a sign-in link the first time): listSavedArticles, saveArticle, removeSavedArticle, listFollowedPodcasts, followPodcast, unfollowPodcast, subscribeNewsletter, unsubscribeNewsletter.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
