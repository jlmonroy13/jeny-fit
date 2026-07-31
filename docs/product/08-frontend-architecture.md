# 08 · Frontend architecture

> **Estado:** v1.0 — FE-001…013 cerradas. Auth = Better Auth (`TS-013`, `TS-025`). Upload = `BE-008` / `TS-016`.

## 1. Objetivo y audiencia

Estructura frontend, mapa de rutas y decisiones `FE-*` para agents e implementación. UI visual: [`07-design-system.md`](07-design-system.md) + [`07-prototype-screens.md`](07-prototype-screens.md). Datos/API: [`09-backend-architecture.md`](09-backend-architecture.md).

## 2. Stack base

| Pieza | Elección | Ref |
|-------|----------|-----|
| Framework | Next.js **16** App Router | TS-001 |
| UI | React **19** | — |
| Estilos | Tailwind **4** + CSS variables del design system (`tokens/`) | TS-*, doc 07 |
| Lenguaje | TypeScript strict | TS-002 |
| Package manager | pnpm | TS-003 |
| Iconos | Lucide (paquete npm en app; prototipo usaba CDN) | doc 07 |
| Forms / mutations | Server Actions (+ validación Zod cuando se cierre stack) | FE-006 |
| Auth UI | Coach: password forms; Cliente: magic-link screens | VISION-004, FLOW-001…003 |
| Auth provider | **Better Auth** (password coach + magic link client) | TS-013 |
| Session shape | `userId`, `role`, `clientProfileId?` | TS-025 |

## 3. Decisiones (`FE-NNN`)

| ID | Decisión |
|----|----------|
| **FE-001** | App Router only — no Pages Router. |
| **FE-002** | **Route groups por rol:** `(coach)` y `(client)` con layouts distintos (sidebar vs bottom nav). |
| **FE-003** | **Server Components por defecto**; `'use client'` solo en boundaries interactivos (RIR, timer, forms controlados, dialogs). |
| **FE-004** | UI copy **español**; código/comentarios/filenames **inglés** (`AGENTS.md`). |
| **FE-005** | Recrear UI desde handoff HTML + tokens doc 07 — **no** copiar HTML de Claude Design como runtime. |
| **FE-006** | Mutaciones de negocio vía **Server Actions** (o route handlers si el provider de auth lo exige); revalidate path tras éxito. |
| **FE-007** | Modales / paneles laterales coach: preferir **URL state** (`?panel=add-client`, `?dialog=feedback`) cuando deban ser deep-linkables; overlays cliente (valoración, instructivo) pueden ser rutas hijas o query. |
| **FE-008** | **RM-011:** componente de design system solo con primer caller real en el **mismo PR**. |
| **FE-009** | Cliente = viewport mobile-first (~390); coach = desktop-first + responsive (sidebar → top bar). Sin app nativa. |
| **FE-010** | Timer de descanso: 100% client-side (sin persistencia obligatoria). |
| **FE-011** | Protección de rutas por rol en **middleware** + checks server (nunca solo UI). |
| **FE-012** | Tokens CSS (`--brand-primary`, day states, alerts) viven en `app/globals.css` (o `styles/tokens.css` importado); Tailwind mapea a esas vars. |
| **FE-013** | Paths MVP (sin locale prefix): cliente `/app/*`; coach `/coach/*`; auth `/login/coach`, `/login/client`, `/login/client/sent`, `/login/client/expired`; callback provider en `/auth/callback` (o el que fije `TS-013`). |

## 4. Mapa de rutas por rol

**Binding (`FE-013`).** Sin prefijo `/es` (UI solo español). Prefijos estables para issues M2+:

### 4.1 Públicas / auth

| Ruta | Rol | Pantalla prototipo |
|------|-----|--------------------|
| `/login/coach` | coach | J-01 |
| `/login/client` | client | C-00a |
| `/login/client/sent` | client | C-00b |
| `/login/client/expired` | client | C-00c |
| `/auth/callback` (o path del provider — `TS-013`) | ambos | Magic link / OAuth consume |

### 4.2 Cliente `(client)` — bottom nav

| Ruta | Pantalla | ID proto |
|------|----------|----------|
| `/app` | Inicio (home cliente) | C-01 |
| `/app/entreno` | Entreno | C-02 |
| `/app/nutricion` | Nutrición | C-03 |
| `/app/historial` | Historial | C-04 |
| `/app/perfil` | Perfil | C-05 |
| `/app/perfil/valoracion` | Valoración | C-07 |
| `/app/medidas/instructivo` | Instructivo (o `?medida=` en query) | C-06 |
| `/app/historial/progreso` | Progresión ejercicio (o query `?ejercicio=`) | C-08 |

### 4.3 Coach `(coach)` — sidebar

