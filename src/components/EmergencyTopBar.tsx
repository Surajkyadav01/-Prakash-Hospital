import React from 'react';
import { PhoneCall, Ambulance, CalendarCheck, ShieldCheck, Clock, Mail } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface EmergencyTopBarProps {
  onOpenBooking: () => void;
  onOpenAmbulance: () => void;
}

export const EmergencyTopBar: React.FC<EmergencyTopBarProps> = ({
  onOpenBooking,
  onOpenAmbulance,
}) => {
  return (
    <div id="emergency-top-bar" className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        
        {/* Left: 24x7 Emergency Contact & Ambulance Badge */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Emergency Alert Tag */}
          <button
            type="button"
            onClick={onOpenAmbulance}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wide text-[11px] animate-pulse transition-colors"
            title="Click for 24x7 Ambulance & Emergency Trauma Desk"
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>24x7 Emergency</span>
          </button>

          {/* Click to Call */}
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-red-300 transition-colors group"
            title="Click to call emergency trauma line"
          >
            <span className="p-1 rounded-full bg-red-500/20 text-red-400 group-hover:bg-red-500/30">
              <PhoneCall className="w-3.5 h-3.5" />
            </span>
            <span className="hidden xs:inline text-slate-300">Trauma Desk:</span>
            <span className="text-red-400 font-extrabold tracking-wider">{HOSPITAL_INFO.emergencyNumber}</span>
          </a>

          {/* Official Email */}
          <a
            href={`mailto:${HOSPITAL_INFO.email}`}
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-sky-300 pl-3 border-l border-slate-700 transition-colors"
            title="Direct Hospital Email: kamlesh8383826205@gmail.com"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-medium">{HOSPITAL_INFO.email}</span>
          </a>

          {/* OPD Helpline Desktop */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-300 pl-3 border-l border-slate-700">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>OPD: <strong className="text-white font-medium">{HOSPITAL_INFO.opdHelpline}</strong></span>
          </div>
        </div>

        {/* Right: Accreditations & Quick Book CTA */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold">NABH & NABL Accredited</span>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            id="emergency-book-appointment-btn"
            className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded-md font-semibold text-xs tracking-wide shadow-sm transition-all active:scale-95"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

      </div>
    </div>
  );
};
