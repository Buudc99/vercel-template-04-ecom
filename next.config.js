/** @type {import('next').NextConfig} */
process.removeAllListeners("warning");
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  //   serverComponentsExternalPackages: ['mongoose']
  // },
  // images: {
  //   domains: ['m.media-amazon.com']
  // }
};

module.exports = nextConfig;
