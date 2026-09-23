import { REAL_DOCTORS } from "./doctorsData";
import { Department, Doctor, GalleryItem, TPAPartner, BlogPost } from '../types';

export const HOSPITAL_INFO = {
  name: 'Prakash Hospital & Multi-Speciality Care',
  shortName: 'Prakash Hospital',
  tagline: 'Advanced Healthcare with Human Touch',
  accreditation: 'NABH & NABL Accredited Multi-Speciality Hospital',
  establishedYear: '2020',
  experienceYears: '10+',
  emergencyNumber: '+91 83838 26205',
  emergencyPhoneRaw: '+918383826205',
  ambulanceNumber: '+91 83838 26205',
  opdHelpline: '+91 83838 26205',
  whatsappNumber: '+91 83838 26205',
  whatsappUrl: 'https://wa.me/918383826205?text=Hello%20Prakash%20Hospital,%20I%20want%20to%20enquire%20about%20healthcare%20services',
  address: 'Prakash Hospital, opp. Old Indian Oil Petrol Pump, Bhadohi, Suriyawan, Uttar Pradesh 221404',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Prakash+Hospital,+opp.+Old+Indian+Oil+Petrol+Pump,+Bhadohi,+Suriyawan,+Uttar+Pradesh+221404&t=&z=15&ie=UTF8&iwloc=&output=embed',
  googleMapsDirections: 'https://maps.google.com/?q=Prakash+Hospital,+opp.+Old+Indian+Oil+Petrol+Pump,+Bhadohi,+Suriyawan,+Uttar+Pradesh+221404',
  email: 'kamlesh8383826205@gmail.com',
  opdHours: 'Mon - Sat: 08:30 AM - 08:00 PM | Sun: 09:00 AM - 01:00 PM',
  emergencyHours: '24 Hours Open (365 Days a Year)',
};

export interface SocialMediaChannel {
  id: string;
  name: string;
  handle: string;
  description: string;
  url: string; // Replace with actual link when ready
  isConfigured: boolean;
  brandColor: string;
  iconBg: string;
  badge: string;
}

