# 04 · User flows

> **Estado:** v1.0 — journeys MVP `FLOW-001`…`018`. Pendiente enlace `BR-*` (doc 06) y copy encuesta (`MVP-OPEN-02`).

## 1. Objetivo y audiencia

Journeys end-to-end (`FLOW-*`) para agents y revisión humana. Binding de secuencia UX; reglas literales en 06.

## 2. Convenciones

- ID estable `FLOW-NNN`
- Incluir: actor, precondiciones, pasos, errores, resultado
- Citar `F-*` (doc 03); `BR-*` cuando existan (doc 06)

## 3. Mapa de flujos MVP

| ID | Nombre | Actor | Features |
|----|--------|-------|----------|
| FLOW-001 | Login coach | ROLE-coach | F-001 |
| FLOW-002 | Reset password coach | ROLE-coach | F-001 |
| FLOW-003 | Login cliente (magic link) | ROLE-client | F-002 |
| FLOW-004 | Alta de cliente | ROLE-coach | F-003, F-004 |
| FLOW-005 | Gestionar biblioteca de ejercicios | ROLE-coach | F-005 |
| FLOW-006 | Armar / editar plan de entrenamiento | ROLE-coach | F-006, F-007 |
| FLOW-007 | Editar plan nutricional | ROLE-coach | F-009 |
| FLOW-008 | Ejecutar día de entreno (RIR + cerrar) | ROLE-client | F-014, F-015 |
| FLOW-009 | Editar RIR en día pasado | ROLE-client | F-017 |
| FLOW-010 | Coach corrige RIR / plan de un día | ROLE-coach | F-006, ROLE-001 |
| FLOW-011 | Navegar historial + leer feedback | ROLE-client | F-017, F-010 |
| FLOW-012 | Escribir feedback de bloque | ROLE-coach | F-010 |
| FLOW-013 | Ver Plan Completo / Comparación | ROLE-coach | F-007, F-008 |
| FLOW-014 | Gestionar pagos | ROLE-coach | F-011 |
| FLOW-015 | Cliente ve estado de pago / aviso | ROLE-client | F-011, F-018 |
| FLOW-016 | Valoración inicial (diagnóstico) | ROLE-client (+ coach) | F-012, F-013 |
| FLOW-017 | Seguimiento mensual de valoración | ROLE-coach abre · ROLE-client completa | F-012, F-013, ROLE-002 |
| FLOW-018 | Estado “esperando próximo bloque” | ROLE-client | F-014, MVP-013 |

## 4. Flujos detallados

### FLOW-001 · Login coach

**Actor:** ROLE-coach  
**Precondiciones:** Cuenta provisionada (`MVP-017`).  
**Pasos:**

1. Abre pantalla de login coach.
2. Ingresa usuario y contraseña.
3. Sistema valida y crea sesión.
4. Redirige al dashboard de clientes (F-004).

**Errores:** Credenciales inválidas → mensaje; sin lockout complejo requerido en MVP.  
**Resultado:** Sesión coach activa.  
**Refs:** F-001, MVP-017

### FLOW-002 · Reset password coach

**Actor:** ROLE-coach  
**Precondiciones:** Conoce su email de cuenta.  
**Pasos:**

1. Solicita “olvidé mi contraseña”.
2. Ingresa email → sistema envía link/token de reset.
3. Define nueva contraseña.
4. Puede iniciar sesión (FLOW-001).

**Errores:** Email desconocido → mensaje genérico (no filtrar existencia si se prefiere seguridad).  
**Resultado:** Contraseña actualizada.  
**Refs:** F-001, MVP-017

### FLOW-003 · Login cliente (magic link)

**Actor:** ROLE-client  
**Precondiciones:** Cliente ya dado de alta por correo (FLOW-004).  
**Pasos:**

1. Abre login cliente e ingresa su correo.
2. Recibe magic link por email y lo abre.
3. Sistema crea sesión y redirige a Inicio (F-014).

**Errores:** Correo no registrado → no se crea cuenta (sin auto-registro); mensaje adecuado. Link expirado → solicitar uno nuevo.  
**Resultado:** Sesión cliente activa.  
**Refs:** F-002, VISION-005

