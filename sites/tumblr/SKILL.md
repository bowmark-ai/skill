---
name: bowmark-tumblr
description: |
  Read Tumblr for your agent. Blog info, posts, tag timelines, trending posts and tags,
  who liked or reblogged a post, and search across Tumblr or within one blog. Typed
  results through Bowmark, tested on a schedule, no Tumblr API key. Use when the user
  names Tumblr or a link to tumblr.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# Tumblr through Bowmark

1. `get_library({ query: "tumblr.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const tumblr = bowmark.providers.tumblr;
return await tumblr.getBlogInfo({ name: "staff" });
```

Public, no sign-in: findBlog, getBlogInfo, getBlogPosts, getPost, searchBlogPosts, searchPosts, getTagTimeline, getTrendingPosts, findTag, getPostNotes, getTrendingTags.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
