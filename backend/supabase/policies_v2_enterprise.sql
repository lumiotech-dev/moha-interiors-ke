-- Enterprise Access Policies
-- Aligned with Schema v2.0

-- Helper Function: Check Role Name
create or replace function public.has_role(role_name text)
returns boolean as $$
declare
  user_role text;
begin
  select r.name into user_role
  from public.profiles p
  join public.roles r on p.role_id = r.id
  where p.id = auth.uid();
  
  return user_role = role_name;
end;
$$ language plpgsql security definer;

-- PROFILES
create policy "Users manage own profile" on public.profiles
for all using (auth.uid() = id);

create policy "Admins manage all profiles" on public.profiles
for all using (public.has_role('admin'));

-- PROJECTS & PORTFOLIO
create policy "Public view published projects" on public.projects
for select using (status = 'published');

create policy "Designers manage projects" on public.projects
for all using (public.has_role('admin') or public.has_role('designer'));

create policy "Clients view assigned projects" on public.projects
for select using (client_id in (select id from public.clients where email = (select email from public.profiles where id = auth.uid())));

-- LEADS (CRM)
create policy "Admins and Sales view leads" on public.leads
for all using (public.has_role('admin') or public.has_role('sales'));

-- RENDERINGS
create policy "Designers manage renders" on public.render_requests
for all using (public.has_role('admin') or public.has_role('designer'));

-- AUDIT LOGS
create policy "Admins view audit logs" on public.audit_logs
for select using (public.has_role('admin'));

-- SYSTEM LOGGING (Insert only for system)
create policy "System insert errors" on public.error_logs
for insert with check (true);
