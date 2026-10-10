#!/usr/bin/env node
// Generates the OpenAI Apps (ChatGPT plugin) variant of the canonical bowmark
// skill as a content mirror at packages/skill/openai/bowmark/SKILL.md, and can
// build the distributable ZIP the OpenAI plugin "Skills" uploader takes.
//
// WHY a variant: the OpenAI plugin always ships the MCP alongside the skill, and
// ChatGPT exposes the tools under their bare names. So this variant differs from
// the canonical (Claude/Codex/anywhere) skill in four deterministic ways:
//   1. drops the trailing "Your API key" section — the
//      MCP is always present here, so neither applies (and ChatGPT can't freely
//      POST to the HTTP API anyway);
//   2. rewrites `mcp__bowmark__*` → bare tool names to match ChatGPT's MCP surface;
//   3. trims frontmatter fields OpenAI doesn't read (version, allowed-tools),
//      and generalizes Claude-Code-only browser tool names used as examples;
//   4. drops the three secret tools, which the ChatGPT directory connector
//      does not offer, and points at the dashboard instead.
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
  // 1) cut the trailing "Your API key" section and everything after it. ChatGPT
  //    signs in by OAuth and cannot send a key, so a key how-to is a dead end
  //    there. The variant ends after "## Don'ts".
  const cut = src.indexOf("\n## Your API key");
  let out = (cut === -1 ? src : `${src.slice(0, cut)}\n`).replace(/\n+$/, "\n");
  // 2) bare tool names — ChatGPT surfaces the live MCP tools without the
  //    Claude `mcp__bowmark__` prefix.
  out = out.replace(/mcp__bowmark__(get_library|run|report)/g, "$1");
  // 3) generalize Claude-Code browser-tool names used only as "raw browser code"
  //    examples — ChatGPT has no such tools, so a literal name would be a dead
  //    reference.
  out = out
    .replace(/No raw browser code \(`browser_run_code_unsafe` etc\.\)\./g, "No raw browser code.")
    .replace(/`browser_run_code_unsafe`(?: etc\.)?/g, "raw browser scripting")
    .replace(/Fell back to `fill_form`\./g, "Fell back to raw form-filling.")
    .replace(/`fill_form`/g, "raw browser scripting");
  // 5) drop frontmatter fields OpenAI does not read.
  out = out.replace(/^version:.*\n/m, "").replace(/^allowed-tools:.*\n/m, "");
  // 4) (after 5, so allowed-tools is already gone) drop the secret tools. The OpenAI plugin's MCP is the ChatGPT directory
  //    connector (/mcp/chatgpt-app), which does not offer list_secrets,
  //    request_secret or get_secret_link — OpenAI's plugin guidelines bar a listed
  //    plugin from soliciting credentials. apps/api `mcp-destinations.ts` holds the
  //    same three names as SECRET_TOOL_NAMES. Each edit must match, so a canonical
  //    reword fails the build here instead of shipping a bullet for a tool ChatGPT
  //    was never given; the final check asserts none of the names survived.
  out = withoutSecretTools(out);
  return out;
}

const SECRET_TOOL_NAMES = ["list_secrets", "request_secret", "get_secret_link"];

function replaceOnce(text, pattern, replacement) {
  if (!pattern.test(text)) {
    throw new Error(
      `build-openai: canonical SKILL.md no longer matches ${pattern} — update withoutSecretTools`,
    );
  }
  return text.replace(pattern, replacement);
}

function withoutSecretTools(src) {
  let out = src;
  out = replaceOnce(
    out,
    /\nSix tools, and the order matters:\n/,
    "\nThree tools, and the order matters:\n",
  );
  out = replaceOnce(
    out,
    /- \*\*`list_secrets\(\{\}\)`\*\*[\s\S]*?(?=\nUse a stored credential)/,
    "- **Stored credentials are the user's, at https://bowmark.ai/dashboard/secrets.** They add\n" +
      "  one there under the name your script will use, and see which ones they already hold.\n",
  );
  out = replaceOnce(
    out,
    /- \*\*Call `list_secrets` before `request_secret`\.\*\*[\s\S]*?for nothing\.\n/,
    "- **Ask before sending the user to set a credential.** One they already stored is ready to\n" +
      "  use by name, and setting it again is a trip for nothing.\n",
  );
  out = replaceOnce(
    out,
    /Hand them the\n {2}link instead\./,
    "Send them to\n  https://bowmark.ai/dashboard/secrets instead.",
  );
  out = replaceOnce(
    out,
    /- \*\*`list_connections` and `get_secret_link` are read-only\*\* — neither changes anything, so reach for them freely/,
    "- **`list_connections` is read-only** — it changes nothing, so reach for it freely",
  );
  const left = SECRET_TOOL_NAMES.filter((name) => out.includes(name));
  if (left.length) {
    throw new Error(`build-openai: the OpenAI variant still names ${left.join(", ")}`);
  }
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
