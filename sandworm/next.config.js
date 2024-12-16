/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true, // Set to true for static exports
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'design-authzed.vercel.app',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: false, // Temporarily disable swcMinify
  output: 'export', // Change to 'export' for static site generation
  poweredByHeader: false,
  compress: true,
  generateBuildId: async () => {
    // This ensures each deployment gets a unique build ID
    return `build-${Date.now()}`
  },
  webpack: (config, { isServer }) => {
    // Basic webpack configuration
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    }
    return config
  },
};

module.exports = nextConfig;