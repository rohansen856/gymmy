"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { PersonalBest } from "@/types"
import { Award, Calendar, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PersonalBestsProps {
  personalBests: PersonalBest[]
}

export function PersonalBests({ personalBests }: PersonalBestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Bests</CardTitle>
        <CardDescription>
          Your top performance records
        </CardDescription>
      </CardHeader>
      <CardContent>
        {personalBests.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No personal bests recorded yet
          </p>
        ) : (
          <div className="space-y-4">
            {personalBests.map((pb) => (
              <div key={pb.id} className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium capitalize">{pb.exerciseType}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(pb.date, 'PPP')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-bold">{pb.value}<span className="text-sm ml-1">{pb.unit}</span></p>
                  {pb.verified && (
                    <Badge variant="outline" className="ml-2">
                      <Check className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}