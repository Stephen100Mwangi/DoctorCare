import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    doctorImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model ('Doctor', DoctorSchema);
export default Doctor;
