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
- `/docs/ecommerce-app.tsx` - Visual reference only (React prototype, do NOT copy code)

## Development Commands

### Backend
```bash
cd backend
dotnet build
dotnet run --project src/Host/WebApi
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
