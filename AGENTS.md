# AGENTS.md — GanaConMerito

Documento de gobernanza operativa para agentes IA que trabajan sobre este repositorio.
Fuente canónica: `https://github.com/ProfeMarlonMDE/GanaConMerito` (rama `master`).

---

## Fuente de Verdad y Disciplina de Runtime

Mantén esta jerarquía cuando haya conflicto entre señales:

1. fuente canónica de producto
2. documentación canónica alineada
3. árbol de deploy
4. runtime visible

La fuente canónica de desarrollo local/VPS es `~/.openclaw/product`.
El árbol de deploy es `/opt/gcm/app`.
El archivo de entorno persistente de deploy es `/opt/gcm/env/gcm-app.env`.
El repo remoto es `https://github.com/ProfeMarlonMDE/GanaConMerito.git` y la rama principal es `master`.

### Regla contextual de fuente de verdad

- si esta instrucción vive dentro del repo o se ejecuta con contexto directo de GitHub, trata `https://github.com/ProfeMarlonMDE/GanaConMerito` como fuente de verdad operativa
- si esta instrucción vive dentro del entorno local o VPS, trata `~/.openclaw/product` como fuente de verdad operativa
- en ambos casos, el humano debe indicar explícitamente dónde se debe trabajar antes de ejecutar cambios relevantes
- si el humano no indicó el lugar de trabajo y el contexto no lo hace inequívoco, pide esa precisión antes de tocar código, docs o deploy

### Regla de oro de desarrollo vs. deploy

- trata `~/.openclaw/product` como fuente de desarrollo
- trata `/opt/gcm/app` solo como árbol de deploy
- todo fix estable debe vivir primero en la fuente canónica
- el deploy debe reconstruirse desde Git
- no desarrolles en deploy
- no corrijas primero en VPS para luego "traer" cambios
- si fuente, deploy y runtime divergen, corrige primero la fuente

---

## Lugar de Trabajo

Antes de ejecutar cualquier cambio relevante, el humano debe indicar explícitamente en cuál de estos entornos se trabajará:

| Entorno | Ruta canónica | Cuándo aplica |
|---------|---------------|---------------|
| GitHub / Repo remoto | `https://github.com/ProfeMarlonMDE/GanaConMerito` | contexto de repo online, PR, CI |
| Local / VPS | `~/.openclaw/product` | trabajo desde terminal local o VPS |

Si el agente no puede determinar inequívocamente el entorno de trabajo, **debe detenerse y solicitar precisión al humano antes de tocar código, docs o deploy**.

---

## Rama Obligatoria

- la rama principal y única de trabajo productivo es `master`
- antes de cualquier edición verifica con `git branch --show-current` que estés en `master`
- si no estás en `master`, detente e informa:
  - rama actual
  - motivo del desvío
  - riesgo de continuar fuera de `master`

---

## Convención de Commits

Todo commit generado por un agente IA debe incluir de forma visible:

- el agente que realizó la tarea
- la vía por la que llegó el cambio
- el contributor humano o cuenta operativa desde la que se materializa

**Formato obligatorio:**
```
tipo(AGENTE/VIA): resumen breve
```

**Ejemplos:**
```
docs(PM-DocControl/codex-marlonmedellin): aclara fuente de verdad y disciplina de commits
feat(PM-Dev/codex-owner): implementa guardrails de tutor en sesión activa
fix(PM-QA/chatgpt): corrige validación de respuesta en banco de preguntas
```

**Tipos válidos:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `governance`

### Trailers obligatorios de commit

Además del subject, el cuerpo del commit debe cerrar con estos trailers:

```text
Agent: NOMBRE-DEL-AGENTE
Via: codex-marlonmedellin | codex-owner | chatgpt
Contributor: NOMBRE-DE-CUENTA-O-PERSONA
```

**Ejemplo completo:**

```text
docs(PM-DocControl/codex-marlonmedellin): actualiza reglas de contribucion multiagente

Agent: PM-DocControl
Via: codex-marlonmedellin
Contributor: MarlonMedellin (Profe Marlon Arcila)
```

### Vías operativas reconocidas

- `codex-marlonmedellin`: cambios realizados desde este workspace Codex autenticado con la cuenta `MarlonMedellin`
- `codex-owner`: cambios realizados desde el Codex operado con la cuenta dueña del repo
- `chatgpt`: cambios originados en un agente que participa desde ChatGPT y luego se materializan en Git por un contributor humano

Si en el futuro aparece una nueva vía de contribución, debe añadirse primero a la gobernanza antes de usarla en commits productivos.

---

## Disciplina Operativa para VPS

Si el trabajo toca el VPS o se valida allí, ejecuta **en este orden**:

1. Actualizar primero la carpeta fuente (`~/.openclaw/product`)
2. Alinear después el árbol de deploy (`/opt/gcm/app`)
3. Actualizar, reconstruir, reiniciar o verificar Docker según corresponda

**No des por cerrado trabajo operativo en VPS si uno de esos tres elementos quedó sin actualizar o verificar.**

---

## Uso de GitHub

Usa GitHub para inspeccionar el repositorio, commits, ramas, archivos, issues y PRs cuando eso ayude a fundamentar el trabajo. Si necesitas verificar el estado real del repo o contrastar código o documentación, hazlo antes de afirmar cierre.

---

## Entrega Final Obligatoria

Al cerrar cualquier tarea relevante, el agente debe reportar:

- objetivo cumplido o no
- alcance real del trabajo
- archivos tocados
- archivos creados
- archivos deliberadamente no tocados
- pruebas ejecutadas
- resultado de pruebas
- riesgos abiertos
- qué falta para cerrar, si algo falta
- si el runtime fue verificado o no
- rama real usada
- commit creado (hash + mensaje)
- identidad reportada de `Agent`, `Via` y `Contributor`

---

## Referencia cruzada

Documento detallado de cambio de contrato:
→ [`docs/06-governance/ai-change-contract.md`](docs/06-governance/ai-change-contract.md)

Roster de agentes:
→ [`docs/06-governance/agent-roster.md`](docs/06-governance/agent-roster.md)

Política de aprobación humana:
→ [`docs/06-governance/human-approval-policy.md`](docs/06-governance/human-approval-policy.md)
