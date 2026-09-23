import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle, Hospital, Mail, Phone } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:px-8 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600/30 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  Privacy Policy & Patient Data Protection
                </h3>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  NABH Compliant
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Prakash Hospital • Suriyawan, Bhadohi (UP) • Effective Date: January 2026
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Commitment Notice */}
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-start gap-3">
            <Lock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-sky-950">
              <span className="font-bold">Your Trust & Privacy are Our Utmost Priority:</span> At Prakash Hospital, patient confidentiality, biometric health data security, and medical record privacy are protected under the <strong>Digital Personal Data Protection (DPDP) Act, Indian Medical Council (IMC) Regulations</strong>, and <strong>NABH / NABL standards</strong>.
            </div>
          </div>

          {/* 1. Information We Collect */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">1</span>
              Personal & Health Data We Collect
            </h4>
            <p className="text-slate-600">
              When you book an appointment, consult doctors, utilize diagnostic laboratories (Pathology/MRI), or admit a patient at Prakash Hospital, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 marker:text-sky-500">
              <li><strong>Patient Demographics:</strong> Full Name, Date of Birth, Gender, Age, Residential Address, Phone Number, and Email.</li>
              <li><strong>Clinical Information:</strong> Medical history, consultation notes, prescription details, diagnostic pathology reports, MRI/CT/X-ray imaging, vitals, allergies, and surgical records.</li>
              <li><strong>Financial & Insurance Data:</strong> TPA / Ayushman Bharat PM-JAY / CGHS / Corporate insurance card details, policy numbers, and cashless pre-authorization documents.</li>
              <li><strong>Emergency Contact Details:</strong> Guardian/next-of-kin contacts for trauma admissions and critical consent.</li>
            </ul>
          </div>

          {/* 2. How We Use Patient Data */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">2</span>
              Purpose of Data Utilization
            </h4>
            <p className="text-slate-600">
              All collected information is used strictly for medical treatment and clinical administration:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs">Accurate clinical diagnosis, medication prescriptions & patient care tracking.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs">OPD appointment confirmations, token reminders & critical lab report delivery.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs">Seamless cashless insurance claim processing with 30+ affiliated TPAs.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs">Statutory legal compliance with government health registries and NABH audits.</span>
              </div>
            </div>
          </div>

          {/* 3. Non-Disclosure & Third Party Sharing */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">3</span>
              Non-Disclosure & Confidentiality
            </h4>
            <p className="text-slate-600">
              <strong>We NEVER sell, lease, or monetize patient data.</strong> Your records are shared only under the following authorized circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 marker:text-sky-500">
              <li>With treating physicians, clinical specialists, surgeons, and nurses directly involved in your patient care.</li>
              <li>With your approved health insurance company or TPA for settling medical bills under signed authorization.</li>
              <li>When explicitly mandated by Indian judicial authorities, public health notifications (e.g. infectious disease reporting), or legal court warrants.</li>
            </ul>
          </div>

          {/* 4. Digital Security & Storage */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">4</span>
              Digital Security Measures
            </h4>
            <p className="text-slate-600">
              Hospital Electronic Health Record (EHR) databases are encrypted using AES-256 standard encryption at rest and SSL/TLS in transit. Physical records in the Medical Records Department (MRD) are secured with 24/7 CCTV surveillance and restricted biometric access.
            </p>
          </div>

          {/* 5. Grievance & Privacy Officer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
              <Hospital className="w-4 h-4 text-sky-600" />
              Patient Grievance & Data Protection Desk
            </h5>
            <p className="text-xs text-slate-600 mb-2">
              For queries regarding your medical record access, data corrections, or privacy concerns, please contact our hospital grievance desk:
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-700 font-medium">
              <a href="mailto:kamlesh8383826205@gmail.com" className="flex items-center gap-1 hover:text-sky-600 transition-colors">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>kamlesh8383826205@gmail.com</span>
              </a>
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>{HOSPITAL_INFO.opdHelpline} (Ext. 402)</span>
              </div>
              <div className="text-slate-500">
                Medical Records Dept (MRD), Ground Floor, Suriyawan, Bhadohi
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Prakash Hospital Privacy Policy • NABH Certified
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer ml-auto"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  );
};
