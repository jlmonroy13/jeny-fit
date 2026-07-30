---
name: roadmap-issue-plan
description: >-
  Reads a GitHub issue (number/URL) or pasted roadmap-issue body, resolves cited docs and
  binding decisions, checks dependency readiness (RM-011), and drafts a step-by-step
  execution plan for review before coding. Use when starting work on a milestone issue,
  preparing a PR branch (RM-007), or when the user wants an implementation plan from an issue.
---

# Roadmap · Plan work from an issue

Turn a **roadmap-style GitHub issue** (body copied from `docs/product/12-roadmap-milestones.md`, `RM-006`) into a **reviewable implementation plan**. Optimized for this repo: binding IDs, canonical docs, narrow scope.

This skill is **read-only** until the user approves the plan. After presenting the plan, **suggest switching to Cursor Plan mode** so trade-offs and sequencing can be refined safely; implementation stays for Agent mode after approval.

When the user confirms execution (start coding), this skill must also:

1. transition the Project item status from **Ready** to **In progress** before the first code edit, and
2. update the repo default branch from origin (`fetch` + checkout + `pull --ff-only`), then create/switch to the issue branch using `RM-007` naming (`MX-NN-<issue-slug>`).

## Inputs (required: one of)

1. **GitHub issue number**: e.g. `42` or `#42` (repo from `.cursor/roadmap-sync.defaults.json` → `repo`, or `--repo OWNER/name`).
2. **Issue URL**: `https://github.com/org/repo/issues/42`.
3. **Pasted body**: full markdown of the issue (must include at least **Acceptance criteria** or recognizable roadmap fields).

If the input is ambiguous, ask once.

## Prerequisites

- For remote fetch: **`gh`** authenticated; **`repo`** scope on the target repo.
- Defaults file **`.cursor/roadmap-sync.defaults.json`** should define `repo` (`OWNER/name`) when the user only passes a number.

Fetch issue (when not pasted):

```bash
gh issue view <N> -R OWNER/REPO --json number,title,body,state,milestone,labels,url
```

## Workflow

Track with TodoWrite. Use this checklist internally:

```
- [ ] Resolve repo + issue payload (gh or paste)
- [ ] Parse structured fields from body (Tipo, Estimación, Depends on, Decisiones binding, Docs canónicos, ACs, Out of scope)
- [ ] RM-011: verify Depends on #refs are CLOSED (gh) or flag blockers
- [ ] Read cited docs (ranges only, grep anchors first)
- [ ] Cross-check binding IDs exist in product docs (grep)
- [ ] Draft plan + validation + explicit non-goals
- [ ] Add "Resumen ejecutivo" plain-Spanish summary section (mandatory)
- [ ] Offer Plan mode for review; wait for user before implementing
- [ ] On execution start: move Project item `Status` from Ready → In progress
- [ ] On execution start: update default branch from origin, then create/switch branch `mX/<slug>`
```

### Step 1 — Parse the issue body

Expect markdown aligned with `12 §3.3`:

| Field                            | Use                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Tipo**                         | Risk profile (backend vs frontend vs infra vs tests vs docs).                                  |
| **Estimación**                   | Rough granularity hint (🟢 vs 🟡).                                                             |
| **Depends on**                   | `none` or `#n` list — **RM-011**: work must not start until parents merged + closed on GitHub. |
| **Decisiones binding**           | Must not contradict these IDs (`FE-*`, `BE-*`, etc.).                                          |
| **Docs canónicos**               | Minimum reading list — expand into file paths + sections.                                      |
| **Acceptance criteria**          | Becomes the **definition of done** for the plan.                                               |
| **Out of scope para esta issue** | Hard exclusions — repeat in plan **Non-goals**.                                                |

If **Decisiones binding** or **Docs canónicos** is missing or vague, say so and propose refinement **without inventing new decisions** (register `*-OPEN-XX` via separate doc PR if needed).

### Step 2 — Dependency readiness (RM-011)

For each `#n` on the **Depends on** line:

```bash
gh issue view <n> -R OWNER/REPO --json state,title
```

- If any parent is **OPEN**, the plan must start with: **blocked until parents closed** (list issue numbers + titles). Optionally mention `roadmap-project-ready` / board column — optional context only.

### Step 3 — Read canonical docs (doc-first)

Follow **`AGENTS.md`**: read only what the issue cites plus any file needed to disambiguate paths.

- Map references like `07 §7.3` → open `docs/product/07-design-system.md`, locate §7.3 (heading search / grep).
- Never substitute training-data defaults when the doc contradicts them.

If the issue body clearly **conflicts** with a canonical doc, **flag drift** and cite **`RM-005`** (doc wins; fix doc + GitHub issue before implementing).

### Step 4 — Validate binding IDs

For each ID under **Decisiones binding**, confirm it exists:

```bash
rg '^\| `<ID>`' docs/product/
```

If missing, stop and report — do not invent replacements.

### Step 5 — Output: implementation plan (template)

Deliver this structure in chat (Spanish prose for user-facing plan text; English for identifiers/paths per project convention):

