# Implement Feature Command

You are orchestrating a multi-agent implementation for this e-commerce demo project.

## Implementation Request

$ARGUMENTS

## Context Documents

Before starting, review these essential documents:

1. **Business Requirements**: `/docs/ecommerce-prd-V2.md` - User stories and acceptance criteria
2. **Architecture Guidelines**: `/docs/ecommerce-ARD.md` - Technical decisions and constraints
3. **UI Prototype Reference**: `/docs/ecommerce-app.tsx` - Visual style guide (implement in Angular)
4. **Execution Plan**: `/docs/ecommerce-execution-plan.md` - Episode breakdown

## Multi-Agent Workflow

### Phase 1: Task Analysis
1. Break down the task into frontend and backend work
2. Identify integration points between them
3. Initialize state files in `/.agents/state/`

### Phase 2: Parallel Development
Launch these agents **in parallel** (single message, multiple Task tool calls):
- **frontend-expert**: Implement Angular components/services
- **backend-expert**: Implement .NET endpoints/entities
- **architect**: Validate against ARD as changes are made

### Phase 3: Integration Loop
Invoke **moderator** agent to:
- Read all state files
- Identify conflicts/issues
- Route feedback to experts (NOT to user)
- Repeat until resolved

### Phase 4: Quality & Review
1. **quality-tester**: Run builds and tests
2. **code-reviewer**: Final code review
3. **implementation-documenter**: Update docs

## Key Rules

- **Parallel execution**: Run independent agents together
- **Moderator loops**: Handles feedback autonomously
- **State files**: Agents communicate via `/.agents/state/`
- **No over-engineering**: Implement only what's requested

## Constraints

- Backend: .NET 9, Minimal APIs, EF Core, PostgreSQL
- Frontend: Angular 19, Standalone components, Angular Material
- Follow Clean Architecture and existing codebase patterns
