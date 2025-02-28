"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface StatCardProps {
  title: string
  user1: number
  user2: number
  unit: string
  color: string
  lowerIsBetter?: boolean
  isPercentage?: boolean
}

export default function StatCard({
  title,
  user1,
  user2,
  unit,
  color,
  lowerIsBetter = false,
  isPercentage = false,
}: StatCardProps) {
  // Determine the winner
  const user1Wins = lowerIsBetter ? user1 < user2 : user1 > user2
  const tie = user1 === user2

  // Calculate the percentage for the progress bar
  const max = Math.max(user1, user2)
  const user1Percentage = isPercentage ? user1 : (user1 / max) * 100
  const user2Percentage = isPercentage ? user2 : (user2 / max) * 100

  // Get the color class based on the color prop
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case "red":
        return "from-red-500 to-red-600"
      case "blue":
        return "from-blue-500 to-blue-600"
      case "green":
        return "from-green-500 to-green-600"
      case "yellow":
        return "from-yellow-500 to-yellow-600"
      case "purple":
        return "from-purple-500 to-purple-600"
      case "indigo":
        return "from-indigo-500 to-indigo-600"
      case "cyan":
        return "from-cyan-500 to-cyan-600"
      case "amber":
        return "from-amber-500 to-amber-600"
      case "emerald":
        return "from-emerald-500 to-emerald-600"
      case "orange":
        return "from-orange-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <motion.div
            className="text-xl font-bold flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user1}
            {unit && ` ${unit}`}
            {!tie && user1Wins && (
              <motion.span
                className="ml-2 text-yellow-400 text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                ★
              </motion.span>
            )}
          </motion.div>
          <motion.div
            className="mt-2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8 }}
          >
            <Progress
              value={user1Percentage || 0}
              className="h-2 bg-white/10"
              max={100}
              // indicatorClassName={`bg-gradient-to-r ${getColorClass("blue")}`}
            />
          </motion.div>
        </div>

        <div>
          <motion.div
            className="text-xl font-bold flex items-center justify-end"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!tie && !user1Wins && (
              <motion.span
                className="mr-2 text-yellow-400 text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                ★
              </motion.span>
            )}
            {user2}
            {unit && ` ${unit}`}
          </motion.div>
          <motion.div
            className="mt-2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8 }}
          >
            <Progress
              value={user2Percentage || 0}
              max={100}
              className="h-2 bg-white/10"
              // indicatorClassName={`bg-gradient-to-r ${getColorClass("red")}`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
