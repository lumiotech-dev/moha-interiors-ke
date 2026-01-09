# Product Requirements Document: Moha Interiors Digital Platform

**Version:** 2.0 (Updated with Claude & Gemini AI Integration)
**Date:** January 9, 2026
**Author:** Manus AI
**Status:** Final

---

## 1. Introduction

### 1.1. Purpose

This document outlines the product requirements for a new, comprehensive digital platform for Moha Interiors Ltd. The platform will consist of a public-facing website to showcase their portfolio and attract clients, and a powerful, integrated admin dashboard to streamline operations, manage social media, and leverage advanced AI models (Claude and Gemini) for intelligent agentic work, including design visualization and content generation.

### 1.2. Scope

The scope of this project includes the design, development, and deployment of a full-stack web application. This encompasses a Next.js frontend, a Fastify backend, and a Supabase database with authentication. The project is divided into two main components:

*   **Public-Facing Website:** A visually stunning, premium website to serve as the primary marketing and client acquisition tool.
*   **Admin Dashboard:** An internal tool for the Moha Interiors team to manage content, client interactions, social media, and utilize AI-powered agents (Claude and Gemini) for design visualization, content generation, and intelligent automation.

### 1.3. Target Audience

*   **Primary Users (Admin Dashboard):** The Moha Interiors team (designers, project managers, social media managers, administrators).
*   **Secondary Users (Public Website):** Potential clients (residential and commercial), partners, and media.

---

## 2. Product Goals and Objectives

### 2.1. Business Goals

*   **Increase Lead Generation:** Generate a 50% increase in qualified client leads through the website within the first year.
*   **Enhance Brand Prestige:** Solidify Moha Interiors' position as a market leader in the Kenyan high-end interior design space.
*   **Improve Operational Efficiency:** Reduce time spent on social media management and client communication by 30% through the integrated admin dashboard and AI-powered automation.
*   **Drive Innovation:** Introduce AI-powered 3D rendering and intelligent design assistance as unique selling propositions to attract and convert clients.

### 2.2. User Goals

*   **Potential Clients:** To easily browse Moha Interiors' portfolio, understand their services, and be inspired to initiate a project.
*   **Moha Interiors Team:** To have a centralized hub for managing all digital touchpoints, from social media engagement to client data, and to have access to cutting-edge AI-powered design and automation tools.

---

## 3. User Personas

### 3.1. Amina, Lead Interior Designer (Moha Interiors Team)

*   **Needs:** A tool to quickly visualize design concepts for clients, manage multiple projects, and track client feedback. Access to intelligent AI tools that can accelerate the design process.
*   **Pain Points:** Spends too much time creating 2D mood boards; communication with clients is scattered across email and WhatsApp; needs to generate client-ready renderings quickly.
*   **Goals:** Wants to impress clients with realistic 3D renderings, have a single source of truth for all project-related information, and use AI to speed up the design iteration process.

### 3.2. David, Potential Client (High-Net-Worth Individual)

*   **Needs:** To find a reputable, high-end interior design firm in Kenya for a new residential project. Wants to see realistic visualizations of proposed designs.
*   **Pain Points:** Finds most local websites to be generic and uninspiring; struggles to visualize the final outcome of a project; wants personalized design recommendations.
*   **Goals:** Wants to see a portfolio of high-quality work, feel confident that the firm can execute his vision to a high standard, and understand how the firm's AI-powered design process works.

---

## 4. Core Features Overview

### 4.1. Public-Facing Website

*   **Homepage:** A captivating introduction to the Moha Interiors brand.
*   **Portfolio:** A gallery of completed projects with high-resolution images and videos.
*   **Services:** Detailed descriptions of the services offered, including AI-powered design consultation.
*   **About Us:** The story of Moha Interiors and its team.
*   **Blog/Journal:** Articles on design trends, project spotlights, and company news (powered by AI content generation).
*   **Contact/Consultation Form:** An easy way for potential clients to get in touch.

### 4.2. Admin Dashboard

*   **Centralized Hub:** A single interface for all administrative tasks.
*   **Social Media Integration:** A unified inbox for Instagram and TikTok comments and DMs with AI-assisted responses.
*   **Analytics & Reporting:** Dashboards for website traffic, social media performance, and lead generation with AI-generated insights.
*   **AI 3D Rendering Agent:** An interactive tool to generate 3D visualizations of interior spaces using Claude or Gemini models.
*   **Content Management System (CMS):** For updating the public-facing website (portfolio, blog, etc.) with AI-assisted content generation.
*   **User Management:** Role-based access control for the Moha Interiors team.
*   **AI Model Configuration:** Settings to manage Claude and Gemini API keys and select models for different tasks.

