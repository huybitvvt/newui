-- Supabase schema for the cleaned Mississauga inventory app.
-- Removed by client request: ipad, equipment, checklist, checklist_kpi,
-- dashboard_work, appdata, unitstable, cashflow.

create extension if not exists pgcrypto;

drop table if exists public.ipad cascade;
drop table if exists public.equipment cascade;
drop table if exists public.checklist cascade;
drop table if exists public.checklist_kpi cascade;
drop table if exists public.dashboard_work cascade;
drop table if exists public.appdata cascade;
drop table if exists public.unitstable cascade;
drop table if exists public.cashflow cascade;
drop table if exists public."Ipad" cascade;
drop table if exists public."EQUIPMENT" cascade;
drop table if exists public."Checklist" cascade;
drop table if exists public."Checklist KPI" cascade;
drop table if exists public."Dashboard work" cascade;
drop table if exists public."APPDATA" cascade;
drop table if exists public."UNITSTABLE" cascade;
drop table if exists public."Cash-Flow" cascade;

create table if not exists public.menu (
  id text primary key,
  menu text not null,
  catalog integer default 1,
  icon text,
  permission text default 'CEO'
);

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  phone text,
  email text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.item_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references public.item_categories(id) on delete set null,
  unit text,
  price numeric(12, 2) default 0,
  barcode_1 text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_items_name_unique on public.items (lower(name));

create table if not exists public.warehouse_history (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade,
  movement_type text not null check (movement_type in ('IN', 'OUT', 'ORDER')),
  quantity integer not null,
  operator_id uuid references public.people(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.stock_log (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade,
  warehouse_history_id uuid references public.warehouse_history(id) on delete set null,
  quantity_change integer not null,
  operator_id uuid references public.people(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.setup_work (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  value jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

delete from public.menu
where lower(regexp_replace(menu, '[^a-z0-9]+', '', 'g')) in (
  'ipad',
  'equipment',
  'checklist',
  'checklistkpi',
  'dashboardwork',
  'appdata',
  'unitstable',
  'cashflow'
);

insert into public.menu (id, menu, catalog, icon, permission)
values
  ('329267b2', 'items', 1, 'assets/items-icon.svg', 'CEO , Staff'),
  ('e3490d60', 'Warehouse History', 1, 'https://cdn-icons-png.flaticon.com/128/2897/2897818.png', 'CEO , Staff'),
  ('e3490d58', 'People', 1, 'https://cdn-icons-png.flaticon.com/128/1489/1489404.png', 'CEO'),
  ('e3490d69', 'Setup Work', 1, 'https://cdn-icons-png.flaticon.com/128/2049/2049831.png', 'CEO')
on conflict (id) do update set
  menu = excluded.menu,
  catalog = excluded.catalog,
  icon = excluded.icon,
  permission = excluded.permission;

insert into public.people (id, name, role, active)
values
  ('11111111-1111-1111-1111-111111111111', 'Ammar', 'Staff', true),
  ('22222222-2222-2222-2222-222222222222', 'Franco', 'Staff', true),
  ('33333333-3333-3333-3333-333333333333', 'Store', 'Store', true)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  active = excluded.active;

insert into public.item_categories (id, name, code)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Fruits - JT', 'fruits-jt')
on conflict (code) do update set
  name = excluded.name;

insert into public.items (id, name, category_id, unit, price, barcode_1, image_url, active)
values
  ('00000000-0000-0000-0000-000000000001', 'Avocado', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '48/CARTON', 50, '01175022650416181001911830', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000002', 'Banana', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '1/CARTON-ADD BARCODE', 35, '01175022650416181001911831', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000003', 'Beetroot', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '10/KG-ADD BARCODE', 21, '01175022650416181001911832', 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000004', 'Blackberry', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '/PACK', 4, '01175022650416181001911833', 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000005', 'Carrot', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '/KG-ADD BARCODE', 19, '01175022650416181001911835', 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=240&h=240&q=80', true)
on conflict (id) do update set
  name = excluded.name,
  category_id = excluded.category_id,
  unit = excluded.unit,
  price = excluded.price,
  barcode_1 = excluded.barcode_1,
  image_url = excluded.image_url,
  active = excluded.active,
  updated_at = now();

insert into public.warehouse_history (id, item_id, movement_type, quantity, operator_id, note, created_at)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'IN', 14, '11111111-1111-1111-1111-111111111111', 'Initial stock', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'OUT', 4, '11111111-1111-1111-1111-111111111111', 'Order stock', now() - interval '2 days'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'IN', 9, '22222222-2222-2222-2222-222222222222', 'Warehouse receive', now() - interval '1 day')
on conflict (id) do update set
  item_id = excluded.item_id,
  movement_type = excluded.movement_type,
  quantity = excluded.quantity,
  operator_id = excluded.operator_id,
  note = excluded.note,
  created_at = excluded.created_at;

insert into public.stock_log (id, item_id, warehouse_history_id, quantity_change, operator_id, created_at)
values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 14, '11111111-1111-1111-1111-111111111111', now() - interval '3 days'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', -4, '11111111-1111-1111-1111-111111111111', now() - interval '2 days'),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 9, '22222222-2222-2222-2222-222222222222', now() - interval '1 day')
on conflict (id) do update set
  item_id = excluded.item_id,
  warehouse_history_id = excluded.warehouse_history_id,
  quantity_change = excluded.quantity_change,
  operator_id = excluded.operator_id,
  created_at = excluded.created_at;

insert into public.setup_work (id, name, value, active)
values
  ('30000000-0000-0000-0000-000000000001', 'default_permissions', '{"CEO": true, "Staff": true}'::jsonb, true)
on conflict (id) do update set
  name = excluded.name,
  value = excluded.value,
  active = excluded.active,
  updated_at = now();

create index if not exists idx_items_category_id on public.items(category_id);
create index if not exists idx_warehouse_history_item_id on public.warehouse_history(item_id);
create index if not exists idx_warehouse_history_created_at on public.warehouse_history(created_at desc);
create index if not exists idx_stock_log_item_id on public.stock_log(item_id);
