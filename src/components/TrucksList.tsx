// TrucksList.tsx
import React from 'react';
import { useTrucksContext } from './TrucksProvider';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Permit } from './TrucksProvider';
const TrucksList: React.FC = () => {
  const { trucks } = useTrucksContext();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'model', headerName: 'Model', flex: 1 },
    { field: 'yearOfRelease', headerName: 'Year', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    {
      field: 'permits',
      headerName: 'Permits',
      flex: 1,
      valueGetter: (params) => (params.row.permits as Permit[]).map((permit) => permit.state).join(', '),    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={trucks} columns={columns}/>
    </div>
  );
};

export default TrucksList;
