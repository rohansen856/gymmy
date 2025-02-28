"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award } from "lucide-react"

interface UserProfileProps {
  user: {
    name: string
    avatar: string
    height: number
    weight: number
    bmi: number
    stats: {
      deadlift: number
      benchPress: number
      squats: number
      pushups: number
      pullups: number
      runningPace: number
    }
  }
  position: "left" | "right"
}

export default function UserProfile({ user, position }: UserProfileProps) {
  // Determine the user's best stat
  const bestStat = Object.entries(user.stats).reduce(
    (best, [key, value]) => {
      // For running pace, lower is better
      if (key === "runningPace") {
        return best.value < value ? best : { key, value }
      }
      return best.value > value ? best : { key, value }
    },
    { key: "", value: 0 }
  )

  // Format the best stat name
  const formatStatName = (stat: string) => {
    switch (stat) {
      case "deadlift":
        return "Deadlift"
      case "benchPress":
        return "Bench Press"
      case "squats":
        return "Squats"
      case "pushups":
        return "Push-ups"
      case "pullups":
        return "Pull-ups"
      case "runningPace":
        return "Running Pace"
      default:
        return stat
    }
  }

  // Format the best stat value
  const formatStatValue = (stat: string, value: number) => {
    if (stat === "runningPace") {
      return `${value} min/km`
    }
    return stat === "deadlift" || stat === "benchPress" || stat === "squats"
      ? `${value} kg`
      : `${value} reps`
  }

  return (
    <Card
      className={`overflow-hidden border-none shadow-xl ${
        position === "left"
          ? "bg-gradient-to-br from-blue-600 to-indigo-800"
          : "bg-gradient-to-br from-red-600 to-pink-800"
      }`}
    >
      <div className="p-6 text-white">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary/30">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Trophy className="h-5 w-5 text-white" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user.name}
          </motion.h2>

          <motion.div
            className="flex gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge className="bg-secondary/20 hover:bg-secondary/30">
              {user.height} cm
            </Badge>
            <Badge className="bg-secondary/20 hover:bg-secondary/30">
              {user.weight} kg
            </Badge>
            <Badge className="bg-secondary/20 hover:bg-secondary/30">
              BMI: {user.bmi}
            </Badge>
          </motion.div>

          <motion.div
            className="w-full p-4 bg-secondary/10 rounded-lg"
            initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-yellow-300" />
              <h3 className="font-semibold">Personal Best</h3>
            </div>
            <div className="flex items-center justify-between">
              <span>{formatStatName(bestStat.key)}</span>
              <span className="font-bold">
                {formatStatValue(bestStat.key, bestStat.value)}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Card>
  )
}
