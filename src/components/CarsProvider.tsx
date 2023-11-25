import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Interface for a Car
export interface Car {
  id : string;
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

interface CarContextProps {
  cars: Car[];
  deleteCar: (carId: string) => void;
  addCar: (car:Car) => void;
  updateCar:(updatedCar: Car) => Car |void;
  viewCar:(carId:string) =>Car | void;
  getCar: (carName: string) => Car | undefined;
}

// Context object creation for CarProvider
const CarContext = createContext<CarContextProps | undefined/*specify data type for the Carcontext*/>(undefined);

// CarProvider component ->
export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  //const [cars/*current state value*/, setCars/*function to update the state*/] = useState<Car[]/*state will hold Car object*/>([]/*initial state*/);
  const addCar = (car: Car) => {
    setCars((prevCars) => [...prevCars, car]);
  };

  const deleteCar = (carId: string) => {
    setCars(cars.filter((car) => car.id !== carId));
  }

  const updateCar = (updatedCar: Car) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
    
  };

  const viewCar = (carId: string) => {
    const car = cars.find((car) => car.id === carId);
    if (car) {
      console.log(`Viewing details for car with ID ${car.id}:`, car);
      return car;
    }
  };
  const getCar = (carName: string) => {
    const car = cars.find((car) => car.name === carName);
    if (car) {
      console.log(`Viewing details for car with Name ${car.name}:`, car);
      return car;
    }
  };

  // Function to generate a random car object
  const generateRandomCar = (): Car => {
    const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'];
    const colors = ['Red', 'Blue', 'Green', 'Silver', 'Black'];
    const names = ['Camry', 'Civic', 'Accord', 'Mustang', 'X5'];
    const models = ['Sedan', 'SUV', 'Coupe'];
    const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
    const id = uuidv4();
    
    return {
      id,
      name: getRandomElement(names),
      model: getRandomElement(models),
      yearOfRelease: Math.floor(Math.random() * (2022 - 1990 + 1)) + 1990,
      brand: getRandomElement(brands),
      color: getRandomElement(colors),
    };
  };


  // useEffect to generate the cars array on component mount only once
  useEffect(() => {
    const generatedCars = Array.from({length:1000},()=>generateRandomCar());
    setCars(generatedCars);//to update the cars state with random value generated in generatedCars
  }, []);

// Provider component of CarContext is provided value
  return <CarContext.Provider value={{cars,addCar,deleteCar,updateCar,viewCar,getCar}}>{children}</CarContext.Provider>;
};
// Custom hook to use the CarContext
export const useCars = (): CarContextProps => {
  const context = useContext(CarContext);//here CarContext value is being consumed using useContext
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context as CarContextProps;
};

