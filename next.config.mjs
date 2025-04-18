/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['v0.blob.com'],
    unoptimized: true,
  },
  // Disable trailing slashes to avoid routing issues
  trailingSlash: false,
  // Use standalone output for better compatibility
  output: 'standalone',
}

export default nextConfig
