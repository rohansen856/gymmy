"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BarChart3,
  Users,
  Dumbbell,
  Calendar,
  Trophy,
  Award,
  Settings,
  Menu,
  X,
  Sandwich,
  Clock,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/ui/mode-toggle"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  admin?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Members",
    href: "/members",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Equipment",
    href: "/equipment",
    icon: <Dumbbell className="mr-2 h-4 w-4" />,
  },
  {
    title: "Bookings",
    href: "/bookings",
    icon: <Calendar className="mr-2 h-4 w-4" />,
  },
  {
    title: "Events",
    href: "/events",
    icon: <Trophy className="mr-2 h-4 w-4" />,
  },
  {
    title: "Hall of Fame",
    href: "/hall-of-fame",
    icon: <Award className="mr-2 h-4 w-4" />,
  },
  {
    title: "Deadlift predictor",
    href: "/predictions/deadlift",
    icon: <Dumbbell className="mr-2 h-4 w-4" />,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: <Clock className="mr-2 h-4 w-4" />,
  },
  {
    title: "Diet",
    href: "/predictions/diet",
    icon: <Sandwich className="mr-2 h-4 w-4" />,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: <Settings className="mr-2 h-4 w-4" />,
    admin: true,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Dumbbell className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Gymmy</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Dumbbell className="h-6 w-6" />
            <span className="ml-2 font-bold">Gymmy</span>
          </Link>
          <Button
            variant="ghost"
            className="ml-auto h-8 w-8 p-0"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
