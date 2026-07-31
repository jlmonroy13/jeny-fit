# 11 · Testing strategy

> **Estado:** v1.0 — `TEST-001`…`015` cerradas. Matriz BR/FLOW alineada a docs 04/06 y milestones M2–M8.

## 1. Objetivo y audiencia

Pirámide de tests, quality gates (`RM-008`) y **qué automatizar** vs manual. Binding para agents e issues: cada `BR-*` con literal Given/When/Then en [`06-business-rules.md`](06-business-rules.md) es candidato a test; no inventar asserts fuera de docs.

## 2. Herramientas

| Capa | Herramienta | Ref |
|------|-------------|-----|
| Unit / domain | **Vitest** | TS-020 |
| Integration (DB/actions) | Vitest + DB de test (Neon branch / container) | TS-011, TS-012 |
| E2E | **Playwright** | TS-021 |
| Lint / types / format | ESLint, `tsc`, Prettier | TS-010, TS-022, RM-008 |

**Prohibido en MVP:** Jest, Cypress, umbrales de % coverage como gate.

## 3. Decisiones (`TEST-NNN`)

| ID | Decisión |
|----|----------|
| **TEST-001** | Vitest para unit e integration liviana. |
| **TEST-002** | Playwright para E2E (milestone ≥ M2 cuando haya UI auth; harness opcional antes). |
| **TEST-003** | Preferir **unit** sobre `lib/domain/*` (funciones puras `BE-005`) antes que E2E para `BR-*` de cálculo. |
| **TEST-004** | AuthZ / ownership (`BR-014`, `020`, `031`, `040`, `053`, `070`…`072`) → **integration** (action + session fake) o E2E mínimo; no solo unit de “if role”. |
| **TEST-005** | E2E solo **flujos críticos** (§7); no un E2E por pantalla del prototipo. |
| **TEST-006** | Nombre de test cita ID: `describe('BR-011')` / `test('FLOW-008 closes day…')`. |
| **TEST-007** | Fixtures seed: coach + ≥1 client + plan mínimo; datos en español de negocio OK, ids/keys en inglés. |
| **TEST-008** | Timer, copy visual, layout responsive → **manual** (checklist issue); no automatizar vibra/sonido. |
| **TEST-009** | `BR-080` / `BR-081` (ausencia de feature) → smoke unit/integration “no endpoint / reject”; no E2E de “no existe botón” salvo regresión. |
| **TEST-010** | CI PR ejecuta **unit + integration** (`pnpm test`); E2E en CI cuando exista job dedicado (puede ser nightly o gate M9). |
| **TEST-011** | Reloj/fechas en pagos y “día actual”: inyectar `now` / clock en domain (testeable sin flaky). |
| **TEST-012** | Upload R2 en tests: mock signed URL; no subir bytes reales a prod en CI. |
| **TEST-013** | Magic link en E2E: usar API/test hook o inbox de prueba — no depender de email real en CI. |
| **TEST-014** | **Lean:** no tests por cobertura %; gatillos = authZ, dinero/pago, avance RIR, snapshot, encuesta keys, AC del issue. |
| **TEST-015** | Issue sin AC testeable → no mergear feature; añadir AC o BR antes (docs-first). |

## 4. Pirámide

```text
        /\
       /E2E\          Pocos: auth + 1 journey entrenamiento + 1 pago aviso
      /------\
     / Integr.\       Server Actions + DB + session (authZ, closeDay, survey)
    /----------\
   /   Unit     \     Dominio puro: paymentStatus, currentDay, block weeks, MVP-018 keys
  /--------------\
```

| Capa | Qué vive aquí | Ejemplo |
|------|---------------|---------|
| Unit | Cálculos / invariantes sin I/O | `paymentStatus`, materializar 4 semanas, `needsMedicalClearanceAdvice` |
| Integration | Action + ORM + authZ | Client no muta `load`; closeDay rechaza sin RIR; magic link no crea User |
| E2E | Happy path UI + 1–2 negativos visibles | Coach login → alta; client RIR → cerrar día; overdue ve aviso y entra Entreno |
| Manual | UX, a11y spot, timer, design tokens | Checklist en PR (`roadmap-pr-review`) |

## 5. Quality gates por milestone (`RM-008`)

| Milestone | Gate CI | Tests mínimos esperados |
|-----------|---------|-------------------------|
| **M1** | lint → typecheck → format:check → test | Harness Vitest verde (smoke); doc 11 |
| **M2** | idem | Integration: `BR-070`, `BR-071`, `BR-072` (alta + isolation); E2E smoke login coach (si harness listo) |
| **M3** | idem | Unit/integration: `BR-001`, `002`, `020`…`022` |
| **M4** | idem | Unit: `BR-010`…`013`, `016`; integration: `BR-011`, `014`; E2E: FLOW-008 happy path |
| **M5** | idem | Integration: `BR-040`, `041` |
| **M6** | idem | Integration: `BR-030`…`032` |
| **M7** | idem | Unit: `BR-050`, `051`; integration: `BR-052`, `053` |
| **M8** | idem | Integration: `BR-060`…`066`; mock upload `TEST-012` |
| **M9** | + E2E suite crítica en CI (si no antes) | Regresión §7 |

