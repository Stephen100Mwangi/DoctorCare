import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

const createAdmin = async (req, res) => {
  const {email, password} = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return res.status (400).json ({message: 'All fields must be complete'});
  }

  try {
    // Check if user already exists
    const userExists = await Admin.findOne ({email});
    if (userExists) {
      return res.status (400).json ({message: 'User already exists'});
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash (password, 10);

    // Create the new admin user
    const newAdmin = await Admin.create ({email, password: hashedPassword});
    return res
      .status (201)
      .json ({message: 'Admin created successfully', user: newAdmin});
  } catch (error) {
    // Handle any errors
    return res
      .status (500)
      .json ({message: 'Server error', error: error.message});
  }
};

export default createAdmin;
