# Insumo bruto · JenyFit (contexto v1)

> **NO es fuente de verdad.** Contrato binding: `docs/product/00`–`12`.
> Este archivo conserva el texto de discovery para trazar de dónde salió cada decisión mientras se llenan los docs canónicos.
> Cuando 01–07 estén cerrados y coherentes, se puede archivar o borrar este archivo (evitar doble verdad).

---

# Contexto completo del proyecto JenyFit (para uso de Cursor)

Este texto reúne toda la información definida sobre la app JenyFit, para que sirva de insumo al construir la documentación del proyecto (visión de producto, alcance del MVP, roles, flujos de usuario, modelo de dominio, reglas de negocio, sistema de diseño y pantallas de prototipo).

---

## 1. Qué es JenyFit y por qué existe

Jeny es una entrenadora personal de gimnasio. Actualmente gestiona a sus clientes de forma manual: envía los planes de entrenamiento en un archivo de Excel, recibe videos de ejercicios y actualizaciones de RIR por WhatsApp, y hace seguimiento de pagos manualmente. La app JenyFit busca **reemplazar el Excel y centralizar la relación coach–cliente** en una sola plataforma: planificación de entrenamiento, plan nutricional, seguimiento de progreso físico, feedback y pagos.

Hay dos tipos de usuarios en el sistema:

- **Jeny (entrenadora / coach / admin):** crea y gestiona todo el contenido de cada cliente.
- **Cliente (usuario final):** consume su plan, registra su ejecución (RIR) y ve su progreso.

---

## 2. Plataforma y acceso

- La aplicación es **100% web** (no apps nativas).
- **Autenticación según rol:**
  - **Jeny (admin/coach):** inicio de sesión con **usuario y contraseña**.
  - **Cliente:** inicio de sesión por **magic link** (sin contraseña). El correo determina la cuenta del cliente.
- Las vistas de **Jeny son responsive**: deben funcionar tanto en **desktop** como en **mobile**.
- Las vistas del **cliente están diseñadas solo para mobile** (uso típico: en el gimnasio, con el teléfono).
- **Alta de clientes:** Jeny agrega el correo del cliente nuevo desde su panel. Una vez agregado, ese cliente ya puede iniciar sesión por su cuenta vía magic link. No hay auto-registro por parte del cliente.
- **Cuenta de Jeny:** se provisiona por seed/script (no hay registro público de admin). Recuperación de contraseña por reset vía email.

---

## 3. Rol: Jeny (entrenadora / coach)

Jeny es la única con permisos administrativos. Puede:

- Agregar clientes nuevos (por correo).
- Decidir, por cada cliente nuevo, si necesita o no el **bloque de adaptación** (esta decisión es manual, no automática).
- Crear y editar el **plan nutricional** de cada cliente, en cualquier momento (no está atado a un ciclo fijo de entrenamiento).
- Crear y editar el **plan de entrenamiento completo** de cada cliente: bloques, semanas, días, ejercicios, cargas, series y repeticiones.
- Editar **todo** el plan de entrenamiento de un cliente en cualquier momento — incluyendo días pasados o futuros (a diferencia del cliente, que solo puede tocar el RIR).
- Administrar la **biblioteca de ejercicios global** (compartida entre todos sus clientes): solo ella puede agregar o editar ejercicios ahí.
- Ver, para cada cliente, una **vista de comparación/progreso** que muestra la evolución de carga, repeticiones y RIR real por ejercicio a través de los bloques, junto con las observaciones que dejó el cliente — esto le sirve para planear el siguiente bloque con sobrecarga progresiva.
- Ver, para cada cliente, una **vista de "Plan Completo"** separada de la de comparación: todos los bloques/semanas/días de ese cliente, con un estado visual por día (completado / actual-pendiente / futuro), para saber de un vistazo qué ha hecho y qué no.
- Dejar **notas de feedback dentro de la app** para el cliente (complementando el feedback que sigue dando por WhatsApp). Este feedback se muestra al cliente dentro de su historial, al final de cada bloque.
- Gestionar el **panel de valoración** de cada cliente (ver sección 6).
- Gestionar los **pagos** de cada cliente: ver quién está al día, próximo a vencer o vencido, y marcar manualmente cuándo un cliente pagó.
- Ajustar manualmente la fecha de cobro de un cliente si lo necesita.