export const SOCIAL_MEDIA_CHANNELS: SocialMediaChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+91 83838 26205',
    description: 'Instant OPD chat, doctor schedules & queries',
    url: 'https://wa.me/918383826205?text=Hello%20Prakash%20Hospital,%20I%20want%20to%20enquire%20about%20healthcare%20services',
    isConfigured: true,
    brandColor: 'text-emerald-400 group-hover:text-emerald-300',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
    badge: '24x7 Active'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@prakashhospital_suriyawan',
    description: 'Daily health tips, wellness reels & doctor bytes',
    url: 'https://instagram.com', // Will be updated when user provides actual URL
    isConfigured: false,
    brandColor: 'text-pink-400 group-hover:text-pink-300',
    iconBg: 'bg-pink-500/10 border-pink-500/30 text-pink-400 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white',
    badge: 'Follow Us'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Prakash Hospital Multi-Speciality',
    description: 'Community health camps, seminars & patient stories',
    url: 'https://facebook.com', // Will be updated when user provides actual URL
    isConfigured: false,
    brandColor: 'text-blue-400 group-hover:text-blue-300',
    iconBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white',
    badge: 'Official Page'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'Prakash Hospital Health Desk',
    description: 'Doctor interviews, surgery explanations & patient testimonials',
    url: 'https://youtube.com', // Will be updated when user provides actual URL
    isConfigured: false,
    brandColor: 'text-red-400 group-hover:text-red-300',
    iconBg: 'bg-red-500/10 border-red-500/30 text-red-400 group-hover:bg-red-600 group-hover:text-white',
    badge: 'Watch Videos'
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: "general-surgery",
    name: "General & Laparoscopic Surgery (जनरल एवं लैप्रो सर्जरी)",
    shortDesc: "Gastroenterology, proctology, general surgery & advanced laparoscopic care.",
    fullDesc: "Comprehensive surgical care including GI disorders, laparoscopic surgeries, proctology (piles, fistula, fissure), and emergency surgical management.",
    iconName: "Activity",
    headDoctor: "Dr. O.P. Yadav",
    bedCapacity: "Modular OT & Surgical Suite",
    features: ["Gold Medalist Gastro & Proctology Clinic", "Keyhole Laparoscopic Surgeries", "24x7 Emergency Surgical Backup", "Post-Operative Recovery Ward"]
  },
  {
    id: "cardiology",
    name: "Cardiology (हृदय रोग विभाग)",
    shortDesc: "Cardiovascular consultations, hypertension, ECG & heart health management.",
    fullDesc: "Expert cardiology consultations and heart health management led by DM Cardiologist Dr. V.K. Yadav (KGMU Lucknow).",
    iconName: "HeartPulse",
    headDoctor: "Dr. V.K. Yadav",
    bedCapacity: "Cardiac Care Bay",
    features: ["Specialist Heart Disease OPD", "Comprehensive Cardiac Assessment", "Hypertension & Lifestyle Consultation", "Post-Cardiac Procedure Follow-up"]
  },
  {
    id: "orthopedics",
    name: "Orthopedics & Joint Replacement (हड्डी रोग एवं ज्वाइंट रिप्लेसमेंट)",
    shortDesc: "Joint replacement, trauma care, fracture management & arthroscopy.",
    fullDesc: "Advanced orthopedic consultations specializing in joint replacement, trauma management, arthritis, and musculoskeletal care.",
    iconName: "ShieldAlert",
    headDoctor: "Dr. Manas Gupta",
    bedCapacity: "Dedicated Ortho Care",
    features: ["Joint Replacement & Arthroplasty OPD", "Fracture & Complex Trauma Management", "Arthritis & Chronic Joint Pain Care", "Spine & Musculoskeletal Rehabilitation"]
  },
  {
    id: "ent",
    name: "ENT - Ear, Nose & Throat (नाक, कान, गला रोग)",
    shortDesc: "Comprehensive diagnosis and care for ear, nose, and throat disorders.",
    fullDesc: "Specialized ENT care by BHU Trauma Centre Senior Resident Dr. R.K. Yadav for chronic sinusitis, ear disorders, throat infections, and trauma.",
    iconName: "Stethoscope",
    headDoctor: "Dr. R.K. Yadav",
    bedCapacity: "ENT Consultation Suite",
    features: ["Nose, Ear & Throat OPD Care", "BHU Trauma Centre Trained Senior Resident", "Hearing & Sinus Assessment", "Microscopic Ear & Throat Procedures"]
  },
  {
    id: "neuro-psychiatry",
    name: "Neuropsychiatry & De-Addiction (न्यूरो, मानसिक एवं नशा मुक्ति)",
    shortDesc: "Neuropsychiatry, mental wellness, de-addiction therapy & psycho-sexual counseling.",
    fullDesc: "Clinical evaluation, psychiatric management, de-addiction therapy, and mental wellness care by CIP Ranchi trained specialist.",
    iconName: "Brain",
    headDoctor: "Dr. Ashutosh Yadav",
    bedCapacity: "Wellness & Counseling Bay",
    features: ["Central Institute of Psychiatry (CIP) Ranchi Trained", "Comprehensive Mental Health OPD", "Substance De-Addiction Counseling", "Neuro-Psychiatric Care"]
  },
  {
    id: "dermatology",
    name: "Dermatology & Cosmetology (चर्म रोग एवं सौंदर्य प्रसाधन)",
    shortDesc: "Clinical dermatology, skin disorders & aesthetic cosmetology.",
    fullDesc: "Specialized medical skin care for psoriasis, eczema, acne, allergy management, and professional cosmetic dermatology.",
    iconName: "Crosshair",
    headDoctor: "Dr. Pooja Jaiswal",
    bedCapacity: "Cosmetology Procedure Suite",
    features: ["Clinical Skin Disease Management", "Cosmetology & Aesthetic Procedures", "Allergy & Acne Specialized OPD", "Dermatology Diagnostics"]
  },
  {
    id: "gynecology",
    name: "Gynecology & Obstetrics (स्त्री एवं प्रसूति रोग)",
    shortDesc: "Women health, antenatal care, maternity & gynecological consultation.",
    fullDesc: "Compassionate maternal and women’s health services including routine checkups, antenatal care, and general gynecological OPD.",
    iconName: "Baby",
    headDoctor: "Dr. Mamta Yadav",
    bedCapacity: "Maternity & Women Bay",
    features: ["Daily Outpatient Women OPD", "Antenatal & Postnatal Care", "Reproductive & Hormonal Health", "General Gynecological Care"]
  },
  {
    id: "anesthesiology",
    name: "Anesthesiology & Critical Care (निश्चेतक एवं क्रिटिकल केयर)",
    shortDesc: "Perioperative care, surgical anesthesia, pain management & intensive monitoring.",
    fullDesc: "Dedicated anesthesia services ensuring patient safety during major and minor surgical procedures and critical care stabilization.",
    iconName: "Wind",
    headDoctor: "Dr. Sushila Yadav",
    bedCapacity: "PACU & Surgical Recovery",
    features: ["Pre-Anesthetic Checkup (PAC)", "General, Regional & Local Anesthesia", "Critical Care Support & Monitoring", "Post-Operative Acute Pain Relief"]
  }
];

