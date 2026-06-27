---
name: bowmark
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
2. On `status: "ok"`, execute `shortcut` (URL template) if present, else `ui_procedure.steps`. Don't snapshot the DOM to verify what the recipe already documents.
3. After the recipe finished or definitively failed, call `report_outcome({ envelope_id, success })`.

The tool descriptions on `ask` and `report_outcome` carry the argument shapes and response schemas. This skill covers behavior and edge cases the tool descriptions can't fit.

## When to call `report_outcome`

The report is about the **recipe** — did each step run as written without hiccup? — **not** about whether the user got a good answer. Two different concerns; only the first one is what `report_outcome` measures.

**`success: true`** = every step executed AS WRITTEN. Each locator resolved on the first try. No extra clicks, scrolls, or waits beyond the recipe. No raw browser code (`browser_run_code_unsafe` etc.). No skipped steps. No substituting your own selector for one that didn't match. If you walked the recipe clean from step 1 to the last step, report true — *even if the answer ended up being wrong*. (Wrong answer is a separate re-crawl concern; the recipe still executed.)

**`success: false`** = any hiccup at all. A locator wasn't there. A click did nothing. You retried with a different selector. You fell back to raw browser code. You added scrolls or clicks not in the recipe to recover state. You skipped a step. The recipe took you somewhere unexpected. Report false — *even if you eventually got the user the right answer*. Honest failure reports trigger a re-crawl that fixes the recipe; false `true` silently degrades it for every future agent.

**Quick self-check** before reporting: re-read your tool-call sequence since the recipe started. If it's longer than the recipe's step list, the answer is `false`. If you used raw browser code, the answer is `false`. If your evidence is tempted to say "I switched to…", "the X button wasn't there so…", "I had to scroll…", "I tried clicking 3 different things…", the answer is `false`.

| Situation | Call? | `success` |
|---|---|---|
| Every step ran as written; zero extra tool calls; clean walk | ✅ | `true` |
| Recipe ran clean but the answer was wrong (wrong entity, stale data) | ✅ | `true` *(recipe ran; answer correctness is a separate concern)* |
| A step failed mid-execution (locator missing, unexpected nav, error) | ✅ | `false` |
| You retried a step with a different selector or used raw JS to recover | ✅ | `false` |
| You scrolled / clicked extra to find state the recipe assumed was visible | ✅ | `false` |
| You abandoned the recipe and finished some other way | ✅ | `false` |
| You skipped a step because it looked unnecessary or you "knew better" | ✅ | `false` |
| Recipe triggered an async action (form submit, email); sync response was successful | ✅ | `true` |
| `ask` returned a miss (no `id` on the envelope) | ❌ | — |
| User interrupted before the recipe reached its final step | ❌ | — |
| You consulted the envelope but never executed any step | ❌ | — |
| Task is still waiting on user input you don't have | ❌ | — (defer until you have closure) |
| You called `ask` multiple times in one task | ✅ once | per the row that matches |

### `evidence` — describe the recipe, not the task

Always populate `evidence.what_happened`, on success AND failure. It describes **how the recipe behaved**, not what you found for the user. The crawler reads it to decide what to re-investigate; a task summary tells it nothing.

- ❌ "Found Saan Saan Cafe with 4.9 stars" — task outcome.
- ❌ "Successfully searched for restaurants in Vancouver" — task summary that hides recipe drift.
- ✅ "All 6 steps ran as written. No retries." — clean success.
- ✅ "Steps 1–4 clean. Step 5 (`All filters` button) didn't resolve; tried 3 alternate selectors then used `browser_run_code_unsafe` to click. Step 6 (`Top rated`) never reached — filter wasn't visible after step 5 substitute." — actionable failure.
- ✅ "Step 3 selector `input[name='q']` matched but typing didn't fire the autocomplete the recipe assumed. Fell back to `fill_form`." — specific hiccup.

The first failing step is what the re-crawl targets, so name it specifically. Saying "the recipe worked" or "I got the answer" tells the next crawl nothing.