---

## 5. Technical Architecture and Stack

This section details the proposed technical architecture, technology stack, and infrastructure for the Moha Interiors digital platform. The architecture is designed for scalability, performance, and maintainability, adhering to modern best practices.

### 5.1. System Architecture

The platform will be built on a decoupled, service-oriented architecture. This separates the frontend presentation layer from the backend business logic and data layer, allowing for independent development, scaling, and maintenance.

**Architectural Diagram Overview:**

```
[ User (Client/Admin) ] <--> [ Next.js Frontend (Vercel) ]
          ^
          | (HTTPS/API Calls)
          v
[ Fastify Backend (Container Service) ]
          ^
          | (API Integrations)
          v
[ Supabase (PostgreSQL DB & Auth) ]
          ^
          | (Secrets Storage)
          v
[ Third-Party Services ]
    - Claude API (Anthropic)
    - Gemini API (Google)
    - Instagram Graph API
    - TikTok for Business API
    - 3D Rendering Engine (Three.js / Replicate)
    - Email Service (Resend/SendGrid)
```

**Core Components:**

1.  **Frontend (Next.js):** A server-side rendered (SSR) and static site generation (SSG) React application that provides a fast, SEO-friendly public website and a dynamic, responsive admin dashboard.
2.  **Backend (Fastify):** A high-performance Node.js server that exposes a RESTful API. It will handle business logic, data processing, AI model orchestration, and secure communication with the database and third-party services.
3.  **Database & Auth (Supabase):** A managed PostgreSQL database for all application data. Supabase will also handle user authentication (for the admin dashboard), row-level security, and encrypted secrets storage for API keys.
4.  **AI Orchestration Layer:** A dedicated backend module that manages communication with Claude and Gemini APIs, handles model selection, request routing, and response processing.
5.  **Third-Party Integrations:** The backend will integrate with external APIs for social media management, AI model access, and notifications.

### 5.2. Technology Stack

This stack has been selected to ensure a premium, non-generic user experience, high performance, developer efficiency, and seamless AI integration.

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14+ (App Router) | Industry standard for production-grade React applications; provides SSR/SSG for performance and SEO. |
| **UI Library** | React, TypeScript | Ensures type safety and robust, component-based UI development. |
| **Styling** | Tailwind CSS | A utility-first CSS framework for rapid, custom UI development without being confined to a component library's style. |
| **UI Components** | Shadcn/UI & Radix UI | Provides a set of beautifully designed, accessible, and unstyled components that can be fully customized to match Moha Interiors' brand, avoiding a "generic" look. |
| **3D Visualization** | Three.js / React Three Fiber | Powerful libraries for creating and displaying 3D graphics in the browser, essential for rendering AI-generated 3D visualizations. |
| **Backend Framework** | Fastify | A high-performance, low-overhead Node.js framework, significantly faster than alternatives like Express.js, ensuring snappy API responses. |
| **Database** | Supabase (PostgreSQL) | A scalable, robust, and open-source relational database with excellent developer tools, including real-time capabilities, managed infrastructure, and encrypted secrets storage. |
| **Authentication** | Supabase Auth | Provides secure, JWT-based authentication out-of-the-box, with support for social logins and role-based access control (RBAC). |
| **AI Model Integration** | Anthropic SDK (Claude), Google Generative AI SDK (Gemini) | Official SDKs for seamless integration with Claude and Gemini APIs, with built-in error handling and streaming support. |
| **Deployment** | Vercel (Frontend), AWS/GCP (Backend) | Vercel offers seamless deployment and a global CDN for the Next.js frontend. A container service like AWS Fargate or Google Cloud Run is recommended for the backend for scalability and reliability. |

### 5.3. Third-Party Integrations

