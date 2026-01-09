-- Super Admin Policy Update
-- Create a function to check for super admin status (assuming 'admin' role)
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Secure Projects Table
-- Public can read published projects
-- Admins can do everything
create policy "Admins can do everything on projects" on public.projects
  for all using (public.is_admin());

-- Secure Leads Table
-- Only Admins can view leads
create policy "Admins can view leads" on public.leads
  for select using (public.is_admin());

-- Secure Renderings
-- Users can view their own renderings
create policy "Users can view own renderings" on public.renderings
  for select using (auth.uid() = user_id);

-- Admins can view all renderings
create policy "Admins can view all renderings" on public.renderings
  for select using (public.is_admin());
