# JenyFit Client — Static HTML Export

Static HTML export of the client-role mobile screens (~390px), for engineering handoff.
No React/build step — plain HTML + CSS, using JenyFit Design System tokens.

## Files
- `index.html` — list of all screens with links
- `client-inicio.html` — Inicio (pending day, banners, day progress chips)
- `client-entreno.html` — Entreno (RIR logging, rest timer, close day)
- `client-nutricion.html` — Nutrición (read-only meal plan)
- `client-historial.html` — Historial (past/current blocks, RIR edit, coach feedback)
- `client-perfil.html` — Perfil (account, payment status, magic link note, logout)
- `client-medidas-instructivo.html` — Measurement instructivo (one measure detail)
- `client-login.html` — Magic-link login (email input, no password, no self-signup)
- `client-magic-link-sent.html` — Confirmation screen after requesting the link
- `client-magic-link-expired.html` — Expired-link recovery screen

## Assets
- `styles.css` + `tokens/` — JenyFit Design System tokens (colors, semantic, typography, spacing), copied from the design system
- Icons: Lucide SVGs loaded from unpkg CDN (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`)

## Notes
- Static snapshots of representative states (e.g. one meal expanded, one day expanded in Historial) — no JS interactivity wired up; engineering should implement real state/data binding.
- Spanish UI copy preserved exactly as designed.
- Includes magic-link auth screens (login / sent / expired). No password, no self-signup.
