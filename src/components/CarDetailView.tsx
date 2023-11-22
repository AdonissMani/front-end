import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CarsList.css';

const CarDetailView: React.FC = () => {
  const { id, name, model, yearOfRelease, brand, color } = useParams<{
    id: string;
    name: string;
    model: string;
    yearOfRelease: string;
    brand: string;
    color: string;
  }>();

  // You can display the details in a table here:
  return (
    <div className="car-details-card" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor:'#1976d2',
         // Adjust the zIndex as needed
      }}>
      <h2>{`Car Details for ID: ${id}`}</h2>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Model:</td>
            <td>{model}</td>
          </tr>
          <tr>
            <td>Year of Release:</td>
            <td>{yearOfRelease}</td>
          </tr>
          <tr>
            <td>Brand:</td>
            <td>{brand}</td>
          </tr>
          <tr>
            <td>Color:</td>
            <td>{color}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CarDetailView;
