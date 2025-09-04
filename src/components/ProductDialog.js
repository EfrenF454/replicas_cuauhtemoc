import React, { useState, useCallback, forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  Chip,
  Rating,
  Slide,
  useMediaQuery,
  useTheme,
  Backdrop,
  Fade,
  Badge,
  Zoom,
  Card,
  CardMedia,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Close,
  WhatsApp,
  Share,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  LocalOffer,
  Verified,
  Star,
  Security,
  Speed,
  CheckCircle
} from '@mui/icons-material';

// Componente de transición personalizada
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ product, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactAlert, setShowContactAlert] = useState(false);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  }, []);

  const handleWhatsAppContact = useCallback(() => {
    if (!product) return;
    const message = `Hola! Me interesa el producto: ${product.name} - ${formatPrice(product.price)}`;
    const url = `https://wa.me/+526251580453?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowContactAlert(true);
  }, [product, formatPrice]);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  const handleShare = useCallback(() => {
    if (!product || !navigator.share) return;
    navigator.share({
      title: product.name,
      text: `Mira este producto: ${product.name}`,
      url: window.location.href
    });
  }, [product]);

  if (!product) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        TransitionComponent={Transition}
        sx={{
          '& .MuiDialog-paper': {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? 0 : '16px',
            overflow: 'hidden'
          }
        }}
        PaperProps={{
          elevation: 0,
        }}
      >
        {/* Header personalizado */}
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
          color: 'white',
          position: 'relative',
          overflow: '',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--military-camo)',
            opacity: 0.1,
            zIndex: 0,
          }
        }}>
          <Box sx={{
            position: 'relative',
            zIndex: 1,
            p: 3,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ flex: 1, pr: 2 }}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  lineHeight: 1.2,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {product.name}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>

              <IconButton
                onClick={onClose}
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <Grid container sx={{ height: '100%' }}>
            {/* Imagen del producto */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                position: 'relative',
                height: { xs: '250px', md: '300px' },
                background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)'
              }}>
                {/* Badges sobre la imagen */}
                <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                  {product.isNew && (
                    <Chip
                      label="NUEVO"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        mr: 1,
                        boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                      }}
                    />
                  )}

                  {product.discount > 0 && (
                    <Chip
                      label={`-${product.discount}%`}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #FF5722 0%, #D32F2F 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(255, 87, 34, 0.3)'
                      }}
                    />
                  )}
                </Box>

                {!product.inStock && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3
                  }}>
                    <Chip
                      label="AGOTADO"
                      size="large"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#D32F2F',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        px: 3,
                        py: 1
                      }}
                    />
                  </Box>
                )}

                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=Imagen+no+disponible";
                  }}
                />
              </Box>
            </Grid>

            {/* Información del producto */}
            <Grid item xs={12} md={6}>
              {product.category && (
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    ml: { xs: 3, md: 4 }, // mismo margen que el Box
                    mt: { xs: 1, md: 1 }, // mismo margen arriba
                  }}
                />
              )}
              <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Rating y Reviews */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={product.rating || 4.5} precision={0.1} size="large" readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 500 }}>
                    ({product.reviews || 23} reseñas)
                  </Typography>
                </Box>

                {/* Precio */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#2C3E2D',
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', md: '2.2rem' }
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="h6"
                        sx={{
                          textDecoration: 'line-through',
                          color: 'text.secondary',
                          fontWeight: 400
                        }}
                      >
                        {formatPrice(product.originalPrice)}
                      </Typography>
                    )}
                  </Box>

                  {product.discount > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#FF5722',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                    >
                      ¡Ahorras {formatPrice(product.originalPrice - product.price)}!
                    </Typography>
                  )}
                </Box>

                {/* Disponibilidad */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {product.inStock ? (
                      <>
                        <CheckCircle sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                        <Typography
                          variant="body1"
                          sx={{ color: '#4CAF50', fontWeight: 600 }}
                        >
                          En Stock
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Close sx={{ color: '#F44336', fontSize: '1.2rem' }} />
                        <Typography
                          variant="body1"
                          sx={{ color: '#F44336', fontWeight: 600 }}
                        >
                          Agotado
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                {/* Descripción */}
                {product.description && (
                  <Box sx={{ mb: 3, flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#2C3E2D',
                        fontWeight: 600,
                        mb: 2,
                        fontSize: '1.1rem'
                      }}
                    >
                      Descripción
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(44, 62, 45, 0.8)',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                )}

                {/* Características */}
                {product.caracteristicas && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#2C3E2D',
                        fontWeight: 600,
                        mb: 2,
                        fontSize: '1.1rem'
                      }}
                    >
                      Características
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(44, 62, 45, 0.8)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                        fontSize: '0.95rem'
                      }}
                    >
                      {product.caracteristicas}
                    </Typography>
                  </Box>
                )}

                {/* Features destacadas */}
                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={1}>
                    {[
                      { icon: <Security />, text: "Garantía", color: "#4CAF50" },
                      // { icon: <Speed />, text: "Envío Rápido", color: "#2196F3" },
                      { icon: <Verified />, text: "Calidad", color: "#FF9800" }
                    ].map((feature, index) => (
                      <Grid item xs={4} key={index}>
                        <Box sx={{
                          textAlign: 'center',
                          p: 1.5,
                          background: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: '8px',
                          border: '1px solid rgba(175, 189, 119, 0.2)',
                        }}>
                          <Box sx={{ color: feature.color, mb: 0.5 }}>
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#2C3E2D',
                              fontWeight: 600,
                              fontSize: '0.75rem'
                            }}
                          >
                            {feature.text}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        {/* Actions modernizadas */}
        <DialogActions sx={{
          p: 3,
          background: 'rgba(248, 249, 250, 0.8)',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button
            onClick={onClose}
            variant="outlined"

            sx={{
              borderColor: '#506C2C',
              color: '#506C2C',
              '&:hover': {
                borderColor: '#506C2C',
                backgroundColor: '#506C2C',
                color: 'white'
              }
            }
            }
          >
            Cerrar
          </Button>

          <Button
            variant="contained"
            startIcon={<WhatsApp />}
            onClick={handleWhatsAppContact}
            disabled={!product.inStock}
            sx={{
              minWidth: { xs: '100%', sm: '200px' },
              height: '48px',
              background: product.inStock
                ? 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)'
                : 'linear-gradient(135deg, #ccc 0%, #999 100%)',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: product.inStock ? '0 4px 12px rgba(37, 211, 102, 0.3)' : 'none',
              '&:hover': {
                background: product.inStock
                  ? 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)'
                  : 'linear-gradient(135deg, #ccc 0%, #999 100%)',
                transform: product.inStock ? 'translateY(-1px)' : 'none',
                boxShadow: product.inStock ? '0 6px 16px rgba(37, 211, 102, 0.4)' : 'none',
              },
              '&:disabled': {
                color: 'white',
                opacity: 0.7
              }
            }}
          >
            {product.inStock ? 'Consultar por WhatsApp' : 'Producto Agotado'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={showContactAlert}
        autoHideDuration={3000}
        onClose={() => setShowContactAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowContactAlert(false)}
          severity="success"
          sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            color: 'white',
            fontWeight: 600,
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          ¡Redirigiendo a WhatsApp!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDialog;
