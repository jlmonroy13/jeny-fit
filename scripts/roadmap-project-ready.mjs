#!/usr/bin/env node
/**
 * Move GitHub Project v2 items to "Ready" when every issue listed in **Depends on**
 * (as #number) is CLOSED. Aligns with RM-011: start work only after parents are done.
 *
 * Reads project owner/number/repo from .cursor/roadmap-sync.defaults.json (optional keys
 * projectReadyFromStatuses, projectReadyToStatus).
 *
 * Usage:
 *   node scripts/roadmap-project-ready.mjs [--dry-run] [--from Backlog] [--to Ready] ...
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

function gh(args, options = {}) {
  return execFileSync("gh", args, { encoding: "utf8", ...options });
}

function loadDefaults() {
  const p = path.join(process.cwd(), ".cursor/roadmap-sync.defaults.json");
  if (!fs.existsSync(p)) return {};
  try {
    const raw = JSON.parse(fs.readFileSync(p, "utf8"));
    return {
      repo: typeof raw.repo === "string" ? raw.repo.trim() : "",
      projectOwner:
        typeof raw.projectOwner === "string" ? raw.projectOwner.trim() : "",
      projectNumber:
        raw.projectNumber != null ? String(raw.projectNumber).trim() : "",
      fromStatuses: Array.isArray(raw.projectReadyFromStatuses)
        ? raw.projectReadyFromStatuses.map(String)
        : null,
      toStatus:
        typeof raw.projectReadyToStatus === "string"
          ? raw.projectReadyToStatus.trim()
          : null,
    };
  } catch {
    console.warn("Warning: could not parse .cursor/roadmap-sync.defaults.json");
    return {};
  }
}

function parseArgs(argv, fileDefaults) {
  let dryRun = false;
  let owner = fileDefaults.projectOwner ?? "";
  let projectNumber = fileDefaults.projectNumber ?? "";
  /** @type {string[]} */
  const fromList = [];
  let toStatus = fileDefaults.toStatus ?? "Ready";
  let statusFieldName = "Status";

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") dryRun = true;
    else if (a === "--owner" && argv[i + 1]) owner = argv[++i].trim();
    else if (a === "--project-number" && argv[i + 1])
      projectNumber = argv[++i].trim();
    else if (a === "--from" && argv[i + 1]) fromList.push(argv[++i].trim());
    else if (a === "--to" && argv[i + 1]) toStatus = argv[++i].trim();
    else if (a === "--status-field" && argv[i + 1])
      statusFieldName = argv[++i].trim();
  }

  const fromStatuses =
    fromList.length > 0 ? fromList : (fileDefaults.fromStatuses ?? ["Backlog"]);

  if (!owner || !projectNumber) {
    console.error(
      "Set projectOwner and projectNumber in .cursor/roadmap-sync.defaults.json or pass --owner / --project-number",
    );
    process.exit(1);
  }

  return {
    dryRun,
    owner,
    projectNumber,
    fromStatuses,
    toStatus,
    statusFieldName,
  };
}

/**
 * @param {string} body
 * @returns {number[]} dependency issue numbers from #refs on Depends on line
 */
