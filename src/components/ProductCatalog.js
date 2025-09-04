import React, { useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, Chip, Rating, TextField, MenuItem, InputAdornment, Pagination,
  CircularProgress, Skeleton, Alert, Badge, Fade, Zoom, Backdrop
} from '@mui/material';
import { 
  Category, Search, SwapVert, FilterList, Verified, ShoppingBag,
  TrendingUp, NewReleases, LocalOffer, Speed, Security, GridView, ViewList,
  SupportAgent,
  ControlPoint,
  GppGood
} from '@mui/icons-material';
const ProductDialog = React.lazy(() => import('./ProductDialog'));

const categories = [
  "Todas las categorías", "Rifles de Asalto", "Cascos",
  "Caretas", "Chalecos", "Miras", "Municiones", "Accesorios"
];

// Estilos modernos para filtros
const modernFilterStyles = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(175, 189, 119, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(175, 189, 119, 0.5)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: '#AFBD77',
      boxShadow: '0 0 0 3px rgba(175, 189, 119, 0.1)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#2C3E2D',
    fontWeight: 500,
    '&::placeholder': {
      color: 'rgba(44, 62, 45, 0.6)',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(44, 62, 45, 0.7)',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#AFBD77',
    },
  },
  '& .MuiSelect-icon': {
    color: '#AFBD77',
    transition: 'transform 0.3s ease',
  },
  '& .MuiSelect-root:hover .MuiSelect-icon': {
    transform: 'rotate(180deg)',
  },
};

const sortOptions = [
  { value: "default", label: "Ordenar por default" },
  { value: "price-low", label: "Precio: menor a mayor" },
  { value: "price-high", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "newest", label: "Más recientes" }
];

