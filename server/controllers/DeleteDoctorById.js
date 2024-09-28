import Doctor from '../models/Doctors.js';

const deleteDoctorById = async (req, res) => {
  const {id} = req.params; // Extract "id" from request parameters (not "_id")

  try {
    // Find doctor by ID and delete it (MongoDB uses "_id" internally)
    const doctorFound = await Doctor.findByIdAndDelete (id);

    if (!doctorFound) {
      return res.status (404).json ({message: 'Doctor not found'});
    }

    return res
      .status (200)
      .json ({message: `Doctor ${doctorFound.username} deleted successfully`});
  } catch (error) {
    return res
      .status (500)
      .json ({message: 'Server error', error: error.message});
  }
};

export default deleteDoctorById;
