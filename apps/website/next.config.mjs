// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		ppr: true,
	},
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
