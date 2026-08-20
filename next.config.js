/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/bruen", destination: "/your-rights", permanent: true }];
  },
};
module.exports = nextConfig;
