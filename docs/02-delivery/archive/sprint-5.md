
# PROMPT MAESTRO — Sprint 5 GanaConMerito

Quiero que actúes como una **staff product engineer / senior full-stack engineer** con criterio fuerte de arquitectura, QA, trazabilidad y gobernanza de asistentes.

No quiero una demo conversacional bonita.
Quiero **infraestructura técnica gobernada** para abrir el frente de `Tutor GCM` sin romper el core ni contaminar la lógica de negocio.

---

## 1. Contexto ejecutivo base

Estoy trabajando en **GanaConMerito**, producto web educativo construido sobre:

- Next.js
- TypeScript
- Supabase
- Docker

El core real del producto ya existe y funciona:
- login
- onboarding
- práctica
- dashboard

Ya se cerró:
- un frente fuerte de UI/UX
- y luego un **Sprint 4 de productización del core**

La etapa actual del producto ya no es “hacer MVP”.
La etapa actual es:

- madurar producto
- gobernar el frente de asistentes
- endurecer operación/runtime
- reducir drift entre código, deploy, docs y runtime visible

---

## 2. Estado operativo actual

### Fuente canónica de producto
```bash
/home/ubuntu/.openclaw/product
```

### Deploy tree VPS
```bash
/opt/gcm/app
```

### Env persistente de deploy
```bash
/opt/gcm/env/gcm-app.env
```

### Repo remoto
```bash
https://github.com/ProfeMarlonMDE/GanaConMerito.git
```

### Rama principal
```bash
master
```

### Commits relevantes
- Sprint 4 funcional: `304f950`
- cierre documental posterior: `ef13a4f`

Interpretación correcta:
- `304f950` = cambio funcional
- `ef13a4f` = cierre documental posterior, no nueva feature funcional

---

## 3. Regla de oro
Estas reglas son obligatorias:

- `/home/ubuntu/.openclaw/product` = fuente de desarrollo
- `/opt/gcm/app` = árbol de deploy, no fuente principal
- todo fix estable vive primero en la fuente canónica
- el deploy se reconstruye desde Git
- no se desarrolla en deploy
- no se corrige en VPS primero para luego “traer” cambios

---

## 4. Sprint a ejecutar
Vamos a ejecutar:

# Sprint 5 — Base técnica gobernada de Tutor GCM

## Objetivo
Diseñar e implementar la infraestructura mínima gobernada para `Tutor GCM`, sin desplegar todavía un asistente libre ni darle autoridad sobre el negocio.

---

## 5. Resultado esperado del sprint
Al final del sprint debe existir:

- contrato v1 del turno de Tutor GCM
- input/output estructurado
- reglas explícitas de autoridad
- trazabilidad mínima por turno
- degradación honesta
- QA positiva y negativa
- documentación canónica actualizada
- cero regresiones del core

---

## 6. Guardrails obligatorios

### No debes
- abrir multiagente visible
- implementar chat libre dominante
- meter lógica crítica dentro del LLM
- usar `/opt/gcm/app` como fuente principal de edición
- reabrir editorial como frente principal del usuario
- mezclar banco de preguntas con este sprint
- declarar nada sin evidencia verificable
- confiar solo en `git status`

### Lógica crítica que debe quedar fuera del LLM
- scoring
- transición de estados
- cierre de sesión
- selección de ítems
- verdad del progreso
- disponibilidad del siguiente paso

El LLM solo puede:
- explicar
- orientar
- contextualizar
- sugerir
- degradar honestamente

---

## 7. Alcance autorizado del Sprint 5

### Sí incluye
1. contrato v1 de Tutor GCM
2. definición de inputs permitidos
3. definición de outputs permitidos
4. definición de guardrails de autoridad
5. servicio o capa mínima de orquestación
6. trazabilidad mínima por turno
7. fallback honesto si falta evidencia
8. QA positiva y negativa
9. documentación de arquitectura y delivery

### No incluye
- Tutor GCM con control de scoring
- Tutor GCM con autoridad de avance de sesión
- Tutor GCM con autoridad de cierre de sesión
- multiagente visible
- rediseño UX completo
- editorial/question-bank
- migraciones/schema Supabase salvo necesidad excepcional y justificada

---

## 8. Tipo de solución esperada
Quiero una solución sobria, testeable y auditable.

No quiero:
- capas mágicas
- prompts gigantes sin contrato
- respuestas libres sin estructura
- inventar capacidad no soportada

Quiero:
- types claros
- flujo claro
- contrato claro
- límites claros
- tests claros

---

## 9. Archivos y zonas probables a tocar

### Documentación
```bash
/home/ubuntu/.openclaw/product/docs/project/status.md
/home/ubuntu/.openclaw/product/docs/02-delivery/sprint-log.md
/home/ubuntu/.openclaw/product/docs/02-delivery/change-log.md
/home/ubuntu/.openclaw/product/docs/01-product/backlog.md
/home/ubuntu/.openclaw/product/docs/03-architecture/assistant-component-executive-spec.md
/home/ubuntu/.openclaw/product/docs/03-architecture/adrs/ADR-002-assistant-component-governance.md
```

### Código
```bash
/home/ubuntu/.openclaw/product/src/types/
/home/ubuntu/.openclaw/product/src/lib/
/home/ubuntu/.openclaw/product/src/domain/
/home/ubuntu/.openclaw/product/src/app/api/
```

