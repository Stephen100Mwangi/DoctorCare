import express from 'express';
import createDoctor from '../controllers/CreateDoctor.js';
import viewPersonalBookings from '../controllers/ViewPersonalDoctorBookings.js';
import loginDoctor from '../controllers/LoginDoctor.js';
import fetchDoctorById from '../controllers/FetchDoctorById.js';
import fetchMyAppointments from '../controllers/DoctorPersonalBookings.js';

const doctorRoute = express.Router ();

doctorRoute.post ('/doctor/createDoctor', createDoctor);
doctorRoute.post ('/doctor/loginDoctor', loginDoctor);
doctorRoute.post ('/doctor/fetchDoctorById/:id', fetchDoctorById);
doctorRoute.post ('/doctor/fetchMyAppointments', fetchMyAppointments);

export default doctorRoute;
