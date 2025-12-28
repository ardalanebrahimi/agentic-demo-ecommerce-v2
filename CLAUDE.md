# CLAUDE.md

This file provides guidance for Claude Code when working on this e-commerce demo project.

## Project Overview

This is an episode-based e-commerce demo showcasing agentic coding. The project follows a mono-repo structure with Angular frontend and .NET backend.

## Repository Structure

```
/frontend/        # Angular 19 app with Angular Material
/backend/         # .NET 9 solution (Clean Architecture + Modular Monolith)
/docs/            # PRD, ARD, execution plan, prototype reference
```

## Architecture

### Backend (.NET 9)

- **Clean Architecture** with module boundaries
- **Modular Monolith** pattern (one module per bounded context)
- EF Core with PostgreSQL
- Minimal APIs

```
backend/src/
├── BuildingBlocks/           # Shared utilities (future)
├── Modules/
│   └── Catalog/
│       ├── Catalog.Domain/         # Entities, value objects
│       ├── Catalog.Application/    # DTOs, use cases
│       ├── Catalog.Infrastructure/ # EF Core, external services
│       └── Catalog.Api/            # Endpoints
└── Host/
    └── WebApi/               # Composition root
```

### Frontend (Angular 19)

- Standalone components
- Angular Material UI
- Hash-based routing (for GitHub Pages)
- Environment-based API configuration

## Key Conventions

### Backend

- Use **minimal APIs** (not controllers)
- DTOs in Application layer, entities in Domain
- DbContext and migrations in Infrastructure
- Module registration via extension methods
- Connection strings from configuration/environment

### Frontend

- **Standalone components** only
- Lazy-loaded routes
- Services in `core/services/`
- Models in `core/models/`
- Features organized by domain in `features/`

## Episode Scope (Current: Episode 1)

Episode 1 delivers:

- Product catalog (read-only)
- Categories and Products endpoints
- Product list and detail pages
- Admin placeholder route
- No authentication (public APIs)
- Placeholder images only (no blob storage)

## Important Files

- `/docs/ecommerce-prd-V2.md` - Product requirements
- `/docs/ecommerce-ARD.md` - Architecture decisions
- `/docs/ecommerce-execution-plan.md` - Episode breakdown
- `/docs/ecommerce-app.tsx` - **Style reference** (React prototype)

## UI Style Guide

**IMPORTANT**: Always use `/docs/ecommerce-app.tsx` as the style reference for all new features.

The prototype defines the visual language:

- **Colors**: Neutral palette (neutral-900 for primary, neutral-100/50 for backgrounds)
- **Typography**: Clean, semibold headings
- **Borders**: Subtle borders (neutral-100, neutral-200), rounded corners (rounded-xl, rounded-2xl)
- **Cards**: White background, subtle border, hover shadows
- **Buttons**: Primary = neutral-900 (dark), Secondary = neutral-100 (light)
- **Badges**: Contextual colors (emerald for success, amber for warning, red for error)
- **Spacing**: Generous padding (p-4, p-5, p-6), consistent gaps

Recreate the design using **Angular Material** components while maintaining the prototype's aesthetic.

## Development Commands

### Backend

```bash
cd backend
dotnet build
dotnet run --project src/Host/WebApi
dotnet run --project src/Host/WebApi --launch-profile https
```

### Frontend

```bash
cd frontend
npm install
npm start          # Development server
npm run build      # Production build
```

## API Endpoints (Episode 1)

- `GET /api/categories` - List all categories
- `GET /api/products` - List products (optional `?categoryId=`)
- `GET /api/products/{id}` - Get product by ID

## Configuration

### Backend (appsettings)

- `ConnectionStrings:CatalogDb` - PostgreSQL connection
- `AllowedOrigins` - CORS allowed origins array
- `RUN_MIGRATIONS` - Enable/disable auto migrations (default: true)

### Frontend (environments)

- `environment.ts` - Development config
- `environment.prod.ts` - Production config (API URL)

## Deployment

- **Frontend**: GitHub Pages (hash routing)
- **Backend**: Azure App Service
- **Database**: Azure PostgreSQL Flexible Server
- **CI/CD**: GitHub Actions

## Multi-Agent Development Workflow

This project uses a coordinated multi-agent system for development. The workflow ensures quality, consistency, and proper integration across frontend and backend.

### Agent Overview

| Agent                         | Role                                                    | Invocation          |
| ----------------------------- | ------------------------------------------------------- | ------------------- |
| **architect**                 | Validates code against ARD, enforces Clean Architecture | After code changes  |
| **frontend-expert**           | Implements Angular features, follows prototype style    | For UI tasks        |
| **backend-expert**            | Implements .NET APIs, follows DDD patterns              | For API tasks       |
| **moderator**                 | Synthesizes work, resolves conflicts, routes feedback   | After parallel work |
| **quality-tester**            | Runs tests, linting, build checks                       | Before code review  |
| **code-reviewer**             | Reviews code quality and correctness                    | After QA passes     |
| **implementation-documenter** | Creates/updates documentation                           | After review passes |

### Workflow Phases

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: PARALLEL DEVELOPMENT                │
├─────────────────────────────────────────────────────────────────┤
│  Source of Truth: PRD + ARD + Prototype                        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Architect   │  │   Frontend   │  │   Backend    │         │
│  │    Agent     │  │    Expert    │  │    Expert    │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                 │                 │                  │
│         ▼                 ▼                 ▼                  │
│    architect.md      frontend.md      backend.md               │
│                                                                 │
│              └──────────────┴──────────────┘                   │
│                            │                                    │
│                   .agents/state/ (File-Based Sync Hub)         │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: INTEGRATION                         │
├─────────────────────────────────────────────────────────────────┤
│                    ┌──────────────┐                            │
│                    │  Moderator   │◄── Reads all state files   │
│                    │    Agent     │                            │
│                    └──────┬───────┘                            │
│                           │                                     │
│            ┌──────────────┼──────────────┐                     │
│            ▼              ▼              ▼                     │
│     Feedback to    Feedback to    Conflict                     │
│     Frontend       Backend        Resolution                   │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │   Quality    │                            │
│                    │   Tester     │                            │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │    Code      │                            │
│                    │   Reviewer   │                            │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │ Documenter   │                            │
│                    └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### State Files (Local Only - Gitignored)

```
.agents/
└── state/
    ├── architect.md    # Architecture validation logs
    ├── frontend.md     # Frontend implementation progress
    ├── backend.md      # Backend implementation progress
    └── sync-status.md  # Integration status (Moderator maintains)
```

### When to Use Each Agent

1. **Starting a Feature**:

   - Use `/implement` or `/episode` slash command
   - Agents will be orchestrated automatically

2. **Manual Invocation**:
   - `frontend-expert` - Angular component work
   - `backend-expert` - .NET API work
   - `architect` - Validate architecture compliance
   - `moderator` - Synthesize parallel work
   - `quality-tester` - Run all tests
   - `code-reviewer` - Final code review
   - `implementation-documenter` - Create documentation

### Key Behaviors

- **Moderator loops feedback** to expert agents (not to user)
- **State files** track progress and enable coordination
- **Architect validates** all changes against ARD
- **Quality gates** must pass before code review
