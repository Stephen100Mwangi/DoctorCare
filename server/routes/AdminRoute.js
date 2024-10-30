import express from 'express';
import createAdmin from '../controllers/CreateAdmin.js';
import LoginAdmin from '../controllers/LoginAdmin.js';
import createDoctor from '../controllers/CreateDoctor.js';
import UpdateDoctorById from '../controllers/UpdateDoctorById.js';
import deleteDoctorById from '../controllers/DeleteDoctorById.js';
import ViewAllDoctorBookings from '../controllers/ViewAllDoctorBookings.js';
import check, {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';

const adminRoute = express.Router ();

adminRoute.post ('/admin/create', createAdmin);
adminRoute.post (
  '/admin/login',
  [
    
    body ('email').isEmail ().withMessage ('Please provide a valid email'),
    body ('otp')
      .isNumeric ()
      .withMessage ('OTP must be numeric')
      .isLength ({max: 6, min: 6})
      .withMessage ('Please provide a valid OTP'),
    body ('password')
      .isAlphanumeric ()
      .withMessage ('Password must be alphanumeric')
      .isStrongPassword ()
      .withMessage ('Please provide valid credentials'),
  ],
  LoginAdmin
);

adminRoute.post ('/admin/createDoctor', createDoctor);
adminRoute.get ('/admin/viewAllDoctorBookings', ViewAllDoctorBookings);
adminRoute.put ('/admin/updateDoctorById/:id', UpdateDoctorById);
adminRoute.delete ('/admin/deleteDoctorById/:id', deleteDoctorById);

export default adminRoute;