// Custom hook para debounce de búsqueda
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Componente de producto optimizado con React.memo
const ProductCard = React.memo(({ product, formatPrice, onOpenDialog }) => {
  const handleClick = useCallback(() => {
    onOpenDialog(product);
  }, [product, onOpenDialog]);

  const handleImageError = useCallback((e) => {
    e.target.src = "https://via.placeholder.com/300x250?text=Imagen+no+disponible";
  }, []);

  return (
    <Zoom in={true} timeout={300}>
      <Card 
        onClick={handleClick} 
        sx={{
          cursor: 'pointer',
          mx: 'auto',
          width: { xs: '90%', sm: '95%', md: '100%' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(175, 189, 119, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(175, 189, 119, 0.5)',
            '& .product-image': {
              transform: 'scale(1.05)'
            }
          },
          position: 'relative',
          overflow: 'hidden'
        }}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${product.name}`}
      >
        {/* Badges */}
        <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
          {product.isNew && (
            <Chip
              label="NUEVO"
              color="primary"
              size="small"
              sx={{ mr: 1, fontWeight: 'bold' }}
            />
          )}
          {product.discount > 0 && (
            <Chip
              label={`-${product.discount}%`}
              color="error"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          )}
          {!product.inStock && (
            <Chip
              label="AGOTADO"
              color="default"
              size="small"
              sx={{ fontWeight: 'bold', opacity: 0.8 }}
            />
          )}
        </Box>

        <CardMedia 
          component="img" 
          image={product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={handleImageError}
          sx={{
            height: { xs: 120, sm: 180, md: 250 },
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            filter: !product.inStock ? 'grayscale(100%)' : 'none',
            opacity: !product.inStock ? 0.6 : 1
          }} 
        />
        
        <CardContent sx={{
          px: 2,
          py: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTypography-root': {
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
          },
        }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              color: '#506C2C',
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              padding: '2px 8px',
              borderRadius: '12px',
              display: 'inline-block',
              mb: 1,
              width: 'fit-content'
            }}
          >
            {product.category}
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 'bold',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3
            }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating || 0} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews || 0})
            </Typography>
          </Box>
          
          <Box sx={{ mt: 'auto' }}>
            <Typography 
              variant="h6" 
              color="primary.main"
              sx={{ fontWeight: 'bold' }}
            >
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: '0.875rem'
                }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </Box>
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            disabled={!product.inStock}
            sx={{
              borderColor: '#506C2C',
              color: '#506C2C',
              '&:hover': {
                borderColor: '#506C2C',
                backgroundColor: '#506C2C',
                color: 'white'
              },
              '&:disabled': {
                borderColor: '#ccc',
                color: '#ccc'
              }
            }} 
          >
            {product.inStock ? 'Ver más' : 'No disponible'}
          </Button>
        </CardActions>
      </Card>
    </Zoom>
  );
});

const ProductCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  
  const productsPerPage = 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const [searchParams] = useSearchParams();

  // Optimized data loading with better error handling
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { getAllProducts } = await import('../firebase/productService');
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
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  // Memoizar productos filtrados para mejorar performance
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Todas las categorías" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low": return a.price - b.price;
          case "price-high": return b.price - a.price;
          case "rating": return (b.rating || 0) - (a.rating || 0);
          case "newest": return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          default: return 0;
        }
      });
  }, [products, debouncedSearchTerm, selectedCategory, sortBy]);

  // Memoizar productos de la página actual
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Callbacks memoizados
  const handleOpenDialog = useCallback((product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    }).format(price);
  }, []);

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <Box sx={{
        pt: 12,
        pb: 6,
        background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--military-camo)',
          opacity: 0.2,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'pulse 4s ease-in-out infinite',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

          <Typography
            variant="h2"
            component="h1"
            className="animate-fade-in-up"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #AFBD77 50%, #cdcdcd 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              fontFamily: '"Poppins", sans-serif',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            CATÁLOGO
          </Typography>
          
          <Typography
            variant="h5"
            className="animate-fade-in-up stagger-2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 300,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Descubre nuestra colección completa de equipo para airsoft de alta calidad. 
            Encuentra lo que necesitas para tu entrenamiento táctico y colección personal.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {[
              { icon: <ControlPoint />, text: "Calidad" },
              { icon: <GppGood />, text: "Seguridad" },
              { icon: <SupportAgent />, text: "Atención" }
            ].map((feature, index) => (
              <Chip
                key={index}
                icon={feature.icon}
                label={feature.text}
                className={`animate-fade-in-up stagger-${index + 3}`}
                sx={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Filtros Section */}
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Card sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(175, 189, 119, 0.3)',
          p: 3,
          mb: 4,
          '&:hover': {
                                transform: 'translateY(0px)',

                        },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ color: '#506C2C', mr: 1 }} />
            <Typography variant="h5" sx={{ color: '#2C3E2D', fontWeight: 600 }}>
              Filtrar Productos
            </Typography>
          </Box>

          {/* Modern Filter Layout */}
          <Box sx={{ mb: 4 }}>
            {/* Search Bar - Full Width on Mobile */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="medium"
                sx={{
                  ...modernFilterStyles,
                  '& .MuiOutlinedInput-root': {
                    ...modernFilterStyles['& .MuiOutlinedInput-root'],
                    height: '56px',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#AFBD77', fontSize: '1.5rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Filter Controls - Side by Side on Desktop, Stacked on Mobile */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              alignItems: 'stretch'
            }}>
              {/* Category Filter */}
              <Box sx={{ flex: { xs: '1', md: '1 1 40%' } }}>
                <TextField
                  fullWidth
                  select
                  label="Categoría"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  size="medium"
                  sx={{
                    ...modernFilterStyles,
                    '& .MuiOutlinedInput-root': {
                      ...modernFilterStyles['& .MuiOutlinedInput-root'],
                      height: '56px',
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Category sx={{ color: '#AFBD77', fontSize: '1.2rem' }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem 
                      key={category} 
                      value={category}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(175, 189, 119, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(175, 189, 119, 0.2)',
                          '&:hover': {
                            backgroundColor: 'rgba(175, 189, 119, 0.3)',
                          }
                        }
                      }}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Sort Filter */}
              <Box sx={{ flex: { xs: '1', md: '1 1 40%' } }}>
                <TextField
                  fullWidth
                  select
                  label="Ordenar por"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="medium"
                  sx={{
                    ...modernFilterStyles,
                    '& .MuiOutlinedInput-root': {
                      ...modernFilterStyles['& .MuiOutlinedInput-root'],
                      height: '56px',
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SwapVert sx={{ color: '#AFBD77', fontSize: '1.2rem' }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem 
                      key={option.value} 
                      value={option.value}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(175, 189, 119, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(175, 189, 119, 0.2)',
                          '&:hover': {
                            backgroundColor: 'rgba(119, 124, 189, 0.3)',
                          }
                        }
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            {/* Results Count */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(44, 62, 45, 0.7)',
                  fontWeight: 500,
                  fontSize: '0.9rem'
                }}
              >
                {loading ? 'Cargando productos...' : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`}
              </Typography>
            </Box>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
              gap: 2, 
              gridAutoRows: '1fr' 
            }}>
              {Array.from(new Array(8)).map((_, index) => (
                <Card key={index} sx={{ height: '400px' }}>
                  <Skeleton variant="rectangular" height={250} />
                  <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.2rem', mb: 1 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width="100%" height={36} />
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 4 }}
              action={
                <Button color="inherit" size="small" onClick={loadProducts}>
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <Fade in={!loading} timeout={600}>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: viewMode === 'grid' 
                  ? { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }
                  : { xs: '1fr' }, 
                gap: 3, 
                gridAutoRows: '1fr' 
              }}>
                {currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    formatPrice={formatPrice}
                    onOpenDialog={handleOpenDialog}
                  />
                ))}
              </Box>
            </Fade>
          )}

          <Suspense fallback={
            <Backdrop open={dialogOpen} sx={{ zIndex: 1300 }}>
              <CircularProgress color="primary" />
            </Backdrop>
          }>
            <ProductDialog product={selectedProduct} open={dialogOpen} onClose={handleCloseDialog} />
          </Suspense>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'rgb(80, 108, 44)',               // color del número
                    borderColor: '#506C2C',         // color del borde (para variant outlined)
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'rgba(80, 108, 44, 0.8)',  // naranja con 20% opacidad
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#506C2C',
                    },
                  },
                }}
                count={totalPages} page={currentPage} onChange={(e, value) => setCurrentPage(value)} />
            </Box>
          )}

          {!loading && !error && currentProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5">No se encontraron productos</Typography>
              <Typography variant="body1">Intenta cambiar los filtros de búsqueda</Typography>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
    
  );
};

export default ProductCatalog;
