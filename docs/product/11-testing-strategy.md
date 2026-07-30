# 11 · Testing strategy

> **Estado:** v0.1 — borrador (plantilla).

## 1. Objetivo y audiencia

Pirámide de tests y quality gates (`TEST-*`, `RM-008`).

## 2. Herramientas (objetivo)

| Capa | Herramienta | Ref |
|------|-------------|-----|
| Unit | Vitest | TS-020 |
| E2E | Playwright | TS-021 |

## 3. Decisiones (`TEST-NNN`)

| ID | Decisión |
|----|----------|
| TEST-001 | Vitest para unit |
| TEST-002 | Playwright para E2E |
| TEST-014 | Lean: no tests “por cobertura”; solo gatillos (authZ, dinero, BR prioritaria, AC explícito) |

## 4. Pirámide

- Unit (puro / dominio)
- Integration (DB / tenant) — opcional por milestone
- E2E (flujos críticos)

## 5. Quality gates por milestone (`RM-008`)

| Milestone | Gate |
|-----------|------|
| M1 | lint + typecheck + format + harness Vitest |
| M2+ | + tests según matriz BR/FLOW |

## 6. Matriz `BR-*` → automatización

| BR | Capa | Milestone |
|----|------|-----------|
| … | unit | … |

## 7. Matriz `FLOW-*` → E2E

| FLOW | E2E | Milestone |
|------|-----|-----------|
| … | … | … |

## 8. Fixtures / seed

## 9. Preguntas abiertas

## 10. Referencias

- [`06-business-rules.md`](06-business-rules.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md)
