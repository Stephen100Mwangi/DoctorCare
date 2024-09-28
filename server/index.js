import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import patientRoute from './routes/PatientRoute.js';
import doctorRoute from './routes/DoctorRoute.js';
import adminRoute from './routes/AdminRoute.js';
import fetchDoctorById from './controllers/FetchDoctorById.js';
import createDoctorBooking from './controllers/CreateDoctorBooking.js';
import findPatientById from './controllers/FindPatientById.js';
import updatePatientById from './controllers/UpdatePatientById.js';
import fetchAllDoctors from './controllers/FetchAllDoctors.js';
import changeAvailability from './controllers/ChangeDoctorAvailability.js';
import ViewAllDoctorBookings from './controllers/ViewAllDoctorBookings.js';
import {
  markAsCancelled,
  markAsComplete,
  rescheduleAppointment,
} from './controllers/ModifyAppointment.js';

const app = express ();
dotenv.config ();

// Middlewares
app.use (express.json ());
app.use (cors ());
app.use (express.urlencoded ({extended: true}));

// Connect to DB
const URL = process.env.MONGO_URI;

mongoose
  .connect (URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then (() => {
    console.log ('Successful Connection to DB');
  })
  .catch (error => {
    console.error ('Error connecting to DB:', error.message);
  });

// Handle Mongoose connection errors after initial connection
mongoose.connection.on ('error', err => {
  console.error ('Mongoose connection error:', err);
});

mongoose.connection.on ('disconnected', () => {
  console.warn ('Mongoose connection lost');
});

const PORT = process.env.PORT;
app.listen (PORT, () => {
  console.log (`App running well on port http://localhost:${PORT}`);
});

// Routes

app.get ('/', (req, res) => {
  res.status (200).send ('Welcome to Doctor Connect');
});

app.use ('/', patientRoute);
app.use ('/', doctorRoute);
app.use ('/', adminRoute);
app.get ('/api/doctors/findById/:id', fetchDoctorById);
app.get ('/api/doctors/createAppointment', createDoctorBooking);
app.get ('/api/patient/findById/:id', findPatientById);
app.post (`/api/patient/updatePatientById/:id`, updatePatientById);
app.get ('/api/doctors/fetchAllDoctors', fetchAllDoctors);
app.post ('/api/appointments/book', createDoctorBooking);
app.put ('/api/doctor/updateAvailability/:id', changeAvailability);
app.get ('/api/admin/viewAllAppointments', ViewAllDoctorBookings);
app.put ('/api/appointment/markComplete/:id', markAsComplete);
app.put ('/api/appointment/cancelAppointment/:id', markAsCancelled);
app.put ('/api/appointment/reschedule/:id', rescheduleAppointment);
