import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	poweredByHeader: false,
	reactCompiler: true,
	reactStrictMode: true,
	typedRoutes: true,
	experimental: {
		instantInsights: {
			validationLevel: "warning",
		},
		viewTransition: true,
	},
};

export default nextConfig;
