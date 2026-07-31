# JenyFit Coach — Static HTML Export

Static HTML export of the coach-role desktop screens (~1280px, sidebar layout), for engineering handoff.
No React/build step — plain HTML + CSS, using JenyFit Design System tokens.

## Files
- `index.html` — list of all screens with links
- `coach-login.html` — Login (username/password, seed account)
- `coach-dashboard.html` — Dashboard clientes (list, block/week/day, payment status)
- `coach-client-profile.html` — Client profile shell (sidebar + tabs, default Entrenamiento tab shown)
- `coach-training-editor.html` — Training plan editor (Block→Week→Day, prescribe load/sets/reps, duplicate week/day, add block/week/day, edit client RIR)
- `coach-plan-completo.html` — Plan Completo (all days by state, block feedback entry point)
- `coach-comparacion.html` — Comparación / Progreso (load, reps, RIR, observations across blocks)
- `coach-nutrition-editor.html` — Nutrition editor (up to 6 Comida 1…6, suggested amounts)
- `coach-library.html` — Exercise library CRUD (global, no default sets/reps)
- `coach-pagos.html` — Pagos (USD, mark paid manually, history, edit billing date — no payment gateway)
- `coach-valoracion.html` — Valoración (photos, 12 measures, weight evolution; monthly follow-up entry point; no in-app diagnostic PDF)
- `coach-feedback.html` — Block feedback note editor

## Assets
- `styles.css` + `tokens/` — JenyFit Design System tokens, copied from the design system
- Icons: Lucide SVGs loaded from unpkg CDN (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`)

## Notes
- Desktop (~1280px) sidebar layout as designed; the original also has a compact-mobile toggle for review purposes only (not part of the shipped product), so it is not duplicated here.
- Side panels ("Agregar ejercicio", "Nuevo ejercicio") and dialogs ("Seguimiento mensual") are noted as HTML comments where they were collapsed to keep pages static; their fields are documented in the comment.
- Static snapshots of representative sample data — no JS interactivity wired up; engineering should implement real state/data binding.
- Spanish UI copy preserved exactly as designed.
