---
name: bowmark-usps
description: |
  Read USPS for your agent. Price a domestic package across every USPS mail service
  for a ZIP-to-ZIP move, weight and optional dimensions, and track a package. Typed
  results through Bowmark, tested on a schedule, no USPS API key. Use when the user
  names USPS or a link to usps.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# USPS through Bowmark

1. `get_library({ query: "usps.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const usps = bowmark.providers.usps;
return await usps.getRate({ fromZip: "10001", toZip: "94105", weightOz: 16 });
```

Public, no sign-in: getRate, trackPackage.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
