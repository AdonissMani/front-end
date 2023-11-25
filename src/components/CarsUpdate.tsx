// CarDetailView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from './CarsProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/CarsList.css';
import { Car } from './CarsProvider'; 
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CarFormInput {
  name: string;
  model: string;
  yearOfRelease: string;
  brand: string;
  color: string;
}

const CarDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { viewCar, updateCar ,deleteCar} = useCars();
  const [carDetails, setCarDetails] = useState<CarFormInput | null>(null);
  const { register, handleSubmit, setValue } = useForm<CarFormInput>(); 
  const navigate = useNavigate();

  const delay = (milliseconds: number | undefined) => {
    return new Promise((resolve) => {
      console.log("delay for 1000ms")
      setTimeout(resolve, milliseconds);
    });
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {

        if (id) {
          const car = viewCar(id);

          if (car) {
            setCarDetails({
              name: car.name,
              model: car.model,
              yearOfRelease: car.yearOfRelease.toString(),
              brand: car.brand,
              color: car.color,
            });

            // Populate form fields with car details
            setValue('name', car.name);
            setValue('model', car.model);
            setValue('yearOfRelease', car.yearOfRelease.toString());
            setValue('brand', car.brand);
            setValue('color', car.color);
          } else {
            console.error(`Car with ID ${id} not found`);
          }
        } else {
          console.error('ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id, viewCar, setValue]);

  const onSubmit: SubmitHandler<CarFormInput> = async (data) => {

    try {
      const updatedCar: Car = {
        id: id || '',
        ...data,
        yearOfRelease: parseInt(data.yearOfRelease, 10),
      };
      await delay(1000);
      // Update car details
      updateCar(updatedCar);
      navigate(`/cars`);

      console.log('Car details updated successfully:', updatedCar);
    } catch (error) {
      console.error('Error updating car details:', error);
    }
  };

  if (!carDetails) {
    return <div>Loading...</div>;
  }



  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
    <Grid item xs={10} sm={8} md={6} lg={4}>
      <Paper elevation={3} style={{ padding: '25px' }}>
        <h2>{`Editing Car`}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

              <TextField 
              label="Name"
              {...register('name')} 
              margin="normal"
              defaultValue={carDetails.name} fullWidth />

              <TextField 
              label="Model" 
              {...register('model')} 
              defaultValue={carDetails.model}
              margin="normal"
                fullWidth />

              <TextField
                label="Year of Release"
                {...register('yearOfRelease')}
                defaultValue={carDetails.yearOfRelease}
                margin="normal"
                fullWidth
              />

              <TextField 
              label="Brand" 
              {...register('brand')} 
              defaultValue={carDetails.brand}
              margin="normal" 
              fullWidth />

              <TextField 
              label="Color" 
              {...register('color')} 
              defaultValue={carDetails.color} 
              margin="normal"
              fullWidth />

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '-1px' }}>
            Update
          </Button>
          <IconButton
            onClick={() => {
              deleteCar(id!)
              navigate('/cars');
            }}
            color="error"
            
          >
            <DeleteIcon/>
          </IconButton>
        </form>
      </Paper>
    </Grid>
  </Grid>
  );
};

export default CarDetailView;
