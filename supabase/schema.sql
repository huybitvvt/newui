-- Supabase schema for the cleaned Mississauga inventory app.
-- Removed by client request: ipad, equipment, checklist_kpi,
-- dashboard_work, appdata, unitstable, cashflow.

create extension if not exists pgcrypto;

drop table if exists public.ipad cascade;
drop table if exists public.equipment cascade;
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
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  catalog integer default 1,
  icon text,
  permission text default 'CEO'
);

alter table public.menu add column if not exists branch text not null default 'JT';
alter table public.menu add column if not exists brand text not null default 'MISSISSAUGA';

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  phone text,
  email text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.people add column if not exists image_url text;
alter table public.people add column if not exists branch text not null default 'JT';
alter table public.people add column if not exists brand text not null default 'MISSISSAUGA';

create table if not exists public.tenant_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  people_id uuid references public.people(id) on delete set null,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  role text not null default 'Staff',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tenant_profiles add column if not exists people_id uuid references public.people(id) on delete set null;
alter table public.tenant_profiles add column if not exists branch text not null default 'JT';
alter table public.tenant_profiles add column if not exists brand text not null default 'MISSISSAUGA';
alter table public.tenant_profiles add column if not exists role text not null default 'Staff';
alter table public.tenant_profiles add column if not exists active boolean not null default true;
alter table public.tenant_profiles add column if not exists updated_at timestamptz not null default now();

create or replace function public.tenant_brand()
returns text
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(
    nullif(auth.jwt() ->> 'brand', ''),
    nullif((auth.jwt() -> 'app_metadata') ->> 'brand', ''),
    (
      select tp.brand
      from public.tenant_profiles tp
      where tp.user_id = auth.uid()
        and tp.active = true
      limit 1
    ),
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-tenant-brand'), ''),
    'MISSISSAUGA'
  );
$$;

create or replace function public.tenant_branch()
returns text
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(
    nullif(auth.jwt() ->> 'branch', ''),
    nullif((auth.jwt() -> 'app_metadata') ->> 'branch', ''),
    (
      select tp.branch
      from public.tenant_profiles tp
      where tp.user_id = auth.uid()
        and tp.active = true
      limit 1
    ),
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-tenant-branch'), ''),
    'JT'
  );
$$;

create or replace function public.same_tenant(row_brand text, row_branch text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select row_brand = public.tenant_brand()
    and row_branch = public.tenant_branch();
$$;

create table if not exists public.item_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  created_at timestamptz not null default now()
);

alter table public.item_categories add column if not exists branch text not null default 'JT';
alter table public.item_categories add column if not exists brand text not null default 'MISSISSAUGA';

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  category_id uuid references public.item_categories(id) on delete set null,
  unit text,
  price numeric(12, 2) default 0,
  barcode_1 text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.items add column if not exists branch text not null default 'JT';
alter table public.items add column if not exists brand text not null default 'MISSISSAUGA';

create unique index if not exists idx_items_name_unique on public.items (lower(name));

create table if not exists public.warehouse_history (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  movement_type text not null check (movement_type in ('IN', 'OUT', 'ORDER')),
  quantity integer not null,
  operator_id uuid references public.people(id) on delete set null,
  operator_name text not null default 'U',
  note text,
  created_at timestamptz not null default now()
);

alter table public.warehouse_history add column if not exists branch text not null default 'JT';
alter table public.warehouse_history add column if not exists brand text not null default 'MISSISSAUGA';
alter table public.warehouse_history add column if not exists operator_name text not null default 'U';

create table if not exists public.stock_log (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  warehouse_history_id uuid references public.warehouse_history(id) on delete set null,
  log_type text not null default 'WAREHOUSE' check (log_type in ('WAREHOUSE', 'ORDER')),
  quantity_change integer not null,
  order_quantity integer,
  operator_id uuid references public.people(id) on delete set null,
  operator_name text not null default 'U',
  note text,
  created_at timestamptz not null default now()
);

alter table public.stock_log add column if not exists branch text not null default 'JT';
alter table public.stock_log add column if not exists brand text not null default 'MISSISSAUGA';
alter table public.stock_log add column if not exists log_type text not null default 'WAREHOUSE';
alter table public.stock_log add column if not exists order_quantity integer;
alter table public.stock_log add column if not exists operator_name text not null default 'U';
alter table public.stock_log add column if not exists note text;

