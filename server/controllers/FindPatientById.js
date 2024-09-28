import mongoose from 'mongoose';
import Patient from '../models/Patient.js';

const findPatientById = async (req, res) => {
  try {
    const {id} = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid (id)) {
      return res.status (400).json ({message: 'Invalid ID format'});
    }

    // Await the query to find the patient by ID
    const user = await Patient.findById (id);

    // Check if the user exists
    if (!user) {
      return res.status (404).json ({message: 'No user found'});
    }

    return res.status (200).json ({message: 'User found', user});
  } catch (error) {
    // Handle any unexpected errors
    return res
      .status (500)
      .json ({message: 'Internal server error', error: error.message});
  }
};

export default findPatientById;
