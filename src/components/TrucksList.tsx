// TrucksList.tsx
import React from 'react';
import { useTrucksContext } from './TrucksProvider';
import { DataGrid, GridColDef ,GridCellParams} from '@mui/x-data-grid';
import { Permit } from './TrucksProvider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const TrucksList: React.FC = () => {

  const { trucks,addTruck,updateTruck,deleteTruck,viewTruck } = useTrucksContext();
  const navigate = useNavigate();

  const handleAdd=()=>{
    navigate('/trucks/create');
    console.log("i am handleAdd");
  }
  const handleUpdate = (truckId:string) =>{
    navigate(`/trucks/update/${truckId}`);
    console.log("i am handleUpdate");
  }
  const handleDelete = (truckId:string) =>{
    deleteTruck(truckId);
    console.log("i am handleDelete");
  }
  const handleView = (truckId:string) =>{
    navigate(`/trucks/view/${truckId}`);
    console.log("i am handleView");
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'model', headerName: 'Model', flex: 1 },
    { field: 'yearOfRelease', headerName: 'Year', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    {
      field: 'permits',
      headerName: 'Permits',
      flex: 1,
      valueGetter: (params) => (params.row.permits as Permit[]).map((permit) => permit.state).join(', '),    
    },
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
                            params.row.id
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
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ margin: '10px' }}>
        Add Truck
      </Button>
      <DataGrid rows={trucks} columns={columns}/>
    </div>
  );
};

export default TrucksList;
