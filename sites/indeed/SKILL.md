---
name: bowmark-indeed
description: |
  Read Indeed for your agent. Job search on the US's largest job board: listings with
  salary, location and posted-date. Typed results through Bowmark, tested on a schedule,
  no Indeed API key. Use when the user names Indeed or a link to indeed.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Indeed through Bowmark

1. `get_library({ query: "indeed.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const indeed = bowmark.providers.indeed;
return await indeed.searchJobs({ query: "data engineer", location: "Austin, TX" });
```

Public, no sign-in: searchJobs, getJobDetails, searchCompanies, getCompanyDetails, searchSalaries, getSalaryDetails.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
