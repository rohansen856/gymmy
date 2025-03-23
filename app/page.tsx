"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Dumbbell,
  Users,
  Calendar,
  Award,
  BarChart3,
  Trophy,
  Brain,
  Sparkles,
  Zap,
  ChevronRight,
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
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Floating Elements - Modern Touch */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDuration: "15s" }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "20s" }}
        />
      </div>

      {/* Enhanced Hero Section */}
      <section className="w-full pt-12 pb-24 md:pt-16 md:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container px-4 md:px-6 mx-auto"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col justify-center space-y-6"
            >
              <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                <span className="font-medium">AI-Powered Fitness Platform</span>
              </Badge>

              <div className="space-y-3">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Train Smarter,
                  <br />
                  Not Harder
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Transform your campus fitness journey with{" "}
                  <span className="font-medium text-primary">Gymmy</span> –
                  where AI-driven insights meet personalized training and
                  intelligent resource management.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="px-8 text-base font-medium">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 text-base font-medium bg-background/60 backdrop-blur-sm border-primary/20"
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Book Equipment
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">97%</span>
                  <span className="text-sm text-muted-foreground">
                    Prediction Accuracy
                  </span>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">1,200+</span>
                  <span className="text-sm text-muted-foreground">
                    Active Members
                  </span>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">48%</span>
                  <span className="text-sm text-muted-foreground">
                    Better Retention
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative mx-auto lg:mx-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur-xl opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-purple-500/20 rounded-xl" />

              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                  alt="Gym Equipment"
                  className="rounded-xl object-cover object-center shadow-xl w-full aspect-[4/3]"
                />

                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                  >
                    Watch Demo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -right-6 -bottom-6 p-4 bg-background/80 backdrop-blur-md rounded-lg shadow-lg border border-primary/10 w-48"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      AI Predictions
                    </p>
                    <p className="text-sm font-medium">Personalized Plans</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium">97%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "97%" }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-muted/80 to-transparent" />
        <svg
          className="absolute -bottom-px left-0 right-0 fill-muted"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 48"
        >
          <path d="M0 48h1440V0c-211.7 32-431.7 48-660 48-226.7 0-448.3-16-660-48H0v48z" />
        </svg>
      </section>

      {/* AI Features Section */}
      <section className="w-full py-20 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container px-4 md:px-6 mx-auto"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">
              AI Technologies
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Powered by Intelligence
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg mx-auto">
              Our AI-powered features use deep learning to analyze your metrics
              and deliver personalized recommendations that adapt to your
              academic schedule.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Brain className="h-6 w-6 text-rose-500" />,
                color: "rose",
                title: "Powerlifting Predictor",
                description:
                  "97% accurate estimations of your optimal lifting performance based on your metrics and training history.",
                badge: "97% Accuracy",
              },
              {
                icon: <Award className="h-6 w-6 text-amber-500" />,
                color: "amber",
                title: "Smart Nutrition Engine",
                description:
                  "Personalized nutrition recommendations adapted to your fitness goals and academic schedule.",
                badge: "96.4% Accuracy",
              },
              {
                icon: <Calendar className="h-6 w-6 text-blue-500" />,
                color: "blue",
                title: "Dynamic Fitness Planner",
                description:
                  "AI-generated workout schedules that adapt to your class timetable, exams, and recovery needs.",
                badge: "Groq LLM",
              },
              {
                icon: <Zap className="h-6 w-6 text-green-500" />,
                color: "green",
                title: "Exercise Form Analysis",
                description:
                  "Real-time posture correction and feedback to prevent injuries and optimize training efficiency.",
                badge: "Computer Vision",
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
                color: "indigo",
                title: "Gym Traffic Intelligence",
                description:
                  "Predictive analytics on gym occupancy to help you train during optimal hours.",
                badge: "Pattern Recognition",
              },
              {
                icon: <Trophy className="h-6 w-6 text-violet-500" />,
                color: "violet",
                title: "Academic-Aware Fitness",
                description:
                  "Customized plans that adjust during high-stress academic periods like exams and project deadlines.",
                badge: "Contextual AI",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-${feature.color}-500/10 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`absolute top-0 right-0 bg-${feature.color}-500/10 p-1.5 rounded-bl-lg rounded-tr-lg`}
                >
                  <Badge
                    variant="outline"
                    className={`bg-${feature.color}-500/10 text-${feature.color}-500 border-${feature.color}-500/20 text-xs`}
                  >
                    {feature.badge}
                  </Badge>
                </div>

                <div
                  className={`h-12 w-12 rounded-lg bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:bg-${feature.color}-500/20 transition-colors duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                  <Link
                    href={`/features/${feature.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className={`text-xs font-medium text-${feature.color}-500 flex items-center`}
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container px-4 md:px-6"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Our comprehensive gym management system provides everything you
              need to track your progress, book equipment, and participate in
              events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <BarChart3 className="h-5 w-5 text-primary" />,
                title: "Performance Tracking",
                description:
                  "Track your progress with detailed metrics and visualizations. Set goals and monitor your improvements over time.",
              },
              {
                icon: <Dumbbell className="h-5 w-5 text-primary" />,
                title: "Equipment Booking",
                description:
                  "Reserve your favorite equipment in advance. No more waiting in line or adjusting your workout schedule.",
              },
              {
                icon: <Trophy className="h-5 w-5 text-primary" />,
                title: "Events & Competitions",
                description:
                  "Participate in regular events and competitions. Challenge yourself and other members in a friendly environment.",
              },
              {
                icon: <Award className="h-5 w-5 text-primary" />,
                title: "Hall of Fame",
                description:
                  "Recognize top performers in various categories. Get your name on the leaderboard and inspire others.",
              },
              {
                icon: <Users className="h-5 w-5 text-primary" />,
                title: "Community",
                description:
                  "Connect with other members, share tips, and find workout partners. Build a supportive fitness community.",
              },
              {
                icon: <Calendar className="h-5 w-5 text-primary" />,
                title: "Smart Scheduling",
                description:
                  "Plan your workouts with our intelligent scheduling system. Optimize your time at the gym.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
                }}
              >
                <Card className="h-full overflow-hidden border-primary/5 bg-gradient-to-b from-background to-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        {feature.icon}
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/${feature.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/&/g, "and")}`}
                      className="text-sm text-primary flex items-center"
                    >
                      Learn more
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container px-4 md:px-6 mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The AI deadlift predictor was spot on. It estimated I could hit 315 lbs, which I achieved within two weeks of training!",
                name: "Alex J.",
                role: "Computer Science Major",
                image: "https://i.pravatar.cc/100?img=1",
              },
              {
                quote:
                  "As a busy engineering student, the academic-aware fitness planner has been a game changer. My workouts adjust during exam periods.",
                name: "Priya M.",
                role: "Electrical Engineering",
                image: "https://i.pravatar.cc/100?img=5",
              },
              {
                quote:
                  "Equipment booking system eliminates wait times completely. I can plan my entire week of training without any scheduling conflicts.",
                name: "Marcus T.",
                role: "Physics Major",
                image: "https://i.pravatar.cc/100?img=3",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-primary/10 flex flex-col"
              >
                <div className="flex-1">
                  <svg
                    className="h-6 w-6 text-primary/40 mb-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.51.88-3.995 2.749-3.995 5.02v2.828h3v8h-9zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.511.88-3.996 2.749-3.996 5.02v2.828h3v8h-9z" />
                  </svg>
                  <p className="text-sm leading-relaxed italic mb-4">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/20" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container px-4 md:px-6 mx-auto relative z-10"
        >
          <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-primary/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 bg-secondary/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Transform Your Fitness?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg mx-auto mt-4">
                    Join Gymmy today and take your fitness journey to the next
                    level with our AI-powered tools and supportive community.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button size="lg" className="px-8 text-base font-medium">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-6 text-base font-medium bg-background/40"
                  >
                    Schedule Demo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  No credit card required. Free for all IIT students and
                  faculty.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
