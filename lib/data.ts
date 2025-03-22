import {
  User,
  Equipment,
  Event,
  Booking,
  Leaderboard,
  HealthMetrics,
  PersonalBest,
} from "@/types"

// Sample users data
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    joinDate: new Date("2023-01-15"),
    membershipType: "premium",
    membershipStatus: "active",
    profileImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
    phoneNumber: "555-123-4567",
    fitnessLevel: "intermediate",
    healthMetrics: {
      userId: "1",
      weight: 75,
      height: 180,
      bodyFatPercentage: 15,
      bmi: 23.1,
      restingHeartRate: 65,
      lastUpdated: new Date("2023-12-01"),
      personalBests: [
        {
          id: "pb1",
          userId: "1",
          exerciseType: "deadlift",
          value: 180,
          unit: "kg",
          date: new Date("2023-11-15"),
          verified: true,
        },
        {
          id: "pb2",
          userId: "1",
          exerciseType: "bench press",
          value: 100,
          unit: "kg",
          date: new Date("2023-10-20"),
          verified: true,
        },
      ],
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    joinDate: new Date("2022-05-10"),
    membershipType: "elite",
    membershipStatus: "active",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    phoneNumber: "555-987-6543",
    fitnessLevel: "advanced",
    healthMetrics: {
      userId: "2",
      weight: 65,
      height: 170,
      bodyFatPercentage: 18,
      bmi: 22.5,
      restingHeartRate: 60,
      lastUpdated: new Date("2023-12-05"),
      personalBests: [
        {
          id: "pb3",
          userId: "2",
          exerciseType: "squat",
          value: 120,
          unit: "kg",
          date: new Date("2023-11-25"),
          verified: true,
        },
      ],
    },
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "member",
    joinDate: new Date("2023-03-22"),
    membershipType: "basic",
    membershipStatus: "active",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    phoneNumber: "555-456-7890",
    fitnessLevel: "beginner",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "member",
    joinDate: new Date("2023-07-05"),
    membershipType: "premium",
    membershipStatus: "active",
    profileImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    phoneNumber: "555-789-0123",
    fitnessLevel: "intermediate",
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "member",
    joinDate: new Date("2022-11-18"),
    membershipType: "elite",
    membershipStatus: "active",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    phoneNumber: "555-234-5678",
    fitnessLevel: "expert",
  },
]

// Sample equipment data
export const equipment: Equipment[] = [
  {
    id: "1",
    serialNumber: "1",
    name: "Treadmill",
    category: "cardio",
    description: "Commercial grade treadmill with incline functionality",
    location: "Cardio Zone",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1578762560042-46ad127c95ea?q=80&w=300&auto=format&fit=crop",
    purchaseDate: new Date("2022-01-15"),
    lastServiced: new Date("2023-10-10"),
    manufacturer: "LifeFitness",
    model: "T5",
    bookable: true,
  },
  {
    id: "2",
    serialNumber: "2",
    name: "Power Rack",
    category: "strength",
    description: "Heavy duty power rack for squats, bench press, and more",
    location: "Strength Zone",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop",
    purchaseDate: new Date("2021-11-05"),
    lastServiced: new Date("2023-09-15"),
    manufacturer: "Rogue Fitness",
    model: "R-3",
    bookable: true,
  },
  {
    id: "3",
    serialNumber: "3",
    name: "Rowing Machine",
    category: "cardio",
    description: "Air resistance rowing machine",
    location: "Cardio Zone",
    status: "in-use",
    image:
      "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?q=80&w=300&auto=format&fit=crop",
    purchaseDate: new Date("2022-03-20"),
    lastServiced: new Date("2023-11-01"),
    manufacturer: "Concept2",
    model: "Model D",
    bookable: true,
  },
  {
    id: "4",
    serialNumber: "4",
    name: "Adjustable Bench",
    category: "strength",
    description: "Adjustable bench for various exercises",
    location: "Strength Zone",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=300&auto=format&fit=crop",
    purchaseDate: new Date("2022-02-10"),
    lastServiced: new Date("2023-08-20"),
    manufacturer: "Rogue Fitness",
    model: "AB-3",
    bookable: true,
  },
  {
    id: "5",
    serialNumber: "5",
    name: "Cable Machine",
    category: "strength",
    description: "Dual pulley cable machine for various exercises",
    location: "Strength Zone",
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300&auto=format&fit=crop",
    purchaseDate: new Date("2021-12-15"),
    lastServiced: new Date("2023-12-01"),
    manufacturer: "Hammer Strength",
    model: "MJ8",
    bookable: true,
  },
]

