import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarProvider } from './components/CarsProvider';
import { TrucksProvider } from './components/TrucksProvider';
import Navbar from './components/Navbar';
import CarsList from './components/CarsList';
import TrucksList from './components/TrucksList';
import CarsCreate from './components/CarsCreate';
import CarsUpdate from './components/CarsUpdate';
import CarsDetailView from './components/CarDetailView';
import TruckForm from './components/TruckForm';
import TruckView from './components/TruckView';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/cars/*"
            element={
              <CarProvider>
                <Routes>
                  <Route path="/" element={<CarsList />} />
                  <Route path="/update/:id" element={<CarsUpdate />} />
                  <Route path="/view/:id" element={<CarsDetailView />} />
                  <Route path="/create" element={<CarsCreate />} />
                </Routes>
              </CarProvider>
            }
          />
          <Route
            path="/trucks/*"
            element={
              <TrucksProvider>
                <Routes>
                  <Route path="/" element={<TrucksList />} />
                  <Route path="/view/:id" element={<TruckView />} />
                  <Route path="/create" element={<TruckForm isUpdate={false} />} />
                  <Route path="/update/:id" element={<TruckForm isUpdate={true} />} />
                </Routes>
              </TrucksProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
