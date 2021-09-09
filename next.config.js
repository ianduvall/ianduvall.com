// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack: (config, options) => {
    if (options.isServer) {
      require('./lib/rss');
    }

    return config;
  },

  async redirects() {
    return [
      {
        source: '/twitter',
        destination: 'https://twitter.com/ianwmduvall',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/ianduvall',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
