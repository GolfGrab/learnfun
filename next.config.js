const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
})
