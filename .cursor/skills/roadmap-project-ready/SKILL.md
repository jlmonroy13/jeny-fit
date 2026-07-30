---
name: roadmap-project-ready
description: >-
  Analyzes a GitHub Project board, finds issues whose dependency parents are all closed
  (Depends on #refs in the issue body per RM-011), and moves those items to the "Ready"
  column (single-select Status). Use when the user wants roadmap-ready automation,
  Project board triage, or moving backlog items to Ready when unblockers are merged.
---

# Roadmap · Project board → Ready column

## What it does

1. Lists all items in the configured GitHub Project (`gh project item-list`).
2. Keeps only **Issue** rows whose current **Status** is in the **from** set (default **Backlog**).
3. Parses the issue body for `- **Depends on**:` and collects **`#123`** references (same convention as `roadmap-sync` after repair).
4. Treats **`none`** / `` `none` `` as **no blockers** → eligible immediately.
5. For each `#N`, checks `gh issue view N -R repo --json state`; all must be **`CLOSED`** (merged PR / closed issue).
6. Runs **`gh project item-edit`** with the **Ready** single-select option (configurable name).

This is the operational check for **`RM-011`** on the board: you only surface work as “Ready” when parent issues are finished.

## Prerequisites

- **`gh`** authenticated with **`project`** scope (`gh auth refresh -s project`).
- Project uses a **single-select** field named **Status** (GitHub default) with a **Ready** option (your board already has Backlog → Ready → In progress → …).
- Issue bodies use **`#issue`** on the Depends on line (`roadmap-sync --repair`).

## Configuration

Same **`.cursor/roadmap-sync.defaults.json`** as other roadmap scripts:

| Key                             | Purpose                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `projectOwner`, `projectNumber` | Required for the Project.                                                             |
| `repo`                          | Used as `-R` when resolving `#` dependencies (from each item’s `content.repository`). |
| `projectReadyFromStatuses`      | JSON array of Status values to scan (default `["Backlog"]`).                          |
| `projectReadyToStatus`          | Target column name (default `"Ready"`).                                               |

CLI overrides: `--owner`, `--project-number`, repeatable **`--from`** `ColumnName`, **`--to`** `Ready`, **`--status-field`** if the field is not named `Status`.

## Commands

Dry-run (no writes):

```bash
pnpm roadmap:project-ready -- --dry-run
```

Apply moves:

```bash
pnpm roadmap:project-ready
```

## Workflow for the agent

1. Run **`--dry-run`** first; show how many issues would move and which stay blocked (open deps).
2. On user confirmation, run without **`--dry-run`**.
3. Remind the human: **closing** a parent issue usually means the linked PR merged (`Closes #`). If a dependency stays **OPEN**, the child stays out of Ready.

## Limits

- Only **`#number`** dependencies are resolved. Plain `M1-01` without `#` is ignored unless the user runs **`roadmap-sync --repair`** first.
- Does not create links in GitHub’s “blocked by” graph — only **Status** column + RM-011 logic.
- Draft issues / PR-only rows are skipped.

## Out of scope

- Editing issue bodies or doc 12.
- Priority / Size fields on the Project (manual or separate automation).