*   **Claude API (Anthropic):** Integration with Claude models for complex reasoning, design analysis, content generation, and 3D rendering prompt engineering. Requires an Anthropic API key.
*   **Gemini API (Google):** Integration with Gemini models for fast, multi-modal analysis, image understanding, and real-time processing. Requires a Google Cloud API key.
*   **Social Media APIs:** Integration with the Instagram Graph API and TikTok for Business API will be required to fetch comments, DMs, and analytics data. This will require developer accounts and app approval from Meta and TikTok.
*   **3D Rendering Pipeline:** AI-generated instructions from Claude/Gemini will be processed by a 3D rendering engine (Three.js with custom shaders or a service like Replicate) to produce the final visualization.
*   **Email Service:** A transactional email service like Resend or SendGrid will be used for sending notifications (e.g., new client inquiries, password resets).

---

## 6. Frontend Features (Public-Facing Website)

The public-facing website must be a masterpiece of digital craftsmanship, reflecting the premium quality of Moha Interiors' work. The UI/UX will be custom-designed to be elegant, intuitive, and visually immersive, avoiding all generic templates. Performance and responsiveness are paramount.

### 6.1. General Requirements

*   **Design Philosophy:** The design will be clean, modern, and luxurious, with a focus on high-quality imagery and typography. It should feel bespoke and architectural.
*   **Performance:** Target a Google Lighthouse score of 95+ for performance, accessibility, and SEO. Pages should load in under 1.5 seconds.
*   **Responsiveness:** The website must be fully responsive and provide a seamless experience on all devices, from mobile phones to large desktop monitors.
*   **Animations & Transitions:** Subtle, tasteful animations and page transitions will be used to enhance the user experience and guide the user's eye, contributing to the premium feel.

### 6.2. Feature Breakdown

| Feature ID | Feature Name | Description | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- |
| WEB-01 | **Homepage** | A captivating landing page featuring a hero section with a high-impact video or image, a brief introduction to Moha Interiors, featured projects, and client testimonials. | Must-have | The first impression is critical. This page must immediately convey luxury and expertise. |
| WEB-02 | **Portfolio Gallery** | A dynamic, filterable gallery of projects. Each project will have its own dedicated page with a detailed description, a gallery of high-resolution images, and potentially video walkthroughs. | Must-have | The core of the marketing site. The gallery should support categories like "Residential," "Commercial," "Hospitality," etc. |
| WEB-03 | **Project Detail Page** | An immersive page for each project, featuring a full-screen image/video carousel, project narrative, and key details. | Must-have | Designed to tell the story of each project and showcase the quality of work. |
| WEB-04 | **Services Page** | A clear and detailed explanation of the services offered, from initial consultation to project completion. This could be broken down into sub-pages for different service tiers. | Must-have | Educates potential clients on the value proposition. |
| WEB-05 | **About Us / The Firm** | A page dedicated to the story of Moha Interiors, its philosophy, and its team. Includes professional headshots and bios for key team members. | Must-have | Builds trust and a personal connection with the brand. |
| WEB-06 | **Journal / Blog** | A CMS-driven blog for sharing articles on design trends, project spotlights, and industry insights. Content can be AI-assisted using Claude or Gemini. | High | SEO driver and a way to keep the site content fresh. |
| WEB-07 | **Contact & Consultation Form** | A beautifully designed, user-friendly form for potential clients to initiate contact. It should be multi-step to qualify leads (e.g., project type, budget range, timeline). | Must-have | The primary lead generation tool. Integrates with the admin dashboard. |
| WEB-08 | **SEO & Metadata** | Full support for custom meta titles, descriptions, and social sharing (Open Graph) tags for all pages, managed through the admin CMS. | Must-have | Essential for organic visibility and professional social sharing. |

---

## 7. Admin Dashboard Features

The admin dashboard is the operational heart of the platform. It must be intuitive, powerful, and designed for efficiency. The UI will be clean, data-rich, and fully responsive for use on both desktop and tablets.

### 7.1. General Requirements

*   **Authentication:** Secure login for Moha Interiors team members using Supabase Auth.
*   **Role-Based Access Control (RBAC):** Different roles (e.g., Admin, Designer, Social Media Manager) will have access to different sections of the dashboard.
*   **Dashboard Homepage:** A customizable overview of key metrics: new leads, social media notifications, and recent project activity.

### 7.2. Feature Breakdown

