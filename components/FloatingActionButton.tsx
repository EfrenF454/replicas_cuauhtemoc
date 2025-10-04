'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingActionButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+526251580453', '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16
               bg-gradient-to-br from-green-500 to-green-600
               rounded-full shadow-lg hover:shadow-xl
               flex items-center justify-center
               text-white transition-all duration-300
               group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-pulse" />

      {/* Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-green-400
                     animate-ping opacity-20" />
    </motion.button>
  );
};

export default FloatingActionButton;
