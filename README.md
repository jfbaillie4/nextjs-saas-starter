# Next.js SaaS Starter

A scaffolding for multi-tenant B2B SaaS applications. Everything is wired up and working — authentication, organisations, database, and a design system — so you can start building features immediately.

---

## What's included

- **Next.js 16** (App Router) — routing, server rendering, and API in one framework
- **Clerk** — authentication and multi-tenancy via Organisations
- **Prisma 7 + PostgreSQL** — type-safe database access, ready for Neon or Supabase
- **Tailwind CSS v4 + shadcn/ui** — design system with Slate palette, Inter font, and 16 core components pre-installed
- **TypeScript** — strict typing throughout
- A **protected dashboard** with persistent sidebar and active nav state
- A **landing page** that adapts based on sign-in state
- A full **org selection flow** — users are always scoped to a tenant before reaching the dashboard

---

## Prerequisites

- Node.js 18+
- Accounts on [Clerk](https://clerk.com), [Neon](https://neon.tech) (or [Supabase](https://supabase.com)), and [Vercel](https://vercel.com)

---

## Setup

### 1. Create your repo from this template

Click **Use this template → Create a new repository** at the top of this page on GitHub. Clone your new repo locally:

```bash
git clone https://github.com/your-username/your-repo-name
cd your-repo-name
npm install
```

### 2. Set up Clerk

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com) and create a new application
2. Under **Configure → Organisations**, enable Organisations (this powers multi-tenancy)
3. Go to **API Keys** and copy your Publishable Key and Secret Key

### 3. Set up your database

**Neon (recommended):**
1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy the connection string from the dashboard (it starts with `postgresql://`)

**Supabase:**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **Settings → Database** and copy the connection string (use the "URI" format)

### 4. Configure environment variables

> **Security warning:** `.env.local.example` is committed to this repo with placeholder values. You **must** copy it to a new file before adding any real secrets. Never put real keys directly into `.env.local.example` — it will be visible to anyone with access to the repository.

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and replace the placeholder values with your Clerk keys and database connection string. The `.env.local` file is gitignored and will never be committed.

### 5. Run database migrations

This creates the `Organisation` and `Member` tables in your database:

```bash
npx prisma migrate dev --name init
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the landing page. Sign up, create an organisation, and you'll land on the dashboard.

---

## Project structure

```
src/
  app/
    page.tsx                        # Public landing page
    layout.tsx                      # Root layout — ClerkProvider + TooltipProvider
    dashboard/
      layout.tsx                    # Dashboard shell — sidebar + top bar
      page.tsx                      # Dashboard home
    sign-in/                        # Clerk sign-in page
    sign-up/                        # Clerk sign-up page
    org-selection/                  # Create or select an organisation
  components/
    dashboard-nav.tsx               # Sidebar nav with active state
    ui/                             # shadcn/ui components
  lib/
    db.ts                           # Prisma client singleton
  proxy.ts                          # Auth middleware — protects /dashboard routes
prisma/
  schema.prisma                     # Database schema
prisma.config.ts                    # Prisma CLI configuration
.env.local.example                  # Environment variable reference
```

---

## Key patterns

**Fetching data** — use Server Components (async functions) and call `db` directly. No API routes needed.

**Auth in Server Components:**
```typescript
const { userId, orgId } = await auth() // from '@clerk/nextjs/server'
```

**Auth in Client Components:**
```typescript
const { userId, orgId } = useAuth() // from '@clerk/nextjs'
```

**Always scope queries to the active org:**
```typescript
const items = await db.item.findMany({
  where: { organisationId: orgId } // never omit this
})
```

**Adding a shadcn component:**
```bash
npx shadcn@latest add [component-name]
```

---

## Deploy to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add your environment variables (same as `.env.local`) under **Environment Variables**
4. Deploy

Vercel will automatically redeploy on every push to `main`.

---

## Using this project with Claude Code

This starter was built with [Claude Code](https://claude.ai/code). See [CLAUDE-SETUP.md](./CLAUDE-SETUP.md) for instructions on configuring Claude to work the same way — including the root `~/CLAUDE.md` setup, the memory system, and the session conventions used during development.

---

## Commands

```bash
npm run dev                                   # Start dev server → localhost:3000
npm run build                                 # Production build
npm run lint                                  # ESLint
npx prisma migrate dev --name <description>   # Apply schema changes
npx prisma studio                             # Visual database browser
```
