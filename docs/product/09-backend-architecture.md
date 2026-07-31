# 09 · Backend architecture

> **Estado:** v1.0 — `BE-001`…`015` cerradas. Provider DB/ORM/auth/email/storage → `TS-*` / M1-04 (doc 10). Upload fotos cerrado (`BE-008`).

## 1. Objetivo y audiencia

API, authZ, datos, mutaciones y seguridad (`BE-*`) para **Jeny Fit**. Contrato para agents e issues M2+; schema canónico = [`05-domain-model.md`](05-domain-model.md); reglas = [`06-business-rules.md`](06-business-rules.md); UI/routes = [`08-frontend-architecture.md`](08-frontend-architecture.md).

**No** elegir vendor de DB/auth aquí — eso es doc 10 (`TS-011`…`015`). Este doc fija **cómo** se comporta el backend sobre Next.js.

## 2. Decisiones (`BE-NNN`)

| ID | Decisión |
|----|----------|
| **BE-001** | **BFF en Next.js** — sin servicio API separado (Nest/Express) en MVP. Lecturas en Server Components; mutaciones en **Server Actions**; Route Handlers solo si el provider de auth/webhooks/storage lo exige. |
| **BE-002** | **Single-coach** (`MVP-016` / `DOMAIN-020`): sin `Organization` / `tenantId`. El portafolio = todos los `ClientProfile`. Cliente aislado por `clientProfileId` propio (`BR-072`). |
| **BE-003** | **Auth dual:** coach = email + password (+ reset email); client = magic link sin password (`VISION-004`, `BR-070`/`071`). Shape de session cookie = `TS-013`. |
| **BE-004** | **AuthZ en servidor** en cada query/mutation (además de middleware `FE-011`). Nunca confiar solo en ocultar UI. |
| **BE-005** | Lógica de negocio testeable (`BR-*`) en **funciones puras / services** en `lib/domain/` (o equivalente), invocadas desde actions — no solo en componentes. |
| **BE-006** | Mutaciones: input validado con **Zod** (o el validador del stack); errores tipados; `revalidatePath` / `revalidateTag` tras éxito (`FE-006`). |
| **BE-007** | Persistencia = entidades `DOMAIN-*`; migraciones versionadas vía ORM (`TS-012`). No columnas inventadas fuera de doc 05 sin PR al doc. |
| **BE-008** | **Fotos de valoración:** upload **directo al storage** con **signed URL** (browser → storage); la API solo emite URL firmada + persiste `AssessmentPhoto.storageKey` / metadata. No proxy de bytes por el server en MVP. |
| **BE-009** | Cuenta coach inicial por **seed/script** + secrets (`MVP-017`); no auto-registro coach ni client. |
| **BE-010** | Soft-delete de biblioteca: `ExerciseLibraryItem.active = false`; no hard-delete si hay `DayExercise` referenciados (`BR-021`). |
| **BE-011** | Campos **derivados** (estado de pago, día “actual”, status de día) se calculan en server/domain — **no** columnas obligatorias de estado mutables a mano (`DOMAIN-022`, `DOMAIN-026`, `BR-010`, `BR-050`…`052`). |
| **BE-012** | Sin API REST pública para terceros ni webhooks de pasarela de pago (`BR-081`). |
| **BE-013** | Email transaccional solo para: magic link cliente, reset password coach. Contenido UI en español. |
| **BE-014** | Secretos solo en env / secret manager del host (`TS-015`); nunca en repo. |
| **BE-015** | Creación de bloque materializa **4 semanas** (4ª deload) en **una transacción** (`BR-001`, `BR-002`). |

## 3. Tenancy / aislamiento

```text
┌─────────────────────────────────────┐
│  Sistema MVP (un solo coach)        │
│  User(role=coach)  →  all clients   │
│  User(role=client) →  own profile   │
│  ExerciseLibrary   →  global        │
└─────────────────────────────────────┘
```

| Actor | Lectura | Escritura |
|-------|---------|-----------|
| Coach | Todos los `ClientProfile` + biblioteca | Todo lo permitido en matriz doc 03 |
| Client | Solo su `ClientProfile` y agregados | RIR/obs (día actual/pasado), submit valoración propia, logout |
| Anónimo | Solo pantallas login + callback auth | Request magic link (sin crear User) |

