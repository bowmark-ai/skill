---
name: bowmark-trustpilot
description: |
  Read Trustpilot for your agent. Trustpilot: public consumer reviews of any business.
  Typed results through Bowmark, tested on a schedule, no Trustpilot API key. Use when
  the user names Trustpilot or a link to trustpilot.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Trustpilot through Bowmark

1. `get_library({ query: "trustpilot.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const trustpilot = bowmark.providers.trustpilot;
return await trustpilot.getCompany({ domain: "airbnb.com" });
```

Public, no sign-in: getCompany.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
