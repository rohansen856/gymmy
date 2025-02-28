"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface EquipmentFilterProps {
  onFilterChange: (filters: {
    category: string[];
    status: string[];
    location: string[];
  }) => void;
  categories: string[];
  statuses: string[];
  locations: string[];
}

export function EquipmentFilter({
  onFilterChange,
  categories,
  statuses,
  locations,
}: EquipmentFilterProps) {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  
  const handleCategorySelect = (value: string) => {
    const newSelection = selectedCategories.includes(value)
      ? selectedCategories.filter(item => item !== value)
      : [...selectedCategories, value]
    
    setSelectedCategories(newSelection)
    onFilterChange({
      category: newSelection,
      status: selectedStatuses,
      location: selectedLocations,
    })
  }
  
  const handleStatusSelect = (value: string) => {
    const newSelection = selectedStatuses.includes(value)
      ? selectedStatuses.filter(item => item !== value)
      : [...selectedStatuses, value]
    
    setSelectedStatuses(newSelection)
    onFilterChange({
      category: selectedCategories,
      status: newSelection,
      location: selectedLocations,
    })
  }
  
  const handleLocationSelect = (value: string) => {
    const newSelection = selectedLocations.includes(value)
      ? selectedLocations.filter(item => item !== value)
      : [...selectedLocations, value]
    
    setSelectedLocations(newSelection)
    onFilterChange({
      category: selectedCategories,
      status: selectedStatuses,
      location: newSelection,
    })
  }
  
  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedStatuses([])
    setSelectedLocations([])
    onFilterChange({
      category: [],
      status: [],
      location: [],
    })
  }
  
  const totalFilters = selectedCategories.length + selectedStatuses.length + selectedLocations.length
  
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between">
              Category
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={() => handleCategorySelect(category)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCategories.includes(category) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between">
              Status
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status}
                      value={status}
                      onSelect={() => handleStatusSelect(status)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStatuses.includes(status) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between">
              Location
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location}
                      value={location}
                      onSelect={() => handleLocationSelect(location)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedLocations.includes(location) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {location}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center space-x-2">
        {totalFilters > 0 && (
          <>
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              <Filter className="mr-1 h-3 w-3" />
              {totalFilters} active
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
              Clear all
            </Button>
          </>
        )}
      </div>
    </div>
  )
}