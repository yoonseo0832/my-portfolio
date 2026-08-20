create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', tags text[] not null default '{}',
  repo_url text not null default '', demo_url text not null default '', markdown_content text not null default '',
  is_visible boolean not null default true, created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "Public projects are readable" on public.projects for select using (is_visible = true);
create policy "Server-managed project writes" on public.projects for all using (true) with check (true);
