# 00 · Índice de coherencia documental

> **Estado:** v0.3 — semilla desde intake; auth coach = password, cliente = magic link.  
> §2 (IDs cruzados) se completa al cerrar 03–06. §3 son decisiones de producto ya acordadas en discovery; los IDs `VISION-*` / `MVP-*` / `BR-*` se asignan al llenar cada doc.

## 1. Cadena de verdad (orden de lectura)

```
01 visión → 02 scope → 03 roles → 04 flows → 05 dominio → 06 reglas
         → 07 design / prototype → 08–09 arquitectura → 10 stack → 11 tests → 12 roadmap
```

| Doc | Rol | IDs | Estado fill |
|-----|-----|-----|-------------|
| **01** | Por qué | VISION-* | v1.0 cerrado |
| **02** | Qué entra MVP | MVP-* | v1.0 cerrado (`MVP-018` encuesta) |
| **03** | Quién | ROLE-*, F-* | v1.0 cerrado |
| **04** | Cómo (journeys) | FLOW-* | v1.0 cerrado |
| **05** | Qué persiste | DOMAIN-* | v1.1 (`DOMAIN-027`) |
| **06** | Reglas testeables | BR-* | v1.1 (`BR-065`/`066`) |
| **07-prototype-screens** | UI MVP vs prototipo | Tabla Sí/No | v1.1 cerrado (auth + alta incluidos) |
| **07-design-system** | Tokens/componentes/copy UI | — | v1.0 cerrado |
| **08** | Frontend | FE-* | v1.0 cerrado |
| **09** | Backend | BE-* | v1.0 cerrado |
| **10** | Stack | TS-* | v1.0 cerrado (Neon/Drizzle/Better Auth/Resend/R2/Vercel) |
| **11** | Tests | TEST-* | Pendiente (M1) |
| **12** | Plan | RM-*, Mx-NN | M1 activo; M2+ esqueleto |

### 1.1 Mapa intake → doc canónico

| Sección intake | Doc destino |
|----------------|-------------|
| §1 Qué es / por qué | 01 |
| §2 Plataforma y acceso | 02, 03, 08/09/10 |
| §3 Rol Jeny + vistas | 03, 04, 07-prototype |
| §4 Rol Cliente + vistas | 03, 04, 07-prototype |
| §5 Estructura del plan | 05, 06 |
| §6 Valoración | 02, 04, 05, 06 |
| §7 Plan nutricional | 05, 06, 07 |
| §8 Pagos | 02, 04, 05, 06 |
| §9 Reglas clave | 06 |
| §10 Diseño / UX | 07-design, 07-prototype + `_intake/design-handoff/` |
| §11 Fuera de MVP | 02 |

**Insumo:** [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md) — **no binding**; si hay conflicto, ganan 01–12.

## 2. IDs cruzados (llenar al cerrar flujos)

| Tema | Flow | Reglas | Feature | Stack |
|------|------|--------|---------|-------|
| Auth Jeny (usuario/contraseña) | FLOW-001, FLOW-002 | BR-071 | F-001 | TS-013 Better Auth |
| Auth cliente (magic link) / alta por coach | FLOW-003, FLOW-004 | BR-070, BR-071 | F-002, F-003 | TS-013 + TS-014 Resend |
| Plan entrenamiento (bloque→serie) | FLOW-006 | BR-001…004, BR-015 | F-006 | — |
| Registro RIR + cierre de día | FLOW-008 | BR-010…012 | F-015 | — |
| Navegación secuencial / historial | FLOW-008, FLOW-009, FLOW-011, FLOW-018 | BR-010, BR-013, BR-016 | F-014, F-017 | — |
| Biblioteca ejercicios + snapshot | FLOW-005 | BR-020…022 | F-005 | — |
| Plan nutricional (≤6 comidas) | FLOW-007 | BR-030…032 | F-009, F-016 | — |
| Feedback coach al cierre de bloque | FLOW-012, FLOW-011 | BR-040, BR-041 | F-010 | — |
| Pagos manuales + avisos | FLOW-014, FLOW-015 | BR-050…053 | F-011 | — |
| Valoración inicial + seguimiento | FLOW-016, FLOW-017 | BR-060…066 | F-012, F-013 | — |
| Timer descanso (cliente) | FLOW-008 | — (UI 07) | F-015 | — |
| Coach corrige RIR | FLOW-010 | BR-015 | F-006 | — |
| Plan Completo / Comparación | FLOW-013 | — | F-007, F-008 | — |
| Aislamiento cliente | — | BR-072 | — | — |
| Fuera MVP video/pasarela | — | BR-080, BR-081 | — | — |

## 3. Decisiones alineadas (no reabrir sin PR)

Acordadas en discovery. Al cerrar 01/02 se anclan con `VISION-*` / `MVP-*`; al cerrar 06 con `BR-*`.

