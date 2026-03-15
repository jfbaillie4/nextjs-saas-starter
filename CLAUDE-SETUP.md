# Claude Code Setup Guide

This project is designed to be used with [Claude Code](https://claude.ai/code) — Anthropic's CLI for AI-assisted development. This guide explains how to configure Claude to work the way this starter was built.

---

## How Claude Code loads instructions

Claude Code reads instructions from `CLAUDE.md` files. It loads them in order from the most general to the most specific:

1. `~/CLAUDE.md` — your **root** file, loaded for every project on your machine. This is where you describe yourself as a developer and set global rules.
2. `<project>/CLAUDE.md` — the **project** file, loaded only for that project. This is where project-specific patterns, commands, and conventions live.

The two files work together. Your root file sets the defaults; the project file adds or overrides for the specific codebase.

---

## Recommended root `~/CLAUDE.md`

Create this file at `~/.claude/CLAUDE.md` or `~/CLAUDE.md`. Adapt it to reflect your own background and preferences.

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the User

[Your name] is a [your experience level] developer. Always work in a way that supports learning:

- Always explain code once it is written or changed — walk through what it does and why it was written that way, including relevant best practices. Never complete a code task without providing this explanation.
- When there are multiple valid approaches, briefly explain the trade-offs so the user can build intuition.
- Prefer clarity over cleverness; avoid patterns that are idiomatic but hard to read without experience.
- Go "one click deeper" when introducing unfamiliar syntax or concepts. The goal is to help the user understand not just the code in front of them but how it fits into the bigger picture.
- After explaining any concept or piece of code, always proactively check whether the user has understood and invite further questions before moving on.

## Code Change Process

When making changes to an existing project, always follow these four steps:

1. **Analyze** — Read the relevant code and form a plan. Understand what exists before touching anything.
2. **Communicate & seek permission** — Explain the plan clearly: what will change, what files will be affected, and why. Wait for approval before writing any code.
3. **Execute** — Make the changes as described in the approved plan. Do not expand scope beyond what was agreed.
4. **Explain** — Walk through the new or changed code. Then update `CHANGES.md` with a dated entry summarising what changed and why. This is mandatory — do not consider a task complete without it.

**If `CHANGES.md` does not exist** in the project root, create it before making any code changes.

## Chosen Tech Stack

Builds multi-tenant B2B SaaS applications with the following stack:

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | Server + client code in one codebase |
| Language | TypeScript | Preferred over plain JS — always use types |
| UI | React + Tailwind CSS + shadcn/ui | shadcn components are copied into `src/components/ui/` |
| Auth + Multi-tenancy | Clerk | Handles users and Organisations (tenants) |
| Database | PostgreSQL via Supabase or Neon | Managed hosting |
| ORM | Prisma | TypeScript-first database queries |
| API | Next.js Server Actions | No separate API layer needed |
| Deployment | Vercel | |

### TypeScript discipline
- Always type function parameters and return values explicitly.
- Use `interface` for object shapes, `type` for unions/aliases.
- Avoid `any` — use `unknown` and narrow the type if the shape is truly unknown.
```

---

## What each section does

**About the User** — tells Claude who it's working with. The more honest and specific you are here, the better Claude calibrates its explanations and suggestions. A senior engineer gets terse, idiomatic answers; a beginner gets step-by-step walkthroughs.

**Code Change Process** — the most important section. It enforces a four-step loop (analyze → communicate → execute → explain) that prevents Claude from making large, unexpected changes. Without this, Claude will sometimes rewrite entire files when you only asked for a small fix.

**Chosen Tech Stack** — tells Claude what tools to reach for when starting new work. Without this, Claude might suggest a different ORM, auth library, or framework depending on context.

---

## The memory system

Claude Code supports a persistent memory system stored in `~/.claude/projects/<project-path>/memory/`. Memory files are loaded into context at the start of each session and allow Claude to remember things across conversations — your preferences, feedback you've given, project decisions, etc.

A useful memory to set up early is `understood_concepts.md` — a list of concepts you've already learned so Claude doesn't re-explain them every time. You can add to it by saying:

> "Mark as understood: [concept name]"

---

## Session start convention

This project uses a session start convention. Beginning a conversation with a greeting (e.g. "morning", "good morning", "start session") triggers a startup checklist:

1. Claude reviews the **Next steps** list in `CLAUDE.md` and asks which to work on
2. Claude adds today's date as a new heading in `CHANGES.md`

This keeps sessions structured and ensures the changelog stays up to date.

---

## Further reading

- [Claude Code documentation](https://docs.anthropic.com/claude-code)
- [CLAUDE.md reference](https://docs.anthropic.com/claude-code/claude-md)
- [Claude Code memory system](https://docs.anthropic.com/claude-code/memory)
