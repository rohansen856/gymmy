import { NextResponse } from 'next/server';
import { events } from '@/lib/data';

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const newEvent = await request.json();
    
    // In a real app, this would validate and save to a database
    const createdEvent = {
      id: `${events.length + 1}`,
      ...newEvent,
      currentParticipants: 0,
      status: 'upcoming',
    };
    
    return NextResponse.json(createdEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}