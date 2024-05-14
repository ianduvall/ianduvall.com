import { baseUrl } from "app/sitemap";
import { getAllBlogPostData } from "app/blog/helpers";

export async function GET() {
	const blogPosts = await getAllBlogPostData();

	const itemsXml = blogPosts
		.sort((a, b) => {
			return a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1;
		})
		.map(
			(post) =>
				`<item>
          <title>${post.frontmatter.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.frontmatter.summary || ""}</description>
          <pubDate>${new Date(
						post.frontmatter.publishedAt,
					).toUTCString()}</pubDate>
        </item>`,
		)
		.join("\n");

	const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
