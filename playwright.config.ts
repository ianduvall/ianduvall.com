import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	// instant() guards are deterministic; retries would mask regressions.
	retries: 0,
	reporter: "list",
	use: {
		baseURL,
		trace: "retain-on-failure",
	},
	projects: [
		{ name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
	],
	webServer: {
		// Build and start in one command, both with EXPOSE_TESTING_API=1. The two
		// halves of the instant() lock are gated at different times — the client
		// soft-nav lock is compiled into the browser bundle at build time, the
		// server-side document lock is a runtime config check at start time — so
		// building here is what guarantees the measured artifact is fresh AND both
		// halves engage. See instant-nav.rig.md.
		command: `EXPOSE_TESTING_API=1 pnpm build && EXPOSE_TESTING_API=1 pnpm start --port ${port}`,
		url: baseURL,
		// Never adopt a process already on the port: it may serve a stale build or
		// one started without the testing API. A held port must fail loudly.
		reuseExistingServer: false,
		timeout: 180_000,
	},
});
