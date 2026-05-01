Hola, profesor Marlon. Es un ejercicio brillante haber sometido el diseño a múltiples "pares" analíticos. Al cruzar las cuatro auditorías, se hace evidente que **hay un consenso absoluto**: la decisión de usar el "núcleo temático" como puente es la correcta y responde perfectamente a tu pregunta central (es la mínima complejidad necesaria).

Sin embargo, también hay un consenso unánime en que **la migración `0006` y el acoplamiento con el modelo actual tienen fisuras peligrosas**.

Aquí tienes la síntesis definitiva de los hallazgos críticos y sus soluciones directas, listos para integrarse en tu plan.

---

### 🚨 Consolidado de Hallazgos Críticos

Al cruzar los análisis, destacan 5 problemas fundamentales que todas las IAs detectaron:

1. **Ubicación errónea del Perfil Profesional (Fricción de negocio)**
La propuesta inyecta `professional_profile_id` en la tabla `profiles` (identidad del usuario). Todas las auditorías coinciden en que esto es un error. El perfil profesional es una "meta pedagógica", por lo que pertenece a `learning_profiles`, donde actualmente ya existe y compite semánticamente con `target_role` y `exam_type`.
2. **Bug Crítico: Doble fuente de verdad editorial**
Al introducir la columna `status` ('draft', 'published', etc.) pero dejar viva la columna booleana `is_published`, se rompe la seguridad. La política RLS actual y el motor `selectNextItem` siguen leyendo `is_published`. Si un editor cambia el `status` a 'archived', la pregunta seguirá siendo visible si `is_published` sigue en `true`.
3. **Colisión de Taxonomías (Núcleo vs. Área/Competencia)**
`item_bank` ya clasifica el progreso adaptativo por `area` y `competency` (vital para el dashboard y `user_topic_stats`). La nueva tabla `thematic_nuclei` introduce sus propias columnas `area` y `subarea`. Esta superposición va a ensuciar las métricas si no se define una jerarquía clara.
4. **Vulnerabilidades y omisiones en la Migración 0006**
* Nomenclatura ambigua en la tabla pivote (`profile_id` en lugar de `professional_profile_id`).
* RLS demasiado abierta: la matriz que define qué perfiles ven qué núcleos queda visible para cualquier usuario autenticado, exponiendo la estrategia de negocio.
* Falta el trigger `updated_at` en la tabla pivote `profile_thematic_nuclei`.
* Falta un índice compuesto clave para que la nueva selección no degrade el rendimiento.


5. **Riesgo de "Limbo" en el Backfill**
`thematic_nucleus_id` se crea permitiendo valores nulos (`NULL`). Si se actualiza la lógica de selección antes de asignar un núcleo a *todas* las preguntas, las preguntas sin núcleo desaparecerán de la práctica de los estudiantes.

---

### 🛠️ Plan de Soluciones y Ajustes

Para blindar la arquitectura antes de tocar producción, debes aplicar estas soluciones directas:

**Solución 1: Refactorizar el destino del Perfil y limpiar la semántica**

* Modifica la migración 0006 para que `professional_profile_id` se agregue a la tabla `learning_profiles`, NO a `profiles`.
* Establece una regla interna: `professional_profile_id` será el eje de segmentación (acceso), mientras que `target_role` quedará temporalmente como un campo de texto libre para el onboarding, con miras a ser deprecado.

**Solución 2: Resolver la dualidad editorial de inmediato**

* En la migración 0006, sincroniza los datos:
```sql
UPDATE public.item_bank SET status = 'draft' WHERE is_published = false AND status = 'draft';

```


* **Crucial:** En esta misma migración, actualiza la política RLS `item_bank_select_published` para que valide `status = 'published' AND is_active = true` en lugar de `is_published = true`.

**Solución 3: Definir la Jerarquía del Motor (Elegibilidad vs. Adaptabilidad)**

* Documenta e implementa `selectNextItem` en dos pasos claros:
1. **Elegibilidad (Acceso):** Filtra por `status`, `is_active` y `thematic_nucleus_id` (valida si el núcleo es universal o del perfil del usuario).
2. **Adaptabilidad (Pedagogía):** Una vez filtrado lo anterior, rankea y selecciona usando `area` y `competency`.


* *Nota:* Mantén `user_topic_stats` calculando el nivel sobre `area` y `competency`. El núcleo sirve para dar acceso, el área/competencia sirve para medir el aprendizaje.

**Solución 4: Endurecer la Migración 0006 (Corrección de código SQL)**

* Renombra las columnas en `profile_thematic_nuclei` a `professional_profile_id` y `thematic_nucleus_id` para evitar JOINs accidentales con `profiles.id`.
* Añade el trigger faltante: `CREATE TRIGGER trg_profile_thematic_nuclei_updated_at...`
* Cambia las políticas RLS de las 3 tablas nuevas para que los `INSERT/UPDATE/DELETE` (y preferiblemente los `SELECT` de la matriz) exijan `is_admin = true`.
* Añade el índice compuesto para el "hot path":
```sql
CREATE INDEX idx_item_bank_selection ON public.item_bank(thematic_nucleus_id, status, is_active);

```



---

### 🗺️ Nuevo Orden de Ejecución Estratégico

Basado en las soluciones, el plan de vuelo ideal se reordena en dos "Épicas" para evitar romper la app actual:

**ÉPICA 1: Segmentación Invisible (No rompe nada)**

