# 07 · Prototype screens

> **Estado:** v1.1 — inventario completo (incl. magic link + alta clienta).  
> **Prototipos:** [`_intake/design-handoff/client/`](_intake/design-handoff/client/) · [`_intake/design-handoff/coach/`](_intake/design-handoff/coach/).

## 1. Objetivo

Inventario de pantallas diseñadas y qué es **binding MVP** vs polish vs docs 03–06.

## 2. Inventario

### 2.1 Cliente (mobile ~390px)

| ID    | Pantalla               | Archivo HTML                      | MVP | Flows              |
| ----- | ---------------------- | --------------------------------- | --- | ------------------ |
| C-00a | Login magic link       | `client-login.html`               | Sí  | FLOW-003           |
| C-00b | Enlace enviado         | `client-magic-link-sent.html`     | Sí  | FLOW-003           |
| C-00c | Enlace expirado        | `client-magic-link-expired.html`  | Sí  | FLOW-003           |
| C-01  | Inicio                 | `client-inicio.html`              | Sí  | FLOW-008, 015, 018 |
| C-02  | Entreno                | `client-entreno.html`             | Sí  | FLOW-008           |
| C-03  | Nutrición              | `client-nutricion.html`           | Sí  | FLOW-007 (RO)      |
| C-04  | Historial              | `client-historial.html`           | Sí  | FLOW-009, 011      |
| C-05  | Perfil                 | `client-perfil.html`              | Sí  | FLOW-015           |
| C-06  | Instructivo medición   | `client-medidas-instructivo.html` | Sí  | FLOW-016/017       |
| C-07  | Valoración (sub-flujo) | (overlay desde Perfil)            | Sí  | FLOW-016, 017      |
| C-08  | Progresión ejercicio   | (overlay desde Historial)         | Sí  | FLOW-011           |

### 2.2 Coach (desktop ~1280 + compact)

| ID    | Pantalla                      | Archivo HTML                  | MVP    | Flows                |
| ----- | ----------------------------- | ----------------------------- | ------ | -------------------- |
| J-01  | Login coach                   | `coach-login.html`            | Sí     | FLOW-001, 002 (link) |
| J-02  | Dashboard clientas            | `coach-dashboard.html`        | Sí     | —                    |
| J-02b | Agregar clienta               | `coach-add-client.html`       | Sí     | FLOW-004             |
| J-03  | Perfil clienta (shell + tabs) | `coach-client-profile.html`   | Sí     | —                    |
| J-04  | Editor entrenamiento          | `coach-training-editor.html`  | Sí     | FLOW-006, 010        |
| J-05  | Plan Completo                 | `coach-plan-completo.html`    | Sí     | FLOW-013             |
| J-06  | Comparación / progreso        | `coach-comparacion.html`      | Sí     | FLOW-013             |
| J-07  | Editor nutrición              | `coach-nutrition-editor.html` | Sí     | FLOW-007             |
| J-08  | Biblioteca ejercicios         | `coach-library.html`          | Sí     | FLOW-005             |
| J-09  | Pagos                         | `coach-pagos.html`            | Sí     | FLOW-014             |
| J-10  | Valoración                    | `coach-valoracion.html`       | Sí     | FLOW-016, 017        |
| J-11  | Feedback de bloque            | `coach-feedback.html`         | Sí     | FLOW-012             |
| J-12  | Seguimiento mensual (dialog)  | (desde valoración)            | Sí     | FLOW-017             |
| —     | Toggle Escritorio/Compacta    | Prototipo only                | **No** | —                    |

## 3. Tabla prototipo vs binding

| Elemento prototipo                               | Binding MVP                    | Notas                                              |
| ------------------------------------------------ | ------------------------------ | -------------------------------------------------- |
| Bottom nav 5 tabs                                | Sí                             |                                                    |
| Login magic link (email → sent → expired)        | Sí                             | FLOW-003; sin password; sin auto-registro (BR-070) |
| RIR + cerrar día (todas las series)              | Sí                             | BR-011                                             |
| Timer 2–6 min                                    | Sí                             | MVP-010                                            |
| Video Próximamente                               | Sí (placeholder) / No (upload) | BR-080                                             |
| Banners pago no bloquean                         | Sí                             | BR-052                                             |
| Esperando próximo bloque                         | Sí                             | BR-016                                             |
| Nutrición RO cliente                             | Sí                             | BR-031                                             |
| Historial: futuro no editable                    | Sí                             | BR-013                                             |
| Valoración inputs; PDF fuera                     | Sí                             | MVP-015                                            |
| Agregar clienta (email, adaptación, fecha cobro) | Sí                             | FLOW-004; error email duplicado                    |
| Biblioteca sin sets/reps default                 | Sí                             | BR-022                                             |
| Coach edita RIR cualquier día                    | Sí                             | ROLE-001                                           |
| Marcar pagado manual USD                         | Sí                             | MVP-008                                            |
| Buscador dashboard filtrado                      | Polish en HTML estático        | Conectar en app                                    |
| Wordmark tipográfico (sin PNG logo)              | Provisional                    | Preferir assets `logo-*` en app                    |
| Lucide via unpkg                                 | Prototipo                      | Empaquetar en app                                  |

## 4. Detalle por pantalla (resumen)

### Cliente — auth

- **Login:** solo email + CTA enviar enlace; sin contraseña; sin registro.
- **Enlace enviado:** confirma revisión de correo; reenviar / otro correo.
- **Enlace expirado:** pedir uno nuevo.
- Regla: email desconocido **no** crea cuenta (BR-070) — UI puede usar mensaje genérico.

### Cliente — app

- **Inicio / Entreno / Nutrición / Historial / Perfil / Instructivo / Valoración:** sin cambios de alcance vs v1.0.

### Coach

- **Agregar clienta:** desde dashboard; panel con email (req), nombre opcional, toggle bloque adaptación, día de cobro editable; error duplicado.
- Resto de pantallas coach: sin cambios de alcance vs v1.0.

## 5. Capturas baseline

- [`_intake/design-handoff/client/index.html`](_intake/design-handoff/client/index.html)
- [`_intake/design-handoff/coach/index.html`](_intake/design-handoff/coach/index.html)

## 6. Follow-ups de diseño (opcionales)

1. Incrustar **isotipo/logo** real en sidebar/login.
2. Export HTML suelto de overlays Valoración / Progresión si se quieren archivos independientes.
3. Estado vacío dashboard (cero clientas) + empty library.

## 7. Referencias

- [`07-design-system.md`](07-design-system.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`03-user-roles.md`](03-user-roles.md)
- [`_intake/design-handoff/`](_intake/design-handoff/)