## Executing the recipe — follow it verbatim

Execute the recipe exactly as written. The cheatsheet was built from prior crawls of this site; deviating from it produces worse results than following it does. If you find yourself wanting to "check first" or "try something different", that's a signal the recipe is wrong — execute as written, let it fail, and let `report_outcome` capture the failure for the re-crawl.

**Don't take screenshots while executing.** Screenshots are justified only after a step actually fails, to debug what went wrong. Reading the DOM is allowed only for the one element each step references — never to verify what the recipe already documents.

**`shortcut`** — fill each `{name}` placeholder in `template` with the value **from your task**, URL-encode, then navigate. Each entry in `shortcut.parameters` is a slot: `{ name, description, format? }`. It describes *what* to supply ("the destination", "Origin to Destination on Date returning Date") — it does NOT contain a pre-filled value, because the recipe is cached across many different tasks. Read the `description`/`format`, then substitute the specifics your task needs (keep qualifier words like "top rated"/"cheapest" if the slot's description says ranking honors them). If `shortcut` is `null` (the one envelope field that's explicitly nulled rather than omitted), skip to `ui_procedure`.

**`ui_procedure.steps`** — each step has:
- `action` — a verb string. Common values: `navigate`, `click`, `type`, `fill`, `scroll`, `read`, `verify`, `select`, `submit`, `use_feature`. Not an enum — read `action` together with `locator`/`value`/`url` to decide what to do.
- `description` — **optional**. Present only when `action` + `locator` would be ambiguous on its own (e.g. clicking an unnamed search result). When present, it's the source of truth for the step's intent; when absent, the action+locator+value tuple is self-explanatory.
- `url` — present on `navigate` steps.
- `locator` — the target element. Try interpretations in order: CSS selector (if it looks like one — `button#submit`, `[data-test=...]`), then visible text, then aria-label.
- `value` — what to type, for `fill` / `type` steps. May be a generic slot ("the destination") rather than a literal — supply the specifics your task needs, same as for `shortcut` parameters.
- `precondition` — state that must be true before this step is safe. Check only what's named; don't snapshot the whole page.
- `irreversible: true` — submits a form, sends an email, charges a card, etc. **Confirm with the user before executing.**
- `mechanism_notes` — rich how-it-works detail captured by deep crawls. Read these when present.

**`verify_more`** — top-level boolean, `true` only on low-confidence envelopes. When present, do one cheap sanity check (page title plausible?) before committing to the recipe. When absent, execute directly.

**`variants_assumed`** — top-level object, present only when you requested a non-empty behavior facet. It echoes back the facets you ASKED for (most importantly `{ auth_state, role }`), so it confirms *what view you requested* — NOT that a logged-in recipe was actually found. Bowmark soft-prefers variant-matching data but falls back to the best available, so an `auth_state: "logged_in"` request can still return a recipe drawing on public notes when the signed-in surface wasn't mapped. Treat it as a record of your request; rely on the recipe itself + the top-level `verify_more` flag for trust, and fall back to normal browsing if a step doesn't match the signed-in UI.

## Requesting the logged-in view

Most recipes describe a site's **logged-out** (public) surface — what an anonymous visitor sees. Some tasks only exist behind a login (org settings, billing, an owner-only dashboard). For those, pass the auth facet in `variants`:

- `ask({ site, task, variants: { auth_state: "logged_in" } })` — request the signed-in view.
- Add `role` when the privilege level changes what's available — `{ auth_state: "logged_in", role: "owner" }` (also `"admin"`, `"member"`, etc.; the vocabulary is per-site). An owner sees settings a member doesn't; the role narrows the recipe to that persona's surface.
- Omit `variants` entirely (or pass `auth_state: "logged_out"`) for the default public view. With no `auth_state`, you always get the logged-out recipe — behavior is identical to not passing `variants`.