export function parseDependsIssueNumbers(body) {
  if (!body) return null;

  let rest = null;
  const inline = body.match(/^- \*\*Depends on\*\*:\s*([^\n]*)$/m);
  if (inline) rest = inline[1].trim();
  else {
    const section = body.match(/^### Depends on\s*\n(?:\s*\n)?-\s*([^\n]*)/m);
    if (section) rest = section[1].trim();
  }
  if (rest === null) return null;

  if (/^(`?none`?|ninguna|—|-)$/i.test(rest.replace(/`/g, ""))) return [];

  const nums = [];
  const re = /#(\d+)/g;
  let x;
  while ((x = re.exec(rest)) !== null) {
    nums.push(parseInt(x[1], 10));
  }
  if (nums.length > 0) return [...new Set(nums)];

  const idRe = /M[1-9]-\d+/g;
  while (idRe.exec(rest) !== null) {
    nums.push(-1);
  }
  return nums.length > 0 ? nums : [];
}

/**
 * @param {string} repo OWNER/name
 * @param {number} num
 * @param {Map<string, string>} cache repo#issue -> OPEN | CLOSED
 */
function issueState(repo, num, cache) {
  const k = `${repo}#${num}`;
  if (cache.has(k)) return cache.get(k);
  const out = gh(["issue", "view", String(num), "-R", repo, "--json", "state"]);
  const st = /** @type {"OPEN"|"CLOSED"} */ (JSON.parse(out).state);
  cache.set(k, st);
  return st;
}

function main() {
  const fileDefaults = loadDefaults();
  const {
    dryRun,
    owner,
    projectNumber,
    fromStatuses,
    toStatus,
    statusFieldName,
  } = parseArgs(process.argv, fileDefaults);

  const fromSet = new Set(fromStatuses);

  const viewRaw = gh([
    "project",
    "view",
    projectNumber,
    "--owner",
    owner,
    "--format",
    "json",
  ]);
  const projectView = JSON.parse(viewRaw);
  const projectId = projectView.id;

  const fieldsRaw = gh([
    "project",
    "field-list",
    projectNumber,
    "--owner",
    owner,
    "--format",
    "json",
    "-L",
    "50",
  ]);
  const fieldPack = JSON.parse(fieldsRaw);
  const statusField = fieldPack.fields.find((f) => f.name === statusFieldName);
  if (!statusField || statusField.type !== "ProjectV2SingleSelectField") {
    console.error(
      `No single-select field named "${statusFieldName}". Run: gh project field-list ${projectNumber} --owner ${owner}`,
    );
    process.exit(1);
  }

  const readyOpt = statusField.options.find(
    (o) => o.name.toLowerCase() === toStatus.toLowerCase(),
  );
  if (!readyOpt) {
    console.error(
      `No status option "${toStatus}". Options: ${statusField.options.map((o) => o.name).join(", ")}`,
    );
    process.exit(1);
  }

  const itemsRaw = gh([
    "project",
    "item-list",
    projectNumber,
    "--owner",
    owner,
    "--format",
    "json",
    "-L",
    "500",
  ]);
  const { items } = JSON.parse(itemsRaw);

  let moved = 0;
  let skippedOtherColumn = 0;
  let skippedNonIssue = 0;

  /** @type {Map<string, string>} */
  const stateCache = new Map();

  for (const item of items) {
    const content = item.content;
    if (!content || content.type !== "Issue") {
      skippedNonIssue++;
      continue;
    }

    const currentStatus = item.status;
    if (!fromSet.has(currentStatus)) {
      skippedOtherColumn++;
      continue;
    }
    if (currentStatus === toStatus) {
      continue;
    }

    const repo = content.repository;
    const deps = parseDependsIssueNumbers(content.body || "");
    if (deps === null) {
      continue;
    }
    let unblocked = deps.length === 0;
    if (!unblocked) {
      const openDeps = [];
      for (const n of deps) {
        try {
          if (issueState(repo, n, stateCache) !== "CLOSED") openDeps.push(n);
        } catch {
          console.warn(
            `Warning: could not read issue #${n} — treating as blocking`,
          );
          openDeps.push(n);
        }
      }
      unblocked = openDeps.length === 0;
      if (!unblocked) {
        console.log(
          `Skip #${content.number} (${content.title.slice(0, 50)}…): open deps ${openDeps.map((n) => `#${n}`).join(", ")}`,
        );
        continue;
      }
    }

    if (dryRun) {
      console.log(
        `[dry-run] would move item → "${toStatus}": #${content.number} ${content.title}`,
      );
      moved++;
      continue;
    }

    gh([
      "project",
      "item-edit",
      "--id",
      item.id,
      "--field-id",
      statusField.id,
      "--project-id",
      projectId,
      "--single-select-option-id",
      readyOpt.id,
    ]);
    console.log(`Moved → "${toStatus}": #${content.number} ${content.title}`);
    moved++;
  }

  console.log(
    `\nDone. Moved (or would move): ${moved}. Skipped (not in "from" columns): ${skippedOtherColumn}. Skipped (non-issue rows): ${skippedNonIssue}.`,
  );
}

const invokedAsMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (invokedAsMain) {
  main();
}
