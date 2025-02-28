"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Equipment } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Info } from "lucide-react"
import { formatDate, getStatusColor } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

interface EquipmentCardProps {
  equipment: Equipment
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        {equipment.image ? (
          <img 
            src={equipment.image} 
            alt={equipment.name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            No image available
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(equipment.status)}>
            {equipment.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{equipment.name}</h3>
          <Badge variant="outline">{equipment.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{equipment.description}</p>
        <div className="mt-2 text-sm">
          <p className="flex items-center text-muted-foreground">
            <span className="font-medium mr-2">Location:</span> {equipment.location}
          </p>
          {equipment.lastServiced && (
            <p className="flex items-center text-muted-foreground">
              <span className="font-medium mr-2">Last serviced:</span> 
              {formatDate(equipment.lastServiced, 'PP')}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Info className="mr-2 h-4 w-4" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{equipment.name}</DialogTitle>
              <DialogDescription>
                {equipment.category} equipment
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{equipment.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">{equipment.location}</p>
                </div>
                <div>
                  <h4 className="font-medium">Status</h4>
                  <Badge className={`mt-1 ${getStatusColor(equipment.status)}`}>
                    {equipment.status}
                  </Badge>
                </div>
              </div>
              {equipment.manufacturer && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Manufacturer</h4>
                    <p className="text-sm text-muted-foreground">{equipment.manufacturer}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Model</h4>
                    <p className="text-sm text-muted-foreground">{equipment.model}</p>
                  </div>
                </div>
              )}
              {equipment.purchaseDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Purchase Date</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(equipment.purchaseDate, 'PP')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Last Serviced</h4>
                    <p className="text-sm text-muted-foreground">
                      {equipment.lastServiced ? formatDate(equipment.lastServiced, 'PP') : 'N/A'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        {equipment.bookable && equipment.status === 'available' && (
          <Link href={`/bookings/new?equipmentId=${equipment.id}`}>
            <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Book
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}