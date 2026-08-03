# Resultado diagnóstico (insumo — ejemplo real)

> **NO es contrato de UI.** Ejemplo de lo que Jeny entrega al cliente **después** de la valoración inicial (fotos + medidas + datos).  
> Binding: [`02-scope-mvp.md`](../02-scope-mvp.md) §3.2 / **`MVP-015`**.

## Decisión cerrada (`MVP-015`)

En el **MVP**, el Resultado diagnóstico se elabora y entrega **fuera de la app**.  
La app solo captura/persiste inputs de valoración y muestra evolución (fotos, medidas, peso) a Jeny.  
Generación o lectura in-app del informe = **post-MVP**.

## Cuándo ocurre

1. Cliente (o flujo de valoración) aporta: cuestionario, fotos, **12 medidas**, peso (y datos base: edad, talla, sexo, etc.).
2. Jeny analiza y elabora el **Resultado diagnóstico** fuera de la app.
3. El cliente recibe el resultado por el canal actual (p. ej. PDF).

## Contenido observado en el ejemplo (2 páginas)

### Página 1 — Estado inicial

- Identidad: nombre, fecha del diagnóstico
- Datos: edad, peso (kg), talla (m)
- Derivados / estimaciones: **IMC**, % grasa estimado, masa magra estimada (kg), **TMB**, calorías de mantenimiento estimadas
- Observaciones (texto) sobre peso e IMC / % grasa vs rangos
- Referencias educativas: tabla OMS IMC; escala ACSM % grasa (ej. hombres)

### Página 2 — Recomendaciones + conclusión

- Recomendaciones en prosa: composición corporal, plan nutricional, entrenamiento (RIR / sobrecarga), antecedentes de lesión / salud
- Tabla **macros estimados** (proteína / grasa / carbohidrato: g, kcal, %) alineada a calorías de mantenimiento
- Conclusión narrativa

## Imágenes

- [01 — estado inicial](01-estado-inicial.png)
- [02 — recomendaciones](02-recomendaciones.png)

## Implicaciones para la app (MVP)

| Pieza                  | MVP                                                                     |
| ---------------------- | ----------------------------------------------------------------------- |
| Inputs valoración      | Preguntas, fotos, 12 medidas, peso, talla, edad/sexo — **sí in-app**    |
| Evolución para Jeny    | Comparar fotos/medidas/peso en el tiempo — **sí in-app**                |
| Cálculos / informe PDF | IMC, % grasa, TMB, macros, recomendaciones — **fuera**; in-app post-MVP |
