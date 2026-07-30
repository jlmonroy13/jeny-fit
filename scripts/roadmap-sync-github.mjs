#!/usr/bin/env node
/**
 * Create GitHub milestone + issues from docs/product/12-roadmap-milestones.md,
 * then add each issue to a GitHub Project (classic REST board or Projects v2 via gh project).
 *
 * Prerequisites:
 *   gh authenticated (`gh auth login`)
 *   Token scopes: repo, read:org (if org repo), project (for gh project item-add)
 *   gh auth refresh -s project   # if item-add fails with OAuth scope errors
 *
 * Usage:
 *   node scripts/roadmap-sync-github.mjs --milestone M1 --repo OWNER/REPO --dry-run
 *   node scripts/roadmap-sync-github.mjs --milestone M1 --repo OWNER/REPO \
 *     --project-owner jlmonroy13 --project-number 11
 *
 * Optional:
 *   --doc PATH              default: docs/product/12-roadmap-milestones.md
 *   --project-owner LOGIN   default: @me  (use repo owner's login for user-owned projects)
 *   --project-number N      if omitted, issues are created but not added to a Project
 *   --label NAME            repeatable (must exist on repo unless you create them first)
 *
 * Defaults file (optional): .cursor/roadmap-sync.defaults.json in cwd — keys repo,
 * projectOwner, projectNumber. CLI flags override the file.
 *
 * Labels: inferred from **Tipo** → type/* and **Estimación** → size/*, plus roadmap/m1.
 * Depends on: roadmap IDs (M1-01) on that line are rewritten to #issue after earlier issues exist.
 *
 * Flags:
 *   --repair              Re-apply labels + dependency #refs for issues already in the milestone
 *   --no-labels           Skip automatic labels
 *   --no-deps-resolve     Keep Depends on as M1-NN (no # substitution)
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { extractIssues } from "./roadmap-extract-issues.mjs";

const __filename = fileURLToPath(import.meta.url);

/** @returns {{ repo?: string; projectOwner?: string; projectNumber?: string }} */
function loadDefaultsFile() {
  const p = path.join(process.cwd(), ".cursor/roadmap-sync.defaults.json");
  if (!fs.existsSync(p)) return {};
  try {
    const raw = JSON.parse(fs.readFileSync(p, "utf8"));
    return {
      repo: typeof raw.repo === "string" ? raw.repo.trim() : undefined,
      projectOwner:
        typeof raw.projectOwner === "string"
          ? raw.projectOwner.trim()
          : undefined,
      projectNumber:
        raw.projectNumber !== undefined && raw.projectNumber !== null
          ? String(raw.projectNumber).trim()
          : undefined,
    };
  } catch {
    console.warn(
      "Warning: could not parse .cursor/roadmap-sync.defaults.json — ignoring.",
    );
    return {};
  }
}

function gh(args, options = {}) {
  const opts = { encoding: "utf8", ...options };
  return execFileSync("gh", args, opts);
}

/** @type {Record<string, string>} */
const TIPO_TO_LABEL = {
  backend: "type/backend",
  frontend: "type/frontend",
  infra: "type/infra",
  tests: "type/tests",
  docs: "type/docs",
  chore: "type/chore",
  feat: "type/feat",
  fix: "type/fix",
};

/** @type {Record<string, string>} */
const EST_TO_LABEL = {
  S: "size/small",
  M: "size/medium",
  L: "size/large",
  "🟢": "size/small",
  "🟡": "size/medium",
};

/** GitHub label hex colors (muted) */
/** @type {Record<string, string>} */
const LABEL_COLORS = {
  "type/backend": "0052CC",
  "type/frontend": "1D76DB",
  "type/infra": "5319E7",
  "type/tests": "FBCA04",
  "type/docs": "0E8A16",
  "type/chore": "BFDADC",
  "type/feat": "1D76DB",
  "type/fix": "D93F0B",
  "size/small": "C5DEF5",
  "size/medium": "FEF2C0",
  "size/large": "F9D0C4",
};

/**
 * @param {string} body issue body (canonical markdown from doc)
 * @returns {string[]}
 */
