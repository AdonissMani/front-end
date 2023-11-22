import React from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useCars } from './CarsProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/CarsList.css';

const CarsList: React.FC = () => {
  const { cars, deleteCar, updateCar,viewCar } = useCars();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(`/cars/create`);
    console.log('Add button clicked');
  };

  const handleUpdate = (carId: string, name: string, model: string, yearOfRelease: string, brand: string, color: string) => {
    console.log("i am in handleUpdate");
    const carToUpdate = cars.find((car) => car.id === carId);

    if (carToUpdate) {
      navigate(`/cars/update/${carId}`);
      console.log(`Update button clicked for car with ID ${carId}`);
    } else {
      console.error(`Car with ID ${carId} not found`);
    }
  };

  const handleDelete = (carId: string) => {
    deleteCar(carId);
    console.log(`Delete button clicked for car with ID ${carId}`);
  };

  const handleView = (carId: string) => {
    console.log("i am in handleView")
    navigate(`/cars/view/${carId}/`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'yearOfRelease', headerName: 'Year of Release', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'color', headerName: 'Color', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params: GridCellParams) => (
        <>
          <Button
            variant="contained"
            style={{ backgroundColor: 'Green', color: '#fff', margin: '5px' }}
            onClick={() =>
              handleView(
                params.row.id
              )
            }
          >
            View
          </Button>

          <Button variant="outlined" onClick={() => handleUpdate(
                            params.row.id,
                            params.row.name,
                            params.row.model,
                            params.row.yearOfRelease,
                            params.row.brand,
                            params.row.color
            )} style={{ margin: '5px' }}>
            Update
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'Red', color: '#fff', margin: '5px' }}
            onClick={() => handleDelete(params.row.id)}
          >
            Del
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', color: 'black' }}>
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ margin: '10px' }}>
        Add Car
      </Button>
      <DataGrid rows={cars} columns={columns} />
    </div>
  );
};

export default CarsList;
