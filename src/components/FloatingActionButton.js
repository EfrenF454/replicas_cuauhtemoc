import React from 'react';
import {
  Fab
} from '@mui/material';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

const FloatingActionButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fab
      aria-label="scroll back to top"
      onClick={scrollToTop}
      sx={{
        background: 'linear-gradient(135deg, #AFBD77 0%, #8FA055 100%)',
        color: '#FFFFFF',
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        boxShadow: '0 8px 24px rgba(175, 189, 119, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        display: { xs: 'flex', md: 'none' }, // 👈 solo visible en móvil
        '&:hover': {
          background: 'linear-gradient(135deg, #506C2C 0%, #2C3E2D 100%)',
          transform: 'translateY(-4px) scale(1.1)',
          boxShadow: '0 12px 32px rgba(80, 108, 44, 0.4)',
          '& .MuiSvgIcon-root': {
            transform: 'translateY(-2px)',
          }
        },
        '&:active': {
          transform: 'translateY(-2px) scale(1.05)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        }
      }}
    >
      <KeyboardArrowUpIcon sx={{
        fontSize: '1.8rem',
        transition: 'all 0.3s ease',
      }} />
    </Fab>
  );
};

export default FloatingActionButton;
