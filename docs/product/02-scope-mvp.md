# 02 · Scope MVP

> **Estado:** v1.0 — scope MVP cerrado; encuesta canónica `MVP-018` (ex-`MVP-OPEN-02`).

## 1. Objetivo y audiencia

Qué entra y qué no en el MVP de **Jeny Fit**. Binding para cortar features; detalle de journeys/reglas en 03–06.

## 2. MVP en una frase

Web donde **Jeny** gestiona clientes, planes (entrenamiento + nutrición), biblioteca, progreso, feedback, valoración y pagos en **USD**; y el **cliente** (mobile) consume su plan, registra RIR y ve historial/avisos — sin video in-app, sin pasarela de pago y sin auto-registro.

### 2.1 Decisiones binding (desde doc 01)

| ID | Decisión |
|----|----------|
| VISION-001 | Clientes internacionales · UI español · cobros **USD** · sin i18n multi-idioma en MVP |
| VISION-002 | 100% web; sin apps nativas |
| VISION-003 | Roles: coach/admin (Jeny) + cliente |
| VISION-004 | Auth: Jeny = usuario/contraseña; cliente = magic link |
| VISION-005 | Alta de clientes solo por Jeny (correo) |
| VISION-006 / 007 | JTBD coach y cliente (ver doc 01) |

### 2.2 Decisiones de producto (confirmadas)

| ID | Decisión |
|----|----------|
| MVP-001 | **Entrenamiento completo:** Bloque → Semana → Día → Ejercicio → Serie; bloque = 4 semanas (última descarga); bloque de adaptación opcional (manual). |
| MVP-002 | **Avance secuencial** del cliente (por días cerrados), no por fecha calendario. |
| MVP-003 | Cliente registra **RIR** (+ observación opcional); cierre de día solo con RIR en todas las series; edición RIR en día actual/pasados, no futuros. |
| MVP-004 | Jeny puede editar **cualquier** campo del plan en cualquier día (pasado/actual/futuro). |
| MVP-005 | **Biblioteca global** de ejercicios (solo Jeny); snapshot histórico en días ya usados. |
| MVP-006 | **Plan nutricional** ≤6 comidas (Comida 1…6), cantidades sugeridas; solo lectura para cliente; independiente del ciclo de bloques. |
| MVP-007 | **Plan Completo** + **Comparación/progreso** en panel Jeny; feedback in-app al cierre de bloque (visible en historial del cliente). |
| MVP-008 | **Pagos** mensuales USD, fecha fija por cliente, marcado manual; estados: **al día** / **próximo a vencer** (≤ **7 días** antes de la fecha de cobro) / **vencido**; vencido **no** bloquea acceso (solo aviso). |
| MVP-009 | **Valoración:** diagnóstico inicial una vez (encuesta `MVP-018` + fotos + medidas + peso); seguimientos mensuales sin cuestionario (fotos + medidas + peso). |
| MVP-010 | **Timer de descanso** en día de entreno (2–6 min; pausar / saltar / extender; sonido + vibración al terminar). |
| MVP-011 | Video por serie: **placeholder “Próximamente”** (WhatsApp fuera de app). |
| MVP-012 | UX: Jeny responsive; cliente **mobile-only** con bottom nav (Inicio, Entreno, Nutrición, Historial, Perfil). |
| MVP-013 | Estado “**esperando el próximo bloque**” cuando el bloque actual terminó y no hay siguiente planeado. |
| MVP-014 | **Medidas corporales canónicas** (12 circunferencias, ver §3.1) + **instructivo in-app** de cómo tomarse cada una (referencia visual). |
| MVP-015 | Tras la valoración inicial, Jeny elabora un **Resultado diagnóstico** **fuera de la app** (PDF/canal actual). La app **solo** captura y muestra inputs de valoración (evolución fotos/medidas/peso). Generación/lectura in-app del informe → **post-MVP**. |
| MVP-016 | Producto **single-coach** en MVP: solo Jeny como admin; sin multi-tenant / multi-coach genérico. |
| MVP-017 | Cuenta inicial de Jeny: **seed/script** (credenciales en secrets/env). Recuperación de contraseña: **reset por email**. |

## 3. Dentro del MVP (In scope)

### Auth y cuentas
- [ ] Login Jeny (usuario + contraseña); provisioning inicial vía seed (`MVP-017`); reset por email
- [ ] Login cliente (magic link)
- [ ] Alta de cliente por correo desde panel Jeny (sin auto-registro)

