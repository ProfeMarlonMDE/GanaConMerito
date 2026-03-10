# Contratos API del MVP

## Rutas actuales

### `POST /api/session/start`
Entrada:
- `mode`
- `area?`
- `competency?`

Salida:
- `sessionId`
- `currentState`
- `mode`
- `currentItemId?`
- `hintLevel`
- `activeArea?`
- `activeCompetency?`

### `POST /api/session/advance`
Entrada:
- `sessionId`
- `itemId`
- `selectedOption?`
- `userRationale?`
- `responseTimeMs?`
- `confidenceSelfReport?`

Salida:
- `sessionId`
- `previousState`
- `currentState`
- `evaluation`
- `feedbackText`
- `hintLevel`
- `nextItemId?`
- `shouldTransition`

### `POST /api/content/validate`
Entrada:
- `rawMarkdown`

Salida:
- `ok`
- `errors[]`
- `warnings[]`
- `parsed?`

### `POST /api/content/upload`
Entrada:
- `rawMarkdown`

Salida:
- `ok`
- `itemId?`
- `version?`
- `errors[]`

### `GET /api/dashboard/summary`
Salida:
- `estimatedLevel`
- `percentileSegment?`
- `totalAttempts`
- `totalCorrect`
- `avgReasoningScore`
- `strongestCompetencies[]`
- `weakestCompetencies[]`
- `recentTrend`

## Estado real

Las rutas existen en `src/app/api/`.

### Ya implementado realmente
- `content/validate` parsea y valida Markdown real
- `content/upload` persiste `item_bank` e `item_options` en Supabase

### Aún pendiente
- persistencia real de sesiones
- auth avanzada por roles
- dashboard con datos reales
