import Link from "next/link"
import {
  ArrowRight,
  Dumbbell,
  Users,
  Calendar,
  Award,
  BarChart3,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Elevate Your Fitness Journey
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Welcome to Gymmy, where we combine cutting-edge technology
                  with personalized training to help you achieve your fitness
                  goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-1">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/equipment">
                  <Button size="lg" variant="outline">
                    Explore Equipment
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="Gym Equipment"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={500}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 container mx-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive gym management system provides everything you
                need to track your progress, book equipment, and participate in
                events.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Performance Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your progress with detailed metrics and visualizations.
                  Set goals and monitor your improvements over time.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard" className="text-sm text-primary">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Equipment Booking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Reserve your favorite equipment in advance. No more waiting in
                  line or adjusting your workout schedule.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/equipment" className="text-sm text-primary">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Events & Competitions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Participate in regular events and competitions. Challenge
                  yourself and other members in a friendly environment.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/events" className="text-sm text-primary">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Hall of Fame</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Recognize top performers in various categories. Get your name
                  on the leaderboard and inspire others.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/hall-of-fame" className="text-sm text-primary">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with other members, share tips, and find workout
                  partners. Build a supportive fitness community.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/members" className="text-sm text-primary">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Smart Scheduling</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Plan your workouts with our intelligent scheduling system.
                  Optimize your time at the gym.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/bookings" className="text-sm text-primary">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Fitness?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join Gymmy today and take your fitness journey to the next level
                with our comprehensive tools and supportive community.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-1">
                  Get Started Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
