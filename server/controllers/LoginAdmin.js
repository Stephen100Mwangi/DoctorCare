import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

const LoginAdmin = async (req, res) => {
  const {email, password} = req.body;

  // Check if all fields are complete
  if (!email || !password) {
    return res.status (400).json ({message: 'All fields must be complete'});
  }

  try {
    // Find the admin by email
    const userExists = await Admin.findOne ({email});
    if (!userExists) {
      return res.status (404).json ({message: 'No admin found'});
    }

    // Compare the passwords (plain password first, then hashed password)
    const correctPassword = await bcrypt.compare (
      password,
      userExists.password
    );
    if (!correctPassword) {
      return res.status (401).json ({message: 'Invalid email or password'});
    }

    // Successful login
    return res.status (200).json ({message: 'Correct Admin Login'});
  } catch (error) {
    // Handle any unexpected errors
    return res
      .status (500)
      .json ({message: 'Server error', error: error.message});
  }
};

export default LoginAdmin;
