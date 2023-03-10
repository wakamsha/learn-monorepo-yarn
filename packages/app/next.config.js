const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    port: 3000,
  },
  transpilePackages: ['@learn-monorepo-yarn/core'],
  pageExtensions: ['page.tsx'],
  // eslint-disable-next-line @typescript-eslint/require-await
  rewrites: async () => [
    {
      source: '/',
      destination: '/home',
    },
  ],
};

module.exports = nextConfig;
