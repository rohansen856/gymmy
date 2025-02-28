"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatTime, truncateText } from "@/lib/utils"
import { Event } from "@/types"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface UpcomingEventsProps {
  events: Event[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>
          Join our community events and competitions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No upcoming events
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-md border overflow-hidden">
                {event.image && (
                  <div className="relative h-32 w-full">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="object-cover w-full h-full"
                    />
                    <Badge 
                      className="absolute top-2 right-2"
                      variant={event.type === 'competition' ? 'destructive' : 'default'}
                    >
                      {event.type}
                    </Badge>
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {truncateText(event.description, 100)}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(event.startDate, 'PPP')}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatTime(event.startDate)}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {event.currentParticipants}/{event.maxParticipants || '∞'}
                    </div>
                  </div>
                  <Button className="w-full mt-2">Register</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}