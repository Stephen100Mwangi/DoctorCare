import express from 'express';
import createDoctor from '../controllers/CreateDoctor.js';
import viewPersonalBookings from '../controllers/ViewPersonalDoctorBookings.js';
import loginDoctor from '../controllers/LoginDoctor.js';

const doctorRoute = express.Router ();

doctorRoute.post ('/doctor/createDoctor', createDoctor);
doctorRoute.get ('/doctor/fetchPersonalBookings', viewPersonalBookings);
doctorRoute.post('/doctor/loginDoctor',loginDoctor);

export default doctorRoute;
