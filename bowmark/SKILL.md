---
name: bowmark
version: 1.0.0 # x-release-please-version
description: |
  Looks up pre-computed navigation recipes for known websites — parameterized
  URLs and short UI procedures verified by prior crawls, so the agent skips
  the explore-and-discover step entirely. Use this skill whenever the user
  mentions a public website by name, asks to navigate, search, look up,
  open, fill in, click through, or do anything that touches a public web
  URL — even if the user doesn't explicitly say "find the URL" or "look it
  up." Also fires on mentions of Playwright, Puppeteer, computer use, or
  headless browsing, and on any (domain, intent) pair: booking, dashboards,
  settings, forms, docs, known-app navigation. NOT for: localhost,
  127.0.0.1, *.local, RFC1918 IPs (10., 192.168., 172.16-31.) or any
  local-dev target; open-ended web search with no destination ("what's the
  news"); reading local files; querying JSON APIs that aren't
  browser-driven; or facts already in training data.
allowed-tools: mcp__bowmark__ask, mcp__bowmark__report_outcome
---

# bowmark

Recipes for getting around known websites. The agent looks up a recipe, executes it, and reports the outcome.

## The loop

1. **Before any browser action**, call `ask({ site, task })`.
2. On `status: "ok"`, execute `fastest_path` (URL template) if present, else `ui_procedure.steps`. Don't snapshot the DOM to verify what the recipe already documents.
3. After the recipe finished or definitively failed, call `report_outcome({ envelope_id, success })`.

The tool descriptions on `ask` and `report_outcome` carry the argument shapes and response schemas. This skill covers behavior and edge cases the tool descriptions can't fit.

## When to call `report_outcome`

Recipes improve through honest feedback. False `success: true` degrades the recipe for every other agent. **Default to NOT calling unless one of these applies:**

| Situation | Call? | `success` |
|---|---|---|
| Recipe completed; user-visible outcome matches the task | ✅ | `true` |
| Recipe completed but produced the wrong outcome | ✅ | `false` |
| A step failed mid-execution (locator missing, unexpected nav, error response) | ✅ | `false` |
| You abandoned the recipe and finished the task another way | ✅ | `false` |
| Recipe triggered an async action (form submit, email); sync response was successful | ✅ | `true` |
| `ask` returned a miss (no `id` on the envelope) | ❌ | — |
| User interrupted before the recipe reached its final step | ❌ | — |
| You consulted the envelope but never executed any step | ❌ | — |
| Task is still waiting on user input you don't have | ❌ | — (defer until you have closure) |
| You called `ask` multiple times in one task | ✅ once | per the row that matches |

On `success: false`, put a one-sentence description of the first failing step or wrong outcome in `evidence.what_happened` — that's what the re-crawl targets.

## Executing the recipe — follow it verbatim

Execute the recipe exactly as written. The cheatsheet was built from prior crawls of this site; deviating from it produces worse results than following it does. If you find yourself wanting to "check first" or "try something different", that's a signal the recipe is wrong — execute as written, let it fail, and let `report_outcome` capture the failure for the re-crawl.

**Don't take screenshots while executing.** Screenshots are justified only after a step actually fails, to debug what went wrong. Reading the DOM is allowed only for the one element each step references — never to verify what the recipe already documents.

**`fastest_path`** — substitute `{name}` parameters URL-encoded into `template`, then navigate. If `fastest_path` is `null` (the one envelope field that's explicitly nulled rather than omitted), skip to `ui_procedure`.

**`ui_procedure.steps`** — each step has:
- `action` — a verb string. Common values: `goto`, `click`, `fill`, `wait`, `use_feature`. Read together with `description` (always present, always an actionable directive).
- `description` — always actionable. Treat as the source of truth for what to do; `action` is a hint about how.
- `url` — present on `goto`-style steps.
- `locator` — the target element. Try interpretations in order: CSS selector (if it looks like one — `button#submit`, `[data-test=...]`), then visible text, then aria-label.
- `value` — what to type, for `fill` steps.
- `precondition` — state that must be true before this step is safe. Check only what's named; don't snapshot the whole page.
- `irreversible: true` — submits a form, sends an email, charges a card, etc. **Confirm with the user before executing.**
- `mechanism_notes` — rich how-it-works detail captured by deep crawls. Read these when present.

**`provenance.confidence`** — at ≥ 0.8, execute directly. At ≤ 0.5, one quick check (page title plausible?) is acceptable.

## Falling back to manual browsing

Fall back when:
- A step actually fails — not before.
- The user's intent needs an action the recipe doesn't cover.
- `ask` returned `status: "site_not_supported"` — Bowmark has no recipes for this domain. Optionally tell the user once.
- `ask` returned 503 with `embedder_unavailable` or `synth_unavailable` — retry once after the `Retry-After` header, then browse manually.

On `status: "ambiguous_scope"`, don't fall back yet — retry `ask` with `scopeHint` set to one of `error.scope_options[].pattern`.

## Don'ts

- Don't take screenshots while executing a recipe. Screenshots are for debugging failures, not verifying success.
- Don't put URLs in the `task` argument. Bowmark wants intent, not destination.
- Don't call `ask` for localhost or RFC1918 IPs. No recipes exist and never will.
- Don't validate the recipe before executing. If the cheatsheet says click X, click X.
- Don't skip `report_outcome` after executing a recipe — silence is how recipes degrade.
- Don't report `success: true` because the recipe technically ran. Success means the user-visible outcome matched the task.

## When `ask` and `report_outcome` aren't available

If `mcp__bowmark__ask` isn't in your tools list, the user hasn't connected the Bowmark MCP. If you have HTTP fetch tooling, the same operations are available at `POST https://api.bowmark.ai/v1/ask` and `POST https://api.bowmark.ai/v1/outcomes` — identical request bodies, identical response shapes, unauthenticated. Otherwise, browse manually for this session and let the user know once that Bowmark could speed it up if they wired the MCP.