function inferRoadmapLabels(body) {
  const labels = [];
  const tipo =
    body.match(/^\*\*Tipo:\*\*\s*(\w+)/m) ??
    body.match(/^- \*\*Tipo\*\*:\s*(\w+)/m);
  if (tipo && TIPO_TO_LABEL[tipo[1]]) {
    labels.push(TIPO_TO_LABEL[tipo[1]]);
  }
  const est =
    body.match(/^\*\*Estimación:\*\*\s*(S|M|L|🟢|🟡)/m) ??
    body.match(/^- \*\*Estimación\*\*:\s*(S|M|L|🟢|🟡)/m);
  if (est && EST_TO_LABEL[est[1]]) {
    labels.push(EST_TO_LABEL[est[1]]);
  }
  return labels;
}

/**
 * @param {string} repo
 * @param {string} milestoneKey e.g. M1
 */
function milestoneRoadmapLabel(milestoneKey) {
  return `roadmap/${milestoneKey.toLowerCase()}`;
}

/**
 * @param {string} repo
 * @param {string[]} labelNames
 * @param {boolean} dryRun
 */
function ensureLabelsExist(repo, labelNames, dryRun) {
  if (dryRun) return;
  const seen = new Set();
  for (const name of labelNames) {
    if (seen.has(name)) continue;
    seen.add(name);
    const color =
      LABEL_COLORS[name] ?? (name.startsWith("roadmap/") ? "D4C5F9" : "EDEDED");
    try {
      gh(["label", "create", name, "-R", repo, "--color", color, "-f"]);
    } catch {
      /* exists or permission — continue */
    }
  }
}

/**
 * Replace roadmap IDs M1-01 on the Depends on line with GitHub issue numbers #18 (same repo autolink).
 * @param {string} body
 * @param {Record<string, number>} idToIssueNum
 */
