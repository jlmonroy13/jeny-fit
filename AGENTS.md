# AGENTS.md — Jeny Fit

Guide for AI agents and human reviewers working on **Jeny Fit**. Development is **documentation-first**, **linear milestones**, and **1 issue = 1 PR**.

## Non-negotiable rules

1. **No product features** until relevant canonical docs exist and an issue has acceptance criteria.
2. **`docs/product/` is the source of truth** — not model training data or generic framework tutorials.
3. **Stable decision IDs** (`TS-001`, `FE-001`, `BE-001`, `BR-001`, `RM-001`, …). If an issue cites an ID, it is binding. Change decisions → PR to the doc → then code.
4. **Open questions** use `*-OPEN-NN` — do not resolve them in unrelated work.
5. **Languages:** code, filenames, and comments in **English**; **UI copy in Spanish (es-CO)**; product docs in **`docs/product/` in Spanish**; PR descriptions in **Spanish** (team default).
6. **Linear milestones M1 → MN** — do not mix milestones in one PR without explicit approval.
7. **1 issue = 1 PR** (~30 min review). Split large issues before starting.
8. **Branch naming:** `Mx-NN-<slug>` where `Mx-NN` is the issue ID in [`docs/product/12-roadmap-milestones.md`](docs/product/12-roadmap-milestones.md), not the GitHub issue number.
9. **Just-in-time planning:** only the active milestone has detailed issues; future milestones stay objective + skeleton DoD until retrospective.
10. **Lazy-build UI:** design system components only when the first real caller exists in the same PR (RM-011).

## Cursor rules (`.cursor/rules/`)

| Rule | Scope |
|------|--------|
| `documentation-first.mdc` | Always — docs-first, RM-001/002/010 |
| `milestone-active.mdc` | Always — current milestone issues, no scope creep |
| `business-binding.mdc` | Always — map to docs/product, closed MVP decisions |
| `ci-quality-gate.mdc` | Always — ESLint + Prettier before READY_FOR_PUBLISH / PR |
| `code-conventions.mdc` | `*.{ts,tsx}` — EN code, es-CO UI |
| `nextjs-app.mdc` | `app/**` — App Router, FE-* |

Update `milestone-active.mdc` when the active milestone changes (after each MX.10 retrospective).

## When to read each doc

| Doc | Read when |
|-----|-----------|
| [`docs/product/01-product-vision.md`](docs/product/01-product-vision.md) | Understanding problem, vision, north star |
| [`docs/product/02-scope-mvp.md`](docs/product/02-scope-mvp.md) | Cutting scope, MVP vs later phases |
| [`docs/product/03-user-roles.md`](docs/product/03-user-roles.md) | AuthZ, roles, permissions |
| [`docs/product/04-user-flows.md`](docs/product/04-user-flows.md) | End-to-end journeys (FLOW-*) |
| [`docs/product/05-domain-model.md`](docs/product/05-domain-model.md) | Entities, ER, migrations |
| [`docs/product/06-business-rules.md`](docs/product/06-business-rules.md) | BR-* rules and literal test cases |
| [`docs/product/07-design-system.md`](docs/product/07-design-system.md) | Visual contract, components |
| [`docs/product/07-prototype-screens.md`](docs/product/07-prototype-screens.md) | Screen inventory, MVP vs prototype |
| [`docs/product/08-frontend-architecture.md`](docs/product/08-frontend-architecture.md) | Next.js structure, FE-* decisions |
| [`docs/product/09-backend-architecture.md`](docs/product/09-backend-architecture.md) | API, auth, BE-* decisions |
| [`docs/product/10-tech-stack.md`](docs/product/10-tech-stack.md) | Versions, libraries, TS-* / TS-OPEN-* |
| [`docs/product/11-testing-strategy.md`](docs/product/11-testing-strategy.md) | Test layers, quality gates |
| [`docs/product/12-roadmap-milestones.md`](docs/product/12-roadmap-milestones.md) | **Always** for active milestone, issues, RM-*, branches |

## Milestone workflow

1. Read the active issue (or `MX-NN` section in doc 12) + all **Docs canónicos** + **Decisiones binding**.
2. Verify **Depends on** issues are merged.
3. Post a **short implementation plan** for human review before coding.
4. Implement only issue scope; do not touch **Out of scope**.
5. On completion: checklist of acceptance criteria + manual test notes.

**Active milestone:** **M1 · Foundation** — see doc 12. `roadmap-sync` → Ready → code; 1 issue = 1 PR (`M1-NN-slug`).

## Roadmap decisions (binding summary)

| ID | Rule |
|----|------|
| RM-001 | 1 issue = 1 PR |
| RM-002 | Linear milestones |
| RM-003 | JIT detailed issues |
| RM-004 | Retrospective before next milestone detail |
| RM-005 | docs/product is contract |
| RM-006 | Issue body copies doc |
| RM-007 | Blocking dependencies |
| RM-008 | Progressive quality gates |
| RM-009 | Decision IDs binding |
| RM-010 | Branch `Mx-NN-slug` |
| RM-011 | Lazy-build UI components |

Full text: [`docs/product/12-roadmap-milestones.md`](docs/product/12-roadmap-milestones.md) §4.

## Commits

Use **Conventional Commits** in English:

```
<type>(<scope>): <short description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `chore`, `test`, `refactor`, `ci`.  
Scope examples: `m1-01-docs`, `auth`, `docs`.  
Reference issue ID in body when helpful: `M1-01`.

## Next.js (this repo)

This is **not** the Next.js version from most training data. Before writing routes, data fetching, or config:

- Read guides under `node_modules/next/dist/docs/`
- Follow deprecation notices in the installed version (**TS-001**: Next 16)

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Session chat references

When implementing, attach in chat:

```
@AGENTS.md @docs/product/12-roadmap-milestones.md
```

Plus the active issue section (e.g. `M1-01`).
