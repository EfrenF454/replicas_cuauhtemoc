'use client';

import { Shield, Zap, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Calidad Garantizada',
    description: 'Productos certificados y de las mejores marcas del mercado',
  },
  {
    icon: Zap,
    title: 'Entrega Rápida',
    description: 'Envíos seguros y rápidos a toda la república mexicana',
  },
  {
    icon: Clock,
    title: 'Atención 24/7',
    description: 'Soporte constante vía WhatsApp para resolver tus dudas',
  },
  {
    icon: Award,
    title: 'Experiencia',
    description: 'Años de trayectoria respaldando nuestra calidad y servicio',
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"
           style={{ backgroundImage: 'var(--military-camo)' }} />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nos distinguimos por ofrecer el mejor servicio y productos de la más alta calidad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-military p-6 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full
                            bg-gradient-to-br from-secondary to-secondary-dark
                            flex items-center justify-center
                            transform group-hover:scale-110 group-hover:rotate-6
                            transition-all duration-300">
                <feature.icon className="text-white" size={32} />
              </div>

              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
