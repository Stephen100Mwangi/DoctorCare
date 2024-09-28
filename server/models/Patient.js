import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    userImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model ('Patient', patientSchema);
export default Patient;
