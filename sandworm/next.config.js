/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    domains: ['design-authzed.vercel.app']
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
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://design-authzed.vercel.app' : ''
};

module.exports = nextConfig;