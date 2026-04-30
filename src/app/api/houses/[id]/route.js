import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import House from '@/models/House';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const house = await House.findById(params.id);
    
    if (!house) {
      return NextResponse.json({ success: false, error: 'House not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: house });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const house = await House.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    
    if (!house) {
      return NextResponse.json({ success: false, error: 'House not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: house });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const house = await House.findByIdAndDelete(params.id);
    
    if (!house) {
      return NextResponse.json({ success: false, error: 'House not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}