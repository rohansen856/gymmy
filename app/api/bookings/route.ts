import { NextResponse } from 'next/server';
import { bookings } from '@/lib/data';

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const newBooking = await request.json();
    
    // In a real app, this would validate and save to a database
    const createdBooking = {
      id: `${bookings.length + 1}`,
      ...newBooking,
      createdAt: new Date(),
      status: 'confirmed',
    };
    
    return NextResponse.json(createdBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}