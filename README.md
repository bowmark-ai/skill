# bowmark skill

The skill for [Bowmark](https://bowmark.ai) — pre-computed navigation recipes for known websites, so the agent doesn't have to discover the page structure from scratch. The skill calls Bowmark's hosted MCP server (`https://api.bowmark.ai/mcp`).

## Install

**Claude Code (one click — skill + MCP together).** This repo is also a Claude Code plugin marketplace. Installing the `bowmark` plugin loads the skill *and* auto-wires the MCP server, so there's no separate `claude mcp add`:

```sh
claude plugin marketplace add bowmark-ai/skill
claude plugin install bowmark@bowmark-ai
```

**Skill only (any skills-aware host).** Adds just the skill; wire the MCP server yourself:

```sh
npx skills add bowmark-ai/skill
```

Then wire the MCP server at [bowmark.ai/#install](https://bowmark.ai/#install) or via [Smithery](https://smithery.ai/servers/bowmark-ai/bowmark).

**Any other MCP client (Cursor, Windsurf, raw HTTP).** Point your client straight at the MCP server `https://api.bowmark.ai/mcp` (no key required; see [the registry listing](https://registry.modelcontextprotocol.io)).

No API key is needed — the MCP and HTTP API answer anonymously (per-IP daily cap on *new* recipe synthesis; cached recipes unlimited). To raise the limit, mint a key at bowmark.ai and add it to the server's `headers` as `Authorization: Bearer ${BOWMARK_API_KEY}`.

## License

[MIT](./LICENSE) © Bowmark AI
