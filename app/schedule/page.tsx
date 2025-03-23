"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Activity,
  Apple,
  Book,
  Calendar,
  Clock,
  Download,
  Dumbbell,
  FlameKindling,
  Rocket,
  Hourglass,
  Brain,
  CheckCircle,
  Star,
  Zap,
  Award,
} from "lucide-react"

export default function AcademicFitnessPlanPage() {
  const [activeTab, setActiveTab] = useState("assessment")

  // This would normally come from your API
  const planData = {
    assessment: {
      physical: {
        strengths: ["Familiar with compound movements"],
        limitations: ["BMI of 14.2 (Underweight)"],
        fitness_level: "Intermediate",
      },
      nutrition: {
        current: "Insufficient calories with reasonable food choices",
        recommended: "50% carbs / 25% protein / 25% fat with caloric surplus",
        improvements: [
          "Increase calories",
          "Add calorie-dense foods",
          "More complex carbs",
        ],
      },
      academic: {
        peak_times: [
          "Morning lectures",
          "Afternoon study",
          "Evening exam prep",
        ],
        workout_windows: ["Early morning (6-8am)", "Late afternoon (4-6pm)"],
      },
    },
    schedule: {
      class_day: [
        {
          time: "06:30 AM",
          type: "Meal",
          name: "Calorie-Dense Breakfast",
          details: "High-protein, high-calorie breakfast",
        },
        {
          time: "10:00 AM",
          type: "Meal",
          name: "Mid-Morning Snack",
          details: "Quick calorie-dense snack between classes",
        },
        {
          time: "12:30 PM",
          type: "Meal",
          name: "Substantial Lunch",
          details: "Focus on protein, vegetables, and complex carbs",
        },
        {
          time: "04:00 PM",
          type: "Workout",
          name: "Strength Training",
          details: "Compound movements for muscle growth",
        },
        {
          time: "05:00 PM",
          type: "Meal",
          name: "Post-Workout Nutrition",
          details: "Protein and carbs for recovery",
        },
        {
          time: "07:30 PM",
          type: "Meal",
          name: "Nutrient-Dense Dinner",
          details: "Complete nutrition and adequate calories",
        },
        {
          time: "09:30 PM",
          type: "Meal",
          name: "Evening Protein Snack",
          details: "Slow-digesting protein before bed",
        },
      ],
      exam_day: [
        {
          time: "06:00 AM",
          type: "Meal",
          name: "Brain-Boosting Breakfast",
          details: "Omega-3s and complex carbs for mental energy",
        },
        {
          time: "07:00 AM",
          type: "Workout",
          name: "Light Morning Movement",
          details: "Brief, low-intensity exercise for mental alertness",
        },
        {
          time: "Every 2-3 hours",
          type: "Meal",
          name: "Brain-Fueling Snacks",
          details: "Regular small meals to maintain cognitive function",
        },
      ],
    },
    adaptation: {
      low_energy: [
        "Reduce workout intensity, maintain protein intake",
        "Add digestible carbs before high-concentration classes",
        "Increase liquid nutrition (smoothies, protein shakes)",
      ],
      time_constraints: [
        "20-30 minute compound movement workouts",
        "Prepare portable, calorie-dense meals in advance",
        "5-10 minute movement breaks between study sessions",
      ],
      exam_periods: [
        "Reduce workout intensity, maintain frequency",
        "Increase omega-3s and antioxidants",
        "Regular small meals during study sessions",
      ],
    },
    semester_plan: {
      early_weeks_1_4: {
        fitness: "Establish 3-4 days/week strength training",
        nutrition: "5-6 meals daily with increasing portions",
        goals: "0.5-1 lb gain per week",
      },
      mid_weeks_5_10: {
        fitness: "Progressive overload on compound lifts",
        nutrition: "Optimize pre/post workout nutrition",
        goals: "Consistent weight gain and strength progression",
      },
      finals_weeks_11_15: {
        fitness: "Maintenance with reduced volume",
        nutrition: "Focus on cognitive-enhancing nutrients",
        goals: "Maintain gains while managing stress",
      },
    },
    implementation: {
      habits: [
        "Meal prep twice weekly",
        "Consistent workout schedule",
        "Keep healthy snacks accessible",
        "Workout partner for accountability",
      ],
      minimum_protocol: {
        time: "30 minutes/day",
        essentials: [
          "3 strength sessions weekly",
          "1.6g protein per kg body weight",
          "5-6 meals daily",
          "8 hours sleep priority",
        ],
      },
    },
  }

  return (
    <div className="container max-w-5xl py-8 mx-auto animate-in fade-in-50 duration-500">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          Academic-Aware Fitness Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Your personalized fitness and nutrition plan optimized around your
          academic schedule
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 text-sm">
            <Activity className="h-3 w-3 mr-1" />
            AI Generated
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 text-sm">
            <Book className="h-3 w-3 mr-1" />
            Academic Schedule Optimized
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 text-sm">
            <Apple className="h-3 w-3 mr-1" />
            Nutrition Plan
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-700 hover:bg-purple-500/30 text-sm">
            <Dumbbell className="h-3 w-3 mr-1" />
            Fitness Protocol
          </Badge>
        </div>

        <Button variant="outline" className="mt-4" size="sm">
          <Download className="h-4 w-4 mr-2" /> Download PDF
        </Button>
      </div>

      <Tabs
        defaultValue="assessment"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Daily Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="adaptation" className="flex items-center gap-2">
            <FlameKindling className="h-4 w-4" />
            <span className="hidden sm:inline">Adaptations</span>
          </TabsTrigger>
          <TabsTrigger value="semester" className="flex items-center gap-2">
            <Hourglass className="h-4 w-4" />
            <span className="hidden sm:inline">Semester Plan</span>
          </TabsTrigger>
          <TabsTrigger
            value="implementation"
            className="flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            <span className="hidden sm:inline">Implementation</span>
          </TabsTrigger>
        </TabsList>

        {/* Assessment Tab */}
        <TabsContent value="assessment">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-blue-500" />
                  Physical Assessment
                </CardTitle>
                <Badge className="mt-2 bg-blue-500/20 text-blue-700">
                  {planData.assessment.physical.fitness_level}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Strengths:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {planData.assessment.physical.strengths.map(
                      (strength, i) => (
                        <li key={i} className="text-sm">
                          {strength}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Limitations:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {planData.assessment.physical.limitations.map(
                      (limitation, i) => (
                        <li key={i} className="text-sm">
                          {limitation}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-green-500" />
                  Nutrition Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Current:
                  </h4>
                  <p className="text-sm">
                    {planData.assessment.nutrition.current}
                  </p>
                </div>
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Recommended:
                  </h4>
                  <p className="text-sm">
                    {planData.assessment.nutrition.recommended}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Improvements:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {planData.assessment.nutrition.improvements.map(
                      (item, i) => (
                        <li key={i} className="text-sm">
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-purple-500" />
                  Academic Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Peak Academic Times:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {planData.assessment.academic.peak_times.map((time, i) => (
                      <li key={i} className="text-sm">
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Optimal Workout Windows:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {planData.assessment.academic.workout_windows.map(
                      (window, i) => (
                        <li key={i} className="text-sm">
                          {window}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <Tabs defaultValue="class_day" className="w-full max-w-3xl">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger
                    value="class_day"
                    className="flex items-center gap-2"
                  >
                    <Book className="h-4 w-4" />
                    Class Day Schedule
                  </TabsTrigger>
                  <TabsTrigger
                    value="exam_day"
                    className="flex items-center gap-2"
                  >
                    <Brain className="h-4 w-4" />
                    Exam Day Schedule
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="class_day" className="pt-4">
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-2">
                      <CardTitle>Regular Class Day</CardTitle>
                      <CardDescription>
                        Optimized schedule for normal academic days
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {planData.schedule.class_day.map((item, i) => (
                          <div
                            key={i}
                            className="flex border-l-4 pl-4 py-2"
                            style={{
                              borderColor:
                                item.type === "Meal" ? "#10b981" : "#6366f1",
                            }}
                          >
                            <div className="w-20 font-medium text-sm text-muted-foreground">
                              {item.time}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {item.type === "Meal" ? (
                                  <Apple className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Dumbbell className="h-4 w-4 text-indigo-500" />
                                )}
                                <span className="font-medium">{item.name}</span>
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  {item.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="exam_day" className="pt-4">
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 pb-2">
                      <CardTitle>Exam Day Protocol</CardTitle>
                      <CardDescription>
                        Modified schedule to optimize academic performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {planData.schedule.exam_day.map((item, i) => (
                          <div
                            key={i}
                            className="flex border-l-4 pl-4 py-2"
                            style={{
                              borderColor:
                                item.type === "Meal" ? "#10b981" : "#6366f1",
                            }}
                          >
                            <div className="w-28 font-medium text-sm text-muted-foreground">
                              {item.time}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {item.type === "Meal" ? (
                                  <Apple className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Dumbbell className="h-4 w-4 text-indigo-500" />
                                )}
                                <span className="font-medium">{item.name}</span>
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  {item.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </TabsContent>

        {/* Adaptation Tab */}
        <TabsContent value="adaptation">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card>
              <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Low Energy Periods
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {planData.adaptation.low_energy.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Time Constraints
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {planData.adaptation.time_constraints.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-red-500" />
                  Exam Periods
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {planData.adaptation.exam_periods.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Semester Plan Tab */}
        <TabsContent value="semester">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-500" />
                  Weeks 1-4 (Early Semester)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />{" "}
                      Fitness
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.early_weeks_1_4.fitness}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Apple className="h-4 w-4 text-muted-foreground" />{" "}
                      Nutrition
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.early_weeks_1_4.nutrition}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Award className="h-4 w-4 text-muted-foreground" /> Goals
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.early_weeks_1_4.goals}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  Weeks 5-10 (Mid Semester)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />{" "}
                      Fitness
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.mid_weeks_5_10.fitness}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Apple className="h-4 w-4 text-muted-foreground" />{" "}
                      Nutrition
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.mid_weeks_5_10.nutrition}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Award className="h-4 w-4 text-muted-foreground" /> Goals
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.mid_weeks_5_10.goals}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  Weeks 11-15 (Finals)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />{" "}
                      Fitness
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.finals_weeks_11_15.fitness}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Apple className="h-4 w-4 text-muted-foreground" />{" "}
                      Nutrition
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.finals_weeks_11_15.nutrition}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                      <Award className="h-4 w-4 text-muted-foreground" /> Goals
                    </h4>
                    <p className="text-sm">
                      {planData.semester_plan.finals_weeks_11_15.goals}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card>
              <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-500" />
                  Habit Formation
                </CardTitle>
                <CardDescription>
                  Key habits to build for success
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {planData.implementation.habits.map((habit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm pt-0.5">{habit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-cyan-500" />
                  Minimum Effective Protocol
                </CardTitle>
                <CardDescription>
                  When time is limited, focus on these essentials
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" /> Minimum
                    Time Requirement
                  </h4>
                  <p className="text-sm font-medium text-cyan-600">
                    {planData.implementation.minimum_protocol.time}
                  </p>
                </div>

                <h4 className="text-sm font-medium mb-2">
                  Essential Components:
                </h4>
                <ul className="space-y-3">
                  {planData.implementation.minimum_protocol.essentials.map(
                    (essential, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="bg-cyan-100 text-cyan-700 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-sm pt-0.5">{essential}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
