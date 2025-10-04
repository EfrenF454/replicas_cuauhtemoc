'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/lib/contexts/AuthContext';
import { LogIn, ArrowLeft, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoginPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      setError('Correo o contraseña incorrectos.');
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-military relative overflow-hidden px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: 'var(--military-camo)' }} />

      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-72 h-72
                    bg-[radial-gradient(circle,rgba(175,189,119,0.2)_0%,transparent_70%)]
                    rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96
                    bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)]
                    rounded-full blur-3xl" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-primary-dark p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/android-chrome-512x512.png"
                alt="Logo"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-white/80">
              Panel de Administración
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl
                         flex items-center gap-3 text-red-700"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                        size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-secondary/30
                             bg-white/90 backdrop-blur-sm
                             focus:border-secondary focus:ring-2 focus:ring-secondary/20
                             transition-all duration-300
                             placeholder:text-gray-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                        size={20} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-secondary/30
                             bg-white/90 backdrop-blur-sm
                             focus:border-secondary focus:ring-2 focus:ring-secondary/20
                             transition-all duration-300
                             placeholder:text-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-lg
                         bg-gradient-to-r from-blue-600 to-blue-700
                         text-white
                         hover:from-blue-700 hover:to-blue-800
                         disabled:from-gray-400 disabled:to-gray-500
                         disabled:cursor-not-allowed
                         flex items-center justify-center gap-3
                         shadow-lg hover:shadow-xl
                         transition-all duration-300
                         hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent
                                  rounded-full animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn size={22} />
                    Entrar
                  </>
                )}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-4 rounded-xl font-semibold text-lg
                         bg-gradient-to-r from-red-500 to-red-600
                         text-white
                         hover:from-red-600 hover:to-red-700
                         flex items-center justify-center gap-3
                         shadow-lg hover:shadow-xl
                         transition-all duration-300
                         hover:scale-105 active:scale-95"
              >
                <ArrowLeft size={22} />
                Volver
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-white/70 text-sm">
          Panel exclusivo para administradores
        </p>
      </motion.div>
    </div>
  );
}
