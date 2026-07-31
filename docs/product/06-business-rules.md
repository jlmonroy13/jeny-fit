# 06 · Business rules

> **Estado:** v1.1 — `BR-065`/`066` encuesta; copy = `MVP-018`.

## 1. Objetivo y audiencia

Reglas testeables (`BR-*`) para **Jeny Fit**. Cada BR debe poder convertirse en un test (unit/integration) según doc 11.

## 2. Convenciones

- ID `BR-NNN` + caso literal **Given / When / Then**
- Citar `FLOW-*` / `DOMAIN-*` / `MVP-*` cuando aplique
- Reglas de UI pura (timer vibra, placeholder copy) → preferir doc 07; aquí solo si son assertables en dominio/API

## 3. Reglas por dominio

### 3.1 Entrenamiento — estructura

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-001 | Un bloque tiene **exactamente 4** semanas | Given un `TrainingBlock` When se valida/persiste Then existen semanas con `weekIndex` 1..4 |
| BR-002 | La **semana 4** de cada bloque es de descarga (`isDeload = true`) | Given bloque creado When se materializan semanas Then `weekIndex=4` tiene `isDeload=true` y 1–3 `false` |
| BR-003 | Bloque de adaptación es **opcional** y solo si el coach lo marca | Given alta de cliente When `needsAdaptationBlock=false` Then no se exige bloque adaptación automático |
| BR-004 | El nº de días por semana es **variable** por cliente | Given dos clientes When se definen semanas Then pueden diferir en cantidad de `TrainingDay` |

### 3.2 Entrenamiento — avance y RIR

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-010 | El día “actual” es el **siguiente incompleto** en orden secuencial (bloque→semana→día), no el día calendario | Given hoy es miércoles y el pendiente es el día etiquetado “Lunes” When el cliente abre Entreno Then se muestra ese día pendiente |
| BR-011 | Un día solo se **cierra** si todas sus series tienen `rir` no null | Given un día con una serie sin RIR When se intenta cerrar Then operación rechazada y `closedAt` sigue null |
| BR-012 | Tras cerrar un día, el siguiente pendiente es el próximo en secuencia | Given día N cerrado When se consulta día actual Then es día N+1 si existe |
| BR-013 | Cliente puede editar RIR (+ observación) solo en día **actual o pasado** | Given día futuro When cliente intenta set RIR Then rechazado |
| BR-014 | Cliente **no** puede editar estructura del plan (cargas, ejercicios, días) | Given sesión client When muta `DayExercise.load` Then rechazado |
| BR-015 | Coach puede editar **cualquier** campo del plan y RIR en cualquier día | Given sesión coach When edita día pasado/futuro (carga o RIR) Then permitido (`ROLE-001`) |
| BR-016 | Si no hay día pendiente (bloque agotado sin siguiente) Then estado **“esperando próximo bloque”** (no error vacío) | Given último día cerrado y sin bloque siguiente When cliente abre Inicio/Entreno Then respuesta/UI de espera (`FLOW-018`) |

### 3.3 Biblioteca y snapshot

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-020 | Biblioteca de ejercicios es **global** (una) y solo coach escribe | Given sesión client When create library item Then 403/rechazo |
| BR-021 | Cambiar/eliminar (o `active=false`) un ítem de biblioteca **no** altera `DayExercise` ya persistidos | Given día con `nameSnapshot="Sentadilla"` When se renombra el library item Then el día sigue mostrando "Sentadilla" |
| BR-022 | Al asignar un ítem de biblioteca a un día, el coach **prescribe** carga/series/reps para ese día; se persiste un snapshot en `DayExercise` (nombre desde biblioteca + load/targetSets/targetReps prescritos + libraryItemId). La biblioteca **no** guarda series/reps por defecto. | Given coach elige "Sentadilla" y prescribe 3×8 @ 60kg When se crea `DayExercise` Then `nameSnapshot`/`load`/`targetSets`/`targetReps`/`libraryItemId` poblados; Given solo library item When se inspecciona Then no tiene campos de series/reps de plan |

### 3.4 Nutrición

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-030 | Plan nutricional tiene como máximo **6** comidas (`mealIndex` 1..6) | Given plan When se intenta mealIndex=7 Then rechazo |
| BR-031 | Cliente solo **lee** nutrición | Given sesión client When update Meal Then rechazo |
| BR-032 | Actualizar nutrición **no** requiere ni bloquea el ciclo de bloques | Given bloque en curso When coach edita nutrición Then OK sin cambiar TrainingBlock |

