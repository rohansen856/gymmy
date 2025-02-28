"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const benchPressData = [
  { date: "Jan", weight: 80 },
  { date: "Feb", weight: 85 },
  { date: "Mar", weight: 85 },
  { date: "Apr", weight: 90 },
  { date: "May", weight: 95 },
  { date: "Jun", weight: 100 },
]

const squatData = [
  { date: "Jan", weight: 100 },
  { date: "Feb", weight: 110 },
  { date: "Mar", weight: 120 },
  { date: "Apr", weight: 125 },
  { date: "May", weight: 130 },
  { date: "Jun", weight: 140 },
]

const deadliftData = [
  { date: "Jan", weight: 120 },
  { date: "Feb", weight: 130 },
  { date: "Mar", weight: 140 },
  { date: "Apr", weight: 150 },
  { date: "May", weight: 160 },
  { date: "Jun", weight: 180 },
]

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Progress</CardTitle>
        <CardDescription>
          Track your strength gains over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bench">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bench">Bench Press</TabsTrigger>
            <TabsTrigger value="squat">Squat</TabsTrigger>
            <TabsTrigger value="deadlift">Deadlift</TabsTrigger>
          </TabsList>
          <TabsContent value="bench" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={benchPressData}>
                <XAxis 
                  dataKey="date" 
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
                  tickFormatter={(value) => `${value}kg`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2} 
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  className="animate-in fade-in-50"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="squat" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={squatData}>
                <XAxis 
                  dataKey="date" 
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
                  tickFormatter={(value) => `${value}kg`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2} 
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  className="animate-in fade-in-50"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="deadlift" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deadliftData}>
                <XAxis 
                  dataKey="date" 
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
                  tickFormatter={(value) => `${value}kg`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2} 
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  className="animate-in fade-in-50"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}