-- Seed Data for Moha Interiors
-- Sample Projects for Portfolio

INSERT INTO public.projects (title, slug, description, category, status, is_featured)
VALUES 
('The Glass House', 'the-glass-house', 'A stunning residential project featuring floor-to-ceiling glass walls and minimalist aesthetics.', 'Residential Architecture', 'published', true),
('Velvet Lounge', 'velvet-lounge', 'A sophisticated commercial space designed for high-end hospitality and social engagement.', 'Commercial Hospitality', 'published', true),
('Minimalist Executive', 'minimalist-executive', 'A modern, clean office environment designed for maximum productivity and executive comfort.', 'Office Design', 'published', true),
('Azure Penthouse', 'azure-penthouse', 'A luxurious top-floor living space featuring bespoke furnishings and panoramic city views.', 'Luxury Living', 'published', true);

-- Add Images for Projects
INSERT INTO public.project_images (project_id, file_path, order_index)
SELECT id, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop', 0 FROM public.projects WHERE slug = 'the-glass-house';

INSERT INTO public.project_images (project_id, file_path, order_index)
SELECT id, 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', 0 FROM public.projects WHERE slug = 'velvet-lounge';

INSERT INTO public.project_images (project_id, file_path, order_index)
SELECT id, 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', 0 FROM public.projects WHERE slug = 'minimalist-executive';

INSERT INTO public.project_images (project_id, file_path, order_index)
SELECT id, 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1974&auto=format&fit=crop', 0 FROM public.projects WHERE slug = 'azure-penthouse';
