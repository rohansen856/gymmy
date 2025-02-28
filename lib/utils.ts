import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: Date | string,
  formatString: string = "PPP"
): string {
  if (!date) return ""

  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatString)
}

export function formatTime(
  date: Date | string,
  formatString: string = "h:mm a"
): string {
  if (!date) return ""

  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatString)
}

export function formatDateTime(
  date: Date | string,
  formatString: string = "PPP p"
): string {
  if (!date) return ""

  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatString)
}

export function calculateBMI(weight: number, height: number): number {
  // Weight in kg, height in cm
  const heightInMeters = height / 100
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

export function getTimeSlots(
  startHour: number = 6,
  endHour: number = 22,
  intervalMinutes: number = 60
): string[] {
  const slots: string[] = []

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12
      const period = hour < 12 ? "AM" : "PM"
      const formattedMinute = minute === 0 ? "00" : minute
      slots.push(`${formattedHour}:${formattedMinute} ${period}`)
    }
  }

  return slots
}

export function generateTimeSlots(
  date: Date,
  startHour: number = 6,
  endHour: number = 22,
  intervalMinutes: number = 60
): Date[] {
  const slots: Date[] = []
  const baseDate = new Date(date)

  // Reset hours and minutes
  baseDate.setHours(0, 0, 0, 0)

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const slotTime = new Date(baseDate)
      slotTime.setHours(hour, minute)
      slots.push(slotTime)
    }
  }

  return slots
}

export function isSlotBooked(slot: Date, bookings: any[]): boolean {
  return bookings.some((booking) => {
    const bookingStart = new Date(booking.startTime)
    const bookingEnd = new Date(booking.endTime)
    return slot >= bookingStart && slot < bookingEnd
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return ""
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

export function getInitials(name: string): string {
  if (!name) return ""
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    available: "bg-green-500",
    "in-use": "bg-blue-500",
    maintenance: "bg-yellow-500",
    "out-of-order": "bg-red-500",
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
    completed: "bg-blue-500",
    active: "bg-green-500",
    inactive: "bg-red-500",
    upcoming: "bg-blue-500",
    ongoing: "bg-green-500",
  }

  return statusMap[status.toLowerCase()] || "bg-gray-500"
}

export function getMembershipColor(type: string): string {
  const typeMap: Record<string, string> = {
    basic: "bg-gray-500",
    premium: "bg-blue-500",
    elite: "bg-purple-500",
  }

  return typeMap[type.toLowerCase()] || "bg-gray-500"
}

export function getFitnessLevelColor(level: string): string {
  const levelMap: Record<string, string> = {
    beginner: "bg-green-500",
    intermediate: "bg-blue-500",
    advanced: "bg-purple-500",
    expert: "bg-red-500",
  }

  return levelMap[level.toLowerCase()] || "bg-gray-500"
}
