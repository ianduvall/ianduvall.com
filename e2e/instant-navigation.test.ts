import { instant } from "@next/playwright";
import { expect, test, type Page } from "@playwright/test";

// Blog post titles change as posts are published, so list markers select by
// href prefix instead of title text. The per-post specs pin the stable slug
// `react-use-hook` (file name, not display title).
const anyBlogPostLink = (page: Page) =>
	page.locator('a[href^="/blog/"]').filter({ visible: true }).first();

const blogListHeading = (page: Page) =>
	page.getByRole("heading", { level: 1, name: "Notes, thoughts, and more" });

// Post markers are scoped to the article's header section so a future post
// whose MDX body renders an h1 or <time> cannot trip Playwright strict mode.
const postHeading = (page: Page) => page.locator("article > section h1");

const postDate = (page: Page) => page.locator("article > section time");

const homeHeading = (page: Page) => page.getByRole("heading", { level: 1, name: /Ian Duvall/ });

// The gate dialog wraps every state of the language-model gate, so it is the
// one chat marker that does not depend on whether the browser running the
// suite exposes Chrome's built-in AI.
const chatGateDialog = (page: Page) => page.getByRole("dialog");

const navLink = (page: Page, name: string) => page.getByRole("link", { name, exact: true });

test.describe("initial load (hard navigation)", () => {
	test("home serves its full content in the static shell", async ({ page, baseURL }) => {
		await instant(
			page,
			async () => {
				await page.goto("/");
				await expect(homeHeading(page)).toBeVisible();
				await expect(anyBlogPostLink(page)).toBeVisible();
			},
			{ baseURL: baseURL as string },
		);
	});

	test("blog list serves its full content in the static shell", async ({ page, baseURL }) => {
		await instant(
			page,
			async () => {
				await page.goto("/blog");
				await expect(blogListHeading(page)).toBeVisible();
				await expect(anyBlogPostLink(page)).toBeVisible();
			},
			{ baseURL: baseURL as string },
		);
	});

	test("blog post serves its full content in the static shell", async ({ page, baseURL }) => {
		await instant(
			page,
			async () => {
				await page.goto("/blog/react-use-hook");
				await expect(postHeading(page)).toContainText("use");
				await expect(postDate(page)).toBeVisible();
			},
			{ baseURL: baseURL as string },
		);
	});

	// `/chat` is a Client Component page, so it cannot carry `export const
	// instant` and is never covered by Instant Insights validation. Its static
	// shell is the gate dialog rendered from the gate's initial state, and only
	// this spec proves that shell is prerendered rather than client-rendered
	// after hydration.
	test("chat serves its gate dialog in the static shell", async ({ page, baseURL }) => {
		await instant(
			page,
			async () => {
				await page.goto("/chat");
				await expect(chatGateDialog(page)).toBeVisible();
			},
			{ baseURL: baseURL as string },
		);
	});

	// The 404 UI is the one genuinely request-time piece of UI on the site, so
	// this spec doubles as a standing guard for the SERVER-side half of the
	// instant() lock (document requests on hard loads): if the running server
	// ignored the testing cookie, the 404 heading would already be present under
	// the lock and toHaveCount(0) would fail. The CLIENT-side soft-nav lock is
	// compiled into the browser bundle at build time and has no equivalent
	// per-spec guard; the Playwright webServer command closes that hole by
	// always building with EXPOSE_TESTING_API=1 itself.
	test("unknown blog slug serves the loading skeleton shell, 404 streams in", async ({
		page,
		baseURL,
	}) => {
		const notFoundHeading = page.getByRole("heading", { level: 1, name: /404/ });
		await instant(
			page,
			async () => {
				await page.goto("/blog/this-slug-does-not-exist");
				await expect(page.locator("article")).toBeVisible();
				await expect(notFoundHeading).toHaveCount(0);
			},
			{ baseURL: baseURL as string },
		);

		await page.reload();
		await expect(notFoundHeading).toBeVisible();
	});
});

test.describe("client-side navigation (soft navigation)", () => {
	test("home -> blog list commits instantly", async ({ page }) => {
		await page.goto("/");
		const trigger = navLink(page, "blog");
		await expect(trigger).toBeVisible();

		await instant(page, async () => {
			await trigger.click();
			await page.waitForURL((url) => url.pathname === "/blog");
			await expect(blogListHeading(page)).toBeVisible();
			await expect(anyBlogPostLink(page)).toBeVisible();
		});
	});

	test("blog list -> blog post commits the full post instantly", async ({ page }) => {
		await page.goto("/blog");
		const trigger = page.locator('a[href="/blog/react-use-hook"]');
		await expect(trigger).toBeVisible();

		await instant(page, async () => {
			await trigger.click();
			await page.waitForURL((url) => url.pathname === "/blog/react-use-hook");
			await expect(postHeading(page)).toContainText("use");
			await expect(postDate(page)).toBeVisible();
		});
	});

	test("home -> recent blog post commits the full post instantly", async ({ page }) => {
		await page.goto("/");
		const trigger = anyBlogPostLink(page);
		await expect(trigger).toBeVisible();

		await instant(page, async () => {
			await trigger.click();
			await page.waitForURL((url) => url.pathname.startsWith("/blog/"));
			await expect(postHeading(page)).toBeVisible();
			await expect(postDate(page)).toBeVisible();
		});
	});

	test("blog post -> blog list commits instantly", async ({ page }) => {
		await page.goto("/blog/react-use-hook");
		const trigger = navLink(page, "blog");
		await expect(trigger).toBeVisible();

		await instant(page, async () => {
			await trigger.click();
			await page.waitForURL((url) => url.pathname === "/blog");
			await expect(blogListHeading(page)).toBeVisible();
			await expect(anyBlogPostLink(page)).toBeVisible();
		});
	});

	test("blog list -> home commits instantly", async ({ page }) => {
		await page.goto("/blog");
		const trigger = navLink(page, "home");
		await expect(trigger).toBeVisible();

		await instant(page, async () => {
			await trigger.click();
			await page.waitForURL((url) => url.pathname === "/");
			await expect(homeHeading(page)).toBeVisible();
			await expect(anyBlogPostLink(page)).toBeVisible();
		});
	});

	test("blog post -> home commits instantly", async ({ page }) => {
		await page.goto("/blog/react-use-hook");
		const trigger = navLink(page, "home");
		await expect(trigger).toBeVisible();

		await instant(page, async () => {
			await trigger.click();
			await page.waitForURL((url) => url.pathname === "/");
			await expect(homeHeading(page)).toBeVisible();
			await expect(anyBlogPostLink(page)).toBeVisible();
		});
	});

	// `/chat` sits outside the (public) route group, so every one of these
	// navigations tears down the shared nav-and-footer layout. Each public route
	// is covered because the divergence point is the root layout, not the
	// (public) layout the sources share.
	const publicRoutesLinkingToChat = [
		{ label: "home", path: "/" },
		{ label: "blog list", path: "/blog" },
		{ label: "blog post", path: "/blog/react-use-hook" },
	];

	for (const source of publicRoutesLinkingToChat) {
		test(`${source.label} -> chat commits the client page instantly`, async ({ page }) => {
			await page.goto(source.path);
			const trigger = navLink(page, "chat");
			await expect(trigger).toBeVisible();

			await instant(page, async () => {
				await trigger.click();
				await page.waitForURL((url) => url.pathname === "/chat");
				await expect(chatGateDialog(page)).toBeVisible();
			});
		});
	}
});