1. Reescribir y ejecutar la migración `0006_segmentation_core` (con las soluciones de arriba).
2. **Backfill silencioso:** Crear los perfiles y núcleos vía base de datos. Asignar cada pregunta existente a un `thematic_nucleus_id`.
3. **El "Gate" (Punto de control):** Verificar mediante SQL que ninguna pregunta con `status = 'published'` tenga el `thematic_nucleus_id` nulo.
4. Actualizar el código de `selectNextItem.ts` para usar la nueva lógica de núcleos y perfiles.

**ÉPICA 2: Módulo Editorial (Administración)**
5. Actualizar el flujo de Onboarding para que el usuario seleccione su perfil oficial.
6. Habilitar la "Biblioteca Editorial" de solo lectura (`/editorial`).
7. Construir los CRUDs administrativos (`/admin/editorial/*`) para gestionar perfiles, núcleos y estados sin tocar la base de datos a mano.

### supabase/migrations/0006_segmentation_core.sql
-- 0006_segmentation_core.sql
-- Evolución arquitectónica: segmentación por perfil profesional + núcleos temáticos
-- Corrige dependencias del MVP y prepara la capa de elegibilidad para el módulo editorial

begin;

-- 1. Creación de catálogos base
create table if not exists public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  area text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.thematic_nuclei (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  area text,
  subarea text,
  is_universal boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Matriz de relación (corregida la nomenclatura de IDs)
create table if not exists public.profile_thematic_nuclei (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid not null references public.professional_profiles(id) on delete cascade,
  thematic_nucleus_id uuid not null references public.thematic_nuclei(id) on delete cascade,
  is_enabled boolean not null default true,
  priority_weight integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (professional_profile_id, thematic_nucleus_id)
);

-- 3. Extensión de perfiles de aprendizaje (Movido de 'profiles' a 'learning_profiles')
alter table public.learning_profiles
  add column if not exists professional_profile_id uuid references public.professional_profiles(id);

-- 4. Extensión del Banco de Ítems
alter table public.item_bank
  add column if not exists thematic_nucleus_id uuid references public.thematic_nuclei(id),
  add column if not exists status text not null default 'draft' check (
    status in ('draft', 'review', 'published', 'archived')
  ),
  add column if not exists is_active boolean not null default true,
  add column if not exists source_type text not null default 'manual' check (
    source_type in ('manual', 'markdown', 'import', 'seed')
  ),
  add column if not exists source_path text;

-- Comentario preventivo para el equipo/futuro
comment on column public.item_bank.thematic_nucleus_id is 'Nullable durante transición. Debe ser NOT NULL tras el backfill de la Fase 2 para garantizar segmentación.';

-- 5. Backfill y Sincronización de la Verdad Editorial (Bidireccional)
update public.item_bank
set status = 'published'
where is_published = true
  and status = 'draft';

update public.item_bank
set status = 'draft'
where is_published = false
  and status = 'draft';

-- 6. Índices Optimizados
create index if not exists idx_professional_profiles_code on public.professional_profiles(code);
create index if not exists idx_professional_profiles_active on public.professional_profiles(is_active);

create index if not exists idx_thematic_nuclei_code on public.thematic_nuclei(code);
create index if not exists idx_thematic_nuclei_active on public.thematic_nuclei(is_active);
create index if not exists idx_thematic_nuclei_universal on public.thematic_nuclei(is_universal);

create index if not exists idx_profile_thematic_nuclei_prof_id on public.profile_thematic_nuclei(professional_profile_id);
create index if not exists idx_profile_thematic_nuclei_nuc_id on public.profile_thematic_nuclei(thematic_nucleus_id);
create index if not exists idx_profile_thematic_nuclei_enabled on public.profile_thematic_nuclei(is_enabled);

create index if not exists idx_learning_profiles_professional_profile_id on public.learning_profiles(professional_profile_id);

-- Índice compuesto crucial para el hot-path de selectNextItem
create index if not exists idx_item_bank_selection on public.item_bank(thematic_nucleus_id, status, is_active);

-- 7. Triggers de actualización (Agregado el faltante de la matriz)
create trigger trg_professional_profiles_updated_at
before update on public.professional_profiles
for each row
execute function public.set_updated_at();

create trigger trg_thematic_nuclei_updated_at
before update on public.thematic_nuclei
for each row
execute function public.set_updated_at();

create trigger trg_profile_thematic_nuclei_updated_at
before update on public.profile_thematic_nuclei
for each row
execute function public.set_updated_at();

-- 8. Seguridad RLS (Row Level Security) endurecida
alter table public.professional_profiles enable row level security;
alter table public.thematic_nuclei enable row level security;
alter table public.profile_thematic_nuclei enable row level security;

-- Lectura de catálogos base abierta para autenticados (necesario para selectores en UI/onboarding)
create policy professional_profiles_select_authenticated
on public.professional_profiles for select
using (auth.uid() is not null);

create policy thematic_nuclei_select_authenticated
on public.thematic_nuclei for select
using (auth.uid() is not null);

-- Matriz de relación restringida SOLO a administradores para evitar fugas de estrategia
create policy profile_thematic_nuclei_select_admin
on public.profile_thematic_nuclei for select
using (
  exists (
    select 1 from public.profiles p
    where p.auth_user_id = auth.uid() and p.is_admin = true
  )
);

-- Corrección Crítica: Actualizar RLS de item_bank para usar 'status' + 'is_active'
drop policy if exists item_bank_select_published on public.item_bank;

create policy item_bank_select_published
on public.item_bank for select
using (status = 'published' and is_active = true);

commit;