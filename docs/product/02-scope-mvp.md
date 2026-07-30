# 02 · Scope MVP

> **Estado:** v0.2 — borrador desde intake + `01`. Revisar OPENs §8 y nombres tentativos de M2+.

## 1. Objetivo y audiencia

Qué entra y qué no en el MVP de **Jeny Fit**. Binding para cortar features; detalle de journeys/reglas en 03–06.

## 2. MVP en una frase

Web donde **Jeny** gestiona clientes, planes (entrenamiento + nutrición), biblioteca, progreso, feedback, valoración y pagos en **USD**; y el **cliente** (mobile) consume su plan, registra RIR y ve historial/avisos — sin video in-app, sin pasarela de pago y sin auto-registro.

### 2.1 Decisiones binding (desde doc 01)

| ID | Decisión |
|----|----------|
| VISION-001 | Clientes internacionales · UI español · cobros **USD** · sin i18n multi-idioma en MVP |
| VISION-002 | 100% web; sin apps nativas |
| VISION-003 | Roles: coach/admin (Jeny) + cliente |
| VISION-004 | Auth: Jeny = usuario/contraseña; cliente = magic link |
| VISION-005 | Alta de clientes solo por Jeny (correo) |
| VISION-006 / 007 | JTBD coach y cliente (ver doc 01) |

### 2.2 Decisiones de producto (confirmadas)

| ID | Decisión |
|----|----------|
| MVP-001 | **Entrenamiento completo:** Bloque → Semana → Día → Ejercicio → Serie; bloque = 4 semanas (última descarga); bloque de adaptación opcional (manual). |
| MVP-002 | **Avance secuencial** del cliente (por días cerrados), no por fecha calendario. |
| MVP-003 | Cliente registra **RIR** (+ observación opcional); cierre de día solo con RIR en todas las series; edición RIR en día actual/pasados, no futuros. |
| MVP-004 | Jeny puede editar **cualquier** campo del plan en cualquier día (pasado/actual/futuro). |
| MVP-005 | **Biblioteca global** de ejercicios (solo Jeny); snapshot histórico en días ya usados. |
| MVP-006 | **Plan nutricional** ≤6 comidas (Comida 1…6), cantidades sugeridas; solo lectura para cliente; independiente del ciclo de bloques. |
| MVP-007 | **Plan Completo** + **Comparación/progreso** en panel Jeny; feedback in-app al cierre de bloque (visible en historial del cliente). |
| MVP-008 | **Pagos** mensuales USD, fecha fija por cliente, marcado manual; estados al día / próximo a vencer / vencido; vencido **no** bloquea acceso (solo aviso). |
| MVP-009 | **Valoración:** diagnóstico inicial una vez (preguntas + fotos + medidas + peso); seguimientos mensuales sin cuestionario (fotos + medidas + peso). |
| MVP-010 | **Timer de descanso** en día de entreno (2–6 min; pausar / saltar / extender; sonido + vibración al terminar). |
| MVP-011 | Video por serie: **placeholder “Próximamente”** (WhatsApp fuera de app). |
| MVP-012 | UX: Jeny responsive; cliente **mobile-only** con bottom nav (Inicio, Entreno, Nutrición, Historial, Perfil). |
| MVP-013 | Estado “**esperando el próximo bloque**” cuando el bloque actual terminó y no hay siguiente planeado. |

## 3. Dentro del MVP (In scope)

### Auth y cuentas
- [ ] Login Jeny (usuario + contraseña)
- [ ] Login cliente (magic link)
- [ ] Alta de cliente por correo desde panel Jeny (sin auto-registro)

### Panel Jeny
- [ ] Dashboard de clientes (bloque/semana/día actual + estado de pago)
- [ ] Perfil del cliente: Nutrición, Entrenamiento (editor), Plan Completo, Comparación/Progreso, Pagos, Valoración
- [ ] Editor plan nutricional (≤6 comidas)
- [ ] Editor plan de entrenamiento (incl. duplicar semana/día)
- [ ] Biblioteca global de ejercicios (CRUD Jeny)
- [ ] Feedback in-app al cliente (por bloque)
- [ ] Pagos: marcar pagado, historial, ajustar fecha de cobro (USD)
- [ ] Valoración: diagnóstico + seguimientos mensuales (ver MVP-OPEN-02 para campos exactos)