### Vistas del panel de Jeny

1. **Dashboard de clientes** — lista de todos los clientes con su bloque/semana/día actual y su estado de pago (al día / por vencer / vencido).
2. **Perfil del cliente** — con secciones: Nutrición, Entrenamiento (editor), Plan Completo, Comparación/Progreso, Pagos, Valoración.
3. **Editor de Plan Nutricional** — hasta 6 comidas configurables con cantidades sugeridas por macronutriente.
4. **Editor de Plan de Entrenamiento** — estructura Bloque → Semana → Día → Ejercicio → Series; los ejercicios se eligen desde la biblioteca global (no texto libre); incluye la posibilidad de duplicar una semana/día anterior como base para agilizar el armado del siguiente bloque.
5. **Biblioteca de ejercicios** — administración (crear/editar) de los ejercicios disponibles, solo Jeny.
6. **Vista de Plan Completo del cliente** — todos los bloques/semanas/días en una sola vista, con estado: completado (RIR lleno) / actual-pendiente / futuro.
7. **Vista de comparación/progreso** — tabla comparativa de carga, reps y RIR real por ejercicio a través de bloques/semanas, con observaciones del cliente.
8. **Vista de Pagos** — clientes próximos a vencer / vencidos / al día, botón de "marcar como pagado", historial de pagos.
9. **Vista de Valoración** — encuesta diagnóstica inicial y seguimientos mensuales (ver sección 6).

---

## 4. Rol: Cliente (usuario final)

El cliente:

- Inicia sesión vía magic link, una vez que Jeny lo agregó.
- Ve su **plan nutricional** (solo lectura): hasta 6 comidas con cantidades sugeridas de macros, no atadas a un horario fijo (el cliente decide cuándo comer cada una).
- Ve su **plan de entrenamiento**, mostrado siempre como el **siguiente día pendiente**, sin importar el día calendario en el que abra la app. Es decir, la navegación por días es **secuencial según lo completado**, no por fecha real.
- Por cada serie de cada ejercicio del día, registra su **RIR** y, opcionalmente, una **observación**.
- Debe llenar el RIR de **todas las series** del día para poder marcarlo como "cerrado".
- Puede usar un **timer de descanso** entre series con opciones rápidas de 2, 3, 4, 5 o 6 minutos; el timer se puede pausar, saltar/terminar antes o extender; al finalizar, suena y vibra.
- Ve, en el lugar del video (para el MVP), un texto de **"Próximamente"** — la funcionalidad de subir video por serie no está incluida en el MVP.
- Puede navegar su **historial**: bloques/semanas/días pasados y futuros.
  - En días **pasados**, puede editar su propio RIR.
  - En días **futuros**, solo puede verlos (no editar).
- Ve, al final de cada bloque dentro de su historial, las **notas de feedback** que Jeny dejó sobre su desempeño.
- Si su bloque actual ya terminó y Jeny todavía no ha planeado el siguiente, ve un aviso de **"esperando el próximo bloque"**.
- Si está atrasado con el pago, **no se le restringe el acceso** a la app, pero ve un **aviso de pago atrasado**.
- Completa la **encuesta diagnóstica inicial** una sola vez, y participa en los **seguimientos mensuales** de valoración (ver sección 6).

### Vistas del cliente (mobile, navegación por bottom nav / tabs inferiores)

