import { baseUrl } from "src/app/shared";

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
