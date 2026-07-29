---
name: bowmark
description: |
  A callable function library for things that only exist behind a live website —
  searching flights across several aggregators, pricing a PC part across
  retailers, and other interaction-gated tasks. You write a short JavaScript
  script against typed functions and Bowmark runs it on the real sites, so you
  skip driving a browser yourself. Use this skill whenever a task needs data or
  an action that lives behind a form, a search, a configurator, or any flow a
  static fetch can't reach, and whenever the user names a site Bowmark covers.
  Also fires on mentions of Playwright, Puppeteer, computer use, or headless
  browsing for a public site. NOT for: localhost, 127.0.0.1, *.local, RFC1918
  IPs (10., 192.168., 172.16-31.) or any local-dev target; open-ended web search
  with no destination ("what's the news"); reading local files; plain JSON APIs
  you can already call; or facts already in training data.
---

# bowmark

The web as callable functions. Read the library, write a script, get the result.

## The loop

1. **Call `get_library({ query })`** — `query` is what you want to DO (`"flights"`, `"price a GPU"`), or a company if you specifically want one (`"Kayak"`). Omit it to see everything; the catalog is small.
2. **Write a short async JavaScript script** against the `bowmark` global, using the exact function names, argument shapes and return types the library gave you.
3. **Send it to `run({ script })`** and read `{ ok, status, result, logs, error, ms }` — branch on `status`.

There is no third call. Nothing to report back, no outcome to log — a run either returned a result or it returned an error, and both are already in your hands.

## Two tiers: capabilities and providers

**Capabilities are the default and usually what you want.** `bowmark.flights.search(...)` is one call that fans out across several aggregators, adapts each one's output into a single normalized shape, dedupes the same physical flight across them, ranks the results, and keeps working when one site is down.

**Providers are the individual sites,** callable directly at `bowmark.providers.<provider>.<fn>(...)` — `bowmark.providers.kayak.search(...)`. They appear in the library only when your query **named a company**, or when the capability has exactly **one** provider behind it (so there is no abstraction to protect).

Choose the provider tier when the user asked for that specific site — "check Kayak", "what does Newegg have". Choose the capability otherwise. Naming a site the user didn't name is a downgrade, not a courtesy:

| | Capability | Provider |
|---|---|---|
| Sites covered | several, in one call | exactly one |
| Result shape | one normalized type | that site's own native shape |
| Duplicate results | deduped across sites | not deduped |
| A site breaks | routed around | your script fails |

A provider returns its **own** types, documented under its own heading in the library. Don't assume a provider's row looks like the capability's — read the types you were given.

## The language

Plain async JavaScript. `bowmark` is already a global; there is no import step (a leading `import { bowmark } from "bowmark"` is tolerated and stripped, but it does nothing).

- Every capability and provider function is **async** — always `await`.
- Real control flow: `if`, loops, `map`/`filter`/`sort`/`slice`, and `Promise.all` for fan-out.
- `return` a value to get it back, JSON-serialized.
- `log(...)` records a progress line; the lines come back in `logs`, in order.
- `bowmark` is the **only** I/O. No `fetch`, no `process`, no filesystem, no `import`/`require`.
- Scripts run in a hard sandbox with CPU, memory and wall-clock limits. Keep them small and deterministic; no infinite loops.

Write a plain async body, not a wrapping function:

```js
const flights = await bowmark.flights.search({ from: "SFO", to: "JFK", depart: "2026-09-01" });
return flights.sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9))[0];
```

## Composition is the point

One script, several calls, combined however the task needs. This is the thing you cannot do by driving a browser step by step, and it's why a script beats a sequence of tool calls.

```js
// Sweep a date range in parallel, then pick the cheapest across all of them.
const dates = ["2026-09-01", "2026-09-02", "2026-09-03"];
const runs = await Promise.all(
  dates.map((depart) => bowmark.flights.search({ from: "SFO", to: "JFK", depart })),
);
return runs.flat().sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9)).slice(0, 5);
```

