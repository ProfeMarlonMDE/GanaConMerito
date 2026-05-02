Pégale esto a la otra IA. Va directo, sin ambigüedad.

---

# Instrucción de remediación completa — cierre real de Sprint 4

Tu trabajo anterior **no quedó cerrado completamente**.

## Problema detectado
Aunque el código de Sprint 4 sí llegó a `master` en el commit:

```bash
304f9507407ccf862260931fcfc7b6bbbf842042
```

la **documentación canónica no quedó alineada** con ese cierre.

La auditoría detectó que en la fuente canónica todavía persisten inconsistencias:

- `docs/project/status.md` sigue reportando referencias viejas (`0.4.8`, `701ebcf`, “no hay Sprint 4 formal abierto”)
- `docs/02-delivery/sprint-log.md` no abre/cierra formalmente Sprint 4
- `docs/02-delivery/change-log.md` no registra Sprint 4
- `docs/01-product/backlog.md` fue tocado, pero no basta por sí solo para declarar cierre

## Lo que debes hacer ahora
Debes hacer el **trabajo completo**, no parcial.

---

# 1. Carpeta fuente obligatoria
Trabaja en:

```bash
/home/ubuntu/.openclaw/product
```

No uses `/opt/gcm/app` como fuente de edición principal.

---

# 2. Archivos que debes corregir sí o sí

```bash
/home/ubuntu/.openclaw/product/docs/project/status.md
/home/ubuntu/.openclaw/product/docs/02-delivery/sprint-log.md
/home/ubuntu/.openclaw/product/docs/02-delivery/change-log.md
/home/ubuntu/.openclaw/product/docs/01-product/backlog.md
```

---

# 3. Qué debe quedar explícito

## En `docs/project/status.md`
Debes actualizar el estado operativo para reflejar la realidad nueva.

### Debe quedar claro:
- app declarada en **`0.5.0`**
- commit de Sprint 4 = **`304f950`**
- Sprint 4 sí existió y corresponde a **Productización del core**
- cambios reales del sprint:
  - simplificación de navegación principal
  - salida de editorial/biblioteca del nav del usuario
  - mobile polish
  - estados `LoadingState`, `EmptyState`, `ErrorState`
  - endurecimiento de práctica y home
- `Tutor GCM` **no** fue implementado funcionalmente
- editorial sigue existiendo técnicamente, pero **no** como superficie principal de usuario
- si ya existe validación de runtime real en VPS, escríbela correctamente
- si la triple verificación `product = /opt/gcm/app = runtime visible` ya fue confirmada para `304f950`, déjala explícita
- si algo no fue confirmado, no lo inventes

---

## En `docs/02-delivery/sprint-log.md`
Debes crear o incorporar formalmente el cierre de **Sprint 4**.

### Estructura mínima obligatoria:
- Nombre: **Sprint 4 - Productización del core**
- Estado: **cerrado** si ya quedó realmente validado
- Fecha: `2026-05-02`
- Objetivo
- Outcome esperado
- Comprometido
- Entregado
- No alcance
- Riesgos remanentes
- Criterio de cierre

### El contenido debe reflejar:
#### Comprometido
- navegación y continuidad entre pantallas
- estados loading/empty/error
- mobile polish y consistencia visual
- copy UX y jerarquía de acciones
- reducción de fricción en onboarding/práctica/dashboard
- QA hardening del core

#### Entregado
- AppNav reducido a Inicio / Práctica / Métricas
- biblioteca/editorial fuera de navegación principal del usuario
- componentes `LoadingState`, `EmptyState`, `ErrorState`
- mejoras en home y práctica para continuidad del flujo
- versión `0.5.0`
- build validado
- `test:dashboard` verde
- QA runtime/E2E solo si de verdad fue ejecutada y validada

#### No alcance
- implementación funcional de Tutor GCM
- reapertura de editorial como producto de usuario final
- cambios de migraciones/schema Supabase
- cambios estructurales de deploy más allá del rebuild operativo

---

## En `docs/02-delivery/change-log.md`
Debes añadir una entrada nueva con fecha **2026-05-02**.

### Debe incluir:
- tipo
- módulo
- resumen
- sprint asociado = Sprint 4
- commit `304f950`
- mención explícita de:
  - nav simplificado
  - hardening UX
  - states loading/empty/error
  - exclusión de editorial del flujo principal
  - versión `0.5.0`

No dejes este cierre escondido en backlog. Debe quedar en changelog.

---

## En `docs/01-product/backlog.md`
No basta con la nota corta actual.

Debes revisar que el backlog:
- no contradiga Sprint 4
- no siga hablando como si no hubiera pasado
- mantenga editorial/question-bank como frente diferido
- no sugiera que Tutor GCM se implementó

Puedes mantener la sección ya agregada, pero debe quedar coherente con `status`, `sprint-log` y `change-log`.

---

# 4. Reglas de honestidad
No inventes evidencia.

## Si realmente verificaste en VPS:
- commit visible en runtime
- buildTime visible
- smoke test verde
- E2E verde

entonces documéntalo con precisión.

## Si no lo verificaste de forma real:
no lo declares como hecho.

---

# 5. Validación obligatoria después de editar docs
Después de corregir los documentos, debes ejecutar al menos:

```bash
cd /home/ubuntu/.openclaw/product
git diff -- docs/project/status.md docs/02-delivery/sprint-log.md docs/02-delivery/change-log.md docs/01-product/backlog.md
git status --short
```

Y luego dejar commit limpio con mensaje claro.

### Commit sugerido
```bash
docs(sprint): close sprint 4 and align status with runtime reality
```

---

# 6. Si también vas a cerrar la parte VPS
Solo después de cerrar la fuente canónica:

- alinea `/opt/gcm/app`
- rebuild si hace falta
- verifica runtime visible
- confirma commit y buildTime
- corre smoke/E2E solo si el entorno está listo

---

# 7. Entrega final obligatoria
Tu respuesta final debe incluir exactamente esto:

1. archivos modificados
2. resumen de cada archivo corregido
3. commit generado
4. si hubo push
5. si hubo redeploy
6. si la triple verificación quedó cerrada o no
7. qué evidencia real respalda esa afirmación

No me des storytelling.
No me digas “misión cumplida” si `status.md`, `sprint-log.md` y `change-log.md` no quedaron alineados de verdad.

Haz el trabajo **completo**.