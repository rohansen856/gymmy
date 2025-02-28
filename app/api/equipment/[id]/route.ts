import { NextResponse } from 'next/server';
import { getEquipmentById } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const equipment = getEquipmentById(id);
  
  if (!equipment) {
    return NextResponse.json(
      { error: 'Equipment not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(equipment);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const equipment = getEquipmentById(id);
    
    if (!equipment) {
      return NextResponse.json(
        { error: 'Equipment not found' },
        { status: 404 }
      );
    }
    
    const updatedData = await request.json();
    
    // In a real app, this would update the database
    const updatedEquipment = {
      ...equipment,
      ...updatedData,
    };
    
    return NextResponse.json(updatedEquipment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update equipment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const equipment = getEquipmentById(id);
  
  if (!equipment) {
    return NextResponse.json(
      { error: 'Equipment not found' },
      { status: 404 }
    );
  }
  
  // In a real app, this would delete from the database
  
  return NextResponse.json({ success: true });
}