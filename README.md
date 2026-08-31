# bowmark skill

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=bowmark&config=eyJ1cmwiOiJodHRwczovL2FwaS5ib3dtYXJrLmFpL21jcC9iYWRnZS1jdXJzb3IifQ==)
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Bowmark-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=bowmark&config=%7B%22name%22%3A%22bowmark%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.bowmark.ai%2Fmcp%2Fbadge-vscode%22%7D)

[![MCP](https://img.shields.io/badge/MCP-server-000000?style=flat-square)](https://api.bowmark.ai/mcp)
[![npm](https://img.shields.io/npm/v/%40bowmark%2Fmcp?style=flat-square&label=%40bowmark%2Fmcp)](https://www.npmjs.com/package/@bowmark/mcp)
[![PyPI](https://img.shields.io/pypi/v/bowmark-mcp?style=flat-square)](https://pypi.org/project/bowmark-mcp/)
[![License](https://img.shields.io/badge/license-MIT-A3E635?style=flat-square)](https://opensource.org/licenses/MIT)

<sub>**LM Studio** — GitHub strips a raw `lmstudio:` link, so this one is a paste, not a button. Copy it into your browser's address bar:</sub>

```
lmstudio://add_mcp?name=bowmark&config=eyJ1cmwiOiJodHRwczovL2FwaS5ib3dtYXJrLmFpL21jcC9iYWRnZS1sbXN0dWRpbyJ9
```

The skill for [Bowmark](https://bowmark.ai) — the web as callable functions. The agent reads a typed function library, writes a short script against it, and Bowmark runs it on the live sites.

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

## Tools

<!-- Several MCP directories auto-extract a server's tool list from exactly this
     heading in the repo README — mcp.so says so on the listing itself, and ours
     read "No tools detected" until this section existed. Keep the names and the
     order matching apps/api/src/routes/mcp.ts. -->

| Tool | What it does |
|---|---|
| `get_library` | Read the typed function library for a task or a site. Read-only, touches no site, and an unrecognized query returns the index rather than an error. |
| `run` | Execute a short async JavaScript script against the live sites and return `{ ok, result, logs, error, ms }`. |
| `register` | Create a free Bowmark account and return an API key. Every argument is optional; `register({})` is a complete call. |

## OpenAI Apps (ChatGPT plugin) variant

The [ChatGPT Apps](https://platform.openai.com/plugins) submission takes a skill as a **ZIP or folder**, and its needs differ slightly from the general skill: the plugin always ships the MCP alongside the skill, and ChatGPT exposes the tools under bare names. So there's a tailored variant, **generated from this same canonical skill** — never hand-maintained:

- **Folder:** [`openai/bowmark/`](./openai/bowmark) — a content mirror of `bowmark/SKILL.md` with the no-MCP HTTP-fallback + "Higher limits" sections dropped (the MCP is always present here), tool names rewritten to bare `get_library` / `run`, and Claude-only frontmatter/tool-name references trimmed.
- **ZIP:** [`openai/bowmark-openai-skill.zip`](./openai/bowmark-openai-skill.zip) — the same folder zipped, ready to drop straight into the ChatGPT "Skills" uploader. A **committed artifact** (not built in CI: the release runner has no `zip` binary), so it rides the mirror to `bowmark-ai/skill` at a stable raw URL like any other file.

Both are **generated** by [`build-openai.mjs`](./build-openai.mjs). Edit `bowmark/SKILL.md`, then regenerate and commit — never edit the `openai/` copies directly (CI's `check:openai` fails a PR whose text mirror is stale):

```sh
pnpm -F @bowmark/skill sync:openai        # regenerate openai/bowmark/SKILL.md
pnpm -F @bowmark/skill build:openai-zip    # rebuild openai/bowmark-openai-skill.zip (commit it)
```

## License

[MIT](./LICENSE) © Bowmark AI
