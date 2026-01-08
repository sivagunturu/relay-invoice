/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wsjedcqjyjrtvmucteaj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    ...(process.env.REPLIT_DEV_DOMAIN
      ? [
          `https://${process.env.REPLIT_DEV_DOMAIN}`,
          process.env.REPLIT_DEV_DOMAIN,
        ]
      : []),
  ],
};

export default nextConfig;
