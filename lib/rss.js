const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Ian Duvall',
    site_url: 'https://ianduvall.com',
    feed_url: 'https://ianduvall.com/feed.xml',
    description: "Recent articles from Ian Duvall's blog.",
  });

  const posts = await fs.readdir(path.join(__dirname, '..', 'posts'));

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(path.join(__dirname, '..', 'posts', name));
      const { data } = matter(content);

      feed.item({
        title: data.title,
        url: 'https://ianduvall.com/blog/' + name.replace(/\.mdx?/, ''),
        date: data.publishedAt,
      });
    })
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
