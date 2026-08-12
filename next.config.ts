import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	poweredByHeader: false,
	reactCompiler: true,
	reactStrictMode: true,
	typedRoutes: true,
	turbopack: {
		rules: {
			"*.mdx": {
				type: "bytes",
			},
		},
	},
	experimental: {
		// Exposes the instant-navigation testing API (used by @next/playwright's
		// instant() lock) in production builds. Must never be true for real
		// production deploys — see instant-nav.rig.md.
		exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === "1",
		instantInsights: {
			validationLevel: "warning",
		},
		turbopackRustReactCompiler: true,
	},
};

export default nextConfig;
