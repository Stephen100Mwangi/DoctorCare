import express from 'express';
import createAdmin from '../controllers/CreateAdmin.js';
import LoginAdmin from '../controllers/LoginAdmin.js';
import createDoctor from '../controllers/CreateDoctor.js';
import UpdateDoctorById from '../controllers/UpdateDoctorById.js';
import deleteDoctorById from '../controllers/DeleteDoctorById.js';
import ViewAllDoctorBookings from '../controllers/ViewAllDoctorBookings.js';

const adminRoute = express.Router ();

adminRoute.post ('/admin/create', createAdmin);
adminRoute.post ('/admin/login', LoginAdmin);

adminRoute.post ('/admin/createDoctor', createDoctor);
adminRoute.get('/admin/viewAllDoctorBookings',ViewAllDoctorBookings)
adminRoute.put ('/admin/updateDoctorById/:id', UpdateDoctorById);
adminRoute.delete ('/admin/deleteDoctorById/:id', deleteDoctorById);

export default adminRoute;