create table if not exists public."check" (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete set null,
  item_name text not null,
  item_image_url text,
  quantity integer,
  note text,
  check_type text not null default 'ORDER',
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  status text not null default 'pending' check (status in ('pending', 'done')),
  operator_id uuid references public.people(id) on delete set null,
  operator_name text not null default 'U',
  checked_at timestamptz not null default now(),
  checked_date date not null default current_date,
  checked_time time not null default localtime(0),
  done_by_id uuid references public.people(id) on delete set null,
  done_by_name text,
  done_at timestamptz,
  done_date date,
  done_time time,
  created_at timestamptz not null default now()
);

alter table public."check" add column if not exists item_image_url text;
alter table public."check" add column if not exists quantity integer;
alter table public."check" add column if not exists note text;
alter table public."check" add column if not exists check_type text not null default 'ORDER';
alter table public."check" add column if not exists branch text not null default 'JT';
alter table public."check" add column if not exists brand text not null default 'MISSISSAUGA';
alter table public."check" add column if not exists status text not null default 'pending';
alter table public."check" add column if not exists done_by_id uuid references public.people(id) on delete set null;
alter table public."check" add column if not exists done_by_name text;
alter table public."check" add column if not exists done_at timestamptz;
alter table public."check" add column if not exists done_date date;
alter table public."check" add column if not exists done_time time;

alter table public.stock_log add column if not exists order_check_id uuid references public."check"(id) on delete set null;

create table if not exists public.fruit_order_photos (
  id uuid primary key default gen_random_uuid(),
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  photo_url text not null,
  note text,
  operator_id uuid references public.people(id) on delete set null,
  operator_name text not null default 'U',
  created_at timestamptz not null default now()
);

alter table public.fruit_order_photos add column if not exists branch text not null default 'JT';
alter table public.fruit_order_photos add column if not exists brand text not null default 'MISSISSAUGA';
alter table public.fruit_order_photos add column if not exists photo_url text;
alter table public.fruit_order_photos add column if not exists note text;
alter table public.fruit_order_photos add column if not exists operator_id uuid references public.people(id) on delete set null;
alter table public.fruit_order_photos add column if not exists operator_name text not null default 'U';

