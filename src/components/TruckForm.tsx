
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useTrucksContext, Truck } from './TrucksProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface TruckFormProps {
  isUpdate: boolean;
}

const TruckForm: React.FC<TruckFormProps> = ({ isUpdate }) => {
  const { addTruck, updateTruck, viewTruck ,deleteTruck} = useTrucksContext();
  const [truck, setTruck] = useState<Truck>({
    id: '',
    name: '',
    model: '',
    yearOfRelease: 0,
    brand: '',
    permits: [],
  });

  const navigate = useNavigate();
  const { id }: { id?: string } = useParams();
  useEffect(() => {

    if (isUpdate && id) {

      const truckData = viewTruck(id);
      if (truckData) {
        setTruck(truckData);
      } else {
        console.log("Error Fetching details");
        navigate('/trucks');
      }
    }
  }, [isUpdate, id, viewTruck, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTruck((prevTruck) => ({
      ...prevTruck,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isUpdate) {
        console.log("Updating truck");
        updateTruck(truck);
    } else {
        console.log("New truck added")
      addTruck({
        ...truck,
        id: uuidv4(), 
      });
    }
    navigate('/trucks');
  };

  return (
    <div >
      <Typography variant="h5">{isUpdate ? 'Update Truck' : 'Add Truck'}</Typography>
      <TextField
        label="Name"
        name="name"
        value={truck.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Model"
        name="model"
        value={truck.model}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Year of Release"
        name="yearOfRelease"
        type="number"
        value={truck.yearOfRelease}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Brand"
        name="brand"
        value={truck.brand}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isUpdate ? 'Update Truck' : 'Save Truck'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/trucks')}>
        Cancel
      </Button>
      {isUpdate && (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            deleteTruck(truck.id);
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default TruckForm;