export const DOCTORS: Doctor[] = REAL_DOCTORS;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Advanced Intensive Care Unit (ICU)',
    category: 'facilities',
    categoryLabel: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    caption: '24-bed multidisciplinary ICU equipped with high-end mechanical ventilators, invasive haemodynamic monitoring, and 1:1 nurse-patient ratio.'
  },
  {
    id: 'gal-2',
    title: 'Modular Operation Theatre (OT)',
    category: 'facilities',
    categoryLabel: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    caption: 'Class 100 laminar airflow modular operation theatres with HEPA filtration, anti-microbial surfaces, and robotic surgical consoles.'
  },
  {
    id: 'gal-3',
    title: 'Super Deluxe Patient Suite',
    category: 'wards',
    categoryLabel: 'Wards',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800',
    caption: 'Spacious patient room with motorized ergonomic bed, companion sofa bed, central oxygen, Wi-Fi, and 24/7 dedicated nurse call button.'
  },
  {
    id: 'gal-4',
    title: 'Advanced MRI & CT Diagnostics',
    category: 'tech_labs',
    categoryLabel: 'Tech & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    caption: '1.5 Tesla Silent Scan MRI and 128-Slice Cardiac CT for rapid non-invasive diagnostic precision.'
  },
  {
    id: 'gal-5',
    title: 'Hospital Central Reception & Helpdesk',
    category: 'facilities',
    categoryLabel: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    caption: 'Welcoming, spacious patient assistance desk with digital token management and dedicated TPA cashless desks.'
  },
  {
    id: 'gal-6',
    title: '24x7 In-House Hospital Pharmacy',
    category: 'tech_labs',
    categoryLabel: 'Tech & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800',
    caption: 'Fully stocked 24-hour pharmacy ensuring authentic medications, cold-chain vaccines, and surgical supplies at approved rates.'
  },
  {
    id: 'gal-7',
    title: 'Level-III Neonatal ICU (NICU)',
    category: 'wards',
    categoryLabel: 'Wards',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    caption: 'Gentle warmth and clinical monitoring for critical newborns with dedicated neonatologists and pediatric nurses.'
  },
  {
    id: 'gal-8',
    title: 'Automated NABL Accredited Pathology Lab',
    category: 'tech_labs',
    categoryLabel: 'Tech & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    caption: 'Fully automated robotic analyzers for biochemistry, hematology, microbiology, and rapid cardiac markers.'
  }
];

