# Mystic Blog

A personal blog built with **Next.js 16**, **Supabase**, **Three.js**, and **Tailwind CSS**.

## Features

- **3D Interactive Background** — Particle field with Three.js + React Three Fiber
- **MDX Blog Posts** — Write content in Markdown with frontmatter metadata
- **Supabase Auth** — GitHub OAuth login
- **Comment System** — Authenticated users can comment on posts
- **View Counter** — Track page views via Supabase
- **Dark Mode** — Toggle between light/dark themes, persisted to localStorage
- **AI Tools Navigation** — Curated directory of AI tools
- **Responsive Design** — Mobile-friendly layout
- **ISR** — On-demand revalidation for updated content

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS 3 |
| Database & Auth | Supabase (PostgreSQL, Auth, Realtime) |
| 3D Graphics | Three.js + @react-three/fiber + @react-three/drei |
| Content | MDX with gray-matter + next-mdx-remote |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier works)
- A GitHub OAuth App

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database Setup

Run `supabase/schema.sql` in Supabase Dashboard → SQL Editor to create:

- `comments` table — stores post comments with RLS
- `views` table — stores page view counts
- `increment_view` function — atomic view counter

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers) → New OAuth App
2. Set Authorization callback URL to `https://your-project.supabase.co/auth/v1/callback`
3. In Supabase Dashboard → Authentication → Providers → GitHub, enable and paste credentials
4. Add `http://localhost:3000/auth/callback` to Supabase → Authentication → URL Configuration → Redirect URLs

### Development

```bash
# Start dev server
npm run dev

# Clean cache and start (run when you get stale chunk errors)
npm run dev:clean
```

### Production Build

```bash
npm run build
npm run build:clean  # with cache cleaning
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with theme + auth providers
│   ├── page.tsx                # Homepage with Three.js background
│   ├── globals.css             # Global styles + dark mode variables
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   ├── about/page.tsx          # About page
│   ├── blog/
│   │   ├── page.tsx            # Blog listing grid
│   │   └── [slug]/page.tsx     # Blog post with MDX + comments
│   ├── tools/page.tsx          # AI tools navigation
│   ├── auth/callback/route.ts  # GitHub OAuth callback
│   └── api/
│       ├── comments/route.ts   # Comment CRUD API
│       ├── views/route.ts      # View counter API
│       └── revalidate/route.ts # On-demand revalidation
├── components/
│   ├── ThreeBackground.tsx      # Three.js particle field
│   ├── ThreeBackgroundWrapper.tsx
│   ├── ThemeProvider.tsx        # Dark mode context
│   ├── SupabaseProvider.tsx     # Auth session context
│   ├── SessionWrapper.tsx       # Server-side session provider
│   ├── Header.tsx              # Nav + theme toggle + auth
│   ├── Footer.tsx
│   ├── BlogCard.tsx            # Post preview card
│   ├── ToolCard.tsx            # AI tool card
│   ├── MDXContent.tsx          # MDX renderer
│   ├── CommentSection.tsx      # Comments list + form
│   └── ViewCounter.tsx         # View tracking (client)
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client
│   │   ├── admin.ts            # Service-role admin client
│   │   └── middleware.ts       # Session refresh proxy
│   ├── posts.ts                # MDX file reader
│   └── utils.ts                # formatDate, cn helper
├── types/index.ts              # TypeScript types
├── proxy.ts                    # Next.js 16 proxy (session refresh)
├── data/ai-tools.json          # AI tools data
└── content/posts/              # MDX blog posts
```

## Writing Posts

Create a `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Post Title"
description: "A short summary"
date: "2026-06-28"
tags: ["nextjs", "react"]
---

Your content here with **Markdown** support.
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run dev:clean` | Clear cache and start dev |
| `npm run build` | Production build |
| `npm run build:clean` | Clear cache and build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
