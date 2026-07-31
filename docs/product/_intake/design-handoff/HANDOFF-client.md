# JenyFit — Handoff a Ingeniería (Rol: Client)

(Fuente: Claude Design export + resumen de inventario. Ver HTML en `./client/`.)

## A) Uso del sistema de diseño (cliente)

**Tokens:** `colors.css`, `semantic.css`, `typography.css`, `spacing.css`  
**Fondo:** `--surface-sunken` + Card en `--surface-page`.

| Componente | Pantallas | Notas |
|---|---|---|
| Card | Inicio, Entreno, Nutrición, Historial, Perfil, Instructivo, Valoración | Contenedor |
| DayStateChip | Inicio, Entreno, Historial | completado / actual / futuro |
| ProgressBar | Inicio | Avance del día |
| AlertBanner | Inicio, Nutrición, Perfil, Valoración | Nunca bloqueante |
| Badge | Historial, Perfil | success/warning/error |
| Tag | Entreno, Nutrición | |
| Button | Todas | primary/secondary/ghost |
| IconButton | Entreno, Historial, Valoración | |
| Input | Entreno, Historial, Valoración | |
| Tabs | Valoración | Inicial / Seguimiento |
| image-slot | Valoración, Instructivo | Placeholder |

**Bottom nav:** Inicio | Entreno | Nutrición | Historial | Perfil

**Violaciones MVP detectadas:** ninguna (sin pasarela, sin auto-registro, sin PDF diagnóstico in-app, sin upload video).

## B–D

Ver detalle completo en el mensaje de handoff del usuario / tablas en [`07-prototype-screens.md`](../../07-prototype-screens.md).