### Panel Jeny
- [ ] Dashboard de clientes (bloque/semana/día actual + estado de pago)
- [ ] Perfil del cliente: Nutrición, Entrenamiento (editor), Plan Completo, Comparación/Progreso, Pagos, Valoración
- [ ] Editor plan nutricional (≤6 comidas)
- [ ] Editor plan de entrenamiento (incl. duplicar semana/día)
- [ ] Biblioteca global de ejercicios (CRUD Jeny)
- [ ] Feedback in-app al cliente (por bloque)
- [ ] Pagos: marcar pagado, historial, ajustar fecha de cobro (USD)
- [ ] Valoración: diagnóstico + seguimientos mensuales; captura de las **12 medidas** + peso + talla + fotos (+ cuestionario inicial); **evolución** visible para Jeny
- [ ] **Instructivo de medidas** in-app (cómo colocarse la cinta en cada circunferencia)
- [ ] ~~Editor / visor del Resultado diagnóstico PDF in-app~~ → fuera de MVP (`MVP-015`)

### App cliente (mobile)
- [ ] Inicio (día pendiente + avisos)
- [ ] Entreno (RIR, observación, timer, placeholder video, cerrar día)
- [ ] Nutrición (solo lectura)
- [ ] Historial (pasados editables en RIR; futuros solo vista; feedback al fin de bloque)
- [ ] Perfil (cuenta, estado de pago, cerrar sesión)
- [ ] Valoración / seguimiento: ingreso de medidas con acceso al **instructivo** (cuando el flujo lo requiera)

### 3.1 Medidas corporales canónicas (`MVP-014`)

Unidad: circunferencia (cm). Lista fija del MVP:

| # | Medida |
|---|--------|
| 1 | Circunferencia cuello |
| 2 | Circunferencia hombros |
| 3 | Circunferencia del pecho |
| 4 | Circunferencia cintura |
| 5 | Circunferencia brazo relajado |
| 6 | Circunferencia brazo contraído |
| 7 | Circunferencia de la muñeca |
| 8 | Circunferencia de la cadera |
| 9 | Circunferencia del muslo medio |
| 10 | Circunferencia del muslo alto |
| 11 | Circunferencia de la rodilla |
| 12 | Circunferencia de la pantorrilla |

**Instructivo:** la app debe mostrar, por cada medida, guía visual de cómo tomarla. Insumo de referencia:

- [`_intake/medidas-instructivo/01-cuello-hombros-pecho-cintura-brazo.png`](_intake/medidas-instructivo/01-cuello-hombros-pecho-cintura-brazo.png)
- [`_intake/medidas-instructivo/02-muneca-cadera-muslo-rodilla-pantorrilla.png`](_intake/medidas-instructivo/02-muneca-cadera-muslo-rodilla-pantorrilla.png)

Detalle de pantallas/flujo → docs 04 / 07-prototype.

### 3.2 Resultado diagnóstico (`MVP-015`) — entrega fuera de la app en MVP

Después de recibir valoración inicial (cuestionario + fotos + medidas + peso/talla), Jeny elabora un **Resultado diagnóstico** y lo entrega al cliente **por fuera de la app** (p. ej. PDF / canal actual).

**En el MVP la app no genera ni aloja ese informe.** Sí debe persistir los **inputs** que lo alimentan y permitir a Jeny ver la **evolución** (fotos, medidas, peso) en el perfil del cliente.

Insumo de ejemplo (contenido de negocio de referencia, no UI):

- [`_intake/resultado-diagnostico/`](_intake/resultado-diagnostico/)

Estructura del documento que Jeny produce hoy (referencia para post-MVP in-app):

| Bloque | Contenido |
|--------|-----------|
| Estado inicial | Nombre, fecha, edad, peso, talla, IMC, % grasa estimado, masa magra estimada, TMB, calorías mantenimiento, observaciones |
| Recomendaciones | Composición corporal, nutrición, entrenamiento (RIR / sobrecarga), consideraciones por antecedentes (lesiones / salud) |
| Macros estimados | Proteína / grasa / carbohidrato (g, kcal, %) coherentes con kcal de mantenimiento |
| Conclusión | Texto narrativo de Jeny |

**Datos base que la valoración in-app debe poder alimentar** (además de las 12 medidas): peso, talla, edad (vía `birthDate`), sexo, teléfono/dirección/ciudad/tipo de sangre (perfil), fotos, respuestas `MVP-018`.

### 3.3 Encuesta diagnóstica canónica (`MVP-018`)

Insumo: [`_intake/encuesta-diagnostica/`](_intake/encuesta-diagnostica/). Solo en Assessment `initial` (`BR-061`).

#### A. Datos personales (perfil + assessment — no son `questionKey`)

| Campo UI | Persistencia |
|----------|--------------|
| Nombre | `User.name` |
| Correo | `User.email` (ya del alta) |
| Teléfono, dirección, ciudad, tipo de sangre | `ClientProfile` (`DOMAIN-027`) |
| Fecha | `Assessment.createdAt` / `submittedAt` |
| Edad | Derivada de `ClientProfile.birthDate` (capturar birthDate o edad→approx solo si se acuerda en UI; **preferir birthDate**) |
| Estatura | `ClientProfile.heightCm` |
| Peso | `Assessment.weightKg` |
| Sexo | `ClientProfile.sex` (si se captura en el flujo; puede no estar en el Excel original) |

