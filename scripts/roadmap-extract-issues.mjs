#!/usr/bin/env node
/**
 * Extract roadmap issues from docs/product/12-roadmap-milestones.md for GitHub sync.
 * Pure Node — no dependencies.
 *
 * CLI:
 *   node scripts/roadmap-extract-issues.mjs --milestone M1 [--doc path/to/12-roadmap-milestones.md]
 *
 * Prints JSON: { milestoneKey, githubMilestoneTitle, issues: [{ id, title, body }] }
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

/**
 * @param {string} markdown full doc contents
 * @param {string} milestoneKey e.g. M1
 */
export function extractIssues(markdown, milestoneKey) {
  const lines = markdown.split(/\r?\n/);

  const sectionHeaderRe = new RegExp(`^## \\d+\\. (${milestoneKey}) · (.+)$`);
  let sectionStart = -1;
  let sectionSuffix = "";
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(sectionHeaderRe);
    if (m) {
      sectionStart = i;
      sectionSuffix = m[2];
      break;
    }
  }
  if (sectionStart === -1) {
    throw new Error(
      `No milestone section found for ${milestoneKey} (expected "## N. ${milestoneKey} · …").`,
    );
  }

  let sectionEnd = lines.length;
  const nextSectionRe = /^## \d+\. M\d · /;
  for (let i = sectionStart + 1; i < lines.length; i++) {
    if (nextSectionRe.test(lines[i])) {
      sectionEnd = i;
      break;
    }
  }

  const slice = lines.slice(sectionStart, sectionEnd);
  const githubMilestoneTitle = `${milestoneKey} · ${sectionSuffix}`;

  const issueHeaderRe = new RegExp(`^#### (${milestoneKey}-\\d+) · (.+)$`);
  const issues = [];

  for (let i = 0; i < slice.length; i++) {
    const mh = slice[i].match(issueHeaderRe);
    if (!mh) continue;

    const id = mh[1];
    const shortTitle = mh[2];
    const bodyStart = i + 1;
    let bodyEnd = slice.length;

    for (let j = bodyStart; j < slice.length; j++) {
      // Next issue, or next milestone subsection (e.g. ### M2.6 Grafo).
      if (/^#### /.test(slice[j]) || /^### M\d+\.\d/.test(slice[j])) {
        bodyEnd = j;
        break;
      }
    }

    const body = slice.slice(bodyStart, bodyEnd).join("\n").trim();
    issues.push({
      id,
      title: `${id} · ${shortTitle}`,
      body,
    });
  }

  if (issues.length === 0) {
    throw new Error(
      `No issues found under ${milestoneKey} (expected headings like "#### ${milestoneKey}-01 · …"). Is this milestone still a placeholder?`,
    );
  }

  return { milestoneKey, githubMilestoneTitle, issues };
}

function parseArgs(argv) {
  let milestone = "";
  let doc = path.join(process.cwd(), "docs/product/12-roadmap-milestones.md");
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--milestone" && argv[i + 1]) {
      milestone = argv[++i].trim().toUpperCase();
    } else if (a === "--doc" && argv[i + 1]) {
      doc = path.resolve(argv[++i]);
    }
  }
  if (!/^M[1-9]$/.test(milestone)) {
    console.error(
      "Usage: node scripts/roadmap-extract-issues.mjs --milestone M1 [--doc docs/product/12-roadmap-milestones.md]",
    );
    process.exit(1);
  }
  return { milestone, doc };
}

function main() {
  const { milestone, doc } = parseArgs(process.argv);
  const md = fs.readFileSync(doc, "utf8");
  const result = extractIssues(md, milestone);
  console.log(JSON.stringify(result, null, 2));
}

const invokedAsMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (invokedAsMain) {
  main();
}
