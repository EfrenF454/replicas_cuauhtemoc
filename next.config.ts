import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Comentado para Vercel - descomentar solo para Firebase Hosting
  // output: 'export',

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
