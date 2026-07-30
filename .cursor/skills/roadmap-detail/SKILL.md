---
name: roadmap-detail
description: Expand a placeholder milestone (M2-M9) in docs/product/12-roadmap-milestones.md into atomic issues with a dependency graph, following the canonical template (§3) and lessons from the previous milestone's retrospective. Use when the user wants to plan, detail, expand, refine, or break down a milestone before starting work on it — typically right after closing the previous milestone.
---

# Roadmap · Detail a milestone

This skill turns the placeholder of a future milestone (M2..M9) in `docs/product/12-roadmap-milestones.md` into a fully detailed plan: atomic issues with `Depends on:`, a dependency graph (`§MX.6.0`), a summary table (`§MX.6.1`), each issue body following the canonical template (`§3.3`), plus the refined lists in `§MX.7` (primitivos UI) and `§MX.8` (quality gates).

The skill respects `RM-003` (just-in-time planning): only one milestone is detailed at a time, and only after the previous milestone has closed (or the user explicitly overrides).

## Inputs

- **Milestone ID**: required, in form `M2`, `M3`, ..., `M9`. If not provided, ask the user.

## Pre-flight checks (abort if any fails)

1. The doc `docs/product/12-roadmap-milestones.md` exists.
2. The target milestone section exists and is still a **placeholder**: `§MX.6` (Issues atómicas) contains the line `> **A detallar al cierre de M(X-1).** ...` and there is no `§MX.6.0` subsection. If `§MX.6.0` already exists, abort and inform the user — re-detailing requires deletion first, which is out of scope for this skill.
3. For X >= 3: confirm the previous milestone's retrospective `§M(X-1).10` is non-empty (not just the template). If empty, warn the user but allow proceeding with explicit confirmation.

If any pre-flight fails, stop and report. Do not modify the doc.

## Reading list

Read these in order before drafting anything. Do not skip; do not dump entire docs into context if a subsection suffices.

### Required (always)

1. **`docs/product/12-roadmap-milestones.md`** sections:
   - `§3` — canonical template (binding contract for issue shape)
   - `§4` — roadmap decisions `RM-001..RM-011` (binding)
   - `§6` — overview of all milestones (context)
   - `§7` — M1 detailed (use as **structural reference**, copy patterns from §7.6 to §7.10)
   - `§MX.1` to `§MX.5` — placeholder for the target milestone (objective, pre-requisitos, DoD, scope, out-of-scope)
   - `§MX.7` — primitivos candidatos (will be refined by this skill)
   - `§MX.8` — quality gates esqueleto (will be refined by this skill)
   - `§M(X-1).10` — previous milestone retrospective if non-empty
   - `§17` — glossary, decisions registered, open questions

2. **`AGENTS.md`** at the repo root — general conventions and binding doc list.

3. **`11-testing-strategy.md §18`** — **MANDATORY**. Defines exactly which tests must appear in each milestone (M2 smoke multitenancy, M6 motor 100% coverage, M9 performance budget, etc.). Without this, the skill omits binding test requirements.

### Selective (based on `§MX.4` scope)

The binding canonical docs that this milestone touches. Pick only the relevant subsections:

- `03-user-roles.md §7`, `§8` — canonical permissions and features (always for M2; sometimes M3-M9). M2 must seed exactly the 25 permissions and 7 features listed there.
- `05-domain-model.md` — entities and relationships (most milestones).
- `06-business-rules.md §17` — literal test cases for the engine (only for M6 and parts of M7).
- `07-design-system.md §7.0` — `DS-011` lazy-build policy (always for milestones with UI work).
- `07-design-system.md §7.X` — visual contract of each primitive needed.
- `08-frontend-architecture.md` — Server/Client Components patterns, Server Actions, forms, state.
- `09-backend-architecture.md` — schema, queries, transactions, multitenancy, migrations.
- `09-backend-architecture.md §17.4` — **MANDATORY for M2**: `BE-022` white-glove provisioning script (`provision-org.ts`).
- `09-backend-architecture.md §9.5.1` — **MANDATORY for M4**: `BE-021` equipment cost server-side derivation.
- `10-tech-stack.md` — only if new libraries or version bumps are needed.
- `11-testing-strategy.md` — full doc for tests; especially `§9.1` (multitenancy smoke), `§10.4` (action tests), `§13` (E2E patterns).