| Feature ID | Feature Name | Description | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- |
| ADM-01 | **Unified Social Inbox** | A single interface to view and respond to comments and direct messages from both Instagram and TikTok. Messages can be assigned to team members and marked as resolved. AI-assisted response generation using Claude or Gemini. | Must-have | The core efficiency driver. Requires Instagram Graph API and TikTok for Business API integration. |
| ADM-02 | **Social Media Analytics** | A dashboard displaying key metrics for connected social accounts: follower growth, engagement rate, top-performing posts, and audience demographics. AI-generated insights powered by Claude or Gemini. | Must-have | Provides actionable insights for social media strategy. |
| ADM-03 | **AI 3D Rendering Agent** | An interactive tool where designers can upload a 2D floor plan or image, select a Claude or Gemini model via dropdown, specify design parameters, and generate a 3D rendered visualization. | High | The key innovation feature. Supports model selection for optimal results. |
| ADM-04 | **Portfolio CMS** | A full content management system for creating, updating, and deleting projects in the public-facing portfolio. Includes image/video uploads and reordering. | Must-have | Allows the team to keep the website portfolio fresh without developer intervention. |
| ADM-05 | **Journal/Blog CMS** | A rich text editor for writing and publishing articles to the "Journal" section of the website. Supports scheduling, author management, and AI-assisted content generation using Claude or Gemini. | Must-have | Essential for content marketing and SEO efforts. |
| ADM-06 | **Lead Management** | A CRM-like interface to view and manage incoming client inquiries from the website's contact form. Leads can be assigned statuses (New, Contacted, In Progress, Closed). AI-powered lead scoring and qualification. | Must-have | Centralizes the lead pipeline. |
| ADM-07 | **Client & Project Database** | A central repository for client information and project details. This can be linked to portfolio entries and client communications. | High | Creates a single source of truth for all project-related data. |
| ADM-08 | **Notification Center** | A real-time notification system within the dashboard for new leads, social media messages, and assigned tasks. | High | Keeps the team informed and responsive. |
| ADM-09 | **User & Role Management** | An admin-only section to invite new team members and assign them roles and permissions within the dashboard. | Must-have | Ensures security and proper access control. |
| ADM-10 | **AI Model Configuration** | An admin-only settings page to manage Claude and Gemini API keys, select default models for different tasks, and monitor API usage and costs. | Must-have | Ensures secure API key management and cost control. |

---

## 8. AI-Powered Agentic System

The platform will leverage advanced AI models from Anthropic (Claude) and Google (Gemini) to power intelligent agentic tasks throughout the application. This system will enable sophisticated reasoning, design analysis, and content generation while maintaining flexibility to choose the best model for each specific use case.

### 8.1. AI Model Integration Architecture

The backend will implement a flexible AI abstraction layer that supports multiple models and versions with a dropdown selector in the admin dashboard.

**Supported Models:**

| Provider | Models | Use Cases | Strengths | API Endpoint |
| :--- | :--- | :--- | :--- | :--- |
| **Anthropic (Claude)** | Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku | Complex reasoning, design analysis, detailed content generation, 3D rendering prompts | Superior reasoning for spatial understanding, nuanced design narratives | `https://api.anthropic.com/v1/messages` |
| **Google (Gemini)** | Gemini 2.0 Flash, Gemini 1.5 Pro, Gemini 1.5 Flash | Multi-modal analysis, image understanding, quick responses, real-time processing | Faster response times, excellent image recognition, real-time capabilities | `https://generativelanguage.googleapis.com/v1beta/models` |

**Model Selection Criteria:**

*   **Claude 3.5 Sonnet:** Best for complex design reasoning, detailed 3D rendering prompts, comprehensive content generation, and nuanced client communication responses. Ideal when quality and depth are prioritized over speed.
*   **Claude 3 Opus:** For heavyweight reasoning tasks, comprehensive design analysis, and complex multi-step design iterations. Best for high-stakes design decisions.
*   **Claude 3 Haiku:** For quick, lightweight tasks like comment classification, simple responses, and rapid prototyping. Most cost-effective for high-volume tasks.
*   **Gemini 2.0 Flash:** For fast, multi-modal analysis of images and floor plans. Ideal for real-time feedback and rapid design iteration. Best for speed-critical tasks.
*   **Gemini 1.5 Pro:** For detailed image analysis, understanding complex spatial layouts, and comprehensive visual understanding. Best when visual accuracy is paramount.
*   **Gemini 1.5 Flash:** For rapid processing of social media comments, quick sentiment analysis, and simple queries. Most cost-effective for real-time social media management.

### 8.2. API Key Management & Security

API keys for both Claude and Gemini will be securely managed within the application:

**Storage & Security:**

