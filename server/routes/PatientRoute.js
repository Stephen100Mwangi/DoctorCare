// PatientRoute.js
import express from 'express';
import {body, validationResult} from 'express-validator';
import createPatient from '../controllers/CreatePatient.js';
import loginUser from '../controllers/ValidatePatient.js';
import findPatientById from '../controllers/FindPatientById.js';
import viewPersonalBookings from '../controllers/ViewPersonalDoctorBookings.js';

const patientRoute = express.Router ();

patientRoute.post (
  '/patient/create',
  [
    // Email Validation
    body ('email')
      .isEmail ()
      .withMessage ('Please provide a valid email')
      .notEmpty ()
      .withMessage ('Email address cannot be empty'),

    // Username Validation
    body ('username')
      .isString ()
      .withMessage ('Username must be a string')
      .isLength ({min: 5, max: 20})
      .withMessage ('Username must contain 5-20 characters')
      .notEmpty ()
      .withMessage ('Username cannot be empty'),

    // Phone Validation
    body ('phone')
      .notEmpty ()
      .withMessage ('Please provide your phone number')
      .isMobilePhone ()
      .withMessage ('Please provide a valid phone number'),

    // Address Validation (Assuming Kenyan Postal Codes)
    body ('address')
      .notEmpty ()
      .withMessage ('Postal address cannot be empty')
      .isPostalCode ('KE') // Specify the locale, e.g., 'KE' for Kenya
      .withMessage ('Postal address must be a valid Kenyan postal code'),

    // Gender Validation
    body ('gender')
      .notEmpty ()
      .withMessage ('Please indicate your gender')
      .isIn (['Male', 'Female'])
      .withMessage ('Gender can be Male or Female'),

    // Date of Birth Validation
    body ('dateOfBirth')
      .notEmpty ()
      .withMessage ('Please provide your date of birth')
      .isDate ()
      .withMessage ('Please provide a valid date of birth'),

    // Password Validation
    body ('password')
      .notEmpty ()
      .withMessage ('Password is required')
      .isLength ({min: 8})
      .withMessage ('Password must be at least 8 characters long')
      .matches (/[a-z]/)
      .withMessage ('Password must contain at least one lowercase letter')
      .matches (/[A-Z]/)
      .withMessage ('Password must contain at least one uppercase letter')
      .matches (/\d/)
      .withMessage ('Password must contain at least one number')
      .matches (/[@$!%*?&]/)
      .withMessage ('Password must contain at least one special character'),

    // Confirm Password Validation
    body ('confirmPassword')
      .notEmpty ()
      .withMessage ('Please confirm your password')
      .custom ((value, {req}) => value === req.body.password)
      .withMessage ('Passwords do not match'),

    // Optional User Image Validation
    body ('userImage')
      .optional ()
      .isURL ()
      .withMessage ('Please provide a valid URL for the user image'),
  ],
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      // Return the first error message for simplicity
      return res.status (400).json ({errors: errors.array ()});
    }

    // If validation passes, proceed to the controller
    createPatient (req, res, next);
  }
);

patientRoute.post ('/patient/login', loginUser);
patientRoute.get ('/patient/find/:id', findPatientById);
patientRoute.post ('/patient/fetchMyAppointments/', viewPersonalBookings);

export default patientRoute;