#### B. Preguntas de salud Q1–10 (`yes_no` + `detail?` si SI)

Copy UI (es). Keys estables:

| # | `questionKey` | Pregunta |
|---|---------------|----------|
| 1 | `health_heart_disease` | ¿Le han diagnosticado alguna enfermedad cardiaca donde se le recomiende actividad física supervisada? |
| 2 | `health_chest_pain_activity` | ¿Tiene dolores en el pecho producidos por la actividad física? |
| 3 | `health_chest_pain_month` | ¿Ha notado dolor en el pecho durante el último mes? |
| 4 | `health_dizziness` | ¿Tiende a perder el conocimiento o el equilibrio como resultado de mareos? |
| 5 | `health_bp_meds` | ¿Alguna vez un médico le ha prescrito medicación para la presión arterial o por algún otro problema cardiovascular? |
| 6 | `health_bone_joint` | ¿Tiene usted alguna alteración ósea o muscular que se pueda agravar con la actividad física propuesta? |
| 7 | `health_hormonal_metabolic` | ¿Tiene actualmente algún problema hormonal o metabólico? |
| 8 | `health_psychiatric` | ¿Le han diagnosticado alguna enfermedad psiquiátrica o usa algún medicamento relacionado? |
| 9 | `health_gi` | ¿Padece alguna enfermedad gástrica o intestinal? |
| 10 | `health_other_barrier` | ¿Tiene conocimiento, por experiencia propia o por indicación de algún médico, de alguna otra razón de tipo físico o psicológico que le impida realizar ejercicio físico sin supervisión médica? |

**Aviso UI (`BR-065`):** si alguna Q1–10 = SI → mostrar: *“Si ha respondido SI a alguna de estas preguntas se le indica que debe visitar primero a su médico.”* No bloquea el envío en MVP (Jeny decide fuera de app).

#### C. Actividad y logística Q11–13

| # | `questionKey` | Tipo | Opciones / notas |
|---|---------------|------|------------------|
| 11 | `activity_level` | single_choice | `sedentary` · `beginner` · `intermediate` · `advanced` (copy: Sedentario / Principiante 3–6 meses / Intermedio 7–12 meses / Avanzado >1 año) |
| 12 | `training_availability` | multi_choice | `morning` (5:00–11:59) · `midday` (12:00–13:59) · `afternoon` (14:00–18:59) · `evening` (19:00–23:59) |
| 13 | `training_duration` | single_choice | `30m` · `1h` · `2h` |
| 13b | `training_duration_note` | free_text | “OBSERVACION” opcional |

**Aviso UI:** si edad > 65 **y** `activity_level=sedentary` → indicar chequeo médico previo (informativo).

#### D. Objetivos y nutrición Q14–20

| # | `questionKey` | Tipo | Opciones / notas |
|---|---------------|------|------------------|
| 14 | `goal` | multi_choice | `health` · `sport_functional` · `aesthetic` · `muscle_gain` · `fat_loss` · `maintenance` |
| 14b | `goal_body_focus` | free_text | “¿Qué parte de tu cuerpo quieres trabajar más?” |
| 15 | `food_restriction` | yes_no + detail | Alergia / no puede / no le gusta → `food_restriction_detail` |
| 16 | `current_diet` | structured_json | Comidas: desayuno, merienda_am, almuerzo, merienda_pm, cena — cada una `{ text, time? }`; + `condiments_oil` |
| 17 | `food_likes` | structured_json | `{ proteins?, carbs?, fats? }` (alimentos que más le gustan) |
| 18 | `daily_routine` | free_text | Reseña rutina diaria |
| 19 | `weekend_routine` | free_text | Reseña fin de semana |
| 20 | `current_training` | free_text | Entrenamiento actual |

#### E. Fuera de encuesta in-app

| Campo Excel | Destino MVP |
|-------------|-------------|
| CONCLUSIÓNES | Fuera de app (`MVP-015`) |
| RECOMENDACIONES | Fuera de app (`MVP-015`) |

#### F. Shape de `SurveyAnswer.value`

| `answerType` | Uso |
|--------------|-----|
| `yes_no` | boolean (+ detail en key hermana `*_detail` o campo `detail` en JSON) |
| `single_choice` | string enum |
| `multi_choice` | string[] |
| `free_text` | string |
| `structured_json` | objeto tipado (dieta / likes) |

Keys desconocidas → rechazo (`BR-066`).

## 4. Fuera del MVP (Out of scope)

