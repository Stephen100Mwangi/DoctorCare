import Appointment from '../models/Appointments.js';

const ViewAllDoctorBookings = async (req, res) => {
  try {
    const appointments = await Appointment.find ();
    if (appointments.length === 0) {
      return res.status (204).json ({message: 'Empty appointments'});
    }

    return res
      .status (200)
      .json ({message: 'Appointments found', bookings: appointments});
  } catch (error) {
    return res
      .status (500)
      .json ({message: 'Internal server error', error: error.message});
  }
};

export default ViewAllDoctorBookings;
