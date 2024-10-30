import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    userImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model ('Patient', patientSchema);
export default Patient;
