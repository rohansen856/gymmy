"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  Dumbbell,
  Calendar,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { UpcomingBookings } from "@/components/dashboard/upcoming-bookings"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { PersonalBests } from "@/components/dashboard/personal-bests"
import { PredictionCard } from "@/components/dashboard/prediction-card"
import {
  bookings,
  events,
  getUserById,
  getPersonalBestsByUserId,
} from "@/lib/data"

export default function DashboardPage() {
  // In a real app, this would come from authentication
  const userId = "1"
  const user = getUserById(userId)
  const personalBests = getPersonalBestsByUserId(userId)

  // Simulated loading state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading || !user) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here&apos;s an overview of your fitness
            journey.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Weekly Visits"
            value="5"
            icon={Activity}
            description="Last 7 days"
            variant="info"
          />
          <StatsCard
            title="Active Bookings"
            value="3"
            icon={Calendar}
            description="Upcoming sessions"
            variant="success"
          />
          <StatsCard
            title="Personal Bests"
            value={personalBests.length.toString()}
            icon={TrendingUp}
            description="Across all exercises"
            variant="warning"
          />
          <StatsCard
            title="Workout Streak"
            value="12"
            icon={Clock}
            description="Days in a row"
            variant="danger"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ActivityChart />
          <PerformanceChart />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PersonalBests personalBests={personalBests} />
          </div>
          <div>
            <UpcomingBookings
              bookings={bookings.filter((b) => b.userId === userId)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UpcomingEvents events={events} />
          </div>
          <div className="space-y-4">
            <PredictionCard
              title="Deadlift Prediction"
              currentValue={180}
              predictedValue={195}
              unit="kg"
              confidence={85}
              factors={["Consistent training", "Recent progress", "Nutrition"]}
            />
            <PredictionCard
              title="Bench Press Prediction"
              currentValue={100}
              predictedValue={110}
              unit="kg"
              confidence={75}
              factors={["Training frequency", "Form improvement"]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
