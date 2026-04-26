begin;

with target_content_ids(content_id) as (
  values
    ('item-doc-001'),
    ('item-doc-002'),
    ('item-doc-004'),
    ('item-doc-006'),
    ('item-doc-007'),
    ('item-doc-008'),
    ('item-doc-009'),
    ('item-doc-010'),
    ('item-doc-011'),
    ('item-doc-012'),
    ('item-doc-013'),
    ('item-doc-014'),
    ('item-doc-015'),
    ('item-doc-016'),
    ('item-doc-017'),
    ('item-doc-018'),
    ('item-doc-019'),
    ('item-doc-020'),
    ('item-doc-022'),
    ('item-doc-023'),
    ('item-doc-024'),
    ('item-doc-025'),
    ('item-doc-026'),
    ('item-doc-027'),
    ('item-doc-028'),
    ('item-doc-029'),
    ('item-doc-030')
),
legacy_nucleus as (
  select id
  from public.thematic_nuclei
  where code = 'legacy-general'
),
updated as (
  update public.item_bank ib
  set
    status = 'published',
    thematic_nucleus_id = ln.id
  from target_content_ids t
  cross join legacy_nucleus ln
  where ib.content_id = t.content_id
  returning ib.content_id
)
select count(*) from updated;

do $$
declare
  matched_count integer;
  legacy_count integer;
  invalid_count integer;
begin
  with target_content_ids(content_id) as (
    values
      ('item-doc-001'),
      ('item-doc-002'),
      ('item-doc-004'),
      ('item-doc-006'),
      ('item-doc-007'),
      ('item-doc-008'),
      ('item-doc-009'),
      ('item-doc-010'),
      ('item-doc-011'),
      ('item-doc-012'),
      ('item-doc-013'),
      ('item-doc-014'),
      ('item-doc-015'),
      ('item-doc-016'),
      ('item-doc-017'),
      ('item-doc-018'),
      ('item-doc-019'),
      ('item-doc-020'),
      ('item-doc-022'),
      ('item-doc-023'),
      ('item-doc-024'),
      ('item-doc-025'),
      ('item-doc-026'),
      ('item-doc-027'),
      ('item-doc-028'),
      ('item-doc-029'),
      ('item-doc-030')
  )
  select count(*)::int
  into matched_count
  from public.item_bank ib
  join target_content_ids t using (content_id);

  select count(*)::int
  into legacy_count
  from public.thematic_nuclei
  where code = 'legacy-general';

  if legacy_count <> 1 then
    raise exception 'Falta thematic_nuclei.code=legacy-general o está duplicado.';
  end if;

  if matched_count <> 27 then
    raise exception 'No se encontraron exactamente 27 filas objetivo en item_bank. Encontradas: %', matched_count;
  end if;

  with target_content_ids(content_id) as (
    values
      ('item-doc-001'),
      ('item-doc-002'),
      ('item-doc-004'),
      ('item-doc-006'),
      ('item-doc-007'),
      ('item-doc-008'),
      ('item-doc-009'),
      ('item-doc-010'),
      ('item-doc-011'),
      ('item-doc-012'),
      ('item-doc-013'),
      ('item-doc-014'),
      ('item-doc-015'),
      ('item-doc-016'),
      ('item-doc-017'),
      ('item-doc-018'),
      ('item-doc-019'),
      ('item-doc-020'),
      ('item-doc-022'),
      ('item-doc-023'),
      ('item-doc-024'),
      ('item-doc-025'),
      ('item-doc-026'),
      ('item-doc-027'),
      ('item-doc-028'),
      ('item-doc-029'),
      ('item-doc-030')
  )
  select count(*)::int
  into invalid_count
  from public.item_bank ib
  join target_content_ids t using (content_id)
  join public.thematic_nuclei tn on tn.id = ib.thematic_nucleus_id
  where ib.status <> 'published'
     or ib.thematic_nucleus_id is null
     or tn.code <> 'legacy-general';

  if invalid_count > 0 then
    raise exception 'Backfill incompleto: % ítem(s) objetivo no quedaron publicados con legacy-general.', invalid_count;
  end if;
end
$$;

commit;
