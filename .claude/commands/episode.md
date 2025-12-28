# Implement Episode Command

You are orchestrating a multi-agent implementation for a specific episode from the execution plan.

## Episode to Implement

$ARGUMENTS

## Context Documents

Read these documents before starting:

1. `/docs/ecommerce-execution-plan.md` - **Episode definitions and deliverables**
2. `/docs/ecommerce-prd-V2.md` - Business requirements and user stories
3. `/docs/ecommerce-ARD.md` - Architecture decisions and patterns
4. `/docs/ecommerce-app.tsx` - UI/UX prototype reference (style guide only)

## Episode Analysis

1. **Find the Episode**: Locate the specific episode in the execution plan
2. **Extract Deliverables**: List all items that must be delivered
3. **Map User Stories**: Find relevant user stories (C-XX, A-XX) from PRD
4. **Identify Work Split**:
   - Frontend work (components, routes, services)
   - Backend work (endpoints, entities, DTOs, migrations)

## Multi-Agent Workflow

### Phase 1: Initialize
- Clear state files in `/.agents/state/`
- Document episode scope in sync-status.md

### Phase 2: Parallel Development
Launch **in parallel** (single message, multiple Task tool calls):
- **backend-expert**: Implement .NET changes (Domain → Application → Infrastructure → API)
- **frontend-expert**: Implement Angular changes (services → components → routes)
- **architect**: Validate Clean Architecture compliance

### Phase 3: Integration Loop
Invoke **moderator** to:
- Synthesize work from all state files
- Resolve frontend-backend integration issues
- Route feedback to experts autonomously (NOT to user)
- Loop until all issues resolved

### Phase 4: Quality Gate
1. **quality-tester**: Build and test both projects
2. **code-reviewer**: Review all episode changes
3. **implementation-documenter**: Update docs

### Phase 5: Verify Acceptance
Check each item in the episode's acceptance checklist against what was delivered.

## Key Rules

- **Parallel agents**: Run frontend-expert and backend-expert together
- **Moderator loops**: Handles all integration without user prompts
- **Episode scope only**: Don't implement features from other episodes
- **State files**: All agents log to `/.agents/state/`

## Architecture Reminders

- Backend: Clean Architecture layers (Domain → Application → Infrastructure → API)
- Frontend: Standalone components, lazy-loaded routes, services in core/
- Style: Match the prototype aesthetic using Angular Material
