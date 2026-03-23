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
	headers() {
		return [
			// Prompt API Origin Trial
			{
				source: "/",
				headers: [
					{
						key: "Origin-Trial",
						value:
							"AnUtC3f8dm0x5YMUfecaMcP96eNbaD2alTKIIVCpOC5cJcwYN+wpbBUy/zCNnwL25wBT5tQWUIy+h7+/6FPSXwoAAAB4eyJvcmlnaW4iOiJodHRwczovL3d3dy5pYW5kdXZhbGwuY29tOjQ0MyIsImZlYXR1cmUiOiJBSVByb21wdEFQSU11bHRpbW9kYWxJbnB1dCIsImV4cGlyeSI6MTc4MTU2ODAwMCwiaXNTdWJkb21haW4iOnRydWV9",
					},
				],
			},
		];
	},
};

export default nextConfig;
