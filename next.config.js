/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/shop',
        destination: 'https://www.kentobeans.store/',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
