---
name: roadmap-pr-review
description: >-
  Stages only issue-scoped changes, performs a PR-style review (bugs, regressions,
  rules, test coverage gaps), applies/follows fixes, outputs a strict manual test
  checklist (never runs test suites), asks the user to re-test the feature, and
  prepares a clean staged diff before publishing. Use after implementation and
  before commit/push/PR.
---

# Roadmap · Review task changes before publish

This skill acts like a pre-PR quality gate for one roadmap issue. It does **not** publish. It prepares a clean staged diff and verification evidence so publishing can happen safely with `roadmap-pr-publish`.

## Test execution policy (binding)

**Never run test suites in the agent shell** — not during review, fixes, or handoff.

Forbidden commands (unless the user explicitly asks in that message):

- `pnpm test`, `pnpm test:unit`, `pnpm test:integration`, `pnpm test:multitenancy-smoke`, `pnpm test:e2e`, `pnpm test:migration`, or any script whose primary purpose is running tests
- `vitest`, `playwright`, integration/smoke/migration test runners

The agent **must** derive the **minimum mandatory manual checklist** from the staged diff and issue. The **user** runs those commands in their own terminal.

Allowed (not test suites):

- `pnpm lint` / `pnpm exec eslint` on touched paths and `ReadLints` on edited `.ts` / `.tsx` files
- **`pnpm exec prettier --check <touched paths>`** (required — CI `format:check` / **TS-010**). If it fails: `pnpm exec prettier --write <touched paths>`, re-stage, re-check. See `.cursor/rules/ci-quality-gate.mdc`.
- `git` read-only commands for review (`git diff --staged`, `git status`, etc.)

Do not claim tests passed without user confirmation.
Do **not** mark `READY_FOR_PUBLISH: yes` if Prettier check was skipped or still failing.

## Inputs

- **Issue**: `#N` or URL (required).
- **Scope mode**: `strict` (default) or `lenient`.
- **Scope hints** (optional but recommended):
  - expected file paths or globs
  - touched app areas from the implementation plan

## Preconditions

- You are on the task branch `MX-NN-<slug>` (`RM-007`).
- Issue dependencies are closed (`RM-011`) or user explicitly overrode.

## Workflow

Track with TodoWrite:

```
- [ ] Resolve issue metadata and expected scope
- [ ] Build candidate file list from git changes
- [ ] Stage only in-scope files
- [ ] Review staged diff PR-style
- [ ] Run lint + Prettier check on touched paths (not test suites)
- [ ] Derive strict manual test checklist (never run tests in shell)
- [ ] Apply or propose fixes
- [ ] Ask user to run checklist + manually re-test feature
- [ ] Re-stage final in-scope files only
- [ ] Report ready/not-ready for publish
```

### Step 1 — Resolve issue and scope

1. Read issue body (`gh issue view N -R OWNER/REPO --json ...`).
2. Extract:
   - `Tipo`, `Docs canónicos`, `Acceptance criteria`, `Out of scope`.
3. Build expected scope from:
   - explicit user hints
   - files touched during implementation
   - canonical docs (only as guidance, not broadening scope).

### Step 2 — Stage only task files

Use tracked modifications + untracked files and stage only selected paths:

```bash
git status --porcelain
git add <path1> <path2> ...
```

Rules:

- Never use `git add .`.
- In `strict` mode: if there are modified files outside scope, stop and ask user whether to split or include.
- In `lenient` mode: continue but explicitly list out-of-scope leftovers.

### Step 3 — PR-style review on staged diff

Review staged changes as if commenting on a GitHub PR:

- correctness / regressions
- mismatch with binding decisions
- missing tests for changed behavior
- rule violations from project docs/rules
- accidental scope creep

Use:

```bash
git diff --staged
```

Use `ReadLints` on edited `.ts` / `.tsx` files. Fix lint findings with `pnpm exec eslint` on touched paths if needed.

**Prettier (mandatory):** run `pnpm exec prettier --check` on every staged path. On failure, `pnpm exec prettier --write` those paths, re-stage, and re-check until clean. Do not hand off review as ready while format check fails (CI will fail on `pnpm format:check`).

For findings, classify as:

- `critical` (must fix)
- `major` (should fix before publish)
- `minor` (can defer with note)

### Step 4 — Strict manual test checklist (mandatory output)

**Do not execute test commands.** Build the **smallest sufficient** checklist the user must run locally before publish.

Derive commands from:

1. **Staged paths** — map each touched area to its spec file(s).
2. **Issue acceptance criteria** — add e2e or integration only when the issue explicitly requires them.
3. **`AGENTS.md` / `docs/product/11-testing-strategy.md §15`** — baseline `pnpm test:unit` scoped to touched specs; if the diff touches `src/db/**`, `src/server/**`, auth/multitenancy, migrations, or calculation logic, add the relevant integration/smoke/migration suites.

Output format (copy-paste ready for the user's terminal):

```markdown
## Manual verification (required before publish)

### Unit / component

pnpm exec vitest run <path1> <path2> ...

### Lint (if .ts/.tsx changed)

pnpm exec eslint <touched paths...>

### Format (always if text sources changed — CI gate)

pnpm exec prettier --check <touched paths...>

### Integration / smoke (only if applicable)

<exact command, e.g. pnpm test:integration -- path/to/file.integration.test.ts>

### E2E (only if applicable)

pnpm exec playwright test <spec> ...

### Manual UI re-test

1. ...
2. Expected: ...
```

Rules:

- List **concrete file paths or spec names**, not vague “run all tests”.
- Omit suites that cannot be affected by the staged diff.
- If zero automated tests apply, say so explicitly and rely on manual UI steps.
- Do not mark `READY_FOR_PUBLISH: yes` until the user confirms they ran the checklist.

### Step 5 — Human verification gate (mandatory)

1. Deliver the Step 4 checklist.
2. Provide a short manual UI script (steps + expected result) for the feature.
3. **Wait for user confirmation** that checklist + UI re-test passed.

If the user reports a failure, loop back to Step 2.

### Step 6 — Final re-stage and readiness report

Re-stage only final in-scope files and provide:

- staged file list
- lint status (agent-ran `pnpm lint` / `ReadLints` only — not tests)
- the manual test checklist (repeat or link to Step 4)
- unresolved risks (if any)
- `READY_FOR_PUBLISH: yes/no` (only `yes` after user confirmed manual verification)

## Out of scope

- Running any test suite in the agent shell (see **Test execution policy** above).
- Commit/push/PR creation (use `roadmap-pr-publish`).
- Changing roadmap docs or issue scope unless user explicitly asks.
