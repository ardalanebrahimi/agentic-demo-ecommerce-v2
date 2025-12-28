# Implement Feature Command

You are tasked with implementing a feature or episode for this e-commerce demo project.

## Context Documents

Before starting, review these essential documents:

1. **Business Requirements**: Read `/docs/ecommerce-prd-V2.md` for complete product requirements, user stories, and acceptance criteria
2. **Architecture Guidelines**: Read `/docs/ecommerce-ARD.md` for technical architecture decisions, patterns, and constraints
3. **UI Prototype Reference**: Read `/docs/ecommerce-app.tsx` as the visual/UX reference (React prototype - use as style guide only, implement in Angular)
4. **Execution Plan**: Read `/docs/ecommerce-execution-plan.md` for episode breakdown and deliverables

## Implementation Request

$ARGUMENTS

## Implementation Workflow

1. **Understand the Scope**: Identify which user stories from the PRD are relevant to this request
2. **Plan the Implementation**: Use EnterPlanMode for non-trivial features to get user approval before coding
3. **Follow Architecture**: Adhere to Clean Architecture and Modular Monolith patterns from the ARD
4. **Match the Style**: Use the prototype (ecommerce-app.tsx) as visual reference, implement with Angular Material
5. **Implement Incrementally**: Break into smaller tasks, track with TodoWrite
6. **Review Code**: After implementation, use the code-reviewer agent
7. **Document**: After review passes, use the implementation-documenter agent

## Key Constraints

- Backend: .NET 9, Minimal APIs, EF Core, PostgreSQL
- Frontend: Angular 19, Standalone components, Angular Material
- No over-engineering - implement only what's requested
- Follow existing patterns in the codebase
