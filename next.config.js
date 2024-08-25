/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'aceternity.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig
