# Handoff Claude Design → docs 07

> Insumo no binding por sí solo. Contrato: [`07-design-system.md`](../../07-design-system.md) + [`07-prototype-screens.md`](../../07-prototype-screens.md).

## Contenido

| Carpeta | Origen |
|---------|--------|
| [`client/`](client/) | Export HTML cliente (~390px), incl. magic link |
| [`coach/`](coach/) | Export HTML coach (~1280px), incl. agregar clienta |
| [`HANDOFF-client.md`](HANDOFF-client.md) | Resumen inventario cliente |
| [`HANDOFF-coach.md`](HANDOFF-coach.md) | Resumen inventario coach |

## Cómo abrir

Abrir `client/index.html` o `coach/index.html` en el navegador (tokens relativos).

## Gaps cerrados (v1.1)

- Cliente: login magic link + sent + expired (`client-login.html`, `client-magic-link-sent.html`, `client-magic-link-expired.html`).
- Coach: agregar clienta (`coach-add-client.html`) — FLOW-004.

## No producto

- Toggle Escritorio/Compacta del prototipo coach.
