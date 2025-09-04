import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3E2D', // Verde militar oscuro
      light: '#506C2C', // Verde militar
      dark: '#1B2A1C', // Verde muy oscuro
      blue: '#1d4ed8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#AFBD77', // Verde militar claro
      light: '#C8D591',
      dark: '#8FA055',
      blue: '#163ca3',
      contrastText: '#000000',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E2D',
      secondary: '#555555',
    },
    accent: {
      gold: '#D4AF37', // Dorado militar
      bronze: '#CD7F32',
      beige: '#D2B48C',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': {
        fontSize: '2.8rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.2rem',
      },
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:900px)': {
        fontSize: '2.2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.6rem',
      },
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.12)',
    '0px 8px 16px rgba(0,0,0,0.14)',
    '0px 12px 24px rgba(0,0,0,0.16)',
    '0px 16px 32px rgba(0,0,0,0.18)',
    '0px 20px 40px rgba(0,0,0,0.20)',
    '0px 24px 48px rgba(0,0,0,0.22)',
    '0px 28px 56px rgba(0,0,0,0.24)',
    '0px 32px 64px rgba(0,0,0,0.26)',
    '0px 36px 72px rgba(0,0,0,0.28)',
    '0px 40px 80px rgba(0,0,0,0.30)',
    '0px 44px 88px rgba(0,0,0,0.32)',
    '0px 48px 96px rgba(0,0,0,0.34)',
    '0px 52px 104px rgba(0,0,0,0.36)',
    '0px 56px 112px rgba(0,0,0,0.38)',
    '0px 60px 120px rgba(0,0,0,0.40)',
    '0px 64px 128px rgba(0,0,0,0.42)',
    '0px 68px 136px rgba(0,0,0,0.44)',
    '0px 72px 144px rgba(0,0,0,0.46)',
    '0px 76px 152px rgba(0,0,0,0.48)',
    '0px 80px 160px rgba(0,0,0,0.50)',
    '0px 84px 168px rgba(0,0,0,0.52)',
    '0px 88px 176px rgba(0,0,0,0.54)',
    '0px 92px 184px rgba(0,0,0,0.56)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 32px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;
