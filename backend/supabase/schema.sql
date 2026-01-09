-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects (Portfolio)
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  category text, -- Residential, Commercial, etc.
  cover_image_url text,
  images text[], -- Array of image URLs
  is_featured boolean default false,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Posts
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text, -- Markdown or HTML
  excerpt text,
  cover_image_url text,
  author_id uuid references public.profiles(id),
  tags text[],
  status text default 'draft', -- draft, published
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Leads (Contact Form)
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  project_type text,
  budget_range text,
  message text,
  status text default 'new', -- new, contacted, in_progress, closed
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ai_score integer, -- AI qualification score
  ai_summary text
);

-- AI Renderings
create table public.renderings (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id),
  user_id uuid references public.profiles(id),
  prompt text not null,
  model_used text,
  input_image_url text,
  output_image_url text,
  status text default 'pending', -- pending, completed, failed
  cost_tokens integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.posts enable row level security;
alter table public.leads enable row level security;
alter table public.renderings enable row level security;

-- Public Access Policies
create policy "Public projects are viewable by everyone" on public.projects for select using (status = 'published');
create policy "Public posts are viewable by everyone" on public.posts for select using (status = 'published');

-- Admin Access Policies (Placeholder - requires auth.uid() check against profiles role)
-- create policy "Admins can do everything" on public.projects using ( ... );
