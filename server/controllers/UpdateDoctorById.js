import Doctor from '../models/Doctors.js';

const UpdateDoctorById = async (req, res) => {
  const {id} = req.params;
  const {username, position, available, email} = req.body;

  try {
    // Check if doctor exists
    const doctorFound = await Doctor.findById (id);
    if (!doctorFound) {
      return res.status (404).json ({message: 'Doctor not found'});
    }

    // Update doctor details
    const updatedDoctor = await Doctor.findByIdAndUpdate (
      id, // Find the doctor by id
      {username, position, available, email}, // Fields to update
      {new: true} // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status (400).json ({message: 'Doctor update failed'});
    }

    // Successful update
    return res
      .status (200)
      .json ({message: 'Doctor updated successfully', doctor: updatedDoctor});
  } catch (error) {
    // Handle any unexpected errors
    return res
      .status (500)
      .json ({message: 'Server error', error: error.message});
  }
};

export default UpdateDoctorById;
