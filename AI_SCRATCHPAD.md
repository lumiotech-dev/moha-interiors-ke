# AI Scratchpad: Moha Interiors Digital Platform

**Project:** Moha Interiors Ke Digital Platform
**Status:** Phase 1 Initialization
**Last Updated:** 2026-01-09

## 1. Decision Log
| ID | Date | Decision | Rationale | Owner |
| :--- | :--- | :--- | :--- | :--- |
| DEC-001 | 2026-01-09 | Tech Stack Selection | Chosen Next.js (Frontend) and Fastify (Backend) for optimal performance and SEO. | Manus AI |
| DEC-002 | 2026-01-09 | AI-First Execution | Adopting 95% AI-driven model to accelerate build time. | Founder |
| DEC-003 | 2026-01-09 | Luxury UI Stack | Added Framer Motion & Lenis to core stack for premium feel. | Manus AI |
| DEC-004 | 2026-01-09 | Isolated Admin App | Separating `admin-dashboard` into its own Next.js app for Zero Trust security and isolation. | User |
| DEC-005 | 2026-01-09 | Policy Adoption | Adopted strict Supabase RLS and Branching Strategy from documentation. | User |
| DEC-006 | 2026-01-09 | Package Manager | Use pnpm instead of npm for all package management. | User |

## 2. Current Task: Phase 1 - Foundation [COMPLETE]
- [x] Initialize GitHub Repos (Frontend/Backend)
- [x] Create Supabase Schema
- [x] Setup Development Environment (Frontend Dependencies)
- [x] Initialize Admin Dashboard (Secure App) -> `apps/admin` (Zero Trust Metadata Configured)
- [x] Implement RBAC Policies (SQL)
- [x] Harden Backend (Helmet, Rate Limit, CORS)
- [x] Verify Backend Build & Start (Confirmed listening on port 3001)
- [x] Seed Frontend Design System (Brand Kit)
- [x] Seed Admin Design System (Brand Kit)
- [x] Adopt Branching Strategy & Supabase Architecture
    - *Note:* Parsed `Docs/Supabase _Architecture_&_Setup_Plan.md` and `Docs/Moha_interiors_Branching_Strategy.md`.
    - *Action:* Upgraded Schema to v2 Enterprise (see `backend/supabase/schema_v2_enterprise.sql`) to match the documentation strictly.
- [x] Link to GitHub Remote (lumiotech-dev/moha-interiors-ke)
- [x] Configure Environment Variables (Backend & Admin)
- [x] Verify Frontend Build
- [x] Verify Admin Dashboard Build

**Next Step:** See `GIT_COMMIT_GUIDE.md` for manual Git commit steps (Git CLI not available in current environment).

**Phase 1 Status:** ✅ COMPLETE - Committed locally (9d5cd31) - Manual push required due to Git credential caching.

**See:** `COMMIT_STATUS.md` for push instructions.

## Phase 2 Tasks: Core Website & AI Integration
- [x] Build Public Homepage (Hero, Services, Portfolio Teaser)
    - [x] Component: `HeroSection` (Video Background + Text Reveal)
    - [x] Component: `ServicesGrid` (Hover Effects + Iconography)
    - [x] Component: `PortfolioShowcase` (Parallax Scroll + Image Hover)
- [x] Connect Frontend to Supabase (Project Fetching)
- [x] Implement Unified Social Inbox (Admin Dashboard UI + Realtime)
- [x] Connect AI 3D Rendering Logic (Backend API Infrastructure)

## 3. Implementation Notes
*   **Frontend**: `apps/web` (Next.js) - Public Facing
*   **Admin**: `apps/admin` (Next.js) - Internal Super Admin Tool
*   **Backend**: `apps/api` (Fastify) - Secure API Gateway
*   **Policies**:
    *   Branching: `Docs/Moha_interiors_Branching_Strategy.md`
    *   Supabase: `backend/supabase/README.md`

## 4. API Usage & Costs
*   *Pending initialization*

## 5. Security Guardrails
*   **RBAC**: Strict role enforcement via Supabase RLS and Backend Middleware.
*   **Super Admin**: Exclusive access to `admin-dashboard` critical settings (AI Keys, User Management).
*   **Zero Trust**: Admin API endpoints require strict JWT verification + Role claim.

## 6. Errors & unexpected behavior
*   *None yet*