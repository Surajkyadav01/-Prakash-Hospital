import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  Bed, 
  Activity, 
  CheckCircle2, 
  HeartHandshake, 
  Building2, 
  Clock, 
  FileCheck2, 
  ArrowRight, 
  Sparkles, 
  PhoneCall,
  Phone,
  Mail,
  MessageCircle,
  Stethoscope,
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { getAssetUrl } from '../utils/assetPath';

interface AboutUsPageProps {
  onNavigateToBooking: () => void;
  onNavigateToDoctors: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateToBooking,
  onNavigateToDoctors,
}) => {
  const leadership = [
    {
      name: 'Dr. O.P. Yadav',
      role: 'Hospital Owner & Chief Surgeon',
      qualifications: 'M.S. (General Surgery) • Gold Medalist',
      bio: 'Hospital Owner and Senior Surgeon leading gastro, proctology, and advanced surgical care at Prakash Hospital since its establishment in 2020, dedicated to bringing ethical, accessible healthcare to Suriyawan, Bhadohi.',
      initials: 'OP',
      badge: 'Hospital Owner & Chief Surgeon',
      photoUrl: '/assets/doctors/dr-op-yadav.jpg'
    },
    {
      name: 'Kamlesh Yadav',
      role: 'Hospital Manager & Operations Head',
      qualifications: 'Hospital Administration & Public Assistance',
      bio: 'Hospital Manager overseeing daily operations, patient admissions, emergency coordination, and public inquiries. For any hospital issue, patient assistance, or operational inquiry, please contact Mr. Kamlesh Yadav directly.',
      initials: 'KY',
      badge: 'Hospital Manager',
      photoUrl: '/assets/team/kamlesh-yadav-manager.jpg',
      isManager: true,
      phone: HOSPITAL_INFO.emergencyNumber,
      phoneRaw: HOSPITAL_INFO.emergencyPhoneRaw,
      email: HOSPITAL_INFO.email,
      whatsappUrl: HOSPITAL_INFO.whatsappUrl
    },
    {
      name: 'Dr. V.K. Yadav',
      role: 'Consultant Interventional Cardiologist',
      qualifications: 'MD, DM (Cardiology) • KGMU Lucknow (Triple Gold Medalist)',
      bio: 'Cardiologist trained at King George\'s Medical University & Lari Cardiology, providing specialized cardiac clinics and cardiovascular consultations.',
      initials: 'VK',
      badge: 'Visiting Specialist'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation of Prakash Hospital (स्थापना)',
      description: 'Inaugurated in 2020 as a modern multi-speciality hospital at Prakash Hospital Bypass Road, Suriyawan, Uttar Pradesh 221404 to provide quality, accessible healthcare.'
    },
    {
      year: '2021 - 2022',
      title: 'Modular Operation Theatres & Critical Care',
      description: 'Commissioned modern modular surgical suites, 24x7 emergency trauma stabilization bay, and maternal care facilities.'
    },
    {
      year: '2023 - 2024',
      title: 'Multi-Speciality OPD & Visiting Clinics',
      description: 'Expanded super-specialist consultations in Cardiology (KGMU), Joint Replacement, ENT (BHU Trauma Centre), Neuropsychiatry (CIP Ranchi), and Dermatology.'
    },
    {
      year: 'Present',
      title: '40-Bed Modern Healthcare & Cashless Facility',
      description: 'Fully equipped 40-bed healthcare center with 15+ specialist doctors, 4,500+ successful surgeries performed, and round-the-clock emergency support.'
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 sm:py-14 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Page Hero Banner */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>10+ Years of Clinical Healing & Compassion</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            About Prakash Hospital, Suriyawan
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Established in 2020, Prakash Hospital stands as a cornerstone of advanced medical care, clinical honesty, and warm bedside empathy in Suriyawan, Bhadohi and surrounding regions of Uttar Pradesh.
          </p>
        </div>

        {/* Hero Visual Card with Stats Overlay */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950">
          <picture>
            <source srcSet={getAssetUrl('/assets/prakash-hospital-real.webp')} type="image/webp" />
            <img
              src={getAssetUrl('/assets/prakash-hospital-real.jpg')}
              alt="Prakash Hospital 7-Story Modern Building Exterior Suriyawan Bhadohi"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto min-h-[300px] sm:min-h-[460px] md:min-h-[540px] max-h-[700px] object-cover object-[center_35%] transition-transform duration-700 hover:scale-[1.01]"
              onError={(e) => {
                e.currentTarget.src = "https://www.image2url.com/r2/default/images/1790235449576-906af834-b306-4f3d-bea1-394c4f26dc1d.jpeg";
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Premier Health Destination</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black">
                NABH & NABL Accredited Multi-Speciality Tertiary Hospital
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                Serving Suriyawan, Bhadohi, and Eastern Uttar Pradesh with ethical clinical care and cutting-edge surgical infrastructure.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onNavigateToBooking}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Book OPD Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-sky-600">10+</span>
            <span className="block text-xs font-bold text-slate-800 mt-1">Years Clinical Experience</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Established in 2020</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600">40</span>
            <span className="block text-xs font-bold text-slate-800 mt-1">Hospital Beds</span>
            <p className="text-[11px] text-slate-500 mt-0.5">ICU & Inpatient Care</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-blue-600">15+</span>
            <span className="block text-xs font-bold text-slate-800 mt-1">Specialist Doctors</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Across Key Disciplines</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-rose-600">4,500+</span>
            <span className="block text-xs font-bold text-slate-800 mt-1">Successful Surgeries</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Zero-infection focus</p>
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Our Compassionate Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To provide evidence-based, compassionate, and affordable healthcare of international standards to all sections of society with transparency and unwavering clinical integrity.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Our Vision for Healing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be recognized as the foremost patient-centric medical institution in the National Capital Region, distinguished by medical innovation, ethical practice, and exceptional clinical outcomes.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Accreditations & Quality</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Rigorous adherence to NABH hospital safety standards, NABL certified laboratory protocols, continuous nurse training, and strict clinical audits ensure the safest healing environment.
            </p>
          </div>
        </div>

        {/* Hospital Journey Timeline */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Dedicated Healthcare Growth</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Our Journey & Milestones</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="relative pl-4 border-l-2 border-sky-500 space-y-1.5">
                <span className="text-sky-600 font-black text-lg sm:text-xl block">{milestone.year}</span>
                <h4 className="font-bold text-sm text-slate-900">{milestone.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Senior Clinical Leadership */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Medical Governance</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Hospital Leadership & Senior Consultants</h3>
            </div>
            <button
              type="button"
              onClick={onNavigateToDoctors}
              className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Doctors & Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader) => (
              <div 
                key={leader.name} 
                className={`bg-white rounded-3xl p-6 border ${leader.isManager ? 'border-sky-300 ring-2 ring-sky-100 bg-linear-to-b from-sky-50/40 via-white to-white' : 'border-slate-200'} shadow-xs flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  {/* Photo or Initials Avatar & Badge Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden border-2 border-sky-200 shadow-md bg-slate-900 shrink-0">
                      {leader.photoUrl && (
                        <img
                          src={getAssetUrl(leader.photoUrl)}
                          alt={leader.name}
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-cover object-[center_20%] relative z-10"
                          onError={(e) => {
                            const img = e.currentTarget;
                            const triedPng = img.getAttribute('data-tried-png');
                            if (!triedPng && leader.photoUrl?.includes('dr-op-yadav')) {
                              img.setAttribute('data-tried-png', 'true');
                              img.src = getAssetUrl('/assets/doctors/dr-op-yadav.png');
                            } else {
                              img.style.display = 'none';
                            }
                          }}
                        />
                      )}
                      <div 
                        className={`absolute inset-0 ${leader.isManager ? 'bg-gradient-to-br from-blue-900 to-sky-800' : 'bg-gradient-to-br from-slate-800 to-sky-900'} flex flex-col items-center justify-center text-white`}
                      >
                        {leader.isManager ? (
                          <Briefcase className="w-8 h-8 text-sky-300 mb-2" />
                        ) : (
                          <Stethoscope className="w-8 h-8 text-sky-300 mb-2" />
                        )}
                        <span className="text-xl font-black text-sky-100">{leader.initials}</span>
                      </div>
                    </div>

                    {/* Role Tag (aligned to top with photo) */}
                    <div className="self-start shrink-0 pt-0.5">
                      <span className={`text-[11px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full inline-flex items-center whitespace-nowrap shadow-2xs ${leader.isManager ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-sky-100 text-sky-800 border border-sky-200'}`}>
                        {leader.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-lg text-slate-900">{leader.name}</h4>
                    <span className="text-xs font-bold text-sky-700 block">{leader.role}</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{leader.qualifications}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {leader.bio}
                  </p>

                  {/* Manager Special Notice & Contact Bar */}
                  {leader.isManager && (
                    <div className="pt-2 border-t border-sky-100 space-y-2.5">
                      <div className="p-3 bg-sky-100/70 border border-sky-200/80 rounded-xl text-[11px] text-sky-900 font-medium leading-tight flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Patient Assistance &amp; Help Desk:</strong> For any hospital issue, admission support, or official work, please contact Manager Kamlesh Yadav directly.
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={`tel:${leader.phoneRaw}`}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Manager</span>
                        </a>
                        <a
                          href={leader.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {leader.email && (
                        <a
                          href={`mailto:${leader.email}`}
                          className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-semibold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">{leader.email}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom CTA for Doctors */}
                {!leader.isManager && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={onNavigateToBooking}
                      className="w-full py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
