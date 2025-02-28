import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { equipmentId, date } = await request.json();
    
    // In a real app, this would use a trained time-series model
    // For now, we'll simulate a prediction
    
    // Generate random demand between 40-90%
    const predictedDemand = Math.round(Math.random() * 50 + 40);
    
    // Generate peak hours (morning and evening are typically busier)
    const peakHours = ["7:00 AM", "8:00 AM", "5:00 PM", "6:00 PM", "7:00 PM"];
    
    // Confidence between 75-95%
    const confidence = Math.round(Math.random() * 20 + 75);
    
    const forecast = {
      equipmentId,
      date: new Date(date),
      predictedDemand,
      peakHours,
      confidence,
    };
    
    return NextResponse.json(forecast);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    );
  }
}