*   API keys will be stored in Supabase's encrypted `secrets` table with encryption at rest and in transit.
*   Keys will be accessed via environment variables in the Fastify backend, never exposed to the frontend or in logs.
*   Each API key will be associated with a specific model provider and tracked for usage and billing.
*   Supabase Row-Level Security (RLS) policies will ensure that only authorized admin users can view or modify API keys.
*   API key rotation will be supported, allowing administrators to update keys without downtime.

**Configuration in Admin Dashboard:**

An admin-only settings page (ADM-10) will allow authorized team members to:

*   Add, update, or revoke API keys for Claude and Gemini.
*   View real-time usage statistics and costs for each model.
*   Set spending limits and receive alerts when spending exceeds predefined thresholds.
*   Configure default models for different tasks (e.g., "Use Claude 3.5 Sonnet for rendering, Gemini Flash for social media").
*   Set fallback models in case a primary model's API is unavailable.
*   View API response times and error rates for performance monitoring.

**Backend Implementation:**

The Fastify backend will include a dedicated AI orchestration module that:

*   Manages API key retrieval from Supabase secrets.
*   Routes requests to the selected Claude or Gemini API.
*   Implements retry logic and circuit breakers for reliability.
*   Tracks usage (tokens, requests) for billing and cost optimization.
*   Logs all API interactions for audit and debugging purposes.
*   Implements request queuing for handling high-volume scenarios.

### 8.3. AI 3D Rendering Agent

The AI 3D Rendering Agent is a cornerstone feature of the admin dashboard, designed to provide a significant competitive advantage. It will empower Moha Interiors' designers to rapidly create and iterate on design concepts, transforming 2D images or floor plans into immersive 3D visualizations.

#### 8.3.1. User Flow

1.  **Initiate Rendering:** The designer navigates to the "AI Rendering Agent" section in the admin dashboard.
2.  **Select AI Model:** A dropdown menu displays available Claude and Gemini models. The designer selects the preferred model based on their needs (e.g., Claude for detailed reasoning, Gemini for speed).
3.  **Upload Source:** The designer uploads a source file, which can be a 2D floor plan, a photograph of an existing space, or a hand-drawn sketch.
4.  **Define Parameters:** The designer uses a combination of text prompts and structured inputs to define the desired output:
    *   **Style Prompt:** "A modern, minimalist living room with Scandinavian influences."
    *   **Furnishing:** Select from a library of furniture types (e.g., "L-shaped sofa," "marble coffee table," "pendant lighting").
    *   **Decorations:** Specify decor elements (e.g., "abstract art," "potted plants," "wool rug").
    *   **Wall & Ceiling:** Define wall colors, textures (e.g., "exposed brick"), and ceiling designs (e.g., "tray ceiling," "wood beams").
    *   **Flooring:** Specify flooring materials (e.g., "oak hardwood," "marble tiles").
    *   **Exterior Elements:** For relevant projects, specify roofing materials or terrace layouts.
    *   **Lighting:** Define lighting preferences (e.g., "warm ambient lighting," "natural daylight").
5.  **Generate & Refine:** The designer submits the request to the selected AI model. The model processes the inputs and generates detailed 3D rendering instructions. The designer can then refine the model with further prompts (e.g., "change the sofa color to navy blue," "add more natural light," "replace the rug with a different pattern").
6.  **Real-Time Preview:** As the AI generates the 3D model, a real-time preview is displayed using Three.js/React Three Fiber, allowing the designer to see changes as they happen.
7.  **Export & Share:** The final 3D rendering can be saved to the project database, exported as high-resolution images (4K), video walkthroughs, or interactive 3D models, and shared with the client.

#### 8.3.2. Rendering Capabilities

The AI agent must be capable of generating and modifying the following elements within a 3D scene:

| Category | Specific Capabilities |
| :--- | :--- |
| **Furnishings** | Place and style furniture (sofas, tables, chairs, beds, desks), lighting fixtures, and cabinetry. Support for custom dimensions and materials. |
| **Decorations** | Add decorative items such as rugs, curtains, artwork, plants, sculptures, and accessories. Position and scale items accurately. |
| **Walls & Ceiling** | Apply paint colors, wallpapers, and textures. Generate architectural details like moldings, wainscoting, and custom ceiling designs (tray ceilings, coffered ceilings, etc.). |
| **Flooring** | Render different flooring materials such as hardwood, tile, carpet, concrete, and stone. Support for patterns and finishes. |
| **Lighting** | Generate realistic lighting scenarios with various light sources (ambient, task, accent). Support for different color temperatures and intensities. |
| **Exterior (Optional)** | For projects involving outdoor spaces, render roofing materials, terrace layouts, outdoor furniture, landscaping, and water features. |

