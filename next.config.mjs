/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['v0.blob.com'],
  },
  // Add trailing slash to avoid routing conflicts
  trailingSlash: true,
  // Ensure we're using the correct output mode
  output: 'standalone',
}

export default nextConfig
