import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	poweredByHeader: false,
	reactCompiler: true,
	reactStrictMode: true,
	typedRoutes: true,

	experimental: {
		viewTransition: true,
		turbopackFileSystemCacheForDev: true,
	},
	headers() {
		return [
			{
				source: "/",
				headers: [
					{
						key: "Origin-Trial",
						value:
							"AkICwQrePfsq4kJB3XCrh9w0gI+YP6ttvF3yt/cq0/lD5i6IV+Qnx0RUnde4g6Wpm32o1MkraEhDJ8Aun9dyIgsAAAB4eyJvcmlnaW4iOiJodHRwczovL3d3dy5pYW5kdXZhbGwuY29tOjQ0MyIsImZlYXR1cmUiOiJBSVByb21wdEFQSU11bHRpbW9kYWxJbnB1dCIsImV4cGlyeSI6MTc3NDMxMDQwMCwiaXNTdWJkb21haW4iOnRydWV9",
					},
				],
			},
		];
	},
	redirects() {
		return [
			{
				source: "/rss.xml",
				destination: "/rss",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
