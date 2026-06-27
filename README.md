# bowmark skill

The skill for [Bowmark](https://bowmark.ai) — pre-computed navigation recipes for known websites, so the agent doesn't have to discover the page structure from scratch.

```sh
npx skills add bowmark-ai/skill
```

Works on any host that supports the `SKILL.md` standard — **Claude Code, Codex** (which adopted the standard natively), Cursor, GitHub Copilot, OpenCode, and others.

The skill calls Bowmark's MCP server — wire that up at [bowmark.ai/#install](https://bowmark.ai/#install) or via [Smithery](https://smithery.ai/servers/bowmark-ai/bowmark).

**Want both in one step?** On Claude Code and Codex, install the plugin instead — it bundles this skill *and* auto-wires the MCP:

```sh
# Claude Code
claude plugin marketplace add bowmark-ai/plugin && claude plugin install bowmark@bowmark-ai
# Codex
codex plugin marketplace add bowmark-ai/plugin   # then `codex /plugins` to install
```

## License

[MIT](./LICENSE) © Bowmark AI