Use Grep to locate specific decision IDs and section anchors. Read ranges, not entire files.

## Output to produce

Replace the placeholder line in `§MX.6` with three subsections, **and refine `§MX.7` and `§MX.8`** if they are still in skeleton form.

### `§MX.6.0` Grafo de dependencias

Mirror the structure of `§7.6.0`:

- 1-2 sentences explaining the phase model and that dependencies are immediate (`RM-011`).
- An ASCII diagram showing phases vertically (copy the visual style of `§7.6.0`).
- A note about **cross-phase edges**: some `Depends on:` skip phases; the diagram does not draw them all to keep clarity, the canonical source is each issue's `Depends on:` field.
- A summary table: `| Fase | Issues paralelas | # | Bottleneck / nota |`.
- A "**Camino crítico**" line listing the longest path with hop count.
- A 1-line operational recommendation about parallelism (e.g., "Phase 1 has N issues — distribute among agents/devs").

### `§MX.6.1` Tabla resumen de issues

A table with columns `| ID | Tipo | Estimación | Título |`, one row per issue, sorted by ID ascending.

### Each issue expanded

Format from `§3.3`, exactly:

```markdown
#### MX-NN · <Título corto, en imperativo>

- **Tipo**: backend | frontend | infra | tests | docs
- **Estimación**: 🟢 | 🟡 | 🔴
- **Depends on**: `MX-NN`, `MX-NN` o `none`
- **Decisiones binding**: <ej: `FE-001`, `BE-013`>
- **Docs canónicos**: <ej: `09 §9.6`, `11 §10`>
- **Acceptance criteria**:
  - [ ] criterio 1 (verificable, no subjetivo)
  - [ ] criterio 2
  - ...
- **Out of scope para esta issue**: <bullets cortos>
```

### `§MX.7` Primitivos UI a construir (DS-011)

Refine the placeholder. For each primitive needed by this milestone (identified in Step 1 of the workflow), add a row to the table:

```markdown
| Primitivo          | Issue   | Variantes en MX  | Variantes futuras (cuándo) |
| ------------------ | ------- | ---------------- | -------------------------- |
| `Card` (`07 §7.X`) | `MX-NN` | filled, outlined | elevated (post-MVP)        |
```

Mirror the structure of `§7.7` (M1 reference).

### `§MX.8` Quality gates que entran en este milestone

Extend the skeleton with new gates introduced by this milestone (cumulative — gates from previous milestones still apply). Mirror `§7.8` style:

```markdown
| Gate       | Estado                        | Implementado en | Notas    |
| ---------- | ----------------------------- | --------------- | -------- |
| <new gate> | `error` / `required` / `warn` | `MX-NN`         | <reason> |
```

Common new gates per milestone (non-exhaustive guide):

- M2: `.cursor/rules/auth.mdc` + `.cursor/rules/multitenancy.mdc`; smoke multitenancy bloqueante (`TST-002`); coverage `src/server/auth/**` ≥ 80%.
- M3: coverage global ≥ 80% (`RM-010`); `.cursor/rules/server-actions.mdc`.
- M4: coverage `src/server/costLibrary/**` ≥ 90% (`TST-018`); `.cursor/rules/derivation.mdc`.
- M6: coverage `src/server/calc/**` = 100% **bloqueante** (`TST-001`); `.cursor/rules/calc-engine.mdc`.
- M7: `.cursor/rules/optimistic.mdc`.
- M8: `.cursor/rules/immutability.mdc`.
- M9: performance budget bloqueante (`TS-OPEN-05`); coverage global ≥ 85%; smoke E2E completo bloqueante.

**Convención de idioma** (matching `§7` of M1):