#### 8.3.3. Technical Implementation

*   **Backend AI Module:** A dedicated Fastify module will handle communication with Claude and Gemini APIs. It will support streaming responses for real-time feedback to the designer.
*   **Prompt Engineering:** Carefully crafted system prompts will guide the AI models to generate detailed, structured instructions for 3D scene generation. Separate prompts will be optimized for Claude and Gemini to leverage their respective strengths.
*   **3D Rendering Pipeline:** The AI-generated instructions will be processed by a 3D rendering engine. The pipeline will:
    *   Parse AI-generated JSON instructions describing the scene.
    *   Generate Three.js scene objects based on the instructions.
    *   Apply materials, textures, and lighting.
    *   Render the scene in real-time in the browser.
    *   Support export to high-resolution images and video.
*   **Frontend UI:** The frontend will provide the user interface for uploading files, selecting models, inputting prompts, and displaying the 3D model using **React Three Fiber**. The UI will include:
    *   File upload area with drag-and-drop support.
    *   Model selection dropdown (Claude vs. Gemini).
    *   Structured parameter inputs (style, furnishings, decorations, etc.).
    *   Real-time 3D preview with interactive camera controls.
    *   Refinement prompt input with AI-assisted suggestions.
    *   Export options (images, video, 3D model).
*   **Storage:** Generated 3D models and renderings will be stored in Supabase Storage, with metadata saved in the PostgreSQL database. This allows for version history and client sharing.

#### 8.3.4. Model-Specific Advantages

**Claude (Anthropic):**

*   Superior reasoning for complex design requirements and spatial relationships.
*   Excellent at understanding architectural constraints and building codes.
*   Better at generating detailed, nuanced design narratives and justifications.
*   Ideal for clients who need comprehensive design explanations.
*   Better at handling ambiguous or complex design briefs.

**Gemini (Google):**

*   Faster response times for quick iterations and real-time feedback.
*   Superior multi-modal understanding of images and floor plans.
*   Better at recognizing existing architectural styles and elements.
*   Ideal for rapid prototyping and real-time design feedback.
*   Better at processing multiple images simultaneously for comparative analysis.

### 8.4. Other Agentic Tasks Using AI Models

Beyond 3D rendering, the AI models will power several other intelligent features:

**Social Media Response Generation:**

*   When responding to client inquiries on Instagram or TikTok, the team can use an AI-assisted response generator powered by Claude or Gemini (selectable via dropdown).
*   The AI will draft professional, brand-aligned responses that can be edited and sent by the team member.
*   Model selection allows for different tones: Claude for detailed, thoughtful responses; Gemini for quick, casual replies.
*   Response templates can be customized to match Moha Interiors' brand voice.

**Content Analysis & Insights:**

*   The AI will analyze social media comments and DMs to extract sentiment, identify common questions, and suggest content topics.
*   Claude's reasoning capabilities are ideal for nuanced sentiment analysis and trend identification.
*   Gemini's speed makes it suitable for real-time comment classification and urgency detection.
*   Results are displayed in a dashboard with actionable recommendations.

**Blog & Portfolio Content Generation:**

*   AI models can assist in generating blog post outlines, project descriptions, and SEO-optimized content.
*   Claude excels at long-form, narrative content with depth and nuance.
*   Gemini is better for quick summaries, bullet-point content, and rapid ideation.
*   Content generated by AI can be edited and refined by the team before publication.

**Lead Qualification & Scoring:**

*   The AI will analyze incoming client inquiries to assess lead quality and suggest next steps.
*   Claude provides detailed analysis and personalized recommendations.
*   Gemini offers quick scoring and instant prioritization.
*   Leads are automatically categorized (e.g., "Hot Lead," "Warm Lead," "Follow-up Required").

**Email & Message Drafting:**

*   AI-assisted drafting of professional emails and messages to clients.
*   Tone and style can be customized (formal, friendly, technical, etc.).
*   Both models support this, with Claude for complex communications and Gemini for quick replies.

---

## 9. Social Media Integration

