"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  className?: string
  variant?: "default" | "success" | "warning" | "danger" | "info"
}

const iconVariants = cva("h-5 w-5 transition-all", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      success: "text-green-500",
      warning: "text-yellow-500",
      danger: "text-red-500",
      info: "text-blue-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const cardVariants = cva("transition-all", {
  variants: {
    variant: {
      default: "",
      success: "border-green-200 dark:border-green-800",
      warning: "border-yellow-200 dark:border-yellow-800",
      danger: "border-red-200 dark:border-red-800",
      info: "border-blue-200 dark:border-blue-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  className,
  variant = "default",
}: StatsCardProps) {
  return (
    <Card className={cn(cardVariants({ variant }), className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn(iconVariants({ variant }))} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
