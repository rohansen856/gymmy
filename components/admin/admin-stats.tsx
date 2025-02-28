"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const membershipData = [
  { name: "Basic", value: 35 },
  { name: "Premium", value: 45 },
  { name: "Elite", value: 20 },
]

const equipmentUsageData = [
  { name: "Treadmill", usage: 85 },
  { name: "Power Rack", usage: 75 },
  { name: "Rowing Machine", usage: 60 },
  { name: "Cable Machine", usage: 45 },
  { name: "Adjustable Bench", usage: 40 },
]

const bookingTrendsData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 150 },
  { month: "Mar", bookings: 180 },
  { month: "Apr", bookings: 220 },
  { month: "May", bookings: 250 },
  { month: "Jun", bookings: 280 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

export function AdminStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gym Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="memberships">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="equipment">Equipment Usage</TabsTrigger>
            <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="memberships" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {membershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="equipment" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={equipmentUsageData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, "Usage Rate"]} />
                  <Bar dataKey="usage" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="bookings" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingTrendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, "Bookings"]} />
                  <Bar dataKey="bookings" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

