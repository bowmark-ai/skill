# Bowmark Pack for Aeon

A community skill pack for [Aeon](https://github.com/aeonfun/aeon). It lets an Aeon agent read live websites on a schedule through [Bowmark](https://www.bowmark.ai).

| Skill | What it does | Default schedule |
| --- | --- | --- |
| `bowmark-page-watch` | Reads one or more pages and reports what changed since the last run | daily 13:00 UTC |

## Install

```bash
bin/install-skill-pack bowmark-ai/skill --path aeon
```

Then add `BOWMARK_API_KEY` as a repository secret. Get a key at https://www.bowmark.ai. It comes with a free $10 of use.

Skills install disabled. Enable them in `aeon.yml`, and list the pages to watch in `memory/bowmark-watch.md` under `## Pages`, or pass them as the skill's `var`.
