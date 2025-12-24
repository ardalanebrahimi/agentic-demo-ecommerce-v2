# E-Commerce Demo – Architecture & Requirements Document (ARD)
Version: 0.1 (Episode-driven MVP)  
Date: 2025-12-24  
Owner: Ardalan

## 1. Purpose
This ARD captures **technical architecture decisions** and the **execution approach** for an episode-based “agentic coding” e-commerce demo.
- **PRD** stays product-focused (no architecture / implementation bias).
- **ARD** defines how we build and ship incrementally, starting from the **smallest deployable slice**.

## 2. Guiding Principles
- **Smallest deployable slice first**: always end an episode with something that runs and is deployed.
- **Clean code + Clean Architecture** in both FE/BE.
- **Modular monolith + DDD-ish boundaries from day 1** (even if only one module exists initially).
- **Sync-first**: classic request/response, no eventing, no “fancy” infra.
- **Single environment for now** (one deployed instance).
- **Avoid early non-functional overhead**: logging/monitoring/versioning later.
- **Swagger/OpenAPI required** from the start.

## 3. Scope: Episode 1 (MVP0)
### 3.1 What Episode 1 MUST deliver
- Mono-repo with:
  - **Angular (latest LTS)** frontend deployed to **GitHub Pages** via **GitHub Actions**
  - **.NET API** deployed to **Azure App Service** via **GitHub Actions**
  - **Azure Database for PostgreSQL – Flexible Server**
  - **EF Core migrations** applied automatically on deploy (safe strategy below)
- Working UI routes:
  - `/shop` → product list + product details (minimal UI)
  - `/admin` → placeholder route (no functionality in episode 1)
- Data flow:
  - Product list and product details come from **real backend** + real PostgreSQL
- No auth, no payments, no shipping, no blob storage in episode 1
- Images: **placeholder image only** (no upload, no blob)

### 3.2 What Episode 1 explicitly does NOT include
- Authentication/authorization
- Product creation/editing (admin CRUD)
- Orders, cart persistence, checkout, payment, shipping/tax logic
- Blob storage integration
- Observability (App Insights), API versioning

## 4. System Overview
### 4.1 Deployment Topology
- **Frontend**: GitHub Pages (static hosting)
- **Backend**: Azure App Service (Linux), .NET runtime
- **Database**: Azure PostgreSQL Flexible Server
- **CI/CD**: GitHub Actions (two workflows)

### 4.2 Communication
- Frontend calls backend via HTTPS REST API
- CORS enabled for GitHub Pages origin
- Environment-based API base URL set at build time (simple approach below)

## 5. Repository Structure (Mono-repo)
Classic split:
```
/frontend/        # Angular app
/backend/         # .NET solution
/docs/            # PRD, ARD, execution plan, prompts, decisions
```

### 5.1 Frontend structure (Angular)
- Standalone components (Angular modern style)
- Simple routing:
  - `/shop` (list)
  - `/shop/:id` (details)
  - `/admin` placeholder
- UI library: **Angular Material**
- Styling: Material + lightweight global styles (no Tailwind required)

### 5.2 Backend structure (.NET) – Clean Architecture + Modules
Use clean layers AND keep module boundaries:
```
/backend
  /src
    /BuildingBlocks
    /Modules
      /Catalog
        /Catalog.Api
        /Catalog.Application
        /Catalog.Domain
        /Catalog.Infrastructure
    /Host
      /WebApi   # composition root; exposes endpoints and wires modules
```
Episode 1 can start with only **Catalog** module, but keep the scaffolding ready.

## 6. Domain: Episode 1 – Catalog (Read only)
### 6.1 Entities (minimal)
- **Category**
  - Id (UUID)
  - Name
- **Product**
  - Id (UUID)
  - Name
  - Brand
  - PriceAmount (decimal)
  - PriceCurrency (string, e.g. EUR)
  - CategoryId (UUID)
  - ShortDescription (optional)
  - (No variants, no stock, no images; image is frontend placeholder)

### 6.2 API Endpoints (Episode 1)
Base: `/api`
- `GET /api/categories`
- `GET /api/products?categoryId=...` (optional filter)
- `GET /api/products/{id}`

### 6.3 OpenAPI
- Swagger enabled in all environments (episode 1)
- Contract-first is optional; implementation-first is fine, but keep DTOs explicit

## 7. Data & EF Core Migrations
### 7.1 Migration strategy for Episode 1
Goal: agent manages schema evolution.
- Use EF Core migrations inside `/Catalog.Infrastructure`
- Apply migrations in **startup** OR in **deployment step**.

**Recommended (safer) for demos**:
- Apply migrations as part of the **deployment workflow** (before swapping slots; since we have one environment, run once during deploy).
- If doing startup migration: guard with env var `RUN_MIGRATIONS=true` to avoid surprises.

### 7.2 Seed data
- Seed a small set of Categories and Products (10–20 records)
- Seed executed on startup if DB empty (idempotent)

## 8. CI/CD
### 8.1 Frontend workflow: GitHub Pages
- Trigger: push to `main` affecting `/frontend/**`
- Steps:
  - install
  - build (base-href configured for GH Pages)
  - publish to `gh-pages` branch or GitHub Pages artifact deploy
- Output: static site
- Configure Angular routing fallback (hash-based routing is simplest for GH Pages):
  - Use `HashLocationStrategy` for episode 1 to avoid 404 refresh issues.

### 8.2 Backend workflow: Azure App Service
- Trigger: push to `main` affecting `/backend/**`
- Steps:
  - dotnet restore/build/test (tests optional episode 1)
  - publish
  - deploy to App Service (zip deploy)
  - run EF migrations step (if chosen) OR set env var for startup migration

### 8.3 Secrets & Config
- GitHub Secrets:
  - `AZURE_WEBAPP_PUBLISH_PROFILE` (simplest) OR service principal credentials
  - `DB_CONNECTION_STRING` (or split secrets: host/user/pass)
- App Service configuration:
  - `ConnectionStrings__CatalogDb`
  - `AllowedOrigins` (GitHub Pages URL)

## 9. Frontend ↔ Backend Configuration
Simple approach for episode 1:
- Frontend has environment config with API base URL
- GitHub Action injects `API_BASE_URL` at build time

## 10. Prototype (React TSX) Usage Rules
A prototype UI exists (React + Tailwind).
**Rules for agents and implementation**:
- Treat it as **visual reference only** (layout, components, UX ideas).
- **Do not copy code/logic**.
- Recreate design approximately using **Angular Material** components.
- Keep architecture clean; prototype is not a technical template.

## 11. Security (Episode 1)
- No auth; public read endpoints only
- Enable HTTPS only
- Minimal CORS allow-list for the GitHub Pages origin

## 12. Risks & Mitigations (Episode 1)
- GitHub Pages routing issues → use hash routing in episode 1.
- CORS misconfig → explicit allow origin.
- Migration failures on deploy → keep migrations small, seed idempotent, and prefer deploy-step migration.
- Overbuilding by agent → strict scope boundaries; episode-based acceptance criteria.

## 13. Definition of Done (Episode 1)
- `main` branch has working mono-repo
- GitHub Actions green:
  - Frontend deployed to GitHub Pages and reachable
  - Backend deployed to Azure App Service and reachable
- Swagger loads and shows Catalog endpoints
- `/shop` renders product list from backend
- Product details page works from backend
- `/admin` route exists with placeholder content
- Postgres contains seeded data via EF migrations

