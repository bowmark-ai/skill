---
name: bowmark-adorama
description: |
  Read Adorama for your agent. Adorama, the New York camera, photo, video and
  electronics retailer: find a product by name, brand, model or SKU across its whole
  catalog (url + SKU), and list its departments. Typed results through Bowmark, tested
  on a schedule, no Adorama API key. Use when the user names Adorama or a link to
  adorama.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Adorama through Bowmark

1. `get_library({ query: "adorama.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const adorama = bowmark.providers.adorama;
return await adorama.search({ query: "sony a7 iv" });
```

Public, no sign-in: search, listCategories.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
