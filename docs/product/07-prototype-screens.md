# 07 · Prototype screens

> **Estado:** v1.0 — inventario desde Claude Design (HTML + handoff).  
> **Prototipos:** [`_intake/design-handoff/client/`](_intake/design-handoff/client/) · [`_intake/design-handoff/coach/`](_intake/design-handoff/coach/).

## 1. Objetivo

Inventario de pantallas diseñadas y qué es **binding MVP** vs polish / faltante vs docs 03–06.

## 2. Inventario

### 2.1 Cliente (mobile ~390px)

| ID | Pantalla | Archivo HTML | MVP | Flows |
|----|----------|--------------|-----|-------|
| C-01 | Inicio | `client-inicio.html` | Sí | FLOW-008, 015, 018 |
| C-02 | Entreno | `client-entreno.html` | Sí | FLOW-008 |
| C-03 | Nutrición | `client-nutricion.html` | Sí | FLOW-007 (RO) |
| C-04 | Historial | `client-historial.html` | Sí | FLOW-009, 011 |
| C-05 | Perfil | `client-perfil.html` | Sí | FLOW-015 |
| C-06 | Instructivo medición | `client-medidas-instructivo.html` | Sí | FLOW-016/017 |
| C-07 | Valoración (sub-flujo) | (en prototipo; overlay desde Perfil) | Sí | FLOW-016, 017 |
| C-08 | Progresión ejercicio | (overlay desde Historial) | Sí | FLOW-011 / comparación cliente |
| — | Login magic link | **No diseñado** | Sí (gap) | FLOW-003 |

### 2.2 Coach (desktop ~1280 + compact)

| ID | Pantalla | Archivo HTML | MVP | Flows |
|----|----------|--------------|-----|-------|
| J-01 | Login coach | `coach-login.html` | Sí | FLOW-001, 002 (link) |
| J-02 | Dashboard clientas | `coach-dashboard.html` | Sí | FLOW-004 (parcial) |
| J-03 | Perfil clienta (shell + tabs) | `coach-client-profile.html` | Sí | — |
| J-04 | Editor entrenamiento | `coach-training-editor.html` | Sí | FLOW-006, 010 |
| J-05 | Plan Completo | `coach-plan-completo.html` | Sí | FLOW-013 |
| J-06 | Comparación / progreso | `coach-comparacion.html` | Sí | FLOW-013 |
| J-07 | Editor nutrición | `coach-nutrition-editor.html` | Sí | FLOW-007 |
| J-08 | Biblioteca ejercicios | `coach-library.html` | Sí | FLOW-005 |
| J-09 | Pagos | `coach-pagos.html` | Sí | FLOW-014 |
| J-10 | Valoración | `coach-valoracion.html` | Sí | FLOW-016, 017 |
| J-11 | Feedback de bloque | `coach-feedback.html` | Sí | FLOW-012 |
| J-12 | Seguimiento mensual (dialog) | (desde valoración) | Sí | FLOW-017 |
| — | Alta clienta por correo | **No en export** | Sí (gap) | FLOW-004 |
| — | Toggle Escritorio/Compacta | Prototipo only | **No** | — |

## 3. Tabla prototipo vs binding

| Elemento prototipo | Binding MVP | Notas |
|--------------------|-------------|-------|
| Bottom nav 5 tabs | Sí | |
| RIR + cerrar día (todas las series) | Sí | BR-011 |
| Timer 2–6 min | Sí | MVP-010 |
| Video Próximamente | Sí (placeholder) / No (upload) | BR-080 |
| Banners pago no bloquean | Sí | BR-052 |
| Esperando próximo bloque | Sí | BR-016 |
| Nutrición RO cliente | Sí | BR-031 |
| Historial: futuro no editable | Sí | BR-013 |
| Valoración inputs; PDF fuera | Sí | MVP-015 |
| Biblioteca sin sets/reps default | Sí | BR-022 |
| Coach edita RIR cualquier día | Sí | ROLE-001 |
| Marcar pagado manual USD | Sí | MVP-008 |
| Login magic link UI | **Gap** | Diseñar en implementación o follow-up design |
| Alta clienta UI | **Gap** | FLOW-004 — añadir al prototipo o issue UI |
| Buscador dashboard filtrado | Polish en HTML estático | Conectar en app |
| Wordmark tipográfico (sin PNG logo) | Provisional | Preferir assets `logo-*` en app |
| Lucide via unpkg | Prototipo | Empaquetar en app |

## 4. Detalle por pantalla (resumen)

### Cliente

- **Inicio:** día pendiente, chips 1…N, banners pago/feedback/espera, CTA continuar entreno.
- **Entreno:** PRIORITY — tags ejercicio, series, RIR 0–5, observación, timer, cerrar día gated.
- **Nutrición:** Comida 1…6 expandibles, solo lectura.
- **Historial:** bloques/semanas/días; editar RIR pasado/actual; feedback coach; ver progresión.
- **Perfil:** magic link copy, badge pago, link valoración, logout.
- **Instructivo / Valoración:** 12 medidas + peso + fotos; PDF no in-app.

### Coach

- **Login:** usuario/contraseña + copy reset email.
- **Dashboard:** roster bloque/semana/día + pago + próx. valoración.
- **Tabs perfil:** Entrenamiento, Plan Completo, Comparación, Nutrición, Pagos, Valoración.
- **Editor:** Block→Week→Day; agregar desde biblioteca **prescribiendo** carga/series/reps; duplicar; editar RIR.
- **Biblioteca:** nombre + grupo muscular (Tren inferior/superior); CRUD.
- **Pagos / Valoración / Feedback:** alineados a MVP-008 / MVP-009 / FLOW-012.

## 5. Capturas baseline

Abrir en navegador:

- [`_intake/design-handoff/client/index.html`](_intake/design-handoff/client/index.html)
- [`_intake/design-handoff/coach/index.html`](_intake/design-handoff/coach/index.html)

## 6. Follow-ups de diseño (opcionales)

1. Pantalla **magic link** cliente (pedir enlace / “revisa tu correo”).
2. Flujo **Agregar clienta** (correo + adaptación + fecha cobro) en coach.
3. Incrustar **isotipo/logo** real en sidebar/login.
4. Export HTML de overlays Valoración / Progresión si no están como archivos sueltos.

## 7. Referencias

- [`07-design-system.md`](07-design-system.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`03-user-roles.md`](03-user-roles.md)
- [`_intake/design-handoff/HANDOFF-client.md`](_intake/design-handoff/HANDOFF-client.md)
- [`_intake/design-handoff/HANDOFF-coach.md`](_intake/design-handoff/HANDOFF-coach.md)
