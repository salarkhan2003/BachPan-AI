import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  waitTime: string; // e.g., "15 min", "No wait"
  services: string[];
}

export interface VaccineStock {
  id: string;
  name: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

export interface AqiData {
  city: string;
  aqi: number;
  level: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  recommendation: string;
}

export interface CommunityTip {
  id: string;
  author: string;
  avatarUrl?: string;
  tipText: string;
  location: string;
  timestamp: string; // ISO date string
  symptoms?: string[];
  ageRange?: string;
  categories?: string[];
  isVerified?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  ageMonths: number; // e.g., 3 for 3 months old
  description: string;
  achieved: boolean;
  dateAchieved?: string; // ISO date string
}

export interface ImmunizationAlert {
  id: string;
  vaccineName: string;
  dueDate: string; // ISO date string
  status: 'Upcoming' | 'Due' | 'Overdue' | 'Completed';
  notes?: string;
}

export interface VoiceTriageResult {
  potentialCauses: string[];
  recommendedActions: string[];
  analysisDepth: string;
}

export interface RashScanResult {
  possibleConditions: string[];
  recommendedNextSteps: string;
}

export interface CategorizedTipResult {
  symptoms: string[];
  ageRange: string;
  location: string;
  categories: string[];
}
