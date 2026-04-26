begin;

-- Activación runtime del corpus curado actual (27 ítems).
-- Objetivo: sacar el lote actual de draft/null nucleus y dejarlo visible en public.v_item_bank_active.
-- Alcance intencionalmente acotado: solo los 27 content_id del corpus actual.

-- -----------------------------------------------------------------------------
-- 1) Crear/asegurar núcleos mínimos y universales para el lote actual
-- -----------------------------------------------------------------------------
insert into public.thematic_nuclei (
  code,
  name,
  description,
  area,
  subarea,
  is_universal,
  is_active
)
values
  (
    'core-competencias-ciudadanas',
    'Competencias ciudadanas — corpus actual',
    'Núcleo universal mínimo para activar en runtime el corpus curado actual de competencias ciudadanas.',
    'docente',
    'competencias_ciudadanas',
    true,
    true
  ),
  (
    'core-gestion',
    'Gestión educativa — corpus actual',
    'Núcleo universal mínimo para activar en runtime el corpus curado actual de gestión educativa.',
    'docente',
    'gestion',
    true,
    true
  ),
  (
    'core-lectura-critica',
    'Lectura crítica — corpus actual',
    'Núcleo universal mínimo para activar en runtime el corpus curado actual de lectura crítica.',
    'docente',
    'lectura_critica',
    true,
    true
  ),
  (
    'core-matematicas',
    'Matemáticas — corpus actual',
    'Núcleo universal mínimo para activar en runtime el corpus curado actual de matemáticas.',
    'docente',
    'matematicas',
    true,
    true
  ),
  (
    'core-normatividad',
    'Normatividad educativa — corpus actual',
    'Núcleo universal mínimo para activar en runtime el corpus curado actual de normatividad educativa.',
    'docente',
    'normatividad',
    true,
    true
  ),
  (
    'core-pedagogia',
    'Pedagogía — corpus actual',
    'Núcleo universal mínimo para activar en runtime el corpus curado actual de pedagogía.',
    'docente',
    'pedagogia',
    true,
    true
  )
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  area = excluded.area,
  subarea = excluded.subarea,
  is_universal = excluded.is_universal,
  is_active = excluded.is_active;

-- -----------------------------------------------------------------------------
-- 2) Mapa explícito del lote actual (sin legacy ni bloqueados)
-- -----------------------------------------------------------------------------
with target_map as (
  select *
  from (
    values
      ('item-doc-026', 'core-competencias-ciudadanas'),
      ('item-doc-027', 'core-competencias-ciudadanas'),
      ('item-doc-030', 'core-competencias-ciudadanas'),
      ('item-doc-028', 'core-competencias-ciudadanas'),
      ('item-doc-029', 'core-competencias-ciudadanas'),

      ('item-doc-018', 'core-gestion'),
      ('item-doc-020', 'core-gestion'),
      ('item-doc-019', 'core-gestion'),
      ('item-doc-016', 'core-gestion'),
      ('item-doc-017', 'core-gestion'),

      ('item-doc-022', 'core-lectura-critica'),
      ('item-doc-025', 'core-lectura-critica'),
      ('item-doc-024', 'core-lectura-critica'),
      ('item-doc-023', 'core-lectura-critica'),

      ('item-doc-004', 'core-matematicas'),
      ('item-doc-001', 'core-matematicas'),
      ('item-doc-002', 'core-matematicas'),

      ('item-doc-011', 'core-normatividad'),
      ('item-doc-013', 'core-normatividad'),
      ('item-doc-015', 'core-normatividad'),
      ('item-doc-012', 'core-normatividad'),
      ('item-doc-014', 'core-normatividad'),

      ('item-doc-006', 'core-pedagogia'),
      ('item-doc-007', 'core-pedagogia'),
      ('item-doc-009', 'core-pedagogia'),
      ('item-doc-010', 'core-pedagogia'),
      ('item-doc-008', 'core-pedagogia')
  ) as t(content_id, nucleus_code)
), resolved_map as (
  select
    tm.content_id,
    tn.id as thematic_nucleus_id
  from target_map tm
  join public.thematic_nuclei tn
    on tn.code = tm.nucleus_code
)
update public.item_bank ib
set
  thematic_nucleus_id = rm.thematic_nucleus_id,
  status = 'published',
  is_active = true,
  is_published = true,
  updated_at = now()
from resolved_map rm
where ib.content_id = rm.content_id;

