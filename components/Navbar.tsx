'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Login', path: '/admin' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-military border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-12 transition-all duration-300 hover:drop-shadow-lg">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="RÉPLICAS CUAUHTÉMOC"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    relative px-4 py-2 rounded-lg font-semibold text-base
                    transition-all duration-300 overflow-hidden group
                    ${isActive(item.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-primary hover:text-white'
                    }
                  `}
                >
                  <span className={`
                    absolute inset-0 bg-gradient-to-br from-primary-light to-primary
                    transform transition-transform duration-300
                    ${isActive(item.path) ? 'scale-0' : 'scale-0 group-hover:scale-100'}
                  `} />
                  <span className="relative z-10">{item.label}</span>
                  <span className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent
                    -translate-x-full group-hover:translate-x-full
                    transition-transform duration-500
                  `} />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="md:hidden p-2 rounded-xl transition-all duration-300
                       hover:bg-primary hover:text-white hover:scale-110"
              aria-label="Toggle menu"
            >
              {drawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-military z-50 md:hidden
                       shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b-2 border-white/10">
                <div className="relative w-32 h-12">
                  <Image
                    src="/Footer-512x512.png"
                    alt="RÉPLICAS CUAUHTÉMOC"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col pt-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setDrawerOpen(false)}
                      className={`
                        mx-4 mb-2 px-6 py-4 rounded-xl text-white text-lg font-medium
                        transition-all duration-300
                        ${isActive(item.path)
                          ? 'bg-secondary/20 border-l-4 border-secondary font-semibold'
                          : 'hover:bg-secondary/30 hover:translate-x-2'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer Footer Logo */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="relative w-24 h-24 opacity-40">
                  <Image
                    src="/logo_simple.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
