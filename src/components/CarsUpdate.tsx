// CarDetailView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from './CarsProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/CarsList.css';
import { Car } from './CarsProvider'; 
import { useNavigate } from "react-router-dom";

interface CarFormInput {
  name: string;
  model: string;
  yearOfRelease: string;
  brand: string;
  color: string;
}

const CarDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { viewCar, updateCar } = useCars();
  const [carDetails, setCarDetails] = useState<CarFormInput | null>(null);
  const { register, handleSubmit, setValue } = useForm<CarFormInput>();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          const car = await viewCar(id);

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
    <div
      className="car-details-card"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: '#1976d2',
        // Adjust the zIndex as needed
      }}
    >
      <h2>{`Edit Car Details ${id}`}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name')} defaultValue={carDetails.name} />
        </div>
        <div>
          <label>Model:</label>
          <input {...register('model')} defaultValue={carDetails.model} />
        </div>
        <div>
          <label>Year of Release:</label>
          <input {...register('yearOfRelease')} defaultValue={carDetails.yearOfRelease} />
        </div>
        <div>
          <label>Brand:</label>
          <input {...register('brand')} defaultValue={carDetails.brand} />
        </div>
        <div>
          <label>Color:</label>
          <input {...register('color')} defaultValue={carDetails.color} />
        </div>
        <button type="submit">Update Car Details</button>
      </form>
    </div>
  );
};

export default CarDetailView;
