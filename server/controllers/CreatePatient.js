// CreatePatient.js
import Patient from '../models/Patient.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config ();

const createPatient = async (req, res) => {
  const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
  const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

  try {
    const {
      username,
      email,
      password,
      gender,
      dateOfBirth,
      phone,
      address,
      userImage,
    } = req.body;

    // Check if user already exists
    const userExists = await Patient.findOne ({email});
    if (userExists) {
      return res.status (400).json ({message: 'User already exists'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash (password, 10);

    // Create new patient
    const newUser = await Patient.create ({
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      phone,
      address,
      userImage, // This field is optional
    });

    // Generate JWT tokens
    const access_token = jwt.sign ({id: newUser._id}, jwtAccessSecret, {
      expiresIn: '30m',
    });
    const refresh_token = jwt.sign ({id: newUser._id}, jwtRefreshSecret, {
      expiresIn: '12d',
    });

    // Return success response
    return res.status (201).json ({
      message: 'Patient created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        dateOfBirth: newUser.dateOfBirth,
        phone: newUser.phone,
        address: newUser.address,
        userImage: newUser.userImage,
      },
      access_token,
      refresh_token,
    });
  } catch (error) {
    // Catch any errors and return a server error message
    return res
      .status (500)
      .json ({message: 'Error creating patient', error: error.message});
  }
};

export default createPatient;