- **Títulos de issue: inglés**, verbo en imperativo, sin artículo. Ej: `Initialize Next.js 16 + React 19 + TypeScript strict + pnpm`, `Build Button primitive (DS-011)`, `Configure GitHub Actions CI`.
- **Bodies (acceptance criteria, "Out of scope para esta issue"): español**. Ej: "el repo no tiene errores de lint en M1-01", "todos los strings en `messages/es-CO.json`".
- **Identificadores y rutas: inglés siempre** dentro de los bodies (file paths, function names, env vars, npm scripts, decision IDs). Ej: "`pnpm dev` arranca y sirve `http://localhost:3000`", "el módulo importa `import \"server-only\"`".
- **Labels de campos canónicos: español**. Ej: `**Tipo**`, `**Estimación**`, `**Depends on**`, `**Decisiones binding**`, `**Docs canónicos**`, `**Acceptance criteria**`, `**Out of scope para esta issue**` (estos son fijos de la plantilla `§3.3`, no traducir).
- **Prosa adicional (notas, recomendaciones, rationale en `§MX.6.0`): español**.

## Quality constraints (binding)

- **`RM-001`**: every issue must be 🟢 (~30 min review) or 🟡 (~1-2 h review). If a candidate is 🔴, **split it before continuing**. Do not write 🔴 issues to the doc.
- **`RM-002`**: dependencies must be issues of the **same milestone**. Do not list cross-milestone `Depends on:`. Pre-conditions from previous milestones are implicit (the previous milestone is closed before this one starts).
- **`RM-006`**: the issue body in the doc is the source of truth for the future GitHub issue body. Each issue must be self-contained, unambiguous, and copy-pasteable.
- **`RM-011`**: every issue must declare `Depends on:`. Use `none` only if the issue can start from day 1 of the milestone. Dependencies must be **immediate** (parents in the DAG), never transitive.
- **Decisión IDs válidos**: every ID referenced (`FE-XXX`, `BE-XXX`, `TS-XXX`, `DS-XXX`, `TST-XXX`, `RM-XXX`) must already exist in its corresponding doc's decisions section. Verify with `grep` before writing.
- **No new decisions**: if planning surfaces a need for a new design/tech decision, do NOT register it inside this milestone. Instead, propose adding it as an open question (`*-OPEN-XX`) in the appropriate doc and reference it from the affected issue's "Out of scope" or "Docs canónicos".
- **No new scope**: stay strictly within `§MX.4` (Scope sí entra) and `§MX.5` (Out of scope). If the user wants to expand scope, that is a separate edit to `§MX.4`/`§MX.5` _first_, not part of this skill.
- **DAG sin ciclos**: validate that no issue depends transitively on itself.
- **Numeración continua**: `MX-01`, `MX-02`, ..., no gaps.

## Invariantes producto que deben aparecer como ACs

For every issue that touches the corresponding area, these invariants **must appear as explicit acceptance criteria** (binding):

### Multitenancy (`BE-001`)

Any issue with a query against a table containing `organization_id`:

- [ ] La query filtra por `organizationId` del session activo (helper `requireOrgFromSession()` o equivalente).
- [ ] Hay test que verifica isolation: un usuario de org A no puede leer/modificar registros de org B.
- [ ] El smoke test global (`TST-002`, `11 §9.1`) cubre la nueva tabla.

### Server-only (`FE-012`, `BE-005`)

Any issue creating Server Actions or server queries:

- [ ] El módulo importa `import "server-only"` (top of file).
- [ ] No hay leakage a Client Components: imports de `src/server/**` desde `src/components/**`, `src/features/**` o `app/**` sin `"use server"` están bloqueados por ESLint (`08 §17.4`, `09 §22.1`).

### i18n (no hardcoded copy)

Any issue creating UI with user-facing text:

- [ ] Toda string user-facing está en `messages/es-CO.json`, no hardcoded en JSX.
- [ ] La página/componente consume `useTranslations()` (Client) o `getTranslations()` (Server).

### a11y (`07 §13`, `11 §12`)

Any issue creating UI components or pages:

- [ ] Tests `jest-axe` en componentes nuevos (0 violations).
- [ ] Test E2E con `@axe-core/playwright` en páginas nuevas (0 violations).
- [ ] Focus ring visible (`focus-visible:ring-*` con tokens M3 de `07 §5.4`).
- [ ] Contraste WCAG 2.2 AA en todos los textos.

### Determinismo del motor (`BE-010`, `TST-001`) — solo M6+

Any issue under `src/server/calc/**`:

- [ ] No `Date.now()`, no `Math.random()`, no I/O.
- [ ] Inputs son tipados (no `any`); outputs son determinísticos.
- [ ] Test de idempotencia: ejecutar N veces → mismo output exacto.
- [ ] Coverage = 100% en este módulo.

