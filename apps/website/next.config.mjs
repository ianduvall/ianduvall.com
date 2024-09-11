// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		ppr: true,
		pprFallbacks: true,
		reactCompiler: true,
		dynamicIO: true,
	},
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
};

export default nextConfig;
