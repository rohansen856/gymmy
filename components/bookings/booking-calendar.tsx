"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Booking, Equipment } from "@/types"
import { generateTimeSlots, isSlotBooked } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface BookingCalendarProps {
  equipment: Equipment
  existingBookings: Booking[]
  onBookingCreate: (startTime: Date, endTime: Date) => void
}

export function BookingCalendar({ 
  equipment, 
  existingBookings,
  onBookingCreate
}: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)
  
  const timeSlots = date ? generateTimeSlots(date, 6, 22, 60) : []
  
  const handleSlotSelect = (slot: Date) => {
    setSelectedSlot(slot)
  }
  
  const handleBooking = () => {
    if (selectedSlot) {
      const endTime = new Date(selectedSlot)
      endTime.setHours(endTime.getHours() + 1)
      onBookingCreate(selectedSlot, endTime)
    }
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>
            Choose a date for your booking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              
              const maxDate = new Date()
              maxDate.setDate(maxDate.getDate() + 14)
              
              return date < today || date > maxDate
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Time</CardTitle>
          <CardDescription>
            Available time slots for {date ? format(date, 'PPP') : 'selected date'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {date ? (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot, index) => {
                const isBooked = isSlotBooked(slot, existingBookings)
                const isSelected = selectedSlot && 
                  selectedSlot.getTime() === slot.getTime()
                
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "justify-start",
                      isBooked && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isBooked}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {format(slot, 'h:mm a')}
                  </Button>
                )
              })}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-muted-foreground">
                Please select a date first
              </p>
            </div>
          )}
          
          {selectedSlot && (
            <div className="mt-4">
              <Button 
                className="w-full"
                onClick={handleBooking}
              >
                Book {equipment.name} for {format(selectedSlot, 'h:mm a')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}