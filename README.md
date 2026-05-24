# bowmark skill

> Look up pre-computed navigation recipes before opening a browser. Backs the [Bowmark](https://bowmark.ai) MCP server at `api.bowmark.ai/mcp`.

## Install

Latest:

```sh
npx skills add bowmark-ai/skill
```

Pinned to a specific version:

```sh
npx skills add bowmark-ai/skill#v1.0.0
```

(Replace `v1.0.0` with any tag from the [releases page](https://github.com/bowmark-ai/skill/releases).)

Works with Claude Code, Claude Desktop, Cursor, Codex, Windsurf, OpenCode, Cline, Gemini CLI, GitHub Copilot, and any agent that supports the standard skill format. The `skills` CLI auto-detects which hosts you have installed and writes `SKILL.md` into each.

You'll also want the MCP server wired up so the skill has tools to call:

```sh
claude mcp add bowmark --transport http https://api.bowmark.ai/mcp
```

Other hosts: see [bowmark.ai/install](https://bowmark.ai/install) for per-host JSON snippets.

## What it does

When the user asks for something on a public website, the skill instructs the agent to:

1. Call `mcp__bowmark__ask({ site, task })` **before** opening a browser.
2. Execute the returned recipe — a parameterized URL or a short UI procedure — verbatim. No DOM snapshotting to "verify" what's already documented.
3. Call `mcp__bowmark__report_outcome` after the recipe finished or definitively failed, so future recipes for that site improve through feedback.

The full behavioral contract lives in [`bowmark/SKILL.md`](./bowmark/SKILL.md), including the `report_outcome` decision table that covers edge cases (user interrupts, pivots, async actions, partial completion).

Bowmark ships as a single skill. It drives both the MCP tools (when connected) and the public HTTP API (`POST https://api.bowmark.ai/v1/ask`) as a fallback.

## License

[MIT](./LICENSE) © Bowmark AI