### Rutas o módulos probables nuevos
Nombres tentativos:
```bash
/home/ubuntu/.openclaw/product/src/types/tutor-turn.ts
/home/ubuntu/.openclaw/product/src/lib/tutor/
/home/ubuntu/.openclaw/product/src/domain/tutor/
/home/ubuntu/.openclaw/product/src/app/api/tutor/
```

### Pruebas
```bash
/home/ubuntu/.openclaw/product/src/lib/tutor/*.test.ts
/home/ubuntu/.openclaw/product/scripts/qa-*.js
```

---

## 10. Archivos que no debes tocar salvo necesidad real
```bash
/home/ubuntu/.openclaw/product/supabase/migrations/*
/home/ubuntu/.openclaw/product/content/items/*
/home/ubuntu/.openclaw/product/src/app/editorial/*
```

Y no abras:
- sistemas paralelos de diseño
- features nuevas del banco de preguntas
- refactor masivo del dashboard
- experimentos de asistentes fuera de contrato

---

## 11. Diseño técnico esperado

## A. Contrato v1 de turno
Debe definir al menos:

### Entrada
- intención del usuario
- contexto permitido del usuario
- contexto permitido de sesión
- resumen permitido de progreso
- restricciones del sistema

### Salida
- tipo de respuesta
- mensaje visible
- flags de incertidumbre
- acción sugerida
- acción denegada si aplica
- razón de degradación
- metadata estructurada

## B. Reglas de autoridad
Debe quedar explícito:
- qué puede hacer Tutor GCM
- qué no puede hacer
- cuándo debe negar
- cuándo debe degradar honestamente

## C. Trazabilidad
Cada turno debe poder dejar trazado:
- input consumido
- output producido
- versión de contrato o plantilla
- guardrails aplicados
- si hubo incertidumbre
- si hubo denegación o fallback

---

## 12. Pruebas obligatorias

### Mínimo obligatorio
1. build
2. pruebas unitarias del contrato
3. pruebas negativas del contrato
4. smoke del core actual
5. si hay endpoint real: prueba de API del tutor
6. evidencia de que Tutor GCM no adquiere autoridad de negocio

### QA negativa obligatoria
Debe fallar correctamente cuando:
- falta contexto
- se pide una acción no autorizada
- se intenta inferir progreso no soportado
- se intenta reemplazar al motor determinístico
- se intenta convertirlo en multiagente visible

---

## 13. Riesgos que debes vigilar
1. abrir un asistente sin contrato
2. mezclar conversación con autoridad de negocio
3. meter demasiado contexto no gobernado
4. romper el core por tocar backend sin disciplina
5. reportar “listo” algo que solo es una demo

---

## 14. Método de ejecución requerido

### Fase 1 — Lectura real del estado
1. inspecciona repo real
2. revisa ADR-002
3. revisa docs relevantes del estado actual
4. identifica huecos de contrato y trazabilidad
5. propone plan corto

### Fase 2 — Diseño e implementación mínima
1. crea contrato v1
2. implementa types
3. implementa capa mínima de orquestación
4. implementa fallback honesto
5. implementa trazabilidad mínima
6. integra sin romper core

### Fase 3 — QA
1. build
2. unitarias
3. negativas
4. smoke
5. si aplica, prueba de endpoint

### Fase 4 — Documentación
1. actualiza status
2. actualiza sprint-log
3. actualiza change-log
4. actualiza backlog
5. actualiza spec/ADR si aplica

### Fase 5 — Deploy solo si corresponde
Si este sprint introduce código ejecutable que deba quedar en VPS:
- push a Git
- alinear `/opt/gcm/app`
- rebuild desde Docker usando el env persistente correcto
- validar runtime
- dejar evidencia

---

## 15. Docker / deploy / runtime
Si el sprint requiere deploy:

### No usar como fuente principal
```bash
/opt/gcm/app
```

### Sí usar como env persistente real
```bash
/opt/gcm/env/gcm-app.env
```

### Árbol operativo de deploy
```bash
/opt/gcm
```

### Compose a revisar
Muy probablemente:
```bash
/opt/gcm/docker-compose.yml
```

Si rebuildas:
- no metas secretos al repo
- no dependas de `.env.production` dentro de `/opt/gcm/app`
- pasa `APP_COMMIT` y `APP_BUILD_TIME` si el flujo actual los usa

---

## 16. Criterio de terminado
Este sprint solo se considera bien cerrado si existe:

- contrato v1 explícito
- implementación mínima coherente
- guardrails técnicos aplicados
- trazabilidad mínima por turno
- QA positiva
- QA negativa
- cero regresiones del core
- documentación canónica actualizada
- evidencia verificable

---

## 17. Formato obligatorio de tu primera respuesta
No empieces a cambiar cosas sin orientar primero.

Tu primera respuesta debe traer exactamente esto:

1. lectura ejecutiva del estado actual
2. alcance propuesto del Sprint 5
3. no alcance
4. archivos probables a tocar
5. riesgos técnicos
6. plan corto de ejecución
7. accesos faltantes si existen

---

## 18. Formato obligatorio de tu entrega final
Tu entrega final debe incluir:

1. objetivo cumplido / no cumplido
2. archivos modificados
3. archivos creados
4. decisiones de diseño tomadas
5. pruebas ejecutadas
6. resultado de pruebas
7. riesgos abiertos
8. si hubo deploy o no
9. evidencia verificable
10. qué quedó deliberadamente fuera de alcance

No me entregues storytelling.
No me vendas progreso.
Entrégame **trabajo auditable**.

