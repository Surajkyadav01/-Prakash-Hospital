import { Doctor } from '../types';

export const REAL_DOCTORS: Doctor[] = [
  {
    id: 'dr-op-yadav',
    name: 'Dr. O.P. Yadav',
    hindiName: 'डॉ. ओ.पी. यादव',
    qualifications: 'M.S. (General Surgery)',
    specialty: 'पेट एवं गुदा रोग विशेषज्ञ (Gastro & Proctology Specialist)',
    hindiSpecialty: 'पेट एवं गुदा रोग विशेषज्ञ',
    departmentId: 'general-surgery',
    badge: 'Hospital Owner & Chief Surgeon',
    photoUrl: '/assets/doctors/dr-op-yadav.jpg',
    availability: 'प्रतिदिन (Daily)',
    avatarInitials: 'OP',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'],
    opdTimings: 'प्रतिदिन (Daily)',
    aliases: [
      'op', 'o p', 'op yadav', 'o.p. yadav', 'dr op', 'dr. op', 'dr op yadav', 'dr. o.p. yadav',
      'ओपी', 'ओ.पी.', 'ओ पी', 'ओपी यादव', 'ओ.पी. यादव', 'डॉ ओपी यादव', 'डॉ. ओ.पी. यादव', 'डॉक्टर ओपी',
      'gastro', 'proctology', 'general surgery', 'surgeon', 'pet', 'piles', 'bawasir', 'fistula', 'fissure',
      'पेट', 'गुदा रोग', 'सर्जन', 'लैप्रो', 'बवासीर', 'भगंदर'
    ]
  },
  {
    id: 'dr-vk-yadav',
    name: 'Dr. V.K. Yadav',
    hindiName: 'डॉ. वी.के. यादव',
    qualifications: 'MD (Physician & DM Cardiologist), MBBS (Gold Medalist) KGMU Lucknow, MD Medicine (Gold Medalist) Gorakhpur, DM Cardiologist (Gold Medalist) Lari KGMU Lucknow',
    specialty: 'हृदय रोग विशेषज्ञ (Cardiologist)',
    hindiSpecialty: 'हृदय रोग विशेषज्ञ',
    departmentId: 'cardiology',
    affiliation: 'KGMU Lucknow & Lari Cardiology',
    badge: 'Triple Gold Medalist',
    availability: 'प्रत्येक गुरुवार एवं रविवार, सुबह 10 बजे से (Every Thursday & Sunday from 10:00 AM)',
    avatarInitials: 'VK',
    availableDays: ['Thu', 'Sun'],
    availableSlots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
    opdTimings: 'प्रत्येक गुरुवार एवं रविवार, सुबह 10 बजे से',
    aliases: [
      'vk', 'v k', 'vk yadav', 'v.k. yadav', 'v k yadav', 'dr vk', 'dr. vk', 'dr vk yadav', 'dr. v.k. yadav',
      'bk', 'b k', 'bk yadav', 'b.k. yadav', 'b k yadav', 'dr bk', 'dr. bk', 'dr bk yadav', 'dr. b.k. yadav',
      'वीके', 'वी.के.', 'वी के', 'वीके यादव', 'वी.के. यादव', 'डॉ वीके यादव', 'डॉ. वी.के. यादव',
      'बीके', 'बी.के.', 'बी के', 'बीके यादव', 'बी.के. यादव', 'डॉ बीके यादव', 'डॉ. बी.के. यादव', 'डॉक्टर बीके', 'डॉक्टर वीके',
      'cardiologist', 'cardiology', 'heart doctor', 'cardio', 'heart', 'kgmu', 'lari', 'triple gold medalist',
      'हृदय रोग', 'हार्ट', 'दिल के डॉक्टर', 'कार्डियोलॉजिस्ट'
    ]
  },
  {
    id: 'dr-rk-yadav',
    name: 'Dr. R.K. Yadav',
    hindiName: 'डॉ. आर.के. यादव',
    qualifications: 'M.B.B.S., M.S. (ENT), I.M.S. (BHU)',
    specialty: 'नाक, कान, गला रोग विशेषज्ञ (ENT Specialist)',
    hindiSpecialty: 'नाक, कान, गला रोग विशेषज्ञ',
    departmentId: 'ent',
    affiliation: 'Senior Resident, B.H.U. Trauma Centre',
    badge: 'BHU Trauma Centre',
    availability: 'प्रत्येक रविवार, सायं 5 बजे (Every Sunday, 5:00 PM)',
    avatarInitials: 'RK',
    availableDays: ['Sun'],
    availableSlots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'],
    opdTimings: 'प्रत्येक रविवार, सायं 5 बजे',
    aliases: [
      'rk', 'r k', 'rk yadav', 'r.k. yadav', 'r k yadav', 'dr rk', 'dr. rk', 'dr rk yadav', 'dr. r.k. yadav',
      'आरके', 'आर.के.', 'आर के', 'आरके यादव', 'आर.के. यादव', 'डॉ आरके यादव', 'डॉ. आर.के. यादव', 'डॉक्टर आरके',
      'ent', 'ear', 'nose', 'throat', 'bhu', 'bhu trauma centre',
      'नाक', 'कान', 'गला', 'ईएनटी'
    ]
  },
  {
    id: 'dr-ashutosh-yadav',
    name: 'Dr. Ashutosh Yadav',
    hindiName: 'डॉ. आशुतोष यादव',
    qualifications: 'M.B.B.S. (Gold Medalist)',
    specialty: 'न्यूरो, मानसिक, नशा मुक्ति एवं सेक्स रोग (Neuropsychiatrist, De-addiction & Sexologist)',
    hindiSpecialty: 'न्यूरो, मानसिक, नशा मुक्ति एवं सेक्स रोग',
    departmentId: 'neuro-psychiatry',
    affiliation: 'CPM (Central Institute of Psychiatry, Ranchi)',
    badge: 'Gold Medalist • CIP Ranchi',
    availability: 'प्रत्येक गुरुवार, दोपहर 1 बजे से सायं 5 बजे तक (Every Thursday, 1:00 PM - 5:00 PM)',
    avatarInitials: 'AY',
    availableDays: ['Thu'],
    availableSlots: ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM', '04:30 PM'],
    opdTimings: 'प्रत्येक गुरुवार, दोपहर 1 बजे से सायं 5 बजे तक',
    aliases: [
      'ashutosh', 'ashutosh yadav', 'dr ashutosh', 'dr. ashutosh', 'dr ashutosh yadav',
      'आशुतोष', 'आशुतोष यादव', 'डॉ आशुतोष यादव', 'डॉ. आशुतोष यादव', 'डॉक्टर आशुतोष',
      'neuro', 'psychiatry', 'psychiatrist', 'mental', 'cip', 'ranchi', 'de-addiction', 'sexologist',
      'न्यूरो', 'मानसिक', 'नशा मुक्ति', 'सेक्स रोग', 'दिमाग'
    ]
  },
  {
    id: 'dr-manas-gupta',
    name: 'Dr. Manas Gupta',
    hindiName: 'डॉ. मानस गुप्ता',
    qualifications: 'M.B.B.S., D-Ortho, DNB (Mumbai)',
    specialty: 'हड्डी रोग विशेषज्ञ, ज्वाइंट रिप्लेसमेंट सर्जन (Orthopedic & Joint Replacement Surgeon)',
    hindiSpecialty: 'हड्डी रोग विशेषज्ञ, ज्वाइंट रिप्लेसमेंट सर्जन',
    departmentId: 'orthopedics',
    affiliation: 'DNB (Mumbai)',
    badge: 'Joint Replacement Surgeon',
    availability: 'प्रत्येक मंगलवार व गुरुवार, सायं 3 बजे से 6 बजे तक (Every Tue & Thu, 3:00 PM - 6:00 PM)',
    avatarInitials: 'MG',
    availableDays: ['Tue', 'Thu'],
    availableSlots: ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'],
    opdTimings: 'प्रत्येक मंगलवार व गुरुवार, सायं 3 बजे से 6 बजे तक',
    aliases: [
      'manas', 'gupta', 'manas gupta', 'dr manas', 'dr. manas', 'dr manas gupta',
      'मानस', 'गुप्ता', 'मानस गुप्ता', 'डॉ मानस गुप्ता', 'डॉ. मानस गुप्ता', 'डॉक्टर मानस',
      'ortho', 'orthopedic', 'joint replacement', 'knee', 'bone', 'fracture', 'dnb mumbai',
      'हड्डी', 'ज्वाइंट रिप्लेसमेंट', 'घुटने', 'फ्रैक्चर'
    ]
  },
  {
    id: 'dr-sushila-yadav',
    name: 'Dr. Sushila Yadav',
    hindiName: 'डॉ. सुशीला यादव',
    qualifications: 'M.B.B.S., M.D.',
    specialty: 'निश्चेतक (Anesthetist / Critical Care)',
    hindiSpecialty: 'निश्चेतक',
    departmentId: 'anesthesiology',
    badge: 'Consultant Anesthetist',
    availability: 'अस्पताल में उपलब्ध (Available in Hospital / On Call)',
    avatarInitials: 'SY',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'],
    opdTimings: 'अस्पताल में उपलब्ध / On Call',
    aliases: [
      'sushila', 'sushila yadav', 'dr sushila', 'dr. sushila', 'dr sushila yadav',
      'सुशीला', 'सुशीला यादव', 'डॉ सुशीला यादव', 'डॉ. सुशीला यादव', 'डॉक्टर सुशीला',
      'anesthesia', 'anesthetist', 'critical care', 'icu',
      'निश्चेतक', 'क्रिटिकल केयर', 'बेहोशी'
    ]
  },
  {
    id: 'dr-pooja-jaiswal',
    name: 'Dr. Pooja Jaiswal',
    hindiName: 'डॉ. पूजा जायसवाल',
    qualifications: 'M.B.B.S., M.Derm, PGDCC',
    specialty: 'चर्म रोग एवं सौंदर्य प्रसाधन विशेषज्ञ (Skin & Cosmetology Specialist)',
    hindiSpecialty: 'चर्म रोग एवं सौंदर्य प्रसाधन विशेषज्ञ',
    departmentId: 'dermatology',
    badge: 'Dermatology & Cosmetology',
    availability: 'प्रत्येक मंगलवार, सायं 3 बजे से 6 बजे तक (Every Tuesday, 3:00 PM - 6:00 PM)',
    avatarInitials: 'PJ',
    availableDays: ['Tue'],
    availableSlots: ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'],
    opdTimings: 'प्रत्येक मंगलवार, सायं 3 बजे से 6 बजे तक',
    aliases: [
      'pooja', 'jaiswal', 'pooja jaiswal', 'dr pooja', 'dr. pooja', 'dr pooja jaiswal',
      'पूजा', 'जायसवाल', 'पूजा जायसवाल', 'डॉ पूजा जायसवाल', 'डॉ. पूजा जायसवाल', 'डॉक्टर पूजा',
      'skin', 'derma', 'dermatology', 'dermatologist', 'cosmetology', 'beauty', 'acne',
      'चर्म रोग', 'त्वचा', 'सौंदर्य प्रसाधन', 'मुंहासे'
    ]
  },
  {
    id: 'dr-mamta-yadav',
    name: 'Dr. Mamta Yadav',
    hindiName: 'डॉ. ममता यादव',
    qualifications: 'B.H.M.S.',
    specialty: 'स्त्री एवं प्रसूति रोग विशेषज्ञ (Gynecology & Obstetrics Specialist)',
    hindiSpecialty: 'स्त्री एवं प्रसूति रोग विशेषज्ञ',
    departmentId: 'gynecology',
    badge: 'Women & Child Care',
    availability: 'प्रतिदिन (Daily)',
    avatarInitials: 'MY',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'],
    opdTimings: 'प्रतिदिन (Daily)',
    aliases: [
      'mamta', 'mamta yadav', 'dr mamta', 'dr. mamta', 'dr mamta yadav',
      'ममता', 'ममता यादव', 'डॉ ममता यादव', 'डॉ. ममता यादव', 'डॉक्टर ममता',
      'gynae', 'gynecology', 'obstetrics', 'maternity', 'pregnancy', 'delivery', 'women',
      'स्त्री रोग', 'प्रसूति', 'डिलीवरी', 'महिला डॉक्टर'
    ]
  },
  {
    id: 'dr-ganesh-yadav',
    name: 'Dr. Ganesh Yadav',
    hindiName: 'डॉ. गणेश यादव',
    qualifications: 'M.B.B.S., M.S. (KGMU Lucknow)',
    specialty: 'जनरल एवं लैप्रो सर्जन (General & Laparoscopic Surgeon)',
    hindiSpecialty: 'जनरल एवं लैप्रो सर्जन',
    departmentId: 'general-surgery',
    affiliation: 'KGMU Lucknow',
    badge: 'Laparoscopic Surgeon',
    availability: 'ऑन कॉल (On Call)',
    avatarInitials: 'GY',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['10:30 AM', '12:00 PM', '02:30 PM', '04:30 PM', '06:30 PM'],
    opdTimings: 'ऑन कॉल (On Call)',
    aliases: [
      'ganesh', 'ganesh yadav', 'dr ganesh', 'dr. ganesh', 'dr ganesh yadav',
      'गणेश', 'गणेश यादव', 'डॉ गणेश यादव', 'डॉ. गणेश यादव', 'डॉक्टर गणेश',
      'laparoscopic', 'laparoscopy', 'general surgery', 'kgmu',
      'जनरल सर्जन', 'लैप्रो सर्जन', 'दूरबीन सर्जरी'
    ]
  },
  {
    id: 'dr-sunil-yadav',
    name: 'Dr. Sunil Yadav',
    hindiName: 'डॉ. सुनील यादव',
    qualifications: 'M.B.B.S., MS (Ortho)',
    specialty: 'हड्डी रोग विशेषज्ञ, ज्वाइंट रिप्लेसमेंट सर्जन (Orthopedic & Joint Replacement Surgeon)',
    hindiSpecialty: 'हड्डी रोग विशेषज्ञ, ज्वाइंट रिप्लेसमेंट सर्जन',
    departmentId: 'orthopedics',
    badge: 'Joint Replacement Surgeon',
    availability: 'प्रत्येक शुक्रवार व रविवार, सायं 4 बजे से 8 बजे तक (Every Friday & Sunday, 4:00 PM - 8:00 PM)',
    avatarInitials: 'SY',
    availableDays: ['Fri', 'Sun'],
    availableSlots: ['04:00 PM', '04:45 PM', '05:30 PM', '06:15 PM', '07:00 PM', '07:30 PM'],
    opdTimings: 'प्रत्येक शुक्रवार व रविवार, सायं 4 बजे से 8 बजे तक',
    aliases: [
      'sunil', 'sunil yadav', 'dr sunil', 'dr. sunil', 'dr sunil yadav',
      'सुनील', 'सुनील यादव', 'डॉ सुनील यादव', 'डॉ. सुनील यादव', 'डॉक्टर सुनील',
      'ortho', 'orthopedic', 'joint replacement', 'bone', 'fracture',
      'हड्डी रोग', 'ज्वाइंट रिप्लेसमेंट', 'हड्डी'
    ]
  }
];
