import { HOSPITAL_INFO } from '../data/hospitalData';

export const ADMIN_EMAIL = 'kamlesh8383826205@gmail.com';

export interface EnquiryNotificationData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  timestamp?: string;
}

export interface AppointmentNotificationData {
  bookingId: string;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientAge?: string;
  patientGender?: string;
  uhidNumber?: string;
  consultationFee: number;
  roomNo: string;
  timestamp?: string;
}

/**
 * Creates mailto URL targeted directly to kamlesh8383826205@gmail.com
 */
export function createEnquiryMailtoUrl(data: EnquiryNotificationData): string {
  const subject = encodeURIComponent(`[Prakash Hospital Enquiry] ${data.subject} - ${data.name}`);
  const body = encodeURIComponent(
`Dear Hospital Administration,

A new patient enquiry has been submitted on the Prakash Hospital website:

• Patient / Sender Name: ${data.name}
• Contact Phone: ${data.phone}
• Email: ${data.email || 'Not specified'}
• Enquiry Subject: ${data.subject}
• Date & Time: ${data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Message / Symptoms:
"${data.message}"

---------------------------------------------------
Prakash Hospital & Multi-Speciality Care
Address: ${HOSPITAL_INFO.address}
Admin Email: ${ADMIN_EMAIL}
Helpline: ${HOSPITAL_INFO.emergencyNumber}`
  );

  return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Creates appointment booking mailto URL targeted directly to kamlesh8383826205@gmail.com
 */
export function createAppointmentMailtoUrl(data: AppointmentNotificationData): string {
  const subject = encodeURIComponent(`[OPD Appointment Booked #${data.bookingId}] ${data.doctorName} - ${data.patientName}`);
  const body = encodeURIComponent(
`Dear Hospital Administration / OPD Desk,

A new doctor appointment has been booked on the Prakash Hospital web portal:

══════════════════════════════════════════
APPOINTMENT DETAILS:
══════════════════════════════════════════
• Booking Token: #${data.bookingId}
• Consulting Doctor: ${data.doctorName}
• Department: ${data.department}
• Consultation Date: ${data.date}
• Time Slot: ${data.timeSlot}
• OPD Room No: ${data.roomNo}
• Consultation Fee: ₹${data.consultationFee}

══════════════════════════════════════════
PATIENT PARTICULARS:
══════════════════════════════════════════
• Patient Name: ${data.patientName}
• Mobile Number: ${data.patientPhone}
${data.patientAge ? `• Age: ${data.patientAge} Years` : ''}
${data.patientGender ? `• Gender: ${data.patientGender}` : ''}
${data.uhidNumber ? `• Existing UHID: ${data.uhidNumber}` : '• Patient Status: New Registration'}
• Booking Timestamp: ${data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please verify OPD schedule and ready the patient file at Reception Desk 2.

---------------------------------------------------
Prakash Hospital & Multi-Speciality Care
Address: ${HOSPITAL_INFO.address}
Admin Email: ${ADMIN_EMAIL}
Helpline: ${HOSPITAL_INFO.emergencyNumber}`
  );

  return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Store in local admin log & dispatch notification event
 */
export function recordNotification(type: 'enquiry' | 'appointment', data: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('pkh_admin_notifications') || '[]');
    const record = {
      id: 'NOTIF-' + Date.now(),
      type,
      recipientEmail: ADMIN_EMAIL,
      timestamp: new Date().toISOString(),
      payload: data,
      status: 'dispatched_to_admin'
    };
    existing.unshift(record);
    localStorage.setItem('pkh_admin_notifications', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // ignore localStorage errors
  }
}
