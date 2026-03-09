# Arquitectura MVP

## Parte 1/5

Te dejo una versión depurada y coherente del MVP, incorporando las observaciones válidas que revisamos.
Voy a corregir 5 cosas a la vez:
- taxonomía oficial de estados,
- restricciones del banco de ítems,
- semántica de respuestas,
- trazabilidad de evaluación,
- contratos DTO para endpoints.

### 1. Decisiones oficiales ya cerradas
Estas quedan como reglas base del MVP.

#### Estados persistidos oficiales
Solo estos viven en `sessions.current_state`:

```ts
type SessionState =
 | "onboarding"
 | "diagnostic"
 | "practice"
 | "remediation"
 | "review"
 | "session_close"
 | "expired"
 | "error";
```

#### Procesos internos no persistidos como estado principal

```ts
type SessionProcess =
 | "evaluating_response"
 | "updating_memory"
 | "selecting_next_item"
 | "generating_feedback";
```

#### Escala oficial de dificultad
`difficulty` va de 0.00 a 1.00.

#### Semántica de respuesta
- `selected_option`: respuesta objetiva de múltiple opción.
- `user_rationale`: razonamiento libre del usuario.

#### Evaluación
El motor actual se considera:

`baseline heuristic scoring v1`

No es todavía el motor final.

## Parte 2/5

### 2. Esquema SQL depurado

#### 2.1 profiles
```sql
create table profiles (
 id uuid primary key default gen_random_uuid(),
 auth_user_id uuid unique not null,
 full_name text,
 email text unique,
 avatar_url text,
 is_admin boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
```

#### 2.2 learning_profiles
```sql
create table learning_profiles (
 id uuid primary key default gen_random_uuid(),
 profile_id uuid not null references profiles(id) on delete cascade,
 target_role text not null,
 exam_type text not null,
 country_context text not null default 'colombia',
 preferred_feedback_style text not null default 'socratic',
 active_goal text,
 active_areas text[] not null default '{}',
 onboarding_completed boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(profile_id)
);
```

#### 2.3 sessions
```sql
create table sessions (
 id uuid primary key default gen_random_uuid(),
 profile_id uuid not null references profiles(id) on delete cascade,
 mode text not null check (mode in ('practice', 'exam', 'review')),
 current_state text not null check (
 current_state in (
 'onboarding',
 'diagnostic',
 'practice',
 'remediation',
 'review',
 'session_close',
 'expired',
 'error'
 )
 ),
 status text not null default 'active' check (status in ('active', 'completed', 'expired', 'error')),
 started_at timestamptz not null default now(),
 ended_at timestamptz,
 created_at timestamptz not null default now()
);
```

#### 2.4 item_bank
```sql
create table item_bank (
 id uuid primary key default gen_random_uuid(),
 slug text unique not null,
 title text not null,
 area text not null,
 subarea text,
 exam_type text not null,
 competency text not null,
 difficulty numeric(4,2) not null check (difficulty >= 0 and difficulty <= 1),
 target_level text,
 item_type text not null default 'multiple_choice' check (item_type in ('multiple_choice')),
 stem text not null,
 correct_option text not null check (correct_option in ('A', 'B', 'C', 'D')),
 explanation text not null,
 normative_refs text[] not null default '{}',
 is_published boolean not null default false,
 version integer not null default 1 check (version >= 1),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
```

#### 2.5 item_options
```sql
create table item_options (
 id uuid primary key default gen_random_uuid(),
 item_id uuid not null references item_bank(id) on delete cascade,
 option_key text not null check (option_key in ('A', 'B', 'C', 'D')),
 option_text text not null,
 unique(item_id, option_key)
);
```

Nota:
No pongo `unique(item_id, option_text)` en SQL.
Ese control lo dejamos para el validador de contenido.

