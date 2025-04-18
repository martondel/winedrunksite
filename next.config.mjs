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
  // Use static export for better compatibility with various hosting providers
  output: 'export',
  // Disable image optimization for static export
  distDir: 'out',
}

export default nextConfig