// Sample events data
export const events: Event[] = [
  {
    id: "1",
    title: "Monthly Deadlift Competition",
    description:
      "Test your strength in our monthly deadlift competition. Prizes for different weight categories.",
    type: "competition",
    startDate: new Date("2024-01-15T10:00:00"),
    endDate: new Date("2024-01-15T14:00:00"),
    location: "Strength Zone",
    maxParticipants: 20,
    currentParticipants: 12,
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=300&auto=format&fit=crop",
    registrationDeadline: new Date("2024-01-14"),
    status: "upcoming",
  },
  {
    id: "2",
    title: "Push-Up Challenge",
    description:
      "How many push-ups can you do in 2 minutes? Join our challenge and find out!",
    type: "challenge",
    startDate: new Date("2024-01-20T15:00:00"),
    endDate: new Date("2024-01-20T17:00:00"),
    location: "Functional Training Area",
    maxParticipants: 30,
    currentParticipants: 18,
    image:
      "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=300&auto=format&fit=crop",
    registrationDeadline: new Date("2024-01-19"),
    status: "upcoming",
  },
  {
    id: "3",
    title: "Nutrition Workshop",
    description:
      "Learn about proper nutrition for muscle building and fat loss from our expert nutritionists.",
    type: "workshop",
    startDate: new Date("2024-01-25T18:00:00"),
    endDate: new Date("2024-01-25T20:00:00"),
    location: "Conference Room",
    maxParticipants: 25,
    currentParticipants: 15,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=300&auto=format&fit=crop",
    registrationDeadline: new Date("2024-01-24"),
    status: "upcoming",
  },
]

// Sample bookings data
export const bookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    equipmentId: "2",
    startTime: new Date("2024-01-10T10:00:00"),
    endTime: new Date("2024-01-10T11:00:00"),
    status: "confirmed",
    createdAt: new Date("2024-01-05T14:30:00"),
  },
  {
    id: "2",
    userId: "3",
    equipmentId: "1",
    startTime: new Date("2024-01-11T15:00:00"),
    endTime: new Date("2024-01-11T16:00:00"),
    status: "confirmed",
    createdAt: new Date("2024-01-06T09:15:00"),
  },
  {
    id: "3",
    userId: "4",
    equipmentId: "3",
    startTime: new Date("2024-01-12T18:00:00"),
    endTime: new Date("2024-01-12T19:00:00"),
    status: "pending",
    createdAt: new Date("2024-01-07T11:45:00"),
  },
]

// Sample leaderboards data
export const leaderboards: Leaderboard[] = [
  {
    id: "1",
    category: "Deadlift",
    description: "Maximum weight lifted in a single deadlift",
    entries: [
      {
        userId: "1",
        rank: 1,
        value: 180,
        date: new Date("2023-11-15"),
      },
      {
        userId: "5",
        rank: 2,
        value: 170,
        date: new Date("2023-10-20"),
      },
      {
        userId: "2",
        rank: 3,
        value: 150,
        date: new Date("2023-12-05"),
      },
    ],
    lastUpdated: new Date("2023-12-05"),
  },
  {
    id: "2",
    category: "Bench Press",
    description: "Maximum weight lifted in a single bench press",
    entries: [
      {
        userId: "5",
        rank: 1,
        value: 120,
        date: new Date("2023-11-10"),
      },
      {
        userId: "1",
        rank: 2,
        value: 100,
        date: new Date("2023-10-20"),
      },
      {
        userId: "2",
        rank: 3,
        value: 85,
        date: new Date("2023-12-01"),
      },
    ],
    lastUpdated: new Date("2023-12-01"),
  },
  {
    id: "3",
    category: "Push-Ups",
    description: "Maximum number of push-ups in 2 minutes",
    entries: [
      {
        userId: "2",
        rank: 1,
        value: 65,
        date: new Date("2023-11-25"),
      },
      {
        userId: "4",
        rank: 2,
        value: 58,
        date: new Date("2023-12-02"),
      },
      {
        userId: "3",
        rank: 3,
        value: 45,
        date: new Date("2023-11-18"),
      },
    ],
    lastUpdated: new Date("2023-12-02"),
  },
]

// Helper function to get user by ID
export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

// Helper function to get equipment by ID
export function getEquipmentById(id: string): Equipment | undefined {
  return equipment.find((eq) => eq.id === id)
}

// Helper function to get event by ID
export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === event.id)
}

// Helper function to get bookings by user ID
export function getBookingsByUserId(userId: string): Booking[] {
  return bookings.filter((booking) => booking.userId === userId)
}

// Helper function to get personal bests by user ID
export function getPersonalBestsByUserId(userId: string): PersonalBest[] {
  const user = getUserById(userId)
  return user?.healthMetrics?.personalBests || []
}

// Helper function to get health metrics by user ID
export function getHealthMetricsByUserId(
  userId: string
): HealthMetrics | undefined {
  const user = getUserById(userId)
  return user?.healthMetrics
}