#### 2.6 session_turns
```sql
create table session_turns (
 id uuid primary key default gen_random_uuid(),
 session_id uuid not null references sessions(id) on delete cascade,
 item_id uuid references item_bank(id),
 turn_number integer not null check (turn_number >= 1),
 prompt_text text,
 selected_option text check (selected_option in ('A', 'B', 'C', 'D')),
 user_rationale text,
 model_feedback text,
 response_time_ms integer check (response_time_ms is null or response_time_ms >= 0),
 confidence_self_report integer check (
 confidence_self_report is null or
 (confidence_self_report >= 1 and confidence_self_report <= 5)
 ),
 created_at timestamptz not null default now(),
 unique(session_id, turn_number)
);
```

#### 2.7 evaluation_events
```sql
create table evaluation_events (
 id uuid primary key default gen_random_uuid(),
 session_turn_id uuid not null references session_turns(id) on delete cascade,
 item_id uuid references item_bank(id),
 is_correct boolean not null,
 reasoning_score numeric(5,2) not null default 0 check (reasoning_score >= 0 and reasoning_score <= 100),
 normative_consistency_score numeric(5,2) not null default 0 check (normative_consistency_score >= 0 and normative_consistency_score <= 100),
 competency_score numeric(5,2) not null default 0 check (competency_score >= 0 and competency_score <= 100),
 estimated_theta_delta numeric(6,3) not null default 0,
 remediation_needed boolean not null default false,
 evaluation_source text not null default 'hybrid' check (
 evaluation_source in ('deterministic', 'llm', 'hybrid')
 ),
 evaluation_version text not null default 'baseline-heuristic-v1',
 created_at timestamptz not null default now()
);
```

#### 2.8 user_topic_stats
```sql
create table user_topic_stats (
 id uuid primary key default gen_random_uuid(),
 profile_id uuid not null references profiles(id) on delete cascade,
 area text not null,
 competency text not null,
 attempts integer not null default 0 check (attempts >= 0),
 correct_count integer not null default 0 check (correct_count >= 0),
 avg_reasoning_score numeric(5,2) not null default 0 check (avg_reasoning_score >= 0 and avg_reasoning_score <= 100),
 avg_difficulty numeric(4,2) not null default 0 check (avg_difficulty >= 0 and avg_difficulty <= 1),
 estimated_level numeric(6,3) not null default 0,
 percentile_segment numeric(5,2) check (
 percentile_segment is null or
 (percentile_segment >= 0 and percentile_segment <= 100)
 ),
 updated_at timestamptz not null default now(),
 unique(profile_id, area, competency)
);
```

#### 2.9 user_skill_snapshots
```sql
create table user_skill_snapshots (
 id uuid primary key default gen_random_uuid(),
 profile_id uuid not null references profiles(id) on delete cascade,
 snapshot_type text not null check (snapshot_type in ('session', 'weekly', 'topic')),
 summary_text text not null,
 strengths_json jsonb not null default '{}'::jsonb,
 weaknesses_json jsonb not null default '{}'::jsonb,
 recurrent_errors_json jsonb not null default '{}'::jsonb,
 recommended_focus_json jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
```

## Parte 3/5

### 3. RLS mínima recomendada

#### Activación
```sql
alter table profiles enable row level security;
alter table learning_profiles enable row level security;
alter table sessions enable row level security;
alter table session_turns enable row level security;
alter table evaluation_events enable row level security;
alter table user_topic_stats enable row level security;
alter table user_skill_snapshots enable row level security;
```

#### Ejemplo para profiles
```sql
create policy "profiles_select_own"
on profiles
for select
using (auth.uid() = auth_user_id);

create policy "profiles_update_own"
on profiles
for update
using (auth.uid() = auth_user_id);
```

Después se replica la lógica por relación con `profile_id`.

### 4. Tipos TypeScript oficiales

