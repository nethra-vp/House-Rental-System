import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import { isHouseAvailable, calculateTotalPrice } from '@/lib/utils';
import House from '@/models/House';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const houseId = searchParams.get('houseId');

    let query = {};
    if (userId) query.userId = userId;
    if (houseId) query.houseId = houseId;

    const bookings = await Booking.find(query)
      .populate('houseId')
      .populate('userId')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, houseId, startDate, endDate } = body;

    // 1. Validation: Minimum 1 day
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      return NextResponse.json({ success: false, error: 'End date cannot be before start date' }, { status: 400 });
    }

    // 2. Check availability
    const existingBookings = await Booking.find({ 
      houseId, 
      status: 'confirmed' 
    });

    if (!isHouseAvailable(existingBookings, startDate, endDate)) {
      return NextResponse.json({ success: false, error: 'House is already booked for these dates' }, { status: 400 });
    }

    // 3. Get house price
    const house = await House.findById(houseId);
    if (!house) return NextResponse.json({ success: false, error: 'House not found' }, { status: 404 });

    const totalPrice = calculateTotalPrice(startDate, endDate, house.pricePerDay);

    // 4. Create booking
    const booking = await Booking.create({
      userId,
      houseId,
      startDate,
      endDate,
      totalPrice,
      status: 'confirmed'
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
