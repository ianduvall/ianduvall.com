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
		instantInsights: {
			validationLevel: "warning",
		},
		turbopackRustReactCompiler: true,
	},
};

export default nextConfig;
