# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Multi-tenant B2B SaaS starter. See the root `~/CLAUDE.md` for the full stack reference and TypeScript rules.

Initial run procedure for Claude Code: this project is created from a github template. The first time it loads Claude Code should review the full README.md, CLAUDE-SETUP.md and CLAUDE.md and use that context to collaborate with the user to make any updates to the Next Steps as appropriate. IMPORTANT RULE 1: ask the user if they'd like to do this even if they have suggested a different first action via their initial chat, this rule is needed because Claude reviews Claude.md after the first user message not not on initial load. IMPORTANT RULE 2: Once that is done delete this intiial run procedure for Claude Code from CLAUDE.md so it doesn't run on future starts. Once the deletion is completed use the opportunity to remind the user how to use this project in future starts, including the welcome message convention, the ability to review Changes.md at the end of each day to learn about how the app is evolving and updating the next steps list to ensure there's an evergreen list of upcoming improvements. 

## Git workflow

Prompt the user to commit and push at these moments:
- After each self-contained change is complete and explained
- Before starting any risky or experimental change
- At the end of every session

Suggested commit message format: short, active voice, e.g. "add dashboard sidebar" or "fix org redirect logic".

## Commands

```bash
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx prisma studio    # Visual database browser
npx prisma migrate dev --name <description>  # Apply schema changes
```

## Structure

```
src/
  app/
    page.tsx              # Public landing page
    layout.tsx            # Root layout — ClerkProvider lives here
    dashboard/            # Protected routes (gated by proxy.ts)
  components/
    dashboard-nav.tsx     # Sidebar nav with active state — add new nav items here
    ui/                   # shadcn/ui components (auto-generated, don't edit)
  lib/
    db.ts                 # Prisma client singleton — import { db } from '@/lib/db'
  proxy.ts                # Clerk auth — defines which routes are protected
prisma/
  schema.prisma           # Database schema — edit here, then run migrate
.env.local               # Secret keys — never commit this file
```

## Design system

**Figma kit:** [@shadcn/ui - Design System (Community)](https://www.figma.com/design/vN5pN9s5g7QlxLTVIkbbZq/) — Slate palette, Inter font. This is the design source of truth.

**Adding components:** Before using any shadcn component in code, check if it's already in `src/components/ui/`. If not, install it first:
```bash
npx shadcn@latest add [component-name]
```
The full component list is at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components). Always install before importing — never import a component that hasn't been added.

**Icons:** Use `lucide-react`. Browse the full set at [lucide.dev](https://lucide.dev).

## Key patterns

**Fetching data:** Prefer Server Components (async functions) over client-side fetching. Call `db` directly — no API route needed.

**Auth in Server Components:** Use `const { userId, orgId } = await auth()` from `@clerk/nextjs/server`.

**Auth in Client Components:** Use `const { userId, orgId } = useAuth()` from `@clerk/nextjs`.

**Multi-tenancy:** Always scope database queries to `orgId` so tenants cannot see each other's data.

## Performance

### Target

No page or component should take more than **500ms** to load. This applies to both server response time and client-side rendering.

### Default architectural decisions

Apply these automatically when writing code — no need to ask first:

- **Server Components by default.** Only use Client Components (`"use client"`) when interactivity is required (e.g. forms, hover states). Server Components send no JavaScript to the browser and fetch data before the page renders.
- **Fetch only what you need.** Use Prisma `select` to retrieve only the fields a component actually uses — never fetch entire rows speculatively.
- **Paginate all lists from day one.** Never fetch an unbounded list of records. Default page size: 20 items.
- **Add database indexes alongside queries.** Every time a `where` clause is added to a Prisma query, check whether the filtered field has an index in `schema.prisma`. If not, add one in the same change.
- **Fetch data once at the top of a page.** Avoid patterns where child components each trigger their own queries — pass data down as props instead.
- **Always use `<Image>` from `next/image`, never `<img>`.**
- **Keep `"use client"` at the leaf level.** Push `"use client"` as far down the tree as possible — ideally only on the specific element that needs interactivity.
- **Use Prisma `include` for related data — never fetch in a loop.**

### Decisions that require discussion first

- **Pagination design** — page size, numbered pages vs. infinite scroll
- **What data is shown up-front vs. loaded on demand**
- **Loading state design** — skeletons, spinners, and empty states
- **Caching strategy** — acceptable staleness window depends on data criticality

### Performance gate — required before any feature is considered done

- [ ] Do Prisma query logs show all queries completing in under ~100ms?
- [ ] Does Lighthouse on `localhost` score green on Performance?
- [ ] Is the page using Server Components for data fetching (not `useEffect` + `fetch`)?
- [ ] Are all list queries paginated?
- [ ] Do any new `where` clauses have a corresponding index in `schema.prisma`?

## Next steps

At the start of each session, remind the user of these and ask which they'd like to work on. Mark items complete as they are done.

Configuration — do these first:
- [ ] Configure Clerk — create app, enable Organisations, copy keys to `.env.local`
- [ ] Configure database — create a Neon project, copy DATABASE_URL to `.env.local`
- [ ] Run initial migration — `npx prisma migrate dev --name init`

Then:
- [ ] Deploy to Vercel — connect repo, add env vars, get a live URL early
- [ ] Decide what to build — define the product, data model, and first feature
- [ ] Set up performance monitoring — Vercel Speed Insights, Sentry, Prisma query logging
- [ ] Add a first real feature — first use of Prisma + performance gate
- [ ] Set up error and loading states — `loading.tsx` and `error.tsx` conventions