#### types/session.ts
```ts
export type SessionMode = "practice" | "exam" | "review";

export type SessionState =
 | "onboarding"
 | "diagnostic"
 | "practice"
 | "remediation"
 | "review"
 | "session_close"
 | "expired"
 | "error";

export type SessionProcess =
 | "evaluating_response"
 | "updating_memory"
 | "selecting_next_item"
 | "generating_feedback";

export interface SessionContext {
 sessionId: string;
 profileId: string;
 mode: SessionMode;
 currentState: SessionState;
 currentItemId?: string;
 hintLevel: number;
 activeArea?: string;
 activeCompetency?: string;
 activeProcess?: SessionProcess;
}
```

#### types/content.ts
```ts
export type ItemArea =
 | "matematicas"
 | "pedagogia"
 | "normatividad"
 | "gestion"
 | "lectura_critica"
 | "competencias_ciudadanas";

export type ItemType = "multiple_choice";

export type OptionKey = "A" | "B" | "C" | "D";

export interface ItemOption {
 key: OptionKey;
 text: string;
}

export interface ContentItem {
 id: string;
 slug: string;
 title: string;
 area: ItemArea;
 subarea?: string;
 examType: string;
 competency: string;
 difficulty: number; // 0.00 a 1.00
 targetLevel?: string;
 itemType: ItemType;
 stem: string;
 options: ItemOption[];
 correctOption: OptionKey;
 explanation: string;
 normativeRefs: string[];
 published: boolean;
 version: number;
}
```

#### types/evaluation.ts
```ts
export type EvaluationSource = "deterministic" | "llm" | "hybrid";

export interface EvaluationResult {
 isCorrect: boolean;
 reasoningScore: number; // 0-100
 normativeConsistencyScore: number; // 0-100
 competencyScore: number; // 0-100
 estimatedThetaDelta: number;
 remediationNeeded: boolean;
 evaluationSource: EvaluationSource;
 evaluationVersion: string;
 qualitativeFeedback?: string;
}
```

#### types/turn.ts
```ts
import type { OptionKey } from "./content";

export interface SessionTurnInput {
 sessionId: string;
 itemId: string;
 turnNumber: number;
 selectedOption?: OptionKey;
 userRationale?: string;
 responseTimeMs?: number;
 confidenceSelfReport?: 1 | 2 | 3 | 4 | 5;
}
```

## Parte 4/5

### 5. DTOs oficiales para endpoints
Aquí estaba una de las observaciones más importantes.
Esto sí conviene dejarlo listo desde ahora.

#### 5.1 /api/session/start
**Request**
```ts
export interface StartSessionRequest {
 mode: "practice" | "exam" | "review";
 area?: string;
 competency?: string;
}
```

**Response**
```ts
export interface StartSessionResponse {
 sessionId: string;
 currentState: SessionState;
 mode: SessionMode;
 currentItemId?: string;
 hintLevel: number;
 activeArea?: string;
 activeCompetency?: string;
}
```

#### 5.2 /api/session/advance
**Request**
```ts
export interface AdvanceSessionRequest {
 sessionId: string;
 itemId: string;
 selectedOption?: "A" | "B" | "C" | "D";
 userRationale?: string;
 responseTimeMs?: number;
 confidenceSelfReport?: 1 | 2 | 3 | 4 | 5;
}
```

**Response**
```ts
export interface AdvanceSessionResponse {
 sessionId: string;
 previousState: SessionState;
 currentState: SessionState;
 evaluation: EvaluationResult;
 feedbackText: string;
 hintLevel: number;
 nextItemId?: string;
 shouldTransition: boolean;
}
```

#### 5.3 /api/evaluate
**Request**
```ts
export interface EvaluateRequest {
 itemId: string;
 selectedOption?: "A" | "B" | "C" | "D";
 userRationale?: string;
 responseTimeMs?: number;
 confidenceSelfReport?: 1 | 2 | 3 | 4 | 5;
 priorEstimatedLevel?: number;
}
```

**Response**
```ts
export interface EvaluateResponse {
 result: EvaluationResult;
}
```

