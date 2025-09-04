import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import '../styles/SliderDots.css';
import {
  Box,
  Container,
  Typography,
  Button
} from '@mui/material';

const slidesData = [
  {
    image: "/images/heroes/slider1.webp",
    title: "RÉPLICAS CUAUHTÉMOC",
    subtitle: "Tu aliado en la batalla",
    buttonText: "Realizar Pedido",
    target: "/guia",
    fetchpriority: "high",
  },
  {
    image: "/images/heroes/slider2.webp",
    title: "Equípate",
    subtitle: "Contamos con productos de alta calidad",
    buttonText: "Catálogo",
    target: "/catalogo",
  },
  {
    image: "/images/heroes/slider3.webp",
    title: "Forma parte de la comunidad",
    subtitle: "Estamos para ayudarte",
    buttonText: "Contacto",
    target: "/contacto",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,  // Tiempo en milisegundos (1000ms = 3 segundos)
    dotsClass: "slick-dots custom-dots",  // Añadir clase personalizada para los dots
};


const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 0,
        textAlign: 'center',
        mt: 8,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, rgba(44, 62, 45, 0.1) 0%, rgba(80, 108, 44, 0.05) 50%, rgba(175, 189, 119, 0.1) 100%)',
          zIndex: 0,
          animation: 'glow 6s ease-in-out infinite',
        }
      }}
    >
      <Slider {...settings}>
        {slidesData.map((slide, i) => (
          <Box
            key={i}
            sx={{
              position: 'relative',
              height: { xs: 450, md: 550 },
              overflow: 'hidden',
              borderRadius: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.7) 0%, rgba(27, 42, 28, 0.4) 100%)',
                zIndex: 2,
              }
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={`imagen-${i}`}
              sx={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                position: 'absolute',
                top: '-5%',
                left: '-5%',
                zIndex: 0,
                transition: 'transform 8s ease-out',
                transform: 'scale(1.05)',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            />

            {/* Efectos decorativos */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'pulse 4s ease-in-out infinite',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: '8%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(175, 189, 119, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'pulse 6s ease-in-out infinite reverse',
              }}
            />

            {/* Contenido del texto */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}
            >
              <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h1"
                  component="h1"
                  className="animate-fade-in-up"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #AFBD77 50%, #b9ff5d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2.2rem', md: '3.5rem', lg: '4rem' },
                    letterSpacing: '-0.02em',
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  className="animate-fade-in-up"
                  sx={{
                    mb: 4,
                    color: '#F5F5F5',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                    fontSize: { xs: '1.1rem', md: '1.4rem', lg: '1.6rem' },
                    fontWeight: 300,
                    letterSpacing: '0.5px',
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.4,
                    animationDelay: '0.2s',
                  }}
                >
                  {slide.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  className="animate-fade-in-up"
                  onClick={() => {
                    if (slide.target) {
                      if (slide.target.startsWith("http")) {
                        window.open(slide.target, "_blank");
                      } else {
                        navigate(slide.target);
                      }
                    }
                  }}
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #AFBD77 0%, #8FA055 100%)',
                    borderRadius: '50px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    textTransform: 'none',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 32px rgba(175, 189, 119, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    animationDelay: '0.4s',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.6s',
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #506C2C 0%, #2C3E2D 100%)',
                      transform: 'translateY(-4px) scale(1.01)',
                      boxShadow: '0 12px 40px rgba(80, 108, 44, 0.5)',
                      '&::before': {
                        left: '100%',
                      }
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(1.02)',
                    }
                  }}
                >
                  {slide.buttonText}
                </Button>
              </Container>
            </Box>
          </Box>
        ))
        }
      </Slider >
    </Box >
  );
};

export default HeroSection;
