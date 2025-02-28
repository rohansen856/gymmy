import { NextResponse } from 'next/server';
import { leaderboards } from '@/lib/data';

export async function GET() {
  return NextResponse.json(leaderboards);
}

export async function POST(request: Request) {
  try {
    const newLeaderboard = await request.json();
    
    // In a real app, this would validate and save to a database
    const createdLeaderboard = {
      id: `${leaderboards.length + 1}`,
      ...newLeaderboard,
      lastUpdated: new Date(),
    };
    
    return NextResponse.json(createdLeaderboard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create leaderboard' },
      { status: 500 }
    );
  }
}