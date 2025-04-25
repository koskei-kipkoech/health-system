import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  medicalHistory: {
    conditions: [String],
    allergies: [String],
    medications: [String],
    notes: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

export const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);