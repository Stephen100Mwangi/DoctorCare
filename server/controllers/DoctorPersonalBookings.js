import Appointment from '../models/Appointments.js';

const fetchMyAppointments = async (req, res) => {
  const {doctor} = req.body;

  try {
    if (!doctor) {
      return res.status (400).json ({message: 'Doctor ID must be provided'});
    }

    const response = await Appointment.find ({
      doctor
    });

    if (!response) {
      return res.status (204).json ({message: 'No appointments found'});
    }

    return res.status (200).json ({
      message: 'Appointments found successfully',
      appointment: response,
    });
  } catch (error) {
    return res.status (500).json ({message: error.message});
  }
};

export default fetchMyAppointments;
