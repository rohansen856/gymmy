"use client"

import { leaderboards, users } from "@/lib/data"
import { LeaderboardCard } from "@/components/hall-of-fame/leaderboard-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy } from "lucide-react"

export default function HallOfFamePage() {
  return (
    <div className="container mx-auto py-10 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
            <h1 className="text-3xl font-bold tracking-tight">Hall of Fame</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Celebrating our members&apos; achievements and records. Push your
            limits and see your name on the leaderboard!
          </p>
        </div>

        <Tabs defaultValue="strength" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="endurance">Endurance</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="strength" className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {leaderboards
                .filter((lb) =>
                  ["Deadlift", "Bench Press", "Squat"].includes(lb.category)
                )
                .map((leaderboard) => (
                  <LeaderboardCard
                    key={leaderboard.id}
                    leaderboard={leaderboard}
                    users={users}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="endurance" className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {leaderboards
                .filter((lb) =>
                  ["Push-Ups", "Pull-Ups", "Plank"].includes(lb.category)
                )
                .map((leaderboard) => (
                  <LeaderboardCard
                    key={leaderboard.id}
                    leaderboard={leaderboard}
                    users={users}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="pt-6">
            <div className="flex flex-col items-center justify-center h-[40vh]">
              <p className="text-xl font-medium">Coming Soon</p>
              <p className="text-muted-foreground">
                Monthly challenges and leaderboards will be available soon!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
