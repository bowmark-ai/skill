#!/usr/bin/env node
// Generates the OpenAI Apps (ChatGPT plugin) variant of the canonical bowmark
// skill as a content mirror at packages/skill/openai/bowmark/SKILL.md, and can
// build the distributable ZIP the OpenAI plugin "Skills" uploader takes.
//
// WHY a variant: the OpenAI plugin always ships the MCP alongside the skill, and
// ChatGPT exposes the tools under their bare names. So this variant differs from
// the canonical (Claude/Codex/anywhere) skill in three deterministic ways:
//   1. drops the trailing no-MCP HTTP-fallback + "Higher limits" sections — the
//      MCP is always present here, so neither applies (and ChatGPT can't freely
//      POST to the HTTP API anyway);
//   2. rewrites `mcp__bowmark__*` → bare tool names to match ChatGPT's MCP surface;
//   3. trims frontmatter fields OpenAI doesn't read (version, allowed-tools),
//      and generalizes Claude-Code-only browser tool names used as examples.
//
// Canonical SKILL.md stays the SINGLE source of truth — never edit the generated
// copy. Same discipline as packages/plugin/sync-skill.sh: edit canonical, then
// regenerate. CI runs `--check` to fail any PR that forgets.
//
//   node build-openai.mjs            regenerate the mirror
//   node build-openai.mjs --check    fail if the mirror is stale
//   node build-openai.mjs --zip PATH regenerate, then build the ZIP at PATH
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, "bowmark/SKILL.md");
const DST = resolve(here, "openai/bowmark/SKILL.md");

function transform(src) {
  // 1) cut the trailing "Higher limits" + no-MCP HTTP fallback sections. Both
  //    are the last two sections; "Higher limits" comes first, so slicing from
  //    it to EOF removes both. The variant ends after "## Don'ts".
  const cut = src.indexOf("\n## Higher limits");
  let out = (cut === -1 ? src : `${src.slice(0, cut)}\n`).replace(/\n+$/, "\n");
  // 2) bare tool names — ChatGPT surfaces the live MCP tools without the
  //    Claude `mcp__bowmark__` prefix.
  out = out.replace(/mcp__bowmark__(get_library|run|report|register)/g, "$1");
  // 3) generalize Claude-Code browser-tool names used only as "raw browser code"
  //    examples — ChatGPT has no such tools, so a literal name would be a dead
  //    reference.
  out = out
    .replace(/No raw browser code \(`browser_run_code_unsafe` etc\.\)\./g, "No raw browser code.")
    .replace(/`browser_run_code_unsafe`(?: etc\.)?/g, "raw browser scripting")
    .replace(/Fell back to `fill_form`\./g, "Fell back to raw form-filling.")
    .replace(/`fill_form`/g, "raw browser scripting");
  // 4) drop the dangling cross-reference to the removed "Higher limits" section
  //    (API keys aren't user-configurable inside the OpenAI plugin anyway).
  out = out.replace(
    / A free API key \(see "Higher limits" below\) lifts the anonymous per-IP cap to a plan budget\./g,
    "",
  );
  // 5) drop frontmatter fields OpenAI does not read.
  out = out.replace(/^version:.*\n/m, "").replace(/^allowed-tools:.*\n/m, "");
  return out;
}

const mode = process.argv[2];
const generated = transform(readFileSync(SRC, "utf8"));

if (mode === "--check") {
  let current = "";
  try {
    current = readFileSync(DST, "utf8");
  } catch {
    /* missing file → stale */
  }
  if (current !== generated) {
    console.error("openai skill mirror is stale.\nrun: node packages/skill/build-openai.mjs");
    process.exit(1);
  }
  console.log("openai skill mirror in sync");
  process.exit(0);
}

// default + --zip both (re)write the mirror first.
mkdirSync(dirname(DST), { recursive: true });
writeFileSync(DST, generated);
console.log(`wrote ${DST}`);

if (mode === "--zip") {
  const out = process.argv[3];
  if (!out) {
    console.error("usage: node build-openai.mjs --zip <path>");
    process.exit(1);
  }
  const abs = resolve(process.cwd(), out);
  mkdirSync(dirname(abs), { recursive: true });
  // archive root is `bowmark/` so the uploaded skill folder is named correctly.
  execFileSync("zip", ["-rq", abs, "bowmark"], { cwd: resolve(here, "openai"), stdio: "inherit" });
  console.log(`built ${abs}`);
}
