"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Weight,
  Ruler,
  Activity,
  Dumbbell,
  TrendingUp,
  Flame,
} from "lucide-react"
import StatCard from "./stat-card"
import UserProfile from "./user-profile"
import ComparisonChart from "./comparison-chart"

// Sample data for two users
const user1 = {
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=200&width=200",
  height: 183, // cm
  weight: 85, // kg
  bmi: 25.4,
  stats: {
    deadlift: 220, // kg
    benchPress: 120, // kg
    squats: 180, // kg
    pushups: 52, // reps
    pullups: 18, // reps
    runningPace: 4.5, // min/km
  },
  progress: {
    strength: 85,
    endurance: 70,
    flexibility: 65,
    cardio: 80,
  },
}

const user2 = {
  name: "Sam Rivera",
  avatar: "/placeholder.svg?height=200&width=200",
  height: 175, // cm
  weight: 72, // kg
  bmi: 23.5,
  stats: {
    deadlift: 180, // kg
    benchPress: 100, // kg
    squats: 160, // kg
    pushups: 65, // reps
    pullups: 22, // reps
    runningPace: 4.2, // min/km
  },
  progress: {
    strength: 75,
    endurance: 90,
    flexibility: 80,
    cardio: 85,
  },
}

export default function VersusScreen() {
  const [activeTab, setActiveTab] = useState("strength")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        GYM STATS
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* User 1 Profile */}
        <motion.div variants={item} className="flex-1">
          <UserProfile user={user1} position="left" />
        </motion.div>

        {/* VS Badge */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-lg">
            VS
          </div>
        </motion.div>

        {/* User 2 Profile */}
        <motion.div variants={item} className="flex-1">
          <UserProfile user={user2} position="right" />
        </motion.div>
      </motion.div>

      <Tabs
        defaultValue="strength"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 mb-8 bg-black/20 p-1">
          <TabsTrigger
            value="strength"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            Strength
          </TabsTrigger>
          <TabsTrigger
            value="endurance"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            <Activity className="mr-2 h-4 w-4" />
            Endurance
          </TabsTrigger>
          <TabsTrigger
            value="body"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
          >
            <Ruler className="mr-2 h-4 w-4" />
            Body
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="strength" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-black/30 border-none text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                  Strength Records
                </h3>
                <div className="space-y-4">
                  <StatCard
                    title="Deadlift"
                    user1={user1.stats.deadlift}
                    user2={user2.stats.deadlift}
                    unit="kg"
                    color="red"
                  />
                  <StatCard
                    title="Bench Press"
                    user1={user1.stats.benchPress}
                    user2={user2.stats.benchPress}
                    unit="kg"
                    color="blue"
                  />
                  <StatCard
                    title="Squats"
                    user1={user1.stats.squats}
                    user2={user2.stats.squats}
                    unit="kg"
                    color="purple"
                  />
                </div>
              </Card>

              <ComparisonChart
                title="Strength Comparison"
                labels={["Deadlift", "Bench Press", "Squats"]}
                user1Data={[
                  user1.stats.deadlift,
                  user1.stats.benchPress,
                  user1.stats.squats,
                ]}
                user2Data={[
                  user2.stats.deadlift,
                  user2.stats.benchPress,
                  user2.stats.squats,
                ]}
                user1Name={user1.name}
                user2Name={user2.name}
              />
            </div>
          </TabsContent>

          <TabsContent value="endurance" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-black/30 border-none text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Flame className="mr-2 h-5 w-5 text-orange-400" />
                  Endurance Records
                </h3>
                <div className="space-y-4">
                  <StatCard
                    title="Push-ups"
                    user1={user1.stats.pushups}
                    user2={user2.stats.pushups}
                    unit="reps"
                    color="green"
                  />
                  <StatCard
                    title="Pull-ups"
                    user1={user1.stats.pullups}
                    user2={user2.stats.pullups}
                    unit="reps"
                    color="yellow"
                  />
                  <StatCard
                    title="Running Pace"
                    user1={user1.stats.runningPace}
                    user2={user2.stats.runningPace}
                    unit="min/km"
                    color="cyan"
                    lowerIsBetter={true}
                  />
                </div>
              </Card>

              <ComparisonChart
                title="Endurance Comparison"
                labels={["Push-ups", "Pull-ups", "Running Pace"]}
                user1Data={[
                  user1.stats.pushups,
                  user1.stats.pullups,
                  10 - user1.stats.runningPace,
                ]}
                user2Data={[
                  user2.stats.pushups,
                  user2.stats.pullups,
                  10 - user2.stats.runningPace,
                ]}
                user1Name={user1.name}
                user2Name={user2.name}
              />
            </div>
          </TabsContent>

          <TabsContent value="body" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-black/30 border-none text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Weight className="mr-2 h-5 w-5 text-emerald-400" />
                  Body Metrics
                </h3>
                <div className="space-y-4">
                  <StatCard
                    title="Height"
                    user1={user1.height}
                    user2={user2.height}
                    unit="cm"
                    color="indigo"
                  />
                  <StatCard
                    title="Weight"
                    user1={user1.weight}
                    user2={user2.weight}
                    unit="kg"
                    color="amber"
                  />
                  <StatCard
                    title="BMI"
                    user1={user1.bmi}
                    user2={user2.bmi}
                    unit=""
                    color="emerald"
                    lowerIsBetter={true}
                  />
                </div>
              </Card>

              <ComparisonChart
                title="Body Metrics Comparison"
                labels={["Height (cm)", "Weight (kg)", "BMI"]}
                user1Data={[user1.height, user1.weight, user1.bmi]}
                user2Data={[user2.height, user2.weight, user2.bmi]}
                user1Name={user1.name}
                user2Name={user2.name}
              />
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-black/30 border-none text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-violet-400" />
                  Progress Metrics
                </h3>
                <div className="space-y-4">
                  <StatCard
                    title="Strength"
                    user1={user1.progress.strength}
                    user2={user2.progress.strength}
                    unit="%"
                    color="red"
                    isPercentage={true}
                  />
                  <StatCard
                    title="Endurance"
                    user1={user1.progress.endurance}
                    user2={user2.progress.endurance}
                    unit="%"
                    color="blue"
                    isPercentage={true}
                  />
                  <StatCard
                    title="Flexibility"
                    user1={user1.progress.flexibility}
                    user2={user2.progress.flexibility}
                    unit="%"
                    color="green"
                    isPercentage={true}
                  />
                  <StatCard
                    title="Cardio"
                    user1={user1.progress.cardio}
                    user2={user2.progress.cardio}
                    unit="%"
                    color="orange"
                    isPercentage={true}
                  />
                </div>
              </Card>

              <ComparisonChart
                title="Progress Comparison"
                labels={["Strength", "Endurance", "Flexibility", "Cardio"]}
                user1Data={[
                  user1.progress.strength,
                  user1.progress.endurance,
                  user1.progress.flexibility,
                  user1.progress.cardio,
                ]}
                user2Data={[
                  user2.progress.strength,
                  user2.progress.endurance,
                  user2.progress.flexibility,
                  user2.progress.cardio,
                ]}
                user1Name={user1.name}
                user2Name={user2.name}
                isRadar={true}
              />
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
