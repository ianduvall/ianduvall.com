# Agents

## Project Overview

This is a personal website built with Next.js. The site includes:

- Public blog with MDX support
- Authentication via Clerk
- AI chat interface using Chrome's built-in Prompt API
- React 19 with the React Compiler enabled

## Development Commands

- `pnpm dev` - start development server
- `pnpm build` - build for production
- `pnpm typecheck` - run type checker
- `pnpm lint` - run linter
- `pnpm lint:fix` - auto-fix linting issues
- `pnpm format` - format code
- `pnpm format:check` - check for code formatting violations

## Architecture

### Route Groups

The app uses Next.js route groups for organization:

- `(public)/` - Public pages (home, blog, RSS, sitemap, OG images)
- `(auth)/` - Auth layout
- `(auth)/(required)/` - Protected pages requiring authentication (chat)

### Authentication

- Clerk is used for authentication
- `(auth)/layout.tsx` wraps routes
- `(auth)/(required)/layout.tsx` checks authentication and redirects to sign-in if needed
- Public routes have their own layout in `(public)/layout.tsx` with Nav and Footer

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

### Environment Variables

Build requires:

- `POSTGRES_*` - Database credentials
- `CLERK_*` - Authentication keys

Environment files:

- `.env.local` (root)
- git ignored

## Deployment

Deployed on Vercel
