'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const contactNumbers = [
    { number: '625-158-0453', link: 'https://wa.me/+526251580453' },
    { number: '625-115-0546', link: 'https://wa.me/+526251150546' },
    { number: '623-121-3002', link: 'https://wa.me/+526231213002' },
  ];

  const quickLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Guía de Pedidos', href: '/guia' },
  ];

  return (
    <footer className="relative bg-gradient-military text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(175,189,119,0.3)_0%,transparent_50%)]" />
      </div>

      <div className="relative container-custom section-padding">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="relative w-48 h-16 mb-4">
              <Image
                src="/Footer-512x512.png"
                alt="RÉPLICAS CUAUHTÉMOC"
                fill
                className="object-contain drop-shadow-lg hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-white/80 mb-4 leading-relaxed max-w-sm">
              Tu aliado confiable en equipamiento y réplicas para airsoft de alta calidad.
            </p>
            <p className="text-white/60 italic text-sm">
              Ciudad Cuauhtémoc, Chihuahua, México
            </p>
          </motion.div>

          {/* Contact Direct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-secondary">
              Contacto Directo
            </h3>
            <div className="space-y-3">
              {contactNumbers.map((contact, index) => (
                <motion.a
                  key={contact.number}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-gradient-to-r from-green-600 to-green-700
                           border border-white/20 hover:from-green-700 hover:to-green-800
                           transition-all duration-300 hover:scale-105 hover:shadow-lg
                           max-w-xs group"
                >
                  <Phone className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="font-medium">{contact.number}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-secondary">
              Enlaces Rápidos
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block text-white/70 hover:text-secondary hover:translate-x-2
                             transition-all duration-300 py-1"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/60 text-sm"
        >
          <p>© 2025 RÉPLICAS CUAUHTÉMOC. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
