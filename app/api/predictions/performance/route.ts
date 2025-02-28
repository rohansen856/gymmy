import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, exerciseType, currentValue, trainingHistory } = await request.json();
    
    // In a real app, this would use a trained ML model
    // For now, we'll simulate a prediction with a simple algorithm
    
    // Simple prediction: 10-15% increase based on current value
    const increasePercentage = Math.random() * 0.05 + 0.1; // 10-15%
    const predictedValue = Math.round(currentValue * (1 + increasePercentage));
    
    // Confidence between 70-90%
    const confidence = Math.round(Math.random() * 20 + 70);
    
    // Factors that influenced the prediction
    const factors = [
      "Training frequency",
      "Recent progress",
      "Nutrition",
      "Rest patterns"
    ];
    
    const prediction = {
      userId,
      exerciseType,
      predictedValue,
      confidence,
      factors: factors.slice(0, Math.floor(Math.random() * 3) + 2), // Random 2-4 factors
      date: new Date(),
    };
    
    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}