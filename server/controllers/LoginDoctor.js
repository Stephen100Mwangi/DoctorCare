import Doctor from '../models/Doctors.js';
import bcrypt from 'bcrypt';

const loginDoctor = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Input validation

    if (!email) {
      return res.status (400).json ({message: 'You must provide an email'});
    }
    if (!password) {
      return res.status (400).json ({message: 'You must provide a password'});
    }

    // Check if user already exists
    const userExists = await Doctor.findOne ({email});
    if (!userExists) {
      return res.status (400).json ({message: 'User NOT Found'});
    }

    const passwordMatch = await bcrypt.compare (password, userExists.password);
    if (!passwordMatch) {
      return res.status (400).json ({message: 'Invalid email OR password'});
    }

    return res
      .status (200)
      .json ({message: 'Doctor logged in successfully', user: userExists});
  } catch (error) {
    // Catch any errors and return a server error message
    return res
      .status (500)
      .json ({message: 'Error creating patient', error: error.message});
  }
};

export default loginDoctor;
