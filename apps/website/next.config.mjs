// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		ppr: true,
		reactCompiler: true,
	},
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
