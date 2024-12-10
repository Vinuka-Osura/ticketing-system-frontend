import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Box, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon, Card, Collapse,} from '@mui/material';
import { Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import NAVIGATION from './components/navigate.jsx';
import HeaderTitles from './components/function-heads.jsx'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const CustomerDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = sessionStorage.getItem('username') || 'User';

  const [openStates, setOpenStates] = React.useState({});

  const handleToggle = (title) => {
    setOpenStates((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = () => {

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    navigate('/login');

  };

  const renderNavigation = () =>
    NAVIGATION.map((item, index) => {
      if (item.kind === 'header') {
        return (
          <Typography
            key={index}
            variant="subtitle2"
            sx={{ padding: '8px 16px', fontWeight: 'bold', color: 'gray' }}
          >
            {item.title}
          </Typography>
        );
      }

      if (item.kind === 'divider') {
        return <Divider key={index} />;
      }

      if (item.children) {
        const isOpen = openStates[item.title] || false;
        return (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleToggle(item.title)}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.title} />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child, idx) => (
                  <ListItem
                    key={idx}
                    button
                    sx={{ pl: 4 }}
                    onClick={() => navigate(`/${item.segment}/${child.segment}`)}
                  >
                    {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                    <ListItemText primary={child.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      return (
        <ListItem
          key={index}
          button
          onClick={() => navigate(`/${item.segment}`)}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.title} />
        </ListItem>
      );
    });

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          border: '1px solid #cacaca',
          width: '100%',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <Box
            component="img"
            sx={{ width: '257px', height: '40px', objectFit: 'contain' }}
            alt="Logo"
          />
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
          <Tooltip title="Home">
          <IconButton onClick={() => navigate("/home")}>
              <HomeOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Box display="flex" alignItems="center" gap={1}>
            <AccountCircleIcon />
            <Typography>{loggedInUser}</Typography>
            <Tooltip title="Logout" arrow>
              <IconButton edge="end" color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open
        sx={{
          width: '290px',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: '290px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>{renderNavigation()}</List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          height: '100vh',
          //overflow: 'hidden',
        }}
      >
        <Card sx={{ height: '100%', p: 3 }}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" sx={{ textAlign: 'left' }}>
                {HeaderTitles[location.pathname]}
              </Typography>
            </Grid>
            <Grid item>
              <Outlet />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerDashboardLayout;