This integration is designed to dramatically improve social media workflow efficiency by centralizing communication and analytics from both Instagram and TikTok into a single, unified interface within the admin dashboard.

### 9.1. Unified Inbox

The core of the integration is a unified inbox that aggregates interactions from all connected social profiles.

*   **Supported Platforms:** Instagram, TikTok.
*   **Content Types:**
    *   **Comments:** On posts and Reels (Instagram) and videos (TikTok).
    *   **Direct Messages (DMs):** Private conversations from both platforms.
    *   **Mentions & Tags:** Notifications when Moha Interiors is mentioned or tagged in other users' content.
*   **Functionality:**
    *   **View & Reply:** Read and respond to all messages and comments directly from the dashboard.
    *   **AI-Assisted Responses:** A button to generate suggested responses using Claude or Gemini (selectable via dropdown). Team members can edit and send these suggestions.
    *   **Assign Conversation:** Assign a conversation to a specific team member (e.g., assign a sales inquiry to a project manager).
    *   **Status Tracking:** Mark conversations as "New," "In Progress," or "Resolved."
    *   **User Context:** View the social media profile of the user who is interacting with the brand.
    *   **Sentiment Analysis:** AI-powered sentiment detection (using Claude or Gemini) to flag urgent or negative inquiries.
    *   **Conversation History:** Full history of interactions with each user across all platforms.

### 9.2. Analytics & Reporting

The dashboard will provide a consolidated view of social media performance, with AI-powered insights.

*   **Key Metrics:**
    *   Follower Growth (over time)
    *   Engagement Rate (per post and overall)
    *   Likes, Comments, Shares, and Saves
    *   Video Views and Watch Time
    *   Audience Demographics (age, gender, location)
    *   Sentiment Trends (powered by AI analysis)
    *   Top-Performing Content (by engagement and reach)
*   **AI-Generated Insights:** The system will use Claude or Gemini to generate actionable insights from the data, such as:
    *   "Your Reels are getting 3x more engagement than carousel posts. Consider increasing Reel production."
    *   "Posting between 6-8 PM generates 40% more engagement. Optimize your posting schedule."
    *   "Audience sentiment is positive. Leverage this momentum with a new campaign."
*   **Reporting:** Generate weekly or monthly performance reports that can be exported as PDFs, including AI-generated recommendations and trend analysis.
*   **Benchmarking:** Compare performance against industry benchmarks and competitors (optional).

### 9.3. API Dependencies & Constraints

*   **Instagram:** Requires the **Instagram Graph API**. This necessitates a Facebook Developer account, a Facebook Page linked to the Instagram Business account, and app review and approval by Meta. Full access to DMs may have limitations based on API policies.
*   **TikTok:** Requires the **TikTok for Business API**. This also requires a developer account and an application process. API capabilities for DMs are more restrictive than Instagram's and may be limited to specific business use cases.
*   **Claude API:** Requires an Anthropic API key. Pricing is based on token usage (input and output tokens). The backend will track usage for billing and cost optimization. Rate limits: 100K tokens per minute for most plans.
*   **Gemini API:** Requires a Google Cloud API key. Pricing varies by model and usage. The backend will track usage for billing and cost optimization. Rate limits vary by model and plan.
*   **Data Sync:** The backend will need to periodically fetch data from these APIs and store it in the Supabase database to power the dashboard and analytics. Rate limits and data freshness will be subject to the constraints of the respective APIs. A background job will sync data every 15 minutes for real-time updates.

---

## 10. Non-Functional Requirements

These requirements define the system's quality attributes and are critical for ensuring a professional, enterprise-grade application.

