require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const HouseSchema = new mongoose.Schema({
  name: String,
  type: String, // villa, flat, penthouse, duplex
  pricePerDay: Number,
  rooms: Number, // no. of rooms
  accommodation: Number, // no. of guests
  location: String,
  images: [String],
}, { timestamps: true });

const House = mongoose.models.House || mongoose.model('House', HouseSchema);

const sampleHouses = [
  {
    name: "Sea View Villa",
    type: "Villa",
    pricePerDay: 8000,
    rooms: 4,
    accommodation: 8,
    location: "Goa",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6"]
  },
  {
    name: "Luxury Penthouse",
    type: "Penthouse",
    pricePerDay: 12000,
    rooms: 3,
    accommodation: 6,
    location: "Bangalore",
    images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"]
  },
  {
    name: "City Apartment",
    type: "Flat",
    pricePerDay: 2500,
    rooms: 2,
    accommodation: 4,
    location: "Mangalore",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]
  },
  {
    name: "Modern Duplex",
    type: "Duplex",
    pricePerDay: 6000,
    rooms: 3,
    accommodation: 5,
    location: "Bangalore",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"]
  },
  {
    name: "Budget Studio",
    type: "Flat",
    pricePerDay: 1500,
    rooms: 1,
    accommodation: 2,
    location: "Mysore",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"]
  }
];

async function seed() {
  if (!MONGODB_URI) {
    console.log("MONGODB_URI not found in .env.local");
    return;
  }

  await mongoose.connect(MONGODB_URI);

  await House.deleteMany({});
  await House.insertMany(sampleHouses);

  console.log("House database seeded successfully!");
  process.exit();
}

seed();