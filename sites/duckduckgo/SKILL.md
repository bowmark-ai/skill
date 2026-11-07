---
name: bowmark-duckduckgo
description: |
  Read DuckDuckGo for your agent. DuckDuckGo (duckduckgo.com): private web, image,
  video, news and maps search, Instant Answers, autocomplete, the dictionary, currency,
  weather, time and translation answers, !bangs, and Duck.ai chat. Typed results through
  Bowmark, tested on a schedule, no DuckDuckGo API key. Use when the user names
  DuckDuckGo or a link to duckduckgo.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# DuckDuckGo through Bowmark

1. `get_library({ query: "duckduckgo.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const duckduckgo = bowmark.providers.duckduckgo;
return await duckduckgo.searchWeb({ query: "model context protocol" });
```

Public, no sign-in: searchNews, searchWeb, searchVideos, searchPlaces, searchImages, getInstantAnswer, suggestQueries, defineWord, convertCurrency, getWeather, getLocalTime, listBangs, resolveBang, listRegions, listDuckAiModels.

Your own DuckDuckGo account (the run returns a sign-in link the first time): getEmailProtectionAccount, createPrivateDuckAddress, setPrivateDuckAddressActive, changeForwardingAddress.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
