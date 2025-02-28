"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { day: "Mon", visits: 45 },
  { day: "Tue", visits: 52 },
  { day: "Wed", visits: 38 },
  { day: "Thu", visits: 65 },
  { day: "Fri", visits: 78 },
  { day: "Sat", visits: 80 },
  { day: "Sun", visits: 50 },
]

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>
          Gym visits over the past week
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis 
              dataKey="day" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} 
              contentStyle={{ 
                background: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <Bar 
              dataKey="visits" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
              className="animate-in fade-in-50 fill-primary" 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}