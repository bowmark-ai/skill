---
name: bowmark-sec-edgar
description: |
  Read SEC EDGAR for your agent. A US public company's own reported facts from its SEC
  filings (revenue, net income, EPS, assets, shares outstanding), plus its filings list
  with document links. Typed results through Bowmark, tested on a schedule, no SEC EDGAR
  API key. Use when the user names SEC EDGAR or a link to sec.gov.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# SEC EDGAR through Bowmark

1. `get_library({ query: "sec.gov" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const sec_edgar = bowmark.providers.sec_edgar;
return await sec_edgar.listFilings({ company: "AAPL", forms: ["10-K"] });
```

Public, no sign-in: findCompany, companyFacts, listFilings.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
