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
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.people add column if not exists image_url text;

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

create table if not exists public."check" (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete set null,
  item_name text not null,
  item_image_url text,
  quantity integer,
  note text,
  check_type text not null default 'ORDER',
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
alter table public."check" add column if not exists status text not null default 'pending';
alter table public."check" add column if not exists done_by_id uuid references public.people(id) on delete set null;
alter table public."check" add column if not exists done_by_name text;
alter table public."check" add column if not exists done_at timestamptz;
alter table public."check" add column if not exists done_date date;
alter table public."check" add column if not exists done_time time;

create table if not exists public.checklist (
  id text primary key,
  work text not null,
  note text,
  team text,
  branch text,
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
alter table public.checklist add column if not exists status text not null default 'pending';
alter table public.checklist add column if not exists done_by_name text;
alter table public.checklist add column if not exists done_at timestamptz;
alter table public.checklist add column if not exists done_date date;
alter table public.checklist add column if not exists done_time time;
alter table public.checklist add column if not exists updated_at timestamptz not null default now();

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
  'checklistkpi',
  'dashboardwork',
  'appdata',
  'unitstable',
  'cashflow'
);

insert into public.menu (id, menu, catalog, icon, permission)
values
  ('329267b2', 'items', 1, 'assets/items-icon.svg', 'CEO , Staff'),
  ('e3490d59', 'Checklist', 1, 'https://cdn-icons-png.flaticon.com/128/681/681662.png', 'CEO , Staff'),
  ('e3490d60', 'Warehouse', 1, 'https://cdn-icons-png.flaticon.com/128/2897/2897818.png', 'CEO , Staff'),
  ('e3490d58', 'People', 1, 'https://cdn-icons-png.flaticon.com/128/1489/1489404.png', 'CEO'),
  ('e3490d69', 'Setup Work', 1, 'https://cdn-icons-png.flaticon.com/128/2049/2049831.png', 'CEO')
on conflict (id) do update set
  menu = excluded.menu,
  catalog = excluded.catalog,
  icon = excluded.icon,
  permission = excluded.permission;

insert into public.people (id, name, role, image_url, active)
values
  ('11111111-1111-1111-1111-111111111111', 'Ammar', 'Staff', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80', true),
  ('22222222-2222-2222-2222-222222222222', 'Franco', 'CEO', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80', true),
  ('33333333-3333-3333-3333-333333333333', 'Store', 'Store', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80', true)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  image_url = excluded.image_url,
  active = excluded.active;

insert into public.checklist (id, work, note, team, branch)
values
  ('id32', 'Restock soft drinks (7up, Redbull, Diet Redbull, Al-Shani)', '', 'Closing team', ''),
  ('id33', 'Refill all Syrup and Slush, Caramel sauce, Hershey sauce', '', 'Closing team', ''),
  ('id34', 'Clean the coffee Machine, keep the milk inside fridge', '', 'Closing team', ''),
  ('id35', 'Clean all refrigerators', '', 'Closing team', ''),
  ('id36', 'Clean the sweet machines', '', 'Closing team', ''),
  ('id37', 'Refill all chocolate in bottle, warmer.', '', 'Closing team', ''),
  ('id38', '-Add 4kg frozen strawberries to the refrigerator. -Check Qishtah, keep them back inside the fridge if they are outside', '', 'Closing team', ''),
  ('id39', 'Remove lime slice, Avocado, Heart Attact, Emperor', '', 'Closing team', ''),
  ('id40', 'Clean sealing machine and can sealing machine', '', 'Closing team', ''),
  ('1a493e94', 'Refill all cutlery for customer outside', '', 'Closing team', ''),
  ('06f06551', 'Refill all sauce for ice cream (Oreo, Snickers, Ferrero, Bueno)', '', 'Closing team', ''),
  ('129556d8', 'Lock the back door (with both doors)', '', 'Closing team', ''),
  ('da6f93b2', 'Clean Cashier Area', '', 'Closing team', ''),
  ('d5da1fc9', 'Clean Orange, Carrot, Apple Machine', '', 'Closing team', ''),
  ('3aa4588a', 'Place the ice cream machine on standby mode.', '', 'Closing team', ''),
  ('f9e44716', 'Clean 2 cups measuring sugar and keep dry', '', 'Closing team', ''),
  ('c655ed57', 'Turn OFF the AC inside kitchen', '', 'Closing team', ''),
  ('5be7ec45', 'Place the warmer chocolate machine on standby mode.', '', 'Closing team', ''),
  ('824df0d0', 'Kill insects with electric racket', '', 'Closing team', ''),
  ('de5894ac', 'Clean Microwave, cooler and Blender, ice maker inside kitchen', '', 'Closing team', ''),
  ('ebe506fe', 'Discard all the full black garbage bags and clean the trash can lid.', '', 'Closing team', ''),
  ('cbb6d6d4', 'Clean all the sink with soap', '', 'Closing team', ''),
  ('3731193f', 'Personal items such as water bottles, coffee cups, and food must be taken home at the end of each shift. Any leftover food or drinks must be discarded.', '', 'Closing team', ''),
  ('f39b95e1', 'Order Crepe-Brownie', '', 'Closing team', ''),
  ('1048f52b', 'SUNDAY (Put all equipments in to the sinks with Clorock)', 'SUNDAY', 'Closing team', ''),
  ('3b71969b', 'Clean all towers', '', 'Closing team', ''),
  ('2cfbc6ad', 'Sent order to Cash&Carry', '', 'Closing team', ''),
  ('04a5c3ff', 'Check and order Ice Cream Vanilla + Brownie', '', 'Closing team', ''),
  ('0128ad0e', '-Avocado (Use the milk from the Coffee machine) -Mango -Strawberry (In the cooler)', '', 'Opening team', ''),
  ('d2371c4c', 'Turn on Ice cream Machine and refill Mango ice cream, Einstein ice cream', '', 'Opening team', ''),
  ('16feeabb', 'Kill insects with electric racket', '', 'Opening team', ''),
  ('2c1a80a1', 'Prepare Mango chunks, Mango for Hambah and refill Bubbles.', '', 'Opening team', ''),
  ('32edfdcc', 'Slice Lime and prepare mint for Mojito', '', 'Opening team', ''),
  ('3ceb5114', 'Bring frozen strawberry outside', '', 'Opening team', ''),
  ('366e935e', 'Prepare water for the customer with ice', '', 'Opening team', ''),
  ('0d1d61a4', 'Turn on the sweet Machine: Waffle - 400F Crepe - 350F Mini Pancakes - 180C', '', 'Opening team', ''),
  ('8d84bc67', 'Clean all sweet machine before preparing order for customer', '', 'Opening team', ''),
  ('6b89fdf1', 'Prepare the filtered white chocolate.', '', 'Opening team', ''),
  ('64c3f571', 'Refill all chocolate in bottle, warmer and chocolate Fountains', '', 'Opening team', ''),
  ('c8bae196', 'Prepare (Pancake mix, Crepe mix)', '', 'Opening team', ''),
  ('b09d8f46', 'Prepare brownie cake for "Hannan-Pillow-Fettuccini"', '', 'Opening team', ''),
  ('2a18f522', 'Check ice maker and make sure it working well', '', 'Opening team', ''),
  ('2b614b1d', 'Prepare Pomegranate pills', '', 'Opening team', ''),
  ('0b3ccd84', 'Prepare all fresh fruits and Fruits salad.', '', 'Opening team', ''),
  ('065570a3', 'Check and refill all ice cream machines.', '', 'Opening team', ''),
  ('aec3c911', 'Refill cutlery for the customer, make sure trash bin of the customer good', '', 'Opening team', ''),
  ('4a98956b', 'Open the sign, open the Uber Eats application.', '', 'Opening team', ''),
  ('509cb705', 'Turn on the Loyalzoo App in the Clover system, Remind the Customer our offer', '', 'Opening team', ''),
  ('a984d0a3', 'Clean all cashier areas, Turn on the LED Lady, Open back door', '', 'Opening team', ''),
  ('a8129f8c', 'Sort fresh Strawberry to 3 class (Strawberry chocolate, Topping, Juice)', '', 'Opening team', ''),
  ('2a3712dc', 'Prepare sauce: Kinder-Ferrero-Snickers-Oreo-Pistachio', '', 'Opening team', ''),
  ('5a610706', 'Prepare Nuts, Pistachio powder', '', 'Opening team', ''),
  ('92c7cc5c', 'Cut Kinder chocolate, Prepare all powder, biscuits needed.', '', 'Opening team', ''),
  ('70203101', 'Fold Fettuccini box', '', 'Opening team', ''),
  ('4be715dd', 'Check Kishtah and put them from the Freezer to the Fridge if needed.', '', 'Opening team', ''),
  ('468e1c4d', 'Put cash Tips Box on counter', '', 'Opening team', ''),
  ('eb0a0c90', 'Clean the walls, the drawers under the counter, and put everything back in order.', '', 'Opening team', ''),
  ('f3b34fca', 'Check that the restroom has toilet paper, hand sanitizer, and that everything is working properly.', '', 'Opening team', ''),
  ('8670ac7c', 'Check if there is enough milk, fruit, or if anything is missing, inform the manager immediately.', '', 'Opening team', ''),
  ('780186d2', 'WEDNESDAY: Remove the refrigerator for cleaning by the company.', '', 'Closing team', ''),
  ('691a067a', 'Cover all biscuits and powder containers', '', 'Closing team', ''),
  ('8de5fcc9', 'Clean all blenders with soap', '', 'Closing team', ''),
  ('699d07a8', 'Check all the diffusers, make sure they are working well', '', 'Opening team', '')
on conflict (id) do update set
  work = excluded.work,
  note = excluded.note,
  team = excluded.team,
  branch = excluded.branch,
  updated_at = now();

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
create index if not exists idx_check_item_id on public."check"(item_id);
create index if not exists idx_check_checked_at on public."check"(checked_at desc);
create index if not exists idx_checklist_team on public.checklist(team);
create index if not exists idx_checklist_status on public.checklist(status);

grant usage on schema public to anon, authenticated;
grant select on
  public.menu,
  public.people,
  public.item_categories,
  public.items,
  public.warehouse_history,
  public.stock_log,
  public."check",
  public.checklist,
  public.setup_work
to anon, authenticated;
grant insert on public."check" to anon, authenticated;
grant update on public."check" to anon, authenticated;
grant update on public.checklist to anon, authenticated;
grant insert on public.warehouse_history to anon, authenticated;
grant insert on public.stock_log to anon, authenticated;

alter table public.menu enable row level security;
alter table public.people enable row level security;
alter table public.item_categories enable row level security;
alter table public.items enable row level security;
alter table public.warehouse_history enable row level security;
alter table public.stock_log enable row level security;
alter table public."check" enable row level security;
alter table public.checklist enable row level security;
alter table public.setup_work enable row level security;

drop policy if exists "public read menu" on public.menu;
drop policy if exists "public read people" on public.people;
drop policy if exists "public read item categories" on public.item_categories;
drop policy if exists "public read items" on public.items;
drop policy if exists "public read warehouse history" on public.warehouse_history;
drop policy if exists "public insert warehouse history" on public.warehouse_history;
drop policy if exists "public read stock log" on public.stock_log;
drop policy if exists "public insert stock log" on public.stock_log;
drop policy if exists "public read check" on public."check";
drop policy if exists "public insert check" on public."check";
drop policy if exists "public update check" on public."check";
drop policy if exists "public read checklist" on public.checklist;
drop policy if exists "public update checklist" on public.checklist;
drop policy if exists "public read setup work" on public.setup_work;

create policy "public read menu" on public.menu for select using (true);
create policy "public read people" on public.people for select using (true);
create policy "public read item categories" on public.item_categories for select using (true);
create policy "public read items" on public.items for select using (true);
create policy "public read warehouse history" on public.warehouse_history for select using (true);
create policy "public insert warehouse history" on public.warehouse_history for insert with check (true);
create policy "public read stock log" on public.stock_log for select using (true);
create policy "public insert stock log" on public.stock_log for insert with check (true);
create policy "public read check" on public."check" for select using (true);
create policy "public insert check" on public."check" for insert with check (true);
create policy "public update check" on public."check" for update using (true) with check (true);
create policy "public read checklist" on public.checklist for select using (true);
create policy "public update checklist" on public.checklist for update using (true) with check (true);
create policy "public read setup work" on public.setup_work for select using (true);
