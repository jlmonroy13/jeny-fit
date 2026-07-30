---
name: roadmap-sync
description: >-
  Pushes a detailed roadmap milestone from docs/product/12-roadmap-milestones.md
  to GitHub — repository Milestone, Issues (body copied from the doc per RM-006),
  and optional GitHub Project items via gh CLI. Use when the user wants to sync M1–M9
  planning to GitHub issues, populate a GitHub Project board, or automate roadmap→GitHub
  after merging doc changes.
---

# Roadmap · Sync milestone to GitHub + Project

This workflow satisfies `docs/product/12-roadmap-milestones.md` §2.3 steps 2–3 in spirit: **one documented issue → one GitHub Issue**, milestone title aligned with the doc section header (`## N. MX · …` → GitHub Milestone title `MX · …`). Issue bodies are **verbatim doc content** plus a short footer pointing back to the doc (`RM-005`, `RM-006`).

Implementation lives in repo scripts (no extra npm deps):

| Script                               | Role                                                           |
| ------------------------------------ | -------------------------------------------------------------- |
| `scripts/roadmap-extract-issues.mjs` | Parses `#### MX-NN · …` blocks → JSON (`id`, `title`, `body`). |
| `scripts/roadmap-sync-github.mjs`    | Creates GitHub Milestone + Issues + `gh project item-add`.     |

## Defaults for this repository

Committed file **`.cursor/roadmap-sync.defaults.json`** sets:

| Key             | Value                   |
| --------------- | ----------------------- |
| `repo`          | `jlmonroy13/zafira-app` |
| `projectOwner`  | `jlmonroy13`            |
| `projectNumber` | `12`                    |

CLI flags **override** this file. Omit `--repo` / `--project-owner` / `--project-number` when using these defaults. To sync another repo or board, pass those flags or edit the JSON (forks / future boards).

**Shortcuts** (from repo root):

```bash
pnpm roadmap:sync -- --milestone M2 --dry-run
node scripts/roadmap-sync-github.mjs --milestone M1 --dry-run
```

## Prerequisites

1. **`gh` CLI** installed and authenticated (`gh auth login`).
2. **OAuth scopes**: `repo`. For Project boards: run `gh auth refresh -s project` if `gh project item-add` fails with a scope error.
3. **Permissions**: ability to create milestones and issues on the target repo, and to edit the Project (owner must match `--project-owner` when using user-owned projects).
4. **Milestone section fully detailed** in doc 12 (`§MX.6` with expanded `#### MX-NN` issues — **not** a placeholder). If issues are missing, run `/roadmap-detail MX` first.

Optional **once per repo ↔ Project**:

```bash
gh project link 12 --owner jlmonroy13 -R jlmonroy13/zafira-app
```

## Labels & dependency links

**Por qué antes no aparecían:** la primera versión del script no pasaba `--label` y dejaba `Depends on: \`M1-01\`` como texto plano. GitHub solo convierte en enlaces los **`#número`\*\* del mismo repositorio.

**Comportamiento actual:**

| Fuente en el doc                                   | Etiqueta GitHub                    |
| -------------------------------------------------- | ---------------------------------- |
| **Tipo** backend / frontend / infra / tests / docs | `type/backend`, `type/frontend`, … |
| **Estimación** 🟢 / 🟡                             | `size/small`, `size/medium`        |
| Milestone M1                                       | `roadmap/m1`                       |

Las etiquetas se crean en el repo si no existen (`gh label create -f`).

En la línea **Depends on**, los IDs `M1-NN` se sustituyen por **`#18`** (número real) según el orden de creación y el mapa de issues del milestone — así GitHub muestra enlaces clicables. Si falta el número (orden imposible), se deja el ID original.

**Issues ya creados** (sync anterior): ejecutá una vez:

```bash
pnpm roadmap:sync -- --milestone M1 --repair
```

Opcional: `--no-labels` o `--no-deps-resolve` si necesitás desactivar parte del comportamiento.

## Inputs (ask if missing)

- **`--milestone`**: `M1` … `M9` (maps to `## … MX ·` in doc 12). **Required.**
- **`--repo`**: `OWNER/NAME` of the GitHub repository (not the Project URL). Optional if `.cursor/roadmap-sync.defaults.json` defines `repo`.
- **`--project-owner`**: login that owns the Project (default `@me`, or from defaults file). For this board: `jlmonroy13`.
- **`--project-number`**: integer from the Project URL (e.g. `12`). Omit to **skip** `gh project item-add` unless set in defaults file.
- **`--doc`**: override path (default `docs/product/12-roadmap-milestones.md`).
- **`--label NAME`**: extra labels (repeatable). Tipo / size / `roadmap/mX` are added automatically unless `--no-labels`.
- **`--dry-run`**: print planned actions; **no** GitHub API calls.
- **`--repair`**: for issues **already** in the milestone, re-apply body (with `#` dependency links) and labels from the current doc.
- **`--no-labels`**: skip `type/*`, `size/*`, `roadmap/mX`.
- **`--no-deps-resolve`**: keep `Depends on: \`M1-01\``as-is (no`#` substitution).

## Workflow for the agent

1. Confirm `§MX.6` contains real `#### MX-NN ·` headings (not “A detallar…”).
2. Run **dry-run** and show the user the summary:

   ```bash
   pnpm roadmap:sync -- --milestone M1 --dry-run
   ```

   (Uses `.cursor/roadmap-sync.defaults.json` for repo + Project. Override with full flags if needed.)

3. After explicit user confirmation, rerun **without** `--dry-run`.
4. Post-sync checklist for the user:
   - Open the Project view; set **Status** / priority fields.
   - `type/*`, `size/*`, and `roadmap/mX` apply automatically; add extra tags with `--label` if needed. Use `--repair` after doc changes to refresh bodies and labels on existing issues.

## Idempotency & drift

- **Skipping duplicates**: before creating an issue, the sync script searches `MX-NN in:title` and skips when an issue already has the **exact** title `MX-NN · …`.
- **Updating bodies**: Re-run `--repair` after you change doc 12, or edit issues manually. Per `RM-005`, the doc wins.

## Labels & Project fields

Repository labels `type/*`, `size/*`, and `roadmap/mX` are set by the sync script. **`--label`** adds more. **Project** custom fields (e.g. board columns) are still manual or Project rules — the script only adds the issue to the board via `item-add`.

## Troubleshooting

| Symptom                                      | Fix                                                                           |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| `project` scope / OAuth errors on `item-add` | `gh auth refresh -s project`                                                  |
| Item-add succeeds but items invisible        | `gh project link …` for that repo                                             |
| `gh: Not Found` on milestone POST            | token lacks `repo` or wrong `--repo`                                          |
| Wrong milestone title on GitHub              | Title is taken from doc header `MX · Subtitle`; edit doc §MX heading if wrong |

## Out of scope

- Editing doc 12 or resolving placeholder milestones (use `/roadmap-detail`).
- GitHub’s built-in “blocked by” / sub-issue graph beyond `#` links in the body.
- Creating org-level label taxonomies or Project templates.
