import React, { useState, useEffect } from 'react';
import { 
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
  ArrowLeft,
  HeartPulse,
  ChevronRight,
  Calendar,
  Building2,
  Lock,
  Mail,
  MessageCircle
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Doctor, AppointmentConfirmation } from '../types';
import { ADMIN_EMAIL, createAppointmentMailtoUrl, recordNotification } from '../utils/notificationService';
import { CustomSelect } from './CustomSelect';
import { CustomDatePicker } from './CustomDatePicker';

interface BookingPageProps {
  initialDeptId?: string;
  initialDoctorId?: string;
  initialDate?: string;
  onBackToHome: () => void;
  onNavigateToView: (view: any) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialDeptId,
  initialDoctorId,
  initialDate,
  onBackToHome,
  onNavigateToView,
}) => {
  const [departmentId, setDepartmentId] = useState<string>(initialDeptId || 'cardiology');
  const [doctorId, setDoctorId] = useState<string>(initialDoctorId || 'dr-rajesh-sharma');
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  
  const [date, setDate] = useState<string>(initialDate || defaultDateStr);
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

  // Sync initial props
  useEffect(() => {
    if (initialDeptId) setDepartmentId(initialDeptId);
    if (initialDoctorId) setDoctorId(initialDoctorId);
    if (initialDate) setDate(initialDate);
  }, [initialDeptId, initialDoctorId, initialDate]);

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

    try {
      window.location.href = mailUrl;
    } catch {
      // Direct button on confirmation card
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col animate-in fade-in duration-300">
      
      {/* Top Bar with Hospital Logo & "Back to Home" */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-sky-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Home</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Hospital Logo */}
          <div 
            onClick={onBackToHome}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group"
          >
            <img
              src="/assets/prakash-hospital-logo.webp"
              alt="Prakash Hospital Logo"
              width={48}
              height={48}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform shrink-0"
              onError={(e) => {
                e.currentTarget.src = "/assets/prakash-hospital-logo.png";
              }}
            />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-sky-700 transition-colors">
                  Prakash
                </span>
                <span className="font-extrabold text-base sm:text-lg text-sky-600 tracking-tight">
                  Hospital
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold tracking-wider uppercase">
                  OPD
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5">
                Multi-Speciality Care • Suriyawan, Bhadohi
              </span>
            </div>
          </div>
        </div>

        {/* Emergency helpline badge */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span>Emergency: {HOSPITAL_INFO.emergencyNumber}</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {confirmation ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Official OPD Appointment Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Booking ID: #{confirmation.bookingId}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your consultation token has been generated. An SMS confirmation with room details has been dispatched.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-3">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Consultant Doctor:</span>
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
                <span className="text-slate-500">Consultation Location:</span>
                <span className="font-semibold text-slate-800">OPD Desk, Prakash Hospital, Suriyawan, Bhadohi</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-slate-600">Consultation Mode:</span>
                <span className="text-emerald-700">Hospital In-Person OPD</span>
              </div>
            </div>

            {/* Admin Email Notification Route Card */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 text-left flex items-start gap-2.5">
              <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-emerald-950">
                  Appointment Notification Directed to Administration
                </div>
                <p className="text-emerald-800 text-xs">
                  This OPD booking detail has been compiled and routed directly to the hospital administrative desk email: <strong className="font-bold text-emerald-900">{ADMIN_EMAIL}</strong>
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-2xl text-xs text-sky-800 text-left flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong>Instructions for Visit:</strong> Please arrive 15 minutes prior to your slot time at Prakash Hospital, Suriyawan, Bhadohi counter with any previous medical records and government photo ID.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/918383826205?text=${encodeURIComponent(
                  `Hello Prakash Hospital, I have booked an appointment.\nBooking ID: #${confirmation.bookingId}\nDoctor: ${confirmation.doctorName} (${confirmation.department})\nDate: ${confirmation.date} at ${confirmation.timeSlot}\nPatient: ${confirmation.patientName} (${confirmation.patientPhone})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp to Manager (+91 83838 26205)</span>
              </a>

              {appointmentMailtoUrl && (
                <a
                  href={appointmentMailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email to {ADMIN_EMAIL}</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors"
              >
                Book Another Appointment
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                Return to Hospital Home
              </button>
            </div>
          </div>
        ) : (
          /* Dedicated Booking Form */
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
                <CalendarCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>Verified Online OPD Slot Reservation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Schedule Doctor Consultation
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Choose your department, select your preferred specialist, and book a convenient consultation time slot.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form: Doctor & Timing Selection (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Stethoscope className="w-5 h-5 text-sky-600" />
                    <span>1. Select Speciality & Doctor</span>
                  </h3>

                  {/* Department select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Clinical Department / Super Speciality *
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

                  {/* Doctor select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select Consultant Doctor (सभी विशेषज्ञ डॉक्टर) *
                    </label>
                    <CustomSelect
                      value={doctorId}
                      onChange={(val) => handleDoctorChange(val)}
                      options={doctorSelectOptions}
                      isSearchable={true}
                      searchPlaceholder="Search doctor or specialty..."
                      placeholder="Select consultant doctor..."
                    />
                  </div>

                  {/* Doctor Summary Card */}
                  {currentDoctor && (
                    <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-2xl flex items-center gap-3.5">
                      {currentDoctor.photoUrl ? (
                        <img
                          src={currentDoctor.photoUrl}
                          alt={currentDoctor.name}
                          className="w-14 h-16 rounded-xl object-cover object-[center_20%] border-2 border-white shadow-2xs shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                            const fallback = document.getElementById(`booking-doc-fallback-${currentDoctor.id}`);
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        id={`booking-doc-fallback-${currentDoctor.id}`}
                        className={`w-14 h-14 rounded-xl bg-slate-900 text-sky-100 flex flex-col items-center justify-center font-bold text-xs shrink-0 border border-sky-200 ${currentDoctor.photoUrl ? 'hidden' : 'flex'}`}
                      >
                        <span className="text-sm font-black">{currentDoctor.avatarInitials || 'DR'}</span>
                        <span className="text-[9px] text-sky-300 font-semibold">Doctor</span>
                      </div>
                      <div className="min-w-0 flex-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-slate-900 truncate">
                            {currentDoctor.name}
                          </h4>
                          {currentDoctor.hindiName && (
                            <span className="text-xs text-slate-500">({currentDoctor.hindiName})</span>
                          )}
                        </div>
                        <p className="text-slate-600 truncate">{currentDoctor.qualifications}</p>
                        <div className="flex items-center gap-2 text-sky-800 font-semibold mt-1">
                          <span className="truncate">{currentDoctor.specialty}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold shrink-0">{currentDoctor.availability}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Date and Time Slot selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Consultation Date *
                      </label>
                      <CustomDatePicker
                        min={defaultDateStr}
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        placeholder="Choose appointment date..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select Available Slot *
                      </label>
                      <CustomSelect
                        value={selectedSlot}
                        onChange={(slot) => setSelectedSlot(slot)}
                        options={(currentDoctor?.availableSlots || []).map((slot) => ({
                          value: slot,
                          label: slot,
                        }))}
                        placeholder="Select time slot..."
                      />
                    </div>
                  </div>

                </div>

                {/* Right Form: Patient Details (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                      <User className="w-5 h-5 text-sky-600" />
                      <span>2. Patient Information</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 83838 26205"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Age (Years)
                        </label>
                        <input
                          type="number"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium"
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
                    </div>

                    {/* Existing Patient UHID Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isExistingPatient}
                          onChange={(e) => setIsExistingPatient(e.target.checked)}
                          className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                        />
                        <span>Already a Prakash Hospital patient? (Have UHID)</span>
                      </label>

                      {isExistingPatient && (
                        <div className="mt-2 animate-in fade-in">
                          <input
                            type="text"
                            placeholder="Enter Hospital UHID (e.g. PK-904128)"
                            value={uhidNumber}
                            onChange={(e) => setUhidNumber(e.target.value)}
                            className="w-full bg-sky-50/60 border border-sky-200 rounded-xl p-2 text-xs sm:text-sm uppercase font-mono font-bold"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/80 border border-sky-200/70 text-[11px] text-sky-800">
                      <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>
                        Booking notification is routed directly to <strong>{ADMIN_EMAIL}</strong> for hospital counter reservation.
                      </span>
                    </div>

                    <button
                      type="submit"
                      id="confirm-booking-btn"
                      className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CalendarCheck className="w-5 h-5" />
                      <span>Confirm OPD Consultation Slot</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero cancellation charges. Pay at hospital counter or insurance desk.</span>
                    </div>
                  </div>

                </div>

              </div>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};
