---
name: bowmark-archive-org
description: |
  Read Wayback Machine (archive.org) for your agent. Check whether a page is archived,
  list every capture, read a page as it was on a given date, and search and open
  Internet Archive items, so your agent can see what a site published before it changed.
  Typed results through Bowmark, tested on a schedule, no Wayback Machine (archive.org)
  API key. Use when the user names Wayback Machine (archive.org) or a link to
  archive.org.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Wayback Machine (archive.org) through Bowmark

1. `get_library({ query: "archive.org" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const archive_org = bowmark.providers.archive_org;
return await archive_org.searchItems("grateful dead 1977");
```

Public, no sign-in: getSnapshot, searchItems, getItem, downloadFile, checkLendingAvailability.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
