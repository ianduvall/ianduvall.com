# repo guide

- use descriptive function and variable names instead of inline comments
- use pnpm instead of npm
- use pnpx instead of npx
- React 19 w/ the React Compiler enabled
- Next.js 16.3 preview w/ cache components, partial prefetching, and Instant Insights enabled
- Tailwind 4

## Next.js agent workflow

- Before changing Next.js code, read the relevant version-matched docs in `node_modules/next/dist/docs/`.
- If `node_modules` is missing, run `pnpm install` first, then read the docs from `node_modules/next/dist/docs/`.
- When a dev server is available, prefer Next DevTools MCP diagnostics such as `get_compilation_issues`, `compile_route`, and `get_errors` over full builds for edit-loop checks.
- After UI or route changes, verify the running page with browser tooling; when available, use `agent-browser` with React DevTools introspection to inspect the component tree, Suspense boundaries, and render behavior.
- For Cache Components work, use the first-party `next-cache-components-adoption` workflow for broad adoption and `next-cache-components-optimizer` for static-shell/instant-navigation improvements. Read the linked Instant Insights error docs before choosing Stream, Cache, or Block fixes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
