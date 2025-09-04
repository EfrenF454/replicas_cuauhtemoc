import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const ScrollHideBox = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para controlar si se ha hecho scroll

  useEffect(() => {
    // Función para manejar el evento de scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Se hace scroll hacia abajo
      } else {
        setIsScrolled(false); // Se vuelve hacia arriba
      }
    };

    // Añadimos el listener para el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiamos el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,  // Asegura que se quede por encima del contenido al hacer scroll
        backgroundColor: 'background.paper',  // Da color de fondo para evitar que se vea transparente cuando hace scroll
        boxShadow: 1,  // Sombra para dar profundidad
        mb: 3, // Margen inferior para separar del contenido al hacer scroll
        py: 2, // Padding en vertical
        display: isScrolled ? 'none' : 'block', // Si se ha hecho scroll, ocultamos el Box
        transition: 'all 0.3s ease', // Añadimos una transición suave para ocultar/mostrar el Box
      }}
    >
      <Typography variant="h4" component="h1">
        Administrador de Productos
      </Typography>
    </Box>
  );
};

export default ScrollHideBox;
