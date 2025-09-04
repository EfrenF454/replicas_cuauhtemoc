import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container,
    Chip,
    Rating
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlickCatalogue = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // Cargar productos desde JSON o Firebase
    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Intentar cargar desde Firebase primero
                const { getAllProducts } = await import('../firebase/productService');
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error cargando productos desde Firebase:', error);
                // Fallback: cargar desde JSON local
                try {
                    const response = await fetch('/data/products.json');
                    const jsonData = await response.json();
                    setProducts(jsonData);
                } catch (jsonError) {
                    console.error('Error cargando productos desde JSON:', jsonError);
                }
            }
        };
        loadProducts();
    }, []);

    // Configuración del slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        draggable: true,
        swipeToSlide: true,
        touchMove: true,
        accessibility: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(price);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6, px: 0, }}>
            <Box sx={{
                py: 4,
                textAlign: 'center',
                mb: 5,
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // negro con 50% de opacidad
                borderRadius: 2,
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#ffffff',
                        textShadow: ' 0 0 16px #ff6b35',
                    }}
                >
                    Nuestros Productos
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ mb: 4, color: '#ffffff' }}
                >
                    Descubre nuestra colección completa de productos para airsoft
                </Typography>
            </Box>

            <Box sx={{
                '& .slick-dots': {
                    bottom: '-35px',
                    '& li button:before': {
                        color: '#FF6B35',
                        fontSize: '12px'
                    },
                    '& li.slick-active button:before': {
                        color: '#FF6B35'
                    }
                },
                '& .slick-prev, & .slick-next': {
                    zIndex: 1,
                    '&:before': {
                        color: '#FF6B35',
                        fontSize: '20px'
                    }
                },
                '& .slick-prev': {
                    left: '-25px'
                },
                '& .slick-next': {
                    right: '-25px'
                }
            }}>
                {products.length > 0 && (
                <Slider {...sliderSettings}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
                    ))}
                </Slider>
                )}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/catalogo')}
                    sx={{
                        borderColor: '#FF6B35',
                        color: '#FF6B35',
                        '&:hover': {
                            borderColor: '#e55a2b',
                            backgroundColor: '#FF6B35',
                            color: 'white'
                        }
                    }}
                >
                    Ver Catálogo Completo
                </Button>
            </Box>
        </Container>
    );
};

// Componente de tarjeta de producto
const ProductCard = ({ product, formatPrice }) => (
    <Box sx={{ px: 1 }}>
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '400px',
                // cursor: 'grab',
                // transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                // '&:hover': {
                //     transform: 'translateY(-5px)',
                //     boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                // },
                // '&:active': {
                //     cursor: 'grabbing'
                // },
                position: 'relative'
            }}
        >
            {/* Badges - igual que en ProductCatalog */}
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
            </Box>

            <CardMedia
                component="img"
                height="150"
                width='100%'
                image={product.image}
                alt={product.name}
                sx={{
                    objectFit: 'cover',
                    borderRadius: '4px 4px 0 0',
                    filter: !product.inStock ? 'grayscale(100%)' : 'none',
                    opacity: !product.inStock ? 0.3 : 1
                }}
                loading='lazy'
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x250?text=Imagen+no+disponible";
                }}
            />
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        color: '#FF6B35',
                        fontWeight: 'bold',
                        backgroundColor: '#f5f5f5',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        mb: 1
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
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {product.description}
                </Typography>

                {/* Rating - igual que en ProductCatalog */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviews})
                    </Typography>
                </Box>

                {/* Precio - igual que en ProductCatalog */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            fontSize: '1.1rem'
                        }}
                    >
                        {formatPrice(product.price)}
                    </Typography>
                    {product.originalPrice && (
                        <Typography
                            variant="body2"
                            component="span"
                            sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary'
                            }}
                        >
                            {formatPrice(product.originalPrice)}
                        </Typography>
                    )}
                </Box>

                {/* Estado de stock */}
                {!product.inStock && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mt: 1, fontWeight: 'bold' }}
                    >
                        Agotado
                    </Typography>
                )}
            </CardContent>
        </Card>
    </Box>
);

export default SlickCatalogue;
