import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide house name'],
  },
  type: {
    type: String,
    enum: ['Villa', 'Flat', 'Penthouse', 'Duplex'],
    required: [true, 'Please provide house type'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please provide price per day'],
  },
  rooms: {
    type: Number,
    required: [true, 'Please provide number of rooms'],
  },
  accommodation: {
    type: Number,
    required: [true, 'Please provide accommodation capacity'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
  },
  images: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.House || mongoose.model('House', HouseSchema);