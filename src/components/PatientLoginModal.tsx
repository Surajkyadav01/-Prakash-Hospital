import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  FileText, 
  Download, 
  CheckCircle, 
  LogOut, 
  Calendar, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface PatientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PatientLoginModal: React.FC<PatientLoginModalProps> = ({
  isOpen,
  onClose,
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
      name: 'Complete Blood Count (CBC) with ESR',
      date: '18 Sep 2026',
      department: 'Pathology Lab',
      doctor: 'Dr. Sunita Bansal',
      status: 'Verified & Ready',
    },
    {
      id: 'rep-2',
      name: '2D Color Doppler Echocardiography',
      date: '14 Sep 2026',
      department: 'Cardiology (Cath Lab)',
      doctor: 'Dr. Rajesh Sharma',
      status: 'Verified & Ready',
    },
    {
      id: 'rep-3',
      name: 'Comprehensive Lipid & Renal Profile',
      date: '02 Sep 2026',
      department: 'Biochemistry',
      doctor: 'Dr. Ananya Goel',
      status: 'Verified & Ready',
    }
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      setOtpSent(true);
      setOtp('4421'); // Simulated OTP auto-fill
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleDownload = (reportName: string) => {
    setDownloadSuccessToast(`Downloading official signed copy of ${reportName}...`);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setOtp('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">
                {isLoggedIn ? 'Patient Portal & Medical Records' : 'Patient Login / OPD Portal'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Prakash Hospital Secure Patient Information System
              </p>
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {downloadSuccessToast && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccessToast}</span>
            </div>
          )}

          {isLoggedIn ? (
            /* Logged In Dashboard */
            <div className="space-y-5">
              
              {/* Patient Card */}
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-base">Alok Verma</h4>
                    <span className="text-[10px] font-bold bg-sky-200 text-sky-800 px-2 py-0.5 rounded-full">
                      Active UHID
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 space-x-2">
                    <span>UHID: <strong>PK-904128</strong></span>
                    <span>•</span>
                    <span>Age: <strong>46 Yrs / Male</strong></span>
                    <span>•</span>
                    <span>Blood: <strong>O+ve</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden xs:inline">Logout</span>
                </button>
              </div>

              {/* Lab Reports Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-600" />
                    <span>Download Diagnostic & Lab Reports</span>
                  </h5>
                  <span className="text-[11px] text-slate-400">NABL Accredited</span>
                </div>

                <div className="space-y-2.5">
                  {sampleReports.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {rep.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {rep.department} • Advised by {rep.doctor}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                          {rep.date} • {rep.status}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownload(rep.name)}
                        className="py-1.5 px-3 bg-white hover:bg-sky-50 text-sky-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-2xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick OPD Appointment CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Next Consultation Visit</span>
                </button>
              </div>

            </div>
          ) : (
            /* Login Form */
            <div className="space-y-5">
              
              {/* Method Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('mobile');
                    setOtpSent(false);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    loginMethod === 'mobile' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
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
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    loginMethod === 'uhid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Hospital UHID Number
                </button>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {loginMethod === 'mobile' ? 'Registered Mobile Number *' : 'Hospital UHID Number *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={loginMethod === 'mobile' ? 'e.g. 8383826205' : 'e.g. PK-904128'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Enter the phone or UHID registered during your OPD counter registration.
                    </p>
                  </div>

                  <button
                    type="submit"
                    id="patient-login-send-otp-btn"
                    className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Verification Code</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        Enter 4-digit OTP Code *
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-[11px] text-sky-600 font-semibold hover:underline"
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
                      className="w-full text-center tracking-widest text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      Demo verification code (4421) auto-filled for instant testing.
                    </p>
                  </div>

                  <button
                    type="submit"
                    id="patient-login-verify-btn"
                    className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Verify & View My Records</span>
                  </button>
                </form>
              )}

              {/* Safe Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected by Prakash Hospital 256-bit HIPAA compliant security.</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
