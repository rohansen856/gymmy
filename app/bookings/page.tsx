"use client"

import { useState } from "react"
import { bookings, getEquipmentById, getUserById } from "@/lib/data"
import { formatDate, formatTime, getStatusColor } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export default function BookingsPage() {
  // In a real app, this would come from authentication
  const userId = "1"

  const [statusFilter, setStatusFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter bookings based on search query and filters
  const userBookings = bookings.filter((booking) => booking.userId === userId)

  const filteredBookings = userBookings.filter((booking) => {
    const equipment = getEquipmentById(booking.equipmentId)

    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      equipment?.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const clearFilters = () => {
    setStatusFilter("")
  }

  const hasActiveFilters = statusFilter !== ""

  return (
    <div className="container mx-auto py-10 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-muted-foreground">
              Manage your equipment reservations and schedule.
            </p>
          </div>
          <Link href="/equipment">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Statuses</SelectItem> */}
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              <Filter className="mr-1 h-3 w-3" />
              Filters active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <p className="text-xl font-medium">No bookings found</p>
            <p className="text-muted-foreground">
              {userBookings.length === 0
                ? "You haven't made any bookings yet"
                : "Try adjusting your search or filters"}
            </p>
            <Link href="/bookings/new" className="mt-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Booking
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBookings.map((booking) => {
              const equipment = getEquipmentById(booking.equipmentId)

              return (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{equipment?.name}</CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {equipment?.category} - {equipment?.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(booking.startTime, "PPP")}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatTime(booking.startTime)} -{" "}
                          {formatTime(booking.endTime)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {booking.status === "confirmed" && (
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
