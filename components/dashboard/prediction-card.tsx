"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, TrendingUp } from "lucide-react"

interface PredictionCardProps {
  title: string
  currentValue: number
  predictedValue: number
  unit: string
  confidence: number
  factors?: string[]
}

export function PredictionCard({
  title,
  currentValue,
  predictedValue,
  unit,
  confidence,
  factors
}: PredictionCardProps) {
  const increase = predictedValue - currentValue
  const percentIncrease = ((increase / currentValue) * 100).toFixed(1)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <CardDescription>
          AI Performance Prediction
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-xl font-bold">{currentValue} {unit}</p>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            <span>{percentIncrease}%</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Predicted</p>
            <p className="text-xl font-bold">{predictedValue} {unit}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span>Confidence</span>
            <span>{confidence}%</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-secondary">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
        
        {factors && factors.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-1">Key factors:</p>
            <div className="flex flex-wrap gap-1">
              {factors.map((factor, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}