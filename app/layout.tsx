import type { Metadata } from 'next';
import { Roboto, Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Réplicas Cuauhtémoc - Equipo Táctico y Airsoft',
  description: 'Tu aliado confiable en equipamiento y réplicas para airsoft de alta calidad. Ciudad Cuauhtémoc, Chihuahua, México.',
  keywords: 'airsoft, réplicas, equipo táctico, Cuauhtémoc, Chihuahua, México, rifles, pistolas, accesorios',
  authors: [{ name: 'Réplicas Cuauhtémoc' }],
  openGraph: {
    title: 'Réplicas Cuauhtémoc - Equipo Táctico y Airsoft',
    description: 'Tu aliado en equipamiento y réplicas para airsoft de alta calidad',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Réplicas Cuauhtémoc',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${poppins.variable}`}>
      <body className={`${roboto.className} antialiased bg-gray-50`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingActionButton />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