The facets ride inside the existing `variants` object — there's no separate argument. They affect the cache key, and the facets you requested come back on the envelope's `variants_assumed` (a record of your request, not proof a logged-in recipe was found). Bowmark returns the logged-in recipe only if a prior crawl signed in and mapped that surface; otherwise you fall through to the logged-out recipe (or a miss). Either way, **you** still have to be signed into the site in your own browser session to execute a logged-in recipe — Bowmark supplies the recipe, not the credentials.

## Falling back to manual browsing

Fall back when:
- A step actually fails — not before.
- The user's intent needs an action the recipe doesn't cover.
- `ask` returned `status: "site_not_supported"` — Bowmark has no recipes for this domain. Optionally tell the user once.
- `ask` returned `status: "rate_limited"` — a cap on synthesizing *new* recipes was hit (per-IP daily when anonymous, your account's monthly plan budget when a key is attached). Cached and already-known recipes keep answering, so it only bites first-time tasks. Don't retry-spam (it won't clear until `error.retry_after` seconds elapse); browse manually for capped tasks until then. A free API key (see "Higher limits" below) lifts the anonymous per-IP cap to a plan budget.
- `ask` returned 503 with `embedder_unavailable` or `synth_unavailable` — retry once after the `Retry-After` header, then browse manually.

On `status: "ambiguous_scope"`, don't fall back yet — retry `ask` with `scopeHint` set to one of `error.scope_options[].pattern`. You can also avoid the round-trip up front: when the site has multiple surfaces and you already know which one (Google Maps, Google Flights, Stripe API docs, etc.), pass it inline as `site: "google.com/maps"` — the path is honored as an implicit `scopeHint` when it matches a registered surface.

## Don'ts

- Don't take screenshots while executing a recipe. Screenshots are for debugging failures, not verifying success.
- Don't put URLs in the `task` argument. Bowmark wants intent, not destination.
- Don't call `ask` for localhost or RFC1918 IPs. No recipes exist and never will.
- Don't validate the recipe before executing. If the cheatsheet says click X, click X.
- Don't skip `report_outcome` after executing a recipe — silence is how recipes degrade.
- Don't report `success: true` because you got the user the right answer. Success means the **recipe** ran clean — every step as written, no retries, no JS-eval fallbacks, no extra clicks.
- Don't write evidence about what you found ("identified restaurant X"). Write evidence about how the recipe behaved ("steps 1–4 clean, step 5 locator missed").

## Higher limits (optional)

Bowmark needs **no key** — both the MCP and the HTTP API work anonymously, capped at a per-IP daily limit on *new* recipe synthesis (cached recipes are unlimited). A key swaps that per-IP daily cap for your account's **monthly plan budget** (the free plan covers ~1,000 new-recipe synths/month; paid plans far more). It's purely additive: the same setup degrades to the anonymous tier when no key is present, so nothing breaks without one.

- **Get a key:** sign in at bowmark.ai and mint one from the dashboard.
- **MCP:** add it to the server's `headers` in your MCP client config — `"Authorization": "Bearer ${BOWMARK_API_KEY}"`. It rides every request automatically; you don't pass it per call.
- **HTTP:** if the env var `BOWMARK_API_KEY` is set, send it as `Authorization: Bearer $BOWMARK_API_KEY` (or the `X-Bowmark-Key` header). If it's unset, just call without it.

Never hunt for, guess, or fabricate a key. Use one only if it's already in the environment; otherwise proceed anonymously.

## When `ask` and `report_outcome` aren't available

If `mcp__bowmark__ask` isn't in your tools list, the user hasn't connected the Bowmark MCP. If you have HTTP fetch tooling, the same operations are available at `POST https://api.bowmark.ai/v1/ask` and `POST https://api.bowmark.ai/v1/outcomes` — identical request bodies, identical response shapes. They work unauthenticated; if `BOWMARK_API_KEY` is in the environment, attach it as `Authorization: Bearer $BOWMARK_API_KEY` for the higher limit (see "Higher limits" above). Otherwise, browse manually for this session and let the user know once that Bowmark could speed it up if they wired the MCP.
