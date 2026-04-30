import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: vehicle });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const vehicle = await Vehicle.findByIdAndUpdate(id, body, { returnDocument: 'after', runValidators: true });
    if (!vehicle) return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: vehicle });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
