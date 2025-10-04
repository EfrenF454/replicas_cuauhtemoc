import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Para Firebase Hosting
  images: {
    unoptimized: true, // Necesario para export estático
  },
  // Trailing slash para compatibilidad con Firebase Hosting
  trailingSlash: true,
  // Para asegurar que las rutas funcionen correctamente
  basePath: '',
};

export default nextConfig;
