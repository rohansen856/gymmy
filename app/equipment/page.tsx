"use client"

import { useState } from "react"
import { equipment } from "@/lib/data"
import { EquipmentCard } from "@/components/equipment/equipment-card"
import { EquipmentFilter } from "@/components/equipment/equipment-filter"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: [] as string[],
    status: [] as string[],
    location: [] as string[],
  })

  // Extract unique categories, statuses, and locations
  const categories = Array.from(new Set(equipment.map((item) => item.category)))
  const statuses = Array.from(new Set(equipment.map((item) => item.status)))
  const locations = Array.from(new Set(equipment.map((item) => item.location)))

  // Filter equipment based on search query and filters
  const filteredEquipment = equipment.filter((item) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(item.category)

    // Status filter
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(item.status)

    // Location filter
    const matchesLocation =
      filters.location.length === 0 || filters.location.includes(item.location)

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation
  })

  return (
    <div className="container mx-auto py-10 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipment</h1>
          <p className="text-muted-foreground">
            Browse and book our wide range of fitness equipment.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <EquipmentFilter
            onFilterChange={setFilters}
            categories={categories}
            statuses={statuses}
            locations={locations}
          />
        </div>

        {filteredEquipment.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <p className="text-xl font-medium">No equipment found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
