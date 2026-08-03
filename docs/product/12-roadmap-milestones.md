# 12 · Roadmap & milestones

> **Estado:** v0.5 — **M1** cerrada; **M2 Auth & onboarding** detallada (§6). Siguiente: `roadmap-sync` → Ready → code.

## 1. Objetivo y audiencia

Guía a **agentes AI** y al **revisor humano**: qué construir, en qué orden, con qué AC.

**Producto:** Jeny Fit — app web coach–cliente (entrenamiento, nutrición, valoración, pagos USD); UI español; single-coach MVP.  
**Repo:** [jlmonroy13/jeny-fit](https://github.com/jlmonroy13/jeny-fit).

**Reglas:** RM-003 (solo el milestone **activo** bloquea implementación); RM-004 (retrospectiva antes de refinar el siguiente).

## 2. Mapa de milestones

| ID     | Nombre                  | Entrega principal                                          | MVP | Estado                  |
| ------ | ----------------------- | ---------------------------------------------------------- | --- | ----------------------- |
| **M1** | Foundation              | Docs, CI, stack cerrado, harness — sin features de negocio | —   | ✅ Cerrado              |
| **M2** | Auth & onboarding       | Password coach + magic link + alta clientas + roles        | Sí  | **Activo** (detalle §6) |
| **M3** | Library & training plan | Biblioteca + editor plan (bloques…series)                  | Sí  | Esqueleto               |
| **M4** | Client training day     | Entreno: RIR, timer, cierre secuencial                     | Sí  | Esqueleto               |
| **M5** | Progress & feedback     | Historial, Plan Completo, comparación, feedback            | Sí  | Esqueleto               |
| **M6** | Nutrition               | Editor coach + RO cliente (≤6 comidas)                     | Sí  | Esqueleto               |
| **M7** | Payments                | Marcado manual USD + avisos (sin lock)                     | Sí  | Esqueleto               |
| **M8** | Assessment              | Encuesta `MVP-018` + fotos/medidas; sin PDF in-app         | Sí  | Esqueleto               |
| **M9** | Hardening               | DoD MVP, pulido UX, E2E crítico                            | Sí  | Esqueleto               |

Fuente de nombres: [`02-scope-mvp.md`](02-scope-mvp.md) §7. M2 detallada; M3+ → post **M2.10** + `roadmap-detail`.

### 2.1 Estado de implementación (repo)

| Milestone | Docs producto                   | Código / CI                                       |
| --------- | ------------------------------- | ------------------------------------------------- |
| **M1**    | ✅ `00`–`11` + pins doc 10 §2.2 | ✅ Next 16 + Prettier + CI Actions + Vitest smoke |
| **M2**    | ✅ Issues atómicas §6           | ⏳ pending sync → implement                       |
| **M3+**   | Esqueleto nombres               | —                                                 |

| Issue M1  | Contenido en repo              | Estado         |
| --------- | ------------------------------ | -------------- |
| **M1-01** | Docs + AGENTS + rules + skills | ✅ Closed (#1) |
| **M1-02** | Prettier, typecheck, engines   | ✅ Closed (#2) |
| **M1-03** | `.github/workflows/ci.yml`     | ✅ Closed (#3) |
| **M1-04** | Doc 10 stack TS-*              | ✅ Closed (#4) |
| **M1-05** | Vitest harness + smoke         | ✅ Closed (#5) |
| **M1-06** | Docs sync + TS-OPEN-03         | ✅ Closed (#6) |

## 3. Plantilla canónica de milestone

| Sección   | Contenido                         |
| --------- | --------------------------------- |
| **MX.1**  | Objetivo                          |
| **MX.2**  | Definition of Done                |
| **MX.3**  | Scope (in)                        |
| **MX.4**  | Out of scope                      |
| **MX.5**  | Issues atómicas (tabla + detalle) |
| **MX.6**  | Grafo dependencias                |
| **MX.7**  | Quality gates (`RM-008`, `11`)    |
| **MX.8**  | Riesgos                           |
| **MX.9**  | Docs a actualizar                 |
| **MX.10** | Retrospectiva                     |

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

| ID         | Decisión                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| **RM-001** | **1 issue = 1 PR** — reviewable en ~30 min; si no cabe, partir la issue.                                              |
| **RM-002** | **Milestones lineales** — no mezclar Mx y My en el mismo PR sin aprobación explícita.                                 |
| **RM-003** | **Planificación just-in-time** — solo el milestone **activo** es binding para código; futuros: tentativo hasta MX.10. |
| **RM-004** | **Retrospectiva obligatoria** — completar MX.10 antes de refinar issues del siguiente.                                |
| **RM-005** | **`docs/product/` es contrato** — no implementar producto sin doc + issue con acceptance criteria.                    |
| **RM-006** | **Issue body = copia del doc** — divergencia → actualizar doc primero.                                                |
| **RM-007** | **Dependencias bloqueantes** — no iniciar issue hasta `Depends on` merged.                                            |
| **RM-008** | **Quality gates progresivos** — ver [`11-testing-strategy.md`](11-testing-strategy.md).                               |
| **RM-009** | **Decision IDs binding** — TS-/FE-/BE-/BR-/TEST-/RM- en issue son obligatorios.                                       |
| **RM-010** | **Branch naming** — `Mx-NN-<slug>`. Ej.: `M1-02-tooling-prettier`.                                                    |
| **RM-011** | **Lazy-build UI** — componente design system solo con primer caller en el **mismo PR**.                               |

## 5. M1 · Foundation

### M1.1 Objetivo

Base técnica y de proceso: docs canónicos **llenos**, CI, stack **decidido**, harness de tests — **sin** features de negocio.

### M1.2 Definition of Done

- [x] `docs/product/00`–`11` + `AGENTS.md` usable por agents (producto/stack/tests cerrados)
- [x] CI PR: lint → typecheck → format:check → test en verde (Actions + Vitest)
- [x] Decisiones `TS-*` cerradas en doc 10 (incl. `TS-026` free tier; pins §2.2)
- [x] Scripts tooling + Vitest harness (M1-02, M1-05)
- [x] Retrospectiva M1.10 completada
- [x] `roadmap-sync` de issues M1 a GitHub (Project #13)

### M1.3 Scope (in)

Tooling, CI (GH Actions + Postgres service para integration futura — `TEST-016`), estructura `app/`/`lib/`, docs, harness Vitest. Respeta **`TS-026`** (no quemar free tier Vercel/Neon).

### M1.4 Out of scope

Features de negocio, design system sin caller, Neon/Vercel como runners de test, producción piloto, issues detalladas M2+.

### M1.5 Issues atómicas

| ID        | Título                                         | Tipo  | Est. | Depends on          | Decisiones binding                     | Repo         |
| --------- | ---------------------------------------------- | ----- | ---- | ------------------- | -------------------------------------- | ------------ |
| **M1-01** | Product docs bootstrap & AGENTS                | docs  | S    | —                   | RM-005, RM-006                         | ✅ contenido |
| **M1-02** | Tooling: Prettier, typecheck, engines, scripts | chore | S    | M1-01               | TS-003, TS-010, TS-023, TS-024, RM-008 | ✅           |
| **M1-03** | CI workflow (lint/typecheck/format/test)       | ci    | S    | M1-02               | RM-008, TS-015, TS-026, TEST-016       | ✅           |
| **M1-04** | Stack decisions close (DB/auth/hosting)        | docs  | S    | M1-01               | TS-011…TS-017, TS-026                  | ✅           |
| **M1-05** | Vitest harness                                 | chore | S    | M1-02               | TS-020, TEST-001, TEST-014             | ✅           |
| **M1-06** | Docs sync 08/09/10/11 post-tooling             | docs  | S    | M1-02, M1-04, M1-05 | RM-005, TS-OPEN-03                     | ✅ (#6)      |

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

- [x] Doc 10 refleja versiones instaladas (pin majors) — §2.2
- [x] `00-coherence-index` sin contradicciones
- [x] Este doc §2.1 actualizado

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
- No codear M2+ hasta M1.10 + `roadmap-detail` — **M1.10 hecho**; falta detallar M2.

### M1.9 Docs a actualizar

Tras tooling: `10` (pins), `00`, este `12` §2.1, `milestone-active.mdc` — **hecho** en M1-06 (#6 / PR #10).

### M1.10 Retrospectiva

Cerrada **2026-08-03** tras merge de M1-01…M1-06 (#1–#6; PRs #7–#10 + cierres docs).

#### Qué funcionó

- **Docs-first real:** 01–11 cerrados antes de tooling; agents no inventaron stack/producto.
- **Issues chicas + 1 PR:** M1-02…06 revisables en ~30 min; grafo `Depends on` + `roadmap-project-ready` desbloqueó Ready sin thrash.
- **Skills loop:** `issue-plan` → code → `pr-review` (Prettier + checklist humana) → `pr-publish` (`Closes #N`) — predecible.
- **Free tier (`TS-026`):** CI en GitHub Actions; sin Neon/Vercel como runner de tests.
- **Pins pragmáticos:** majors en doc 10 §2.2 (no pin patch-by-patch en `package.json`).

#### Fricciones

- **Auth GH/SSH** (`jlmonroy13` + `ssh-add`) cada sesión — coste operativo, no de producto.
- **Issues ya hechas en `main`:** M1-01/#1 y M1-04/#4 se cerraron sin PR formal (contenido previo); rompe un poco el ritual “1 issue = 1 PR” pero no bloqueó.
- **Placeholder `pnpm test` en M1-03** hasta Vitest (M1-05) — CI “verde” sin harness real un rato.
- **Título vs AC:** M1-06 decía sync 08/09/11; el AC real era 10 / `00` / §2.1 — título confunde.
- **Prettier + `.mdc`:** no hay parser; hay que excluir o no formatear rules Cursor.
- **Checkboxes GH desactualizados:** body sync (RM-006) no refleja `[x]` del doc tras merge.

#### Lecciones → M2 (binding para `roadmap-detail`)

1. **Última issue del milestone = retro (+ baseline si aplica)** — no dejar MX.10 solo como sección huérfana.
2. **Título de issue = AC** — no prometer sync de docs que el AC no exige.
3. **No placeholders que maquillen CI** — si el gate aún no existe, documentar skip explícito o depender de la issue que lo introduce.
4. **Auth/DB en M2 respetando `TS-026`:** Better Auth + Neon + Resend; Postgres service en CI solo cuando existan integration tests (`TEST-016`); sin Neon branch por PR.
5. **Seed coach (`MVP-017`) temprano** en el grafo — desbloquea login real y smoke auth.
6. **Mantener skills:** plan → review (format gate) → publish; agent **no** corre suites de test (checklist humana).
7. **Actualizar `milestone-active.mdc` + §2.1 en el mismo PR** que cierra el milestone (o en la issue de sync/retro).
8. **AC con paths concretos** (`app/...`, `lib/auth/...`) — facilita review y checklist manual.

#### Decisión de cierre M1

M1 DoD completo. **Siguiente:** `roadmap-sync` **M2** → Ready → code.

## 6. M2 · Auth & onboarding

### M2.1 Objetivo

Auth dual (coach password + client magic link), seed de Jeny, alta de clientas y aislamiento `BR-070`…`072` — **sin** features de plan/biblioteca/pagos.

### M2.2 Definition of Done

- [ ] Schema `User` + `ClientProfile` migrado (`DOMAIN-001`/`002`)
- [ ] Better Auth + Resend wired (`TS-013`, `TS-014`, `TS-025`)
- [ ] Seed coach (`MVP-017` / `BE-009`)
- [ ] FLOW-001…004 implementados (UI es-CO)
- [ ] Integration `BR-070`/`071`/`072` en CI con Postgres service (`TEST-016`)
- [ ] Smoke E2E coach login (Playwright harness)
- [ ] Retrospectiva M2.10 completada
- [ ] `roadmap-sync` de issues M2 a GitHub

### M2.3 Scope (in)

Drizzle/Neon, Better Auth dual, Resend auth emails, middleware por rol, UI login/alta, dashboard stub lista clientas, `/app` stub, CI Postgres + tests auth, Playwright smoke, rules auth.

### M2.4 Out of scope

Biblioteca, editor plan, RIR/timer, nutrición, pagos, valoración/R2, multi-tenant/`Organization`, i18n framework, E2E suite completa (`TEST-017` sigue M4+).

### M2.5 Issues atómicas

| ID        | Título                                                    | Tipo  | Est. | Depends on          | Decisiones binding                                 | Repo |
| --------- | --------------------------------------------------------- | ----- | ---- | ------------------- | -------------------------------------------------- | ---- |
| **M2-01** | Wire Drizzle ORM and Neon `DATABASE_URL`                  | chore | S    | —                   | TS-011, TS-012, TS-026                             | ⏳   |
| **M2-02** | Migrate User and ClientProfile schema                     | chore | S    | M2-01               | DOMAIN-001, DOMAIN-002, BE-007, BE-002             | ⏳   |
| **M2-03** | Configure Better Auth dual (password + magic link)        | chore | M    | M2-02               | TS-013, TS-025, BE-003, BR-071                     | ⏳   |
| **M2-04** | Wire Resend for auth transactional email                  | chore | S    | M2-03               | TS-014, BE-013                                     | ⏳   |
| **M2-05** | Add coach seed script (`auth:seed`)                       | chore | S    | M2-02, M2-03        | MVP-017, BE-009                                    | ⏳   |
| **M2-06** | Add session AuthZ helpers (coach / client own profile)    | chore | S    | M2-03               | BE-004, BE-002, BR-072, TS-025                     | ⏳   |
| **M2-07** | Protect `/coach` and `/app` routes in middleware          | chore | S    | M2-06               | FE-011, FE-013                                     | ⏳   |
| **M2-08** | Build Button and Input primitives (RM-011)                | feat  | S    | —                   | RM-011                                             | ⏳   |
| **M2-09** | Build coach login pages (FLOW-001)                        | feat  | S    | M2-03, M2-07, M2-08 | FLOW-001, F-001, FE-013                            | ⏳   |
| **M2-10** | Build coach password reset (FLOW-002)                     | feat  | S    | M2-04, M2-08, M2-09 | FLOW-002, MVP-017                                  | ⏳   |
| **M2-11** | Build client magic-link auth pages (FLOW-003)             | feat  | M    | M2-04, M2-07, M2-08 | FLOW-003, F-002, BR-070, FE-013                    | ⏳   |
| **M2-12** | Build createClient + alta UI and `/coach` stub (FLOW-004) | feat  | M    | M2-05, M2-06, M2-08 | FLOW-004, F-003, F-004, BR-003, BE-006             | ⏳   |
| **M2-13** | Build minimal `/app` post-login shell                     | feat  | S    | M2-07, M2-11        | FE-013, F-014 (stub)                               | ⏳   |
| **M2-14** | Add CI Postgres and integration tests BR-070/071/072      | test  | M    | M2-05, M2-12        | TEST-004, TEST-016, BR-070, BR-071, BR-072, TS-026 | ⏳   |
| **M2-15** | Add Playwright harness and coach login smoke              | test  | S    | M2-09, M2-14        | TEST-002, FLOW-001, TEST-017                       | ⏳   |
| **M2-16** | Add `.cursor/rules` auth + client-isolation               | docs  | S    | M2-06               | BE-003, BE-004, BR-072                             | ⏳   |
| **M2-17** | Write M2.10 retrospective and close milestone docs        | docs  | S    | M2-15, M2-16        | RM-004, RM-005                                     | ⏳   |

#### M2-01 · Wire Drizzle ORM and Neon `DATABASE_URL`

**Tipo:** chore · **Estimación:** S

### Depends on

- ninguna

### Decisiones binding

- TS-011, TS-012, TS-026

### Docs canónicos

- docs/product/10-tech-stack.md (§2, scripts `db:*`)
- docs/product/09-backend-architecture.md (§5)

### Acceptance criteria

- [ ] Dependencias `drizzle-orm`, `drizzle-kit`, driver Postgres instaladas; pins documentados en doc 10 §2.2 si cambia majors
- [ ] `DATABASE_URL` en `.env.example`; client Drizzle en `lib/db/` (o path acordado) con `import "server-only"`
- [ ] Scripts `db:generate` / `db:migrate` / `db:studio` en `package.json`
- [ ] Sin Neon branch-por-PR ni uso de compute Neon en CI (`TS-026`)

### Out of scope

- Tablas de dominio; Better Auth; Resend

#### M2-02 · Migrate User and ClientProfile schema

**Tipo:** chore · **Estimación:** S

### Depends on

- M2-01

### Decisiones binding

- DOMAIN-001, DOMAIN-002, BE-007, BE-002, MVP-016

### Docs canónicos

- docs/product/05-domain-model.md (`User`, `ClientProfile`)
- docs/product/09-backend-architecture.md (§2 `BE-002`)

### Acceptance criteria

- [ ] Migración Drizzle crea `User` (`email` UK, `role` `coach`|`client`, `passwordHash` nullable, `name` nullable) y `ClientProfile` 1:1 (`billingAnchorDay`, `needsAdaptationBlock`, campos opcionales doc 05)
- [ ] **Sin** tabla `Organization` / `tenantId` (`BE-002`)
- [ ] `pnpm db:migrate` aplica en local contra Postgres

### Out of scope

- Entidades plan/biblioteca/pagos; seed datos

#### M2-03 · Configure Better Auth dual (password + magic link)

**Tipo:** chore · **Estimación:** M

### Depends on

- M2-02

### Decisiones binding

- TS-013, TS-025, BE-003, BR-071

### Docs canónicos

- docs/product/10-tech-stack.md (`TS-013`, `TS-025`)
- docs/product/09-backend-architecture.md (§4)
- docs/product/08-frontend-architecture.md (`FE-013` callback)

### Acceptance criteria

- [ ] Better Auth instalado y montado (Route Handler(s) bajo path documentado; callback `/auth/callback` o el que fije el provider, alineado a `FE-013`)
- [ ] Coach: email + password; client: magic link **sin** password usable (`BR-071`)
- [ ] Session expone al menos `userId`, `role`, y `clientProfileId` si `role=client` (`TS-025`)
- [ ] Helpers de lectura de sesión en `lib/auth/` con `import "server-only"`
- [ ] `.env.example` incluye `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` según doc 10

### Out of scope

- UI login; Resend (M2-04); seed (M2-05)

#### M2-04 · Wire Resend for auth transactional email

**Tipo:** chore · **Estimación:** S

### Depends on

- M2-03

### Decisiones binding

- TS-014, BE-013

### Docs canónicos

- docs/product/10-tech-stack.md (`TS-014`, env)
- docs/product/09-backend-architecture.md (`BE-013`)

### Acceptance criteria

- [ ] Resend wired como transport de Better Auth (o adapter documentado) para magic link + reset password
- [ ] Copy de emails en español; `EMAIL_FROM` / `RESEND_API_KEY` en `.env.example`
- [ ] En test/dev, modo mock o skip documentado (no fallar CI por API real)

### Out of scope

- Emails de producto no-auth; UI

#### M2-05 · Add coach seed script (`auth:seed`)

**Tipo:** chore · **Estimación:** S

### Depends on

- M2-02, M2-03

### Decisiones binding

- MVP-017, BE-009

### Docs canónicos

- docs/product/09-backend-architecture.md (§8)
- docs/product/02-scope-mvp.md (`MVP-017`)

### Acceptance criteria

- [ ] Script `pnpm auth:seed` (o `db:seed`) crea **un** `User` role=`coach` desde `COACH_SEED_EMAIL` / `COACH_SEED_PASSWORD`
- [ ] Idempotente (re-run no duplica coach) o documenta fallo claro si ya existe
- [ ] No crea clients; no auto-registro público

### Out of scope

- Seed de clientas de demo (fixtures de test = M2-14)

#### M2-06 · Add session AuthZ helpers (coach / client own profile)

**Tipo:** chore · **Estimación:** S

### Depends on

- M2-03

### Decisiones binding

- BE-004, BE-002, BR-072, TS-025

### Docs canónicos

- docs/product/09-backend-architecture.md (§3–4)
- docs/product/06-business-rules.md (`BR-072`)

### Acceptance criteria

- [ ] Helpers `requireSession`, `requireCoach`, `requireClient` (nombres equivalentes OK) en `lib/auth/` con `import "server-only"`
- [ ] Client helper garantiza acceso solo a **su** `clientProfileId` (`BR-072`)
- [ ] Coach helper permite portafolio global single-coach (**sin** `organizationId`)
- [ ] Unit o integration mínima: client A no lee profile B

### Out of scope

- Middleware de rutas (M2-07); UI

#### M2-07 · Protect `/coach` and `/app` routes in middleware

**Tipo:** chore · **Estimación:** S

### Depends on

- M2-06

### Decisiones binding

- FE-011, FE-013

### Docs canónicos

- docs/product/08-frontend-architecture.md (§4, `FE-011`)

### Acceptance criteria

- [ ] Middleware redirige anónimo desde `/coach/*` → `/login/coach` y desde `/app/*` → `/login/client`
- [ ] Rol incorrecto no entra al prefijo del otro rol
- [ ] Rutas públicas auth (`/login/*`, `/auth/callback`) accesibles sin sesión
- [ ] Checks en actions siguen siendo obligatorios (`BE-004`) — middleware no es la única capa

### Out of scope

- Páginas de login (M2-09…11)

#### M2-08 · Build Button and Input primitives (RM-011)

**Tipo:** feat · **Estimación:** S

### Depends on

- ninguna

### Decisiones binding

- RM-011

### Docs canónicos

- docs/product/07-design-system.md (§4 Button, Input)
- docs/product/07-design-system.md (tokens §3)

### Acceptance criteria

- [ ] Componentes en `components/ui/` (o path FE) con variantes mínimas usadas por login/alta (primary/secondary; text input)
- [ ] Copy/a11y básicos: labels asociables, focus visible con tokens
- [ ] Primer caller puede ser story/page stub **o** quedar listos para M2-09 (mismo PR si se combina — preferible issues separadas)

### Out of scope

- IconButton, Dialog, tabs, design system completo

#### M2-09 · Build coach login pages (FLOW-001)

**Tipo:** feat · **Estimación:** S

### Depends on

- M2-03, M2-07, M2-08

### Decisiones binding

- FLOW-001, F-001, FE-013

### Docs canónicos

- docs/product/04-user-flows.md (`FLOW-001`)
- docs/product/07-prototype-screens.md (J-01)
- docs/product/08-frontend-architecture.md (`/login/coach`)

### Acceptance criteria

- [ ] Ruta `app/.../login/coach/page.tsx` (path `FE-013`): email + password, copy es-CO
- [ ] Éxito → redirect `/coach`; credenciales inválidas → mensaje (sin lockout complejo)
- [ ] Logout accesible desde stub coach (link/botón) destruye sesión

### Out of scope

- Reset password (M2-10); dashboard lista (M2-12)

#### M2-10 · Build coach password reset (FLOW-002)

**Tipo:** feat · **Estimación:** S

### Depends on

- M2-04, M2-08, M2-09

### Decisiones binding

- FLOW-002, MVP-017

### Docs canónicos

- docs/product/04-user-flows.md (`FLOW-002`)

### Acceptance criteria

- [ ] Flujo “olvidé contraseña”: request email → set nueva password vía token Better Auth / Resend
- [ ] Email desconocido → mensaje genérico (no enumerar cuentas de forma útil)
- [ ] Tras reset, FLOW-001 funciona con la nueva password

### Out of scope

- Cambio de password autenticado en perfil (post-MVP OK diferir)

#### M2-11 · Build client magic-link auth pages (FLOW-003)

**Tipo:** feat · **Estimación:** M

### Depends on

- M2-04, M2-07, M2-08

### Decisiones binding

- FLOW-003, F-002, BR-070, FE-013

### Docs canónicos

- docs/product/04-user-flows.md (`FLOW-003`)
- docs/product/07-prototype-screens.md (C-00a/b/c)
- docs/product/06-business-rules.md (`BR-070`)

### Acceptance criteria

- [ ] Rutas `/login/client`, `/login/client/sent`, `/login/client/expired` (`FE-013`); solo email, **sin** password ni registro
- [ ] Request magic link para email desconocido **no** crea `User` (`BR-070`); UX genérica
- [ ] Consume link → sesión client → redirect `/app`
- [ ] Link expirado → pantalla expired + CTA reenviar

### Out of scope

- Contenido de Inicio cliente (solo shell en M2-13)

#### M2-12 · Build createClient + alta UI and `/coach` stub (FLOW-004)

**Tipo:** feat · **Estimación:** M

### Depends on

- M2-05, M2-06, M2-08

### Decisiones binding

- FLOW-004, F-003, F-004, BR-003, BE-006, DOMAIN-002

### Docs canónicos

- docs/product/04-user-flows.md (`FLOW-004`)
- docs/product/07-prototype-screens.md (J-02, J-02b)
- docs/product/08-frontend-architecture.md (`/coach`, `/coach/clientes/nuevo`)

### Acceptance criteria

- [ ] Server Action `createClient` (Zod): email UK, `needsAdaptationBlock` opcional (`BR-003`), `billingAnchorDay` default = día del alta; `import "server-only"`; `requireCoach`
- [ ] Crea `User(role=client)` + `ClientProfile` en transacción; email duplicado → error tipado
- [ ] UI `/coach/clientes/nuevo` (es-CO) + **`/coach` lista mínima** (email/name + CTA agregar clienta)
- [ ] Clienta creada puede autenticarse vía FLOW-003

### Out of scope

- Tabs perfil clienta, plan, pagos; panel query `?panel=` opcional diferible

#### M2-13 · Build minimal `/app` post-login shell

**Tipo:** feat · **Estimación:** S

### Depends on

- M2-07, M2-11

### Decisiones binding

- FE-013, F-014

### Docs canónicos

- docs/product/08-frontend-architecture.md (`/app`)

### Acceptance criteria

- [ ] Ruta `/app` (o `/app/` home) accesible solo con sesión client
- [ ] Stub es-CO: saludo / placeholder “Inicio” + logout (sin bottom nav completo ni día de entreno)
- [ ] Redirect post-login client aterriza aquí

### Out of scope

- Bottom nav 5 tabs; RIR; banners pago

#### M2-14 · Add CI Postgres and integration tests BR-070/071/072

**Tipo:** test · **Estimación:** M

### Depends on

- M2-05, M2-12

### Decisiones binding

- TEST-004, TEST-016, BR-070, BR-071, BR-072, TS-026

### Docs canónicos

- docs/product/11-testing-strategy.md (§5 M2, §6 BR-070…072, `TEST-016`)
- docs/product/06-business-rules.md

### Acceptance criteria

- [ ] Job CI usa **Postgres service** (GH Actions); **prohibido** Neon por PR (`TEST-016` / `TS-026`)
- [ ] Fixtures: coach seed + ≥1 client (`TEST-007`)
- [ ] Tests integration citan IDs: `BR-070` (no auto-registro), `BR-071` (client sin password login), `BR-072` (isolation profile)
- [ ] `pnpm test` en CI ejecuta estos tests en verde

### Out of scope

- E2E Playwright (M2-15); coverage % gates

#### M2-15 · Add Playwright harness and coach login smoke

**Tipo:** test · **Estimación:** S

### Depends on

- M2-09, M2-14

### Decisiones binding

- TEST-002, FLOW-001, TEST-017

### Docs canónicos

- docs/product/11-testing-strategy.md (§5 M2, §7 FLOW-001, `TEST-017`)

### Acceptance criteria

- [ ] Playwright instalado + config mínima; script `test:e2e` (o equivalente)
- [ ] Smoke: seed coach → login password → llega a `/coach` (`FLOW-001`)
- [ ] Job E2E **no** despliega a Vercel; puede ser job CI separado o documentado nightly si excede presupuesto free (`TEST-017` / `TS-026`)
- [ ] Magic link E2E **no** depende de inbox real en CI (`TEST-013`) — diferir o hook de test

### Out of scope

- Suite E2E completa FLOW-003/004 en todo PR (manual OK); M4+ critical path

#### M2-16 · Add `.cursor/rules` auth + client-isolation

**Tipo:** docs · **Estimación:** S

### Depends on

- M2-06

### Decisiones binding

- BE-003, BE-004, BR-072, MVP-016

### Docs canónicos

- docs/product/09-backend-architecture.md
- docs/product/03-user-roles.md (§6)

### Acceptance criteria

- [ ] `.cursor/rules/auth.mdc` (o equivalente): dual auth, session `TS-025`, paths `FE-013`, seed `MVP-017`
- [ ] Rule de aislamiento cliente (`BR-072` / single-coach `BE-002`) — **no** inventar multi-org
- [ ] Referenciadas desde `AGENTS.md` o tabla de rules si aplica

### Out of scope

- Rules de plan/calc; cambiar producto

#### M2-17 · Write M2.10 retrospective and close milestone docs

**Tipo:** docs · **Estimación:** S

### Depends on

- M2-15, M2-16

### Decisiones binding

- RM-004, RM-005

### Docs canónicos

- docs/product/12-roadmap-milestones.md (esta sección)
- `.cursor/rules/milestone-active.mdc`

### Acceptance criteria

- [ ] §M2.10 llena (qué funcionó / fricciones / lecciones → M3)
- [ ] DoD M2.2 checkboxes actualizados; §2.1 repo status
- [ ] `milestone-active.mdc` apunta a M3 post-retro + `roadmap-detail`

### Out of scope

- Detallar issues M3 (post M2.10)

### M2.6 Grafo

Dependencias inmediatas (`RM-007`). Algunas aristas cross-fase no se dibujan; fuente canónica = cada issue.

```text
Fase 0:  M2-01                M2-08 (paralelo)
           │
Fase 1:  M2-02
           │
Fase 2:  M2-03
         ┌─┼──────────────┐
Fase 3:  M2-04  M2-05  M2-06
              │         │
Fase 4:       │       M2-07     (+ M2-16 tras M2-06)
              │         │
Fase 5:  M2-09 ←────────┤← M2-08
         M2-11 ←────────┤
         M2-12 ← M2-05, M2-06, M2-08
           │
Fase 6:  M2-10 (tras 04+09)   M2-13 (tras 07+11)
           │
Fase 7:  M2-14 (tras 05+12)
           │
Fase 8:  M2-15
           │
Fase 9:  M2-17 (también espera M2-16)
```

| Fase | Issues paralelas    | #   | Bottleneck / nota                       |
| ---- | ------------------- | --- | --------------------------------------- |
| 0    | M2-01, M2-08        | 2   | Arranque paralelo infra + UI primitives |
| 1–2  | M2-02 → M2-03       | 2   | Camino crítico DB → auth                |
| 3    | M2-04, M2-05, M2-06 | 3   | Seed temprano (lección M1.10)           |
| 5    | M2-09, M2-11, M2-12 | 3   | UI auth + alta                          |
| 7–9  | M2-14 → 15 → 17     | 3   | Quality gate + cierre                   |

**Camino crítico:** M2-01 → 02 → 03 → 06 → 07 → 12 → 14 → 15 → 17 (~9 hops).  
**Operación:** Fase 0–3 repartible; no codear UI auth antes de M2-03/07.

### M2.7 Primitivos UI (RM-011)

| Primitivo | Issue   | Variantes en M2        | Variantes futuras      |
| --------- | ------- | ---------------------- | ---------------------- |
| `Button`  | M2-08   | primary, secondary     | ghost / IconButton M3+ |
| `Input`   | M2-08   | text, email, password  | —                      |
| Checkbox  | M2-12\* | `needsAdaptationBlock` | o input nativo OK      |

\*Si el checkbox nativo basta para el alta, no forzar primitivo extra.

### M2.8 Quality gates

| Gate                             | Estado   | Implementado en | Notas                     |
| -------------------------------- | -------- | --------------- | ------------------------- |
| lint → typecheck → format → test | ya (M1)  | M1-03           | Se mantiene               |
| Integration BR-070/071/072       | required | M2-14           | Postgres service, no Neon |
| Playwright smoke FLOW-001        | required | M2-15           | Job liviano / sin Vercel  |
| Rules auth + isolation           | required | M2-16           | Agents                    |

### M2.9 Docs a actualizar

Durante M2: doc 10 pins si hay majors nuevos; `.env.example`; al cierre M2-17: este doc §2.1 + `milestone-active`.

### M2.10 Retrospectiva

_(Completar en M2-17 — luego `roadmap-detail` para M3.)_

## 7. M3+ (esqueleto)

Tras **M2.10**, skill `roadmap-detail` expande el siguiente milestone. Nombres tentativos (binding de **nombre**, no de issues):

| ID     | Objetivo tentativo                                 | DoD tentativo (alto nivel)                    |
| ------ | -------------------------------------------------- | --------------------------------------------- |
| **M3** | Biblioteca + editor plan                           | BR-001…004, 020…022; FE coach training routes |
| **M4** | Día cliente RIR/timer/cierre                       | FLOW-008, 018; BR-010…016                     |
| **M5** | Historial / Plan Completo / comparación / feedback | FLOW-011…013; BR-040…041                      |
| **M6** | Nutrición                                          | FLOW-007; BR-030…032                          |
| **M7** | Pagos USD manual                                   | FLOW-014…015; BR-050…053                      |
| **M8** | Valoración + encuesta                              | FLOW-016…017; BR-060…066; MVP-018; BE-008     |
| **M9** | Hardening / DoD MVP                                | Checklist doc 02 §5; E2E críticos `TEST-017`  |

## 8. Convenciones de estimación

| Est. | Guía                       |
| ---- | -------------------------- |
| S    | ≤ ~2 h / PR ~30 min review |
| M    | partir si crece            |
| L    | **partir** antes de codear |

## 9. Preguntas abiertas / cerradas

| ID         | Tema                  | Estado                                                                 |
| ---------- | --------------------- | ---------------------------------------------------------------------- |
| RM-OPEN-01 | Nombres/objetivos M2+ | **Cerrada (tentativo)** → mapa §2 / §7 = doc 02 §7; M2 detallada en §6 |
| TS-OPEN-03 | Pins npm              | **Cerrada** → doc 10 §2.2 (M1-06)                                      |

## 10. Referencias

- [`AGENTS.md`](../../AGENTS.md)
- [`02-scope-mvp.md`](02-scope-mvp.md) §7
- [`00-coherence-index.md`](00-coherence-index.md)
- [`03-user-roles.md`](03-user-roles.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`05-domain-model.md`](05-domain-model.md)
- [`06-business-rules.md`](06-business-rules.md)
- [`09-backend-architecture.md`](09-backend-architecture.md)
- [`10-tech-stack.md`](10-tech-stack.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
