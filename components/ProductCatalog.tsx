'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, ChevronDown, Star, ShoppingBag, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product, getAllProducts } from '@/lib/firebase/productService';
import ProductDialog from './ProductDialog';

const categories = [
  "Todas las categorías", "Rifles de Asalto", "Cascos",
  "Caretas", "Chalecos", "Miras", "Municiones", "Accesorios"
];

const sortOptions = [
  { value: "default", label: "Ordenar por default" },
  { value: "price-low", label: "Precio: menor a mayor" },
  { value: "price-high", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "newest", label: "Más recientes" }
];

// Hook personalizado para debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Componente ProductCard
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="card-military cursor-pointer h-full flex flex-col group"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {product.isNew && (
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
            NUEVO
          </span>
        )}
        {product.discount > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -{product.discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
            AGOTADO
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden rounded-t-military">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 group-hover:scale-105
                    ${!product.inStock ? 'grayscale opacity-60' : ''}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-gray-100 text-primary-light
                       text-xs font-bold rounded-xl w-fit mb-2">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-sm md:text-base lg:text-lg mb-2 line-clamp-2
                     min-h-[2.5rem] md:min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews || 0})</span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <p className="text-lg md:text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          disabled={!product.inStock}
          className={`mt-4 w-full py-2 md:py-3 rounded-xl font-semibold
                    transition-all duration-300
                    ${product.inStock
                      ? 'btn-military-outline hover:bg-primary hover:text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          {product.inStock ? 'Ver más' : 'No disponible'}
        </button>
      </div>
    </motion.div>
  );
};

const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const searchParams = useSearchParams();

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.warn('Firebase fallback, trying local JSON:', error);
        try {
          const response = await fetch('/data/products.json');
          if (!response.ok) throw new Error('Failed to fetch local data');
          const jsonData = await response.json();
          setProducts(jsonData);
        } catch (jsonError) {
          console.error('Error loading products:', jsonError);
          setError('No se pudieron cargar los productos. Por favor, intenta más tarde.');
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas las categorías' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low': return a.price - b.price;
          case 'price-high': return b.price - a.price;
          case 'rating': return (b.rating || 0) - (a.rating || 0);
          case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          default: return 0;
        }
      });
  }, [products, debouncedSearchTerm, selectedCategory, sortBy]);

  // Paginated products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleOpenDialog = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-military-light text-white
                    relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: 'var(--military-camo)' }} />

        <div className="absolute bottom-[10%] right-[5%] w-48 h-48
                      bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,transparent_70%)]
                      animate-pulse-slow" />

        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 font-poppins
                     text-gradient-military"
          >
            CATÁLOGO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto
                     leading-relaxed"
          >
            Descubre nuestra colección completa de equipo para airsoft de alta calidad.
            Encuentra lo que necesitas para tu entrenamiento táctico y colección personal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 flex-wrap"
          >
            {[
              { icon: Shield, text: 'Calidad' },
              { icon: Zap, text: 'Seguridad' },
              { icon: ShoppingBag, text: 'Atención' }
            ].map((feature, i) => (
              <div key={i} className="glass px-4 py-2 rounded-full flex items-center gap-2">
                <feature.icon size={18} />
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container-custom py-8">
        <div className="card-military p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="text-primary-light" size={24} />
            <h2 className="text-2xl font-semibold text-primary">Filtrar Productos</h2>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                      size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-military pl-12"
              />
            </div>
          </div>

          {/* Category and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-military appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2
                                    text-secondary pointer-events-none" size={20} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-military appearance-none cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2
                                    text-secondary pointer-events-none" size={20} />
            </div>
          </div>

          {/* Results Count */}
          <p className="text-center mt-6 text-gray-600 font-medium">
            {loading
              ? 'Cargando productos...'
              : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-military h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-military" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta cambiar los filtros de búsqueda</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleOpenDialog(product)}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all
                              ${currentPage === i + 1
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Dialog */}
      <ProductDialog
        product={selectedProduct}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default ProductCatalog;
