Moha Interiors – Supabase Architecture & Setup Plan

Goal: Centralized backend with secure, scalable, and modular database and authentication system for all Moha Interiors digital operations.

Supabase Products to Use:

Database (PostgreSQL) – Core relational data storage.

Authentication – User, role-based access control (RBAC), API tokens.

Storage – Images, videos, 3D render outputs, portfolio media.

Edge Functions – Serverless API logic for AI agent calls, social media APIs, notifications.

Realtime / Subscriptions – Unified social inbox, live notifications, dashboard updates.

Secrets Management – Secure API key storage (AI APIs, social media APIs, etc.).

Extensions – e.g., PostGIS for advanced spatial/landscaping data, pgcrypto for encryption.

1. Core Tables & Schemas
1.1 Users & Auth
Table	Columns	Purpose	Notes
users	id (uuid), email, password_hash, full_name, phone, role_id, created_at, updated_at	Core user accounts	Integrate with Supabase Auth, store hashed passwords
roles	id, name, description	Define system roles (Admin, Designer, Client, Sales)	Used for RBAC
permissions	id, role_id, resource, action	Define granular permissions	Example: portfolio:create, blog:edit
user_sessions	id, user_id, session_token, expires_at	Track user login sessions	Optional for custom session management

RLS Policy Example:

-- Users can access only their own record
CREATE POLICY "users_self_access" ON users
FOR SELECT USING (auth.uid() = id);

-- Admins can access all
CREATE POLICY "users_admin_access" ON users
FOR SELECT USING (EXISTS (SELECT 1 FROM roles r WHERE r.id = users.role_id AND r.name = 'Admin'));

1.2 Portfolio & Project Management
Table	Columns	Purpose
projects	id, title, description, category, client_id, status, created_at, updated_at	Main project entity
project_images	id, project_id, file_path, order_index	Store project photos and media
clients	id, name, email, phone, address, created_at	Client management
project_tags	id, project_id, tag	Flexible tagging for filtering

RLS Policy Example:

-- Designers/admins can read/write
CREATE POLICY "project_access" ON projects
FOR ALL USING (
  EXISTS (SELECT 1 FROM roles r WHERE r.id = auth.role() AND r.name IN ('Admin','Designer'))
);

1.3 Blog / CMS
Table	Columns	Purpose
blog_posts	id, title, content, author_id, status, published_at, created_at, updated_at	CMS content
blog_categories	id, name	Categorize posts
blog_tags	id, post_id, tag	Flexible tags for search/filtering
blog_media	id, post_id, file_path	Featured images, videos

RLS Policy Example:

-- Authors can edit their own posts
CREATE POLICY "authors_can_edit" ON blog_posts
FOR UPDATE USING (auth.uid() = author_id);

1.4 AI 3D Rendering
Table	Columns	Purpose
render_requests	id, user_id, project_id, input_file_path, model, status, created_at, completed_at	Track rendering jobs
render_results	id, request_id, output_file_path, cost_tokens, model_used, created_at	Store results from Claude/Gemini
render_parameters	id, request_id, style, furnishings, lighting, walls, flooring, exterior	Store structured inputs for prompts

RLS Example:

Users see only their render jobs.

Designers/Admins can see all for review and QA.

1.5 Leads & CRM
Table	Columns	Purpose
leads	id, client_name, email, phone, source, assigned_to, status, created_at	Lead tracking
lead_notes	id, lead_id, note, created_by, created_at	Communication logs
lead_scoring	id, lead_id, score, rationale	AI-powered scoring & qualification

RLS Example:

Sales users can see only their assigned leads.

Admins can see all leads.

1.6 Social Media Integration
Table	Columns	Purpose
social_accounts	id, platform, username, access_token	Store IG/TikTok accounts
social_messages	id, account_id, message_type, content, sender_id, received_at, status	Unified inbox messages
social_analytics	id, account_id, metric_type, value, recorded_at	Engagement tracking
social_sentiment	id, message_id, sentiment_score, model_used	AI-analyzed sentiment
1.7 Audit & Logging
Table	Columns	Purpose
audit_logs	id, table_name, record_id, action, performed_by, timestamp, old_values, new_values	Full audit trail of all critical actions
error_logs	id, service, error_message, stack_trace, created_at	Backend/agent errors

RLS Example:

Only Admins can view audit or error logs.

2. Supabase Functions (Edge & Stored)

Edge Functions (Serverless)

process_render_request(request_id) → Triggers AI rendering pipeline, logs cost and outputs.

fetch_social_updates(account_id) → Pulls messages, comments, and analytics from IG/TikTok APIs periodically.

generate_ai_insights(table_name) → Calls Claude/Gemini to summarize trends for analytics dashboards.

assign_leads(lead_id) → AI-powered lead assignment based on scoring and workload.

Database Functions

increment_render_counter(user_id) → Track API usage, enforce limits.

update_lead_score(lead_id) → Compute AI lead score.

archive_old_projects(project_id) → Automated archival logic.

log_audit_action(table_name, record_id, action, user_id) → Standardized audit logging.

3. API Rate Limits & Guardrails

Per-agent API limits:

Track each agent’s requests in agent_usage table

Limit per user/project/agent to avoid overuse

Edge function to queue requests if limits hit

Global fallback:

If AI quota exhausted, return cached results or default prompt templates

Security:

Secrets stored in Supabase Secrets

RLS and JWT enforcement at every table and function

4. Storage Configuration

Buckets:

project-media → Images/videos for portfolio

blog-media → Blog posts’ featured media

renders → 3D AI-generated renders

social-uploads → Attachments from social media messages

Policies:

Only authenticated users can read/write

Admins can access all

Public read only for approved portfolio/blog assets

5. Supabase Best Practices

Scratchpad / Dev Environment

Separate supabase_dev project for experimentation with AI prompt inputs

Use migrations for every schema change

Track feature branch DB changes in versioned SQL files

CI/CD Integration

Auto-deploy migrations to staging on push

Human review before merging to main

Audit & Monitoring

Enable Realtime logs for critical tables

Connect to Datadog/Prometheus if needed

6. CTO-Level Guidelines & Guardrails

Security

Enforce RLS on all tables

Use JWT + Supabase Auth for API access

Encrypt sensitive data (pgcrypto)

Data Governance

Define strict table ownership for agents vs. humans

Track all AI-generated updates in audit_logs

Scalability

Use partitioned tables for social messages

Index frequently queried fields (project_id, user_id)

Maintainability

Modular schema: separate concerns for projects, blog, social, AI

Versioned migrations, automated backups

AI Integration

Queue requests via edge functions

Enforce per-agent rate limits

Log costs per render/request for budgeting

This setup ensures enterprise-grade security, scalability, and AI-human collaboration, while allowing Antigravity agents to automate 95% of operations safely.