import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config'; // ajusta la ruta según tu estructura
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
// import {handleLogout} from '../pages/AdminPage'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Chip,
  Alert,
  Rating,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CloudUpload as ImportIcon,
  CloudDownload as ExportIcon,
  Logout
} from '@mui/icons-material';
// Los servicios de Firebase se importarán dinámicamente para evitar errores

const categories = [
  'Rifles de Asalto',
  'Pistolas',
  'Miras',
  'Reparación',
  'Accesorios',
  'Chalecos',
];

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);  // Estado para controlar si se ha hecho scroll
  const [lastScrollY, setLastScrollY] = useState(0);  // Estado para almacenar la posición del scroll anterior


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50 && currentScrollY < lastScrollY) {
        // Si el scroll es mayor a 50px y se está moviendo hacia arriba
        setIsScrolled(false); // Mostrar el Box
      } else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        // Si el scroll es mayor a 50px y se está moviendo hacia abajo
        setIsScrolled(true); // Ocultar el Box
      }

      setLastScrollY(currentScrollY); // Actualiza la última posición del scroll
    };

    // Añadimos el listener para el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiamos el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Cargar productos desde Firebase
  useEffect(() => {
    loadProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Importación dinámica para evitar errores de inicialización
      const { getAllProducts } = await import('../firebase/productService');
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al cargar los productos desde Firebase');
      // Fallback: cargar desde JSON local
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

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleOpenDialog = (product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        originalPrice: null,
        image: '',
        category: categories[0],
        rating: 0,
        reviews: 0,
        inStock: true,
        isNew: true,
        discount: 0,
        description: '',
        caracteristicas: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
    // Crear imagen para redimensionar
    const img = new Image();
    const reader = new FileReader();

    reader.onload = async (event) => {
      img.src = event.target.result;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 600; // 🔧 Ajusta a tu preferencia
        const scaleFactor = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleFactor;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir a Blob en formato WebP
        canvas.toBlob(async (blob) => {
          const timestamp = Date.now();
          const filePath = `products/${timestamp}_${file.name.split('.')[0]}.webp`;
          const storageRef = ref(storage, filePath);

          // Subir la imagen comprimida
          const snapshot = await uploadBytes(storageRef, blob);

          // Obtener la URL pública
          const downloadURL = await getDownloadURL(snapshot.ref);

          console.log("✅ Imagen optimizada y subida con éxito:", downloadURL);
          setFormData((prev) => ({
            ...prev,
            image: downloadURL,
          }));
        }, 'image/webp', 0.8); // 0.8 = calidad (ajustable)
      };
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.error("❌ Error al optimizar o subir imagen:", error);
  }
};

  const handleSave = async () => {
    try {
      setSaving(true);

      // Importación dinámica de servicios Firebase
      const { updateProduct, addProduct } = await import('../firebase/productService');

      if (editingProduct) {
        // Editar producto existente
        const updatedProduct = await updateProduct(editingProduct.firebaseId, formData);
        setProducts(products.map(p =>
          p.firebaseId === editingProduct.firebaseId ? updatedProduct : p
        ));
        showAlert('success', 'Producto actualizado en Firebase');
      } else {
        // Agregar nuevo producto
        const newProduct = await addProduct(formData);
        setProducts([...products, newProduct]);
        showAlert('success', 'Producto agregado a Firebase');
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al guardar el producto: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleDelete = async (product) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const { deleteProduct } = await import('../firebase/productService');
        await deleteProduct(product.firebaseId);
        setProducts(products.filter(p => p.firebaseId !== product.firebaseId));
        showAlert('success', 'Producto eliminado de Firebase');
      } catch (error) {
        console.error('Error:', error);
        showAlert('error', 'Error al eliminar el producto: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    navigate('/catalogo');
  };
  const saveProducts = async (updatedProducts) => {
    try {
      // Simular guardado en localStorage como backup
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      console.log('Productos guardados:', updatedProducts);

      // En una aplicación real, aquí enviarías a tu servidor
      // const response = await fetch('/api/products', { ... });

    } catch (error) {
      console.error('Error al guardar productos:', error);
      throw error;
    }
  };

  const handleExport = async () => {
    try {
      const { exportProducts } = await import('../firebase/productService');
      const cleanProducts = await exportProducts();
      const dataStr = JSON.stringify(cleanProducts, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'products_firebase_export.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      showAlert('success', 'Productos exportados exitosamente');
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al exportar productos: ' + error.message);
    }
  };

  const handleImportFromJSON = async () => {
    try {
      const response = await fetch('/data/products.json');
      const jsonProducts = await response.json();

      const { importProducts } = await import('../firebase/productService');
      const result = await importProducts(jsonProducts);
      await loadProducts(); // Recargar productos

      showAlert('success', `${result.count} productos importados desde JSON`);
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al importar productos: ' + error.message);
    }
  };


  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Contenedor para el título y botones con sticky */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,  // Asegura que se quede por encima del contenido al hacer scroll
          backgroundColor: 'background.paper',  // Da color de fondo para evitar que se vea transparente cuando hace scroll
          boxShadow: 1,  // Sombra para dar profundidad
          mb: 3, // Margen inferior para separar del contenido al hacer scroll
          py: 2, // Padding en vertical
          transition: 'all 0.4s',
                    transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)',  // Mueve el Box fuera de la vista cuando hace scroll hacia abajo
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, ml: 2, mr: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' }, mb: 2, textAlign: 'center' }}>
            Administrador de Productos
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ bgcolor: 'primary.blue', '&:hover': { bgcolor: 'secondary.blue' }, height: { xs: 'auto', sm: 45 }, minWidth: { sm: 120 } }}
              startIcon={<ArrowBack />}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenDialog()}
              startIcon={<AddIcon />}
              sx={{ bgcolor: 'primary.blue', '&:hover': { bgcolor: 'secondary.blue' }, height: { xs: 'auto', sm: 45 }, minWidth: { sm: 170 }, width: { xs: 'auto', sm: 55 } }}
            >
              Agregar Producto
            </Button>
            <Button
              fullWidth
              sx={{
                backgroundColor: '#ff2828',
                color: '#ffffff',
                boxShadow: 3,
                height: { xs: 'auto', sm: 45 }, minWidth: { sm: 150 }, width: { xs: 'auto', sm: 170 },
                '&:hover': {
                  backgroundColor: '#d01212',
                  boxShadow: 5,
                },
                '&:active': {
                  backgroundColor: '#d01212',
                },
              }}
              onClick={() => handleLogout()}
              startIcon={<Logout />}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Cargando productos desde Firebase...
          </Typography>
        </Box>
      )}

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <Card sx={{
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              },
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => handleOpenDialog(product)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip label={product.category} size="small" sx={{ mr: 1, bgcolor: 'info.main', color: 'white' }} />
                  {product.isNew && (
                    <Chip label="Nuevo" size="small" color="success" sx={{ mr: 1 }} />
                  )}
                  {!product.inStock && (
                    <Chip label="Sin Stock" size="small" color="error" />
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.6 }}>
                  {product.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviews} reseñas)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${product.price.toLocaleString()}
                  </Typography>
                  {product.originalPrice && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ${product.originalPrice.toLocaleString()}
                    </Typography>
                  )}
                  {product.discount > 0 && (
                    <Chip label={`-${product.discount}%`} size="small" color="error" />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      {/* Dialog para agregar/editar producto */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Nombre"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Descripción"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              multiline
              rows={2}
              required
            />

            <TextField
              label="Características"
              value={formData.caracteristicas || ''}
              onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
              fullWidth
              multiline
              rows={2}
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Precio"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Precio Original"
                  type="number"
                  value={formData.originalPrice || ''}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value ? Number(e.target.value) : null)}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>

            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                label="Categoría"
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Imagen (URL)"
              value={formData.image || ''}
              onChange={(e) => handleInputChange('image', e.target.value)}
              fullWidth
              placeholder="/images/products/nombre-imagen.jpg"
              required
            />

            <Button
              component="label"
              variant="contained"
              startIcon={<ImportIcon />}
              sx={{ mt: 2, bgcolor: 'primary.blue', '&:hover': { bgcolor: 'secondary.blue' } }}
            >
              Seleccionar imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>

            {/* Previsualización después de subir la imagen */}
            {formData.image && (
              <img
                src={formData.image}
                alt="Previsualización"
                style={{ maxWidth: '200px', marginTop: 10, borderRadius: 8 }}
              />
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Calificación"
                  type="number"
                  value={formData.rating || ''}
                  onChange={(e) => handleInputChange('rating', Number(e.target.value))}
                  fullWidth
                  inputProps={{ min: 0, max: 5, step: 0.1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Reseñas"
                  type="number"
                  value={formData.reviews || ''}
                  onChange={(e) => handleInputChange('reviews', Number(e.target.value))}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Descuento (%)"
              type="number"
              value={formData.discount || ''}
              onChange={(e) => handleInputChange('discount', Number(e.target.value))}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.inStock || false}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                  />
                }
                label="En Stock"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isNew || false}
                    onChange={(e) => handleInputChange('isNew', e.target.checked)}
                  />
                }
                label="Nuevo"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
          sx={{}} 
          onClick={handleCloseDialog} startIcon={<CancelIcon />}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
            disabled={saving}
            sx={{
              bgcolor: 'primary.blue', '&:hover': { bgcolor: 'secondary.blue' }
            }}
          >
            {saving ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Agregar')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductAdmin;
