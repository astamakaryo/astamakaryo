
// Enums for fixed categories
export enum EconomicStatus {
  MUZAKKI = 'Muzakki (High Net Worth)',
  MUNFIQ = 'Munfiq (Middle Class)',
  MUSTAHIK = 'Mustahik (Vulnerable)',
}

export enum SpiritualStatus {
  HAFIZ = 'Hafiz',
  INTERMEDIATE = 'Lancar Baca',
  BEGINNER = 'Pemula/Belajar',
}

export enum ProgramCategory {
  ECONOMIC = 'Ekonomi Umat',
  HEALTH = 'Kesehatan',
  EDUCATION = 'Pendidikan',
  SOCIAL = 'Sosial',
  DAWAH = 'Dakwah & Kajian'
}

// Jamaah Profile Interface (CRM)
export interface JamaahProfile {
  id: string;
  name: string;
  age: number;
  gender: 'L' | 'P';
  address: string;
  phone: string;
  profession: string;
  employmentStatus: 'Employed' | 'Unemployed' | 'Student' | 'Retired' | 'Business Owner';
  economicStatus: EconomicStatus;
  spiritualStatus: {
    hajiUmrah: 'Sudah' | 'Terencana' | 'Belum';
    quranLevel: SpiritualStatus;
    prayerDiscipline: number; // 1-5 scale (Gamified streak)
  };
  skills: string[]; // Tags like 'Plumber', 'Developer', 'Doctor'
}

// Program Recommendation Interface
export interface ProgramIdea {
  id: string;
  title: string;
  description: string;
  category: ProgramCategory;
  reason: string; // Why was this suggested?
  targetAudience: string;
  estimatedBudget: number;
  isApproved: boolean;
}

// HRIS & Governance
export interface Employee {
  id: string;
  name: string;
  role: string;
  type: 'Staff' | 'Volunteer';
  status: 'Active' | 'Inactive';
  joinDate: string;
  points?: number; // For gamification of volunteers
  salary?: number; // For staff
}

// Operations & Assets
export interface Asset {
  id: string;
  name: string;
  category: 'Inventory' | 'Electronic' | 'Furniture' | 'Vehicle';
  condition: 'Good' | 'Fair' | 'Poor'; // Poor triggers maintenance alert
  location: string;
  purchaseDate: string;
  value: number;
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  taskName: string;
  date: string;
  status: 'Pending' | 'Completed';
}

// Worship & Events
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Kajian' | 'Khutbah' | 'Social' | 'Workshop' | 'Meeting';
  speaker?: string; // For Khutbah/Kajian
  location: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

// Detailed Mosque Profile (Masjid Information System)
export interface MosqueProfile {
  id: string;
  name: string;
  image: string;
  location: string;
  city: string;
  rating: number;
  reviewsCount: number;
  capacity: number;
  landArea: number; // in m2
  buildingArea: number; // in m2
  foundingYear: number;
  description: string;
  facilities: string[]; // e.g., 'AC', 'Parkir Luas', 'Perpus', 'Ramah Difabel'
  activities: string[]; // e.g., 'Kajian Rutin', 'Jumat Berkah', 'TPA'
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  imam: string;
  openHours: string;
  
  // Detailed Fields
  history?: string;
  dkmStructure?: {
    role: string;
    name: string;
    image?: string;
  }[];
  programs?: {
    title: string;
    description: string;
  }[];
  khutbahSchedule?: {
    date: string;
    khatib: string;
    title: string;
  }[];
  kajianSchedule?: {
    day: string;
    time: string;
    title: string;
    teacher: string;
  }[];
}

// New Categories for content
export type NewsCategory = 'Nasional' | 'Dunia' | 'Ekonomi' | 'Pendidikan' | 'Islam';
export type KhazanahCategory = 'Tauhid' | 'Syariat' | 'Muamalah' | 'Akhlak' | 'Sirah' | 'Sahabat' | 'Keajaiban' | 'Umrah' | 'Haji';

export interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  date?: string;
  author?: string;
  snippet?: string;
}

// Navigation Types
export type ViewMode = 'PUBLIC' | 'ADMIN';
export type AdminSection = 'DASHBOARD' | 'HRIS' | 'OPS' | 'FINANCE' | 'EVENTS' | 'CRM' | 'INNOVATION';
export type PublicSection = 'HOME' | 'TOOL' | 'QUOTES' | 'EXPLORE' | 'ALQURAN';
