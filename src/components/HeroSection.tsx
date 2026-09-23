import React, { useState } from 'react';
import { Calendar, Stethoscope, UserCheck, ShieldCheck, Clock, CheckCircle2, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { CustomSelect } from './CustomSelect';
import { CustomDatePicker } from './CustomDatePicker';

interface HeroSectionProps {
  onQuickBookCheck: (deptId: string, doctorId: string, date: string) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuickBookCheck,
  onOpenBooking,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<string>(DOCTORS[0]?.id || 'dr-op-yadav');
  
  // Default date to tomorrow in YYYY-MM-DD format
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);

  const handleDeptChange = (newDept: string) => {
    setSelectedDept(newDept);
    if (!newDept || newDept === 'all') {
      // Keep selectedDoctor as is or ensure one is selected
      return;
    }
    const matchingDocs = DOCTORS.filter(d => d.departmentId === newDept);
    if (matchingDocs.length > 0) {
      const isCurrentInDept = matchingDocs.some(d => d.id === selectedDoctor);
      if (!isCurrentInDept) {
        setSelectedDoctor(matchingDocs[0].id);
      }
    }
  };

  const handleDoctorChange = (val: string) => {
    setSelectedDoctor(val);
    const doc = DOCTORS.find(d => d.id === val);
    if (doc && doc.departmentId) {
      setSelectedDept(doc.departmentId);
    }
  };

  // Prepare department options including All Departments
  const departmentOptions = [
    { value: 'all', label: 'All Departments (सभी विभाग / All Specialities)' },
    ...DEPARTMENTS.map((dept) => ({
      value: dept.id,
      label: dept.name,
    }))
  ];

  // Prepare doctor options: all doctors are always visible, with department doctors prioritized if a dept is active
  const doctorOptions = React.useMemo(() => {
    if (!selectedDept || selectedDept === 'all') {
      return DOCTORS.map((doc) => ({
        value: doc.id,
        label: `${doc.name}${doc.hindiName ? ` (${doc.hindiName})` : ''}`,
        sublabel: `${doc.specialty.split('(')[0].trim()} • ${doc.availability.split('(')[0].trim()}`,
        badge: doc.badge,
      }));
    }

    const deptDocs = DOCTORS.filter(d => d.departmentId === selectedDept);
    const otherDocs = DOCTORS.filter(d => d.departmentId !== selectedDept);

    return [
      ...deptDocs.map((doc) => ({
        value: doc.id,
        label: `${doc.name}${doc.hindiName ? ` (${doc.hindiName})` : ''}`,
        sublabel: `${doc.specialty.split('(')[0].trim()} • ${doc.availability.split('(')[0].trim()}`,
        badge: doc.badge || 'Selected Dept',
      })),
      ...otherDocs.map((doc) => {
        const dept = DEPARTMENTS.find(d => d.id === doc.departmentId);
        const deptShort = dept ? dept.name.split('(')[0].split('&')[0].trim() : '';
        return {
          value: doc.id,
          label: `${doc.name}${doc.hindiName ? ` (${doc.hindiName})` : ''}`,
          sublabel: `${deptShort} • ${doc.availability.split('(')[0].trim()}`,
          badge: deptShort,
        };
      })
    ];
  }, [selectedDept]);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveDept = selectedDept === 'all'
      ? (DOCTORS.find(d => d.id === selectedDoctor)?.departmentId || 'general-surgery')
      : selectedDept;
    const effectiveDoctor = selectedDoctor || DOCTORS[0].id;
    onQuickBookCheck(effectiveDept, effectiveDoctor, selectedDate);
  };

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 min-h-[560px] lg:min-h-[620px] flex items-center bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white">
      {/* Clean Ambient Lighting & Subtle Mesh for Maximum Clarity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-teal-100/30 blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#0284c7 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Trust-focused Banner Heading & Value Props */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs sm:text-sm font-semibold border border-sky-200/80 shadow-2xs">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>NABH Accredited • 10+ Years of Clinical Care</span>
              <span className="hidden xs:inline text-sky-400">|</span>
              <span className="hidden xs:inline text-sky-700 font-medium">Bhadohi, Suriyawan</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Advanced Healthcare with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
                Human Touch
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Prakash Hospital delivers world-class clinical expertise, advanced surgical care, 24x7 emergency trauma service, and compassionate bedside healing in Suriyawan, Bhadohi, Uttar Pradesh.
            </p>

            {/* Quick Trust Highlights Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">NABH & NABL</div>
                  <div className="text-[11px] text-slate-500">Quality Certified</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">24x7 Trauma</div>
                  <div className="text-[11px] text-slate-500">Immediate Care</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cashless TPA</div>
                  <div className="text-[11px] text-slate-500">40+ Insurers</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                id="hero-book-consult-cta"
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base shadow-md shadow-sky-600/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Schedule OPD Visit</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#doctors"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border border-slate-200 shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Find a Doctor</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{HOSPITAL_INFO.address}</span>
            </div>

          </div>

          {/* Right Column: Mobile-Optimized Quick Booking Widget */}
          <div className="lg:col-span-5 relative z-20">
            <div className="bg-white rounded-2xl shadow-xl border border-sky-100 p-5 sm:p-7 relative z-20">
              
              {/* Widget Header */}
              <div className="border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h2 className="font-bold text-slate-900 text-lg">
                      Quick OPD Booking
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Instant Slot
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Select department, physician & preferred date for priority consultation.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleCheckAvailability} className="space-y-4">
                
                {/* Select Department */}
                <div>
                  <label htmlFor="quick-dept-select" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                    <span>Select Department</span>
                  </label>
                  <CustomSelect
                    id="quick-dept-select"
                    value={selectedDept}
                    onChange={handleDeptChange}
                    options={departmentOptions}
                    isSearchable={true}
                    searchPlaceholder="Search department..."
                    placeholder="Choose clinical department..."
                  />
                </div>

                {/* Select Doctor */}
                <div>
                  <label htmlFor="quick-doc-select" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>Select Doctor (सभी विशेषज्ञ डॉक्टर)</span>
                  </label>
                  <CustomSelect
                    id="quick-doc-select"
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                    options={doctorOptions}
                    isSearchable={true}
                    searchPlaceholder="Search doctor by name or specialty..."
                    placeholder="Select physician doctor..."
                  />
                </div>

                {/* Select Date */}
                <div>
                  <label htmlFor="quick-date-picker" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>Select Consultation Date</span>
                  </label>
                  <CustomDatePicker
                    id="quick-date-picker"
                    min={today.toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    placeholder="Pick appointment date..."
                  />
                </div>

                {/* Check Availability CTA Button */}
                <button
                  type="submit"
                  id="check-availability-btn"
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Check Availability & Book</span>
                </button>

              </form>

              {/* Security & Help note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Zero convenience fee
                </span>
                <span>Need assistance? <a href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`} className="text-sky-600 font-bold hover:underline">Call Desk</a></span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