### FLOW-004 · Alta de cliente

**Actor:** ROLE-coach  
**Precondiciones:** Sesión coach.  
**Pasos:**

1. Desde dashboard, agrega cliente por **correo**.
2. Opcional: marca si necesita **bloque de adaptación** (manual).
3. Define o confirma **fecha de cobro** (default: día del alta; editable).
4. Cliente queda habilitado para FLOW-003.

**Errores:** Correo duplicado → rechazo.  
**Resultado:** Cliente existe; puede autenticarse.  
**Refs:** F-003, F-004, MVP-001 (adaptación), MVP-008

### FLOW-005 · Gestionar biblioteca de ejercicios

**Actor:** ROLE-coach  
**Pasos:** Crear / editar ejercicios de la biblioteca **global**.  
**Errores:** N/A crítico MVP.  
**Resultado:** Catálogo actualizado; **no** reescribe snapshots de días ya guardados.  
**Refs:** F-005, MVP-005

### FLOW-006 · Armar / editar plan de entrenamiento

**Actor:** ROLE-coach  
**Precondiciones:** Cliente existe; ejercicios en biblioteca.  
**Pasos:**

1. Abre perfil del cliente → Entrenamiento.
2. Crea/edita Bloque → Semana → Día → Ejercicio → Series (carga, reps).
3. Elige ejercicios **solo** desde biblioteca (no texto libre).
4. Puede **duplicar** semana/día como base.
5. Puede editar cualquier día (pasado/actual/futuro).

**Errores:** Día sin ejercicios → permitido o warning (definir en UI); ejercicio borrado de biblioteca no rompe días con snapshot.  
**Resultado:** Plan persistido; cliente ve días según avance secuencial.  
**Refs:** F-006, F-007, MVP-001…004

### FLOW-007 · Editar plan nutricional

**Actor:** ROLE-coach  
**Pasos:** Configura hasta 6 comidas (Comida 1…6) con cantidades sugeridas; independiente del ciclo de bloques.  
**Resultado:** Cliente ve nutrición en solo lectura (F-016).  
**Refs:** F-009, MVP-006

### FLOW-008 · Ejecutar día de entreno (RIR + cerrar)

**Actor:** ROLE-client  
**Precondiciones:** Existe día pendiente (siguiente incompleto); no está solo en “esperando bloque” (si no, FLOW-018).  
**Pasos:**

1. Desde Inicio o Entreno abre el **día pendiente** (no el día calendario).
2. Por cada serie: registra **RIR**; opcional **observación**.
3. Puede usar **timer** 2–6 min (pausar / saltar / extender; al fin suena/vibra).
4. Ve placeholder de video “Próximamente”.
5. Cuando **todas** las series tienen RIR → puede **cerrar** el día.
6. El siguiente pendiente pasa a ser el próximo día del plan.

**Errores:** Intento de cerrar con RIR incompleto → bloqueado.  
**Resultado:** Día completado; North Star (`VISION-008`) avanza.  
**Refs:** F-014, F-015, MVP-002, MVP-003, MVP-010, MVP-011

### FLOW-009 · Editar RIR en día pasado

**Actor:** ROLE-client  
**Precondiciones:** Día ya cerrado o pasado en historial.  
**Pasos:** Desde Historial abre día pasado → edita RIR/obs.  
**Errores:** Día futuro → solo lectura.  
**Resultado:** RIR actualizado.  
**Refs:** F-017, MVP-003

### FLOW-010 · Coach corrige RIR / plan de un día

**Actor:** ROLE-coach  
**Pasos:** Desde editor de plan o vista de día, modifica cargas/estructura y/o RIR del cliente (`ROLE-001`).  
**Resultado:** Datos alineados para planeación del siguiente bloque.  
**Refs:** F-006, ROLE-001, MVP-004

### FLOW-011 · Navegar historial + leer feedback

**Actor:** ROLE-client  
**Pasos:** Recorre bloques/semanas/días; en fin de bloque ve **feedback** de Jeny si existe.  
**Resultado:** Contexto de progreso.  
**Refs:** F-017, F-010

### FLOW-012 · Escribir feedback de bloque

