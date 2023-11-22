import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from './CarsProvider';
import '../styles/CarsList.css';

const CarDetailView: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { viewCar } = useCars();
  const [carDetails, setCarDetails] = useState<{
    name: string;
    model: string;
    yearOfRelease: string;
    brand: string;
    color: string;
  } | null>(null);

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
  }, [id, viewCar]);

  if (!carDetails) {
    return <div>Not Found</div>;
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
