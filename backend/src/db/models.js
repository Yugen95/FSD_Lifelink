const mongoose = require('mongoose');

// Donor Schema
const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  dob: { type: Date, required: true },
  eligible: { type: Boolean, default: true },
  lastDonationDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Donor = mongoose.model('Donor', donorSchema);

// Blood Unit Schema
const bloodUnitSchema = new mongoose.Schema({
  unitId: { type: String, required: true, unique: true },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  collectionDate: { type: Date, required: true },
  testingStatus: { type: String, enum: ['pending', 'tested', 'cleared', 'rejected'], default: 'pending' },
  storageLocation: { type: String, default: null },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['available', 'allocated', 'expired'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

const BloodUnit = mongoose.model('BloodUnit', bloodUnitSchema);

// Emergency Request Schema
const emergencyRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  quantity: { type: Number, required: true },
  urgency: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { type: String, enum: ['pending', 'fulfilled', 'partial', 'cancelled'], default: 'pending' },
  allocatedUnitId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodUnit', default: null },
  requestTime: { type: Date, default: Date.now },
  fulfilledTime: { type: Date, default: null },
});

const EmergencyRequest = mongoose.model('EmergencyRequest', emergencyRequestSchema);

module.exports = { Donor, BloodUnit, EmergencyRequest };


