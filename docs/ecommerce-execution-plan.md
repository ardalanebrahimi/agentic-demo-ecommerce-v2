# E-Commerce Demo – Execution Plan (Episode-based)
Version: 0.1  
Date: 2025-12-24  
Target format: multiple 20–30 minute videos, each ending with a shipped increment.

## Episode Strategy
Each episode must end with:
1) Code merged to `main`  
2) CI/CD green  
3) Something demonstrably working in deployed environment

## Episode 1 (20–30 min): “First Deployable Slice”
**Goal:** Deployed Angular + deployed .NET API + Postgres + real product list.

### Deliverables
- Mono-repo skeleton (`/frontend`, `/backend`, `/docs`)
- Angular app:
  - Routes: `/shop`, `/shop/:id`, `/admin` (placeholder)
  - Product list + product detail pages
  - Calls backend REST API
  - Placeholder image for products
- .NET API:
  - Catalog module scaffolded (Clean Architecture + module boundary)
  - Endpoints: categories, products list, product details
  - Swagger enabled
- Azure:
  - App Service (backend)
  - Postgres Flexible Server
- EF Core:
  - Migrations
  - Seed data
- GitHub Actions:
  - `frontend-pages.yml` deploy to GitHub Pages
  - `backend-azure.yml` deploy to Azure App Service (+ optional migration step)

### Acceptance checklist
- Open frontend URL shows product list
- Product details loads from API
- Swagger URL works
- GitHub Actions runs on push and deploys automatically

### Recording format recommendation
- Do NOT compare low-context vs high-context in the same episode.
- Show “high-context” incremental delivery:
  - create skeleton
  - create endpoints
  - hook FE
  - deploy

---

## Episode 2 (20–30 min): “Admin Skeleton + Product Create (No Auth)”
**Goal:** Minimal Admin page to create products (still no auth).
- `/admin/products` list
- `/admin/products/new` create product
- Backend: `POST /api/products`
- Validation basics
- Still placeholder images (no blob yet)

---

## Episode 3 (20–30 min): “Cart MVP (In-memory or DB)”
**Goal:** Add cart to shop.
- Add-to-cart from product list/details
- Cart page
- Decide persistence:
  - Option A: in-memory (per session) for speed
  - Option B: DB (anonymous cart id in local storage)

---

## Episode 4 (20–30 min): “Checkout Placeholder + Order Creation”
**Goal:** Order aggregate MVP, no payment integration.
- “Checkout” page collects minimal fields
- Backend creates Order
- Order confirmation page

---

## Episode 5 (20–30 min): “Authentication v1 (Email/Password)”
**Goal:** Basic identity.
- Admin login
- Protect admin routes
- Backend identity module (separate boundary)
- Keep shop anonymous for now

---

## Episode 6 (20–30 min): “Images v1 (Azure Blob)”
**Goal:** Real image uploads for products.
- Azure Blob storage
- Admin upload UI
- Backend upload endpoint, store blob url
- Product list/details show images

---

## Episode 7+: “Iterative Enhancements”
Pick one per episode:
- Stock + inventory
- Variants
- Search/filter/sort
- Payment provider integration
- Shipping/tax rules
- Observability (App Insights)
- API versioning
- UI polish

## Guardrails for Agents (to prevent video failures)
- Keep episode scope strict (ship > perfection).
- Avoid parallel experiments in two IDE windows.
- One environment, one pipeline path, one success definition.
- If blocked by infra: switch to manual infra setup and continue coding.

