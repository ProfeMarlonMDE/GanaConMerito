-- Post-backfill validation for active question bank
-- Run in Supabase SQL editor or via psql against the product database.

with expected_active(content_id) as (
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
legacy_expected(content_id) as (
  values ('item-doc-0001'), ('item-doc-0002'), ('item-doc-0003')
),
tracked as (
  select *
  from public.v_item_bank_active
  where content_id in (
    select content_id from expected_active
    union all
    select content_id from legacy_expected
  )
),
active_now as (
  select *
  from public.v_item_bank_active
  where read_state = 'active'
)
select
  'summary' as check_name,
  count(*) filter (where read_state = 'active') as active_count,
  count(*) filter (where read_state = 'legacy') as legacy_count,
  count(*) filter (where read_state = 'inactive') as inactive_count
from public.v_item_bank_active;

with expected_active(content_id) as (
  values
    ('item-doc-001'),('item-doc-002'),('item-doc-004'),('item-doc-006'),('item-doc-007'),('item-doc-008'),('item-doc-009'),('item-doc-010'),('item-doc-011'),('item-doc-012'),('item-doc-013'),('item-doc-014'),('item-doc-015'),('item-doc-016'),('item-doc-017'),('item-doc-018'),('item-doc-019'),('item-doc-020'),('item-doc-022'),('item-doc-023'),('item-doc-024'),('item-doc-025'),('item-doc-026'),('item-doc-027'),('item-doc-028'),('item-doc-029'),('item-doc-030')
),
active_now as (
  select content_id from public.v_item_bank_active where read_state = 'active'
)
select 'missing_expected_active' as check_name, ea.content_id
from expected_active ea
left join active_now an using (content_id)
where an.content_id is null
union all
select 'unexpected_active' as check_name, an.content_id
from active_now an
left join expected_active ea using (content_id)
where ea.content_id is null
order by check_name, content_id;

with expected_active(content_id) as (
  values
    ('item-doc-001'),('item-doc-002'),('item-doc-004'),('item-doc-006'),('item-doc-007'),('item-doc-008'),('item-doc-009'),('item-doc-010'),('item-doc-011'),('item-doc-012'),('item-doc-013'),('item-doc-014'),('item-doc-015'),('item-doc-016'),('item-doc-017'),('item-doc-018'),('item-doc-019'),('item-doc-020'),('item-doc-022'),('item-doc-023'),('item-doc-024'),('item-doc-025'),('item-doc-026'),('item-doc-027'),('item-doc-028'),('item-doc-029'),('item-doc-030')
)
select
  content_id,
  slug,
  read_state,
  status,
  is_active,
  thematic_nucleus_id,
  thematic_nucleus_code,
  thematic_nucleus_is_active,
  classification_bucket,
  classification_reason
from public.v_item_bank_active
where content_id in (select content_id from expected_active)
  and (
    read_state <> 'active'
    or status <> 'published'
    or is_active is not true
    or thematic_nucleus_id is null
    or thematic_nucleus_is_active is not true
    or classification_bucket is not null
  )
order by content_id;

with legacy_expected(content_id) as (
  values ('item-doc-0001'), ('item-doc-0002'), ('item-doc-0003')
)
select
  content_id,
  read_state,
  classification_bucket,
  classification_reason,
  status,
  is_active,
  thematic_nucleus_code
from public.v_item_bank_active
where content_id in (select content_id from legacy_expected)
order by content_id;

with expected_active(content_id) as (
  values
    ('item-doc-001'),('item-doc-002'),('item-doc-004'),('item-doc-006'),('item-doc-007'),('item-doc-008'),('item-doc-009'),('item-doc-010'),('item-doc-011'),('item-doc-012'),('item-doc-013'),('item-doc-014'),('item-doc-015'),('item-doc-016'),('item-doc-017'),('item-doc-018'),('item-doc-019'),('item-doc-020'),('item-doc-022'),('item-doc-023'),('item-doc-024'),('item-doc-025'),('item-doc-026'),('item-doc-027'),('item-doc-028'),('item-doc-029'),('item-doc-030')
)
select
  v.content_id,
  v.slug,
  count(io.*) as option_count
from public.v_item_bank_active v
left join public.item_options io
  on io.item_id = v.id
where v.content_id in (select content_id from expected_active)
  and v.read_state = 'active'
group by v.content_id, v.slug
having count(io.*) <> 4
order by v.content_id;

with active_now as (
  select content_id, slug
  from public.v_item_bank_active
  where read_state = 'active'
)
select 'duplicate_active_content_id' as check_name, content_id as value, count(*) as duplicates
from active_now
group by content_id
having count(*) > 1
union all
select 'duplicate_active_slug' as check_name, slug as value, count(*) as duplicates
from active_now
group by slug
having count(*) > 1
order by check_name, value;
