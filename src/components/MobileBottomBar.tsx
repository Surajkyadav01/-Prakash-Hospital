import React from 'react';
import { Phone, MessageCircle, CalendarCheck, MapPin } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
  onOpenDirections: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenBooking,
  onOpenDirections,
}) => {
  return (
    <div 
      id="mobile-floating-bottom-bar" 
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-3 pb-safe"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        
        {/* 1. Call Emergency */}
        <a
          href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
          id="mobile-bottom-call-emergency"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-red-50 text-red-700 active:bg-red-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-red-700">Emergency</span>
        </a>

        {/* 2. WhatsApp OPD */}
        <a
          href={HOSPITAL_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bottom-whatsapp-opd"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-emerald-50 text-emerald-700 active:bg-emerald-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-emerald-700">WhatsApp</span>
        </a>

        {/* 3. Book Appointment */}
        <button
          type="button"
          onClick={onOpenBooking}
          id="mobile-bottom-book-appointment"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-sky-50 text-sky-700 active:bg-sky-100 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-sky-700">Book OPD</span>
        </button>

        {/* 4. Directions / Map */}
        <button
          type="button"
          onClick={onOpenDirections}
          id="mobile-bottom-directions-map"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-50 text-slate-700 active:bg-slate-100 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-xs">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-slate-700">Directions</span>
        </button>

      </div>
    </div>
  );
};
