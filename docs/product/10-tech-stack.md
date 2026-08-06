# 10 · Tech stack

> **Estado:** v1.2 — stack MVP cerrado (`TS-001`…`026`); **TS-OPEN-03** cerrada (pins M1). Free tier Vercel/Neon binding.

## 1. Objetivo y audiencia

Versiones y librerías **binding** (`TS-*`) para agents e issues. No añadir dependencias fuera de esta tabla sin PR al doc. Arquitectura: [`08-frontend-architecture.md`](08-frontend-architecture.md), [`09-backend-architecture.md`](09-backend-architecture.md).

## 2. Catálogo `TS-NNN`

| ID         | Tema                 | Decisión                                                                                                                                                          |
| ---------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TS-001** | Framework            | **Next.js 16** (App Router; ya en repo). Leer `node_modules/next/dist/docs/` antes de APIs.                                                                       |
| **TS-002** | Language             | **TypeScript** strict                                                                                                                                             |
| **TS-003** | Package manager      | **pnpm**                                                                                                                                                          |
| **TS-004** | UI runtime           | **React 19**                                                                                                                                                      |
| **TS-005** | CSS                  | **Tailwind CSS 4** + CSS variables (doc 07)                                                                                                                       |
| **TS-006** | Icons                | **Lucide** (npm)                                                                                                                                                  |
| **TS-007** | Validation           | **Zod** (inputs de Server Actions / forms)                                                                                                                        |
| **TS-010** | Format               | **Prettier** binding en CI (`package.json` + `.prettierrc`)                                                                                                       |
| **TS-011** | DB                   | **PostgreSQL** managed en **Neon**                                                                                                                                |
| **TS-012** | ORM                  | **Drizzle ORM** + Drizzle Kit (migrations)                                                                                                                        |
| **TS-013** | Auth                 | **Better Auth** — coach: email/password + reset; client: magic link; **sin** Auth.js/NextAuth en MVP                                                              |
| **TS-014** | Email                | **Resend** (magic link + reset password; copy ES)                                                                                                                 |
| **TS-015** | Hosting              | **Vercel** (app Next)                                                                                                                                             |
| **TS-016** | Object storage       | **Cloudflare R2** (S3-compatible) — signed upload/download (`BE-008`)                                                                                             |
| **TS-017** | File limits (fotos)  | MIME: `image/jpeg`, `image/png`, `image/webp`; máx **8 MB**/archivo; máx **6** fotos / assessment                                                                 |
| **TS-020** | Unit tests           | **Vitest** (`vitest.config.mts`, `tests/**/*.test.ts`)                                                                                                            |
| **TS-021** | E2E                  | **Playwright** (milestone posterior; no Cypress)                                                                                                                  |
| **TS-022** | Lint                 | **ESLint** (`eslint-config-next`)                                                                                                                                 |
| **TS-023** | Path alias           | `@/*` → repo root (**confirmado** en `tsconfig.json`)                                                                                                             |
| **TS-024** | Node                 | Engines Node **≥ 22** (`package.json` `engines`)                                                                                                                  |
| **TS-025** | Session shape (mín.) | Tras auth: `userId`, `role` (`coach` \| `client`), `clientProfileId` si client — cierra `FE-OPEN-02` a nivel contrato; implementación Better Auth                 |
| **TS-026** | Budget free tier     | **No superar el free tier de Vercel ni de Neon** en MVP/dev. Diseñar CI, previews y DB de test para no consumir compute/branches/build minutes de más (ver §5–6). |

### 2.1 Alternativas explícitamente descartadas (MVP)

| Tema      | No usar                                     | Motivo                                                                            |
| --------- | ------------------------------------------- | --------------------------------------------------------------------------------- |
| Auth      | Auth.js / NextAuth                          | Password + magic link dual + Drizzle: más glue; Better Auth es binding (`TS-013`) |
| Auth BaaS | Supabase Auth / Clerk como fuente de verdad | Evitar acoplar auth+DB+storage en un solo vendor; contrato BE ya es app-owned     |
| ORM       | Prisma                                      | Preferencia Drizzle (más liviano con Server Actions); no mezclar ambos            |
| DB        | SQLite / PlanetScale MySQL                  | Postgres es el target (`DOMAIN-*`, Neon)                                          |
| Storage   | Proxy de bytes por Next                     | Contrario a `BE-008`                                                              |
| Tests     | Jest / Cypress                              | Vitest + Playwright                                                               |

### 2.2 Installed majors (repo — cierra `TS-OPEN-03`)

Fuente: `package.json` + resolución en `pnpm-lock.yaml` (M1). Carets en `package.json` OK; majors binding abajo.

| Paquete                                | `package.json`         | Resuelto (lock) | Notas  |
| -------------------------------------- | ---------------------- | --------------- | ------ |
| `next`                                 | `16.2.12`              | 16.2.12         | TS-001 |
| `react` / `react-dom`                  | `19.2.4`               | 19.2.4          | TS-004 |
| `typescript`                           | `^5`                   | 5.9.x           | TS-002 |
| `eslint` / `eslint-config-next`        | `^9` / `16.2.12`       | 9.x / 16.2.12   | TS-022 |
| `prettier`                             | `^3.9.6`               | 3.9.6           | TS-010 |
| `tailwindcss` / `@tailwindcss/postcss` | `^4`                   | 4.x             | TS-005 |
| `vitest`                               | `^4.1.10`              | 4.1.10          | TS-020 |
| `drizzle-orm` / `drizzle-kit`          | `^0.45.2` / `^0.31.10` | 0.45.x / 0.31.x | TS-012 |
| `postgres` (postgres.js)               | `^3.4.9`               | 3.4.x           | TS-011 |
| `server-only`                          | `^0.0.1`               | 0.0.1           | FE/BE  |
| Node                                   | `engines.node: >=22`   | —               | TS-024 |
| pnpm (CI)                              | action `version: 10`   | —               | TS-003 |