create table if not exists public.checklist (
  id text primary key,
  work text not null,
  note text,
  team text,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  status text not null default 'pending' check (status in ('pending', 'done')),
  done_by_name text,
  done_at timestamptz,
  done_date date,
  done_time time,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.checklist add column if not exists note text;
alter table public.checklist add column if not exists team text;
alter table public.checklist add column if not exists branch text;
alter table public.checklist alter column branch set default 'JT';
update public.checklist set branch = 'JT' where branch is null or branch = '';
alter table public.checklist alter column branch set not null;
alter table public.checklist add column if not exists brand text not null default 'MISSISSAUGA';
alter table public.checklist add column if not exists status text not null default 'pending';
alter table public.checklist add column if not exists done_by_name text;
alter table public.checklist add column if not exists done_at timestamptz;
alter table public.checklist add column if not exists done_date date;
alter table public.checklist add column if not exists done_time time;
alter table public.checklist add column if not exists updated_at timestamptz not null default now();

create table if not exists public.setup_work (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  branch text not null default 'JT',
  brand text not null default 'MISSISSAUGA',
  value jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.setup_work add column if not exists branch text not null default 'JT';
alter table public.setup_work add column if not exists brand text not null default 'MISSISSAUGA';

delete from public.menu
where lower(regexp_replace(menu, '[^a-z0-9]+', '', 'g')) in (
  'ipad',
  'equipment',
  'checklistkpi',
  'dashboardwork',
  'appdata',
  'unitstable',
  'cashflow'
);

insert into public.menu (id, menu, branch, brand, catalog, icon, permission)
values
  ('329267b2', 'items', 'JT', 'MISSISSAUGA', 1, 'assets/items-icon.svg', 'CEO , Staff'),
  ('e3490d59', 'Checklist', 'JT', 'MISSISSAUGA', 1, 'https://cdn-icons-png.flaticon.com/128/681/681662.png', 'CEO , Staff'),
  ('e3490d60', 'Warehouse', 'JT', 'MISSISSAUGA', 1, 'https://cdn-icons-png.flaticon.com/128/2897/2897818.png', 'CEO , Staff'),
  ('e3490d58', 'People', 'JT', 'MISSISSAUGA', 1, 'https://cdn-icons-png.flaticon.com/128/1489/1489404.png', 'CEO'),
  ('e3490d69', 'Setup Work', 'JT', 'MISSISSAUGA', 1, 'https://cdn-icons-png.flaticon.com/128/2049/2049831.png', 'CEO')
on conflict (id) do update set
  menu = excluded.menu,
  branch = excluded.branch,
  brand = excluded.brand,
  catalog = excluded.catalog,
  icon = excluded.icon,
  permission = excluded.permission;

insert into public.people (id, name, role, branch, brand, image_url, active)
values
  ('11111111-1111-1111-1111-111111111111', 'Ammar', 'Staff', 'JT', 'MISSISSAUGA', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80', true),
  ('22222222-2222-2222-2222-222222222222', 'Franco', 'CEO', 'JT', 'MISSISSAUGA', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80', true),
  ('33333333-3333-3333-3333-333333333333', 'Store', 'Store', 'JT', 'MISSISSAUGA', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80', true)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  branch = excluded.branch,
  brand = excluded.brand,
  image_url = excluded.image_url,
  active = excluded.active;

insert into public.checklist (id, work, note, team, branch, brand)
values
  ('id32', 'Restock soft drinks (7up, Redbull, Diet Redbull, Al-Shani)', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id33', 'Refill all Syrup and Slush, Caramel sauce, Hershey sauce', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id34', 'Clean the coffee Machine, keep the milk inside fridge', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id35', 'Clean all refrigerators', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id36', 'Clean the sweet machines', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id37', 'Refill all chocolate in bottle, warmer.', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id38', '-Add 4kg frozen strawberries to the refrigerator. -Check Qishtah, keep them back inside the fridge if they are outside', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id39', 'Remove lime slice, Avocado, Heart Attact, Emperor', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('id40', 'Clean sealing machine and can sealing machine', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('1a493e94', 'Refill all cutlery for customer outside', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('06f06551', 'Refill all sauce for ice cream (Oreo, Snickers, Ferrero, Bueno)', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('129556d8', 'Lock the back door (with both doors)', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('da6f93b2', 'Clean Cashier Area', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('d5da1fc9', 'Clean Orange, Carrot, Apple Machine', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('3aa4588a', 'Place the ice cream machine on standby mode.', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('f9e44716', 'Clean 2 cups measuring sugar and keep dry', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('c655ed57', 'Turn OFF the AC inside kitchen', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('5be7ec45', 'Place the warmer chocolate machine on standby mode.', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('824df0d0', 'Kill insects with electric racket', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('de5894ac', 'Clean Microwave, cooler and Blender, ice maker inside kitchen', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('ebe506fe', 'Discard all the full black garbage bags and clean the trash can lid.', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('cbb6d6d4', 'Clean all the sink with soap', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('3731193f', 'Personal items such as water bottles, coffee cups, and food must be taken home at the end of each shift. Any leftover food or drinks must be discarded.', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('f39b95e1', 'Order Crepe-Brownie', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('1048f52b', 'SUNDAY (Put all equipments in to the sinks with Clorock)', 'SUNDAY', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('3b71969b', 'Clean all towers', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('2cfbc6ad', 'Sent order to Cash&Carry', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('04a5c3ff', 'Check and order Ice Cream Vanilla + Brownie', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('0128ad0e', '-Avocado (Use the milk from the Coffee machine) -Mango -Strawberry (In the cooler)', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('d2371c4c', 'Turn on Ice cream Machine and refill Mango ice cream, Einstein ice cream', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('16feeabb', 'Kill insects with electric racket', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('2c1a80a1', 'Prepare Mango chunks, Mango for Hambah and refill Bubbles.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('32edfdcc', 'Slice Lime and prepare mint for Mojito', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('3ceb5114', 'Bring frozen strawberry outside', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('366e935e', 'Prepare water for the customer with ice', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('0d1d61a4', 'Turn on the sweet Machine: Waffle - 400F Crepe - 350F Mini Pancakes - 180C', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('8d84bc67', 'Clean all sweet machine before preparing order for customer', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('6b89fdf1', 'Prepare the filtered white chocolate.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('64c3f571', 'Refill all chocolate in bottle, warmer and chocolate Fountains', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('c8bae196', 'Prepare (Pancake mix, Crepe mix)', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('b09d8f46', 'Prepare brownie cake for "Hannan-Pillow-Fettuccini"', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('2a18f522', 'Check ice maker and make sure it working well', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('2b614b1d', 'Prepare Pomegranate pills', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('0b3ccd84', 'Prepare all fresh fruits and Fruits salad.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('065570a3', 'Check and refill all ice cream machines.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('aec3c911', 'Refill cutlery for the customer, make sure trash bin of the customer good', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('4a98956b', 'Open the sign, open the Uber Eats application.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('509cb705', 'Turn on the Loyalzoo App in the Clover system, Remind the Customer our offer', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('a984d0a3', 'Clean all cashier areas, Turn on the LED Lady, Open back door', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('a8129f8c', 'Sort fresh Strawberry to 3 class (Strawberry chocolate, Topping, Juice)', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('2a3712dc', 'Prepare sauce: Kinder-Ferrero-Snickers-Oreo-Pistachio', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('5a610706', 'Prepare Nuts, Pistachio powder', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('92c7cc5c', 'Cut Kinder chocolate, Prepare all powder, biscuits needed.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('70203101', 'Fold Fettuccini box', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('4be715dd', 'Check Kishtah and put them from the Freezer to the Fridge if needed.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('468e1c4d', 'Put cash Tips Box on counter', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('eb0a0c90', 'Clean the walls, the drawers under the counter, and put everything back in order.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('f3b34fca', 'Check that the restroom has toilet paper, hand sanitizer, and that everything is working properly.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('8670ac7c', 'Check if there is enough milk, fruit, or if anything is missing, inform the manager immediately.', '', 'Opening team', 'JT', 'MISSISSAUGA'),
  ('780186d2', 'WEDNESDAY: Remove the refrigerator for cleaning by the company.', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('691a067a', 'Cover all biscuits and powder containers', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('8de5fcc9', 'Clean all blenders with soap', '', 'Closing team', 'JT', 'MISSISSAUGA'),
  ('699d07a8', 'Check all the diffusers, make sure they are working well', '', 'Opening team', 'JT', 'MISSISSAUGA')
on conflict (id) do update set
  work = excluded.work,
  note = excluded.note,
  team = excluded.team,
  branch = excluded.branch,
  brand = excluded.brand,
  updated_at = now();

insert into public.item_categories (id, name, code, branch, brand)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Fruits - JT', 'fruits-jt', 'JT', 'MISSISSAUGA')
on conflict (code) do update set
  name = excluded.name,
  branch = excluded.branch,
  brand = excluded.brand;

insert into public.items (id, name, branch, brand, category_id, unit, price, barcode_1, image_url, active)
values
  ('00000000-0000-0000-0000-000000000001', 'Avocado', 'JT', 'MISSISSAUGA', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '48/CARTON', 50, '01175022650416181001911830', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000002', 'Banana', 'JT', 'MISSISSAUGA', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '1/CARTON-ADD BARCODE', 35, '01175022650416181001911831', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000003', 'Beetroot', 'JT', 'MISSISSAUGA', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '10/KG-ADD BARCODE', 21, '01175022650416181001911832', 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000004', 'Blackberry', 'JT', 'MISSISSAUGA', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '/PACK', 4, '01175022650416181001911833', 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=240&h=240&q=80', true),
  ('00000000-0000-0000-0000-000000000005', 'Carrot', 'JT', 'MISSISSAUGA', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '/KG-ADD BARCODE', 19, '01175022650416181001911835', 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=240&h=240&q=80', true)
on conflict (id) do update set
  name = excluded.name,
  branch = excluded.branch,
  brand = excluded.brand,
  category_id = excluded.category_id,
  unit = excluded.unit,
  price = excluded.price,
  barcode_1 = excluded.barcode_1,
  image_url = excluded.image_url,
  active = excluded.active,
  updated_at = now();

insert into public.warehouse_history (id, item_id, branch, brand, movement_type, quantity, operator_id, operator_name, note, created_at)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'JT', 'MISSISSAUGA', 'IN', 14, '11111111-1111-1111-1111-111111111111', 'Ammar', 'Initial stock', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'JT', 'MISSISSAUGA', 'OUT', 4, '11111111-1111-1111-1111-111111111111', 'Ammar', 'Order stock', now() - interval '2 days'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'JT', 'MISSISSAUGA', 'IN', 9, '22222222-2222-2222-2222-222222222222', 'Franco', 'Warehouse receive', now() - interval '1 day')
on conflict (id) do update set
  item_id = excluded.item_id,
  branch = excluded.branch,
  brand = excluded.brand,
  movement_type = excluded.movement_type,
  quantity = excluded.quantity,
  operator_id = excluded.operator_id,
  operator_name = excluded.operator_name,
  note = excluded.note,
  created_at = excluded.created_at;

insert into public.stock_log (id, item_id, branch, brand, warehouse_history_id, log_type, quantity_change, order_quantity, operator_id, operator_name, note, created_at)
values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'JT', 'MISSISSAUGA', '10000000-0000-0000-0000-000000000001', 'WAREHOUSE', 14, null, '11111111-1111-1111-1111-111111111111', 'Ammar', 'Initial stock', now() - interval '3 days'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'JT', 'MISSISSAUGA', '10000000-0000-0000-0000-000000000002', 'WAREHOUSE', -4, null, '11111111-1111-1111-1111-111111111111', 'Ammar', 'Order stock', now() - interval '2 days'),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'JT', 'MISSISSAUGA', '10000000-0000-0000-0000-000000000003', 'WAREHOUSE', 9, null, '22222222-2222-2222-2222-222222222222', 'Franco', 'Warehouse receive', now() - interval '1 day')
on conflict (id) do update set
  item_id = excluded.item_id,
  branch = excluded.branch,
  brand = excluded.brand,
  warehouse_history_id = excluded.warehouse_history_id,
  log_type = excluded.log_type,
  quantity_change = excluded.quantity_change,
  order_quantity = excluded.order_quantity,
  operator_id = excluded.operator_id,
  operator_name = excluded.operator_name,
  note = excluded.note,
  created_at = excluded.created_at;

insert into public.setup_work (id, name, branch, brand, value, active)
values
  ('30000000-0000-0000-0000-000000000001', 'default_permissions', 'JT', 'MISSISSAUGA', '{"CEO": true, "Staff": true}'::jsonb, true)
on conflict (id) do update set
  name = excluded.name,
  branch = excluded.branch,
  brand = excluded.brand,
  value = excluded.value,
  active = excluded.active,
  updated_at = now();

create index if not exists idx_items_category_id on public.items(category_id);
create index if not exists idx_warehouse_history_item_id on public.warehouse_history(item_id);
create index if not exists idx_warehouse_history_created_at on public.warehouse_history(created_at desc);
create index if not exists idx_stock_log_item_id on public.stock_log(item_id);
create index if not exists idx_stock_log_log_type on public.stock_log(log_type);
create index if not exists idx_stock_log_order_check_id on public.stock_log(order_check_id);
create index if not exists idx_check_item_id on public."check"(item_id);
create index if not exists idx_check_checked_at on public."check"(checked_at desc);
create index if not exists idx_fruit_order_photos_tenant_created on public.fruit_order_photos(brand, branch, created_at desc);
create index if not exists idx_checklist_team on public.checklist(team);
create index if not exists idx_checklist_status on public.checklist(status);
create index if not exists idx_items_tenant on public.items(brand, branch);
create index if not exists idx_people_tenant on public.people(brand, branch);
create index if not exists idx_warehouse_history_tenant on public.warehouse_history(brand, branch);
create index if not exists idx_stock_log_tenant on public.stock_log(brand, branch);
create index if not exists idx_check_tenant on public."check"(brand, branch);
create index if not exists idx_fruit_order_photos_tenant on public.fruit_order_photos(brand, branch);
create index if not exists idx_checklist_tenant on public.checklist(brand, branch);

grant usage on schema public to anon, authenticated;
grant select on
  public.menu,
  public.people,
  public.tenant_profiles,
  public.item_categories,
  public.items,
  public.warehouse_history,
  public.stock_log,
  public."check",
  public.fruit_order_photos,
  public.checklist,
  public.setup_work
to anon, authenticated;
grant insert on public."check" to anon, authenticated;
grant update on public."check" to anon, authenticated;
grant update on public.checklist to anon, authenticated;
grant insert on public.fruit_order_photos to anon, authenticated;
grant insert on public.warehouse_history to anon, authenticated;
grant insert on public.stock_log to anon, authenticated;

alter table public.menu enable row level security;
alter table public.people enable row level security;
alter table public.tenant_profiles enable row level security;
alter table public.item_categories enable row level security;
alter table public.items enable row level security;
alter table public.warehouse_history enable row level security;
alter table public.stock_log enable row level security;
alter table public."check" enable row level security;
alter table public.fruit_order_photos enable row level security;
alter table public.checklist enable row level security;
alter table public.setup_work enable row level security;

drop policy if exists "public read menu" on public.menu;
drop policy if exists "public read people" on public.people;
drop policy if exists "public read tenant profiles" on public.tenant_profiles;
drop policy if exists "public read item categories" on public.item_categories;
drop policy if exists "public read items" on public.items;
drop policy if exists "public read warehouse history" on public.warehouse_history;
drop policy if exists "public insert warehouse history" on public.warehouse_history;
drop policy if exists "public read stock log" on public.stock_log;
drop policy if exists "public insert stock log" on public.stock_log;
drop policy if exists "public read check" on public."check";
drop policy if exists "public insert check" on public."check";
drop policy if exists "public update check" on public."check";
drop policy if exists "public read fruit order photos" on public.fruit_order_photos;
drop policy if exists "public insert fruit order photos" on public.fruit_order_photos;
drop policy if exists "public read checklist" on public.checklist;
drop policy if exists "public update checklist" on public.checklist;
drop policy if exists "public read setup work" on public.setup_work;
drop policy if exists "tenant read menu" on public.menu;
drop policy if exists "tenant read people" on public.people;
drop policy if exists "tenant read own profile" on public.tenant_profiles;
drop policy if exists "tenant read item categories" on public.item_categories;
drop policy if exists "tenant read items" on public.items;
drop policy if exists "tenant read warehouse history" on public.warehouse_history;
drop policy if exists "tenant insert warehouse history" on public.warehouse_history;
drop policy if exists "tenant read stock log" on public.stock_log;
drop policy if exists "tenant insert stock log" on public.stock_log;
drop policy if exists "tenant read check" on public."check";
drop policy if exists "tenant insert check" on public."check";
drop policy if exists "tenant update check" on public."check";
drop policy if exists "tenant read fruit order photos" on public.fruit_order_photos;
drop policy if exists "tenant insert fruit order photos" on public.fruit_order_photos;
drop policy if exists "tenant read checklist" on public.checklist;
drop policy if exists "tenant update checklist" on public.checklist;
drop policy if exists "tenant read setup work" on public.setup_work;

create policy "tenant read menu" on public.menu
  for select using (public.same_tenant(brand, branch));
create policy "tenant read people" on public.people
  for select using (public.same_tenant(brand, branch));
create policy "tenant read own profile" on public.tenant_profiles
  for select using (auth.uid() is not null and user_id = auth.uid());
create policy "tenant read item categories" on public.item_categories
  for select using (public.same_tenant(brand, branch));
create policy "tenant read items" on public.items
  for select using (public.same_tenant(brand, branch));
create policy "tenant read warehouse history" on public.warehouse_history
  for select using (public.same_tenant(brand, branch));
create policy "tenant insert warehouse history" on public.warehouse_history
  for insert with check (public.same_tenant(brand, branch));
create policy "tenant read stock log" on public.stock_log
  for select using (public.same_tenant(brand, branch));
create policy "tenant insert stock log" on public.stock_log
  for insert with check (public.same_tenant(brand, branch));
create policy "tenant read check" on public."check"
  for select using (public.same_tenant(brand, branch));
create policy "tenant insert check" on public."check"
  for insert with check (public.same_tenant(brand, branch));
create policy "tenant update check" on public."check"
  for update using (public.same_tenant(brand, branch)) with check (public.same_tenant(brand, branch));
create policy "tenant read fruit order photos" on public.fruit_order_photos
  for select using (public.same_tenant(brand, branch));
create policy "tenant insert fruit order photos" on public.fruit_order_photos
  for insert with check (public.same_tenant(brand, branch));
create policy "tenant read checklist" on public.checklist
  for select using (public.same_tenant(brand, branch));
create policy "tenant update checklist" on public.checklist
  for update using (public.same_tenant(brand, branch)) with check (public.same_tenant(brand, branch));
create policy "tenant read setup work" on public.setup_work
  for select using (public.same_tenant(brand, branch));