#### 5.4 /api/content/validate
**Request**
```ts
export interface ValidateContentRequest {
 rawMarkdown: string;
}
```

**Response**
```ts
export interface ValidateContentResponse {
 ok: boolean;
 errors: string[];
 warnings: string[];
 parsed?: {
 id: string;
 slug: string;
 title: string;
 area: string;
 competency: string;
 difficulty: number;
 correctOption: "A" | "B" | "C" | "D";
 optionCount: number;
 };
}
```

#### 5.5 /api/content/upload
**Request**
```ts
export interface UploadContentRequest {
 rawMarkdown: string;
}
```

**Response**
```ts
export interface UploadContentResponse {
 ok: boolean;
 itemId?: string;
 version?: number;
 errors: string[];
}
```

#### 5.6 /api/dashboard/summary
**Request**
```ts
export interface DashboardSummaryRequest {
 profileId?: string;
}
```

**Response**
```ts
export interface DashboardSummaryResponse {
 estimatedLevel: number;
 percentileSegment?: number;
 totalAttempts: number;
 totalCorrect: number;
 avgReasoningScore: number;
 strongestCompetencies: string[];
 weakestCompetencies: string[];
 recentTrend: "up" | "stable" | "down";
}
```

## Parte 5/5

### 6. Máquina de estados corregida
La versión anterior era demasiado simple.
Esta sigue siendo MVP, pero ya está más limpia.

#### domain/orchestrator/session-machine.ts
```ts
import type { SessionState } from "@/types/session";

interface NextStateInput {
 currentState: SessionState;
 onboardingCompleted: boolean;
 hasBaseline: boolean;
 remediationNeeded: boolean;
 shouldReview: boolean;
 isSessionEnding: boolean;
 isExpired: boolean;
 hasError: boolean;
}

export function getNextState(input: NextStateInput): SessionState {
 if (input.hasError) return "error";
 if (input.isExpired) return "expired";
 if (!input.onboardingCompleted) return "onboarding";
 if (!input.hasBaseline) return "diagnostic";
 if (input.isSessionEnding) return "session_close";

 switch (input.currentState) {
 case "onboarding":
 return input.onboardingCompleted ? "diagnostic" : "onboarding";

 case "diagnostic":
 return input.hasBaseline ? "practice" : "diagnostic";

 case "practice":
 if (input.remediationNeeded) return "remediation";
 if (input.shouldReview) return "review";
 return "practice";

 case "remediation":
 return input.remediationNeeded ? "remediation" : "practice";

 case "review":
 return input.isSessionEnding ? "session_close" : "practice";

 case "session_close":
 return "session_close";

 case "expired":
 return "expired";

 case "error":
 return "error";

 default:
 return "practice";
 }
}
```

### 7. Motor de evaluación corregido
No lo presentaremos como motor final.
Lo dejamos explícitamente como heurística base.

#### domain/evaluation/score-response.ts
```ts
import type { EvaluationResult } from "@/types/evaluation";

interface ScoreParams {
 selectedOption?: string;
 correctOption: string;
 responseTimeMs?: number;
 difficulty: number; // 0..1
 reasoningScore?: number; // 0..100
 normativeConsistencyScore?: number; // 0..100
 priorEstimatedLevel?: number;
}

export function scoreResponseBaselineHeuristicV1(
 params: ScoreParams
): EvaluationResult {
 const isCorrect = params.selectedOption === params.correctOption;

 const reasoningScore =
 params.reasoningScore ?? (isCorrect ? 75 : 40);

 const normativeConsistencyScore =
 params.normativeConsistencyScore ?? (isCorrect ? 70 : 35);

 const competencyScore =
 reasoningScore * 0.5 +
 normativeConsistencyScore * 0.2 +
 (isCorrect ? 30 : 0);

 const estimatedThetaDelta = isCorrect
 ? 0.08 + params.difficulty * 0.05
 : -0.06 - params.difficulty * 0.03;

 return {
 isCorrect,
 reasoningScore,
 normativeConsistencyScore,
 competencyScore,
 estimatedThetaDelta,
 remediationNeeded: !isCorrect && competencyScore < 60,
 evaluationSource: "hybrid",
 evaluationVersion: "baseline-heuristic-v1",
 };
}
```

