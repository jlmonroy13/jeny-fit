# 03 · User roles

> **Estado:** v1.0 — roles y `F-*` cerrados.

## 1. Objetivo y audiencia

Roles y permisos (`ROLE-*`, `F-*`) para **Jeny Fit**. Binding para authZ en código y para flows en doc 04.

## 2. Decisiones binding (desde docs 01–02)

| ID                | Decisión                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------- |
| VISION-003        | Solo dos roles: coach/admin (Jeny) y cliente                                                |
| VISION-004        | Auth: Jeny = usuario/contraseña; cliente = magic link                                       |
| VISION-005        | Alta de clientes solo por Jeny                                                              |
| MVP-016           | Single-coach: una sola cuenta admin (Jeny)                                                  |
| MVP-017           | Jeny provisionada por seed; reset password por email                                        |
| MVP-004 / MVP-003 | Jeny edita cualquier campo del plan; cliente solo RIR (+ observación) en día actual/pasados |
| MVP-008           | Pago vencido no revoca acceso (solo aviso)                                                  |
| MVP-015           | Resultado diagnóstico fuera de app — sin feature in-app de informe                          |

## 3. Roles MVP

| ID              | Rol           | Quién                               | Acceso principal                                                                          |
| --------------- | ------------- | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| **ROLE-coach**  | Coach / admin | Jeny (única en MVP)                 | Panel responsive: clientes, planes, biblioteca, pagos, valoración, feedback               |
| **ROLE-client** | Cliente       | Usuario final dado de alta por Jeny | App mobile: inicio, entreno (RIR), nutrición (RO), historial, perfil, valoración (inputs) |

**IDs de implementación sugeridos:** `coach` | `client` (strings estables; no hardcodear el nombre “Jeny” en lógica de permisos).

## 4. Matriz de permisos

Leyenda: ✅ permitido · ❌ denegado · ◐ solo lectura / limitado

| Feature / acción                                              | ROLE-coach                            | ROLE-client                           |
| ------------------------------------------------------------- | ------------------------------------- | ------------------------------------- |
| Login password                                                | ✅                                    | ❌                                    |
| Login magic link                                              | ❌                                    | ✅                                    |
| Reset password (email)                                        | ✅                                    | ❌ (usa magic link)                   |
| Auto-registro                                                 | ❌                                    | ❌                                    |
| Alta / listar clientes                                        | ✅                                    | ❌                                    |
| Ver solo **su** datos de cliente                              | —                                     | ✅                                    |
| CRUD biblioteca ejercicios (global)                           | ✅                                    | ❌                                    |
| Editar plan entrenamiento (cualquier día)                     | ✅                                    | ❌                                    |
| Duplicar semana/día                                           | ✅                                    | ❌                                    |
| Registrar / editar RIR (+ obs.) día actual o pasado           | ✅ (incluye corregir RIR del cliente) | ✅                                    |
| Editar RIR en día futuro                                      | ✅                                    | ❌                                    |
| Cerrar día de entreno (RIR completo)                          | ✅ (si aplica operación)              | ✅ (propio día)                       |
| Timer de descanso                                             | —                                     | ✅                                    |
| Ver nutrición                                                 | ✅ (editar)                           | ◐ solo lectura                        |
| Plan Completo / Comparación-progreso                          | ✅                                    | ◐ historial propio (sin editor coach) |
| Escribir feedback de bloque                                   | ✅                                    | ❌                                    |
| Leer feedback de bloque                                       | ✅                                    | ✅ (propio)                           |
| Marcar pago / ajustar fecha cobro / historial pagos           | ✅                                    | ◐ ver estado propio + aviso           |
| Valoración: ver evolución todos los clientes                  | ✅                                    | ❌                                    |
| Valoración: completar inputs propios (encuesta/fotos/medidas) | ✅ (puede asistir/editar)             | ✅ (propios)                          |
| Instructivo de medidas                                        | ✅                                    | ✅                                    |
| Generar/ver Resultado diagnóstico in-app                      | ❌ MVP                                | ❌ MVP                                |
| Subir video por serie                                         | ❌ MVP                                | ❌ MVP (placeholder)                  |

