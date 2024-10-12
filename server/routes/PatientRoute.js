import express from 'express';
import createPatient from '../controllers/CreatePatient.js';
import loginUser from '../controllers/ValidatePatient.js';
import findPatientById from '../controllers/FindPatientById.js';
import viewPersonalBookings from '../controllers/ViewPersonalDoctorBookings.js';

const patientRoute = express.Router ();

patientRoute.post ('/patient/create', createPatient);
patientRoute.post ('/patient/login', loginUser);
patientRoute.get ('/patient/find/:id', findPatientById);
patientRoute.post ('/patient/fetchMyAppointments/', viewPersonalBookings);

export default patientRoute;
