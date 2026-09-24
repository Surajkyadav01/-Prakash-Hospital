export type PageView = 
  | 'home'
  | 'about-us'
  | 'services'
  | 'super-speciality'
  | 'doctors'
  | '24-7-services'
  | 'blog'
  | 'contacts'
  | 'login'
  | 'book-appointment'
  | 'ambulance';

export interface Department {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  headDoctor: string;
  bedCapacity: string;
  features: string[];
}

export interface Doctor {
  id: string;
  name: string;
  hindiName?: string;
  qualifications: string;
  specialty: string;
  hindiSpecialty?: string;
  departmentId: string;
  affiliation?: string;
  availability: string;
  avatarInitials: string;
  badge?: string;
  photoUrl?: string;
  availableDays?: string[];
  availableSlots?: string[];
  opdTimings?: string;
  consultationFee?: number;
  experience?: string;
  rating?: number;
  reviewCount?: number;
  roomNo?: string;
  education?: string[];
  languages?: string[];
  aliases?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facilities' | 'wards' | 'tech_labs';
  categoryLabel: string;
  imageUrl: string;
  fallbackUrl?: string;
  caption: string;
}

export interface TPAPartner {
  id: string;
  name: string;
  category: 'Private Insurance' | 'Govt Scheme' | 'Corporate';
  logoText: string;
  badgeColor?: string;
  badgeType: 'cashless' | 'empanelled';
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  summary: string;
  imageUrl: string;
}

export interface BookingFormData {
  departmentId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientAge?: string;
  patientGender?: 'male' | 'female' | 'other';
  reason?: string;
  isExistingPatient: boolean;
  uhidNumber?: string;
}

export interface AppointmentConfirmation {
  bookingId: string;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  consultationFee: number;
  roomNo: string;
}
