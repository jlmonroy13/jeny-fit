# 12 · Roadmap & milestones

> **Estado:** v0.2 — **M1 activo** (issues detalladas; docs producto ya llenos). M2–M9 = nombres tentativos (doc 02 §7); issues binding solo tras M1.10 + `roadmap-detail`.

## 1. Objetivo y audiencia

Guía a **agentes AI** y al **revisor humano**: qué construir, en qué orden, con qué AC.

**Producto:** Jeny Fit — app web coach–cliente (entrenamiento, nutrición, valoración, pagos USD); UI español; single-coach MVP.  
**Repo:** [jlmonroy13/jeny-fit](https://github.com/jlmonroy13/jeny-fit).

**Reglas:** RM-003 (solo el milestone **activo** bloquea implementación); RM-004 (retrospectiva antes de refinar el siguiente).

## 2. Mapa de milestones

| ID | Nombre | Entrega principal | MVP | Estado |
|----|--------|-------------------|-----|--------|
| **M1** | Foundation | Docs, CI, stack cerrado, harness — sin features de negocio | — | **Activo** |
| **M2** | Auth & onboarding | Password coach + magic link + alta clientas + roles | Sí | Esqueleto (nombre tentativo) |
| **M3** | Library & training plan | Biblioteca + editor plan (bloques…series) | Sí | Esqueleto |
| **M4** | Client training day | Entreno: RIR, timer, cierre secuencial | Sí | Esqueleto |
| **M5** | Progress & feedback | Historial, Plan Completo, comparación, feedback | Sí | Esqueleto |
| **M6** | Nutrition | Editor coach + RO cliente (≤6 comidas) | Sí | Esqueleto |
| **M7** | Payments | Marcado manual USD + avisos (sin lock) | Sí | Esqueleto |
| **M8** | Assessment | Encuesta `MVP-018` + fotos/medidas; sin PDF in-app | Sí | Esqueleto |
| **M9** | Hardening | DoD MVP, pulido UX, E2E crítico | Sí | Esqueleto |

Fuente de nombres: [`02-scope-mvp.md`](02-scope-mvp.md) §7. Detalle de issues M2+ → post **M1.10**.

### 2.1 Estado de implementación (repo)

| Milestone | Docs producto | Código / CI |
|-----------|---------------|-------------|
| **M1** | ✅ `00`–`11` v1.x; este doc v0.2 | ⏳ Next 16 base; **faltan** Prettier/typecheck/CI/Vitest (M1-02/03/05) |
| **M2+** | Esqueleto nombres | — |

| Issue M1 | Contenido en repo | Siguiente |
|----------|-------------------|-----------|
| **M1-01** | ✅ Docs + AGENTS + rules + skills | Sync a GitHub Project si aún no; marcar done al cerrar PR formal |
| **M1-02** | ❌ | **Primera a codear** (tooling) |
| **M1-03** | ❌ | Tras M1-02 |
| **M1-04** | ✅ Doc 10 `TS-011`…`026` cerrados | Marcar done / PR docs si hace falta formalidad GH |
| **M1-05** | ❌ | Tras M1-02 |
| **M1-06** | Parcial (08–11 ya alineados a stack) | Tras 02/04/05 instalados: verificar pins + `00` |

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
| **RM-010** | **Branch naming** — `Mx-NN-<slug>`. Ej.: `M1-02-tooling-prettier`. |
| **RM-011** | **Lazy-build UI** — componente design system solo con primer caller en el **mismo PR**. |

## 5. M1 · Foundation (detalle)

### M1.1 Objetivo

Base técnica y de proceso: docs canónicos **llenos**, CI, stack **decidido**, harness de tests — **sin** features de negocio.

### M1.2 Definition of Done

- [x] `docs/product/00`–`11` + `AGENTS.md` usable por agents (producto/stack/tests cerrados)
- [ ] CI PR: lint → typecheck → format:check → test en verde
- [x] Decisiones `TS-*` cerradas en doc 10 (incl. `TS-026` free tier)
- [ ] Scripts tooling + Vitest harness (M1-02, M1-05)
- [ ] Retrospectiva M1.10 completada
- [ ] `roadmap-sync` de issues M1 a GitHub (si se usa Project)

### M1.3 Scope (in)

Tooling, CI (GH Actions + Postgres service para integration futura — `TEST-016`), estructura `app/`/`lib/`, docs, harness Vitest. Respeta **`TS-026`** (no quemar free tier Vercel/Neon).

### M1.4 Out of scope

Features de negocio, design system sin caller, Neon/Vercel como runners de test, producción piloto, issues detalladas M2+.

### M1.5 Issues atómicas

| ID | Título | Tipo | Est. | Depends on | Decisiones binding | Repo |
|----|--------|------|------|------------|-------------------|------|
| **M1-01** | Product docs bootstrap & AGENTS | docs | S | — | RM-005, RM-006 | ✅ contenido |
| **M1-02** | Tooling: Prettier, typecheck, engines, scripts | chore | S | M1-01 | TS-003, TS-010, TS-023, TS-024, RM-008 | ⏳ next |
| **M1-03** | CI workflow (lint/typecheck/format/test) | ci | S | M1-02 | RM-008, TS-015, TS-026, TEST-016 | ⏳ |
| **M1-04** | Stack decisions close (DB/auth/hosting) | docs | S | M1-01 | TS-011…TS-017, TS-026 | ✅ doc 10 |
| **M1-05** | Vitest harness | chore | S | M1-02 | TS-020, TEST-001, TEST-014 | ⏳ |
| **M1-06** | Docs sync 08/09/10/11 post-tooling | docs | S | M1-02, M1-04, M1-05 | RM-005, TS-OPEN-03 | ⏳ pins |

#### M1-01 · Product docs bootstrap & AGENTS

**Tipo:** docs · **Estimación:** S

### Depends on
- ninguna

### Decisiones binding
- RM-005, RM-006

### Docs canónicos
- docs/product/12-roadmap-milestones.md (M1-01)

### Acceptance criteria
- [x] `AGENTS.md` describe reglas no negociables + mapa de docs
- [x] Existen `docs/product/00`–`12` (contenido producto 01–11 cerrado)
- [x] `.cursor/rules` documentation-first + milestone-active + business-binding (+ ci/code/next)
- [x] Skills roadmap presentes con `SKILL.md`

### Out of scope
- Features de producto
- Tooling CI (M1-02+)

#### M1-02 · Tooling: Prettier, typecheck, scripts

**Tipo:** chore · **Estimación:** S

### Depends on
- M1-01

### Decisiones binding
- TS-003, TS-010, TS-023, TS-024, RM-008

### Acceptance criteria
- [ ] Scripts `typecheck`, `format`, `format:check` en `package.json`
- [ ] Prettier config + ignore
- [ ] `engines.node` ≥ 22 (`TS-024`)
- [ ] Alias `@/*` confirmado (ya en tsconfig)

### Out of scope
- Features de negocio; CI workflow file (M1-03)

#### M1-03 · CI workflow

**Tipo:** ci · **Estimación:** S

### Depends on
- M1-02

### Decisiones binding
- RM-008, TS-015, TS-026, TEST-010, TEST-016

### Acceptance criteria
- [ ] GitHub Actions en PR: lint → typecheck → format:check → test
- [ ] Sin Neon/Vercel como runner de tests (`TS-026`)
- [ ] Documentado en doc 10 § CI (si cambia algo)

### Out of scope
- Deploy producción; E2E Playwright; Postgres service (puede llegar con integration M2+)

#### M1-04 · Stack decisions close

**Tipo:** docs · **Estimación:** S

### Depends on
- M1-01

### Decisiones binding
- TS-011…TS-017, TS-025, TS-026

### Acceptance criteria
- [x] Doc 10: Neon, Drizzle, Better Auth, Resend, R2, Vercel, Zod, free-tier
- [x] Docs 08/09 refs TS-* / BE-*

### Out of scope
- Implementar DB/auth en código (M2+)

#### M1-05 · Vitest harness

**Tipo:** chore · **Estimación:** S

### Depends on
- M1-02

### Decisiones binding
- TS-020, TEST-001, TEST-006, TEST-014

### Acceptance criteria
- [ ] `pnpm test` corre ≥1 smoke test
- [ ] Doc 11 coherente (ya v1.1; ajustar paths si hace falta)

### Out of scope
- Playwright E2E; suite BR completa

#### M1-06 · Docs sync post-tooling

**Tipo:** docs · **Estimación:** S

### Depends on
- M1-02, M1-04, M1-05

### Decisiones binding
- RM-005; cierra **TS-OPEN-03** (pins en package.json / doc 10)

### Acceptance criteria
- [ ] Doc 10 refleja versiones instaladas (pin majors)
- [ ] `00-coherence-index` sin contradicciones
- [ ] Este doc §2.1 actualizado

### Out of scope
- Detallar M2 issues (post M1.10)

### M1.6 Grafo

```text
M1-01 (docs ✅)
  ├── M1-02 → M1-03
  │         → M1-05
  ├── M1-04 (stack ✅)
  └── M1-06 (espera 02, 04, 05)
```

### M1.7 Quality gates

Lint + typecheck + format + test (activar con M1-02/03/05). Ver doc 11 §5 M1.

### M1.8 Riesgos

- Quemar free tier Vercel/Neon → mitigado `TS-026` / `TEST-016`.
- `projectNumber` en `.cursor/roadmap-sync.defaults.json` debe coincidir con el GitHub Project real.
- No codear M2+ hasta M1.10 + `roadmap-detail`.

### M1.9 Docs a actualizar

Tras tooling: `10` (pins), `00`, este `12` §2.1, `milestone-active.mdc`.

### M1.10 Retrospectiva

_(Completar al cerrar M1 — luego `roadmap-detail` para M2.)_

## 6. M2+ (esqueleto)

Tras **M1.10**, skill `roadmap-detail` expande el siguiente milestone. Nombres tentativos (binding de **nombre**, no de issues):

| ID | Objetivo tentativo | DoD tentativo (alto nivel) |
|----|--------------------|----------------------------|
| **M2** | Auth + alta + roles | FLOW-001…004; BR-070…072; seed coach |
| **M3** | Biblioteca + editor plan | BR-001…004, 020…022; FE coach training routes |
| **M4** | Día cliente RIR/timer/cierre | FLOW-008, 018; BR-010…016 |
| **M5** | Historial / Plan Completo / comparación / feedback | FLOW-011…013; BR-040…041 |
| **M6** | Nutrición | FLOW-007; BR-030…032 |
| **M7** | Pagos USD manual | FLOW-014…015; BR-050…053 |
| **M8** | Valoración + encuesta | FLOW-016…017; BR-060…066; MVP-018; BE-008 |
| **M9** | Hardening / DoD MVP | Checklist doc 02 §5; E2E críticos `TEST-017` |

## 7. Convenciones de estimación

| Est. | Guía |
|------|------|
| S | ≤ ~2 h / PR ~30 min review |
| M | partir si crece |
| L | **partir** antes de codear |

## 8. Preguntas abiertas / cerradas

| ID | Tema | Estado |
|----|------|--------|
| RM-OPEN-01 | Nombres/objetivos M2+ | **Cerrada (tentativo)** → mapa §2 / §6 = doc 02 §7; issues atómicas siguen post M1.10 |
| TS-OPEN-03 | Pins npm | **Abierta** → cerrar en M1-06 al instalar |

## 9. Referencias

- [`AGENTS.md`](../../AGENTS.md)
- [`02-scope-mvp.md`](02-scope-mvp.md) §7
- [`00-coherence-index.md`](00-coherence-index.md)
- [`10-tech-stack.md`](10-tech-stack.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
