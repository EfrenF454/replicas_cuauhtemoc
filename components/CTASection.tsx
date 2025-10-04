'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-military relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20"
           style={{ backgroundImage: 'var(--military-camo)' }} />

      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-64 h-64
                    bg-[radial-gradient(circle,rgba(175,189,119,0.2)_0%,transparent_70%)]
                    rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80
                    bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)]
                    rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 font-poppins">
            ¿Listo para equiparte?
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto
                      leading-relaxed">
            Descubre nuestro catálogo completo y encuentra el equipo perfecto para ti
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold
                         bg-white text-primary rounded-full
                         shadow-lg hover:shadow-xl
                         transition-all duration-300"
              >
                <ShoppingBag size={24} />
                Ver Catálogo
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold
                         bg-green-500 text-white rounded-full
                         border-2 border-white/20
                         shadow-lg hover:shadow-xl hover:bg-green-600
                         transition-all duration-300"
              >
                <MessageCircle size={24} />
                Contactar
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
