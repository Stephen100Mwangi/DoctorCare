import Patient from '../models/Patient.js';
import bcrypt from 'bcrypt';

const createPatient = async (req, res) => {
  try {
    const {username, email, password, confirmPassword} = req.body;

    // Input validation
    if (!username) {
      return res.status (400).json ({message: 'You must provide a username'});
    }
    if (!email) {
      return res.status (400).json ({message: 'You must provide an email'});
    }
    if (!password) {
      return res.status (400).json ({message: 'You must provide a password'});
    }
    if (!confirmPassword) {
      return res.status (400).json ({message: 'You must confirm password'});
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordStrong = passwordRegex.test (password);

    if (!passwordStrong) {
      return res.status (400).json ({
        message: 'Password must contain at least 8 characters with a lowercase,uppercase,special character and a number',
      });
    }

    if (confirmPassword !== password) {
      return res
        .status (400)
        .json ({message: 'Password must match confirmation password'});
    }

    // Check if user already exists
    const userExists = await Patient.findOne ({email});
    if (userExists) {
      return res.status (400).json ({message: 'User already exists'});
    }

    // Hash the password
    const hashPassword = await bcrypt.hash (password, 10);

    // Create new patient
    const newUser = await Patient.create ({
      username,
      email,
      password: hashPassword,
    });

    // Return success response
    return res.status (201).json ({
      message: 'Patient created successfully',
      user: newUser,
    });
  } catch (error) {
    // Catch any errors and return a server error message
    return res
      .status (500)
      .json ({message: 'Error creating patient', error: error.message});
  }
};

export default createPatient;
