'use client';

import { useState, useCallback } from 'react';
import { X, MessageCircle, Star, Shield, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/firebase/productService';

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductDialog = ({ product, open, onClose }: ProductDialogProps) => {
  const [showContactAlert, setShowContactAlert] = useState(false);

  const formatPrice = useCallback((price: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price),
    []
  );

  const handleWhatsAppContact = useCallback(() => {
    if (!product) return;
    const message = `Hola! Me interesa el producto: ${product.name} - ${formatPrice(product.price)}`;
    const url = `https://wa.me/+526251580453?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowContactAlert(true);
    setTimeout(() => setShowContactAlert(false), 3000);
  }, [product, formatPrice]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl
                       overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-military-light text-white p-6">
                <div className="absolute inset-0 opacity-10"
                     style={{ backgroundImage: 'var(--military-camo)' }} />

                <div className="relative z-10 flex justify-between items-start">
                  <h2 className="text-2xl md:text-3xl font-bold pr-8 leading-tight
                               drop-shadow-md">
                    {product.name}
                  </h2>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20
                             transition-all hover:scale-110"
                    aria-label="Cerrar"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Image */}
                <div className="relative">
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden
                                bg-gradient-to-br from-gray-50 to-gray-100">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600
                                       text-white text-xs font-bold rounded-full
                                       shadow-lg">
                          NUEVO
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600
                                       text-white text-xs font-bold rounded-full
                                       shadow-lg">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Features */}
                  <div className="mt-4 space-y-2">
                    {[
                      { icon: Shield, text: 'Garantía de calidad', color: 'text-blue-500' },
                      { icon: Zap, text: 'Envío rápido', color: 'text-yellow-500' },
                      { icon: CheckCircle, text: 'Producto verificado', color: 'text-green-500' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <feature.icon className={feature.color} size={18} />
                        <span className="text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  {/* Category */}
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary-light
                                 font-bold rounded-xl w-fit mb-4">
                    {product.category}
                  </span>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.floor(product.rating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">
                      {product.rating?.toFixed(1)} ({product.reviews} reseñas)
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      Descripción
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2
                                       bg-green-50 text-green-700 rounded-lg font-medium">
                          <CheckCircle size={18} />
                          Disponible en stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2
                                       bg-red-50 text-red-700 rounded-lg font-medium">
                          Agotado
                        </span>
                      )}
                    </div>

                    {/* WhatsApp Button */}
                    <button
                      onClick={handleWhatsAppContact}
                      disabled={!product.inStock}
                      className={`w-full py-4 rounded-xl font-semibold text-lg
                                flex items-center justify-center gap-3
                                transition-all duration-300
                                ${product.inStock
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                    >
                      <MessageCircle size={22} />
                      Contactar por WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Alert */}
              <AnimatePresence>
                {showContactAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="absolute bottom-4 left-4 right-4 bg-green-500 text-white
                             px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
                  >
                    <CheckCircle size={24} />
                    <span className="font-medium">¡Abriendo WhatsApp!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDialog;
