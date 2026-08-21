create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', tags text[] not null default '{}',
  repo_url text not null default '', demo_url text not null default '', markdown_content text not null default '',
  is_visible boolean not null default true, platform text not null default 'github', platform_label text,
  created_at timestamptz not null default now()
);
alter table public.projects add column if not exists platform text not null default 'github';
alter table public.projects add column if not exists platform_label text;
alter table public.projects enable row level security;
create policy "Public projects are readable" on public.projects for select using (is_visible = true);
create policy "Server-managed project writes" on public.projects for all using (true) with check (true);

create table if not exists public.site_content (
  key text primary key,
  content text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "Public site content readable" on public.site_content for select using (true);
create policy "Server-managed site content writes" on public.site_content for all using (true) with check (true);

create table if not exists public.dev_notes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dev_notes enable row level security;
create policy "Public dev notes are readable" on public.dev_notes for select using (true);
create policy "Server-managed dev note writes" on public.dev_notes for all using (true) with check (true);