| Tema | Decisión única |
|------|----------------|
| Producto | App web que centraliza coach–cliente: entrenamiento, nutrición, progreso, feedback y pagos (reemplaza Excel + WhatsApp operativo). |
| Actores MVP | Solo **dos roles**: Jeny (coach/admin) y Cliente. Jeny es la única con permisos administrativos. |
| Plataforma | 100% web; sin apps nativas en MVP. |
| Auth Jeny | Usuario y **contraseña**; cuenta inicial por **seed/script**; **reset por email** (`MVP-017`). |
| Auth Cliente | **Magic link** (sin contraseña); el correo identifica la cuenta del cliente. |
| Alta de clientes | Solo Jeny agrega por correo; **sin** auto-registro del cliente. |
| UX Jeny | Responsive (desktop + mobile). |
| UX Cliente | Diseñada **solo mobile** (uso en gimnasio). |
| Entrenamiento | Jerarquía Bloque → Semana → Día → Ejercicio → Serie. |
| Duración bloque | 4 semanas; la **última es de descarga**. |
| Bloque adaptación | Opcional; asignación **manual** por Jeny (no automática). |
| Avance cliente | **Secuencial** por días completados — no por fecha calendario. |
| Cierre de día | Requiere RIR en **todas** las series del día. |
| Edición Cliente | Solo RIR (+ observación opcional); día actual o pasados; **nunca** futuros. |
| Edición Jeny | Cualquier campo, cualquier día (pasado / actual / futuro), **incluido RIR del cliente** (`ROLE-001`). |
| Valoración seguimiento | Coach **abre** el seguimiento mensual; cliente **completa** inputs; coach puede editar (`ROLE-002`). |
| Biblioteca | Una biblioteca **global** de ejercicios; solo Jeny la modifica. |
| Snapshot | Al asignar: nombre desde biblioteca; **carga/series/reps prescritos en el día** y guardados en `DayExercise` (biblioteca ≠ plan). Status de día **derivado** + `closedAt` (`DOMAIN-021`, `DOMAIN-026`). |
| Videos en app | **Fuera de MVP** — placeholder “Próximamente”; video sigue por WhatsApp. |
| Bloque agotado | Estado claro “esperando el próximo bloque” (no error / vacío). |
| Nutrición | Hasta 6 comidas (Comida 1…6), no desayuno/almuerzo; solo lectura para cliente; independiente del ciclo de bloques. |
| Pagos | Mensuales USD, fecha fija por cliente; marcado **manual**; **próximo a vencer** = ≤ **7 días** antes del cobro; vencido **no** bloquea acceso (solo aviso). |
| Fecha cobro default | Día en que Jeny agregó al cliente; Jeny puede ajustar. |
| Tenancy MVP | **Single-coach** (solo Jeny); sin multi-tenant genérico (`MVP-016`). |
| Valoración | Diagnóstico **una vez** (encuesta `MVP-018` + fotos + medidas + peso); seguimientos mensuales **sin** cuestionario (fotos + medidas + peso). |
| Medidas corporales | 12 circunferencias canónicas (`MVP-014`) + **instructivo in-app** de cómo tomarlas. |
| Resultado diagnóstico | Jeny lo elabora y entrega **fuera de la app** en MVP; la app solo guarda inputs y evolución (`MVP-015`). |
| Feedback in-app | Jeny deja notas al cliente; visibles en historial al final de cada bloque. |
| Nav cliente | Bottom nav: Inicio, Entreno, Nutrición, Historial, Perfil. |
| Idioma UI | Español (es) — convención repo / AGENTS; **sin** i18n multi-idioma en MVP. |
| Moneda / mercado | Cobros en **USD**; clientes pueden estar fuera de Colombia. |
| North Star | % días de entreno cerrados por cliente activo / semana (`VISION-008`). |

## 4. Preguntas abiertas activas

| ID | Doc | Tema |
|----|-----|------|
| TS-OPEN-03 | 10 | Pin de versiones exactas al instalar (majors ya binding en §2). |

~~MVP-OPEN-02~~ → `MVP-018`.  
~~FE-OPEN-02~~ → `TS-013` + `TS-025`.  
~~FE-OPEN-03~~ → `BE-008` (signed URL).  
~~BE-OPEN-01~~ → `TS-011` / `TS-012`.  
~~BE-OPEN-02~~ → `TS-013`.  
~~BE-OPEN-03~~ → `TS-016`.  
~~BE-OPEN-04~~ → `TS-014`.  
~~BE-OPEN-05~~ → `TS-017`.  
~~TS-OPEN-01~~ / ~~TS-OPEN-02~~ → §2 doc 10.  
~~VISION-OPEN-01~~ → `VISION-008`.  
~~MVP-OPEN-01~~ → `MVP-008` (7 días).  
~~MVP-OPEN-03~~ → `MVP-015` (resultado fuera de app).  
~~DOMAIN-OPEN-01~~ → `MVP-016` (single-coach).  
~~AUTH-OPEN-01~~ → `MVP-017` (seed + reset email).  
~~DOMAIN-OPEN-02~~ → `DOMAIN-021` / `DayExercise` snapshot (doc 05).  
`MVP-014` medidas + instructivo.

## 5. Checklist coherencia (PR doc)

- [ ] Nuevo `FLOW-*` citado en 03 (F-*) y 12 si aplica
- [ ] Nuevo `BR-*` en 06 + referencia desde 04/05
- [ ] Cambio entidad → 05 + verificación 04
- [ ] UI prototipo → fila en `07-prototype-screens` + componente en `07-design-system` si aplica
- [ ] Rutas/modales → 08
- [ ] Auth/datos → 09
- [ ] Tests nuevos → 11 + caso literal en 06 si aplica
- [ ] Tras cerrar un doc 01–07: actualizar §1 (estado fill), §2 si hay IDs, §3/§4 si cambió una decisión u OPEN
- [ ] Si el intake y un doc canónico divergen → **gana el doc**; actualizar o archivar intake

## 6. Referencias

- [`AGENTS.md`](../../AGENTS.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md) (insumo, no contrato)
