---
name: bowmark-page-watch
description: Read one or more web pages on a schedule through Bowmark and report what changed since the last run
metadata:
  title: Bowmark Page Watch
  mode: read-only
  category: basics
  var: ""
  tags:
    - web
    - monitoring
    - research
  requires:
    - BOWMARK_API_KEY
---

> **${var}**: one or more page URLs, separated by spaces. When empty, use the URLs listed in `memory/bowmark-watch.md` under `## Pages`.

Today is ${today}. Read each page in **${var}** and report what changed since the last run.

## Phase 1: Read the pages

Bowmark runs a short script against live websites and returns the result as JSON. One call reads every URL in the batch.

```bash
URLS="${var}"
[ -z "$URLS" ] && URLS=$(sed -n '/^## Pages/,/^## /p' memory/bowmark-watch.md 2>/dev/null | grep -Eo 'https?://[^ )]+')
[ -z "$URLS" ] && { echo "bowmark-page-watch: no URLs given and none in memory/bowmark-watch.md"; exit 0; }
JSON_URLS=$(printf '%s\n' $URLS | jq -R . | jq -sc .)
SCRIPT="const urls = $JSON_URLS; const pages = await bowmark.read.pages(urls, { maxChars: 20000 }); return pages.map((p, i) => ({ url: urls[i], ok: p.ok, title: p.title, content: p.content, error: p.error }));"
PAYLOAD=$(jq -nc --arg s "$SCRIPT" '{script: $s}')
HTTP=$(./secretcurl -s -o /tmp/bowmark-pages.json -w '%{http_code}' --max-time 90 \
  -X POST https://api.bowmark.ai/v1/run \
  -H 'Authorization: Bearer {BOWMARK_API_KEY}' \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD")
echo "bowmark http=$HTTP"
```

The response is `{ ok, result, runId, error }`. Read the pages from `result`. A page that comes back `ok: false` is reported as unreachable for this run, not as a change.

## Phase 2: Compare with the last run

For each page, compare `content` with the snapshot saved at `memory/bowmark-watch/<sha1 of url>.md`.

- No snapshot yet: save one and report the page as "now watching".
- Same text: report "no change".
- Different text: summarise what changed in two or three bullets (new items, removed items, changed numbers or dates), then overwrite the snapshot.

Ignore changes that are only timestamps, view counters or rotating ads.

## Phase 3: Output

Put this in your final output (the read-only guard writes the log entry):

```
### bowmark-page-watch
- <url>: no change | now watching | changed: <one line> | unreachable: <error>
```

If any page changed, send one `./notify` message listing only the changed pages.

## Error handling

- `401`: `BOWMARK_API_KEY` is missing or wrong. Get a key at https://www.bowmark.ai (it comes with a free $10 of use).
- Any other non-200: log the status and stop without touching snapshots.

## Constraints

- Never print the API key. Always go through `./secretcurl` with the `{BOWMARK_API_KEY}` placeholder.
- Read-only: this skill never posts, submits or signs in anywhere.
