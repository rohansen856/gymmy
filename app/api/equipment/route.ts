import { NextResponse } from 'next/server';
import { equipment } from '@/lib/data';

export async function GET() {
  return NextResponse.json(equipment);
}

export async function POST(request: Request) {
  try {
    const newEquipment = await request.json();
    
    // In a real app, this would validate and save to a database
    const createdEquipment = {
      id: `${equipment.length + 1}`,
      ...newEquipment,
      purchaseDate: new Date(),
    };
    
    return NextResponse.json(createdEquipment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create equipment' },
      { status: 500 }
    );
  }
}