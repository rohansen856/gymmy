export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  joinDate: Date;
  membershipType: 'basic' | 'premium' | 'elite';
  membershipStatus: 'active' | 'inactive' | 'pending';
  profileImage?: string;
  phoneNumber?: string;
  emergencyContact?: string;
  healthMetrics?: HealthMetrics;
  achievements?: Achievement[];
  bookings?: Booking[];
  attendanceHistory?: Attendance[];
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface HealthMetrics {
  userId: string;
  weight: number; // in kg
  height: number; // in cm
  bodyFatPercentage?: number;
  bmi?: number;
  restingHeartRate?: number;
  bloodPressure?: string;
  lastUpdated: Date;
  personalBests?: PersonalBest[];
  fitnessGoals?: string[];
  notes?: string;
}

export interface PersonalBest {
  id: string;
  userId: string;
  exerciseType: string;
  value: number;
  unit: string;
  date: Date;
  verified: boolean;
  notes?: string;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  dateEarned: Date;
  badgeImage?: string;
  category: 'strength' | 'endurance' | 'flexibility' | 'attendance' | 'challenge';
}

export interface Equipment {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'functional' | 'other';
  description: string;
  location: string;
  status: 'available' | 'in-use' | 'maintenance' | 'out-of-order';
  maintenanceHistory?: MaintenanceRecord[];
  image?: string;
  purchaseDate?: Date;
  lastServiced?: Date;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  bookable: boolean;
  usageStatistics?: EquipmentUsage[];
}

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  date: Date;
  description: string;
  technician: string;
  cost?: number;
  notes?: string;
}

export interface EquipmentUsage {
  equipmentId: string;
  date: Date;
  totalHours: number;
  peakHours: string[];
  userCount: number;
}

export interface Booking {
  id: string;
  userId: string;
  equipmentId: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  createdAt: Date;
  notes?: string;
  recurring?: boolean;
  recurringPattern?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'competition' | 'workshop' | 'social' | 'challenge';
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants?: number;
  currentParticipants?: number;
  participants?: string[]; // User IDs
  image?: string;
  registrationDeadline?: Date;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  results?: EventResult[];
}

export interface EventResult {
  eventId: string;
  userId: string;
  rank: number;
  score: number;
  notes?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  checkInTime: Date;
  checkOutTime?: Date;
  duration?: number; // in minutes
}

export interface Leaderboard {
  id: string;
  category: string;
  description: string;
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}

export interface LeaderboardEntry {
  userId: string;
  rank: number;
  value: number;
  date: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
  link?: string;
}

export interface PredictionModel {
  id: string;
  name: string;
  description: string;
  type: 'performance' | 'equipment' | 'booking' | 'classification';
  accuracy?: number;
  lastTrained: Date;
  parameters?: Record<string, any>;
}

export interface PerformancePrediction {
  userId: string;
  exerciseType: string;
  predictedValue: number;
  confidence: number;
  factors: string[];
  date: Date;
}

export interface EquipmentDemandForecast {
  equipmentId: string;
  date: Date;
  predictedDemand: number;
  peakHours: string[];
  confidence: number;
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  criteria: Record<string, any>;
  createdAt: Date;
}