/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  experimental: {
    optimizeCss: true
  }
};

module.exports = nextConfig;