- Subida real de **video** por serie (placeholder sí)
- **Pasarela** de pago / cobro automático integrado
- **Auto-registro** de clientes
- Apps **nativas** (iOS/Android)
- **i18n** multi-idioma (UI solo español)
- Multi-coach / marketplace / white-label / **multi-tenant genérico** (`MVP-016` — single-coach en MVP)
- Chat in-app / reemplazo total de WhatsApp
- Recetas nutricionales estrictas o scheduling por horario de comida
- Automatización de sobrecarga progresiva (Jeny diseña el siguiente bloque manualmente)
- **Resultado diagnóstico in-app** (editor Jeny + vista cliente / PDF generado por la app) — `MVP-015`

## 5. Criterios de “MVP listo” (Definition of Done)

- [ ] Jeny puede dar de alta un cliente, armar bloque + nutrición, y el cliente entra por magic link
- [ ] Cliente cierra al menos un día completo (RIR en todas las series) y ve historial/estados
- [ ] Jeny ve Plan Completo y Comparación/progreso con datos reales del cliente
- [ ] Jeny marca un pago y el cliente ve aviso si está vencido (sin perder acceso)
- [ ] Valoración inicial + al menos un seguimiento mensual (12 medidas + peso + fotos) registrables y visibles para Jeny (**sin** exigir informe diagnóstico in-app)
- [ ] Instructivo de medidas accesible al capturar circunferencias
- [ ] Placeholder de video y estado “esperando próximo bloque” verificados manualmente
- [ ] Docs 03–07 coherentes con este scope; sin features out-of-scope implementadas

## 6. Fases posteriores

| Fase | Qué |
|------|-----|
| Post-MVP | **Resultado diagnóstico in-app** (Jeny edita / cliente lee; posible exportación PDF) |
| Post-MVP | Video por serie in-app |
| Post-MVP | Pasarela / cobro integrado (USD) |
| Post-MVP | i18n (p. ej. EN) si la demanda de clientes lo justifica |
| Post-MVP | Multi-coach / tenant (si se valida el modelo) |
| Post-MVP | Automatizaciones de planeación / recordatorios avanzados |

## 7. MVP y milestones

Nombres M2+ **tentativos** hasta retrospectiva M1 / `roadmap-detail` (RM-003). No son issues binding aún.

| Milestone | Entrega MVP |
|-----------|-------------|
| M1 | Foundation (docs, CI, stack) — sin features de negocio |
| M2 | Auth + alta clientes + esqueleto roles (Jeny password / cliente magic link) |
| M3 | Biblioteca + plan de entrenamiento (editor Jeny) |
| M4 | App cliente: día de entreno, RIR, timer, cierre secuencial |
| M5 | Historial, Plan Completo, comparación/progreso, feedback |
| M6 | Nutrición |
| M7 | Pagos (manual, USD) + avisos |
| M8 | Valoración (inputs + evolución; **sin** informe diagnóstico in-app) |
| M9 | Hardening / DoD MVP / pulido UX |

## 8. Historial / `MVP-OPEN-*`

| ID | Tema | Estado |
|----|------|--------|
| MVP-OPEN-01 | Umbral “próximo a vencer” | **cerrada** → **7 días** antes de la fecha de cobro (`MVP-008`) |
| MVP-OPEN-02 | Contenido canónico de la encuesta diagnóstica | **cerrada** → `MVP-018` + §3.3 |
| MVP-OPEN-03 | Canal del Resultado diagnóstico | **cerrada** → fuera de la app en MVP (`MVP-015`); in-app = post-MVP |
| VISION-OPEN-01 | North Star Metric (doc 01) | **cerrada** → VISION-008 |
| DOMAIN-OPEN-01 | Single-coach vs multi-tenant | **cerrada** → single-coach (`MVP-016`) |
| AUTH-OPEN-01 | Provisioning cuenta Jeny + recuperación de contraseña | **cerrada** → seed/script + reset por email (`MVP-017`) |
| DOMAIN-OPEN-02 | Snapshot de ejercicio en un día | **cerrada (mínimo)** → nombre, carga, series, reps objetivo, id biblioteca si existe (detalle en doc 05) |

## 9. Referencias

- [`00-coherence-index.md`](00-coherence-index.md)
- [`01-product-vision.md`](01-product-vision.md)
- [`12-roadmap-milestones.md`](12-roadmap-milestones.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md)
- [`_intake/medidas-instructivo/`](_intake/medidas-instructivo/) (guía visual de circunferencias)
- [`_intake/encuesta-diagnostica/`](_intake/encuesta-diagnostica/) (insumo encuesta `MVP-018`)
- [`_intake/resultado-diagnostico/`](_intake/resultado-diagnostico/) (ejemplo de informe; entrega fuera de app en MVP)
