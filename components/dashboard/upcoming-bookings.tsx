"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatTime } from "@/lib/utils"
import { Booking } from "@/types"
import { getEquipmentById } from "@/lib/data"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UpcomingBookingsProps {
  bookings: Booking[]
}

export function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  const upcomingBookings = bookings
    .filter(booking => booking.status === 'confirmed' || booking.status === 'pending')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
        <CardDescription>
          Your scheduled equipment bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingBookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No upcoming bookings
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => {
              const equipment = getEquipmentById(booking.equipmentId)
              return (
                <div key={booking.id} className="flex items-start space-x-4 rounded-md border p-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{equipment?.name}</p>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'outline'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(booking.startTime, 'PPP')}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}