### Inmutabilidad post-`sent` (`BE-OPEN-XX`) — solo M8+

Any issue that modifies tender data:

- [ ] Si `tender.status = sent`, la action retorna error `INVARIANT_VIOLATION`.
- [ ] Test verifica que una versión locked no se puede mutar.

## Patrones repetibles de M1

Apply these patterns to every milestone (mirror `§7` structure):

1. **La última issue del milestone** (`MX-NN` con N = total) es **siempre** "Capture bundle size baseline in `§MX.9` + write retrospective `§MX.10`". Cumple `RM-009` y `RM-004`. Depends on: la penúltima issue (transitivamente cubre todo).
2. **La penúltima issue** suele ser un **smoke E2E del flujo crítico** del milestone (validación end-to-end). Si no aplica (caso M1 que no tiene flujo de negocio), reemplazar por una issue de cierre técnico equivalente (ej: `M1-23 branch protection`).
3. **Fase 1 del grafo** debe maximizar paralelismo: agrupar todas las issues que solo dependen de la primera issue del milestone. Esto permite que múltiples agentes/devs trabajen simultáneamente al inicio.
4. **Test config / factories** van en Fase 2 (después de la setup base, antes de los tests reales que las consumen).
5. **Issues 🟢 vs 🟡**: target ~70% 🟢 / ~30% 🟡. Si el ratio es muy distinto, revisar splits.
6. **Issues por área**: target balance ~30% backend / ~30% frontend / ~15% tests / ~20% infra / ~5% docs. Ajustar según naturaleza del milestone (M5 inclina backend, M7 inclina frontend, etc.).

## Casos especiales por milestone

These milestones have unique invariants the skill **must** include as issues or ACs:

### M2 · Auth + Multitenancy

- Issue dedicada: `BE-022` white-glove `provision-org.ts` script with atomic transaction creating org + features + 3 canonical roles + invitation. See `09 §17.4` for canonical script shape.
- Issue dedicada: seed exactly the 25 permissions and 7 features from `03 §7` and `03 §8` (no inventar nuevos).
- Issue dedicada: smoke test global de multitenancy (`TST-002`, `11 §9.1`) — bloqueante en CI desde este milestone.
- ACs estándar: ver "Multitenancy" en sección de invariantes.
- `.cursor/rules/auth.mdc` y `.cursor/rules/multitenancy.mdc` introducidos en `§MX.8`.

### M4 · Biblioteca de costos

- `cost_library_items` schema **incluye** `baseValue`, `depreciationRate` con CHECK constraint (`09 §9.5`).
- Issue dedicada: derivación server-side de `unitCost = baseValue × depreciationRate` para equipment (`BE-021`, `09 §9.5.1`). NO derivar en cliente.
- Issue dedicada: factories `costLibraryItemFactory` + `costLibraryEquipmentFactory` que respetan invariantes (`TST-017`, `11 §7.3`).
- Issue dedicada: tests `createCostLibraryItem` / `updateCostLibraryItem` con los 3 escenarios del check constraint (`TST-018`, `11 §10.4`).
- UI por tipo (material/labor/equipment) con `unitCost` read-only para equipment (`DS-012`, `07 §8.4.2`).

### M6 · Motor de cálculo

- Coverage `src/server/calc/**` = **100% bloqueante** en CI (`TST-001`).
- Tests literales de **todos** los ejemplos canónicos en `06 §17`.
- Tests de idempotencia (recalcular N veces → mismo output).
- Tests de invariantes (totales suman, AIU dentro de rango, etc., ver `06 §16`).
- Snapshot testing del motor permitido como **única excepción** a `TST-009` (ver `11 §18` y `TST-001`).
- Motor puro: 0 deps de DB, 0 `Date.now()`, 0 `Math.random()`.

### M7 · Editor APU + Wizard

- APU items pueden override `unitCost` pero NO `baseValue` / `depreciationRate` (resuelve `BE-OPEN-10`).
- Auto-recalc on-edit con `useOptimistic` (`FE-OPEN-06` parcialmente cerrado).
- Editor con drag/drop + autocomplete desde biblioteca.

### M8 · Versionado + Aprobación

