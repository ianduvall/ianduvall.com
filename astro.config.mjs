import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://ianduvall.com",
	integrations: [mdx(), sitemap()],
	output: "server",
	adapter: cloudflare(),
});
