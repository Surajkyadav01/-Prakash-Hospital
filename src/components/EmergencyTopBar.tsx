import React from 'react';
import { PhoneCall, Ambulance, CalendarCheck, ShieldCheck, Clock } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto scrollbar-none">
        
        {/* Left: 24x7 Emergency Contact & Desk Number (Always in one straight line) */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-nowrap shrink-0">
          {/* Emergency Alert Tag */}
          <button
            type="button"
            onClick={onOpenAmbulance}
            className="flex items-center gap-1 sm:gap-1.5 bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-bold uppercase tracking-wide text-[10px] sm:text-[11px] animate-pulse transition-colors shrink-0 cursor-pointer"
            title="Click for 24x7 Ambulance & Emergency Trauma Desk"
          >
            <Ambulance className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>24x7<span className="hidden xs:inline"> Emergency</span></span>
          </button>

          {/* Trauma Desk Click to Call */}
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
            className="flex items-center gap-1 sm:gap-1.5 font-bold text-white hover:text-red-300 transition-colors group shrink-0 text-[11px] sm:text-xs"
            title="Click to call emergency trauma line: 8383826205"
          >
            <span className="p-0.5 sm:p-1 rounded-full bg-red-500/20 text-red-400 group-hover:bg-red-500/30">
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            <span className="text-red-400 font-extrabold tracking-tight sm:tracking-wider whitespace-nowrap">{HOSPITAL_INFO.emergencyNumber}</span>
          </a>

          {/* Hospital Desk No - Directly next to Emergency Number in the same straight line */}
          <a
            href={`tel:${HOSPITAL_INFO.deskPhoneRaw}`}
            className="flex items-center gap-1 sm:gap-1.5 font-bold text-white hover:text-sky-300 pl-1.5 sm:pl-3 border-l border-slate-700 transition-colors group shrink-0 text-[11px] sm:text-xs"
            title="Click to call Hospital Desk: 8303272422"
          >
            <span className="p-0.5 sm:p-1 rounded-full bg-sky-500/20 text-sky-400 group-hover:bg-sky-500/30">
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            <span className="text-slate-300 text-[10px] sm:text-xs whitespace-nowrap">Desk No.</span>
            <span className="text-sky-400 font-extrabold tracking-tight sm:tracking-wider whitespace-nowrap">{HOSPITAL_INFO.deskDisplay}</span>
          </a>

          {/* OPD Helpline Desktop */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-300 pl-3 border-l border-slate-700 shrink-0">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>OPD: <strong className="text-white font-medium">{HOSPITAL_INFO.opdHelpline}</strong></span>
          </div>
        </div>

        {/* Right: Accreditations & Quick Book CTA (Visible on tablet & desktop) */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold">NABH & NABL Accredited</span>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            id="emergency-book-appointment-btn"
            className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded-md font-semibold text-xs tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

      </div>
    </div>
  );
};