**Aún no instalados** (binding de producto; wiring M2+): Lucide, Zod, Better Auth, Resend, SDKs R2. Client DB: `lib/db/` + `drizzle.config.ts` (M2-01); tablas de dominio en M2-02.

## 3. Scripts `pnpm` (objetivo)

| Script                                     | Propósito              | Milestone |
| ------------------------------------------ | ---------------------- | --------- |
| `dev`                                      | Dev server             | ya        |
| `build` / `start`                          | Prod                   | ya        |
| `lint`                                     | ESLint                 | ya        |
| `typecheck`                                | `tsc --noEmit`         | ya        |
| `format` / `format:check`                  | Prettier               | ya        |
| `test` / `test:watch`                      | Vitest                 | ya        |
| `db:generate` / `db:migrate` / `db:studio` | Drizzle Kit            | ya        |
| `auth:seed` (o `db:seed`)                  | Seed coach (`MVP-017`) | M2        |

## 4. Variables de entorno

Nombres orientativos (ajustar prefijos al wire real de Better Auth / SDKs; documentar `.env.example` en el issue de wiring).

| Nombre                                                        | Uso                             | Secret |
| ------------------------------------------------------------- | ------------------------------- | ------ |
| `DATABASE_URL`                                                | Neon Postgres connection string | sí     |
| `BETTER_AUTH_SECRET`                                          | Firma session / tokens          | sí     |
| `BETTER_AUTH_URL`                                             | Base URL app (prod/preview)     | no*    |
| `RESEND_API_KEY`                                              | Email transaccional             | sí     |
| `EMAIL_FROM`                                                  | Remitente verificado            | no*    |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Credenciales R2                 | sí     |
| `R2_BUCKET` / `R2_PUBLIC_BASE_URL` (si aplica)                | Bucket + lectura                | mixto  |
| `COACH_SEED_EMAIL` / `COACH_SEED_PASSWORD`                    | Solo seed local/CI controlado   | sí     |
| `NEXT_PUBLIC_APP_URL`                                         | Links en emails / magic link    | no*    |

\*No son “secretos” de criptografía, pero no hardcodear en código.

## 5. CI/CD

- Host: Vercel (`TS-015`); previews por PR **con moderación** (`TS-026`): preferir 1 proyecto, evitar redeploys inútiles; no spamear previews para docs-only si se puede skip.
- Gate PR (`RM-008`): workflow [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) en **GitHub Actions** (Node 22 + pnpm): **`pnpm lint` → `pnpm typecheck` → `pnpm format:check` → `pnpm test`**. No usar Neon ni Vercel como runner de test (`TS-026`, `TEST-010`).
- `pnpm test`: **Vitest** (`vitest run`; config `vitest.config.mts`; specs en `tests/**/*.test.ts`).
- **DB de integration en CI:** Postgres **service container** en GH Actions (`TEST-016`) — **no** en M1; llega con integration M2+. **Prohibido** Neon branches por PR (`TS-026`).
- Neon: **un** proyecto free (dev/prod según convenga); connection pooling; suspender compute idle; sin branch-per-PR.
- Migrations: aplicar en deploy / paso explícito (issue M2+); no mutar prod a mano.

## 6. Restricciones explícitas

1. No inventar stack fuera de §2.
2. No Auth.js + Better Auth en paralelo.
3. No Jest/Cypress si Vitest/Playwright están elegidos.
4. No i18n multi-idioma ni pasarela de pago en dependencias MVP.
5. UI copy en español; código en inglés (`AGENTS.md`).
6. **`TS-026`:** no diseñar flujos que empujen fuera del free tier de **Vercel** o **Neon** (CI en Actions + Postgres efímero; Neon solo app; previews Vercel con cuidado).

## 7. Mapa OPEN → cerrado

| ID previo           | Resolución                                   |
| ------------------- | -------------------------------------------- |
| TS-OPEN-01 (DB/ORM) | `TS-011` Neon Postgres + `TS-012` Drizzle    |
| TS-OPEN-02 (Auth)   | `TS-013` Better Auth                         |
| FE-OPEN-02          | Contrato session `TS-025`; provider `TS-013` |
| BE-OPEN-01          | = TS-011 / TS-012                            |
| BE-OPEN-02          | = TS-013                                     |
| BE-OPEN-03          | `TS-016` R2                                  |
| BE-OPEN-04          | `TS-014` Resend                              |
| BE-OPEN-05          | `TS-017` límites foto                        |
| TS-OPEN-03 (pins)   | §2.2 — majors documentados post M1 tooling   |

## 8. Preguntas abiertas

_(Ninguna de stack. Producto: ver [`00-coherence-index.md`](00-coherence-index.md) §4.)_

## 9. Referencias

- [`08-frontend-architecture.md`](08-frontend-architecture.md)
- [`09-backend-architecture.md`](09-backend-architecture.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
- [`00-coherence-index.md`](00-coherence-index.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md) (M1-04)
- [`AGENTS.md`](../../AGENTS.md)
