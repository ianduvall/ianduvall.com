import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	poweredByHeader: false,
	reactCompiler: true,
	reactStrictMode: true,
	typedRoutes: true,
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