**Actor:** ROLE-coach  
**Precondiciones:** Bloque del cliente (típicamente al cierre / al planear el siguiente).  
**Pasos:** Escribe nota de feedback asociada al bloque → visible para el cliente en historial.  
**Resultado:** Feedback in-app (complementa WhatsApp).  
**Refs:** F-010

### FLOW-013 · Ver Plan Completo / Comparación

**Actor:** ROLE-coach  
**Pasos:**

1. **Plan Completo:** todos los bloques/semanas/días con estado completado / actual-pendiente / futuro.
2. **Comparación/progreso:** carga, reps, RIR real y observaciones a través del tiempo.

**Resultado:** Insumo para sobrecarga progresiva (manual).  
**Refs:** F-007, F-008, MVP-007

### FLOW-014 · Gestionar pagos

**Actor:** ROLE-coach  
**Pasos:**

1. Ve listados/filtrados: al día / próximo a vencer (≤7 días) / vencido.
2. Marca “pagado” (registra fecha y período).
3. Ajusta fecha de cobro si hace falta.
4. Consulta historial por cliente.

**Resultado:** Estados de pago actualizados (USD).  
**Refs:** F-011, MVP-008

### FLOW-015 · Cliente ve estado de pago / aviso

**Actor:** ROLE-client  
**Pasos:** En Inicio/Perfil ve estado; si **vencido**, aviso visible **sin** perder acceso.  
**Resultado:** Transparencia de cobro.  
**Refs:** F-011, F-018, MVP-008

### FLOW-016 · Valoración inicial (diagnóstico)

**Actor:** ROLE-client (completa); ROLE-coach (ve/asiste)  
**Precondiciones:** Alta del cliente; diagnóstico aún no completado.  
**Pasos:**

1. Cliente responde encuesta (preguntas — `MVP-OPEN-02`), sube fotos, registra **12 medidas** (con instructivo), peso, talla y datos base.
2. Coach ve datos en panel Valoración (evolución).
3. Jeny elabora **Resultado diagnóstico fuera de la app** (`MVP-015`).

**Errores:** Envío incompleto → validación de campos requeridos (definir en 06).  
**Resultado:** Valoración inicial persistida; informe externo.  
**Refs:** F-012, F-013, MVP-009, MVP-014, MVP-015

### FLOW-017 · Seguimiento mensual de valoración

**Actor:** ROLE-coach abre; ROLE-client completa (`ROLE-002`)  
**Pasos:**

1. Coach **crea/abre** un seguimiento mensual para el cliente.
2. Cliente completa fotos + 12 medidas + peso (sin re-encuesta).
3. Coach revisa evolución mes a mes.

**Resultado:** Nuevo punto en la serie de valoración.  
**Refs:** F-012, F-013, ROLE-002, MVP-009

### FLOW-018 · Estado “esperando próximo bloque”

**Actor:** ROLE-client  
**Precondiciones:** Bloque actual terminado; no hay siguiente bloque planeado.  
**Pasos:** App muestra aviso claro “esperando el próximo bloque” (no error ni vacío). Entreno no ofrece un día inventado.  
**Resultado:** Expectativa clara hasta FLOW-006 del coach.  
**Refs:** F-014, MVP-013

## 5. Fuera del MVP

- Subida de video por serie
- Resultado diagnóstico in-app
- Auto-registro / login password de cliente
- Pasarela de pago
- Flujos multi-coach

## 6. Verificación cruzada (01–03 → 04)

| Tema 01–03 | Flows |
|------------|-------|
| Auth dual | FLOW-001…003 |
| Alta sin auto-registro | FLOW-004 |
| Plan + RIR secuencial | FLOW-006, 008, 009, 010, 018 |
| Nutrición | FLOW-007 |
| Feedback | FLOW-011, 012 |
| Pagos 7 días / no bloqueo | FLOW-014, 015 |
| Valoración + instructivo | FLOW-016, 017 |
| Single-coach | Todos los flows coach asumen un solo ROLE-coach |

## 7. Referencias

- [`00-coherence-index.md`](00-coherence-index.md)
- [`02-scope-mvp.md`](02-scope-mvp.md)
- [`03-user-roles.md`](03-user-roles.md)
- [`06-business-rules.md`](06-business-rules.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md)
