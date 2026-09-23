import React, { useState } from 'react';
import { X, Ambulance, Phone, MapPin, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { CustomSelect } from './CustomSelect';

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmbulanceModal: React.FC<AmbulanceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [patientCondition, setPatientCondition] = useState('Cardiac / Chest Pain');
  const [dispatchConfirmed, setDispatchConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-red-200 overflow-hidden">
        
        {/* Red Emergency Header */}
        <div className="bg-red-600 text-white p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Ambulance className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg uppercase tracking-wide">
                24x7 Ambulance Dispatch
              </h3>
              <p className="text-[11px] text-red-100">
                Prakash Hospital Emergency Trauma Desk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {dispatchConfirmed ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-bounce">
                <Ambulance className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200 uppercase tracking-wide">
                ALS Unit Dispatched
              </span>

              <h4 className="text-lg font-extrabold text-slate-900">
                Driver & Paramedic Team Assigned
              </h4>

              <p className="text-xs text-slate-600">
                An ICU-on-wheels ambulance is en route to <strong>{pickupAddress || 'your location'}</strong>. Estimated arrival: <strong>10-14 mins</strong>.
              </p>

              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-left text-xs text-red-950 space-y-1">
                <div className="font-bold flex items-center justify-between">
                  <span>Driver Contact:</span>
                  <a href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`} className="text-red-700 underline font-extrabold">
                    +91 98112 34567
                  </a>
                </div>
                <div>Vehicle No: <strong>UP 16 AT 9912 (Cardiac ALS)</strong></div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hospital Desk Directly</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDispatch} className="space-y-4">
              
              {/* Immediate Call Notice */}
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-red-900 font-semibold">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span>For critical cardiac arrest or trauma:</span>
                </div>
                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pickup Location / Address in Suriyawan / Bhadohi *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Village/Mohalla, House No., Street or Landmark in Suriyawan/Bhadohi..."
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 83838 26205"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs sm:text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Emergency Condition
                  </label>
                  <CustomSelect
                    value={patientCondition}
                    onChange={(val) => setPatientCondition(val)}
                    options={[
                      { value: 'Cardiac / Chest Pain', label: 'Cardiac / Chest Pain' },
                      { value: 'Road Accident / Poly-trauma', label: 'Road Accident / Poly-trauma' },
                      { value: 'Brain Stroke / Sudden Weakness', label: 'Brain Stroke / Sudden Weakness' },
                      { value: 'Severe Breathing Difficulty', label: 'Severe Breathing Difficulty' },
                      { value: 'General Patient Shifting', label: 'General Patient Shifting' },
                    ]}
                    placeholder="Select emergency condition..."
                  />
                </div>
              </div>

              <button
                type="submit"
                id="dispatch-ambulance-btn"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm tracking-wide shadow-md shadow-red-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ambulance className="w-4 h-4" />
                <span>Confirm & Dispatch Ambulance Now</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                All Prakash Hospital ambulances are equipped with oxygen, cardiac defibrillator, and EMT personnel.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