| Ruta | Pantalla | ID proto |
|------|----------|----------|
| `/coach` | Dashboard clientas | J-02 |
| `/coach/clientes/nuevo` | Agregar clienta (página; panel vía `?panel=add-client` también válido) | J-02b |
| `/coach/biblioteca` | Biblioteca | J-08 |
| `/coach/clientes/[id]` | Shell perfil (redirect a tab entrenamiento) | J-03 |
| `/coach/clientes/[id]/entrenamiento` | Editor plan | J-04 |
| `/coach/clientes/[id]/plan-completo` | Plan Completo | J-05 |
| `/coach/clientes/[id]/comparacion` | Comparación | J-06 |
| `/coach/clientes/[id]/nutricion` | Editor nutrición | J-07 |
| `/coach/clientes/[id]/pagos` | Pagos | J-09 |
| `/coach/clientes/[id]/valoracion` | Valoración | J-10 |

Dialogs: feedback de bloque y seguimiento mensual → `?dialog=feedback` / `?dialog=seguimiento` sobre la ruta del cliente (`FE-007`), IDs proto J-11 / J-12.

Redirect post-login: coach → `/coach`; client → `/app`.

## 5. Modales / navegación

| UI | Patrón FE |
|----|-----------|
| Bottom nav cliente | Layout `(client)` persistente |
| Sidebar coach | Layout `(coach)` |
| Agregar clienta / agregar ejercicio | Side panel + `FE-007` |
| Feedback bloque / seguimiento mensual | `Dialog` + query o route |
| Instructivo medida | Full-screen overlay o ruta hija |
| AlertBanner | Inline en página; **nunca** bloquea navegación por pago vencido |

## 6. Estructura de carpetas (objetivo)

```text
app/
  layout.tsx                 # root: fonts, tokens, html lang=es
  globals.css                # Tailwind + CSS vars doc 07
  (auth)/
    login/coach/page.tsx
    login/client/page.tsx
    login/client/sent/page.tsx
    login/client/expired/page.tsx
  (client)/
    app/layout.tsx           # BottomNav
    app/inicio/page.tsx
    app/entreno/page.tsx
    …
  (coach)/
    coach/layout.tsx         # Sidebar
    coach/page.tsx           # dashboard
    coach/biblioteca/page.tsx
    coach/clientes/[id]/…
components/
  ui/                        # primitivos lazy (Button, Input, …) — RM-011
  client/                    # compuestos solo cliente
  coach/                     # compuestos solo coach
lib/
  auth/                      # session helpers (provider-agnostic wrappers)
  domain/                    # types mirroring DOMAIN-* (shared)
  actions/                   # Server Actions por bounded context
middleware.ts                # role gates
```

Prototipos HTML de referencia: [`_intake/design-handoff/`](_intake/design-handoff/).

## 7. Server vs Client

| Capa | Ejemplos |
|------|----------|
| **Server** | Layouts, páginas de listado/detalle, fetch de plan/días, auth session read, Server Actions |
| **Client** | Entreno (RIR + timer), expanders nutrición/historial, panels, dialogs, bottom-nav active state, file pickers (fotos) |

Regla: bajar el `'use client'` lo más abajo posible (leaf components).

## 8. Data fetching / estado

| Concern | Enfoque |
|---------|---------|
| Leer datos | Server Components + queries (doc 09); pasar props a client leaves |
| Mutar | Server Actions; `revalidatePath` / `revalidateTag` |
| Estado UI efímero | `useState` local (timer, tab, panel abierto) |
| URL state | tabs coach, paneles, dialogs deep-link (`FE-007`) |
| Cache global client | Evitar hasta que haga falta; no Redux por defecto |
| Optimistic UI | Opcional en RIR; no requerido MVP |

Tipos de dominio alineados a [`05-domain-model.md`](05-domain-model.md); no inventar entidades.

## 9. Accesibilidad y UX binding

- Contraste marca púrpura sobre lavanda (doc 07).
- Targets grandes en Entreno (RIR circles, timer).
- `lang="es"` en root layout.
- Focus rings con `--focus-ring`.

## 10. Entrega por milestone (tentativo)

| Milestone | Entrega FE |
|-----------|------------|
| **M1** | Esqueleto `app/`, tokens en CSS, scripts lint/typecheck/format; sin features negocio |
| **M2** | Auth UI coach + client + middleware roles + alta clienta |
| **M3** | Biblioteca + editor plan (coach) |
| **M4** | App cliente: Inicio + Entreno (RIR, timer, cierre) |
| **M5** | Historial, Plan Completo, comparación, feedback |
| **M6** | Nutrición (editor + RO) |
| **M7** | Pagos UI |
| **M8** | Valoración + instructivo |

(Nombres M2+ alineados a doc 02 §7; detalle JIT en doc 12.)

## 11. Preguntas abiertas / cerradas

| ID | Tema | Estado |
|----|------|--------|
| FE-OPEN-01 | Paths finales | **Cerrada** → `FE-013` (§4) |
| FE-OPEN-02 | Provider auth y shape de session | **Cerrada** → `TS-013` Better Auth + `TS-025` |
| FE-OPEN-03 | Upload de fotos | **Cerrada** → `BE-008` + `TS-016` R2 |

## 12. Referencias

- [`07-design-system.md`](07-design-system.md)
- [`07-prototype-screens.md`](07-prototype-screens.md)
- [`09-backend-architecture.md`](09-backend-architecture.md)
- [`10-tech-stack.md`](10-tech-stack.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`AGENTS.md`](../../AGENTS.md)
- [`_intake/design-handoff/`](_intake/design-handoff/)
