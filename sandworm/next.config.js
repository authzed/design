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
  swcMinify: false, // Temporarily disable swcMinify
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  webpack: (config, { isServer }) => {
    // Increase chunk loading timeout
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    }
    return config
  },
};

module.exports = nextConfig;