"use client"

import { useState } from "react"
import { users } from "@/lib/data"
import { MemberCard } from "@/components/members/member-card"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [membershipFilter, setMembershipFilter] = useState("")
  const [fitnessLevelFilter, setFitnessLevelFilter] = useState("")

  // Filter members based on search query and filters
  const filteredMembers = users.filter((member) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Membership filter
    const matchesMembership =
      membershipFilter === "" || member.membershipType === membershipFilter

    // Fitness level filter
    const matchesFitnessLevel =
      fitnessLevelFilter === "" || member.fitnessLevel === fitnessLevelFilter

    return matchesSearch && matchesMembership && matchesFitnessLevel
  })

  const clearFilters = () => {
    setMembershipFilter("")
    setFitnessLevelFilter("")
  }

  const hasActiveFilters = membershipFilter !== "" || fitnessLevelFilter !== ""

  return (
    <div className="container mx-auto py-10 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">
            Connect with other gym members and build your fitness community.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={membershipFilter}
              onValueChange={setMembershipFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Membership" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Memberships</SelectItem> */}
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={fitnessLevelFilter}
              onValueChange={setFitnessLevelFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Fitness Level" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Levels</SelectItem> */}
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              <Filter className="mr-1 h-3 w-3" />
              Filters active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <p className="text-xl font-medium">No members found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
