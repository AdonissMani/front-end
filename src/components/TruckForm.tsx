// TruckForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Paper, IconButton } from '@mui/material';
import { useTrucksContext, Truck } from './TrucksProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, useFieldArray, Control } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';

interface TruckFormProps {
  isUpdate: boolean;
}

const TruckForm: React.FC<TruckFormProps> = ({ isUpdate }) => {
  const { addTruck, updateTruck, viewTruck, deleteTruck } = useTrucksContext();
  const { register, handleSubmit, setValue, control, formState: { errors } ,reset} = useForm<Truck>({
    defaultValues: isUpdate ? {} : {
      id: '',
      name: '',
      model: '',
      yearOfRelease: 0,
      brand: '',
      permits: [
        {
          permit_no: '',
          state: '',
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permits',
  });
  const { id }: { id?: string } = useParams();
  const navigate = useNavigate();

  const delay = (milliseconds: number | undefined) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  const initializeForm = async () => {
    if (isUpdate && id) {
      const truckData = viewTruck(id);
      if (truckData) {
        
        Object.keys(truckData).forEach((key) => {
          setValue(key as keyof Truck, truckData[key as keyof Truck]);
        });

        truckData.permits.forEach((permit, permitIndex) => {
          setValue(`permits.${permitIndex}.permit_no`, permit.permit_no);
          setValue(`permits.${permitIndex}.state`, permit.state);
        });
      } else {
        console.error("Error Fetching details");
        navigate('/trucks');
      }
    }
  };

  useEffect(() => {
    initializeForm();
  }, [isUpdate, id, viewTruck, navigate, setValue]);

  const onSubmit: SubmitHandler<Truck> = async (data) => {
    if (isUpdate) {
      console.log('Updating truck', data);
      const updated = updateTruck(data);
      await delay(1000);
      if (updated) {
        navigate('/trucks');
      } else {
        console.error('Update failed');
      }
    } else {
      console.log('New truck added', data);
      addTruck({
        ...data,
        id: uuidv4(),
      });
      navigate('/trucks');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Typography variant="h5" align="center">
              {isUpdate ? 'Update Truck' : 'Add Truck'}
            </Typography>

            <TextField
              label="Name"
              {...register('name', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? 'Name is required' : ''}
            />

            <TextField
              label="Model"
              {...register('model', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.model}
              helperText={errors.model ? 'Model is required' : ''}
            />

            <TextField
              label="Year of Release"
              type="number"
              {...register('yearOfRelease', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.yearOfRelease}
              helperText={errors.yearOfRelease ? 'Year of Release is required' : ''}
            />

            <TextField
              label="Brand"
              {...register('brand', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.brand}
              helperText={errors.brand ? 'Brand is required' : ''}
            />

            <div id='permits'>
              {fields.map((permit, permitIndex) => (
                <div key={permit.id} style={{ marginBottom: '10px' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Permit {permitIndex + 1}
                  </Typography>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        label={`Permit Number ${permitIndex + 1}`}
                        {...register(`permits.${permitIndex}.permit_no`, {
                          required: true,
                          maxLength: { value: 15, message: 'Permit length should be 15' },
                          minLength: { value: 15, message: 'Permit length should be 15' },
                        })}
                        fullWidth
                        margin="normal"
                        error={!!errors?.permits?.[permitIndex]?.permit_no}
                        helperText={errors?.permits?.[permitIndex]?.permit_no?.message || ''}
                      />

                      <TextField
                        label={`State ${permitIndex + 1}`}
                        {...register(`permits.${permitIndex}.state`, { required: true })}
                        fullWidth
                        margin="normal"
                        error={!!errors.permits?.[permitIndex]?.state}
                        helperText={errors?.permits?.[permitIndex]?.state?.message || ''}
                        />

                        <IconButton color='error' aria-label="delete" onClick={()=>remove(permitIndex)}>
                            <DeleteIcon />
                            </IconButton>

                    </div>

                </div>
              ))}
            </div>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => append({ permit_no: '', state: '' })}
              style={{ marginBottom: '10px' }}
            >
              Add Permit
            </Button>

            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" color="success" type="submit" style={{ marginRight: '10px' }}>
                {isUpdate ? 'Update Truck' : 'Save Truck'}
              </Button>

              <Button variant="outlined" color="error" onClick={() => navigate('/trucks')}>
                Cancel
              </Button>

              {isUpdate && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteTruck(id!);
                    navigate('/trucks');
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TruckForm;