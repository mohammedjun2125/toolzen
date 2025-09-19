/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*.amp',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*(\\?amp=1)',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/toolzenweb.com/:path*',
        has: [
          {
            type: 'host',
            value: 'toolzenweb.com',
          },
        ],
        destination: 'https://www.toolzenweb.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