-- -----------------------------------------------------------------------------
-- 3) Gates duros: el lote debe quedar visible y consistente
-- -----------------------------------------------------------------------------
do $$
declare
  target_count integer;
  mapped_count integer;
  active_count integer;
  missing_status_count integer;
  missing_nucleus_count integer;
  inactive_nucleus_count integer;
begin
  target_count := 27;

  select count(*)
  into mapped_count
  from public.item_bank
  where content_id in (
    'item-doc-026','item-doc-027','item-doc-030','item-doc-028','item-doc-029',
    'item-doc-018','item-doc-020','item-doc-019','item-doc-016','item-doc-017',
    'item-doc-022','item-doc-025','item-doc-024','item-doc-023',
    'item-doc-004','item-doc-001','item-doc-002',
    'item-doc-011','item-doc-013','item-doc-015','item-doc-012','item-doc-014',
    'item-doc-006','item-doc-007','item-doc-009','item-doc-010','item-doc-008'
  );

  if mapped_count <> target_count then
    raise exception 'El lote esperado es de % ítems pero item_bank contiene % registros del set objetivo.', target_count, mapped_count;
  end if;

  select count(*)
  into missing_status_count
  from public.item_bank
  where content_id in (
    'item-doc-026','item-doc-027','item-doc-030','item-doc-028','item-doc-029',
    'item-doc-018','item-doc-020','item-doc-019','item-doc-016','item-doc-017',
    'item-doc-022','item-doc-025','item-doc-024','item-doc-023',
    'item-doc-004','item-doc-001','item-doc-002',
    'item-doc-011','item-doc-013','item-doc-015','item-doc-012','item-doc-014',
    'item-doc-006','item-doc-007','item-doc-009','item-doc-010','item-doc-008'
  )
    and (status <> 'published' or is_active is distinct from true);

  if missing_status_count > 0 then
    raise exception 'Backfill incompleto: % ítems objetivo no quedaron published/active.', missing_status_count;
  end if;

  select count(*)
  into missing_nucleus_count
  from public.item_bank
  where content_id in (
    'item-doc-026','item-doc-027','item-doc-030','item-doc-028','item-doc-029',
    'item-doc-018','item-doc-020','item-doc-019','item-doc-016','item-doc-017',
    'item-doc-022','item-doc-025','item-doc-024','item-doc-023',
    'item-doc-004','item-doc-001','item-doc-002',
    'item-doc-011','item-doc-013','item-doc-015','item-doc-012','item-doc-014',
    'item-doc-006','item-doc-007','item-doc-009','item-doc-010','item-doc-008'
  )
    and thematic_nucleus_id is null;

  if missing_nucleus_count > 0 then
    raise exception 'Backfill incompleto: % ítems objetivo quedaron sin thematic_nucleus_id.', missing_nucleus_count;
  end if;

  select count(*)
  into inactive_nucleus_count
  from public.item_bank ib
  join public.thematic_nuclei tn on tn.id = ib.thematic_nucleus_id
  where ib.content_id in (
    'item-doc-026','item-doc-027','item-doc-030','item-doc-028','item-doc-029',
    'item-doc-018','item-doc-020','item-doc-019','item-doc-016','item-doc-017',
    'item-doc-022','item-doc-025','item-doc-024','item-doc-023',
    'item-doc-004','item-doc-001','item-doc-002',
    'item-doc-011','item-doc-013','item-doc-015','item-doc-012','item-doc-014',
    'item-doc-006','item-doc-007','item-doc-009','item-doc-010','item-doc-008'
  )
    and tn.is_active is distinct from true;

  if inactive_nucleus_count > 0 then
    raise exception 'Backfill inconsistente: % ítems objetivo quedaron apuntando a núcleos inactivos.', inactive_nucleus_count;
  end if;

  select count(*)
  into active_count
  from public.v_item_bank_active
  where content_id in (
    'item-doc-026','item-doc-027','item-doc-030','item-doc-028','item-doc-029',
    'item-doc-018','item-doc-020','item-doc-019','item-doc-016','item-doc-017',
    'item-doc-022','item-doc-025','item-doc-024','item-doc-023',
    'item-doc-004','item-doc-001','item-doc-002',
    'item-doc-011','item-doc-013','item-doc-015','item-doc-012','item-doc-014',
    'item-doc-006','item-doc-007','item-doc-009','item-doc-010','item-doc-008'
  )
    and read_state = 'active';

  if active_count <> target_count then
    raise exception 'Gate falló: v_item_bank_active devolvió % ítems activos y se esperaban %.', active_count, target_count;
  end if;
end
$$;

commit;