```markdown
## Plan · Issue #N — <short title>

### Summary

<1–3 sentences>

### Preconditions

- Branch naming: `mX/<slug>` (RM-007) — suggest slug from issue title.
- New branches: created from an up-to-date default branch (`fetch` + `pull --ff-only`), not from a stale/feature HEAD.
- Dependencies: <closed OK | BLOCKED: #…>

### Binding decisions (must satisfy)

- `<ID>` — <one line each>

### Docs read / to read

- `<path>` §… — <why>

### Implementation steps

1. …
2. …
   (narrow, ordered; group by area if helpful)

### Files / areas likely touched

- `path/...` — <note>

### Verification

- Commands: `pnpm …` / tests cited in issue or `11-testing-strategy.md`
- AC checklist mapped from issue (tick boxes left unchecked until done)

### Non-goals (from issue + inferred)

- …

### Risks / questions

- …

### Resumen ejecutivo (plain-language summary)

(2-4 frases en español, sin jerga técnica, que un humano no-técnico pueda
entender: qué se va a hacer, para qué sirve, qué NO se hace en este issue.
Esta sección es **obligatoria**; el plan no está completo sin ella.)

### Next step

Switch to **Plan mode** to refine this plan if needed; after approval, switch to **Agent mode** and implement without expanding scope.
```

### Step 6 — Plan mode handoff

After posting the plan:

0. **Verify** the plan ends with a **"Resumen ejecutivo"** section written in plain Spanish (2-4 sentences, no technical jargon). If missing, regenerate that section before handing off — the plan is not complete without it.
1. Tell the user explicitly: **open Cursor Plan mode** (or accept a mode switch if the UI offers it) to adjust sequencing, scope, or alternatives **before** any code edits.
2. Do **not** start implementing until the user confirms (unless they already asked for implementation in the same message after posting the plan).

### Step 7 — Execution start handoff (Ready → In progress)

As soon as the user approves implementation (Agent mode), update the Project item status **before touching code**:

1. Resolve project metadata from `.cursor/roadmap-sync.defaults.json` (`projectOwner`, `projectNumber`) and issue number `N`.
2. Fetch IDs:

```bash
gh project view <PROJECT_NUMBER> --owner <OWNER> --format json
gh project field-list <PROJECT_NUMBER> --owner <OWNER> --format json -L 50
gh project item-list <PROJECT_NUMBER> --owner <OWNER> --format json -L 200
```

3. Find the item whose `content.number == N`, the `Status` field ID, and the `In progress` option ID.
4. Set status:

```bash
gh project item-edit \
  --id <ITEM_ID> \
  --field-id <STATUS_FIELD_ID> \
  --project-id <PROJECT_ID> \
  --single-select-option-id <IN_PROGRESS_OPTION_ID>
```

Rules:

- If item is already `In progress`, continue (idempotent).
- If item is not in the board, warn user and continue only after acknowledgement.
- If status update fails, stop and report blocker; do not silently proceed with implementation.

### Step 8 — Branch handoff (`RM-007`)

After the status change succeeds, create/switch to a branch for this issue:

1. Resolve milestone prefix `mX` from:
   - issue title prefix (`M1-07` → `m1`), or
   - issue milestone title (`M1 · ...`), fallback if needed.
2. Build slug from issue title:
   - lowercase ASCII
   - words separated by `-`
   - remove leading `M1-07 ·`
3. Branch name: `mX/<slug>` (example: `m1/configure-eslint-prettier-server-only`).
4. Resolve the repo default branch (usually `main`; confirm with `git symbolic-ref refs/remotes/origin/HEAD` or remote default if needed).

**Creating a new issue branch** — always start from an up-to-date default branch (do not branch from the current HEAD if it is another feature branch or a stale local default):

```bash
git fetch origin
git checkout <default-branch>
git pull --ff-only origin <default-branch>
git checkout -b mX/<slug>
```

If `git pull --ff-only` fails (local default diverged), **stop and report** — do not invent a merge/rebase unless the user explicitly asks.

Rules:

- If the issue branch **already exists locally**, just checkout it — do **not** recreate from default or rebase automatically.
- If the issue branch exists remotely but not locally, track it: `git checkout -b mX/<slug> --track origin/mX/<slug>` (skip the create-from-default path).
- If the user explicitly asks to base the branch on something other than the default, respect that override.
- If dependency check is blocked, do not create branch unless user explicitly overrides.

## Optional conveniences

- **Milestone**: if `gh issue view` returns milestone title `Mx · …`, mention tag expectations only if relevant (`RM-008` — usually end of milestone, not per issue).
- **Labels**: `type/*`, `size/*` from sync — optional hint for expected change size.

## Out of scope for this skill

- Editing `12-roadmap-milestones.md`.
- Running full CI or pushing branches (unless the user later asks in Agent mode).
- Resolving `*-OPEN-XX` decisions — only surface them.

## Anti-patterns

- Planning from memory instead of cited docs.
- Broadening scope beyond **Out of scope para esta issue**.
- Ignoring OPEN dependency parents while writing an execution plan as if unblocked.
- Posting the plan without a **"Resumen ejecutivo"** section in plain Spanish.
- Creating a **new** issue branch from a stale or non-default HEAD (`git fetch` alone is not enough — checkout + `pull --ff-only` the default branch first).
