"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { User } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Info, Mail, Phone } from "lucide-react"
import { formatDate, getMembershipColor, getFitnessLevelColor } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface MemberCardProps {
  member: User
}

export function MemberCard({ member }: MemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.profileImage} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{member.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getMembershipColor(member.membershipType)}>
                {member.membershipType}
              </Badge>
              {member.fitnessLevel && (
                <Badge variant="outline" className={getFitnessLevelColor(member.fitnessLevel)}>
                  {member.fitnessLevel}
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Joined {formatDate(member.joinDate, 'PP')}
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{member.email}</span>
          </div>
          {member.phoneNumber && (
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{member.phoneNumber}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <Link href={`/members/${member.id}`}>
          <Button variant="outline" size="sm">
            <Info className="mr-2 h-4 w-4" />
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}