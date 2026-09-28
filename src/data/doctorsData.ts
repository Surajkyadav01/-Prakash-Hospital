import { Doctor } from '../types';

export const REAL_DOCTORS: Doctor[] = [
  {
    id: 'dr-op-yadav',
    name: 'Dr. O.P. Yadav',
    hindiName: 'डॉ. ओ.पी. यादव',
    qualifications: 'M.S. (General Surgery) • Gold Medalist',
    specialty: 'जनरल, लेप्रोस्कोपिक एवं गैस्ट्रो सर्जन (Chief Surgeon & Hospital Owner)',
    hindiSpecialty: 'जनरल, लेप्रोस्कोपिक एवं गैस्ट्रो सर्जन',
    departmentId: 'general-surgery',
    affiliation: 'Hospital Owner & Chief Surgeon',
    badge: 'Hospital Owner & Chief Surgeon',
    photoUrl: '/assets/doctors/dr-op-yadav.jpg',
    availability: 'प्रतिदिन (Daily OPD & Emergency Surgery)',
    avatarInitials: 'OP',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM', '05:30 PM', '07:00 PM'],
    opdTimings: 'प्रतिदिन 10:00 AM - 08:00 PM',
    aliases: [
      'op', 'o p', 'op yadav', 'o.p. yadav', 'o p yadav', 'dr op', 'dr. op', 'dr op yadav', 'dr. o.p. yadav',
      'ओपी', 'ओ.पी.', 'ओ पी', 'ओपी यादव', 'ओ.पी. यादव', 'डॉ ओपी यादव', 'डॉ. ओ.पी. यादव',
      'surgeon', 'surgery', 'chief surgeon', 'hospital owner', 'owner', 'laparoscopy', 'piles', 'fistula',
      'सर्जन', 'मालिक', 'चीफ सर्जन', 'ऑपरेशन', 'लैप्रोस्कोपी'
    ]
  },
  {
    id: 'dr-vk-yadav',
    name: 'Dr. V.K. Yadav',
    hindiName: 'डॉ. वी.के. यादव',
    qualifications: 'MBBS (Gold Medalist) KGMU Lucknow, MD Medicine (Gold Medalist) Gorakhpur, DM Cardiology (Gold Medalist) Lari KGMU Lucknow',
    specialty: 'हृदय रोग विशेषज्ञ (MD Physician & DM Cardiologist)',
    hindiSpecialty: 'हृदय रोग विशेषज्ञ',
    departmentId: 'cardiology',
    affiliation: 'KGMU Lucknow & Lari Cardiology',
    badge: 'Triple Gold Medalist',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-vk-yadav.jpg',
    availability: 'प्रत्येक गुरूवार एवं रविवार सुबह 10 बजे से',
    avatarInitials: 'VK',
    availableDays: ['Thu', 'Sun'],
    availableSlots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
    opdTimings: 'प्रत्येक गुरूवार एवं रविवार सुबह 10 बजे से',
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
    id: 'dr-ashutosh-yadav',
    name: 'Dr. Ashutosh Yadav',
    hindiName: 'डॉ. आशुतोष यादव',
    qualifications: 'MBBS (Gold Medalist), DPM (Central Institute of Psychiatry, Ranchi)',
    specialty: 'न्यूरो, मानसिक, नशा मुक्ति एवं सेक्स रोग (Neuropsychiatrist & De-addiction)',
    hindiSpecialty: 'न्यूरो, मानसिक, नशा मुक्ति एवं सेक्स रोग',
    departmentId: 'neuro-psychiatry',
    affiliation: 'Central Institute of Psychiatry, Ranchi',
    badge: 'Gold Medalist • CIP Ranchi',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-ashutosh-yadav.jpg',
    availability: 'प्रत्येक गुरूवार, दोपहर 01 बजे से 5 बजे सायं तक',
    avatarInitials: 'AY',
    availableDays: ['Thu'],
    availableSlots: ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM', '04:30 PM'],
    opdTimings: 'प्रत्येक गुरूवार, दोपहर 01 बजे से 5 बजे सायं तक',
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
    qualifications: 'MBBS, D-Ortho DNB (Mumbai)',
    specialty: 'हड्डी रोग विशेषज्ञ, ज्वाइंट रिप्लेसमेंट सर्जन (Orthopedic & Joint Replacement Surgeon)',
    hindiSpecialty: 'हड्डी रोग विशेषज्ञ, ज्वाइंट रिप्लेसमेंट सर्जन',
    departmentId: 'orthopedics',
    affiliation: 'DNB (Mumbai)',
    badge: 'Joint Replacement Surgeon',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-manas-gupta.jpg',
    availability: 'प्रत्येक मंगलवार व गुरूवार, सायं 3 से 6 बजे तक',
    avatarInitials: 'MG',
    availableDays: ['Tue', 'Thu'],
    availableSlots: ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'],
    opdTimings: 'प्रत्येक मंगलवार व गुरूवार, सायं 3 से 6 बजे तक',
    aliases: [
      'manas', 'gupta', 'manas gupta', 'dr manas', 'dr. manas', 'dr manas gupta',
      'मानस', 'गुप्ता', 'मानस गुप्ता', 'डॉ मानस गुप्ता', 'डॉ. मानस गुप्ता', 'डॉक्टर मानस',
      'ortho', 'orthopedic', 'joint replacement', 'knee', 'bone', 'fracture', 'dnb mumbai',
      'हड्डी', 'ज्वाइंट रिप्लेसमेंट', 'घुटने', 'फ्रैक्चर'
    ]
  },
  {
    id: 'dr-rk-yadav',
    name: 'Dr. R.K. Yadav',
    hindiName: 'डॉ. आर.के. यादव',
    qualifications: 'M.B.B.S., M.S. (E.N.T.)',
    specialty: 'नाक, कान एवं गला रोग विशेषज्ञ (Senior Resident BHU Trauma Centre)',
    hindiSpecialty: 'नाक, कान एवं गला रोग विशेषज्ञ',
    departmentId: 'ent',
    affiliation: 'Senior Resident, BHU Trauma Centre Varanasi',
    badge: 'BHU Trauma Centre',
    availability: 'प्रत्येक रविवार, सुबह 11 बजे से सायं 3 बजे तक',
    avatarInitials: 'RK',
    availableDays: ['Sun'],
    availableSlots: ['11:00 AM', '11:45 AM', '12:30 PM', '01:30 PM', '02:15 PM'],
    opdTimings: 'प्रत्येक रविवार, सुबह 11:00 AM - 03:00 PM',
    aliases: [
      'rk', 'r k', 'rk yadav', 'r.k. yadav', 'r k yadav', 'dr rk', 'dr. rk', 'dr rk yadav', 'dr. r.k. yadav',
      'आरके', 'आर.के.', 'आर के', 'आरके यादव', 'आर.के. यादव', 'डॉ आरके यादव', 'डॉ. आर.के. यादव',
      'ent', 'ear', 'nose', 'throat', 'bhu', 'trauma centre', 'varanasi',
      'ईएनटी', 'नाक', 'कान', 'गला'
    ]
  },
  {
    id: 'dr-susheela-yadav',
    name: 'Dr. Susheela Yadav',
    hindiName: 'डॉ. सुशीला यादव',
    qualifications: 'एम.बी.बी.एस., एम.डी.',
    specialty: 'निश्चेतक (Consultant Anesthetist / Critical Care)',
    hindiSpecialty: 'निश्चेतक',
    departmentId: 'anesthesiology',
    badge: 'Consultant Anesthetist',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-susheela-yadav.jpg',
    availability: 'अस्पताल में उपलब्ध (Available in Hospital / On Call)',
    avatarInitials: 'SY',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'],
    opdTimings: 'अस्पताल में उपलब्ध (Available in Hospital / On Call)',
    aliases: [
      'susheela', 'sushila', 'susheela yadav', 'sushila yadav', 'dr susheela', 'dr. susheela', 'dr sushila', 'dr. sushila',
      'सुशीला', 'सुशीला यादव', 'डॉ सुशीला यादव', 'डॉ. सुशीला यादव', 'डॉक्टर सुशीला',
      'anesthesia', 'anesthetist', 'critical care', 'icu',
      'निश्चेतक', 'क्रिटिकल केयर', 'बेहोशी'
    ]
  },
  {
    id: 'dr-pooja-jaiswal',
    name: 'Dr. Pooja Jaiswal',
    hindiName: 'डॉ. पूजा जायसवाल',
    qualifications: 'MBBS, M.Derm, PGDCC',
    specialty: 'चर्मरोग एवं सौंदर्य प्रसाधन विशेषज्ञ (Dermatology & Cosmetology)',
    hindiSpecialty: 'चर्मरोग एवं सौंदर्य प्रसाधन विशेषज्ञ',
    departmentId: 'dermatology',
    badge: 'Dermatology & Cosmetology',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-pooja-jaiswal.jpg',
    availability: 'प्रत्येक मंगलवार 3 बजे से 6 बजे तक',
    avatarInitials: 'PJ',
    availableDays: ['Tue'],
    availableSlots: ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'],
    opdTimings: 'प्रत्येक मंगलवार 3 बजे से 6 बजे तक',
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
    qualifications: 'बी.एच.एम.एस.',
    specialty: 'स्त्री/प्रसूति रोग विशेषज्ञ (Women & Child Care)',
    hindiSpecialty: 'स्त्री/प्रसूति रोग विशेषज्ञ',
    departmentId: 'gynecology',
    badge: 'Women & Child Care',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-mamta-yadav.jpg',
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
    specialty: 'जनरल व लैप्रो सर्जन (General & Laparoscopic Surgeon)',
    hindiSpecialty: 'जनरल व लैप्रो सर्जन',
    departmentId: 'general-surgery',
    affiliation: 'KGMU Lucknow',
    badge: 'General & Laparoscopic Surgeon',
    photoUrl: 'https://raw.githubusercontent.com/Surajkyadav01/-Prakash-Hospital/main/public/doctors/dr-ganesh-yadav.jpg',
    availability: 'ऑन कॉल (On Call)',
    avatarInitials: 'GY',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['11:00 AM', '01:00 PM', '03:30 PM', '05:30 PM'],
    opdTimings: 'ऑन कॉल (On Call OPD & Emergency)',
    aliases: [
      'ganesh', 'ganesh yadav', 'dr ganesh', 'dr. ganesh', 'dr ganesh yadav',
      'गणेश', 'गणेश यादव', 'डॉ गणेश यादव', 'डॉ. गणेश यादव', 'डॉक्टर गणेश',
      'laparoscopic', 'laparoscopy', 'general surgeon', 'surgeon', 'kgmu',
      'लैप्रो सर्जन', 'जनरल सर्जन', 'ऑपरेशन', 'केजीएमयू'
    ]
  }
];
