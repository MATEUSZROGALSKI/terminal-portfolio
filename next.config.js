/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  // Disable static generation for dynamic content
  staticPageGenerationTimeout: 0,
  // Ensure all pages are server-side rendered by default
  // This ensures content is always fresh from the database
  experimental: {
    // Prefer server components for dynamic content
    serverComponentsExternalPackages: ['mongodb']
  }
}

module.exports = nextConfig
