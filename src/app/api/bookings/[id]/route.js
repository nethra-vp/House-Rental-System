import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const booking = await Booking.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    if (!booking) return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
