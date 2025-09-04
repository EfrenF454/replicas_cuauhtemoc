import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';

const buttonStyles = {
  color: '#2C3E2D',
  fontWeight: 600,
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(175, 189, 119, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    color: '#FFFFFF',
    backgroundColor: '#506C2C',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(80, 108, 44, 0.3)',
    '&::before': {
      left: '100%',
    },
  }
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: 'Inicio',
      path: '/',
      onClick: () => navigate('/')
    },
    {
      label: 'Catálogo',
      path: '/catalogo',
      onClick: () => navigate('/catalogo')
    },
    // {
    //   label: 'Sobre Nosotros',
    //   path: '#sobre-nosotros',
    //   onClick: () => document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' })
    // },
    {
      label: 'Contacto',
      path: '/contacto',
      onClick: () => navigate('/contacto')
    },
    {
      label: 'Login',
      path: '/admin',
      onClick: () => navigate('/admin')
    },
  ];

  const catalogSubmenuItems = [
    { label: 'Todos los productos', onClick: () => navigate('/catalogo') },
    { label: 'Armas', onClick: () => navigate('/catalogo?categoria=armas') },
    { label: 'Accesorios', onClick: () => navigate('/catalogo?categoria=accesorios') },
  ];


  const [catalogSubmenuOpen, setCatalogSubmenuOpen] = useState(false);


  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: 'linear-gradient(135deg, #2C3E2D 0%, #1B2A1C 100%)',
        backdropFilter: 'blur(20px)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
      role="presentation"
    >
      <Box sx={{
        p: 3,
        borderBottom: '3px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Box
          component="img"
          src="/Footer-512x512.png"
          alt="Logo RÉPLICAS CUAUHTÉMOC"
          sx={{
            ml: 2,
            height: 50,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'brightness(1.1) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
          }}
        />
      </Box>

      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={
                  item.hasSubmenu
                    ? () => setCatalogSubmenuOpen(!catalogSubmenuOpen)
                    : () => {
                      item.onClick();
                      setDrawerOpen(false);
                    }
                }
                sx={{
                  mx: 2,
                  borderRadius: 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: location.pathname === item.path ? 'rgba(210, 227, 143, 0.2)' : 'transparent', //color del item seleccionado
                  '&:hover': {
                    backgroundColor: 'rgba(210, 227, 143, 0.3)',
                    transform: 'translateX(8px)',
                    '& .MuiListItemText-primary': {
                      color: 'rgb(255, 255, 255)',
                      fontWeight: 600,
                    }
                  }
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '1.1rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      color: location.pathname === item.path ? '#AFBD77' : 'inherit', //color de texto del item seleccionado
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <Box
        component="img"
        src="/logo_simple.png"
        alt="Logo RÉPLICAS CUAUHTÉMOC"
        sx={{
          ml: 0,
          mb: 3,
          height: 100,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          opacity: 0.4,
          filter: 'brightness(1.1) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
        }}
      />
    </Box>

  );


  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(44, 62, 45, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1
      }}>
        {isMobile && (
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: '#505C2C',
                color: '#FFFFFF',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(175, 189, 119, 0.3)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{
          display: { xs: 'flex', sm: 'block' },       // flex solo en mobile
          justifyContent: { xs: 'center', sm: 'flex-start' },
          width: '100%'
        }}>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              component="img"
              src="/android-chrome-512x512.png"
              alt="Logo RÉPLICAS CUAUHTÉMOC"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                height: 45,
                width: 140,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
                '&:hover': {
                  filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.15))',
                }
              }}
            />
          </Link>
        </Box>
        {isMobile && (
          <Drawer

            anchor='left'
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {!isMobile && (
          <>
            <Typography
              variant="h6" sx={{
                color: 'white',
                fontWeight: 'bold',
                flexGrow: 1,
                '&:hover': {
                  color: '#506C2C',
                  cursor: 'pointer',

                }
              }}>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{
                    ...buttonStyles,
                    color: location.pathname === item.path ? '#506C2C' : '#506C2C',
                    borderBottom: location.pathname === item.path ? '2px solid #506C2C' : 'none'
                  }}
                  onClick={item.onClick}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
