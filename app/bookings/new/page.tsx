"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  format,
  addDays,
  parse,
  isBefore,
  isAfter,
  areIntervalsOverlapping,
  setHours,
  setMinutes,
} from "date-fns"
import axios from "axios"
import {
  Calendar,
  Clock,
  Info,
  Dumbbell,
  MapPin,
  RotateCcw,
  Check,
  AlertTriangle,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Types
type Equipment = {
  id: string
  name: string
  category: "cardio" | "strength" | "flexibility" | "functional" | "other"
  description: string
  location: string
  status: "available" | "in-use" | "maintenance" | "out-of-order"
  image?: string
  purchaseDate: string
  lastServiced?: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  bookable: boolean
}

type Booking = {
  id: string
  userId: string
  equipmentId: string
  startTime: string
  endTime: string
  status: "confirmed" | "cancelled" | "completed" | "pending"
  createdAt: string
  notes?: string
}

// Form schema
const bookingFormSchema = z
  .object({
    bookingType: z.enum(["single", "recurring"], {
      required_error: "Please select a booking type.",
    }),
    date: z.date({
      required_error: "Please select a date for the booking.",
    }),
    startTime: z.string({
      required_error: "Please select a start time.",
    }),
    endTime: z.string({
      required_error: "Please select an end time.",
    }),
    recurringDays: z
      .array(
        z.enum([
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ])
      )
      .optional(),
    recurringEndDate: z.date().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.bookingType === "recurring") {
        return (
          data.recurringDays &&
          data.recurringDays.length > 0 &&
          data.recurringEndDate
        )
      }
      return true
    },
    {
      message: "For recurring bookings, please select days and an end date",
      path: ["recurringDays"],
    }
  )
  .refine(
    (data) => {
      return data.startTime < data.endTime
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  )

type BookingFormValues = z.infer<typeof bookingFormSchema>

// Helper functions
const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = 6 + Math.floor(i / 2)
  const minute = (i % 2) * 30
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`
})

const parseTimeString = (
  timeString: string
): { hours: number; minutes: number } => {
  const [hours, minutes] = timeString.split(":").map(Number)
  return { hours, minutes }
}

const getCategoryColor = (category: Equipment["category"]) => {
  switch (category) {
    case "cardio":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    case "strength":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "flexibility":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "functional":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300"
  }
}

const getStatusColor = (status: Equipment["status"]) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "in-use":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "out-of-order":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300"
  }
}

const isTimeSlotBooked = (
  date: Date,
  timeSlot: string,
  bookings: Booking[]
): boolean => {
  const { hours, minutes } = parseTimeString(timeSlot)
  const slotTime = new Date(date)
  slotTime.setHours(hours, minutes, 0, 0)
  const slotEndTime = new Date(slotTime)
  slotEndTime.setMinutes(slotEndTime.getMinutes() + 30)

  return bookings.some((booking) => {
    const bookingStart = new Date(booking.startTime)
    const bookingEnd = new Date(booking.endTime)

    return areIntervalsOverlapping(
      { start: slotTime, end: slotEndTime },
      { start: bookingStart, end: bookingEnd }
    )
  })
}

export default function NewBookingPage() {
  const searchParams = useSearchParams()
  const equipmentId = searchParams.get("equipmentId")
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [existingBookings, setExistingBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [bookingConflict, setBookingConflict] = useState(false)

  const router = useRouter()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      bookingType: "single",
      date: new Date(),
      startTime: "",
      endTime: "",
      recurringDays: [],
      notes: "",
    },
  })

  const bookingType = form.watch("bookingType")
  const selectedBookingDate = form.watch("date")
  const selectedStartTime = form.watch("startTime")
  const selectedEndTime = form.watch("endTime")

  useEffect(() => {
    // Set selected date when form date changes
    if (selectedBookingDate) {
      setSelectedDate(selectedBookingDate)
    }
  }, [selectedBookingDate])

  useEffect(() => {
    // Check for booking conflicts when time selection changes
    if (selectedStartTime && selectedEndTime && equipment) {
      const { hours: startHours, minutes: startMinutes } =
        parseTimeString(selectedStartTime)
      const { hours: endHours, minutes: endMinutes } =
        parseTimeString(selectedEndTime)

      const startDateTime = new Date(selectedBookingDate)
      startDateTime.setHours(startHours, startMinutes, 0, 0)

      const endDateTime = new Date(selectedBookingDate)
      endDateTime.setHours(endHours, endMinutes, 0, 0)

      const conflict = existingBookings.some((booking) => {
        const bookingStart = new Date(booking.startTime)
        const bookingEnd = new Date(booking.endTime)

        return areIntervalsOverlapping(
          { start: startDateTime, end: endDateTime },
          { start: bookingStart, end: bookingEnd }
        )
      })

      setBookingConflict(conflict)
    }
  }, [
    selectedStartTime,
    selectedEndTime,
    selectedBookingDate,
    existingBookings,
    equipment,
  ])

  // Fetch equipment details and existing bookings
  useEffect(() => {
    if (!equipmentId) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would fetch from your API
        const response = await axios.get(`/api/equipment/${equipmentId}`)
        setEquipment(response.data.equipment)
        setExistingBookings(response.data.bookings)
      } catch (error) {
        console.error("Error fetching equipment:", error)
        toast({
          title: "Error",
          description: "Failed to fetch equipment details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [equipmentId, toast])

  const onSubmit = async (data: BookingFormValues) => {
    if (bookingConflict) {
      toast({
        title: "Booking Conflict",
        description:
          "The selected time slot conflicts with an existing booking.",
        variant: "destructive",
      })
      return
    }

    if (!equipment) {
      toast({
        title: "Error",
        description: "Equipment information is missing.",
        variant: "destructive",
      })
      return
    }

    if (equipment.status !== "available") {
      toast({
        title: "Equipment Unavailable",
        description: `This equipment is currently ${equipment.status.replace(
          "-",
          " "
        )}. Please select another equipment or try again later.`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { hours: startHours, minutes: startMinutes } = parseTimeString(
        data.startTime
      )
      const { hours: endHours, minutes: endMinutes } = parseTimeString(
        data.endTime
      )

      const startDateTime = new Date(data.date)
      startDateTime.setHours(startHours, startMinutes, 0, 0)

      const endDateTime = new Date(data.date)
      endDateTime.setHours(endHours, endMinutes, 0, 0)

      const bookingData = {
        equipmentId: equipment.id,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        bookingType: data.bookingType,
        recurringDays: data.recurringDays,
        recurringEndDate: data.recurringEndDate?.toISOString(),
        notes: data.notes,
      }

      // In a real app, this would post to your API
      const response = await axios.post("/api/bookings", bookingData)

      toast({
        title: "Booking Successful",
        description: "Your equipment has been booked successfully.",
      })

      // Reset form
      form.reset({
        bookingType: "single",
        date: new Date(),
        startTime: "",
        endTime: "",
        recurringDays: [],
        notes: "",
      })

      router.push(`/dashboard`)
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Booking Failed",
        description:
          "There was an error creating your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading equipment details...</p>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Equipment Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The requested equipment could not be found. Please check the
              equipment ID and try again.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const isEquipmentAvailable =
    equipment.status === "available" && equipment.bookable

  return (
    <div className="max-w-6xl container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <CardTitle>Book Equipment</CardTitle>
            </div>
            <CardDescription>
              Complete the form below to book the equipment for your workout
              session.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="p-6 bg-muted/30">
              <div className="flex flex-col md:flex-row gap-6">
                {equipment.image && (
                  <div className="w-full md:w-1/3">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative rounded-md overflow-hidden"
                    >
                      <img
                        src={equipment.image || "/placeholder.svg"}
                        alt={equipment.name}
                        className="w-full object-cover rounded-md aspect-[4/3]"
                      />
                      <Badge
                        className={cn(
                          "absolute top-2 right-2",
                          getStatusColor(equipment.status)
                        )}
                      >
                        {equipment.status.replace("-", " ")}
                      </Badge>
                    </motion.div>
                  </div>
                )}

                <div
                  className={cn("w-full", equipment.image ? "md:w-2/3" : "")}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {equipment.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={cn(getCategoryColor(equipment.category))}>
                      {equipment.category}
                    </Badge>

                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {equipment.location}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {equipment.description}
                  </p>

                  <Accordion type="single" collapsible className="mb-2">
                    <AccordionItem value="details">
                      <AccordionTrigger className="py-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          Equipment Details
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          {equipment.manufacturer && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Manufacturer:
                              </span>
                              <span className="font-medium">
                                {equipment.manufacturer}
                              </span>
                            </div>
                          )}

                          {equipment.model && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Model:
                              </span>
                              <span className="font-medium">
                                {equipment.model}
                              </span>
                            </div>
                          )}

                          {equipment.serialNumber && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Serial Number:
                              </span>
                              <span className="font-medium">
                                {equipment.serialNumber}
                              </span>
                            </div>
                          )}

                          {equipment.purchaseDate && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Purchase Date:
                              </span>
                              <span className="font-medium">
                                {format(
                                  new Date(equipment.purchaseDate),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </div>
                          )}

                          {equipment.lastServiced && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Last Serviced:
                              </span>
                              <span className="font-medium">
                                {format(
                                  new Date(equipment.lastServiced),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {!isEquipmentAvailable && (
                    <div className="bg-destructive/10 p-3 rounded-md mb-3 text-sm flex items-center gap-2 border border-destructive/20">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <div>
                        <p className="font-medium text-destructive">
                          This equipment is not available for booking
                        </p>
                        <p className="text-muted-foreground">
                          Current status:{" "}
                          <span className="font-medium">
                            {equipment.status.replace("-", " ")}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="bookingType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Booking Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="single" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Single session
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="recurring" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Recurring sessions
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {bookingType === "recurring"
                              ? "Start Date"
                              : "Date"}
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date <
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {bookingType === "recurring" && (
                      <FormField
                        control={form.control}
                        name="recurringEndDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              End Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick an end date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    isBefore(date, form.getValues("date"))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Start Time
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={`start-${time}`} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            End Time
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={`end-${time}`} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {bookingType === "recurring" && (
                    <FormField
                      control={form.control}
                      name="recurringDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Recurring Days
                          </FormLabel>
                          <FormDescription>
                            Select the days of the week for your recurring
                            booking.
                          </FormDescription>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "monday",
                                "tuesday",
                                "wednesday",
                                "thursday",
                                "friday",
                                "saturday",
                                "sunday",
                              ].map((day) => {
                                const isSelected = field.value?.includes(
                                  day as any
                                )
                                return (
                                  <Badge
                                    key={day}
                                    variant={isSelected ? "default" : "outline"}
                                    className="cursor-pointer hover:bg-primary/20 transition-colors capitalize"
                                    onClick={() => {
                                      const currentValue = field.value || []
                                      const newValue = isSelected
                                        ? currentValue.filter((d) => d !== day)
                                        : [...currentValue, day]
                                      field.onChange(newValue)
                                    }}
                                  >
                                    {day.substring(0, 3)}
                                  </Badge>
                                )
                              })}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Notes (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any special requirements or notes for your booking..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {bookingConflict && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-destructive/10 p-4 rounded-md text-sm flex items-start gap-3 border border-destructive/20"
                    >
                      <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">
                          Booking Conflict Detected
                        </p>
                        <p className="text-muted-foreground">
                          The selected time slot conflicts with an existing
                          booking. Please select a different time.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <h3 className="text-lg font-medium mb-3">
                      Available Time Slots
                    </h3>
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 gap-2">
                        {timeSlots.map((timeSlot, index) => {
                          const isBooked = isTimeSlotBooked(
                            selectedDate,
                            timeSlot,
                            existingBookings
                          )
                          return (
                            <div
                              key={index}
                              className={cn(
                                "text-xs p-1 text-center rounded-md border",
                                isBooked
                                  ? "bg-destructive/10 text-destructive border-destructive/20"
                                  : "bg-primary/5 text-primary border-primary/10"
                              )}
                            >
                              {timeSlot}
                              <div className="mt-1">
                                {isBooked ? (
                                  <X className="h-3 w-3 mx-auto text-destructive" />
                                ) : (
                                  <Check className="h-3 w-3 mx-auto text-primary" />
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex justify-center items-center gap-6 mt-4 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-primary/20 border border-primary/20 rounded-sm"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-destructive/10 border border-destructive/20 rounded-sm"></div>
                          <span>Booked</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !isEquipmentAvailable || isSubmitting || bookingConflict
                    }
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                        <span>Processing Booking...</span>
                      </div>
                    ) : (
                      <span>Book Equipment</span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 flex justify-between text-xs text-muted-foreground">
            <p>Equipment bookings are subject to gym rules and policies</p>
            <p>© {new Date().getFullYear()} Fitness Center</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
