import React, { useState, useEffect } from 'react';
import { 
  X, 
  CalendarCheck, 
  CheckCircle2, 
  Stethoscope, 
  UserCheck, 
  Clock, 
  IndianRupee, 
  Phone, 
  User, 
  ShieldCheck,
  AlertCircle,
  Mail,
  MessageCircle
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Doctor, AppointmentConfirmation } from '../types';
import { ADMIN_EMAIL, createAppointmentMailtoUrl, recordNotification } from '../utils/notificationService';
import { CustomSelect } from './CustomSelect';
import { CustomDatePicker } from './CustomDatePicker';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDeptId?: string;
  preSelectedDoctorId?: string;
  preSelectedDate?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedDeptId,
  preSelectedDoctorId,
  preSelectedDate,
}) => {
  const [departmentId, setDepartmentId] = useState<string>(preSelectedDeptId || 'cardiology');
  const [doctorId, setDoctorId] = useState<string>(preSelectedDoctorId || 'dr-rajesh-sharma');
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  
  const [date, setDate] = useState<string>(preSelectedDate || defaultDateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female' | 'other'>('male');
  const [patientAge, setPatientAge] = useState('32');
  const [isExistingPatient, setIsExistingPatient] = useState(false);
  const [uhidNumber, setUhidNumber] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation state
  const [confirmation, setConfirmation] = useState<AppointmentConfirmation | null>(null);

  // Sync props when opening
  useEffect(() => {
    if (preSelectedDeptId) setDepartmentId(preSelectedDeptId);
    if (preSelectedDoctorId) setDoctorId(preSelectedDoctorId);
    if (preSelectedDate) setDate(preSelectedDate);
    setConfirmation(null);
  }, [isOpen, preSelectedDeptId, preSelectedDoctorId, preSelectedDate]);

  // Current doctor
  const currentDoctor = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];
  const availableDoctors = departmentId === 'all'
    ? DOCTORS
    : DOCTORS.filter(d => d.departmentId === departmentId);

  const handleDeptChange = (newDept: string) => {
    setDepartmentId(newDept);
    if (newDept === 'all') return;
    const matchingDocs = DOCTORS.filter(d => d.departmentId === newDept);
    if (matchingDocs.length > 0) {
      const isCurrentInDept = matchingDocs.some(d => d.id === doctorId);
      if (!isCurrentInDept) {
        setDoctorId(matchingDocs[0].id);
        if (matchingDocs[0].availableSlots && matchingDocs[0].availableSlots.length > 0) {
          setSelectedSlot(matchingDocs[0].availableSlots[0]);
        }
      }
    }
  };

  const handleDoctorChange = (newDocId: string) => {
    setDoctorId(newDocId);
    const doc = DOCTORS.find(d => d.id === newDocId);
    if (doc) {
      if (doc.departmentId && doc.departmentId !== departmentId) {
        setDepartmentId(doc.departmentId);
      }
      if (doc.availableSlots && doc.availableSlots.length > 0) {
        setSelectedSlot(doc.availableSlots[0]);
      }
    }
  };

  const doctorSelectOptions = React.useMemo(() => {
    if (!departmentId || departmentId === 'all') {
      return DOCTORS.map((doc) => ({
        value: doc.id,
        label: `${doc.name}${doc.hindiName ? ` (${doc.hindiName})` : ''}`,
        sublabel: `${doc.specialty.split('(')[0].trim()} • ${doc.availability.split('(')[0].trim()}`,
        badge: doc.badge,
      }));
    }

    const deptDocs = DOCTORS.filter((d) => d.departmentId === departmentId);
    const otherDocs = DOCTORS.filter((d) => d.departmentId !== departmentId);

    return [
      ...deptDocs.map((doc) => ({
        value: doc.id,
        label: `${doc.name}${doc.hindiName ? ` (${doc.hindiName})` : ''}`,
        sublabel: `${doc.specialty.split('(')[0].trim()} • ${doc.availability.split('(')[0].trim()}`,
        badge: doc.badge || 'Selected Dept',
      })),
      ...otherDocs.map((doc) => {
        const dept = DEPARTMENTS.find((d) => d.id === doc.departmentId);
        const deptShort = dept ? dept.name.split('(')[0].split('&')[0].trim() : '';
        return {
          value: doc.id,
          label: `${doc.name}${doc.hindiName ? ` (${doc.hindiName})` : ''}`,
          sublabel: `${deptShort} • ${doc.availability.split('(')[0].trim()}`,
          badge: deptShort,
        };
      })
    ];
  }, [departmentId]);

  const [appointmentMailtoUrl, setAppointmentMailtoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDept = DEPARTMENTS.find(d => d.id === departmentId);
    const bookingRef = 'PKH-' + Math.floor(100000 + Math.random() * 900000);
    
    const notifData = {
      bookingId: bookingRef,
      doctorName: currentDoctor.name,
      department: currentDept ? currentDept.name : 'Super Speciality',
      date: date,
      timeSlot: selectedSlot,
      patientName: patientName || 'Patient',
      patientPhone: patientPhone || '+91 83838 26205',
      patientAge,
      patientGender,
      uhidNumber: isExistingPatient ? uhidNumber : undefined,
      consultationFee: currentDoctor.consultationFee || 0,
      roomNo: currentDoctor.roomNo || 'OPD Desk'
    };

    const mailUrl = createAppointmentMailtoUrl(notifData);
    setAppointmentMailtoUrl(mailUrl);
    recordNotification('appointment', notifData);

    setConfirmation(notifData);

    // Trigger email notification
    try {
      window.location.href = mailUrl;
    } catch {
      // Direct button provided on screen
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:px-6 py-4 bg-gradient-to-r from-sky-700 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-sky-200" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Book OPD Consultation
              </h3>
              <p className="text-xs text-sky-200">
                Prakash Hospital • Verified Slot Booking
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {confirmation ? (
            /* Confirmation Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Appointment Confirmed
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                  Booking ID: #{confirmation.bookingId}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  An SMS confirmation and digital slip have been generated.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-bold text-slate-900">{confirmation.doctorName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-800">{confirmation.department}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-bold text-sky-700">{confirmation.date} at {confirmation.timeSlot}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-800">{confirmation.patientName} ({confirmation.patientPhone})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">OPD Desk, Prakash Hospital, Suriyawan, Bhadohi</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-bold">Consultation Mode:</span>
                  <span className="font-extrabold text-sky-800 text-sm">Hospital In-Person OPD</span>
                </div>
              </div>

              {/* Notification routing badge */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs text-left flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Admin Notification:</strong> Booking details dispatched to hospital administration desk: <strong className="font-bold text-emerald-800">{ADMIN_EMAIL}</strong>
                </div>
              </div>

              <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-sky-900 text-xs text-left">
                <strong>Important Note:</strong> Please arrive 15 minutes prior to your appointment slot at Reception Counter 2 with any prior medical records and photo ID.
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <a
                  href={`https://wa.me/918383826205?text=${encodeURIComponent(
                    `Hello Prakash Hospital, I have booked an appointment.\nBooking ID: #${confirmation.bookingId}\nDoctor: ${confirmation.doctorName} (${confirmation.department})\nDate: ${confirmation.date} at ${confirmation.timeSlot}\nPatient: ${confirmation.patientName} (${confirmation.patientPhone})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp (+91 83838 26205)</span>
                </a>

                {appointmentMailtoUrl && (
                  <a
                    href={appointmentMailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email to Admin</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Department & Doctor Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                    <span>Department *</span>
                  </label>
                  <CustomSelect
                    value={departmentId}
                    onChange={(val) => handleDeptChange(val)}
                    options={[
                      { value: 'all', label: 'All Departments (सभी विभाग)' },
                      ...DEPARTMENTS.map((dept) => ({
                        value: dept.id,
                        label: dept.name,
                      }))
                    ]}
                    isSearchable={true}
                    searchPlaceholder="Search department..."
                    placeholder="Select department..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>Doctor *</span>
                  </label>
                  <CustomSelect
                    value={doctorId}
                    onChange={(val) => handleDoctorChange(val)}
                    options={doctorSelectOptions}
                    isSearchable={true}
                    searchPlaceholder="Search doctor or specialty..."
                    placeholder="Select doctor..."
                  />
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Consultation Date *</span>
                  </label>
                  <CustomDatePicker
                    min={today.toISOString().split('T')[0]}
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    placeholder="Pick appointment date..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select OPD Slot *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(currentDoctor.availableSlots || ['10:00 AM', '11:00 AM', '12:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']).slice(0, 6).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedSlot === slot
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Doctor Quick Badge */}
              <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{currentDoctor.name}</span>
                  <div className="text-slate-500 text-[11px]">{currentDoctor.specialty}</div>
                  <div className="text-emerald-700 font-semibold text-[11px] mt-0.5">{currentDoctor.availability}</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sky-800 text-xs">Verified Specialist</span>
                  <div className="text-[10px] text-slate-500">Prakash Hospital</div>
                </div>
              </div>

              {/* Patient Personal Information */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Patient Details
                </span>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Chandra"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 83838 26205"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="Years"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Gender
                      </label>
                      <CustomSelect
                        value={patientGender}
                        onChange={(val) => setPatientGender(val as any)}
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                        ]}
                        placeholder="Select gender..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Existing Patient?
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsExistingPatient(!isExistingPatient)}
                        className={`w-full p-2 rounded-xl text-xs font-bold border transition-colors ${
                          isExistingPatient
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isExistingPatient ? 'Yes (UHID)' : 'No (New)'}
                      </button>
                    </div>
                  </div>

                  {isExistingPatient && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Enter Hospital UHID / Patient ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PK-984210"
                        value={uhidNumber}
                        onChange={(e) => setUhidNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chief Complaint / Brief Symptoms (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Follow up after blood test, knee joint pain..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>

                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="confirm-booking-submit-btn"
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment (Zero Advance Fee)</span>
                </button>
                <div className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your medical data is encrypted & stored according to NABH guidelines.</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