1. **Inicio** — el día de entreno pendiente actual + avisos (feedback nuevo, pago atrasado, "esperando próximo bloque").
2. **Entreno** — el día activo: ejercicios, series, campo de RIR + observación, timer de descanso, placeholder de video, botón de cerrar el día.
3. **Nutrición** — plan de comidas vigente, solo lectura.
4. **Historial** — bloques/semanas/días pasados y futuros; edición de RIR en días pasados; feedback de Jeny al cierre de cada bloque.
5. **Perfil** — datos de cuenta, estado de pago, cerrar sesión.

---

## 5. Estructura del plan de entrenamiento

- **Bloque:** unidad de planeación de Jeny. Cada bloque dura **4 semanas**, siendo la **última semana de descarga**.
- **Bloque de adaptación:** un bloque especial, opcional, para clientes que entrenan por primera vez. Jeny decide manualmente si un cliente lo necesita.
- **Semana:** contiene los días de entreno definidos para ese cliente en particular.
- **Día de entreno:** cada cliente puede tener un número distinto de días de entreno por semana (ej. un cliente puede entrenar 4 días/semana, otro puede entrenar diferente). Cada día tiene un nombre asociado al día calendario acordado con Jeny (ej. "Lunes"), aunque la navegación en la app es secuencial y no depende de la fecha real.
- **Ejercicio (dentro de un día):** viene de la biblioteca global de ejercicios. Tiene carga (peso), número de series y repeticiones objetivo, definidos por Jeny.
- **Serie (dentro de un ejercicio):** unidad mínima de registro. El cliente anota el RIR real logrado en esa serie, y opcionalmente una observación.
- **Snapshot / inmutabilidad:** si Jeny edita o elimina un ejercicio de la biblioteca, los días pasados que ya usaron ese ejercicio **no se ven afectados**. El registro en el día guarda al menos: **nombre, carga, series, repeticiones objetivo** y, si aplica, **id de la biblioteca** (copia histórica, no solo referencia viva).

### Ciclo de evaluación (sobrecarga progresiva)

Al cierre de cada bloque (4 semanas, última de descarga), Jeny revisa:

- El RIR real anotado por el cliente en cada serie.
- Los videos que el cliente le envía por WhatsApp (fuera de la app, para el MVP).
- Las observaciones dejadas por el cliente.

Con esa información, Jeny diseña el siguiente bloque aplicando el principio de sobrecarga progresiva (ajustando cargas, repeticiones o ejercicios), y puede dejar notas de feedback dentro de la app.

---

## 6. Panel de Valoración

**Encuesta diagnóstica inicial** (se realiza una sola vez, al iniciar la relación con Jeny):

- Preguntas de respuesta cerrada (ej. opción múltiple / selección).
- Preguntas de desarrollo (texto libre).
- Fotos.
- Medidas corporales.
- Peso corporal.

**Seguimientos mensuales** (recurrentes, sin la encuesta de preguntas):

- Fotos.
- Medidas corporales.
- Peso corporal.

Esta información se gestiona dentro del **Perfil del cliente**, en el panel de Jeny, permitiéndole ver la evolución del cliente en el tiempo (comparar fotos, medidas y peso mes a mes).

**Resultado diagnóstico (informe):** después de la valoración inicial, Jeny elabora y entrega un documento de resultado (estado inicial, recomendaciones, macros, conclusión) **fuera de la app** en el MVP. La app no genera ese PDF; solo centraliza los inputs. (Ver `_intake/resultado-diagnostico/` y `MVP-015`.)

---

## 7. Plan Nutricional (detalle)

- Se divide en **hasta 6 comidas** (Comida 1, Comida 2, Comida 3... hasta Comida 6) — deliberadamente **no** se llama "desayuno/almuerzo/merienda/cena", porque el cliente puede comer cada una cuando quiera.
- Cada comida especifica **cantidades sugeridas** (no recetas estrictas) de: proteína, carbohidratos, vegetales, grasas, etc.
- Jeny lo actualiza de forma **independiente** al ciclo de bloques de entrenamiento — sin una cadencia fija.
- Para el cliente, es una vista de **solo lectura**.

---

## 8. Pagos