- `tender_versions.lockedAt` congela la versión: locked versions son inmutables.
- Flujo aprobación: estimador-líder → gerencia (uso de `approval.gerencia` permission).
- Action `sendTender` requiere `approved` y crea snapshot inmutable.
- Tests de invariante "locked no se muta" obligatorios.

### M9 · Descuentos + Exportables + Branding

- Feature flag `discounts.post_sent` activable por org (resuelve `BE-OPEN-XX`).
- Performance budget **bloqueante** en CI (resuelve `TS-OPEN-05`). Ninguna ruta excede su threshold.
- File storage para logos (resuelve `TS-OPEN-02`).
- Branding por org: logo + accent color en exportables PDF/XLSX y elementos sutiles in-app.
- Smoke E2E completo end-to-end (login → crear tender → editor → aprobar → enviar → exportar PDF) bloqueante.
- Tag `v0.9.0-m9` y posteriormente `v1.0.0`.

## Workflow

Track progress with a TODO list (use the TodoWrite tool). Use this checklist:

```
- [ ] Read all required sections (Reading list)
- [ ] DS-011 audit: identify required UI primitives not yet built
- [ ] Decompose §MX.4 into candidate atomic units
- [ ] Inject special-case issues for this milestone (see "Casos especiales")
- [ ] Validate each candidate against quality constraints (split 🔴, verify IDs)
- [ ] Verify mandatory ACs from "Invariantes producto" are present where applicable
- [ ] Build the dependency graph (compute phases)
- [ ] Compute critical path
- [ ] Draft §MX.6.0, §MX.6.1, each #### MX-NN, plus refined §MX.7 and §MX.8
- [ ] Verify all decision IDs and cross-references with grep
- [ ] Present full draft to user for review
- [ ] Apply via StrReplace once user confirms
- [ ] Run ReadLints on the doc; fix any issues
```

### Step 1 — Decompose `§MX.4` and audit DS-011 primitives

Read `§MX.4` (scope) bullet by bullet. For each, decide if it is one issue or several. Group by area:

- backend / DB / migrations / Server Actions
- frontend / pages / forms / UI primitives (under `DS-011`)
- tests (factories, integration, E2E)
- infra / CI / config

**DS-011 audit (mandatory)**: list every UI primitive from `07 §7` that this milestone consumes. For each:

- if it already exists in `src/components/ui/` (built in a previous milestone): no extra issue needed.
- if it does NOT exist: **generate a dedicated issue `MX-NN · Build <Primitive> primitive (DS-011)`** in an early phase, with all variants needed by this milestone (no speculative variants). Other issues that consume this primitive must declare it as `Depends on:`.

Aim for 25-35 issues per milestone (M1 baseline is 24-26 with skills issues).

### Step 2 — Inject special-case issues

Cross-reference the "Casos especiales por milestone" section above for the target milestone. Make sure each unique invariant has a dedicated issue (or, where appropriate, an explicit AC in an existing issue).

### Step 3 — Validate each candidate

For each candidate issue, verify:

- Title is imperative and short (<80 chars).
- Acceptance criteria are 3-7 verifiable items (not subjective: "looks good" is invalid).
- Mandatory invariants from "Invariantes producto" appear as ACs where the issue touches that area.
- Binding decision IDs exist in their respective docs (grep to confirm).
- Estimated review time fits 🟢 (~30 min) or 🟡 (~1-2 h).
- If estimate is 🔴: split into 2+ issues before continuing.

### Step 4 — Build the dependency graph

For each issue, identify **immediate** `Depends on:` (parents in the DAG). Heuristics:

- DB schema → migrations → queries → Server Actions → UI consumers.
- Core primitives (`07 §7`) → composed components.
- Test config (Vitest/Playwright/factories) → tests that use them.
- Auth setup → any RBAC-aware feature.
- Linting / formatting / hooks setup → code-quality-dependent issues.
- Infra setup → smoke E2E → bundle baseline + retro (last issue).

Compute the **phase** of each issue: `phase(I) = max(phase of all I's deps) + 1`. Issues with `Depends on: none` are in phase 0.

### Step 5 — Detect anti-patterns and reject

Reject candidates with these patterns:

