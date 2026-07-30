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
| **01** | Por qué | VISION-* | Pendiente |
| **02** | Qué entra MVP | MVP-* | Pendiente |
| **03** | Quién | ROLE-*, F-* | Pendiente |
| **04** | Cómo (journeys) | FLOW-* | Pendiente |
| **05** | Qué persiste | DOMAIN-* | Pendiente |
| **06** | Reglas testeables | BR-* | Pendiente |
| **07-prototype-screens** | UI MVP vs prototipo | Tabla Sí/No | Pendiente |
| **07-design-system** | Tokens/componentes/copy UI | — | Pendiente |
| **08** | Frontend | FE-* | Pendiente (M1) |
| **09** | Backend | BE-* | Pendiente (M1) |
| **10** | Stack | TS-* | Pendiente (M1-04) |
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
| §10 Diseño / UX | 07-design, 07-prototype |
| §11 Fuera de MVP | 02 |

**Insumo:** [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md) — **no binding**; si hay conflicto, ganan 01–12.

## 2. IDs cruzados (llenar al cerrar flujos)

| Tema | Flow | Reglas | Feature | Stack |
|------|------|--------|---------|-------|
| Auth Jeny (usuario/contraseña) | _(04)_ | _(06)_ | _(03)_ | _(10 — password)_ |
| Auth cliente (magic link) / alta por coach | _(04)_ | _(06)_ | _(03)_ | _(10 — magic link)_ |
| Plan entrenamiento (bloque→serie) | _(04)_ | _(06)_ | _(03)_ | — |
| Registro RIR + cierre de día | _(04)_ | _(06)_ | _(03)_ | — |
| Navegación secuencial / historial | _(04)_ | _(06)_ | _(03)_ | — |
| Biblioteca ejercicios + snapshot | _(04)_ | _(06)_ | _(03)_ | — |
| Plan nutricional (≤6 comidas) | _(04)_ | _(06)_ | _(03)_ | — |
| Feedback coach al cierre de bloque | _(04)_ | _(06)_ | _(03)_ | — |
| Pagos manuales + avisos | _(04)_ | _(06)_ | _(03)_ | — |
| Valoración inicial + seguimiento | _(04)_ | _(06)_ | _(03)_ | — |
| Timer descanso (cliente) | _(04)_ | — | _(03)_ | — |

## 3. Decisiones alineadas (no reabrir sin PR)

Acordadas en discovery. Al cerrar 01/02 se anclan con `VISION-*` / `MVP-*`; al cerrar 06 con `BR-*`.

| Tema | Decisión única |
|------|----------------|
| Producto | App web que centraliza coach–cliente: entrenamiento, nutrición, progreso, feedback y pagos (reemplaza Excel + WhatsApp operativo). |
| Actores MVP | Solo **dos roles**: Jeny (coach/admin) y Cliente. Jeny es la única con permisos administrativos. |
| Plataforma | 100% web; sin apps nativas en MVP. |
| Auth Jeny | Usuario y **contraseña** (único rol con este método en MVP). |
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
| Edición Jeny | Cualquier campo, cualquier día (pasado / actual / futuro). |
| Biblioteca | Una biblioteca **global** de ejercicios; solo Jeny la modifica. |
| Snapshot | Cambios en biblioteca **no** alteran días ya registrados (copia histórica). |
| Videos en app | **Fuera de MVP** — placeholder “Próximamente”; video sigue por WhatsApp. |
| Bloque agotado | Estado claro “esperando el próximo bloque” (no error / vacío). |
| Nutrición | Hasta 6 comidas (Comida 1…6), no desayuno/almuerzo; solo lectura para cliente; independiente del ciclo de bloques. |
| Pagos | Mensuales, fecha fija por cliente; marcado **manual** (sin pasarela); vencido **no** bloquea acceso (solo aviso). |
| Fecha cobro default | Día en que Jeny agregó al cliente; Jeny puede ajustar. |
| Valoración | Diagnóstico **una vez** (preguntas + fotos + medidas + peso); seguimientos mensuales **sin** cuestionario (fotos + medidas + peso). |
| Feedback in-app | Jeny deja notas al cliente; visibles en historial al final de cada bloque. |
| Nav cliente | Bottom nav: Inicio, Entreno, Nutrición, Historial, Perfil. |
| Idioma UI | Español (es-CO) — convención repo / AGENTS. |

## 4. Preguntas abiertas activas

| ID | Doc | Tema |
|----|-----|------|
| VISION-OPEN-01 | 01 | North Star Metric concreta (qué medimos para éxito del MVP). |
| MVP-OPEN-01 | 02 | Umbral exacto de estado pago **“próximo a vencer”** (¿N días antes de la fecha de cobro?). |
| MVP-OPEN-02 | 02 / 06 | Contenido canónico de la encuesta diagnóstica (preguntas cerradas/abiertas) y lista de medidas corporales. |
| DOMAIN-OPEN-01 | 05 | ¿Producto **single-coach** (solo Jeny) en MVP, o multi-tenant genérico desde el inicio? |
| DOMAIN-OPEN-02 | 05 | Campos exactos del snapshot de ejercicio en un día (nombre, músculo, media, …). |
| AUTH-OPEN-01 | 03 / 09 | Cómo se provisiona la cuenta inicial de Jeny (seed/script, env, invite) y recuperación de contraseña. |
| TS-OPEN-* | 10 | Proveedor auth (password coach + magic link clientes), DB/ORM, hosting — cerrar en M1-04 (no en este fill de producto). |

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
