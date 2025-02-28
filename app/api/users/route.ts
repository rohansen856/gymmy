import { NextResponse } from 'next/server';
import { users } from '@/lib/data';

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    
    // In a real app, this would validate and save to a database
    // For now, we'll just return the user with a fake ID
    const createdUser = {
      id: `${users.length + 1}`,
      ...newUser,
      joinDate: new Date(),
    };
    
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}