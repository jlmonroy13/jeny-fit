# Encuesta diagnóstica (insumo)

> **NO es UI final.** Formulario Excel actual de Jeny. Contrato canónico: [`02-scope-mvp.md`](../02-scope-mvp.md) §3.3 / **`MVP-018`**.

## Archivos

| Archivo                             | Contenido                                                      |
| ----------------------------------- | -------------------------------------------------------------- |
| `01-salud-actividad.png`            | Datos personales + Q1–13 (salud, actividad, horario, duración) |
| `02-objetivos-alimentacion.png`     | Q14–19 (objetivos, alergias, alimentación, rutinas)            |
| `03-entrenamiento-conclusiones.png` | Q20 + CONCLUSIÓNES / RECOMENDACIONES (coach)                   |

## Binding

- Preguntas **1–20** + datos personales → **in-app** en Assessment `initial`.
- **CONCLUSIONES** / **RECOMENDACIONES** del Excel → **fuera de app** en MVP (`MVP-015`); no son `SurveyAnswer`.
