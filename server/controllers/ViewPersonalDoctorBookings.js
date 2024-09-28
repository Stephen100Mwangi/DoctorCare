import Bookings from '../models/Appointments.js';

const viewPersonalBookings = async (req, res) => {
  const {email, password} = req.body;

  try {
    const PersonalData = Bookings.find ({email});
    if (PersonalData.length === 0) {
      return res.status (204).json ({message: 'Empty bookings for'});
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
