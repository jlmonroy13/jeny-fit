# 10 · Tech stack

> **Estado:** v0.1 — borrador. Next.js ya bootstrapado en el repo; cerrar el resto en M1.

## 1. Objetivo y audiencia

Versiones y librerías binding (`TS-*`).

## 2. Catálogo `TS-NNN`

| ID | Tema | Decisión |
|----|------|----------|
| TS-001 | Framework | Next.js 16 (ya en repo) |
| TS-002 | Language | TypeScript strict |
| TS-003 | Package manager | pnpm |
| TS-010 | Format | Prettier binding en CI _(añadir en M1)_ |
| TS-011 | DB | _(decidir)_ |
| TS-012 | ORM | _(decidir)_ |
| TS-013 | Auth | _(decidir)_ |
| TS-015 | Hosting | _(decidir, ej. Vercel)_ |
| TS-020 | Unit tests | Vitest _(objetivo M1)_ |
| TS-021 | E2E | Playwright _(milestone posterior)_ |
| TS-023 | Path alias | `@/*` → repo root _(confirmar en tsconfig)_ |
| TS-OPEN-01 | … | abierta |

## 3. Scripts `pnpm` (objetivo)

| Script | Propósito |
|--------|-----------|
| `dev` | Dev server |
| `lint` | ESLint |
| `typecheck` | `tsc --noEmit` _(añadir)_ |
| `format` / `format:check` | Prettier _(añadir)_ |
| `test` | Vitest _(añadir)_ |

## 4. Variables de entorno

| Nombre | Uso | Secret |
|--------|-----|--------|
| … | … | sí/no |

## 5. CI/CD

- Gate PR: lint → typecheck → format:check → test

## 6. Restricciones explícitas

- No añadir Jest/Cypress si se elige Vitest + Playwright
- No inventar stack fuera de esta tabla

## 7. Preguntas abiertas

| ID | Tema |
|----|------|
| TS-OPEN-01 | DB / ORM |
| TS-OPEN-02 | Auth provider |

## 8. Referencias

- [`08-frontend-architecture.md`](08-frontend-architecture.md)
- [`09-backend-architecture.md`](09-backend-architecture.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