Each result carries the query it came from (a flight result carries its `date`), so you can tell merged runs apart.

## Reading the response

`run` returns `{ ok, status, result, logs, error, ms }`, plus `trace` and `traceUrl`.

**Branch on `status`, not on `ok`** — it is `ok` | `error` | `needs_user`, and the third one is not a failure.

- **`status: "ok"`** — `result` is whatever you returned. Use it.
- **`status: "error"`** — `error` is the message; `result` is null. The script threw or timed out. Read `error` and `logs` together: the last `log()` line tells you how far it got.
- **`status: "needs_user"`** — a site needs the USER signed in. See below. Not something you can fix by editing the script.
- **`logs`** — your `log()` lines in order. Read them alongside `result`: `logs` is the only channel a script has for anything that is not its return value, so on a partial or surprising answer they are what tells you how far it got.
- **`trace`** — the receipt: which capabilities you called and which providers each fanned out to, as `[{ kind:'capability', capability:'flights', method:'search', ms }, { kind:'provider', capability:'flights', provider:'google_flights', fn:'search', results, status, ms }, …]`. A direct provider call appears with an empty `capability`, because nothing routed it.
- **`traceUrl`** — deep-links this run in the operator's trace inspector.

## When a site needs the user signed in

`status: "needs_user"` means a capability reached a page that requires a login. **Nothing about your script is wrong**, and re-sending it before the user has signed in will stop at exactly the same place and cost another run.

What comes back:

- **`needs`** — one entry per site, each `{ capability, provider, providerTitle, kind }`. `providerTitle` is what to call the site when you talk to the user.
- **`meta.handoff`** — `{ url, expiresAt, ref }`. `url` is a single-use link that expires (usually in minutes).

What to do, in order:

1. Give the user the `url` and name the sites it covers. One link covers every site the script needs.
2. **Wait.** Don't poll, don't retry, don't try a different site instead.
3. When they say they're done, send **the same script again, unchanged**.

What never to do: ask the user for a password, offer to sign in on their behalf, or route around the login by scraping something else. The link opens a browser they drive themselves; Bowmark stores the resulting session, never their credentials.

If the message says logged-in runs need an API key, that's the fix — tell the user to add a Bowmark API key to the MCP connection's `Authorization: Bearer` header (they mint one at bowmark.ai). Retrying won't help.

## When a run fails

Read the error before retrying. The three classes need different responses:

- **A script error** (a `TypeError`, a bad argument shape) — your script is wrong. Re-read the types in the library and fix it. Re-running unchanged will fail identically.
- **A timeout** — the script was too big for one run. Split it: fewer parallel calls, or a narrower query.
- **A site failure inside a capability** — the capability already routed around it where it could. If the whole call failed, the result genuinely isn't available right now; say so rather than inventing one.

If you pinned a **provider** and it failed, retry through the **capability** instead — it covers the same ground across other sites. That's the tradeoff you took when you pinned.

Fall back to browsing manually when: `get_library` shows no capability for the task, the user needs an action nothing in the library covers, or a run failed for a site-side reason and the answer is time-critical. Bowmark covering nothing for a task is a normal outcome, not an error — the library is explicit about what exists, so check it rather than guessing.

## Don'ts

- Don't call `get_library` with a URL. Pass a task or a company name.
- Don't call it for localhost or RFC1918 addresses. Nothing there is covered and nothing will be.
- Don't invent a function. If it isn't in the library, it isn't callable — everything listed is real, and nothing unlisted is.
- Don't reach for a provider when the user didn't name a site. You lose dedupe, ranking and failover for nothing.
- Don't assume a provider returns the capability's shape. Providers return their own types.
- Don't fabricate a value the user has to supply — a password, a card number, a personal detail. Ask them.
- Don't retry a `needs_user` run before the user has actually signed in. It stops at the same place and costs another run.
- Don't ask the user for site credentials, ever. The handoff link is how they sign in; you never see or handle a password.
