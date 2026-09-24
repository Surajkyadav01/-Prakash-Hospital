import React from 'react';
import { X, MapPin, Navigation, Car, Train, ExternalLink, Phone } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Hospital Directions & Map</h3>
              <p className="text-[11px] text-slate-400">Prakash Hospital, Suriyawan, Bhadohi</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Address Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
              Official Campus Address
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1 leading-snug">
              {HOSPITAL_INFO.address}
            </p>
            <p className="text-xs text-sky-700 font-semibold mt-1">
              Bypass Road, Suriyawan, Uttar Pradesh 221404
            </p>
          </div>

          {/* Transport Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                <Train className="w-4 h-4 text-sky-600" />
                <span>Transit Access</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Suriyawan Railway Station & Main Road (5 mins)
              </p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Hospital Parking</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Dedicated patient & visitor parking at entrance
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <a
              href={HOSPITAL_INFO.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Call Reception for Gate Assistance</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
