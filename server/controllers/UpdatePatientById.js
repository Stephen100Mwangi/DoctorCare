import Patient from '../models/Patient.js';

const updatePatientById = async (req, res) => {
  const {phone, address, gender, dateOfBirth, userImage} = req.body;
  const {id} = req.params;

  try {
    const userExists = Patient.findById (id);

    if (!userExists) {
      return res.status (400).json ({message: 'Patient NOT Found'});
    }

    if (!phone || !address || !gender || !dateOfBirth || !userImage) {
      return res.status (400).json ({message: 'All fields must be complete'});
    }

    const regex = /^254\d{9}$/;
    if (!regex.test (phone)) {
      return res.status (400).json ({message: 'Invalid phone number'});
    }

    const updatedPatient = await Patient.findByIdAndUpdate (
      id,
      {phone, address, gender, dateOfBirth, userImage},
      {new: true}
    );
    if (!updatedPatient) {
      return res.status (400).json ({message: 'Patient update failed'});
    }

    return res
      .status (200)
      .json ({message: 'Patient data updated successfully'});
  } catch (error) {
    console.log (error.message);
    return res.status (500).json ({message: 'Internal server error'});
  }
};

export default updatePatientById;
