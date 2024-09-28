import Doctor from '../models/Doctors.js';
import bcrypt from 'bcrypt'

const createDoctor = async (req, res) => {
  try {
    const {
      username,
      position,
      password,
      available,
      email,
      doctorImage,
    } = req.body;

    // Input validation
    if (!username) {
      return res.status (400).json ({message: 'You must provide a username'});
    }
    if (!email) {
      return res.status (400).json ({message: 'You must provide an email'});
    }
    if (!position) {
      return res.status (400).json ({message: 'You must provide a position'});
    }
    if (!password) {
      return res.status (400).json ({message: 'You must provide a position'});
    }
    if (!doctorImage) {
      return res
        .status (400)
        .json ({message: 'You must provide doctor`s image'});
    }

    // Check if user already exists
    const userExists = await Doctor.findOne ({email});
    if (userExists) {
      return res.status (400).json ({message: 'User already exists'});
    }

    const hashPassword = await bcrypt.hash (password, 10);

    // Create new patient
    const newUser = await Doctor.create ({
      username,
      position,
      available,
      password: hashPassword,
      email,
      doctorImage,
    });

    // Return success response
    return res.status (201).json ({
      message: 'Doctor created successfully',
      user: newUser,
    });
  } catch (error) {
    // Catch any errors and return a server error message
    return res
      .status (500)
      .json ({message: 'Error creating patient', error: error.message});
  }
};

export default createDoctor;
