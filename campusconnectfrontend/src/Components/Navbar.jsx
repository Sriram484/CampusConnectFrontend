import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { HashLink as Link } from 'react-router-hash-link';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import "../Assets/CSS/Nav.css"
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router';
import { useFormData } from './Context/UserData';

const drawerWidth = 240;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,  // Default small breakpoint
      md: 900,
      lg: 1200,
      xl: 1536,
      custom: 650,  // Custom breakpoint at 650px
    },
  },
});


function NavBar() {


  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [appBarBg, setAppBarBg] = React.useState('transparent');
  const location = useLocation();

  const { formData,setFormData } = useFormData() || { formData: {} };
  console.log(formData);

  // Determine which item to show in the navigation
  const userNavItem = formData.name === ''
    ? { name: 'Login/Register', path: '/login' }
    : { name: 'Profile', path: '/profile' };
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Course', path: '/course' },
    { name: 'Contact Us', path: '/contact' },
    userNavItem,
    ...(formData.type === 'admin' ? [{ name: 'Dashboard', path: '/dashboard' }] : [])
  ];

  React.useEffect(() => {
    if (window.scrollY > 0 || location.pathname === '/course' || location.pathname === '/contact' || location.pathname === '/profile' || location.pathname === '/dashboard') {
      setAppBarBg('black')
    }
    else {
      setAppBarBg('transparent')
    }
  }, [location])


  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 0 || location.pathname === '/course' || location.pathname === '/contact' || location.pathname === '/profile' || location.pathname === '/dashboard') {
      setAppBarBg('black')
    }
    else {
      setAppBarBg('transparent')
    }
  };

  window.addEventListener('scroll', handleScroll)

  const scrollWithOffset = (el) => {
    const yOffset = -50; // Adjust the offset value based on your fixed header height
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setFormData({}); // Clear user data
    window.location.reload(); // Refresh the page
  };



  const drawer = (
    <ThemeProvider theme={theme}>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Campus Connect
        </Typography>
        <Divider />
        <List>
          {navItems.map(({ name, path }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} >
                <ListItemText
                  onClick={() => navigate(path, { replace: true })}
                // onClick={() => handleNavigation(path)}
                >
                  <Link smooth style={{ textDecoration: 'none', color: 'inherit' }} scroll={el => scrollWithOffset(el)}>
                    {name}
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          {formData.name && (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                <ListItemText>
                  <Link smooth style={{ textDecoration: 'none', color: 'inherit' }}>
                    Logout
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}

        </List>
      </Box>
    </ThemeProvider>
  );

  const container = window.document.body;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" position="fixed" sx={{ backgroundColor: appBarBg, boxShadow: 'none', borderBottom: 'none' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Campus Connect
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map(({ name, path }) => (
                <Button key={name}
                  sx={{
                    color: 'rgba(248, 248, 248, 1)',
                    '&:hover': {
                      color: '#f5a425',
                    },
                  }}
                  onClick={() => navigate(path, { replace: true })}
                // onClick={() => handleNavigation(path)}

                >
                  <div smooth style={{ textDecoration: 'none', color: 'inherit' }} scroll={el => scrollWithOffset(el)}>
                    {name}
                  </div>
                </Button>
              ))}
              {formData.name && (
                <Button key={formData.name}
                  sx={{
                    color: 'rgba(248, 248, 248, 1)',
                    '&:hover': {
                      color: '#f5a425',
                    },
                  }}
                  onClick={handleLogout}
                >
                  <div smooth style={{ textDecoration: 'none', color: 'inherit' }} scroll={el => scrollWithOffset(el)}>
                    Logout
                  </div>
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </ThemeProvider>

  );
}



export default NavBar;
