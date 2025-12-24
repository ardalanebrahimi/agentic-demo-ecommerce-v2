# E-Commerce Demo Platform

A modern e-commerce platform built with Angular and .NET, demonstrating clean architecture and modular design patterns.

## Tech Stack

- **Frontend**: Angular 19, Angular Material, TypeScript
- **Backend**: .NET 9, ASP.NET Core Minimal APIs, EF Core
- **Database**: PostgreSQL
- **Deployment**: GitHub Pages (frontend), Azure App Service (backend)

## Project Structure

```
├── frontend/          # Angular application
├── backend/           # .NET solution
│   └── src/
│       ├── Modules/   # Feature modules (Catalog, etc.)
│       └── Host/      # API host
└── docs/              # Documentation
```

## Getting Started

### Prerequisites

- Node.js 20+
- .NET 9 SDK
- PostgreSQL (local or Azure)

### Backend Setup

```bash
cd backend

# Update connection string in appsettings.Development.json
# Then run:
dotnet build
dotnet run --project src/Host/WebApi
```

The API will be available at `https://localhost:7001`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:4200`

## API Documentation

Once the backend is running:
- **Scalar UI**: https://localhost:7001/scalar/v1
- **OpenAPI Spec**: https://localhost:7001/openapi/v1.json

## Features (Episode 1)

- Browse products by category
- View product details
- Responsive design with Angular Material

## Architecture

The backend follows **Clean Architecture** with a **Modular Monolith** approach:

- **Domain**: Entities and business logic
- **Application**: DTOs and use cases
- **Infrastructure**: Data access and external services
- **API**: HTTP endpoints

## Documentation

See the `/docs` folder for:
- Product Requirements Document (PRD)
- Architecture Requirements Document (ARD)
- Execution Plan

## License

MIT
