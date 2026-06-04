-- Supabase schema for the cleaned Mississauga inventory app.
-- Removed by client request: ipad, equipment, checklist, checklist_kpi,
-- dashboard_work, appdata, unitstable, cashflow.

create extension if not exists pgcrypto;

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

insert into public.menu (id, menu, catalog, icon, permission)
values
  ('329267b2', 'items', 1, 'https://cdn-icons-png.flaticon.com/128/3621/3621280.png', 'CEO , Staff'),
  ('e3490d60', 'Warehouse History', 1, 'https://cdn-icons-png.flaticon.com/128/2897/2897818.png', 'CEO , Staff'),
  ('e3490d58', 'People', 1, 'https://cdn-icons-png.flaticon.com/128/1489/1489404.png', 'CEO'),
  ('e3490d69', 'Setup Work', 1, 'https://cdn-icons-png.flaticon.com/128/2049/2049831.png', 'CEO')
on conflict (id) do update set
  menu = excluded.menu,
  catalog = excluded.catalog,
  icon = excluded.icon,
  permission = excluded.permission;

create index if not exists idx_items_category_id on public.items(category_id);
create index if not exists idx_warehouse_history_item_id on public.warehouse_history(item_id);
create index if not exists idx_warehouse_history_created_at on public.warehouse_history(created_at desc);
create index if not exists idx_stock_log_item_id on public.stock_log(item_id);
