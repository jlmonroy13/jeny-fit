# 10 · Tech stack

> **Estado:** v1.0 — stack MVP cerrado (`TS-001`…`025`).

## 1. Objetivo y audiencia

Versiones y librerías **binding** (`TS-*`) para agents e issues. No añadir dependencias fuera de esta tabla sin PR al doc. Arquitectura: [`08-frontend-architecture.md`](08-frontend-architecture.md), [`09-backend-architecture.md`](09-backend-architecture.md).

## 2. Catálogo `TS-NNN`

| ID | Tema | Decisión |
|----|------|----------|
| **TS-001** | Framework | **Next.js 16** (App Router; ya en repo). Leer `node_modules/next/dist/docs/` antes de APIs. |
| **TS-002** | Language | **TypeScript** strict |
| **TS-003** | Package manager | **pnpm** |
| **TS-004** | UI runtime | **React 19** |
| **TS-005** | CSS | **Tailwind CSS 4** + CSS variables (doc 07) |
| **TS-006** | Icons | **Lucide** (npm) |
| **TS-007** | Validation | **Zod** (inputs de Server Actions / forms) |
| **TS-010** | Format | **Prettier** binding en CI (añadir en M1-02) |
| **TS-011** | DB | **PostgreSQL** managed en **Neon** |
| **TS-012** | ORM | **Drizzle ORM** + Drizzle Kit (migrations) |
| **TS-013** | Auth | **Better Auth** — coach: email/password + reset; client: magic link; **sin** Auth.js/NextAuth en MVP |
| **TS-014** | Email | **Resend** (magic link + reset password; copy ES) |
| **TS-015** | Hosting | **Vercel** (app Next) |
| **TS-016** | Object storage | **Cloudflare R2** (S3-compatible) — signed upload/download (`BE-008`) |
| **TS-017** | File limits (fotos) | MIME: `image/jpeg`, `image/png`, `image/webp`; máx **8 MB**/archivo; máx **6** fotos / assessment |
| **TS-020** | Unit tests | **Vitest** (M1-05) |
| **TS-021** | E2E | **Playwright** (milestone posterior; no Cypress) |
| **TS-022** | Lint | **ESLint** (`eslint-config-next`) |
| **TS-023** | Path alias | `@/*` → repo root (**confirmado** en `tsconfig.json`) |
| **TS-024** | Node | Engines Node **≥ 22** (fijar en `package.json` en M1-02) |
| **TS-025** | Session shape (mín.) | Tras auth: `userId`, `role` (`coach` \| `client`), `clientProfileId` si client — cierra `FE-OPEN-02` a nivel contrato; implementación Better Auth |

### 2.1 Alternativas explícitamente descartadas (MVP)

| Tema | No usar | Motivo |
|------|---------|--------|
| Auth | Auth.js / NextAuth | Password + magic link dual + Drizzle: más glue; Better Auth es binding (`TS-013`) |
| Auth BaaS | Supabase Auth / Clerk como fuente de verdad | Evitar acoplar auth+DB+storage en un solo vendor; contrato BE ya es app-owned |
| ORM | Prisma | Preferencia Drizzle (más liviano con Server Actions); no mezclar ambos |
| DB | SQLite / PlanetScale MySQL | Postgres es el target (`DOMAIN-*`, Neon) |
| Storage | Proxy de bytes por Next | Contrario a `BE-008` |
| Tests | Jest / Cypress | Vitest + Playwright |

## 3. Scripts `pnpm` (objetivo)

| Script | Propósito | Milestone |
|--------|-----------|-----------|
| `dev` | Dev server | ya |
| `build` / `start` | Prod | ya |
| `lint` | ESLint | ya |
| `typecheck` | `tsc --noEmit` | M1-02 |
| `format` / `format:check` | Prettier | M1-02 |
| `test` | Vitest | M1-05 |
| `db:generate` / `db:migrate` / `db:studio` | Drizzle Kit | post M1-04 / M2 |
| `auth:seed` (o `db:seed`) | Seed coach (`MVP-017`) | M2 |

## 4. Variables de entorno

Nombres orientativos (ajustar prefijos al wire real de Better Auth / SDKs; documentar `.env.example` en el issue de wiring).

| Nombre | Uso | Secret |
|--------|-----|--------|
| `DATABASE_URL` | Neon Postgres connection string | sí |
| `BETTER_AUTH_SECRET` | Firma session / tokens | sí |
| `BETTER_AUTH_URL` | Base URL app (prod/preview) | no* |
| `RESEND_API_KEY` | Email transaccional | sí |
| `EMAIL_FROM` | Remitente verificado | no* |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Credenciales R2 | sí |
| `R2_BUCKET` / `R2_PUBLIC_BASE_URL` (si aplica) | Bucket + lectura | mixto |
| `COACH_SEED_EMAIL` / `COACH_SEED_PASSWORD` | Solo seed local/CI controlado | sí |
| `NEXT_PUBLIC_APP_URL` | Links en emails / magic link | no* |

\*No son “secretos” de criptografía, pero no hardcodear en código.

## 5. CI/CD

- Host: Vercel (`TS-015`); previews por PR.
- Gate PR (`RM-008`): **`pnpm lint` → `pnpm typecheck` → `pnpm format:check` → `pnpm test`**
- Migrations: aplicar en deploy / paso explícito (issue M2+); no mutar prod a mano.

## 6. Restricciones explícitas

1. No inventar stack fuera de §2.
2. No Auth.js + Better Auth en paralelo.
3. No Jest/Cypress si Vitest/Playwright están elegidos.
4. No i18n multi-idioma ni pasarela de pago en dependencias MVP.
5. UI copy en español; código en inglés (`AGENTS.md`).

## 7. Mapa OPEN → cerrado

| ID previo | Resolución |
|-----------|------------|
| TS-OPEN-01 (DB/ORM) | `TS-011` Neon Postgres + `TS-012` Drizzle |
| TS-OPEN-02 (Auth) | `TS-013` Better Auth |
| FE-OPEN-02 | Contrato session `TS-025`; provider `TS-013` |
| BE-OPEN-01 | = TS-011 / TS-012 |
| BE-OPEN-02 | = TS-013 |
| BE-OPEN-03 | `TS-016` R2 |
| BE-OPEN-04 | `TS-014` Resend |
| BE-OPEN-05 | `TS-017` límites foto |

## 8. Preguntas abiertas

| ID | Tema | Notas |
|----|------|-------|
| TS-OPEN-03 | Exact package versions pin | Cerrar al instalar en issues M1-02 / M2 (mantener majors de §2) |

## 9. Referencias

- [`08-frontend-architecture.md`](08-frontend-architecture.md)
- [`09-backend-architecture.md`](09-backend-architecture.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
- [`00-coherence-index.md`](00-coherence-index.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md) (M1-04)
- [`AGENTS.md`](../../AGENTS.md)
