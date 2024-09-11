import { baseUrl } from "app/sitemap";
import { getAllBlogPostData } from "app/blog/helpers";

const title = "Ian Duvall's Blog";
const description = "An RSS feed of Ian Duvall's blog posts";

export async function GET() {
	const blogPosts = await getAllBlogPostData();
	const itemsXml = blogPosts
		.sort((a, b) => {
			return a.metadata.publishedAt < b.metadata.publishedAt ? 1 : -1;
		})
		.map(
			(post) =>
				`<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(
						post.metadata.publishedAt,
					).toUTCString()}</pubDate>
        </item>`,
		)
		.join("\n");

	const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${title}</title>
        <link>${baseUrl}</link>
        <description>${description}</description>
        ${itemsXml}
    </channel>
  </rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
