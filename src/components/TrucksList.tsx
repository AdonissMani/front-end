// TrucksList.tsx
import React from 'react';
import { useTrucksContext } from './TrucksProvider';
import { DataGrid, GridColDef ,GridCellParams, GridRowParams} from '@mui/x-data-grid';
import { Permit } from './TrucksProvider';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="edit" onClick={() => handleUpdate(params.row.id)}>
              <EditIcon />
            </IconButton>
          </div>


          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            color='error'
          >
            <DeleteIcon/>
          </IconButton>
        </>
      ),
    },
  ];

  const handleRowDoubleClick = (params: GridRowParams) => {
    handleUpdate(params.row.id);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ margin: '10px' }}>
        Add Truck
      </Button>
      <DataGrid rows={trucks} columns={columns} onRowDoubleClick={handleRowDoubleClick}/>
    </div>
  );
};

export default TrucksList;