**Alta cliente (`FLOW-004`):** coach crea `User(role=client)` + `ClientProfile` (ancla de cobro = día del alta por default). Magic link **falla cerrado** si el email no existe (`BR-070`).

## 4. Auth

### 4.1 Flujos

| Flujo | Rol | Mecánica | Ref |
|-------|-----|----------|-----|
| Login password | coach | Credenciales → session | FLOW-001, F-001 |
| Reset password | coach | Email con token → set password | MVP-017 |
| Request magic link | client | Email → link de un solo uso / TTL | FLOW-003, F-002 |
| Consume magic link | client | `/auth/callback` (o path `TS-013`) → session | FE-013 |
| Logout | ambos | Invalidar session | F-018 |

### 4.2 Session (provider-agnostic)

Mínimo en sesión server-readable:

| Campo | Uso |
|-------|-----|
| `userId` | PK `User` |
| `role` | `coach` \| `client` |
| `clientProfileId` | solo si `role=client` (o resolve 1:1 en server) |

Detalle cookie / JWT / adapter → **`TS-013` / FE-OPEN-02**.

### 4.3 Gates

1. **Middleware:** redirige no autenticados; separa `/coach/*` vs `/app/*` por rol (`FE-011`).
2. **Action/query:** re-check rol + ownership (`BE-004`, `BR-072`).
3. **Pago vencido:** **no** es gate de sesión (`BR-052`) — solo flag/aviso en lecturas.

## 5. Capa de datos

### 5.1 Fuente de verdad

Schema = doc 05. ORM/migrations = `TS-011` / `TS-012` (M1-04).

### 5.2 Capas sugeridas

```text
app/… (RSC, Server Actions)
        ↓
lib/actions/     # thin: authZ + parse Zod + call service + revalidate
lib/domain/      # pure BR-* (paymentStatus, currentDay, closeDay, snapshot…)
lib/db/          # queries / repositories (ORM)
lib/auth/        # session wrappers (provider-agnostic)
lib/storage/     # signed URL helpers (BE-008)
```

### 5.3 Derivados (no persistir como source of truth)

| Concepto | Cálculo |
|----------|---------|
| Día actual | Primer `TrainingDay` incompleto en orden bloque→semana→día (`BR-010`) |
| Status día UI | Derivado de sets con RIR + `closedAt` |
| Estado pago | Ancla + `PaymentRecord` + ventana 7 días (`BR-050`…`051`) |
| Esperando bloque | Sin día pendiente y sin bloque siguiente (`BR-016`) |

### 5.4 Transacciones / invariantes

| Operación | Invariante |
|-----------|------------|
| Crear `TrainingBlock` | 4 `TrainingWeek`; week 4 `isDeload=true` |
| Asignar ejercicio a día | Snapshot `DayExercise` + N `ExerciseSet` según `targetSets` |
| Cerrar día | Todas las series con `rir` ≠ null → set `closedAt` |
| Soft-delete library | `active=false`; snapshots intactos |
| Assessment `initial` | Máximo uno por cliente (`BR-060`) |
| Follow-up | Sin `SurveyAnswer` (`BR-061`); lo abre coach (`BR-062`) |

## 6. Mutations (Server Actions / Route Handlers)

### 6.1 Patrón

1. `requireSession()` / `requireRole('coach'|'client')`
2. Ownership check si client
3. `schema.parse(input)`
4. Domain service (+ DB en transacción si aplica)
5. `revalidatePath` / tags
6. Return `{ ok: true, data }` \| `{ ok: false, errorCode }` (sin stack traces al client)

### 6.2 Catálogo por bounded context (MVP)

| Contexto | Ejemplos de actions | AuthZ |
|----------|---------------------|-------|
| **Auth** | `signInCoach`, `requestClientMagicLink`, `signOut`, reset password | público / rol |
| **Clients** | `createClient`, `updateClientProfile`, `listClients` | coach |
| **Library** | `createExercise`, `updateExercise`, `deactivateExercise` | coach |
| **Training** | `createBlock`, `upsertDayExercise`, `duplicateWeek/Day`, `setSetRir`, `closeDay` | coach o client según BR |
| **Nutrition** | `upsertMeal`, `upsertNutritionPlan` | coach write; client read-only |
| **Feedback** | `upsertBlockFeedback` | coach write; client read |
| **Payments** | `markPaid`, `updateBillingAnchor` | coach; client read status |
| **Assessment** | `openFollowUp`, `submitAssessment`, `createSignedPhotoUpload` | coach open; client/coach submit |
| **Storage** | `createAssessmentPhotoUploadUrl` | sesión + assessment ownership |

