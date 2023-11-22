// TrucksProvider.tsx
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Permit {
  permit_no: number;
  state: string;
}

interface Truck {
  id: string;
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  permits: Permit[];
}

interface TrucksContextType {
  trucks: Truck[];
}

const TrucksContext = createContext<TrucksContextType | undefined>(undefined);

export const TrucksProvider: React.FC<{ children: ReactNode }> = ({ children })=> {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  const generateRandomPermit = (): Permit => {
    const state = ['State A','State C','State B','State D']
    const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    return {
      permit_no: Math.floor(Math.random() * 1000),
      state: getRandomElement(state),
    };
  };

  const generateRandomTruck = (): Truck => {
    const name =['Name A', 'Name B', 'Name C', 'Name D', 'Name E'];
    const model=['ModelA', 'ModelB', 'ModelC', 'ModelD', 'ModelE'];
    const brand = ['Brand A','Brand B','Brand C'];
    const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
    const id = uuidv4();

    const permits: Permit[] = Array.from({ length: 3 }, () => generateRandomPermit());

    return {
      id,
      name: getRandomElement(name),
      model: getRandomElement(model),
      yearOfRelease: Math.floor(Math.random() * (2022 - 1990 + 1)) + 1990,
      brand: getRandomElement(brand),
      permits,
    };
  };

  useEffect(() => {
    const generatedTrucks = Array.from({ length: 1000 }, () => generateRandomTruck());
    setTrucks(generatedTrucks);
  }, []);

  return <TrucksContext.Provider value={{ trucks }}>{children}</TrucksContext.Provider>;
};

export const useTrucksContext = () => {
  const context = useContext(TrucksContext);
  if (!context) {
    throw new Error('useTrucksContext must be used within a TrucksProvider');
  }
  return context;
};
