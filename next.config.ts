import type { NextConfig } from 'next';

const BLOCKED_SOURCES = [
  '/.git',
  '/.git/:path*',
  '/.DS_Store',
  '/wp-admin',
  '/wp-admin/:path*',
  '/wp-config.php.bak',
  '/phpmyadmin',
  '/phpmyadmin/:path*',
  '/phpinfo.php',
  '/backup.zip',
  '/backup.sql',
  '/database.sql',
  '/config.php',
];

const nextConfig: NextConfig = {
  // Comentado para Vercel - descomentar solo para Firebase Hosting
  // output: 'export',

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  async redirects() {
    return BLOCKED_SOURCES.map((source) => ({
      source,
      destination: '/',
      permanent: false,
    }));
  },

  images: {
    // Solo unoptimized si usas output: 'export'
    // unoptimized: true,

    // Para Vercel, configurar dominios permitidos si usas imágenes externas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },

  // Trailing slash opcional
  trailingSlash: true,
};

export default nextConfig;
