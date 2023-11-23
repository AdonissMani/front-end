import { useParams } from "react-router-dom";
import { Permit, useTrucksContext } from "./TrucksProvider";
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TruckView: React.FC = () => {
  // to extract id from url
  const { id } = useParams<{ id: string | undefined }>();
  // using useTrucksContext hook to use Truck context and viewTruck function 
  const { viewTruck } = useTrucksContext();

  // state to hold the detail of the truck being viewed
  const [truckDetail, setTruckDetail] = useState<{
    name: string;
    model: string;
    yearOfRelease: number;
    brand: string;
    permits: Permit[];
  } | null>(null);

  useEffect(() => {
    const fetchTruckDetail = () => {
      try {
        if (id) {
          const truck = viewTruck(id);

          if (truck) {
            setTruckDetail({
              name: truck.name,
              model: truck.model,
              yearOfRelease: truck.yearOfRelease,
              brand: truck.brand,
              permits: truck.permits,
            })
          }
          else {
            console.log(`Truck with ID ${id} not found`);
          }
        } else {
          console.log(`ID not found`);
        }
      } catch (error) {
        console.error('Error fetching Truck detail:', error);
      }
    };
    fetchTruckDetail();
  }, [id, viewTruck]);

  return (
    <div>
      {truckDetail && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, border:0}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ border:1, backgroundColor:'#bdbdbd'}}>Name&nbsp;</TableCell>
                <TableCell sx={{ border:1, backgroundColor:'#bdbdbd'}} align="right">Model&nbsp;</TableCell>
                <TableCell sx={{ border:1, backgroundColor:'#bdbdbd'}} align="right">Year of Release&nbsp;</TableCell>
                <TableCell sx={{ border:1, backgroundColor:'#bdbdbd'}} align="right">Brand&nbsp;</TableCell>
                <TableCell sx={{ border:1, backgroundColor:'#bdbdbd'}} align="right">Permits&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={truckDetail.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {truckDetail.name}
                </TableCell>
                <TableCell align="right">{truckDetail.model}</TableCell>
                <TableCell align="right">{truckDetail.yearOfRelease}</TableCell>
                <TableCell align="right">{truckDetail.brand}</TableCell>
                <TableCell align="right">{truckDetail.permits.map(permit => permit.state).join(', ')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TruckView;
