1. Branching Strategy for Moha Interiors
Main Branch

Name: main (or production)

Purpose:

Always contains stable, tested, production-ready code.

Represents what is currently live or ready to deploy.

No direct commits allowed; all changes must come via pull requests (PRs) from feature branches.

Scope:

Phase 1 “Foundation & Core Infrastructure” plus stable, tested core website pages:

Core Next.js setup

Supabase connection and schema

Authentication & RBAC

Admin dashboard skeleton (layouts, navigation)

Core pages: homepage, portfolio CMS, contact form, blog CMS

Essentially, anything that is fully functional and has passed QA for a production-ready baseline.

Develop Branch

Optional: develop branch for ongoing integration of features before merging to main.

Purpose:

Integrates multiple features for QA before merging to main.

Safe playground for combining multiple features without impacting production.

Workflow:

Developers merge feature branches → develop → main after QA approval.

Not strictly necessary if you enforce very strict feature-branch PRs directly into main.

Feature Branches

Naming: feature/<module-or-task>

Examples: feature/authentication, feature/portfolio-cms, feature/ai-rendering

Purpose:

Each branch isolates a specific feature, page, component, or module.

Allows multiple developers or AI agents to work in parallel without conflicts.

Lifecycle:

Branch off main (or develop)

Implement feature/component

Write tests for new code

Open a PR → automatic CI/CD + review

Merge to develop or main after approval

Hotfix / Bugfix Branches

Naming: hotfix/<issue>

Purpose:

Urgent production fixes that can’t wait for feature branches.

Lifecycle:

Branch from main, fix issue, run tests, merge back to main and develop.

Release Branches

Optional: release/<version>

Purpose:

Prepare a stable snapshot for production release.

Useful if you plan phased releases (v1.0, v1.1, etc.)

Lifecycle:

Branch from develop, freeze features, bugfix only, QA, merge to main.

2. Component-Level Branch Enforcement

Since your project is modular (admin dashboard, AI rendering, CMS, social integration, etc.), branching should mirror your modules:

Frontend:

feature/dashboard-layout

feature/portfolio-cms-ui

feature/ai-rendering-ui

Backend:

feature/auth-api

feature/portfolio-api

feature/ai-rendering-api

feature/social-api

Shared/Config:

feature/env-setup

feature/ci-cd

Benefit: Any feature can be tested in isolation, and QA can focus on module-specific functionality before integration.

3. Branch Protection Rules (Enterprise-Grade)

For a production-ready setup:

Protect main branch:

Require pull request (PR) reviews before merge

Enforce passing CI/CD tests (unit tests, integration tests, linting)

Require signed commits / verified authors

Disallow force pushes

Enforce code owners approval (e.g., senior engineer or lead)

Optional for develop branch:

Require PR review and passing tests

Protect against accidental direct commits

Feature branches:

Free for devs/AI to push code, but all merges to main or develop must pass CI/CD

Include automated linting, type checks, and unit tests

4. When to Start Enforcing Branch Protections

After initial Phase 1 setup is complete:

Once main has:

Next.js app skeleton + Tailwind/Shadcn/UI

Supabase schema + Auth setup

Admin dashboard layout + core navigation

CI/CD pipelines in place

Reason: Protects the baseline that’s stable, fully tested, and deployable.

Feature branches then become the only way to add new pages, modules, or integrations (AI rendering, social media, lead management).

5. Role of the Senior Full-Stack Engineer

Add a senior full-stack engineer to enforce branch discipline and architecture consistency:

Responsibilities:

Define module boundaries for feature branches

Approve all PRs for main (code owner)

Ensure API rate limits, CI/CD, and security checks are enforced

Review AI agent outputs before merge (human oversight)

Maintain coding standards, folder structure, and naming conventions

✅ TL;DR – Branch Plan for Moha Interiors (Antigravity Edition)

Branch	Purpose	Rules
main	Stable, production-ready code	PR only, CI/CD passing, code owners approval
develop	Integration playground (optional)	PR only, CI/CD passing
feature/*	Isolated feature/module development	Free to push, must pass tests before merge
hotfix/*	Urgent production fixes	Merge to main and develop after testing
release/*	Stable snapshot for production release	QA only, freeze features, merge to main