export const TPA_PARTNERS: TPAPartner[] = [
  { id: 'star-health', name: 'Star Health Allied Insurance', category: 'Private Insurance', logoText: 'Star Health', badgeType: 'cashless' },
  { id: 'hdfc-ergo', name: 'HDFC ERGO General Insurance', category: 'Private Insurance', logoText: 'HDFC ERGO', badgeType: 'cashless' },
  { id: 'care-health', name: 'Care Health Insurance (Religare)', category: 'Private Insurance', logoText: 'Care Health', badgeType: 'cashless' },
  { id: 'ayushman-pmjay', name: 'Ayushman Bharat PM-JAY', category: 'Govt Scheme', logoText: 'PM-JAY Scheme', badgeType: 'empanelled' },
  { id: 'icici-lombard', name: 'ICICI Lombard Health', category: 'Private Insurance', logoText: 'ICICI Lombard', badgeType: 'cashless' },
  { id: 'niva-bupa', name: 'Niva Bupa Health Insurance', category: 'Private Insurance', logoText: 'Niva Bupa', badgeType: 'cashless' },
  { id: 'bajaj-allianz', name: 'Bajaj Allianz General Insurance', category: 'Private Insurance', logoText: 'Bajaj Allianz', badgeType: 'cashless' },
  { id: 'cghs-echs', name: 'CGHS & ECHS Beneficiaries', category: 'Govt Scheme', logoText: 'CGHS / ECHS', badgeType: 'empanelled' },
  { id: 'tata-aig', name: 'Tata AIG General Insurance', category: 'Private Insurance', logoText: 'Tata AIG', badgeType: 'cashless' },
  { id: 'medi-assist', name: 'Medi Assist TPA', category: 'Corporate', logoText: 'Medi Assist', badgeType: 'cashless' },
  { id: 'paramount-tpa', name: 'Paramount Health TPA', category: 'Corporate', logoText: 'Paramount TPA', badgeType: 'cashless' },
  { id: 'vidal-health', name: 'Vidal Health TPA', category: 'Corporate', logoText: 'Vidal Health', badgeType: 'cashless' }
];

export const SERVICES_24X7 = [
  {
    title: '24x7 Emergency & Trauma Care',
    desc: 'Equipped with dedicated resuscitation bays, mobile X-ray, trauma surgeons, and emergency triage team ready 24/7.',
    iconName: 'Ambulance',
    badge: 'Immediate Response'
  },
  {
    title: 'Advanced Life Support (ALS) Ambulance',
    desc: 'GPS-tracked ICU on wheels with transport ventilator, multi-channel monitor, defibrillator, and trained paramedics.',
    iconName: 'ShieldAlert',
    badge: '< 15 Mins Dispatch'
  },
  {
    title: '24x7 Blood Storage & Component Unit',
    desc: 'Authorized round-the-clock availability of PRBC, Platelets, Fresh Frozen Plasma (FFP), and Cryoprecipitate.',
    iconName: 'Droplets',
    badge: 'Govt Approved'
  },
  {
    title: '24-Hour Digital X-Ray, CT & MRI',
    desc: 'Instant diagnostic reporting with digital PACS imaging and on-call senior consultant radiologists.',
    iconName: 'ScanLine',
    badge: 'Immediate Reports'
  },
  {
    title: '24x7 In-House Pharmacy',
    desc: 'Reliable dispensing of critical life-saving injections, emergency cardiology medicines, and surgical consumables.',
    iconName: 'Pill',
    badge: '100% Genuine'
  },
  {
    title: '24x7 Dialysis & Intensive Care',
    desc: 'Round-the-clock emergency dialysis for acute renal failure, poisoning, and fluid overload emergencies.',
    iconName: 'Activity',
    badge: 'Critical Care'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Golden Hour in Heart Attack: Recognizing Early Signs and Prompt Action',
    category: 'Cardiology',
    author: 'Dr. Rajesh Sharma',
    authorRole: 'Director, Interventional Cardiology',
    date: 'Sep 15, 2026',
    readTime: '4 min read',
    summary: 'Understanding the first 60 minutes after symptoms appear and why primary angioplasty saves vital cardiac muscle tissues.',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b2',
    title: 'Robotic Knee Replacement vs Traditional Surgery: What Patients Need to Know',
    category: 'Orthopedics',
    author: 'Dr. Amit Vashisht',
    authorRole: 'Chief Joint Replacement Surgeon',
    date: 'Sep 08, 2026',
    readTime: '5 min read',
    summary: 'How robotic arm guidance provides millimeter-level implant alignment, minimal blood loss, and faster walking recovery.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b3',
    title: 'Protecting Kidney Function: Managing Diabetes and High Blood Pressure Early',
    category: 'Nephrology',
    author: 'Dr. Ananya Goel',
    authorRole: 'Senior Consultant Nephrologist',
    date: 'Aug 29, 2026',
    readTime: '3 min read',
    summary: 'Essential periodic microalbumin tests and dietary lifestyle adjustments to preserve glomerular filtration in chronic diabetes.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600'
  }
];