- Single issue touches >2 areas (likely needs split).
- Acceptance criteria contain "implement everything for X" (vague).
- Dependencies declared as a milestone (e.g., `Depends on: M1`); they must be specific issue IDs of the **same** milestone or `none`.
- Cyclic dependencies.
- Two issues with identical scope (deduplicate).
- Missing mandatory invariant ACs (multitenancy, server-only, i18n, a11y where applicable).

### Step 6 — Validate references

Before writing, run grep over `docs/product/` for each cited decision ID. If any fails to resolve, either fix the reference or remove it.

### Step 7 — Present to user

Show a draft summary in chat (not in the doc yet). Format:

```
# Propuesta de detalle para M2

Total: N issues (X 🟢 + Y 🟡 + 0 🔴) en P fases.

## Grafo de dependencias
[ASCII diagram condensed]

## Tabla resumen
[Compact table]

## Camino crítico
M2-01 → ... (P hops)

## Primitivos UI a construir (DS-011)
- <list>

## Quality gates nuevos
- <list>

## Decisiones / preguntas que surgieron
- (opcional) sugerir entradas *-OPEN-XX para registrar en otros docs
- (opcional) ajustes a §MX.4 / §MX.5 si algo del scope quedó ambiguo

[link / collapse de issues bodies para revisión más detallada]
```

Then ask the user: **"¿Procedo a escribir esto en el doc, o querés ajustar algo (renombrar, splittear, agregar / quitar issues, cambiar dependencias, refinar §MX.7 / §MX.8)?"**

If the user wants changes, iterate. Do not write to the doc until explicit confirmation.

### Step 8 — Apply changes to the doc

Once confirmed:

1. Replace the placeholder line in `§MX.6` with `§MX.6.0`, `§MX.6.1`, and the issue bodies.
2. Replace `§MX.7` placeholder with the refined primitives table.
3. Replace `§MX.8` placeholder with the refined gates table.
4. Do **not** modify any other section unless the user explicitly asked for it (e.g., `§MX.4` adjustments).
5. If the user agreed to register new `*-OPEN-XX` open questions in other docs, apply those as separate `StrReplace`s in their target docs (e.g., `09 §19.3`).
6. Run `ReadLints` on every modified file. Fix any markdown issues.

### Step 9 — Final report

After writing:

- Summarize what was added: line count delta, # of issues, list of files modified.
- Remind the user to commit. Suggest commit message: `docs(roadmap): detail MX with N issues across P phases`.
- Mention next steps:
  - **`roadmap-sync` skill** + `node scripts/roadmap-sync-github.mjs …` to push milestone + issues (+ optional GitHub Project) after doc changes are merged.
  - Otherwise, manual creation of the GitHub Milestone and Issues using the doc as source.

## Common pitfalls

- **Inventing scope**: do not add features outside `§MX.4`. If something seems missing, surface it as a question.
- **Skipping the previous retrospective**: `§M(X-1).10` often contains "for next milestone, do X differently" — honor those notes.
- **Forgetting `Depends on: none`**: every issue must have the field, even if empty.
- **Over-detailing acceptance criteria**: 3-7 items is the target. If a criterion needs a paragraph, it might be its own issue.
- **Detail bleed**: do not preview M(X+1) or later issues in this milestone's detail.
- **Rewriting M1**: this skill never modifies `§7` (M1 is the gold reference and is closed once tagged).
- **Skipping invariants**: missing multitenancy, server-only, i18n, or a11y ACs is the most common bug. Always check.
- **Skipping special cases**: if the target is M2, M4, M6, M7, M8, or M9, re-read "Casos especiales por milestone" before drafting.

## Out of scope for this skill

- Creating GitHub Issues, Milestones, Labels, or Project items by hand at scale. Use the **`roadmap-sync`** skill (`scripts/roadmap-sync-github.mjs`) instead.
- Modifying `§MX.1`-`§MX.5` (objective / pre-requisitos / DoD / scope / out-of-scope). Those are stable since the doc was written; if they need changing, that is a user-driven separate edit.
- Detailing more than one milestone in a single invocation. Run the skill once per milestone.
- Committing or pushing changes. The user reviews the diff and commits.
- Writing tests, code, or any artifact outside `docs/product/12-roadmap-milestones.md` (unless the user agreed to register `*-OPEN-XX` entries in other docs).
