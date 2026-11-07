---
name: bowmark-espn
description: |
  Read ESPN for your agent. Scores, standings, schedules, rosters, injuries, player
  stats, odds and news across ESPN's leagues. Typed results through Bowmark, tested on a
  schedule, no ESPN API key. Use when the user names ESPN or a link to espn.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# ESPN through Bowmark

1. `get_library({ query: "espn.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const espn = bowmark.providers.espn;
return await espn.injuries();
```

Public, no sign-in: listLeagues, scoreboard, getGame, standings, injuries, listTeams, teamSchedule, teamRoster, search, getPlayer, news, getTeam, teamStats, statLeaders, fantasyPlayers, playerStats, playerGameLog, getArticle, getFantasyLeague, teamDepthChart, transactions, odds, draftPicks, rankings.

Your own ESPN account (the run returns a sign-in link the first time): listMyFantasyTeams.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
