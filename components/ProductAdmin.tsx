'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase/config';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
  importProducts,
  Product
} from '@/lib/firebase/productService';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Download,
  ArrowLeft,
  LogOut,
  Star,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const categories = [
  'Rifles de Asalto',
  'Pistolas',
  'Miras',
  'Reparación',
  'Accesorios',
  'Chalecos',
  'Cascos',
  'Caretas',
  'Municiones'
];

interface Alert {
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Scroll behavior for header
  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al cargar los productos desde Firebase');
      try {
        const response = await fetch('/data/products.json');
        const jsonData = await response.json();
        setProducts(jsonData);
        showAlert('info', 'Productos cargados desde JSON local');
      } catch (jsonError) {
        showAlert('error', 'Error al cargar productos');
      }
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: Alert['type'], message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        originalPrice: 0,
        image: '',
        category: categories[0],
        rating: 0,
        reviews: 0,
        inStock: true,
        isNew: true,
        discount: 0,
        description: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const img = new window.Image();
      const reader = new FileReader();

      reader.onload = async (event) => {
        img.src = event.target?.result as string;

        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 600;
          const scaleFactor = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleFactor;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            if (!blob) return;
            const timestamp = Date.now();
            const filePath = `products/${timestamp}_${file.name.split('.')[0]}.webp`;
            const storageRef = ref(storage, filePath);

            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log('✅ Imagen optimizada y subida:', downloadURL);
            setFormData(prev => ({ ...prev, image: downloadURL }));
          }, 'image/webp', 0.8);
        };
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('❌ Error al subir imagen:', error);
      showAlert('error', 'Error al subir la imagen');
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (editingProduct && editingProduct.firebaseId) {
        const updatedProduct = await updateProduct(editingProduct.firebaseId, formData);
        setProducts(products.map(p =>
          p.firebaseId === editingProduct.firebaseId ? updatedProduct : p
        ));
        showAlert('success', 'Producto actualizado en Firebase');
      } else {
        const newProduct = await addProduct(formData as Omit<Product, 'id' | 'firebaseId'>);
        setProducts([...products, newProduct]);
        showAlert('success', 'Producto agregado a Firebase');
      }

      handleCloseDialog();
    } catch (error: any) {
      console.error('Error:', error);
      showAlert('error', 'Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        if (product.firebaseId) {
          await deleteProduct(product.firebaseId);
          setProducts(products.filter(p => p.firebaseId !== product.firebaseId));
          showAlert('success', 'Producto eliminado de Firebase');
        }
      } catch (error: any) {
        console.error('Error:', error);
        showAlert('error', 'Error al eliminar: ' + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleExport = async () => {
    try {
      const cleanProducts = await exportProducts();
      const dataStr = JSON.stringify(cleanProducts, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'products_firebase_export.json');
      link.click();
      showAlert('success', 'Productos exportados exitosamente');
    } catch (error: any) {
      showAlert('error', 'Error al exportar: ' + error.message);
    }
  };

  const handleImportFromJSON = async () => {
    try {
      const response = await fetch('/data/products.json');
      const jsonProducts = await response.json();
      const result = await importProducts(jsonProducts);
      await loadProducts();
      showAlert('success', `${result.count} productos importados desde JSON`);
    } catch (error: any) {
      showAlert('error', 'Error al importar: ' + error.message);
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-10 bg-white shadow-md rounded-lg p-4 mb-6
                  transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Administrador de Productos
          </h1>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => router.push('/catalogo')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver
            </button>

            <button
              onClick={() => handleOpenDialog()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Agregar Producto
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg
                       hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center my-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
          <p className="text-lg">Cargando productos desde Firebase...</p>
        </div>
      )}

      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
              alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
              alert.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            <AlertCircle size={20} />
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-military hover:shadow-xl transition-all"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-primary flex-grow pr-2">
                  {product.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenDialog(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Nuevo
                  </span>
                )}
                {!product.inStock && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                    Sin Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews} reseñas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit/Add Dialog */}
      <AnimatePresence>
        {openDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDialog}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Dialog Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-t-2xl">
                  <h2 className="text-2xl font-bold">
                    {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
                  </h2>
                </div>

                {/* Dialog Content */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-military"
                    required
                  />

                  <textarea
                    placeholder="Descripción"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="input-military resize-none"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Precio"
                      value={formData.price || ''}
                      onChange={(e) => handleInputChange('price', Number(e.target.value))}
                      className="input-military"
                      required
                    />

                    <input
                      type="number"
                      placeholder="Precio Original"
                      value={formData.originalPrice || ''}
                      onChange={(e) => handleInputChange('originalPrice', Number(e.target.value))}
                      className="input-military"
                    />
                  </div>

                  <select
                    value={formData.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="input-military"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="URL de imagen"
                    value={formData.image || ''}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="input-military"
                  />

                  <label className="btn-military cursor-pointer inline-flex items-center gap-2">
                    <Upload size={20} />
                    Subir Imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {formData.image && (
                    <div className="relative w-48 h-32">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Calificación (0-5)"
                      value={formData.rating || ''}
                      onChange={(e) => handleInputChange('rating', Number(e.target.value))}
                      min="0"
                      max="5"
                      step="0.1"
                      className="input-military"
                    />

                    <input
                      type="number"
                      placeholder="Reseñas"
                      value={formData.reviews || ''}
                      onChange={(e) => handleInputChange('reviews', Number(e.target.value))}
                      className="input-military"
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Descuento (%)"
                    value={formData.discount || ''}
                    onChange={(e) => handleInputChange('discount', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="input-military"
                  />

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock || false}
                        onChange={(e) => handleInputChange('inStock', e.target.checked)}
                        className="w-5 h-5 text-primary rounded"
                      />
                      <span className="font-medium">En Stock</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isNew || false}
                        onChange={(e) => handleInputChange('isNew', e.target.checked)}
                        className="w-5 h-5 text-primary rounded"
                      />
                      <span className="font-medium">Nuevo</span>
                    </label>
                  </div>
                </div>

                {/* Dialog Actions */}
                <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                  <button
                    onClick={handleCloseDialog}
                    className="px-6 py-3 rounded-lg font-semibold text-gray-700
                             hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X size={20} />
                    Cancelar
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-military flex items-center gap-2 disabled:opacity-50
                             disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {editingProduct ? 'Actualizar' : 'Agregar'}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