function patchDependsOnLine(body, idToIssueNum) {
  const patchRest = (rest) => {
    const t = rest.trim();
    if (/^(`?none`?|ninguna|—|-)$/i.test(t.replace(/`/g, ""))) {
      return rest;
    }
    return rest.replace(/`?(M[1-9]-\d+)`?/g, (full, id) => {
      const n = idToIssueNum[id];
      return n !== undefined ? `#${n}` : full;
    });
  };

  let out = body.replace(
    /^(- \*\*Depends on\*\*:\s*)([^\n]*)$/m,
    (_, prefix, rest) => {
      return prefix + patchRest(rest);
    },
  );

  out = out.replace(
    /^(### Depends on\s*\n(?:\s*\n)?-\s*)([^\n]*)$/m,
    (_, prefix, rest) => {
      return prefix + patchRest(rest);
    },
  );

  return out;
}

/**
 * @param {string} issueUrl
 * @returns {number | null}
 */
function parseIssueNumberFromUrl(issueUrl) {
  const m = issueUrl.match(/\/issues\/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * @param {string[]} argv
 * @param {{ repo?: string; projectOwner?: string; projectNumber?: string }} fileDefaults
 */
function parseArgs(argv, fileDefaults) {
  let milestone = "";
  let doc = path.join(process.cwd(), "docs/product/12-roadmap-milestones.md");
  let repo = fileDefaults.repo ?? "";
  let projectOwner = fileDefaults.projectOwner ?? "@me";
  /** @type {string} */
  let projectNumber = fileDefaults.projectNumber ?? "";
  let dryRun = false;
  let repair = false;
  let noLabels = false;
  let noDepsResolve = false;
  /** @type {string[]} */
  const labels = [];

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--milestone" && argv[i + 1])
      milestone = argv[++i].trim().toUpperCase();
    else if (a === "--doc" && argv[i + 1]) doc = path.resolve(argv[++i]);
    else if (a === "--repo" && argv[i + 1]) repo = argv[++i].trim();
    else if (a === "--project-owner" && argv[i + 1])
      projectOwner = argv[++i].trim();
    else if (a === "--project-number" && argv[i + 1])
      projectNumber = argv[++i].trim();
    else if (a === "--dry-run") dryRun = true;
    else if (a === "--repair") repair = true;
    else if (a === "--no-labels") noLabels = true;
    else if (a === "--no-deps-resolve") noDepsResolve = true;
    else if (a === "--label" && argv[i + 1]) labels.push(argv[++i]);
  }

  if (!/^M[1-9]$/.test(milestone)) {
    console.error("Missing or invalid --milestone M1..M9");
    process.exit(1);
  }
  if (!repo.includes("/")) {
    console.error(
      'Missing or invalid --repo (expected "OWNER/NAME"). Add --repo or .cursor/roadmap-sync.defaults.json',
    );
    process.exit(1);
  }

  return {
    milestone,
    doc,
    repo,
    projectOwner,
    projectNumber,
    dryRun,
    labels,
    repair,
    noLabels,
    noDepsResolve,
  };
}

/**
 * @param {string} repo OWNER/name
 * @param {string} title GitHub milestone title (matches ## header without doc § number)
 */
function ensureRepoMilestone(repo, title, dryRun) {
  if (dryRun) {
    console.log(`[dry-run] would ensure milestone exists: "${title}"`);
    return null;
  }

  const raw = gh(["api", `repos/${repo}/milestones?per_page=100`, "--jq", "."]);
  /** @type {{ number: number; title: string }[]} */
  const milestones = JSON.parse(raw);
  const hit = milestones.find((m) => m.title === title);
  if (hit) {
    console.log(`Milestone already exists: #${hit.number} — ${hit.title}`);
    return hit.number;
  }

  const desc = `Roadmap milestone from docs/product/12-roadmap-milestones.md. Binding issue bodies: RM-006.`;

  const created = gh([
    "api",
    "-X",
    "POST",
    `repos/${repo}/milestones`,
    "-f",
    `title=${title}`,
    "-f",
    `description=${desc}`,
  ]);
  const obj = JSON.parse(created);
  console.log(`Created milestone #${obj.number} — ${title}`);
  return obj.number;
}

/**
 * @param {string} repo
 * @param {string} title full issue title (e.g. M1-01 · …)
 */
function findExistingIssue(repo, issueId, title, dryRun) {
  if (dryRun) return null;
  const search = `${issueId} in:title`;
  const raw = gh([
    "issue",
    "list",
    "-R",
    repo,
    "--state",
    "all",
    "--search",
    search,
    "--json",
    "number,title,state",
    "-L",
    "30",
  ]);
  const list = JSON.parse(raw);
  return list.find((x) => x.title === title) ?? null;
}

/**
 * @returns {string} issue URL
 */
function createIssue(repo, milestoneTitle, issueTitle, body, labels, dryRun) {
  if (dryRun) {
    console.log(`[dry-run] would create issue "${issueTitle}"`);
    return `https://dry-run.local/${encodeURIComponent(issueTitle)}`;
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "roadmap-sync-"));
  const bodyPath = path.join(dir, "body.md");
  try {
    fs.writeFileSync(bodyPath, body, "utf8");
    const args = [
      "issue",
      "create",
      "-R",
      repo,
      "-t",
      issueTitle,
      "-F",
      bodyPath,
      "-m",
      milestoneTitle,
    ];
    for (const l of labels) {
      args.push("-l", l);
    }
    const url = gh(args).trim();
    console.log(`Created: ${url}`);
    return url;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function addToProject(projectOwner, projectNumber, issueUrl, dryRun) {
  if (!projectNumber) return;
  if (dryRun) {
    console.log(
      `[dry-run] gh project item-add ${projectNumber} --owner ${projectOwner} --url …`,
    );
    return;
  }
  try {
    execFileSync(
      "gh",
      [
        "project",
        "item-add",
        projectNumber,
        "--owner",
        projectOwner,
        "--url",
        issueUrl,
      ],
      {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      },
    );
  } catch (err) {
    const combined = `${err.stderr ?? ""}${err.stdout ?? ""}${err.message ?? ""}`;
    if (
      /Content already exists|already exists in this project/i.test(combined)
    ) {
      console.log(`Already on project: ${issueUrl}`);
      return;
    }
    throw err;
  }
}

function syncFooter(issueId) {
  return (
    `\n\n---\n` +
    `_Synced from \`docs/product/12-roadmap-milestones.md\` (${issueId}). ` +
    `Source of truth: doc (\`RM-005\`, \`RM-006\`). Update the doc before editing scope here._\n`
  );
}

/**
 * Re-run metadata on issues already in the milestone: labels + Depends on → #issue numbers.
 */
function repairIssues(
  repo,
  milestoneKey,
  githubMilestoneTitle,
  issues,
  dryRun,
  cliLabels,
  noLabels,
  noDepsResolve,
) {
  console.log(
    "\nRepair mode: refresh bodies and labels from doc (GitHub #refs + roadmap labels).\n",
  );
  if (dryRun) {
    console.log(
      "[dry-run] would list milestone issues and run gh issue edit on each.\n",
    );
    return;
  }

  /** @type {Record<string, number>} */
  const idToNum = {};
  const raw = gh([
    "issue",
    "list",
    "-R",
    repo,
    "--milestone",
    githubMilestoneTitle,
    "--state",
    "all",
    "--json",
    "number,title",
    "-L",
    "500",
  ]);
  const list = JSON.parse(raw);
  for (const row of list) {
    const m = row.title.match(/^(M[1-9]-\d+)\s·\s/);
    if (m) idToNum[m[1]] = row.number;
  }

  for (const issue of issues) {
    const num = idToNum[issue.id];
    if (!num) {
      console.warn(
        `Skip repair (no GitHub issue with title prefix ${issue.id}): ${issue.title}`,
      );
      continue;
    }

    let fullBody = issue.body + syncFooter(issue.id);
    if (!noDepsResolve) {
      fullBody = patchDependsOnLine(fullBody, idToNum);
    }

    const inferred = noLabels
      ? []
      : [
          ...inferRoadmapLabels(issue.body),
          milestoneRoadmapLabel(milestoneKey),
          ...cliLabels,
        ];
    ensureLabelsExist(repo, inferred, dryRun);

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "roadmap-repair-"));
    const bodyPath = path.join(dir, "body.md");
    try {
      fs.writeFileSync(bodyPath, fullBody, "utf8");
      gh(["issue", "edit", String(num), "-R", repo, "-F", bodyPath]);
      for (const lb of inferred) {
        try {
          gh(["issue", "edit", String(num), "-R", repo, "--add-label", lb]);
        } catch {
          /* label already present */
        }
      }
      console.log(`Repaired #${num} (${issue.id})`);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
}

function main() {
  const defaultsPath = path.join(
    process.cwd(),
    ".cursor/roadmap-sync.defaults.json",
  );
  const fileDefaults = loadDefaultsFile();
  const {
    milestone,
    doc,
    repo,
    projectOwner,
    projectNumber,
    dryRun,
    labels: cliLabels,
    repair,
    noLabels,
    noDepsResolve,
  } = parseArgs(process.argv, fileDefaults);

  if (fs.existsSync(defaultsPath)) {
    console.log(
      "Using defaults from .cursor/roadmap-sync.defaults.json (CLI overrides).\n",
    );
  }

  const md = fs.readFileSync(doc, "utf8");
  const { githubMilestoneTitle, issues } = extractIssues(md, milestone);

  console.log(`Repo: ${repo}`);
  console.log(
    `Milestone section → GitHub milestone title: "${githubMilestoneTitle}"`,
  );
  console.log(`Issues to sync: ${issues.length}`);
  if (projectNumber) {
    console.log(`Project: ${projectOwner} #${projectNumber}`);
  } else {
    console.log("Project: (none — omitting gh project item-add)");
  }
  if (dryRun) console.log("Mode: dry-run (no writes)\n");

  if (repair) {
    ensureRepoMilestone(repo, githubMilestoneTitle, dryRun);
    repairIssues(
      repo,
      milestone,
      githubMilestoneTitle,
      issues,
      dryRun,
      cliLabels,
      noLabels,
      noDepsResolve,
    );
    console.log("\nDone.");
    return;
  }

  ensureRepoMilestone(repo, githubMilestoneTitle, dryRun);

  /** @type {Record<string, number>} */
  const idToNum = {};

  for (const issue of issues) {
    const existing = findExistingIssue(repo, issue.id, issue.title, dryRun);
    if (existing) {
      idToNum[issue.id] = existing.number;
      console.log(
        `Skip (already exists #${existing.number}, ${existing.state}): ${issue.title}`,
      );
      continue;
    }

    let fullBody = issue.body + syncFooter(issue.id);
    if (!noDepsResolve) {
      fullBody = patchDependsOnLine(fullBody, idToNum);
    }

    const inferred = noLabels
      ? [...cliLabels]
      : [
          ...inferRoadmapLabels(issue.body),
          milestoneRoadmapLabel(milestone),
          ...cliLabels,
        ];
    ensureLabelsExist(repo, inferred, dryRun);

    const url = createIssue(
      repo,
      githubMilestoneTitle,
      issue.title,
      fullBody,
      inferred,
      dryRun,
    );
    const parsed = parseIssueNumberFromUrl(url);
    if (parsed !== null) {
      idToNum[issue.id] = parsed;
    }
    addToProject(projectOwner, projectNumber, url, dryRun);
  }

  console.log("\nDone.");
  if (projectNumber && !dryRun) {
    console.log(
      "Tip: open the board and set Status / Priority fields. Dependency links use #issue in the Depends on line (RM-011).",
    );
  }
}

const invokedAsMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (invokedAsMain) {
  main();
}
