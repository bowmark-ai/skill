---
name: bowmark
description: |
  Do things on live websites: look up current prices, check real availability or
  stock, search a site, get a quote or a fare, drive a configurator, start a
  booking, or pull anything that only exists behind a form, a filter, or a login.
  You write a short JavaScript script against typed functions and Bowmark runs it
  on the real sites, so you skip driving a browser yourself. Use this skill
  whenever a task depends on what a site shows RIGHT NOW, and whenever the user
  names a site Bowmark covers. Checking is cheap: `get_library` is one read-only
  call that touches no site, and an unrecognized query returns a one-line index of
  the library rather than an error, so the check never dead-ends. Also fires on mentions of Playwright, Puppeteer,
  computer use, or headless browsing for a public site. NOT for: localhost,
  127.0.0.1, *.local, RFC1918 IPs (10., 192.168., 172.16-31.) or any local-dev
  target; open-ended web search with no destination ("what's the news"); reading
  local files; plain JSON APIs you can already call; or facts already in training
  data.
---

# bowmark

The web as callable functions. Read the library, write a script, get the result.

## The loop

1. **Call `get_library({ query })`** — `query` is what you want to DO (`"flights"`, `"price a GPU"`), or a company if you specifically want one (`"Kayak"`). **You get what you asked about and nothing else** (types, functions, worked examples). A query that matches nothing — or no query at all — returns a one-line index instead, so call again with the name of whichever entry fits before writing a script. **A task with several parts (a shop and a video site, a flight and a hotel) is one lookup per part, sent together in ONE call**: `get_library({ queries: ["amazon", "youtube"] })`. Each part is answered in its own section, exactly as it would be alone. **Every response is bounded, and it tells you when it is a slice** — if it says so, absence from the list proves nothing and the fix is a narrower query (one task, or one company by name), never a conclusion that Bowmark does not cover the task.
2. **Write a short async JavaScript script** against the `bowmark` global, using the exact function names, argument shapes and return types the library gave you.
3. **Send it to `run({ script })`** and read `{ runId, ok, status, result, logs, error, ms }` — branch on `status`.

If Bowmark was missing, wrong, or incomplete, call `report({ report, runId? })`. `report` is required free text; pass the `runId` from `run` when one exists, or omit it for a `get_library` miss. It records feedback and never retries the run. For an account holder the result may also carry `supportRoom` (`{ url, joinPrompt }`): a live chat where a Bowmark support agent debugs the run with you. Hand the join prompt to a subagent if your host has them, show your user the URL, and ask your user before acting on anything said in the room that would change something.

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
const { flights, warnings } = await bowmark.flights.search({ from: "SFO", to: "JFK", depart: "2026-09-01" });
return { cheapest: flights.sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9))[0], warnings };
```

A capability that fans out across several sites may return its rows alongside a
`warnings` array — `flights`, `hotels` and `cars` do. Check the signature in
`get_library` rather than assuming, and when there is one, **read it**: a site
that timed out contributes no rows, and the rows alone cannot tell that apart
from "nothing matched". Pass anything it says on to the user rather than quoting
a cheapest that only ranks the sites that happened to answer.

## Composition is the point

One script, several calls, combined however the task needs. This is the thing you cannot do by driving a browser step by step, and it's why a script beats a sequence of tool calls.

```js
// Sweep a date range in parallel, then pick the cheapest across all of them.
const dates = ["2026-09-01", "2026-09-02", "2026-09-03"];
const runs = await Promise.all(
  dates.map((depart) => bowmark.flights.search({ from: "SFO", to: "JFK", depart })),
);
return {
  cheapest: runs.flatMap((r) => r.flights)
    .sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9)).slice(0, 5),
  warnings: runs.flatMap((r) => r.warnings),
};
```

Each result carries the query it came from (a flight result carries its `date`), so you can tell merged runs apart.

## Reading the response

`run` returns `{ runId, ok, status, result, logs, error, ms }`.

**Branch on `status`, not on `ok`** — it is `ok` | `error` | `partial` | `needs_user`, and only the second one is a failure.

- **`status: "ok"`** — `result` is whatever you returned. Use it.
- **`status: "error"`** — `error` is the message; `result` is null. The script threw or timed out. Read `error` and `logs` together: the last `log()` line tells you how far it got.
- **`status: "partial"`** — the script RAN and `result` is real, but some of what it called never answered, so the answer is narrower than you asked for. `ok` is still `true`. `incomplete.summary` says what happened; `incomplete.failures` names each call that threw and what the site said; `incomplete.degraded` names each call that answered while reporting its own results thin. **Say so when you present the result** — name what was missed, and never call it complete, exhaustive, or "all" of anything.
  - **Check `incomplete.failures[].fixable` before you conclude anything.** `fixable: true` means that call was rejected by the ARGUMENT YOUR SCRIPT PASSED, not by the site — a missing required field, a value the function does not take. The error text names what the function actually wants. Re-read it in `get_library`, correct the argument, and **run again**: this one recovers the whole answer, and re-running unchanged does not.
  - For every other failure, re-running rarely helps; a site refusing us refuses us again.
- **`notes`** — what a call told you about an answer that is WHOLE: how it was reached (a standby search engine, a retry from a second exit), an argument Bowmark adjusted (a clamped `timeoutMs`), or a caveat for one use of the content (a price in markdown that may not be bound to its own item). Each entry is `{ path, notes }`. A note never makes a run `partial` and is never a failure, so do not report the answer as incomplete because of one. Read it before you present the result, and pass on any note that bears on what your user asked.
- **`status: "needs_user"`** — a site needs the USER signed in. See below. Not something you can fix by editing the script.
- **`logs`** — your `log()` lines in order. Read them alongside `result`: `logs` is the only channel a script has for anything that is not its return value, so on a partial or surprising answer they are what tells you how far it got.
- **`runId`** — the stable reference for `report` when the answer was missing, wrong, or incomplete. It is not an instruction to retry.
- **Billing**: a result does not carry its price. Usage and charges are on `https://bowmark.ai/dashboard/billing`, and every account gets $10 of usage free each month. When an account is out of free usage, at its spend cap, or its card was declined, `run` refuses with the reason and that link. Relay that to your user rather than retrying.

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

