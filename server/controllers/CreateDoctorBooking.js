import Doctor from '../models/Doctors.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointments.js';

const createDoctorBooking = async (req, res) => {
  try {
    const {doctorId, patientId, condition, appointmentDate,doctorEmail,patientEmail} = req.body;

    // Check if doctor exists
    const doctorExists = await Doctor.findById (doctorId);
    if (!doctorExists) {
      return res.status (404).json ({message: 'Doctor not found'});
    }

    // Check if patient exists
    const patientExists = await Patient.findById (patientId);
    if (!patientExists) {
      return res.status (404).json ({message: 'Patient not found'});
    }

    // Create new appointment
    const newAppointment = new Appointment ({
      doctor: doctorId,
      patient: patientId,
      condition,
      appointmentDate,
      doctorEmail,
      patientEmail,
      bookingTime: Date.now (),
    });

    await newAppointment.save ();

    return res.status (200).json ({
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    console.log (error.message);

    return res.status (500).json ({
      message: 'Booking creation NOT successful',
      error: error.message,
    });
  }
};

export default createDoctorBooking;
