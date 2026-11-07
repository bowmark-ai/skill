---
name: bowmark-crunchbase
description: |
  Read Crunchbase for your agent. Crunchbase: which startups raised money this week (the
  week's biggest U.S. rounds with amount, round type, lead investors and the company's
  Crunchbase slug), Crunchbase News coverage of any company, and a company's own
  Crunchbase profile. Typed results through Bowmark, tested on a schedule, no Crunchbase
  API key. Use when the user names Crunchbase or a link to crunchbase.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Crunchbase through Bowmark

1. `get_library({ query: "crunchbase.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const crunchbase = bowmark.providers.crunchbase;
return await crunchbase.getOrganization("anthropic");
```

Public, no sign-in: recentFundingRounds, searchNews, getOrganization, getFundingRounds, searchOrganizations.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
