---
name: bowmark-yahoo-finance
description: |
  Read Yahoo Finance for your agent. Quotes, price history, financials, analyst
  estimates, holders, options and news for any ticker, plus market summary and trending
  tickers. Typed results through Bowmark, tested on a schedule, no Yahoo Finance API
  key. Use when the user names Yahoo Finance or a link to finance.yahoo.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Yahoo Finance through Bowmark

1. `get_library({ query: "finance.yahoo.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const yahoo_finance = bowmark.providers.yahoo_finance;
return await yahoo_finance.getQuote("AAPL");
```

Public, no sign-in: searchSymbols, getQuote, getTrendingTickers, getMarketSummary, getHistoricalPrices, getAnalystEstimates, getNews, getHolders, getFinancials, listCryptoPrices, getOptionsChain, getCompanyProfile, getKeyStatistics, getEarningsDates.

Your own Yahoo Finance account (the run returns a sign-in link the first time): listWatchlists, addToWatchlist.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
