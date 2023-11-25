import * as Yup from 'yup';

const carSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    model: Yup.string().required('Model is required'),
    yearOfRelease: Yup.number()
    .typeError('Year of release must be a number')
    .required('Year of release is required')
    .positive('Year of release must be a positive number')
    .integer('Year of release must be an integer')
    .min(2000, 'Year of release must be greater than 2000'),
    brand: Yup.string().required('Brand is required'),
    color: Yup.string().required('Color is required'),
});
