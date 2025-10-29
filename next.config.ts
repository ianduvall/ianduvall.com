import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	poweredByHeader: false,
	reactCompiler: true,
	reactStrictMode: true,
	typedRoutes: true,
	typescript: {
		ignoreBuildErrors: true,
	},

	experimental: {
		viewTransition: true,
		turbopackFileSystemCacheForDev: true,
	},
};

export default nextConfig;
