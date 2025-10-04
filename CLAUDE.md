# Agents

This file provides guidance to coding agents when working with code in this repository.

## Project Overview

This is a pnpm monorepo for ianduvall.com - a personal website built with Next.js. The site includes:

- Public blog with MDX support
- Authentication via Clerk
- AI chat interface using Vercel AI SDK
- React 19 with the React Compiler enabled

## Monorepo Structure

- `apps/website/` - Main Next.js application
- `packages/tsconfig/` - Shared TypeScript configurations
- Uses pnpm workspaces with Turbo for builds

## Development Commands

- `pnpm dev`
- `pnpm build`
- `pnpm typecheck`
- `pnpm lint`

## Architecture

### Route Groups

The app uses Next.js route groups for organization:

- `(public)/` - Public pages (home, blog, RSS, sitemap, OG images)
- `(auth)/` - Auth pages (sign-in)
- `(auth)/(required)/` - Protected pages requiring authentication (chat)

### Authentication

Clerk middleware in `src/middleware.ts` handles authentication. Public routes are explicitly listed; all others require auth.

### Blog System

- Blog posts stored as MDX files in `src/app/(public)/blog/posts/`
- MDX evaluation uses `@mdx-js/mdx` with custom components
- Blog post metadata validated with Zod
- Helpers in `blog/helpers.ts`: `getBlogPostSlugs()`, `compileBlogPostMDXFromSlug()`, `getAllBlogPostData()`
- Custom MDX components include syntax highlighting via `sugar-high`, custom headings with anchors, and styled blockquotes

### AI Chat

- Protected chat interface at `/chat`
- API route at `/api/chat/route.ts` uses Vercel AI SDK with OpenAI
- Streaming text responses with `streamText()`
- Auth check wrapper for API routes

### Styling

- Tailwind CSS v4 (using `@tailwindcss/postcss`)
- Global styles in `app/global.css`

### Build Configuration

- React Compiler enabled in `next.config.ts`
- TypeScript and ESLint errors ignored during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`)
- Turbopack used for both dev and build

### Environment Variables

Build requires:

- `POSTGRES_*` - Database credentials
- `CLERK_*` - Clerk authentication keys

Environment files:

- `.env.local` (root and `apps/website/`)
- git ignored

## Deployment

Deployed on Vercel. Build command configured in `vercel.json`:
