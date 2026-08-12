# instant-nav rig: ianduvall.com

- BUILD: Playwright's `webServer` produces and serves the measured artifact itself:
  `EXPOSE_TESTING_API=1 pnpm build && EXPOSE_TESTING_API=1 pnpm start --port 3100`.
  Building inside the rig guarantees the artifact is fresh and that the flag is set for
  both halves of the lock (see WALLS). Nothing is ever measured on `next dev`.
- EXPOSE: `experimental.exposeTestingApiInProductionBuild` in `next.config.ts` is wired to
  `process.env.EXPOSE_TESTING_API === "1"`. Only the Playwright `webServer` command sets
  the variable; `pnpm build`, `vercel.json`, and Vercel production deploys never do, so
  the testing API cannot leak into real production.
- RUN: `pnpm e2e` (`playwright test`) against `BASE_URL` (default `http://localhost:3100`,
  overridable via `PORT`/`BASE_URL`). Two projects run every spec: desktop Chrome and a
  Pixel 7 viewport, which covers the shell-matches-both-breakpoints check.
- CI: `.github/workflows/ci.yml` runs the identical command on every push to `main` and
  every pull request, in an `instant-navigation` job that only installs Chromium (both
  projects are Chromium-based) and then calls `pnpm e2e`. The workflow deliberately has no
  build step of its own — the webServer owns the build, so CI cannot drift from the local
  rig. `forbidOnly` is already keyed to `CI`, so a stray `test.only` fails the run. The
  Playwright report and traces upload as an artifact on failure.
- TEST USER: none. The site is fully public — no auth, no cookies, no roles, no plans.
- DRIFT: effectively empty. No feature flags, no per-user data. Content drift only: blog
  posts are MDX files committed to the repo, so tests select post links by
  `a[href^="/blog/"]` rather than by title text, post title/date markers are scoped to
  `article > section` (a post body that renders its own `h1`/`time` cannot trip strict
  mode), and the pinned per-post spec uses the slug `react-use-hook` (stable file name).
- LOOP: fully local and agent-drivable: edit → `pnpm e2e`. The webServer builds before
  serving, so no separate build step exists to forget. `reuseExistingServer` is `false`:
  a process already holding 3100 fails the run loudly and must be stopped — never treat a
  responding stale server as the rig.
- LIVENESS: n/a — the artifact is built by the same command that serves it.
- WALLS:
  - `EXPOSE_TESTING_API=1` gates TWO mechanisms at DIFFERENT times: the client-side
    soft-nav lock is compiled into the browser bundle at BUILD time (a flagless build
    aliases `navigation-testing-lock` to an inert stub), while server-side honoring of
    the `next-instant-navigation-testing` cookie on document requests is a runtime
    config check at START time (`next.config.ts` is re-evaluated when the server boots).
    A mismatch is silent: with a flagless build + flagged start, hard-load specs and the
    404 guard pass genuinely while every soft-nav spec passes vacuously. The webServer
    command building and starting with the flag in one invocation is what makes the
    split impossible. Both halves were hit on first rig bring-up via a synthetic
    blocking route (`connection()` behind Suspense) whose content had to be absent
    under the lock.
  - The 404 spec's `toHaveCount(0)` gated half is a standing guard for the SERVER half
    only (hard loads). There is no per-spec guard for the client half — the site's
    soft-nav destinations are fully static, so nothing exists to gate.
  - Rare flake mode, fails safe: the 404 spec's `page.reload()` after the lock releases
    can race a locked page's async cookie re-write (`@next/playwright` retries deletion
    5×). If that spec alone goes red on the reload assertion, re-run before treating it
    as a regression.
  - `next dev` typically running on 3000 → rig pinned to port 3100.
  - The `next-instant-navigation-testing` cookie is domain-scoped, not port-scoped; a
    Navigation Inspector "Pause on navigations" toggle left on in a dev-server browser
    tab can leak into other localhost apps. Playwright uses isolated browser contexts,
    so the e2e runs are unaffected.
