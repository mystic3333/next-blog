# AGENTS.md — Mystic Blog

## Commands

```bash
npm run dev         # next dev (Turbopack)
npm run dev:clean   # rm -rf .next && next dev  — run when you get stale chunk errors
npm run build       # next build
npm run build:clean # rm -rf .next && next build
npm run lint        # next lint (extends next/core-web-vitals)
```

No tests exist in this repo.

## Architecture

- **Path alias**: `@/*` → `./src/*` (configured in tsconfig paths)
- **Routes** (App Router): `/`, `/blog`, `/blog/[slug]`, `/about`, `/tools`, `/scl-90`, `/auth/callback`
- **API routes**: `/api/comments` (GET/POST), `/api/views` (GET/POST), `/api/revalidate` (POST)
- **Supabase clients**: three separate patterns — `src/lib/supabase/client.ts` (browser), `server.ts` (server components), `admin.ts` (service-role, used by views API)
- `src/proxy.ts` is NOT wired as Next.js middleware (dead file — Supabase session refresh via `updateSession` is not active)
- `src/app/error.tsx` is the built-in Next.js error boundary; `src/components/ErrorBoundary.tsx` is a "use client" class-based component for wrapping client subtrees
- **Dark mode**: `class` strategy — inline script in root layout reads localStorage → `prefers-color-scheme` fallback. Tailwind `darkMode: "class"`
- **Styling**: Tailwind + CSS custom properties (no clsx/twMerge — uses hand-rolled `cn()` in `src/lib/utils.ts`)

## Content

- Blog posts are `.mdx` files in `content/posts/` with gray-matter frontmatter (`title`, `description`, `date`, `tags`, optional `featured`)
- Read via `src/lib/posts.ts` (filesystem, not DB)
- `getAllPosts()` sorts by `featured` first, then date descending

## Supabase

- Schema must be run manually in Supabase SQL Editor: `supabase/schema.sql` creates `comments`, `views` tables and `increment_view` function
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `SALT` and `NEXT_PUBLIC_SITE_URL` in `.env.example` are unused
- Auth: GitHub OAuth via Supabase, callback at `/auth/callback`
- RLS policies: comments readable by anyone, insert requires auth, delete own; views readable by anyone

## Notable

- No test framework, no CI workflows, no commit hooks configured
- No generated code or migrations (schema.sql is a one-shot setup script)
- `tsconfig.json` excludes `"ECC"` directory if present (not currently created)
