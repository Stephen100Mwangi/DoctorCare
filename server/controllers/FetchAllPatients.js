import Patient from '../models/Patient.js';

const fetchAllPatients = async (req, res) => {
  try {
    const response = await Patient.find ();
    if (!response) {
      return res.status (400).json ({message: 'Patients not found'});
    } else {
      if (response.length === 0) {
        return res.status (204).json ({message: 'No patients found'});
      } else {
        return res
          .status (200)
          .json ({message: 'Patients Found', patients: response});
      }
    }
  } catch (error) {
    // Catch any errors and return a server error message
    return res
      .status (500)
      .json ({message: 'Error fetching patients', error: error.message});
  }
};

export default fetchAllPatients;
