import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Clear as ClearIcon } from '@mui/icons-material';


export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(isOpen);
  };

  return (

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Vehicle store
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <List>
            <ListItemButton component={Link} to="/cars">
              <ListItemText primary="Cars" />
            </ListItemButton>
            <ListItemButton component={Link} to="/trucks">
              <ListItemText primary="Trucks" />
            </ListItemButton>
          </List>
          <div>
            <IconButton onClick={toggleDrawer(false)} color='error'>
              <ClearIcon />
              </IconButton>
          </div>
        </Drawer>
      </Box>
  );
}

export default Navbar;
