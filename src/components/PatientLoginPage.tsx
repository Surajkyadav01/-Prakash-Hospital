import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HeartPulse, 
  Phone, 
  User, 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle, 
  LogOut, 
  Calendar, 
  Clock, 
  Lock,
  Hospital,
  AlertCircle,
  HelpCircle,
  FileCheck2,
  Stethoscope,
  Activity
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { getAssetUrl } from '../utils/assetPath';

interface PatientLoginPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const PatientLoginPage: React.FC<PatientLoginPageProps> = ({
  onBackToHome,
  onOpenBooking,
}) => {
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'uhid'>('mobile');
  const [identifier, setIdentifier] = useState('8383826205');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const sampleReports = [
    {
      id: 'rep-1',
      name: 'Complete Blood Count (CBC) with ESR & Peripheral Smear',
      date: '18 Sep 2026',
      department: 'Pathology Lab (NABL Accredited)',
      doctor: 'Dr. Sunita Bansal',
      status: 'Verified & Digitally Signed',
      fileSize: '420 KB',
      referenceId: 'LAB-2026-90412'
    },
    {
      id: 'rep-2',
      name: '2D Color Doppler Echocardiography & Hemodynamic Report',
      date: '14 Sep 2026',
      department: 'Cardiology (Cath Lab)',
      doctor: 'Dr. Rajesh Sharma',
      status: 'Verified & Digitally Signed',
      fileSize: '1.2 MB',
      referenceId: 'CARD-2026-44109'
    },
    {
      id: 'rep-3',
      name: 'Comprehensive Lipid & Renal Function Profile (KFT)',
      date: '02 Sep 2026',
      department: 'Biochemistry Division',
      doctor: 'Dr. Ananya Goel',
      status: 'Verified & Digitally Signed',
      fileSize: '560 KB',
      referenceId: 'BIO-2026-11894'
    },
    {
      id: 'rep-4',
      name: 'Digital Chest X-Ray (PA View) with Radiologist Notes',
      date: '12 Aug 2026',
      department: 'Radiology & Imaging',
      doctor: 'Dr. Meenakshi Sundaram',
      status: 'Verified & Digitally Signed',
      fileSize: '2.4 MB',
      referenceId: 'RAD-2026-88301'
    }
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      setOtpSent(true);
      setOtp('4421'); // Simulated OTP auto-fill for instant test convenience
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleDownload = (reportName: string) => {
    setDownloadSuccessToast(`Downloading official digital copy of ${reportName}...`);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setOtp('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. Dedicated Top Bar with Hospital Logo & "Back to Home" Button */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            id="back-to-home-btn"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-sky-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all border border-slate-200 shadow-2xs"
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
              src={getAssetUrl('/assets/prakash-hospital-logo.webp')}
              alt="Prakash Hospital Logo"
              width={48}
              height={48}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform shrink-0"
              onError={(e) => {
                e.currentTarget.src = getAssetUrl('/assets/prakash-hospital-logo.png');
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
                <span className="px-1.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[9px] font-bold tracking-wider uppercase">
                  Portal
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5">
                Patient Medical Portal • Suriyawan, Bhadohi
              </span>
            </div>
          </div>
        </div>

        {/* Right Info Helpline */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
            className="hidden md:flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span>24x7 Emergency: {HOSPITAL_INFO.emergencyNumber}</span>
          </a>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Helpline Desk
            </span>
            <span className="text-xs font-bold text-slate-700">
              {HOSPITAL_INFO.opdHelpline}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Main Full-Screen Split Layout */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)]">
        
        {/* LEFT COLUMN: Medical Branding, Emergency Helpline, Security Trust Badges */}
        <div className="lg:col-span-5 xl:col-span-5 bg-slate-900 text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Secure Patient Information System</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Prakash Hospital <br />
                <span className="text-sky-400">Digital Health & Records</span>
              </h1>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-lg">
                Access your verified diagnostic reports, track your OPD consultation history, view digital prescriptions, and schedule follow-ups from the comfort of your home.
              </p>
            </div>

            {/* Portal Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">NABL Certified Lab Reports</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Download signed digital PDF reports for Pathology, Biochemistry, CT Scan, and 2D Echo within minutes of verification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Unique Health Identifier (UHID)</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Unified medical history across all consultations, surgical records, and emergency admissions since your first visit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct OPD Priority Booking</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Reserve doctor slots with real-time room availability, zero counter waiting times, and instant SMS confirmations.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Security Trust & Helplines */}
          <div className="relative z-10 pt-8 mt-6 border-t border-slate-800 space-y-4">
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-semibold">NABH Accredited</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-slate-300 font-semibold">256-bit Encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-300 font-semibold">NABL Diagnostic Labs</span>
              </div>
            </div>

            {/* Emergency Hotline box */}
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
                    24x7 Emergency Trauma Desk
                  </span>
                  <span className="text-xs font-black text-white">
                    {HOSPITAL_INFO.emergencyNumber}
                  </span>
                </div>
              </div>
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Call Now
              </a>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Full-Height Interactive Login Card or Logged In Patient Dashboard */}
        <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center bg-white">
          
          <div className="max-w-xl w-full mx-auto">
            
            {/* Download success toast */}
            {downloadSuccessToast && (
              <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{downloadSuccessToast}</span>
              </div>
            )}

            {isLoggedIn ? (
              /* LOGGED IN PATIENT DASHBOARD */
              <div className="space-y-6">
                
                {/* Header with Logout */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                      Verified Patient Profile
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      Welcome, Alok Verma
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    id="patient-logout-btn"
                    className="py-2 px-3.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>

                {/* Patient Digital Identity Card */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50/60 border border-sky-100 rounded-2xl p-5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-sky-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                        AV
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-base">Alok Verma</h3>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Active UHID
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Reg. Since Oct 2021 • Suriyawan, Bhadohi</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        UHID Number
                      </span>
                      <span className="text-sm font-black text-sky-900 font-mono">
                        PK-904128
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Age / Gender</span>
                      <span className="font-extrabold text-slate-800">46 Y / Male</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Blood Group</span>
                      <span className="font-extrabold text-red-600">O +ve</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Attending Doctor</span>
                      <span className="font-extrabold text-slate-800">Dr. Rajesh Sharma</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Insurance TPA</span>
                      <span className="font-extrabold text-slate-800">Star Health (Empanelled)</span>
                    </div>
                  </div>
                </div>

                {/* Lab Reports Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <FileText className="w-5 h-5 text-sky-600" />
                        <span>Diagnostic & Laboratory Reports</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        NABL certified digital copies with verified pathologist and radiologist signatures.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      {sampleReports.length} Reports Ready
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {sampleReports.map((report) => (
                      <div
                        key={report.id}
                        className="p-4 bg-slate-50 hover:bg-sky-50/40 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                              {report.referenceId}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              {report.status}
                            </span>
                          </div>

                          <h5 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-sky-700 transition-colors">
                            {report.name}
                          </h5>

                          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>{report.department}</span>
                            <span>•</span>
                            <span>Advised by <strong>{report.doctor}</strong></span>
                            <span>•</span>
                            <span className="text-slate-400">{report.date}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownload(report.name)}
                          className="py-2.5 px-4 bg-white hover:bg-sky-600 text-sky-700 hover:text-white border border-slate-200 hover:border-sky-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shrink-0 shadow-2xs transition-all active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF ({report.fileSize})</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Consultation CTA */}
                <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-sm sm:text-base">Need a Follow-up Consultation?</h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Schedule an OPD slot with your specialist with zero counter queues.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 shadow-md transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book OPD Slot</span>
                  </button>
                </div>

              </div>
            ) : (
              /* LOGIN FORM (Mobile OTP or UHID) */
              <div className="space-y-6">
                
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-3 border border-sky-100">
                    <Hospital className="w-3.5 h-3.5 text-sky-600" />
                    <span>Prakash Hospital OPD & Patient Desk</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Patient Portal Login
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                    Log in using your registered mobile number or your hospital UHID card to access clinical lab reports and prescriptions.
                  </p>
                </div>

                {/* Login Method Switcher Tabs */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('mobile');
                      setOtpSent(false);
                    }}
                    id="tab-mobile-login"
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                      loginMethod === 'mobile'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mobile Number (OTP)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('uhid');
                      setOtpSent(false);
                    }}
                    id="tab-uhid-login"
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                      loginMethod === 'uhid'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Hospital UHID Number
                  </button>
                </div>

                {!otpSent ? (
                  /* Step 1: Input Identifier */
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        {loginMethod === 'mobile'
                          ? 'Registered Mobile Number *'
                          : 'Hospital UHID Number *'}
                      </label>

                      <div className="relative">
                        {loginMethod === 'mobile' ? (
                          <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 bg-slate-50">
                            <span className="inline-flex items-center px-3.5 bg-slate-100 text-slate-600 font-bold text-sm border-r border-slate-200">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              placeholder="83838 26205"
                              value={identifier}
                              onChange={(e) => setIdentifier(e.target.value)}
                              className="w-full bg-transparent p-3 text-sm font-semibold text-slate-900 outline-none"
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            required
                            placeholder="e.g. PK-904128"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none uppercase font-mono"
                          />
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 mt-1.5">
                        {loginMethod === 'mobile'
                          ? 'Enter the 10-digit mobile number provided at the OPD registration desk.'
                          : 'Found on your OPD prescription slip, patient billing receipt, or discharge summary.'}
                      </p>
                    </div>

                    {/* Quick Demo Helper */}
                    <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-sky-800 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Demo Verification:</strong> Click below to receive simulated instant verification code (4421) and test report downloads.
                      </span>
                    </div>

                    <button
                      type="submit"
                      id="patient-send-otp-btn"
                      className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Verification Code</span>
                    </button>
                  </form>
                ) : (
                  /* Step 2: OTP Verification */
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">
                          Enter 4-Digit OTP Code *
                        </label>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-xs text-sky-600 font-bold hover:underline"
                        >
                          Change Number
                        </button>
                      </div>

                      <input
                        type="text"
                        maxLength={4}
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="4 4 2 1"
                        className="w-full text-center tracking-[0.75em] text-2xl font-black bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-900 font-mono"
                      />

                      <div className="flex items-center justify-between text-xs mt-2">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Simulated OTP auto-filled (4421)
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtp('4421')}
                          className="text-sky-600 hover:underline font-semibold"
                        >
                          Resend Code
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="patient-verify-otp-btn"
                      className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm tracking-wide shadow-md shadow-sky-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Verify & Access My Medical Records</span>
                    </button>
                  </form>
                )}

                {/* Footer security notes */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your health data is protected under Prakash Hospital Medical Confidentiality Protocols.
                  </span>
                </div>

                {/* Quick OPD CTA */}
                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">First time at Prakash Hospital? </span>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Book New Patient OPD Consultation →
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
