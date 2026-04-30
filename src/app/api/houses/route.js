import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import House from '@/models/House';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const type = searchParams.get('type');

    let query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = { $regex: type, $options: 'i' };
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const houses = await House.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: houses });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const house = await House.create(body);
    return NextResponse.json({ success: true, data: house }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}