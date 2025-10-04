import type { NextConfig } from 'next';

// Configuración específica para Firebase Hosting
// Renombrar este archivo a next.config.ts cuando se vaya a deployar a Firebase

const nextConfig: NextConfig = {
  output: 'export', // Para Firebase Hosting (genera /out)
  images: {
    unoptimized: true, // Necesario para export estático
  },
  trailingSlash: true,
  basePath: '',
};

export default nextConfig;
