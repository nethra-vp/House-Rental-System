import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide vehicle name'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please provide price per day'],
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'EV'],
    required: [true, 'Please provide fuel type'],
  },
  seatingCapacity: {
    type: Number,
    required: [true, 'Please provide seating capacity'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
  },
  images: {
    type: [String], // Array of URLs
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