Route Handlers típicos: callback auth, (opcional) webhook email provider — **no** CRUD de negocio por REST.

### 6.3 Upload fotos (`BE-008`)

```text
Client                    Next (Action)              Object storage
  │  createSignedUpload ──────► │
  │  ◄── { uploadUrl, key } ────│
  │  PUT bytes ─────────────────────────────────────► │
  │  confirmPhotoMetadata ──────► │ (persist AssessmentPhoto)
```

- Tipos MIME imagen allowlist; tamaño máximo (definir en issue de valoración; p.ej. 5–10 MB).
- Keys namespaced: `assessments/{clientProfileId}/{assessmentId}/{uuid}`.
- Lectura: signed **download** URL o URL pública del bucket (decidir con `TS-*` storage).

## 7. Seguridad

| Tema | Regla |
|------|-------|
| AuthZ | `BE-004` + matriz doc 03 |
| Isolation | `BR-072` en toda query filtrada por `clientProfileId` |
| Password | Solo coach; hash via provider; nunca loguear secrets |
| Magic link | No revela si email existe de forma útil a atacantes (respuesta genérica UX); **no** crea User (`BR-070`) |
| CSRF | Server Actions de Next + same-origin; seguir guía del Next instalado |
| Upload | Solo signed URL corto TTL; validar ownership del assessment |
| Pago | Sin PCI / pasarela (`BR-081`) |
| Video | Sin endpoint (`BR-080`) |
| Rate limit | Magic link + login password (provider o middleware) — detalle en issue auth |

## 8. Seed / CI

| Pieza | Notas |
|-------|-------|
| Seed coach | Email + password hash desde env (`BE-009`, `MVP-017`) |
| Seed opcional | Biblioteca mínima / cliente demo — solo si un issue lo pide (no default producción) |
| Migrations | Corren en CI/CD o paso de deploy (`TS-015`) |
| Tests | Literales `BR-*` en unit/integration (doc 11); harness Vitest M1-05 |

## 9. Entrega por milestone

| Milestone | Entrega BE |
|-----------|------------|
| **M1** | Docs 09/10; decisiones `TS-*`; sin schema productivo obligatorio hasta post M1-04 |
| **M2** | Schema User/ClientProfile; auth dual; seed coach; alta clienta; isolation |
| **M3** | Library + Training* + snapshot + transacciones de bloque |
| **M4** | RIR / closeDay / currentDay services |
| **M5** | Historial queries + BlockFeedback |
| **M6** | NutritionPlan / Meal |
| **M7** | PaymentRecord + `paymentStatus` derivado |
| **M8** | Assessment* + signed upload fotos |

(Nombres M2+ alineados a doc 02 §7 / 08 §10; detalle JIT en doc 12.)

## 10. Preguntas abiertas / cerradas

| ID | Tema | Estado |
|----|------|--------|
| FE-OPEN-03 | Upload fotos | **Cerrada** → `BE-008` (signed URL) |
| BE-OPEN-01 | Vendor DB / ORM | **Abierta** → `TS-011`, `TS-012` / M1-04 |
| BE-OPEN-02 | Vendor auth (password + magic link + reset) | **Abierta** → `TS-013` / M1-04; alinea `FE-OPEN-02` |
| BE-OPEN-03 | Object storage (S3, R2, provider BaaS, …) | **Abierta** → doc 10; contrato API = `BE-008` |
| BE-OPEN-04 | Email transactional provider | **Abierta** → doc 10 (`BE-013` fija usos) |
| BE-OPEN-05 | Límite MIME/tamaño fotos | **Abierta** — cerrar en issue M8 valoración |

## 11. Referencias

- [`05-domain-model.md`](05-domain-model.md)
- [`06-business-rules.md`](06-business-rules.md)
- [`03-user-roles.md`](03-user-roles.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`08-frontend-architecture.md`](08-frontend-architecture.md)
- [`10-tech-stack.md`](10-tech-stack.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
- [`00-coherence-index.md`](00-coherence-index.md)
- [`AGENTS.md`](../../AGENTS.md)
