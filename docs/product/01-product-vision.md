# 01 · Product vision

> **Estado:** v0.3 — vision + mercado internacional / USD / UI es sin i18n MVP.

## 1. Objetivo y audiencia

Este documento define la visión de **Jeny Fit**: problema, propuesta de valor y usuario objetivo. Lo leen agentes AI y revisores humanos antes de priorizar scope o milestones.

## 2. Visión (una frase)

**Jeny Fit** es la plataforma web donde Jeny planifica, hace seguimiento y cobra a sus clientes de entrenamiento personal — y donde cada cliente consume su plan, registra su RIR y ve su progreso — sin depender de Excel ni de WhatsApp como sistema operativo.

## 3. Problema

Hoy Jeny opera la relación coach–cliente de forma fragmentada:

- Los **planes de entrenamiento** se armán y envían en **Excel**.
- El cliente reporta **RIR**, observaciones y (a menudo) **videos** por **WhatsApp**.
- El **seguimiento de pagos** es manual y fácil de perder de vista.
- No hay una vista única del **progreso** (carga, reps, RIR, feedback) para diseñar el siguiente bloque con sobrecarga progresiva.
- Nutrición, valoración física y estado de pago viven fuera de un mismo flujo.

Eso genera fricción operativa para Jeny y una experiencia incompleta / inconsistente para el cliente.

## 4. Propuesta de valor

| Para quién | Valor |
|------------|--------|
| **Jeny (coach / admin)** | Centralizar clientes, planes (entrenamiento + nutrición), biblioteca de ejercicios, comparación/progreso, feedback in-app, valoración y pagos en un solo panel. |
| **Cliente** | Ver su plan vigente, registrar RIR en el gym (mobile), consultar historial/feedback/nutrición, y recibir avisos claros (pago, próximo bloque) sin fricción. |

## 5. North Star Metric

> **Abierta — `VISION-OPEN-01`.** Candidatas (elegir una al cerrar este OPEN):

| Candidata | Por qué podría servir |
|-----------|------------------------|
| % de días de entreno **cerrados** (RIR completo) por cliente activo / semana | Mide adopción real del registro en app. |
| Clientes con **bloque vigente planeado** (sin estado “esperando próximo bloque”) | Mide que Jeny mantiene el ciclo de planeación. |
| Clientes **al día de pago** entre activos | Mide salud operativa del negocio de Jeny. |

Hasta cerrar el OPEN, no usar ninguna métrica como gate de milestone.

## 6. Usuario objetivo (primario)

- **Primario (MVP):** Jeny — entrenadora personal que gestiona un portafolio de clientes (planeación, seguimiento, cobro).
- **Secundario (MVP):** Cliente final — persona que entrena con Jeny y usa la app en el celular en el gimnasio.
- **Perfil / límites año 1** (orientativo, single-coach):

| Dimensión | Límite orientativo | Implicación producto |
|-----------|-------------------|----------------------|
| Coaches | 1 (Jeny) en MVP — ver `DOMAIN-OPEN-01` | No diseñar multi-tenant genérico hasta decidir. |
| Clientes | Decenas (no miles) | UX de lista/dashboard simple; sin complejidad enterprise. |
| Plataforma | Web only | Sin apps nativas. |
| Idioma / mercado | Clientes internacionales · UI en español · cobros USD | Sin i18n multi-idioma en MVP (`VISION-001`). |

## 7. Concepto clave del producto

- **B2B2C / coach-led:** Jeny es el operador; los clientes no se auto-registran.
- **Single-coach MVP** (pendiente confirmar en `DOMAIN-OPEN-01`): un admin, muchos clientes.
- **Ciclo de entrenamiento por bloques** (4 semanas, última de descarga) + nutrición y pagos en ciclos **independientes**.
- **Avance secuencial** del cliente (por días completados), no por calendario.

## 8. Decisiones de mercado y producto (`VISION-NNN`)

| ID | Decisión | Valor |
|----|----------|--------|
| VISION-001 | Mercado / idioma / moneda | Clientes en **varios países** · UI en **español** (es; sin i18n multi-idioma en MVP) · cobros y montos en **USD**. |
| VISION-002 | Modelo de acceso | Web 100%; sin apps nativas en MVP. |
| VISION-003 | Roles de producto | Solo **coach/admin (Jeny)** y **cliente**. |
| VISION-004 | Auth por rol | Jeny: **usuario + contraseña**. Cliente: **magic link** (correo). |
| VISION-005 | Alta de clientes | Solo Jeny invita/agrega por correo; sin auto-registro. |
| VISION-006 | Job-to-be-done coach | Reemplazar Excel + operación suelta en WhatsApp por una plataforma de planeación, seguimiento y cobro. |
| VISION-007 | Job-to-be-done cliente | Ejecutar el día de entreno (RIR + timer), ver nutrición/historial/feedback, sin gestionar la planeación. |

## 9. Referencias

- [`00-coherence-index.md`](00-coherence-index.md)
- [`02-scope-mvp.md`](02-scope-mvp.md)
- [`_intake/jenyfit-contexto-v1.md`](_intake/jenyfit-contexto-v1.md)