- Cobro **mensual**, con una fecha fija por cliente (ej. "el 5 de cada mes").
- La fecha de cobro inicial de un cliente nuevo es, por defecto, el día en que Jeny lo agregó, pero Jeny puede modificarla manualmente.
- **No hay pasarela de pago integrada** — Jeny marca manualmente cuándo un cliente pagó (ej. transferencia, efectivo).
- Estados de un cliente respecto al pago:
  - **Al día:** pagó el ciclo actual.
  - **Próximo a vencer:** faltan **7 días o menos** para la fecha de cobro y aún no se ha marcado el pago del ciclo.
  - **Vencido:** pasó la fecha y no se ha marcado como pagado.
- El **acceso del cliente a la app no se restringe** por estar vencido — solo se le muestra un aviso de que está atrasado.
- Se lleva un historial de pagos por cliente (fecha en que se marcó como pagado, período que cubre).

---

## 9. Reglas de negocio clave (resumen para "business rules")

1. Un bloque = 4 semanas; la última semana de cada bloque es de descarga.
2. El bloque de adaptación es opcional y su asignación es 100% manual por parte de Jeny.
3. El avance del cliente por los días de entreno es **secuencial** (basado en lo que ya completó), no basado en la fecha calendario real.
4. Un día de entreno solo se puede "cerrar" cuando **todas** sus series tienen RIR registrado.
5. El cliente **solo** puede editar el campo RIR (y su observación), y solo en el día actual o en días pasados — nunca en días futuros.
6. Jeny puede editar **cualquier campo**, en **cualquier día** (pasado, actual o futuro).
7. Los ejercicios dentro de un día ya registrado son inmutables ante cambios posteriores en la biblioteca de ejercicios (se debe conservar el dato histórico).
8. Los videos de series no se suben dentro de la app en el MVP — se muestra un placeholder de "Próximamente".
9. Si el bloque actual del cliente terminó y Jeny no ha planeado el siguiente, la app debe mostrar un estado de espera claro ("esperando el próximo bloque"), no un error ni una pantalla vacía.
10. Un cliente con pago vencido conserva acceso total a la app, solo recibe un aviso visual de atraso.
11. La biblioteca de ejercicios es única y global (no hay una biblioteca distinta por cliente), y solo Jeny puede modificarla.
12. La encuesta diagnóstica (con preguntas) se hace una única vez por cliente; los seguimientos posteriores (mensuales) solo incluyen fotos, medidas y peso — sin repetir el cuestionario.
13. El plan nutricional y el plan de entrenamiento se actualizan de forma independiente entre sí (no comparten calendario/ciclo).

---

## 10. Consideraciones de diseño / UX (para "design system" y "prototype screens")

- **Cliente:** interfaz mobile-first, navegación por **bottom nav** (tabs inferiores) con 5 secciones: Inicio, Entreno, Nutrición, Historial, Perfil.
- **Jeny:** interfaz responsive (mobile + desktop), pensada para gestión de múltiples clientes — probablemente con un layout de tipo sidebar/dashboard en desktop.
- La pantalla de **"Día de Entreno"** del cliente es la de mayor uso e interacción: debe priorizar rapidez para registrar RIR y manejar el timer de descanso sin fricción (botones grandes, accesibles con el teléfono en la mano durante el entrenamiento).
- Los estados de "completado / actual / futuro" (tanto en el historial del cliente como en la vista de Plan Completo de Jeny) deben comunicarse con claridad visual (ej. color o ícono), ya que son centrales para la lógica de navegación secuencial de todo el producto.
- Los avisos contextuales (pago atrasado, esperando próximo bloque, feedback nuevo) deben ser visibles pero no bloquear el uso normal de la app.

---

## 11. Fuera de alcance para el MVP (explícitamente pospuesto)

- Subida real de video por serie (se muestra "Próximamente").
- Pasarela de pago automática / cobro integrado.
- Auto-registro de clientes sin intervención de Jeny.
