"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaderboard, User } from "@/types"
import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"

interface LeaderboardCardProps {
  leaderboard: Leaderboard
  users: User[]
}

export function LeaderboardCard({ leaderboard, users }: LeaderboardCardProps) {
  const getUser = (userId: string) => {
    return users.find(user => user.id === userId)
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-muted-foreground";
    }
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{leaderboard.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {leaderboard.description}
        </p>
        
        <div className="space-y-4">
          {leaderboard.entries.map((entry) => {
            const user = getUser(entry.userId)
            if (!user) return null
            
            return (
              <div 
                key={entry.userId} 
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center space-x-4">
                  <div className={`font-bold text-lg ${getMedalColor(entry.rank)}`}>
                    {entry.rank === 1 && <Trophy className="h-5 w-5" />}
                    {entry.rank !== 1 && `#${entry.rank}`}
                  </div>
                  <Avatar>
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.date, 'PP')}
                    </p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {entry.value}
                  <span className="ml-1 text-sm text-muted-foreground">
                    {leaderboard.category === 'Deadlift' || leaderboard.category === 'Bench Press' ? 'kg' : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}