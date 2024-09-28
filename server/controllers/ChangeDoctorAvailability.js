import Doctor from '../models/Doctors.js';

const changeAvailability = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id.match (/^[0-9a-fA-F]{24}$/)) {
      return res.status (400).json ({message: 'Invalid doctor ID format.'});
    }

    const doctorExists = await Doctor.findById (id);

    if (!doctorExists) {
      return res.status (400).json ({message: 'Doctor does not exist'});
    }

    doctorExists.available = !doctorExists.available;

    // Save the updated doctor back to the database
    const updatedDoctor = await doctorExists.save ();

    // Return success response
    return res.status (200).json ({
      message: 'Doctor availability toggled successfully.',
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log (error.message);
    return res.status (500).json ({message: 'Internal server error'});
  }
};

export default changeAvailability;
