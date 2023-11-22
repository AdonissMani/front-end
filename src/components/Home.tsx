import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CarProvider } from './CarsProvider';
import { TrucksProvider } from './TrucksProvider';
import CarsList from './CarsList';
import TrucksList from './TrucksList';

export interface HomeProps {}


export function Home(props: HomeProps) {
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
    
      
        <div className="App">
          <h2>I am Home</h2>
        </div>
      
    
  );
}

export default Home;
