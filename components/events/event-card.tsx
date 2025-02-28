"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Event } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { formatDate, formatTime, truncateText } from "@/lib/utils"
import Link from "next/link"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const isRegistrationClosed = event.registrationDeadline && 
    new Date() > new Date(event.registrationDeadline)
  
  const isFull = event.maxParticipants && 
    event.currentParticipants && 
    event.currentParticipants >= event.maxParticipants
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            No image available
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={event.type === 'competition' ? 'destructive' : 'default'}
          >
            {event.type}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge 
            variant={event.status === 'upcoming' ? 'outline' : 'secondary'}
          >
            {event.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {truncateText(event.description, 100)}
        </p>
        
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
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
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Link href={`/events/${event.id}`}>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </Link>
        
        <Button 
          size="sm"
          disabled={isRegistrationClosed || isFull || event.status !== 'upcoming'}
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}