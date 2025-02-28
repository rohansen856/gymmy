import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, metrics } = await request.json();
    
    // In a real app, this would use a trained classification model
    // For now, we'll simulate a classification
    
    // Simple classification based on provided metrics
    let fitnessLevel;
    let confidence;
    
    if (metrics.workoutFrequency <= 1) {
      fitnessLevel = "beginner";
      confidence = Math.round(Math.random() * 10 + 85); // 85-95%
    } else if (metrics.workoutFrequency <= 3) {
      fitnessLevel = "intermediate";
      confidence = Math.round(Math.random() * 10 + 80); // 80-90%
    } else if (metrics.workoutFrequency <= 5) {
      fitnessLevel = "advanced";
      confidence = Math.round(Math.random() * 10 + 75); // 75-85%
    } else {
      fitnessLevel = "expert";
      confidence = Math.round(Math.random() * 10 + 70); // 70-80%
    }
    
    const classification = {
      userId,
      fitnessLevel,
      confidence,
      factors: [
        "Workout frequency",
        "Performance metrics",
        "Consistency",
        "Progress rate"
      ],
      date: new Date(),
    };
    
    return NextResponse.json(classification);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to classify user' },
      { status: 500 }
    );
  }
}