## 5. Catálogo de features (`F-NNN`)

| ID    | Feature                                                                 | Roles                                                                                   |
| ----- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| F-001 | Auth coach (password + reset email)                                     | ROLE-coach                                                                              |
| F-002 | Auth cliente (magic link)                                               | ROLE-client                                                                             |
| F-003 | Alta y gestión de clientes                                              | ROLE-coach                                                                              |
| F-004 | Dashboard de clientes                                                   | ROLE-coach                                                                              |
| F-005 | Biblioteca global de ejercicios (CRUD)                                  | ROLE-coach                                                                              |
| F-006 | Editor plan de entrenamiento (bloques…series, duplicar)                 | ROLE-coach                                                                              |
| F-007 | Vista Plan Completo                                                     | ROLE-coach                                                                              |
| F-008 | Vista Comparación / progreso                                            | ROLE-coach                                                                              |
| F-009 | Editor plan nutricional                                                 | ROLE-coach                                                                              |
| F-010 | Feedback in-app por bloque                                              | ROLE-coach (write) · ROLE-client (read)                                                 |
| F-011 | Pagos (marcar, historial, fecha cobro)                                  | ROLE-coach · ROLE-client (read estado)                                                  |
| F-012 | Valoración — panel coach (evolución)                                    | ROLE-coach                                                                              |
| F-013 | Valoración — captura (diagnóstico / seguimiento + instructivo)          | ROLE-client (completar propios) · ROLE-coach (crear seguimiento, ver/editar, evolución) |
| F-014 | App cliente — Inicio (día pendiente + avisos)                           | ROLE-client                                                                             |
| F-015 | App cliente — Entreno (RIR, obs., timer, cerrar día, placeholder video) | ROLE-client                                                                             |
| F-016 | App cliente — Nutrición (solo lectura)                                  | ROLE-client                                                                             |
| F-017 | App cliente — Historial (RIR pasados; futuros RO; feedback)             | ROLE-client                                                                             |
| F-018 | App cliente — Perfil (cuenta, pago, logout)                             | ROLE-client                                                                             |

## 6. Aislamiento / tenancy

- **MVP (`MVP-016`):** un solo coach (Jeny). No hay org multi-tenant.
- **Aislamiento cliente:** cada `ROLE-client` solo lee/escribe **su** registro (plan, RIR, valoración, estado de pago). Nunca ve datos de otros clientes.
- **Coach:** acceso a **todos** los clientes de su portafolio (el único portafolio del sistema en MVP).
- **Biblioteca:** global al coach (no por cliente).

## 7. Fuera del MVP

- Roles adicionales (asistente, otro coach, staff)
- Multi-tenant / invitaciones de coach
- Impersonation / “ver como cliente” (opcional post-MVP)
- Permisos granulares tipo ACL por recurso más allá de coach vs client
- Resultado diagnóstico in-app (`MVP-015`)
- Video por serie

## 8. Preguntas abiertas / decisiones de rol cerradas

| ID          | Tema                                                                    | Estado                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ROLE-001    | Jeny puede **editar el RIR** (y observación) del cliente desde el panel | **Cerrada:** sí (`MVP-004` + matriz §4)                                                                                                                                  |
| ROLE-002    | Quién inicia el **seguimiento mensual** de valoración                   | **Cerrada:** el **coach crea/abre** el seguimiento; el **cliente completa** fotos/medidas/peso; el coach puede editar/asistir y ver evolución. Detalle de pasos → doc 04 |
| MVP-OPEN-02 | Preguntas exactas de encuesta diagnóstica                               | **Cerrada** → `MVP-018` (doc 02 §3.3)                                                                                                                                    |

> **Estado:** v1.0 — roles y `F-*` cerrados.

## 9. Referencias

- [`00-coherence-index.md`](00-coherence-index.md)
- [`01-product-vision.md`](01-product-vision.md)
- [`02-scope-mvp.md`](02-scope-mvp.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md)
