"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { equipment, bookings } from "@/lib/data"
import { BookingCalendar } from "@/components/bookings/booking-calendar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NewBookingPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  // In a real app, this would come from authentication
  const userId = "1"
  
  const initialEquipmentId = searchParams.get("equipmentId") || ""
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(initialEquipmentId)
  const [bookingCreated, setBookingCreated] = useState(false)
  
  // Filter only bookable and available equipment
  const bookableEquipment = equipment.filter(
    item => item.bookable && item.status === 'available'
  )
  
  const selectedEquipment = equipment.find(item => item.id === selectedEquipmentId)
  
  // Filter existing bookings for the selected equipment
  const equipmentBookings = bookings.filter(
    booking => booking.equipmentId === selectedEquipmentId
  )
  
  const handleBookingCreate = (startTime: Date, endTime: Date) => {
    // In a real app, this would make an API call to create the booking
    console.log("Creating booking:", {
      userId,
      equipmentId: selectedEquipmentId,
      startTime,
      endTime
    })
    
    // Show success message
    toast({
      title: "Booking created",
      description: `You've successfully booked ${selectedEquipment?.name} from ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`,
    })
    
    setBookingCreated(true)
  }
  
  if (bookingCreated) {
    return (
      <div className="container py-10 max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <CardTitle>Booking Confirmed!</CardTitle>
            <CardDescription>
              Your equipment has been successfully booked.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You can view and manage all your bookings from your bookings page.
            </p>
            <div className="flex flex-col space-y-2">
              <Link href="/bookings">
                <Button className="w-full">
                  View My Bookings
                </Button>
              </Link>
              <Link href="/equipment">
                <Button variant="outline" className="w-full">
                  Book More Equipment
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <></>
  )
}