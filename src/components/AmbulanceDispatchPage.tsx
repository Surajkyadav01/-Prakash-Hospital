import React, { useState } from 'react';
import { 
  Ambulance, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowLeft, 
  Navigation, 
  Activity, 
  Heart, 
  AlertTriangle, 
  Share2, 
  Check, 
  Radio, 
  Compass, 
  ShieldCheck,
  Stethoscope,
  Info
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { CustomSelect } from './CustomSelect';

interface AmbulanceDispatchPageProps {
  onBackToHome: () => void;
  onOpenBooking?: () => void;
}

export const AmbulanceDispatchPage: React.FC<AmbulanceDispatchPageProps> = ({
  onBackToHome,
  onOpenBooking,
}) => {
  const [callerName, setCallerName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [patientCondition, setPatientCondition] = useState('Cardiac / Chest Pain');
  const [ambulanceType, setAmbulanceType] = useState<'als' | 'bls' | 'nicu'>('als');
  const [criticalNotes, setCriticalNotes] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [dispatchConfirmed, setDispatchConfirmed] = useState(false);
  const [dispatchId, setDispatchId] = useState('');

  const quickSectors = [
    'Near Old Petrol Pump (Hospital Gate)',
    'Suriyawan Main Market',
    'Suriyawan Railway Station Road',
    'Bhadohi Road',
    'Durga Mandir Area',
    'Bhadohi City'
  ];

  const handleQuickSectorSelect = (sector: string) => {
    if (pickupAddress) {
      setPickupAddress((prev) => `${prev}, ${sector}`);
    } else {
      setPickupAddress(sector);
    }
  };

  const handleGetGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickupAddress(`GPS Coords: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Suriyawan/Bhadohi)`);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        setIsLocating(false);
        setPickupAddress('Current Location (Near Prakash Hospital, Suriyawan)');
      },
      { timeout: 8000 }
    );
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `AMB-SRY-${Math.floor(1000 + Math.random() * 9000)}`;
    setDispatchId(randomId);
    setDispatchConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-red-100 selection:text-red-900 font-sans">
      
      {/* 1. Emergency Top Notification Bar */}
      <div className="bg-red-600 text-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-md flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>24X7 PRIORITY TRAUMA & CARDIAC RESUSCITATION DESK</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-red-100 font-medium text-xs">Direct Emergency Hotline:</span>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
              className="bg-white text-red-700 hover:bg-red-50 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{HOSPITAL_INFO.emergencyNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Page Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <Ambulance className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-white leading-tight">
                  24x7 Ambulance Dispatch Portal
                </h1>
                <p className="text-[11px] text-red-300 hidden xs:block">
                  Prakash Hospital • Rapid Response GPS Fleet (Suriyawan / Bhadohi)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Ambulance</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {dispatchConfirmed ? (
          /* DISPATCH SUCCESS STATE (Full Screen Tracker) */
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Live Status Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-red-500 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-black uppercase px-6 py-1.5 rounded-bl-2xl tracking-wider flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-spin" />
                <span>Active Live Tracking</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pt-2">
                <div className="w-20 h-20 rounded-2xl bg-red-100 border-2 border-red-200 text-red-600 flex items-center justify-center shrink-0 animate-pulse">
                  <Ambulance className="w-10 h-10" />
                </div>

                <div className="text-center sm:text-left space-y-2 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-black uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Unit Dispatched • Token #{dispatchId}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    ALS Ambulance is En Route to Your Location
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600">
                    Our ICU ambulance has been deployed and the Emergency Trauma Bay at Prakash Hospital, Suriyawan, Bhadohi has been placed on stand-by alert.
                  </p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
                  <div className="text-xs text-red-700 font-bold uppercase tracking-wider">Status</div>
                  <div className="text-sm sm:text-base font-black text-red-900 mt-0.5">En Route</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Est. Arrival</div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">8 – 12 Mins</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Vehicle No</div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">UP 16 AT 9912</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Unit Type</div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 uppercase">ALS Cardiac</div>
                </div>
              </div>

              {/* Driver & Paramedic Direct Contact */}
              <div className="mt-6 bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-medium text-red-100">Assigned EMT / Pilot Contacts:</div>
                  <div className="text-base sm:text-lg font-bold">Driver: Rajeev Kumar | Paramedic: Nitin Sharma</div>
                  <div className="text-xs text-red-200">Equipped with Oxygen, Defibrillator, Transport Ventilator</div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Call Driver Directly</span>
                  </a>
                </div>
              </div>

              {/* Destination & Summary */}
              <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-2 text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>Pickup Destination:</strong> {pickupAddress || 'Address specified during call'}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>Reported Condition:</strong> {patientCondition} • Caller: {callerName || 'Family/Bystander'} ({contactPhone || 'Registered'})
                  </div>
                </div>
              </div>

              {/* Golden Hour Guidelines */}
              <div className="mt-6 p-5 bg-amber-50 rounded-2xl border border-amber-200 text-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Critical First-Aid Protocol While Waiting for the Ambulance:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 list-disc list-inside">
                  <li>Keep patient seated upright (if breathing trouble) or flat on side (if unconscious).</li>
                  <li>Do NOT feed solid food or liquid water to an unconscious or drowsy patient.</li>
                  <li>Unlock front gates, apartment elevators, and turn on porch lights for rapid paramedic access.</li>
                  <li>Keep any prior prescription files, discharge cards, or ECG strips ready.</li>
                </ul>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setDispatchConfirmed(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  ← Request Another Ambulance / Update Request
                </button>

                <button
                  type="button"
                  onClick={onBackToHome}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  Return to Hospital Homepage
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* DISPATCH FORM & INFORMATION (Two Column Full Page) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Comprehensive Dispatch Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              
              {/* Form Title */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <Ambulance className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                  <span>Immediate Medical Dispatch Service</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Request Emergency Ambulance
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill in the pickup details below or call our 24x7 trauma desk directly. GPS-enabled ALS units are stationed for minimum transit time across Bhadohi and Suriyawan.
                </p>
              </div>

              {/* Direct Call High-Priority Alert */}
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 fill-current animate-bounce" />
                  </div>
                  <div>
                    <div className="text-xs text-red-900 font-extrabold uppercase tracking-wide">
                      Cardiac Arrest or Heavy Bleeding?
                    </div>
                    <div className="text-sm font-black text-red-700">
                      Call our hotline directly: {HOSPITAL_INFO.emergencyNumber}
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition-colors text-center shrink-0"
                >
                  Call Now (Instant)
                </a>
              </div>

              {/* Form Body */}
              <form onSubmit={handleDispatchSubmit} className="space-y-5">
                
                {/* 1. Pickup Location */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-900">
                      Pickup Address / Exact Location in Suriyawan / Bhadohi <span className="text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleGetGPS}
                      disabled={isLocating}
                      className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-bold bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 cursor-pointer transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{isLocating ? 'Detecting GPS...' : 'Use Current GPS'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="House/Flat No., Mohalla/Village, Street or Nearest Landmark (e.g., Near Old Petrol Pump, Suriyawan)..."
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />

                  {/* Quick Sector Tags */}
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold mb-1.5">Quick Landmark / Sector Select:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {quickSectors.map((sector) => (
                        <button
                          key={sector}
                          type="button"
                          onClick={() => handleQuickSectorSelect(sector)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer border border-slate-200"
                        >
                          + {sector}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Contact Details & Caller Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-1.5">
                      Emergency Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all font-semibold"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      The ambulance pilot will call this number for gate entry.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-1.5">
                      Patient / Caller Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Verma"
                      value={callerName}
                      onChange={(e) => setCallerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 3. Emergency Condition */}
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-1.5">
                    Medical Emergency Condition <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    value={patientCondition}
                    onChange={(val) => setPatientCondition(val)}
                    options={[
                      { value: 'Cardiac / Chest Pain / Heart Attack', label: 'Cardiac / Chest Pain / Heart Attack (Immediate ALS)' },
                      { value: 'Brain Stroke / Sudden Slurred Speech / Facial Droop', label: 'Brain Stroke / Sudden Slurred Speech / Facial Droop' },
                      { value: 'Road Accident / Severe Poly-Trauma / Fractures', label: 'Road Accident / Severe Poly-Trauma / Fractures' },
                      { value: 'Severe Breathing Difficulty / Asthmatic Attack', label: 'Severe Breathing Difficulty / Asthmatic Attack' },
                      { value: 'High Grade Fever / Seizure / Unconsciousness', label: 'High Grade Fever / Seizure / Unconsciousness' },
                      { value: 'Pregnancy / Labour Pain', label: 'Pregnancy / Labour Pain' },
                      { value: 'Inter-Hospital Patient Transfer (ICU to ICU)', label: 'Inter-Hospital Patient Transfer (ICU to ICU)' },
                      { value: 'General Non-Emergency Shifting', label: 'General Non-Emergency Shifting' },
                    ]}
                    placeholder="Select emergency condition..."
                  />
                </div>

                {/* 4. Type of Ambulance */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-extrabold text-slate-900">
                    Select Ambulance Classification
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    <button
                      type="button"
                      onClick={() => setAmbulanceType('als')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        ambulanceType === 'als'
                          ? 'border-red-600 bg-red-50/70 text-red-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">ALS Cardiac</span>
                        {ambulanceType === 'als' && <Check className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Ventilator, Defibrillator, Syringe Pump & Doctor/EMT
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAmbulanceType('bls')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        ambulanceType === 'bls'
                          ? 'border-red-600 bg-red-50/70 text-red-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">BLS Standard</span>
                        {ambulanceType === 'bls' && <Check className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Oxygen Cylinder, Spine Board & Emergency Paramedic
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAmbulanceType('nicu')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        ambulanceType === 'nicu'
                          ? 'border-red-600 bg-red-50/70 text-red-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">Neonatal NICU</span>
                        {ambulanceType === 'nicu' && <Check className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Transport Baby Incubator & Pediatric Resuscitator
                      </div>
                    </button>

                  </div>
                </div>

                {/* 5. Additional Critical Information */}
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-1.5">
                    Critical Notes for EMT (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Patient is on 4th floor (lift working), diabetic, unconscious..."
                    value={criticalNotes}
                    onChange={(e) => setCriticalNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="submit-ambulance-dispatch-btn"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-red-600/30 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Ambulance className="w-5 h-5 animate-pulse" />
                  <span>CONFIRM & DISPATCH AMBULANCE IMMEDIATELY</span>
                </button>

                <div className="text-center">
                  <span className="text-[11px] text-slate-400">
                    Average response time in Bhadohi/Suriyawan area: <strong>10 to 20 minutes</strong> • 24x7 Active GPS Control Room
                  </span>
                </div>

              </form>

            </div>

            {/* Right Column: Fleet Capabilities & Trauma Facility Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Fleet Capabilities Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      ICU-On-Wheels Equipment
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard in every Prakash ALS unit
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Activity className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Transport Invasive Ventilator:</strong> Suitable for adult, pediatric, and acute respiratory distress patients.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Heart className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Biphasic Defibrillator & Multipara Monitor:</strong> 12-lead continuous ECG, SpO2, NIBP, and automated pacing.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Radio className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Direct Tele-link to Emergency Room:</strong> ECG and vitals are transmitted to attending cardiologists before arrival.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Stethoscope className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Certified ACLS Paramedic on Board:</strong> Trained in intravenous cannulation, airway management, and CPR.
                    </div>
                  </div>
                </div>
              </div>

              {/* Trauma Bay Readiness Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Hospital Emergency Triage Ready
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-white">
                  Prakash Hospital Emergency Center
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Located opposite Old Indian Oil Petrol Pump in Suriyawan, Bhadohi with zero red-light ramp entry, immediate emergency resuscitation bay, and 24x7 doctor coverage.
                </p>

                <div className="p-3 bg-white/10 rounded-xl text-xs space-y-1.5 border border-white/10">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Emergency Desk:</span>
                    <strong className="text-white">{HOSPITAL_INFO.emergencyNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blood Bank Desk:</span>
                    <strong className="text-white">24x7 In-House Approved</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cardiology Cath Lab:</span>
                    <strong className="text-white">Standby &lt; 20 min D2B</strong>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href={HOSPITAL_INFO.googleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Open Live Hospital Directions in Google Maps</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};
