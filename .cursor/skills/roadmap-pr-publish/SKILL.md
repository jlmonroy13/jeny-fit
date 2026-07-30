---
name: roadmap-pr-publish
description: >-
  Re-stages issue-scoped final changes, creates a conventional commit message,
  pushes the branch, and opens a GitHub PR with roadmap metadata and Closes #N.
  Use only after roadmap-pr-review marks the task ready.
---

# Roadmap · Publish reviewed task changes

This skill performs the final delivery steps for a reviewed roadmap task:

1. re-stage scoped files,
2. commit with project format,
3. push branch,
4. create PR.

It assumes `roadmap-pr-review` has already passed and the user confirmed manual feature re-test.

## Inputs

- **Issue**: `#N` or URL (required)
- **Base branch**: default `main`
- **Repo**: from `.cursor/roadmap-sync.defaults.json` unless overridden

## Preconditions (must all be true)

- Branch name follows `RM-007` (`mX/<slug>`).
- Working tree has no unresolved merge conflicts.
- `roadmap-pr-review` result is `READY_FOR_PUBLISH: yes`.
- User confirmed manual re-test after fixes.
- **Format gate:** `pnpm exec prettier --check` on scoped paths passes (re-run before commit if anything was edited after review). See `.cursor/rules/ci-quality-gate.mdc` / **TS-010**.

If any precondition fails, stop and report.

## Workflow

Track with TodoWrite:

```
- [ ] Resolve issue metadata and repo/base
- [ ] Re-stage only issue-scoped files
- [ ] Build commit message (conventional + issue context)
- [ ] Commit
- [ ] Push branch
- [ ] Create PR with template sections
- [ ] Return PR URL + summary
```

### Step 1 — Re-stage scoped files

Never use `git add .`.

```bash
git status --porcelain
git add <scoped-paths...>
pnpm exec prettier --check <scoped-paths...>
```

If Prettier fails: `pnpm exec prettier --write <scoped-paths...>`, re-stage, re-check. Do not commit until clean.

If out-of-scope files are staged, unstage them and stop for confirmation.

### Step 2 — Commit message format

Use conventional commits and include intent:

- type by issue nature (`feat`, `fix`, `chore`, `docs`, `test`, `refactor`)
- short scope (optional)
- message focused on why

Examples:

- `feat(infra): complete M1-01 bootstrap constraints`
- `fix(calc): enforce deterministic rounding in subtotal path`

### Step 3 — Commit

Commit only if there are staged changes:

```bash
git commit -m "<subject>" -m "<body>"
```

Body should include:

- issue reference and intent
- key validations executed

### Step 4 — Push

```bash
git push -u origin HEAD
```

If push fails (auth/permission), stop and report exact error.

### Step 5 — Create PR

Use `gh pr create` with structured body:

```bash
gh pr create --title "<title>" --body "<body>"
```

PR body minimum:

- `## What`
- `## Why`
- `## Decisions binding`
- `## Test plan`
- `Closes #N`

### Step 6 — Final output

Return:

- commit hash
- branch name
- PR URL
- any residual risks/follow-ups

## Safety rules

- Do not amend pushed commits unless user explicitly requests.
- Do not force-push unless user explicitly requests and acknowledges risk.
- Do not include unrelated files in commit.
