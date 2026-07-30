# 12 · Roadmap & milestones

> **Estado:** v0.1 — **M1 activo** (detalle inicial); M2+ esqueleto.

## 1. Objetivo y audiencia

Este documento guía a **agentes AI** y al **revisor humano** en qué construir, en qué orden, y con qué criterios de aceptación.

**Producto:** Jeny Fit — _(completar una línea en doc 01)_.
**Repo:** [jlmonroy13/jeny-fit](https://github.com/jlmonroy13/jeny-fit).

**Reglas:** RM-003 (solo el milestone **activo** bloquea implementación); RM-004 (retrospectiva antes de refinar el siguiente).

## 2. Mapa de milestones

| ID | Nombre | Entrega principal | MVP | Estado |
|----|--------|-------------------|-----|--------|
| **M1** | Foundation | Docs, CI, stack cerrado, esqueleto sin features de negocio | — | **Activo** |
| **M2** | _(definir)_ | … | Sí | Esqueleto |
| **M3** | _(definir)_ | … | Sí | Esqueleto |

### 2.1 Estado de implementación (repo)

| Milestone | Docs producto | Código |
|-----------|---------------|--------|
| **M1** | ⏳ plantillas | ⏳ create-next-app base |
| **M2+** | esqueleto | — |

## 3. Plantilla canónica de milestone

| Sección | Contenido |
|---------|-----------|
| **MX.1** | Objetivo |
| **MX.2** | Definition of Done |
| **MX.3** | Scope (in) |
| **MX.4** | Out of scope |
| **MX.5** | Issues atómicas (tabla + detalle) |
| **MX.6** | Grafo dependencias |
| **MX.7** | Quality gates (`RM-008`, `11`) |
| **MX.8** | Riesgos |
| **MX.9** | Docs a actualizar |
| **MX.10** | Retrospectiva |

### 3.1 Forma canónica de una issue

```markdown
## [M1-NN] Título corto

**Tipo:** chore | feat | fix | docs
**Estimación:** S | M | L (PR reviewable ~30 min)

### Depends on
- M1-XX — o "ninguna"

### Decisiones binding
- TS-013, BE-010, RM-001, …

### Docs canónicos
- docs/product/12-roadmap-milestones.md (M1-NN)

### Acceptance criteria
- [ ] …

### Out of scope
- …
```

## 4. Decisiones de roadmap (`RM-001` … `RM-011`)

| ID | Decisión |
|----|----------|
| **RM-001** | **1 issue = 1 PR** — reviewable en ~30 min; si no cabe, partir la issue. |
| **RM-002** | **Milestones lineales** — no mezclar Mx y My en el mismo PR sin aprobación explícita. |
| **RM-003** | **Planificación just-in-time** — solo el milestone **activo** es binding para código; futuros: tentativo hasta MX.10. |
| **RM-004** | **Retrospectiva obligatoria** — completar MX.10 antes de refinar issues del siguiente. |
| **RM-005** | **`docs/product/` es contrato** — no implementar producto sin doc + issue con acceptance criteria. |
| **RM-006** | **Issue body = copia del doc** — divergencia → actualizar doc primero. |
| **RM-007** | **Dependencias bloqueantes** — no iniciar issue hasta `Depends on` merged. |
| **RM-008** | **Quality gates progresivos** — ver [`11-testing-strategy.md`](11-testing-strategy.md). |
| **RM-009** | **Decision IDs binding** — TS-/FE-/BE-/BR-/TEST-/RM- en issue son obligatorios. |
| **RM-010** | **Branch naming** — `Mx-NN-<slug>`. Ej.: `M1-01-docs-bootstrap`. |
| **RM-011** | **Lazy-build UI** — componente design system solo con primer caller en el **mismo PR**. |

## 5. M1 · Foundation (detalle)

### M1.1 Objetivo

Base técnica y de proceso: docs canónicos, CI, stack cerrado, esqueleto **sin** features de negocio.

### M1.2 Definition of Done

- [ ] `docs/product/01`–`12` + `AGENTS.md` usable por agents
- [ ] CI PR: lint + typecheck + format + test en verde (cuando existan scripts)
- [ ] Decisiones `TS-*` mínimas cerradas en doc 10 (DB/auth pueden quedar OPEN con ID)
- [ ] Retrospectiva M1.10 completada

### M1.3 Scope (in)

Tooling, CI, estructura `app/`/`lib/`, docs producto, harness de tests.

### M1.4 Out of scope

Features de negocio, design system sin caller, producción piloto.

### M1.5 Issues atómicas

| ID | Título | Tipo | Est. | Depends on | Decisiones binding |
|----|--------|------|------|------|------------|-------------------|
| **M1-01** | Product docs bootstrap & AGENTS | docs | S | — | RM-005, RM-006 |
| **M1-02** | Tooling: Prettier, typecheck, engines, scripts | chore | S | M1-01 | TS-003, TS-010, TS-023, RM-008 |
| **M1-03** | CI workflow (lint/typecheck/format/test) | ci | S | M1-02 | RM-008, TS-015 |
| **M1-04** | Stack decisions close (DB/auth/hosting) | docs | S | M1-01 | TS-011…TS-015 |
| **M1-05** | Vitest harness | chore | S | M1-02 | TS-020, TEST-001 |
| **M1-06** | Docs sync 08/09/10/11 post-tooling | docs | S | M1-02, M1-04, M1-05 | RM-005 |

#### M1-01 · Product docs bootstrap & AGENTS

**Tipo:** docs
**Estimación:** S

### Depends on
- ninguna

### Decisiones binding
- RM-005, RM-006

### Docs canónicos
- docs/product/12-roadmap-milestones.md (M1-01)

### Acceptance criteria
- [ ] `AGENTS.md` describe reglas no negociables + mapa de docs
- [ ] Existen stubs `docs/product/00`–`12`
- [ ] `.cursor/rules` documentation-first + milestone-active + business-binding
- [ ] Skills roadmap presentes con `SKILL.md`

### Out of scope
- Llenar visión/scope con contenido de negocio definitivo (puede quedar TODO en 01–02)
- Features de producto

#### M1-02 · Tooling: Prettier, typecheck, scripts

**Tipo:** chore
**Estimación:** S

### Depends on
- M1-01

### Decisiones binding
- TS-003, TS-010, TS-023, RM-008

### Acceptance criteria
- [ ] Scripts `typecheck`, `format`, `format:check` en `package.json`
- [ ] Prettier config + ignore
- [ ] Alias `@/*` documentado/confirmado en tsconfig si aplica

### Out of scope
- Features de negocio

#### M1-03 · CI workflow

**Tipo:** ci
**Estimación:** S

### Depends on
- M1-02

### Decisiones binding
- RM-008, TS-015

### Acceptance criteria
- [ ] GitHub Actions en PR: lint → typecheck → format:check → test
- [ ] Documentado en doc 10 § CI

### Out of scope
- Deploy de producción

#### M1-04 · Stack decisions close

**Tipo:** docs
**Estimación:** S

### Depends on
- M1-01

### Decisiones binding
- TS-011, TS-012, TS-013, TS-015

### Acceptance criteria
- [ ] Doc 10 con DB/ORM/Auth/Hosting decididos **o** `TS-OPEN-*` explícitos
- [ ] Doc 08/09 actualizados con refs TS-*

### Out of scope
- Implementar DB/auth (issues posteriores si se detallan)

#### M1-05 · Vitest harness

**Tipo:** chore
**Estimación:** S

### Depends on
- M1-02

### Decisiones binding
- TS-020, TEST-001

### Acceptance criteria
- [ ] `pnpm test` corre al menos 1 smoke test
- [ ] Doc 11 actualizado

### Out of scope
- Playwright E2E

#### M1-06 · Docs sync post-tooling

**Tipo:** docs
**Estimación:** S

### Depends on
- M1-02, M1-04, M1-05

### Decisiones binding
- RM-005

### Acceptance criteria
- [ ] Docs 08–11 reflejan lo instalado en el repo
- [ ] `00-coherence-index` sin contradicciones obvias

### Out of scope
- Detallar M2 issues (eso es post M1.10)

### M1.6 Grafo

```text
M1-01
  ├── M1-02 → M1-03
  │         → M1-05
  ├── M1-04
  └── M1-06 (espera 02, 04, 05)
```

### M1.7 Quality gates

Lint + typecheck + format + test (cuando existan).

### M1.8 Riesgos

- Scope de producto aún vacío en 01–02 → no codear features hasta llenarlos.
- `projectNumber` en `.cursor/roadmap-sync.defaults.json` debe coincidir con el GitHub Project real.

### M1.9 Docs a actualizar

`00`, `08`, `09`, `10`, `11`, `AGENTS.md`, `milestone-active.mdc`.

### M1.10 Retrospectiva

_(Completar al cerrar M1.)_

## 6. M2+ (esqueleto)

Tras **M1.10**, usar skill `roadmap-detail` para expandir M2.

| ID | Objetivo tentativo | DoD tentativo |
|----|--------------------|---------------|
| M2 | _(definir en doc 02)_ | Issues detalladas + DoD checklist |
| M3 | … | … |

## 7. Convenciones de estimación

| Est. | Guía |
|------|------|
| S | ≤ ~2 h / PR ~30 min review |
| M | partir si crece |
| L | **partir** antes de codear |

## 8. Preguntas abiertas

| ID | Tema |
|----|------|
| RM-OPEN-01 | Nombres/objetivos M2+ hasta llenar doc 02 |

## 9. Referencias

- [`AGENTS.md`](../../AGENTS.md)
- [`02-scope-mvp.md`](02-scope-mvp.md)
- [`00-coherence-index.md`](00-coherence-index.md)