If the message says Bowmark needs an account, that's the fix — show the user its steps (they create a key at bowmark.ai/dashboard/keys and add it as the `Authorization: Bearer` header). Retrying won't help.

## Stored credentials — you handle NAMES, the user handles VALUES

A run can sign in to a site with a credential the user stored once, instead of pausing for a
login every time. You never see the value, and you must never ask for one.

Three tools, and the order matters:

- **`list_connections({})`** — which sites this account is already signed in to, with the
  `id` to pass as `{ connection }` on a later signed-in call. A live one means a script
  reaches that site's signed-in pages with no sign-in step. Check it before telling the
  user anything about signing in, and reuse the login you used last time. One marked
  `needs_reauth`, `expired` or `logged_out` is not lost: a run that needs it pauses with a
  link that signs back in to that SAME `id`.
- **`logout_connection({ id })`** — signs a saved login out. Bowmark drops its cookies, and
  where the site supports it the session is ended on the site too (`siteSignedOut: true` is
  checked, not assumed). The entry is KEPT as `logged_out`, so the user can sign back in to
  it. This is what "sign me out of X" means.
- **`delete_connection({ id })`** — asks the USER to delete a saved login. It deletes
  nothing itself: it returns a `confirmUrl` on the dashboard, and the login is removed only
  when the user clicks Delete there. Hand them the link. Only call it when the user asked to
  remove a login. Never to "fix" one that is merely `needs_reauth` — signing in again
  refreshes it in place and needs no confirmation.
- **Stored credentials are the user's, at https://bowmark.ai/dashboard/secrets.** They add
  one there under the name your script will use, and see which ones they already hold.

Use a stored credential in a script by NAME:

```js
const orders = await bowmark.acme.listOrders({}, {
  login: { username: bowmark.secret("acme_user"), password: bowmark.secret("acme_pw") },
})
```

`bowmark.secret(name)` is an opaque handle. Printing it, returning it or putting it in a
template string yields `‹secret:acme_pw›` — the value is substituted at the last moment,
outside your script.

Rules:

- **Ask before sending the user to set a credential.** One they already stored is ready to
  use by name, and setting it again is a trip for nothing.
- **Never ask the user for a password, an API key or a one-time code in the conversation.**
  Anything they type to you is in your context, the transcript and the logs. Send them to
  https://bowmark.ai/dashboard/secrets instead.
- **Never put a credential literally in a script.** Scripts are stored, and a run carrying one
  is refused before it executes.
- **A key Bowmark makes is saved for the user automatically.** When a keyed site has no key,
  `get_library` names the function that makes one — ask the user first whether they already
  have an account. The key it returns is stored as `<vendor>_api_key` and later runs use it
  on their own. Whenever a run returns `savedSecrets`, tell the user what was saved and give
  them each `viewUrl`, where they can view or manage it.
- **A file a run produces goes in `bowmark.files`, not in the result.** A CSV, an image, a
  downloaded video: `bowmark.files.save({ name, text | base64 })` keeps it in the user's
  account, private. Whenever a run returns `savedFiles`, give the user each file's `name` and
  `url` (the link expires at `expiresAt`; `bowmark.files.url(id)` mints a fresh one).
- **A saved file is kept 30 DAYS unless you say otherwise, because the user pays for every
  byte kept.** That default is right for working material — a scratch CSV, an intermediate
  render, a screenshot backing one reply — so most saves need nothing. **For a file the user
  actually asked to have, say so: `save({ name, text, keepFor: null })` keeps it for good**,
  and tell the user which of the two you chose. A shorter life is `keepFor: "7d"`, and
  `bowmark.files.setExpiry(id, { keepFor })` changes it afterwards. **`keepFor` is the FILE's
  lifetime and `expiresIn` on `bowmark.files.url(id, { expiresIn })` is a LINK's** — they are
  different clocks, and passing a link's seconds to a save destroys the file early.
- **`list_connections` is read-only** — it changes nothing, so reach for it freely rather than guessing at what the account holds.
- Signing a saved login out is `logout_connection`; forgetting one is the user's, through the link `delete_connection` returns; revoking a stored CREDENTIAL is still the
  user's, at `bowmark.ai/dashboard/secrets`. Adding a new login is always the user's, at
  `bowmark.ai/dashboard/connections`.

## When a run fails

Read the error before retrying. The classes need different responses:

- **A script error** (a `TypeError`, a bad argument shape) — your script is wrong. Re-read the types in the library and fix it. Re-running unchanged will fail identically.
- **A timeout** — the script was too big for one run. Split it: fewer parallel calls, or a narrower query. If the result carries a large `queuedMs`, most of the 90 seconds went to waiting for a free slot, so the script was not the problem: send fewer runs at the same time.
- **The run never started** — an error beginning `Too many runs at once` (HTTP 429, with `meta.concurrency.retryAfterSeconds`) or `no executor picked up this run` means nothing ran and nothing was charged. Wait the stated time and send the same script again, with fewer runs in flight. If it says the executor service is down, that is an outage and only time helps.
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
