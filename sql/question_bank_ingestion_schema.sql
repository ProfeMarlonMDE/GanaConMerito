-- Esquema inicial recomendado para ingestión y banco canónico de preguntas
-- Stack objetivo: Supabase Postgres

create extension if not exists pgcrypto;

-- =========================================================
-- 1. Catálogos básicos
-- =========================================================

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete restrict,
  code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique(subject_id, code)
);

create table if not exists public.subtopics (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete restrict,
  code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique(topic_id, code)
);

create table if not exists public.question_tags (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 2. Lotes de importación
-- =========================================================

create table if not exists public.import_batches (
  id uuid primary key default gen_random_uuid(),
  created_by uuid,
  source_type text not null check (source_type in ('csv','xlsx','json','manual','api')),
  source_file_path text,
  source_file_name text,
  source_checksum text,
  parser_version text not null default 'v1',
  schema_version text not null default 'v1',
  status text not null default 'uploaded' check (
    status in (
      'uploaded','parsing','parsed','validating','validated','publishing','published','partially_failed','failed','cancelled'
    )
  ),
  total_rows integer not null default 0,
  valid_rows integer not null default 0,
  invalid_rows integer not null default 0,
  duplicate_rows integer not null default 0,
  published_rows integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists import_batches_source_checksum_uidx
  on public.import_batches(source_checksum)
  where source_checksum is not null;

create table if not exists public.import_rows (
  id uuid primary key default gen_random_uuid(),
  import_batch_id uuid not null references public.import_batches(id) on delete cascade,
  row_number integer not null,
  raw_payload jsonb not null,
  normalized_payload jsonb,
  natural_key text,
  content_hash text,
  validation_status text not null default 'pending' check (
    validation_status in ('pending','parsed','valid','invalid','warning','duplicate','publish_ready','published','rejected')
  ),
  publication_action text check (publication_action in ('noop','create','new_version','reject_duplicate')),
  existing_question_id uuid,
  existing_question_version_id uuid,
  error_count integer not null default 0,
  warning_count integer not null default 0,
  published_question_id uuid,
  published_version_id uuid,
  last_validation_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(import_batch_id, row_number)
);

create index if not exists import_rows_batch_idx on public.import_rows(import_batch_id);
create index if not exists import_rows_natural_key_idx on public.import_rows(natural_key);
create index if not exists import_rows_content_hash_idx on public.import_rows(content_hash);
create index if not exists import_rows_validation_status_idx on public.import_rows(validation_status);

create table if not exists public.import_row_issues (
  id uuid primary key default gen_random_uuid(),
  import_row_id uuid not null references public.import_rows(id) on delete cascade,
  stage text not null check (stage in ('schema','business','referential','duplicate','publication')),
  severity text not null check (severity in ('error','warning')),
  code text not null,
  message text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists import_row_issues_row_idx on public.import_row_issues(import_row_id);
create index if not exists import_row_issues_stage_idx on public.import_row_issues(stage);

-- =========================================================
-- 3. Banco canónico
-- =========================================================

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  stable_key text not null unique,
  source_natural_key text,
  current_version_id uuid,
  status text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  question_type text not null check (question_type in ('single_choice','multiple_choice','true_false','open_text')),
  subject_id uuid not null references public.subjects(id) on delete restrict,
  topic_id uuid references public.topics(id) on delete restrict,
  subtopic_id uuid references public.subtopics(id) on delete restrict,
  difficulty text check (difficulty in ('easy','medium','hard','expert')),
  origin_batch_id uuid references public.import_batches(id) on delete set null,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists questions_source_natural_key_idx on public.questions(source_natural_key);
create index if not exists questions_subject_idx on public.questions(subject_id);
create index if not exists questions_status_idx on public.questions(status);

create table if not exists public.question_versions (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  version_number integer not null,
  stem text not null,
  explanation text,
  answer_type text not null check (answer_type in ('single_choice','multiple_choice','boolean','text')),
  correct_answer jsonb not null,
  content_hash text not null,
  metadata jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  source_import_row_id uuid references public.import_rows(id) on delete set null,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique(question_id, version_number)
);

create unique index if not exists question_versions_question_hash_uidx
  on public.question_versions(question_id, content_hash);

create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_version_id uuid not null references public.question_versions(id) on delete cascade,
  option_key text not null,
  option_text text not null,
  is_correct boolean not null default false,
  sort_order integer not null,
  created_at timestamptz not null default now(),
  unique(question_version_id, option_key),
  unique(question_version_id, sort_order)
);

create table if not exists public.question_tag_map (
  question_id uuid not null references public.questions(id) on delete cascade,
  tag_id uuid not null references public.question_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (question_id, tag_id)
);

create table if not exists public.question_events (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  question_version_id uuid references public.question_versions(id) on delete set null,
  event_type text not null,
  actor_id uuid,
  source text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists question_events_question_idx on public.question_events(question_id);
create index if not exists question_events_type_idx on public.question_events(event_type);

-- =========================================================
-- 4. Enlace diferido de current_version_id
-- =========================================================

do $$
begin
  if not exists (
    select 1
    from information_schema.table_constraints
    where table_schema = 'public'
      and table_name = 'questions'
      and constraint_name = 'questions_current_version_fk'
  ) then
    alter table public.questions
      add constraint questions_current_version_fk
      foreign key (current_version_id)
      references public.question_versions(id)
      on delete set null;
  end if;
end $$;

-- =========================================================
-- 5. Trigger simple para updated_at
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_import_batches_updated_at on public.import_batches;
create trigger trg_import_batches_updated_at
before update on public.import_batches
for each row execute function public.set_updated_at();

drop trigger if exists trg_import_rows_updated_at on public.import_rows;
create trigger trg_import_rows_updated_at
before update on public.import_rows
for each row execute function public.set_updated_at();

drop trigger if exists trg_questions_updated_at on public.questions;
create trigger trg_questions_updated_at
before update on public.questions
for each row execute function public.set_updated_at();

-- =========================================================
-- 6. Notas operativas
-- =========================================================
-- Recomendado:
-- 1. RLS por roles editoriales y operativos.
-- 2. Jobs de parse, validate y publish fuera de requests HTTP.
-- 3. Upserts y publicación dentro de transacciones por fila o chunk controlado.
-- 4. `stable_key`, `natural_key` y `content_hash` deben calcularse en la capa de dominio compartida.
-- 5. No publicar filas con issues de severidad error.