| Category | Requirement | Details |
| :--- | :--- | :--- |
| **Performance** | **Sub-1.5s Page Loads:** All public-facing pages must achieve a First Contentful Paint (FCP) of under 1.5 seconds. The admin dashboard should feel instantaneous. | Achieved through Next.js SSR/SSG, image optimization (WebP), and a global CDN (Vercel). |
| **Scalability** | **Handle Viral Spikes:** The backend and database must be able to handle sudden traffic spikes resulting from viral social media posts without performance degradation. | Achieved through a containerized backend on a serverless platform (e.g., AWS Fargate) and a scalable Supabase database tier. |
| **Security** | **Secure by Design:** All data transmission must be encrypted (HTTPS). The application must be protected against common web vulnerabilities (XSS, CSRF, SQL injection). | Implement standard security headers, use Supabase's Row-Level Security for data access control, and follow secure coding practices. |
| **Usability** | **Intuitive & Accessible:** The UI for both the public site and admin dashboard must be intuitive and easy to navigate. It must also meet WCAG 2.1 AA accessibility standards. | Involves thoughtful UX design, semantic HTML, and ARIA attributes. The use of Radix UI primitives will help ensure accessibility. |
| **Maintainability** | **Clean & Documented Code:** The codebase must be well-structured, modular, and thoroughly documented to facilitate future development and maintenance. | Adhere to industry-standard coding conventions (e.g., Airbnb's JavaScript style guide), use TypeScript for type safety, and maintain a high level of test coverage. |
| **AI Model Reliability** | **Graceful Degradation:** If one AI model's API is unavailable, the system should automatically fall back to the other model or queue the request for later processing. | Implement retry logic, circuit breakers, and fallback mechanisms in the backend AI module. |
| **Cost Control** | **Budget Monitoring:** The system must track API costs for Claude and Gemini and alert administrators when spending exceeds predefined thresholds. | Implement usage tracking and cost estimation in the backend, with dashboards in the admin panel. |

---

## 11. Success Metrics

Product success will be measured against the following key performance indicators (KPIs):

### 11.1. Business Metrics

*   **Lead Generation:** Number of qualified leads generated per month through the website contact form. **Target: 20+ qualified leads/month by Q3.**
*   **Conversion Rate:** Percentage of website visitors who submit a consultation request. **Target: 2.5%**
*   **Operational Efficiency:** Time saved on social media management. **Target: 10+ hours saved per week for the social media team.**
*   **AI Adoption:** Percentage of projects using the AI rendering agent. **Target: 80% by Q2.**

### 11.2. User Engagement Metrics

*   **Website Bounce Rate:** Percentage of visitors who leave after viewing only one page. **Target: < 40%**
*   **Average Time on Page:** Average duration a user spends on portfolio and service pages. **Target: > 2 minutes.**
*   **Admin Dashboard Adoption:** Percentage of the Moha Interiors team actively using the dashboard daily. **Target: 90%**
*   **AI Feature Adoption:** Percentage of rendering tasks using the AI agent. **Target: 80% of projects by Q2.**
*   **AI Response Accuracy:** User satisfaction with AI-generated responses and insights. **Target: 4.5/5 stars.**

### 11.3. Technical Metrics

*   **API Response Time:** Average response time for AI model requests. **Target: < 3 seconds for Claude, < 1 second for Gemini.**
*   **System Uptime:** Platform availability. **Target: 99.9%**
*   **API Cost per Lead:** Cost of AI API usage per generated lead. **Target: < $2 per lead.**

---

## 12. Future Considerations & Roadmap

This initial release lays the foundation for a powerful digital platform. Future iterations could include:

*   **Phase 2+: Client Portal:** A secure portal for clients to log in, view project progress, approve designs, and communicate with the Moha Interiors team.
*   **Phase 2+: E-commerce for Decor:** An e-commerce section on the website to sell curated home decor items and furniture.
*   **Phase 3+: Advanced AI Features:** Enhancing the AI agent to include budget estimations, material sourcing suggestions, and integration with AR (Augmented Reality) for clients to visualize furniture in their own space.
*   **Phase 3+: Multi-language Support:** Adding support for additional languages to cater to a broader international audience.
*   **Phase 3+: Voice Interface:** Adding voice commands for hands-free interaction with the AI rendering agent.
*   **Phase 4+: Mobile App:** Native iOS and Android apps for on-site design consultation and project management.

---

## 13. Appendix: API Integration Details

### 13.1. Claude API Integration

**Endpoint:** `https://api.anthropic.com/v1/messages`

**Authentication:** Bearer token (API key stored in Supabase secrets)

**Example Request:**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4096,
  "messages": [
    {
      "role": "user",
      "content": "Generate a detailed 3D scene description for a modern minimalist living room with Scandinavian influences..."
    }
  ]
}
```

**Streaming Support:** Yes, for real-time feedback to designers.

### 13.2. Gemini API Integration

**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`

**Authentication:** API key (stored in Supabase secrets)

**Example Request:**

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Analyze this floor plan image and suggest furniture placement for a modern living room..."
        }
      ]
    }
  ]
}
```

**Streaming Support:** Yes, for real-time feedback.

---

**END OF DOCUMENT**
