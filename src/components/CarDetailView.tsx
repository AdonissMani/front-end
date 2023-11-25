import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from './CarsProvider';
import '../styles/CarsList.css';
import { Grid, Paper, Typography } from '@mui/material';

const CarDetailView: React.FC = () => {
  // Extracting the 'id' parameter from the URL using useParams
  const { id } = useParams<{ id: string | undefined }>();

  // Using the useCars hook to get access to the cars context and viewCar function
  const { viewCar } = useCars();

  // State to hold the details of the car being viewed
  const [carDetails, setCarDetails] = useState<{
    name: string;
    model: string;
    yearOfRelease: string;
    brand: string;
    color: string;
  } | null>(null);

  // useEffect hook to fetch car details when the component mounts or 'id' changes
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          // Using the viewCar function to get details of the car with the given 'id'
          const car = viewCar(id);

          if (car) {
            // Updating the state with the fetched car details
            setCarDetails({
              name: car.name,
              model: car.model,
              yearOfRelease: car.yearOfRelease.toString(),
              brand: car.brand,
              color: car.color,
            });
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

    // Calling the fetchCarDetails function when the component mounts or 'id' changes
    fetchCarDetails();
  }, [id, viewCar]/*dependencies their change will execute useEffect to re run*/);

  // If carDetails is null, display 'Not Found'
  if (!carDetails) {
    return <div>Not Found</div>;
  }


  return (
    <Paper
    className="car-details-card"
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      padding: '20px',
    }}
  >
    <Typography variant="h5">{`Car Details `}</Typography>
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      <Grid item xs={6}>
        <Typography>Name:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{carDetails.name}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Model:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{carDetails.model}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Year of Release:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{carDetails.yearOfRelease}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Brand:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{carDetails.brand}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Color:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{carDetails.color}</Typography>
      </Grid>
    </Grid>
  </Paper>
  );
};

export default CarDetailView;
