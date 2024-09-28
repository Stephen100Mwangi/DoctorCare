import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema (
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visitor',
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    doctorEmail: {
      type: String,
      required: true,
    },
    condition: {type: String, required: true},
    bookingTime: {type: Date, required: true, default: Date.now},
    appointmentDate: {type: Date, required: true},
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  {timestamps: true}
);

const Appointment = mongoose.model ('Appointment', AppointmentSchema);
export default Appointment;
