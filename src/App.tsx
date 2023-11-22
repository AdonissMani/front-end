import React, { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar'
import Home from './components/Home';
import { CarProvider } from './components/CarsProvider';

const App: React.FC = () => {
  return (
    <div>
      <CarProvider>
      <Navbar/>
      </CarProvider>
  </div>
  );
}

export default App;