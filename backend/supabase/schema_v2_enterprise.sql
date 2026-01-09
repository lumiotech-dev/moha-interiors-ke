-- Moha Interiors Enterprise Schema (v2.0)
-- Aligned strictly with @[Docs/Supabase _Architecture_&_Setup_Plan.md]

-- Enable Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto"; -- For advanced encryption if needed

-- 1.1 Users & Auth (RBAC)
create table public.roles (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null, -- 'admin', 'designer', 'client', 'sales'
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  phone text,
  role_id uuid references public.roles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.permissions (
  id uuid default uuid_generate_v4() primary key,
  role_id uuid references public.roles(id),
  resource text not null, -- 'projects', 'blog', 'leads'
  action text not null, -- 'create', 'read', 'update', 'delete'
  unique(role_id, resource, action)
);

-- 1.2 Portfolio & Projects
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  category text, -- Residential, Commercial, etc.
  client_id uuid references public.clients(id),
  status text default 'draft', -- draft, published, archived
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.project_images (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  file_path text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.project_tags (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  tag text not null
);

-- 1.3 Blog / CMS
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  author_id uuid references public.profiles(id),
  status text default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.blog_media (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.blog_posts(id) on delete cascade,
  file_path text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1.4 AI 3D Rendering
create table public.render_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  project_id uuid references public.projects(id),
  input_file_path text,
  model text default 'claude-3-opus',
  prompt text,
  status text default 'pending', -- pending, processing, completed, failed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

create table public.render_results (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.render_requests(id) on delete cascade,
  output_file_path text,
  cost_tokens integer,
  model_used text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1.5 Leads & CRM
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  source text, -- website, instagram, referral
  status text default 'new',
  assigned_to uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.lead_scoring (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete cascade,
  score integer,
  rationale text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1.6 Social Media Integration
create table public.social_accounts (
  id uuid default uuid_generate_v4() primary key,
  platform text not null, -- instagram, tiktok
  username text not null,
  access_token text, -- Encrypt this in production
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.social_messages (
  id uuid default uuid_generate_v4() primary key,
  account_id uuid references public.social_accounts(id),
  message_type text, -- dm, comment
  content text,
  sender_id text,
  received_at timestamp with time zone,
  status text default 'unread',
  sentiment_score float,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1.7 Audit & Logging
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  table_name text not null,
  record_id uuid,
  action text not null,
  performed_by uuid references public.profiles(id),
  old_values jsonb,
  new_values jsonb,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.error_logs (
  id uuid default uuid_generate_v4() primary key,
  service text,
  error_message text,
  stack_trace text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.render_requests enable row level security;
alter table public.leads enable row level security;
alter table public.audit_logs enable row level security;
alter table public.social_messages enable row level security;

-- Initial Seed Data for Roles
insert into public.roles (name, description) values
('admin', 'Super Administrator with full access'),
('designer', 'Interior Designer, can manage projects and renders'),
('client', 'View-only access to their own projects'),
('sales', 'Can manage leads and CRM');
