# bowmark plugin

The [Bowmark](https://bowmark.ai) plugin for **Claude Code** — installs the `bowmark` skill *and* auto-wires the hosted MCP server (`https://api.bowmark.ai/mcp`) in one step, so there's no separate `claude mcp add`.

This package is the source of a one-way mirror to the public **[github.com/bowmark-ai/plugin](https://github.com/bowmark-ai/plugin)** (pushed on each `plugin-v*` release by [`release-plugin.yml`](../../.github/workflows/release-plugin.yml)) — same machinery as the skill mirror. The private monorepo can't be a public marketplace, but nothing here is private: only the public HTTP MCP URL and the public skill.

## Install (Claude Code)

```sh
claude plugin marketplace add bowmark-ai/plugin
claude plugin install bowmark@bowmark-ai
```

That loads the skill and connects the MCP (tools `mcp__bowmark__ask`, `mcp__bowmark__report_outcome`), and gives the plugin a card in the in-app Plugins directory.

Other surfaces are unchanged and live elsewhere: skill-only via `npx skills add bowmark-ai/skill`, MCP-only via `claude mcp add bowmark --transport http https://api.bowmark.ai/mcp`, or point any MCP client straight at the URL. See [bowmark.ai/#install](https://bowmark.ai/#install).

## Layout

```
packages/plugin/
├── .claude-plugin/
│   ├── marketplace.json     # marketplace: bowmark-ai
│   └── plugin.json          # plugin: bowmark — version, mcpServers, skills
├── skills/
│   └── bowmark/
│       └── SKILL.md         # MIRROR of packages/skill/bowmark/SKILL.md — do NOT edit here
├── package.json             # release-please component `plugin` (stripped from the mirror)
└── sync-skill.sh            # regenerates the skill mirror
```

## The bundled skill is a mirror — edit canonical, then sync

`skills/bowmark/SKILL.md` is a **byte-for-byte copy** of `packages/skill/bowmark/SKILL.md`, the source of truth. A plugin install needs the file in-tree, so it can't reference the separate skill package. **Never edit the copy directly.** After changing the canonical skill:

```sh
bash packages/plugin/sync-skill.sh           # copy canonical → plugin
bash packages/plugin/sync-skill.sh --check    # verify in sync (CI runs this)
```

CI fails any PR that changes the canonical skill without re-syncing.

## Versioning

release-please owns `package.json` `version` (component `plugin`, tag `plugin-v*`) and mirrors it into `.claude-plugin/plugin.json` `$.version` via a json updater, so each release republishes the plugin at the new version. Ship changes under `feat(plugin):` / `fix(plugin):`.

## Validate

```sh
claude plugin validate packages/plugin
```
