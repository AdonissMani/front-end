import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from './CarsProvider';
import '../styles/CarsList.css';

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
  }, [id, viewCar]);

  // If carDetails is null, display 'Not Found'
  if (!carDetails) {
    return <div>Not Found</div>;
  }

  // Rendering the car details in a styled div
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
      }}
    >
      <h2>{`Car Details ${id}`}</h2>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{carDetails.name}</td>
          </tr>
          <tr>
            <td>Model:</td>
            <td>{carDetails.model}</td>
          </tr>
          <tr>
            <td>Year of Release:</td>
            <td>{carDetails.yearOfRelease}</td>
          </tr>
          <tr>
            <td>Brand:</td>
            <td>{carDetails.brand}</td>
          </tr>
          <tr>
            <td>Color:</td>
            <td>{carDetails.color}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CarDetailView;
