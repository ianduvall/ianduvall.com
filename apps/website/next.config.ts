import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	reactCompiler: true,
	reactStrictMode: true,
	typedRoutes: true,

	experimental: {
		viewTransition: true,
		turbopackFileSystemCacheForDev: true,
	},
};

export default nextConfig;
