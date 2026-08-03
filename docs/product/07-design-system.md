# 07 · Design system

> **Estado:** v1.0 — contrato visual desde Claude Design + brand PDF.  
> **Handoff HTML:** [`_intake/design-handoff/`](_intake/design-handoff/).  
> **RM-011:** componentes React solo cuando exista primer caller en el mismo PR.

## 1. Objetivo y audiencia

Contrato visual y catálogo de primitivos para **Jeny Fit** (cliente mobile + coach responsive). No sustituye brand book; lo traduce a UI de producto.

## 2. Principios

1. **Light surfaces + acento marca** — fondos lavanda/blanco; primary `#764293`. No dark-mode-only.
2. **Cercano y claro** — copy UI en español, empático, inclusivo; banners visibles pero **no bloqueantes**.
3. **Entreno primero** — controles grandes (RIR, timer) usables en el gym con una mano.
4. **Estados de día explícitos** — completado / actual-pendiente / futuro (`DayStateChip`).
5. **Misma marca, dos shells** — bottom nav (cliente) vs sidebar (coach); mismos tokens.
6. **Sin ruido visual** — superficies planas; Lucide; sin fotografía de stock como identidad.

## 3. Tokens

Fuente canónica en handoff: `tokens/colors.css`, `semantic.css`, `typography.css`, `spacing.css`.

### 3.1 Color (marca + semánticos)

| Token                                  | Valor                | Uso                               |
| -------------------------------------- | -------------------- | --------------------------------- |
| `--brand-primary` / `--purple-700`     | `#764293`            | CTA, nav activa, chips completado |
| `--ink-900` / `--text-primary`         | `#3F3E3F`            | Texto principal                   |
| `--purple-300` / `--brand-soft`        | `#CCA9D0`            | Soft / bordes info                |
| `--gray-300` / `--border-default`      | `#D1D0D1`            | Bordes                            |
| `--lavender-100` / `--brand-wash`      | `#DED3E0`            | Wash, chip actual bg              |
| `--lavender-050` / `--surface-sunken`  | oklch lavanda pálida | Fondo app                         |
| `--surface-page` / `--surface-card`    | `#FFFFFF`            | Cards / paneles                   |
| `--text-secondary` / `--text-muted`    | ink-700 / ink-500    | Secundario / muted                |
| `--day-completado-*`                   | purple-700 + white   | Día cerrado                       |
| `--day-actual-*`                       | lavender + purple    | Día pendiente actual              |
| `--day-futuro-*`                       | gray                 | Día futuro                        |
| `--alert-info/success/warning/error-*` | ver `semantic.css`   | `AlertBanner` / badges pago       |

### 3.2 Tipografía

| Rol               | Familia                            | Notas                            |
| ----------------- | ---------------------------------- | -------------------------------- |
| Display / títulos | **Open Sans Condensed** Bold (700) | Wordmark, headings en mayúsculas |
| Body              | **Open Sauce Sans** 300/400/600    | UI y párrafos                    |
| Fallback          | Impact / Segoe UI / sans-serif     | Documentado en tokens            |

Escala (CSS vars): `--text-display-xl` 56 → `--text-caption` 12. Leading display ~1.05; body ~1.5.

### 3.3 Spacing / radius / shadow

| Token  | Valores                                                     |
| ------ | ----------------------------------------------------------- |
| Space  | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 (`--space-1`…`20`) |
| Radius | sm 8 · md 14 · lg 20 · pill 999                             |
| Shadow | sm / md / lg (oklch soft)                                   |

### 3.4 Iconos

**Lucide** (CDN en prototipo; en app preferir paquete npm). Estado activo: tinte marca.

## 4. Componentes (catálogo visual)

Documentación de **contrato**; implementación React = lazy (RM-011).

| Componente                | Variantes / estados              | Callers previstos                                             | Notas                                         |
| ------------------------- | -------------------------------- | ------------------------------------------------------------- | --------------------------------------------- |
| Button                    | primary / secondary / ghost      | Ambos roles                                                   |                                               |
| IconButton                | —                                | Entreno, editor, tablas                                       | Icon via prop                                 |
| Input                     | —                                | Forms, RIR obs, medidas                                       |                                               |
| Checkbox / Radio / Switch | —                                | Forms coach                                                   |                                               |
| Select                    | —                                | Coach editor / filtros                                        |                                               |
| Card                      | —                                | Casi todas                                                    |                                               |
| DayStateChip              | completado / actual / futuro     | Inicio, Historial, Plan Completo                              | Binding fuerte                                |
| ProgressBar               | —                                | Inicio cliente                                                |                                               |
| AlertBanner               | info / success / warning / error | Banners pago, tips                                            | Nunca modal bloqueante de acceso              |
| Badge / Tag               | tones                            | Pago, bloques, tags ejercicio                                 |                                               |
| Toast / Tooltip           | —                                | Feedback ligero                                               |                                               |
| Dialog                    | —                                | Feedback bloque, seguimiento mensual, confirmar marcar pagado | **No** pasarela                               |
| Tabs                      | —                                | Valoración cliente; perfil coach                              |                                               |
| BottomNav                 | 5 ítems                          | Cliente                                                       | Inicio, Entreno, Nutrición, Historial, Perfil |
| Sidebar                   | Clientas / Biblioteca / Salir    | Coach desktop                                                 |                                               |
| image-slot                | placeholder                      | Fotos valoración, instructivo                                 | Subida real en implementación                 |

## 5. Patrones de layout

| Shell       | Ancho                | Nav                                                                                                  |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| **Cliente** | ~390px mobile web    | Bottom nav fija                                                                                      |
| **Coach**   | ~1280px + responsive | Sidebar 220px; compacto = top bar (producto); toggle prototipo Escritorio/Compacta = **no shipping** |

Overlays full-screen cliente: instructivo medidas, valoración, progresión ejercicio.

## 6. Copy UI (español — ejemplos binding)

| Contexto       | Copy                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------- |
| Saludo inicio  | Hola, {nombre} / Tu entrenamiento                                                         |
| Bloque agotado | Esperando tu próximo bloque                                                               |
| Pago           | Tu pago vence pronto / Tu pago está vencido                                               |
| RIR help       | RIR (repeticiones en reserva); 0 = al fallo; 5 = muy fácil                                |
| Video          | Video de la serie: Próximamente                                                           |
| Cerrar día     | Registra el RIR de todas las series para cerrar el día.                                   |
| Nutrición      | Cantidades sugeridas por Jeny — solo lectura                                              |
| Auth cliente   | Acceso con enlace mágico (sin contraseñas). Pantallas: pedir enlace / enviado / expirado. |
| Diagnóstico    | Tu diagnóstico en PDF te lo comparte Jeny directamente — no se genera en la app.          |
| Coach pagos    | Marcar como pagado / Historial de pagos                                                   |
| Coach login    | Panel de coach / Ingresa para gestionar tus clientas                                      |

## 7. Fuera de este design system (producto)

- Pasarela / método de pago guardado
- Auto-registro cliente
- PDF resultado diagnóstico in-app
- Sets/reps por defecto en biblioteca
- Multi-coach

## 8. Referencias

- [`07-prototype-screens.md`](07-prototype-screens.md)
- [`_intake/design-handoff/`](_intake/design-handoff/)
- Brand PDF (colores `#764293`, `#3F3E3F`, `#CCA9D0`, `#D1D0D1`, `#DED3E0`)
- [`02-scope-mvp.md`](02-scope-mvp.md) · [`06-business-rules.md`](06-business-rules.md)
