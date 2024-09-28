import Doctor from '../models/Doctors.js';

const fetchAllDoctors = async (req, res) => {
  try {
    const response = await Doctor.find ();
    if (!response) {
      return res.status (400).json ({message: 'Doctors not found'});
    } else {
      if (response.length === 0) {
        return res.status (204).json ({message: 'No doctors found'});
      } else {
        return res
          .status (200)
          .json ({message: 'Doctors Found', doctors: response});
      }
    }
  } catch (error) {
    // Catch any errors and return a server error message
    return res
      .status (500)
      .json ({message: 'Error fetching doctors', error: error.message});
  }
};

export default fetchAllDoctors;
