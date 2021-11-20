// @ts-check

const { withContentlayer } = require('next-contentlayer');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    concurrentFeatures: true,
  },

  swcMinify: true,

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

module.exports = withContentlayer()(nextConfig);
