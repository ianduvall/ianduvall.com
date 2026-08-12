# repo guide

- use descriptive function and variable names instead of inline comments
- use pnpm instead of npm
- use pnpx instead of npx
- React 19 w/ the React Compiler enabled (Rust port, via `experimental.turbopackRustReactCompiler`)
- Next.js 16.3 w/ cache components, partial prefetching, and Instant Insights enabled
- TypeScript 7 — `next build` type-checks via the project-local `tsc` CLI (`experimental.useTypeScriptCli`, on by default). There is no tsserver or JS compiler API in TS7, so the editor uses its own bundled TypeScript.
- Tailwind 4

## Next.js agent workflow

- Before changing Next.js code, read the relevant version-matched docs in `node_modules/next/dist/docs/`. These are the only authoritative docs — as of 16.3 they ship inside the `next` package and are upgraded with it.
- If `node_modules` is missing, run `pnpm install` first, then read the docs from `node_modules/next/dist/docs/`.
- Blog posts are loaded with `import.meta.glob` (Turbopack-only), backed by the `turbopack.rules["*.mdx"] = { type: "bytes" }` rule in `next.config.ts`. The documented `query: "?raw"` is inert in 16.3 — do not switch to it.
- When a dev server is available, prefer Next DevTools MCP diagnostics such as `get_compilation_issues`, `compile_route`, and `get_errors` over full builds for edit-loop checks.
- After UI or route changes, verify the running page with browser tooling; when available, use `agent-browser` with React DevTools introspection to inspect the component tree, Suspense boundaries, and render behavior.
- For Cache Components work, use the first-party `next-cache-components-adoption` workflow for broad adoption and `next-cache-components-optimizer` for static-shell/instant-navigation improvements. Read the linked Instant Insights error docs before choosing Stream, Cache, or Block fixes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
