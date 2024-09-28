import Doctor from '../models/Doctors.js';

const fetchDoctorById = async (req, res) => {
  const {id} = req.params;
  const doctorFound = await Doctor.findById (id);

  if (!doctorFound) {
    return res.status (404).json ({message: 'Doctor NOT Found'});
  } else {
    return res
      .status (200)
      .json ({message: 'Doctor found successfully', user: doctorFound});
  }
};
export default fetchDoctorById;