### 8. Validador de contenido corregido
Aquí conviene agregar controles semánticos, no solo de estructura.

#### Reglas del validador
- frontmatter obligatorio,
- difficulty entre 0 y 1,
- exactamente 4 opciones,
- una sola respuesta correcta,
- correctOption debe existir,
- no opciones vacías,
- warning si hay textos de opciones duplicados.

#### Ejemplo de validador
```ts
export function validateOptions(options: { key: string; text: string }[]) {
 const errors: string[] = [];
 const warnings: string[] = [];

 if (options.length !== 4) {
 errors.push("El item debe tener exactamente 4 opciones.");
 }

 const validKeys = ["A", "B", "C", "D"];
 const keys = options.map((o) => o.key);

 for (const key of keys) {
 if (!validKeys.includes(key)) {
 errors.push(`Opción inválida: ${key}`);
 }
 }

 const uniqueKeys = new Set(keys);
 if (uniqueKeys.size !== keys.length) {
 errors.push("Hay claves de opción duplicadas.");
 }

 const normalizedTexts = options.map((o) => o.text.trim().toLowerCase());
 const uniqueTexts = new Set(normalizedTexts);
 if (uniqueTexts.size !== normalizedTexts.length) {
 warnings.push("Hay textos de opciones duplicados o muy similares.");
 }

 return { errors, warnings };
}
```

### 9. Formato Markdown canónico final
```md
---
id: item-doc-0001
slug: caso-convivencia-001
title: Caso de convivencia escolar
area: normatividad
subarea: convivencia_escolar
examType: docente
competency: interpretacion_normativa
difficulty: 0.62
targetLevel: satisfactorio
itemType: multiple_choice
normativeRefs:
 - ley_1098
 - decreto_1075
published: true
version: 1
---

## Enunciado
Un estudiante de 13 años incurre en una conducta que afecta la convivencia escolar. El comité propone excluirlo inmediatamente del establecimiento. ¿Cuál es la respuesta más adecuada?

## Opciones
- A. Confirmar la exclusión inmediata porque protege a la institución.
- B. Revisar debido proceso, interés superior del menor y medidas pedagógicas proporcionales.
- C. Delegar la decisión exclusivamente al docente titular.
- D. Aplicar cualquier sanción sin revisión del manual de convivencia.

## RespuestaCorrecta
B

## Explicacion
La opción correcta es B porque la actuación debe armonizar el debido proceso, el interés superior del menor y el marco normativo aplicable.

## ErroresFrecuentes
- Confundir disciplina con exclusión automática
- Ignorar debido proceso
- No revisar proporcionalidad de la medida
```

### 10. Lo que queda explícitamente como deuda futura
Para que no haya ambigüedad, estas piezas quedan declaradas como evolución futura:
- motor de evaluación formal dividido en:
  - deterministic scoring
  - llm-assisted rubric scoring
- percentiles más cercanos a TRI/IRT
- roles/permisos más ricos que `is_admin`
- soporte a otros tipos de ítem
- importación CSV/XLSX
- voz y tiempo real multimodal

### 11. Veredicto general sobre las sugerencias revisadas
Después de revisar todas las observaciones que trajiste, la conclusión es:
- sí mejoraron el diseño,
- sí valía la pena incorporarlas,
- y ahora el esquema quedó bastante más coherente para un MVP real.

La siguiente pieza más útil ya no es conceptual.
Lo siguiente sería producir uno de estos dos entregables:
- A. migración SQL completa para Supabase
- B. scaffold de código Next.js con archivos base y stubs tipados.

Mi recomendación: ir con A primero.