Agents: **no** correr suite completa salvo pedido; `roadmap-pr-review` = checklist manual, no `pnpm test` obligatorio en skill salvo CI.

## 6. Matriz `BR-*` → automatización

| BR | Capa preferida | Milestone | Notas |
|----|----------------|-----------|-------|
| BR-001 | unit / integration | M3 | Transacción crear bloque |
| BR-002 | unit / integration | M3 | week 4 deload |
| BR-003 | integration | M2/M3 | flag adaptación al alta |
| BR-004 | unit (fixture) | M3 | dos clientes ≠ días |
| BR-010 | unit | M4 | `currentDay` + clock |
| BR-011 | unit + integration | M4 | closeDay |
| BR-012 | unit | M4 | |
| BR-013 | integration | M4 | authZ client futuro |
| BR-014 | integration | M4 | |
| BR-015 | integration | M3/M4 | coach OK |
| BR-016 | unit + E2E smoke | M4 | waiting next block |
| BR-020 | integration | M3 | |
| BR-021 | integration | M3 | snapshot inmutable |
| BR-022 | integration | M3 | |
| BR-030 | unit / integration | M6 | |
| BR-031 | integration | M6 | |
| BR-032 | integration | M6 | |
| BR-040 | integration | M5 | |
| BR-041 | integration | M5 | |
| BR-050 | unit | M7 | clock |
| BR-051 | unit | M7 | |
| BR-052 | integration (+ E2E) | M7 | overdue ≠ lock |
| BR-053 | integration | M7 | |
| BR-060 | integration | M8 | |
| BR-061 | integration | M8 | |
| BR-062 | integration | M8 | |
| BR-063 | unit / integration | M8 | 12 metrics |
| BR-064 | unit (compile/type) o smoke | M8 | no DiagnosticReport |
| BR-065 | unit | M8 | flag aviso |
| BR-066 | unit / integration | M8 | catalog keys |
| BR-070 | integration | M2 | |
| BR-071 | integration | M2 | |
| BR-072 | integration | M2 | |
| BR-080 | smoke | M4 | reject video |
| BR-081 | smoke | M7 | no payment gateway |

## 7. Matriz `FLOW-*` → E2E

Solo los marcados **Sí** son binding para suite crítica. El resto: manual o cubierto por BR integration.

| FLOW | E2E automatizado | Milestone | Alcance mínimo |
|------|------------------|-----------|----------------|
| FLOW-001 | Sí | M2 | Login coach password → `/coach` |
| FLOW-002 | Manual / smoke | M2 | Reset email (mock) |
| FLOW-003 | Sí (hook test) | M2 | Magic link cliente existente; email desconocido no crea user |
| FLOW-004 | Sí | M2 | Coach alta clienta |
| FLOW-005…007 | No (BR) | M3/M6 | |
| FLOW-008 | Sí | M4 | RIR completo → cerrar día → siguiente pendiente |
| FLOW-009…013 | No | M4/M5 | Manual / BR |
| FLOW-014 | Smoke | M7 | Coach marca pagado |
| FLOW-015 | Sí | M7 | Overdue: aviso + acceso Entreno |
| FLOW-016 | Smoke | M8 | Submit initial (survey keys + medidas); sin PDF |
| FLOW-017 | Smoke | M8 | Coach abre follow-up; sin SurveyAnswer |
| FLOW-018 | Sí (con M4) | M4 | UI “esperando próximo bloque” |

## 8. Fixtures / seed

| Fixture | Contenido |
|---------|-----------|
| `coach` | User role=coach (seed `MVP-017`) |
| `clientA` / `clientB` | Dos perfiles para isolation `BR-072` |
| `blockMinimal` | 4 semanas; ≥1 día con ejercicios/series |
| `nutritionMinimal` | ≤6 meals |
| `paymentOverdue` | Ancla pasada sin `PaymentRecord` |
| `assessmentInitialOpen` | Para M8 |

Ubicación sugerida: `tests/fixtures/` o `lib/test/` (definir en M1-05 / M2). Seed de prod ≠ fixtures de test (`BE-009`).

## 9. Qué no automatizar (MVP)

- Pixel-perfect / visual regression del design system
- Timer sonido/vibración (`TEST-008`)
- WhatsApp / PDF resultado diagnóstico
- Cobertura de todas las rutas `FE-013`
- Tests de librerías third-party (Better Auth, Drizzle) más allá de nuestro wiring

## 10. Preguntas abiertas

| ID | Tema | Estado |
|----|------|--------|
| TEST-OPEN-01 | DB de integration en CI (Neon ephemeral vs Testcontainers) | **Abierta** — cerrar en issue M2/M3 wiring; preferencia: Neon branch efímero o Postgres service en GH Actions |
| TEST-OPEN-02 | E2E en todo PR vs nightly hasta M9 | **Abierta** — default `TEST-010`: unit/integration en PR; E2E crítico desde M4/M9 según costo CI |

## 11. Referencias

- [`06-business-rules.md`](06-business-rules.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`09-backend-architecture.md`](09-backend-architecture.md)
- [`10-tech-stack.md`](10-tech-stack.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md)
- [`00-coherence-index.md`](00-coherence-index.md)
- [`AGENTS.md`](../../AGENTS.md)
