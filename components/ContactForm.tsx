'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const contactInfo = [
  {
    icon: Phone,
    title: 'WhatsApp Principal',
    detail: '625-158-0453',
    action: 'https://wa.me/+526251580453',
    color: 'from-green-500 to-green-600',
    description: 'Respuesta inmediata',
  },
  {
    icon: Phone,
    title: 'Teléfonos Adicionales',
    detail: '625-115-0546 | 623-121-3002',
    action: 'https://wa.me/+526251150546',
    color: 'from-blue-500 to-blue-600',
    description: 'Llamadas directas',
  },
  {
    icon: Mail,
    title: 'Correo Electrónico',
    detail: 'ventas@replicascuauhtemoc.com.mx',
    action: 'mailto:ventas@replicascuauhtemoc.com.mx',
    color: 'from-accent-gold to-accent-bronze',
    description: 'Consultas detalladas',
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (reemplazar con API real)
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: 'var(--military-camo)' }} />

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-military-light text-white">
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: 'var(--military-camo)' }} />

        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 font-poppins"
          >
            Contáctanos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Estamos aquí para ayudarte. Contáctanos por el medio que prefieras
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-primary mb-6"
            >
              Información de Contacto
            </motion.h2>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-military p-6 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${info.color}
                                  transform group-hover:scale-110 transition-transform`}>
                      <info.icon className="text-white" size={24} />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 font-medium mb-1">
                        {info.detail}
                      </p>
                      <p className="text-sm text-gray-500">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-military p-6 mt-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-dark">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    Ubicación
                  </h3>
                  <p className="text-gray-700">
                    Ciudad Cuauhtémoc, Chihuahua, México
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="card-military p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Envíanos un mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="input-military"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-military"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="input-military resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-military flex items-center justify-center gap-3
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent
                                    rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>

              {/* Success Alert */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl
                           flex items-center gap-3"
                >
                  <CheckCircle className="text-green-600" size={24} />
                  <span className="text-green-800 font-medium">
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
