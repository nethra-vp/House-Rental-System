import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, name, role } = await request.json();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, role });
    } else {
      // Update role if explicitly logging in as different role (for mock purposes)
      user.role = role;
      await user.save();
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
