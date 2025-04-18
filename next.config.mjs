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
  // Add custom rewrites to handle the PÁLINKADRUNK game route
  async rewrites() {
    return [
      {
        source: '/jatekok/palinkadrunk',
        destination: '/jatekok/palinkadrunk/game',
      },
    ]
  },
}

export default nextConfig
