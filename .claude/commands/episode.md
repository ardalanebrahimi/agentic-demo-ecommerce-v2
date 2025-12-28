# Implement Episode Command

You are tasked with implementing a specific episode from the e-commerce demo execution plan.

## Context Documents

Read these documents before starting:

1. `/docs/ecommerce-execution-plan.md` - **Episode definitions and deliverables**
2. `/docs/ecommerce-prd-V2.md` - Business requirements and user stories
3. `/docs/ecommerce-ARD.md` - Architecture decisions and patterns
4. `/docs/ecommerce-app.tsx` - UI/UX prototype reference (style guide only)

## Episode to Implement

$ARGUMENTS

## Episode Implementation Checklist

1. **Read the Execution Plan**: Find the specific episode section and understand:
   - Goal statement
   - Deliverables list
   - Acceptance checklist

2. **Map to PRD User Stories**: Identify which user stories (C-XX, A-XX) from the PRD apply to this episode

3. **Plan Before Coding**: Use EnterPlanMode to outline the implementation approach:
   - Backend changes (new endpoints, entities, DTOs)
   - Frontend changes (new components, routes, services)
   - Database changes (migrations, seeds)

4. **Implement in Order**:
   - Backend first (domain, application, infrastructure, API)
   - Frontend second (services, components, routing)
   - Integration testing

5. **Verify Acceptance Criteria**: Check each item in the episode's acceptance checklist

6. **Quality Assurance**:
   - Run the code-reviewer agent after implementation
   - Run the implementation-documenter agent after review passes

## Architecture Reminders

- Backend: Clean Architecture layers (Domain → Application → Infrastructure → API)
- Frontend: Standalone components, lazy-loaded routes, services in core/
- Style: Match the prototype aesthetic using Angular Material
- Scope: Only implement what's listed in the episode - no extras!