### 3.5 Feedback

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-040 | Solo coach crea/edita `BlockFeedback` | Given client When POST feedback Then rechazo |
| BR-041 | Cliente puede **leer** feedback de sus bloques | Given feedback en bloque del cliente When client GET Then 200 con body |

### 3.6 Pagos

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-050 | Estado **próximo a vencer** si faltan ≤ **7** días para el ancla de cobro y el ciclo no está pagado | Given ancla en 10 días y hoy = ancla−5 y sin pago del período When se calcula estado Then `upcoming` |
| BR-051 | Estado **vencido** si pasó la fecha de cobro del ciclo y no hay `PaymentRecord` que lo cubra | Given ancla pasada sin pago When se calcula estado Then `overdue` |
| BR-052 | Cliente **vencido** conserva acceso completo (sesión y features) | Given client overdue When accede Entreno Then permitido; además se expone flag/aviso de atraso |
| BR-053 | Solo coach marca pagado / ajusta `billingAnchorDay` | Given client When mark paid Then rechazo |

### 3.7 Valoración

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-060 | Solo puede existir **un** Assessment `initial` por cliente | Given initial ya submitted When se crea otro initial Then rechazo |
| BR-061 | Follow-up mensual **no** incluye `SurveyAnswer` | Given assessment type=`monthly_followup` When se intenta guardar SurveyAnswer Then rechazo |
| BR-062 | Follow-up lo **abre** el coach; cliente completa fotos/medidas/peso | Given solo client When create monthly Assessment Then rechazo; Given coach opens Then client puede submit measurements |
| BR-063 | Medidas de un assessment usan el catálogo fijo de **12** métricas (`MVP-014`) | Given metric desconocida When save BodyMeasurement Then rechazo |
| BR-064 | MVP no persiste entidad de Resultado diagnóstico | Given cualquier rol When create DiagnosticReport entity Then no existe endpoint/modelo (`MVP-015`) |
| BR-065 | Si alguna respuesta de salud Q1–10 es SI, la UI/API expone flag `needsMedicalClearanceAdvice=true` (aviso médico); **no** bloquea submit en MVP | Given Q5=SI When submit initial assessment Then persistido OK y flag aviso true |
| BR-066 | `SurveyAnswer.questionKey` debe pertenecer al catálogo `MVP-018`; keys desconocidas se rechazan | Given key=`foo` When save SurveyAnswer Then rechazo |

### 3.8 Auth y acceso

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-070 | Cliente no se auto-registra: magic link solo si el email ya es `User` role=client | Given email desconocido When request magic link Then no se crea User |
| BR-071 | Coach autentica con password; client no tiene `passwordHash` usable | Given client user When password login Then rechazo |
| BR-072 | Client solo lee/escribe **su** `clientProfileId` | Given client A When GET profile B Then 403 |

### 3.9 MVP explícitamente ausente

| ID | Regla | Test literal |
|----|-------|--------------|
| BR-080 | No hay upload de video por serie | Given set When attach video Then no soportado / 404 feature |
| BR-081 | No hay pasarela de pago | Given client When pay online Then no endpoint de cobro integrado |

## 4. Decisiones cerradas (historial)

| ID | Decisión |
|----|----------|
| BR-SET-001 | Set MVP = BR-001…004, 010…016, 020…022, 030…032, 040…041, 050…053, 060…066, 070…072, 080…081 |
| — | Literales alineados a intake §9 + `MVP-008` (7 días) + roles/domain docs |

## 5. Mapa rápido Flow → BR

| Flow | BRs principales |
|------|-----------------|
| FLOW-003, 004 | BR-070, BR-071 |
| FLOW-005, 006 | BR-001…004, BR-020…022, BR-015 |
| FLOW-007 | BR-030…032 |
| FLOW-008, 009, 018 | BR-010…014, BR-016 |
| FLOW-010 | BR-015 |
| FLOW-011, 012 | BR-040, BR-041 |
| FLOW-014, 015 | BR-050…053 |
| FLOW-016, 017 | BR-060…066 |

## 6. Referencias

- [`00-coherence-index.md`](00-coherence-index.md)
- [`04-user-flows.md`](04-user-flows.md)
- [`05-domain-model.md`](05-domain-model.md)
- [`02-scope-mvp.md`](02-scope-mvp.md)
- [`11-testing-strategy.md`](11-testing-strategy.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md) §9
