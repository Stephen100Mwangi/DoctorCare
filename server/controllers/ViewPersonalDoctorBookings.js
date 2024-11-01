import Appointment from '../models/Appointments.js';

const viewPersonalBookings = async (req, res) => {
  const {patient} = req.body;

  try {
    const PersonalData = await Appointment.find ({patient});
    if (PersonalData.length === 0) {
      return res.status (204).json ({message: `Empty bookings`});
    }

    return res.status (200).json ({
      message: 'Patient bookings fetched successfully.',
      doctorBookings: PersonalData,
    });
  } catch (error) {
    return res
      .status (500)
      .json ({message: 'Error fetching data', error: error.message});
  }
};

export default viewPersonalBookings;
