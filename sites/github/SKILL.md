---
name: bowmark-github
description: |
  Read GitHub for your agent. Repos, READMEs, files, commits, releases, issues and pull
  requests. Typed results through
  Bowmark, tested on a schedule, no GitHub API key. Use when the user names GitHub or a
  link to github.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# GitHub through Bowmark

1. `get_library({ query: "github.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const github = bowmark.providers.github;
return await github.getRepo("anthropics", "anthropic-sdk-python");
```

Public, no sign-in: listCommits, listReleases, listContributors, getFileContents, listIssueComments, listPullRequestFiles, searchIssues, getReadme, getRepo, getProfileReadme, searchRepositories, getUserRepositories, listOrganizationRepositories, getUser, getOrganization, listIssues, listPullRequests, getIssue, getPullRequest, listTrendingRepositories, listTopics, listMarketplaceActions, getSponsorPage.

Your own GitHub account (the run returns a sign-in link the first time): searchCode, listNotifications, listStarredRepositories, updateIssue, createIssue, createPullRequest, createComment, updateComment, deleteComment, updatePullRequest, watchRepository, unwatchRepository, starRepository, unstarRepository, mergePullRequest, createReview, createReviewComment.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
