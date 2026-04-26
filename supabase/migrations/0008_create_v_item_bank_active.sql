begin;

create or replace view public.v_item_bank_active
with (security_invoker = true) as
with classified_content (content_id, bucket, reason) as (
  values
    ('item-doc-0001'::text, 'legacy'::text, 'contenido legado pre-corpus actual'::text),
    ('item-doc-0002'::text, 'legacy'::text, 'contenido legado pre-corpus actual'::text),
    ('item-doc-0003'::text, 'legacy'::text, 'contenido legado pre-corpus actual'::text),
    ('item-doc-003'::text, 'blocked'::text, 'dependencia visual/imagen'::text),
    ('item-doc-005'::text, 'blocked'::text, 'dependencia visual/imagen'::text),
    ('item-doc-021'::text, 'blocked'::text, 'dependencia visual/imagen'::text)
)
select
  ib.id,
  ib.content_id,
  ib.slug,
  ib.title,
  ib.area,
  ib.subarea,
  ib.competency,
  ib.exam_type,
  ib.item_type,
  ib.difficulty,
  ib.stem,
  ib.correct_option,
  ib.explanation,
  ib.version,
  ib.status,
  ib.is_active,
  ib.source_type,
  ib.source_path,
  ib.created_at,
  ib.updated_at,
  ib.thematic_nucleus_id,
  tn.code as thematic_nucleus_code,
  tn.name as thematic_nucleus_name,
  tn.is_universal as thematic_nucleus_is_universal,
  coalesce(tn.is_active, false) as thematic_nucleus_is_active,
  cc.bucket as classification_bucket,
  cc.reason as classification_reason,
  coalesce(cc.bucket = 'legacy', false) as is_legacy,
  coalesce(cc.bucket = 'blocked', false) as is_blocked,
  case
    when coalesce(cc.bucket = 'legacy', false) then 'legacy'
    when coalesce(cc.bucket = 'blocked', false) then 'blocked'
    when ib.status = 'published'
      and ib.is_active = true
      and ib.thematic_nucleus_id is not null
      and coalesce(tn.is_active, false) = true
      then 'active'
    else 'inactive'
  end::text as read_state
from public.item_bank ib
left join public.thematic_nuclei tn
  on tn.id = ib.thematic_nucleus_id
left join classified_content cc
  on cc.content_id = ib.content_id;

comment on view public.v_item_bank_active is
  'Contrato estable de lectura del banco activo. Centraliza clasificación legacy/blocked y expone read_state para consumo runtime.';

comment on column public.v_item_bank_active.classification_bucket is
  'Clasificación editorial transitoria aplicada por override explícito: legacy o blocked.';

comment on column public.v_item_bank_active.classification_reason is
  'Motivo operativo del override transitorio aplicado al content_id.';

comment on column public.v_item_bank_active.read_state is
  'Estado derivado de lectura: active, inactive, legacy o blocked.';

grant select on public.v_item_bank_active to authenticated;
grant select on public.v_item_bank_active to service_role;

commit;