### App cliente (mobile)
- [ ] Inicio (día pendiente + avisos)
- [ ] Entreno (RIR, observación, timer, placeholder video, cerrar día)
- [ ] Nutrición (solo lectura)
- [ ] Historial (pasados editables en RIR; futuros solo vista; feedback al fin de bloque)
- [ ] Perfil (cuenta, estado de pago, cerrar sesión)

## 4. Fuera del MVP (Out of scope)

- Subida real de **video** por serie (placeholder sí)
- **Pasarela** de pago / cobro automático integrado
- **Auto-registro** de clientes
- Apps **nativas** (iOS/Android)
- **i18n** multi-idioma (UI solo español)
- Multi-coach / marketplace / white-label genérico (salvo que se cierre `DOMAIN-OPEN-01` en contra)
- Chat in-app / reemplazo total de WhatsApp
- Recetas nutricionales estrictas o scheduling por horario de comida
- Automatización de sobrecarga progresiva (Jeny diseña el siguiente bloque manualmente)

## 5. Criterios de “MVP listo” (Definition of Done)

- [ ] Jeny puede dar de alta un cliente, armar bloque + nutrición, y el cliente entra por magic link
- [ ] Cliente cierra al menos un día completo (RIR en todas las series) y ve historial/estados
- [ ] Jeny ve Plan Completo y Comparación/progreso con datos reales del cliente
- [ ] Jeny marca un pago y el cliente ve aviso si está vencido (sin perder acceso)
- [ ] Valoración inicial + al menos un seguimiento mensual registrables y visibles para Jeny
- [ ] Placeholder de video y estado “esperando próximo bloque” verificados manualmente
- [ ] Docs 03–07 coherentes con este scope; sin features out-of-scope implementadas

## 6. Fases posteriores

| Fase | Qué |
|------|-----|
| Post-MVP | Video por serie in-app |
| Post-MVP | Pasarela / cobro integrado (USD) |
| Post-MVP | i18n (p. ej. EN) si la demanda de clientes lo justifica |
| Post-MVP | Multi-coach / tenant (si se valida el modelo) |
| Post-MVP | Automatizaciones de planeación / recordatorios avanzados |

## 7. MVP y milestones

Nombres M2+ **tentativos** hasta retrospectiva M1 / `roadmap-detail` (RM-003). No son issues binding aún.

| Milestone | Entrega MVP |
|-----------|-------------|
| M1 | Foundation (docs, CI, stack) — sin features de negocio |
| M2 | Auth + alta clientes + esqueleto roles (Jeny password / cliente magic link) |
| M3 | Biblioteca + plan de entrenamiento (editor Jeny) |
| M4 | App cliente: día de entreno, RIR, timer, cierre secuencial |
| M5 | Historial, Plan Completo, comparación/progreso, feedback |
| M6 | Nutrición |
| M7 | Pagos (manual, USD) + avisos |
| M8 | Valoración (diagnóstico + seguimientos) |
| M9 | Hardening / DoD MVP / pulido UX |

## 8. Historial / `MVP-OPEN-*`

| ID | Tema | Estado |
|----|------|--------|
| MVP-OPEN-01 | Umbral exacto de “próximo a vencer” (¿N días antes de la fecha de cobro?) | abierta |
| MVP-OPEN-02 | Contenido canónico de encuesta diagnóstica + lista de medidas corporales | abierta |
| VISION-OPEN-01 | North Star Metric (doc 01) | **cerrada** → VISION-008 |
| DOMAIN-OPEN-01 | Single-coach vs multi-tenant desde el inicio | abierta |
| AUTH-OPEN-01 | Provisioning cuenta Jeny + recuperación de contraseña | abierta |

## 9. Referencias

- [`00-coherence-index.md`](00-coherence-index.md)
- [`01-product-vision.md`](01-product-vision.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md)
