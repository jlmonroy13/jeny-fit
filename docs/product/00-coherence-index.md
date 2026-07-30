# 00 · Índice de coherencia documental

> **Estado:** v0.1 — borrador inicial (plantilla).

## 1. Cadena de verdad (orden de lectura)

```
01 visión → 02 scope → 03 roles → 04 flows → 05 dominio → 06 reglas
         → 07 design / prototype → 08–09 arquitectura → 10 stack → 11 tests → 12 roadmap
```

| Doc | Rol | IDs |
|-----|-----|-----|
| **01** | Por qué | VISION-* |
| **02** | Qué entra MVP | MVP-* |
| **03** | Quién | ROLE-*, F-* |
| **04** | Cómo (journeys) | FLOW-* |
| **05** | Qué persiste | DOMAIN-* |
| **06** | Reglas testeables | BR-* |
| **07-prototype-screens** | UI MVP vs prototipo | Tabla Sí/No |
| **07-design-system** | Tokens/componentes/copy UI | — |
| **08** | Frontend | FE-* |
| **09** | Backend | BE-* |
| **10** | Stack | TS-* |
| **11** | Tests | TEST-* |
| **12** | Plan | RM-*, Mx-NN |

## 2. IDs cruzados (llenar al cerrar flujos)

| Tema | Flow | Reglas | Feature | Stack |
|------|------|--------|---------|-------|
| _(ej. Login)_ | FLOW-00N | — | F-00N | TS-0NN |

## 3. Decisiones alineadas (no reabrir sin PR)

| Tema | Decisión única |
|------|----------------|
| _(llenar)_ | … |

## 4. Preguntas abiertas activas

| ID | Doc | Tema |
|----|-----|------|
| …-OPEN-01 | … | … |

## 5. Checklist coherencia (PR doc)

- [ ] Nuevo `FLOW-*` citado en 03 (F-*) y 12 si aplica
- [ ] Nuevo `BR-*` en 06 + referencia desde 04/05
- [ ] Cambio entidad → 05 + verificación 04
- [ ] UI prototipo → fila en `07-prototype-screens` + componente en `07-design-system` si aplica
- [ ] Rutas/modales → 08
- [ ] Auth/datos → 09
- [ ] Tests nuevos → 11 + caso literal en 06 si aplica

## 6. Referencias

- [`AGENTS.md`](../../AGENTS.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md)
