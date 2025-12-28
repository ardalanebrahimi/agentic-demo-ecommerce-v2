# Multi-Agent Orchestrator Command

You are orchestrating a multi-agent development workflow for this e-commerce project.

## Task to Implement

$ARGUMENTS

## Orchestration Workflow

Execute the following phases in order:

### Phase 1: Initialize State Files

Reset the state files for a fresh session:
- Clear `/.agents/state/architect.md`
- Clear `/.agents/state/frontend.md`
- Clear `/.agents/state/backend.md`
- Clear `/.agents/state/sync-status.md`

### Phase 2: Analyze the Task

1. Read the relevant documentation:
   - `/docs/ecommerce-prd-V2.md` - Find relevant user stories
   - `/docs/ecommerce-ARD.md` - Understand architectural constraints
   - `/docs/ecommerce-execution-plan.md` - Check episode scope
   - `/docs/ecommerce-app.tsx` - Visual reference

2. Break down the task into:
   - **Frontend work**: Components, services, routing
   - **Backend work**: Endpoints, entities, DTOs
   - **Shared concerns**: Integration points

### Phase 3: Parallel Development

Launch the specialist agents **in parallel** using the Task tool:

```
┌─────────────────────────────────────────────────────────┐
│  Run these agents IN PARALLEL (single message,          │
│  multiple Task tool calls):                             │
│                                                         │
│  1. frontend-expert - Frontend implementation           │
│  2. backend-expert - Backend implementation             │
│  3. architect - Validate as changes are made            │
└─────────────────────────────────────────────────────────┘
```

Each agent will:
- Implement their portion of the work
- Log progress to their state file
- Note any dependencies or blockers

### Phase 4: Integration (Moderator Loop)

After parallel development completes, invoke the **moderator** agent:

1. Moderator reads all state files
2. Identifies conflicts or integration issues
3. Routes feedback to appropriate expert agents
4. Experts address feedback
5. Repeat until no issues remain

**IMPORTANT**: The moderator handles the feedback loop autonomously - it does NOT ask the user for decisions.

### Phase 5: Quality Assurance

Once moderator reports integration complete, invoke **quality-tester**:

1. Run `dotnet build` on backend
2. Run `npm run build` on frontend
3. Run tests if available
4. Report any failures back to moderator for routing

### Phase 6: Final Review

After QA passes, invoke **code-reviewer**:

1. Review all changes made during this session
2. Check for quality, correctness, and standards compliance
3. Approve or request changes

### Phase 7: Documentation

After review approval, invoke **implementation-documenter**:

1. Create/update relevant documentation
2. Add API documentation for new endpoints
3. Update README if needed

## Execution Rules

1. **Run specialists in parallel** when they have independent work
2. **Moderator loops** until all issues resolved (no user prompts)
3. **State files** are the communication mechanism between agents
4. **Don't skip phases** - each phase must complete before the next
5. **Report progress** after each phase completes

## Final Output

After all phases complete, provide:
1. Summary of what was implemented
2. Files created/modified
3. Any manual steps needed (e.g., running migrations)
4. Verification steps for the user
