import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactCompiler: true,
	reactStrictMode: true,
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
