import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useCars } from "./CarsProvider";
import { v4 as uuidv4 } from 'uuid';


interface IFormInput {
  Name: string;
  Model: string;
  YearOfRelease: number;
  Brand: string;
  Color: string;
}

const CarsCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const { addCar } = useCars();

  const onSubmit = (data: IFormInput) => {
    addCar({
      id: uuidv4(),
      name: data.Name,
      model: data.Model,
      yearOfRelease: Number(data.YearOfRelease),
      brand: data.Brand,
      color: data.Color,
    });
    navigate(`/cars`);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '80%', maxWidth: '500px', textAlign: 'center' }}>
        <h1>Create a Car</h1>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Name"
            {...register('Name', { required: true, maxLength: 10 })}
            error={!!errors.Name}
            helperText={errors.Name?.type === 'required' ? 'This field is required' : 'Name cannot exceed 10 characters'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            fullWidth
            label="Model"
            {...register('Model', { required: true, maxLength: 10 })}
            error={!!errors.Model}
            helperText={errors.Model?.type === 'required' ? 'This field is required' : 'Model cannot exceed 10 characters'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            fullWidth
            label="Year of Release"
            type="number"
            {...register('YearOfRelease', { required: true, min: 2000 })}
            error={!!errors.YearOfRelease}
            helperText={errors.YearOfRelease?.type === 'required' ? 'This field is required' : 'Year of Release should be greater than 2000'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            fullWidth
            label="Brand"
            {...register('Brand', { required: true, maxLength: 10 })}
            error={!!errors.Brand}
            helperText={errors.Brand?.type === 'required' ? 'This field is required' : 'Brand cannot exceed 10 characters'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            fullWidth
            label="Color"
            {...register('Color', { required: true, maxLength: 10 })}
            error={!!errors.Color}
            helperText={errors.Color?.type === 'required' ? 'This field is required' : 'Color cannot exceed 10 characters'}
          />
        </div>
        <Button type="submit" variant="contained" disabled={!isValid} startIcon={<AddIcon />} style={{ background: '#1976d2' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CarsCreate;
