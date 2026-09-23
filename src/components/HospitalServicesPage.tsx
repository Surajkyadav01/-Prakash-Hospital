import React from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Baby, 
  Wind, 
  Droplets, 
  Pill, 
  Ambulance, 
  ScanLine, 
  Clock, 
  Bed, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  Building2,
  FileText,
  Users
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HospitalServicesPageProps {
  onNavigateToBooking: (deptId?: string, doctorId?: string) => void;
  onNavigateToEmergency: () => void;
  onOpenAmbulance: () => void;
}

export const HospitalServicesPage: React.FC<HospitalServicesPageProps> = ({
  onNavigateToBooking,
  onNavigateToEmergency,
  onOpenAmbulance,
}) => {
  const serviceCategories = [
    {
      title: 'Clinical & Inpatient Services (IPD)',
      icon: <Building2 className="w-5 h-5 text-sky-600" />,
      description: 'Comprehensive inpatient accommodations with 24x7 resident medical officers and empathetic bedside nursing care.',
      services: [
        {
          name: 'General & Semi-Private Patient Wards',
          desc: 'Air-conditioned multi-occupancy rooms with central oxygen, bedside monitors, companion recliners, and hygienic dietary services.',
          badge: 'Available 24x7'
        },
        {
          name: 'Super Deluxe & VIP Executive Suites',
          desc: 'Spacious private rooms with electronically motorized beds, attached companion guest lounge, private refrigerator, LED TV, and Wi-Fi.',
          badge: 'Private Accommodations'
        },
        {
          name: 'Daycare Chemotherapy & Surgical Ward',
          desc: 'Specialized 15-station lounge for short-stay procedures, minor surgeries, endoscopy, and chemotherapy infusions.',
          badge: 'Same-Day Discharge'
        }
      ]
    },
    {
      title: 'Intensive & Critical Care Units (ICU)',
      icon: <HeartPulse className="w-5 h-5 text-red-600" />,
      description: 'State-of-the-art intensive monitoring units with 1:1 nurse-to-patient ratio and round-the-clock intensivists.',
      services: [
        {
          name: 'Multi-Disciplinary Intensive Care Unit (ICU)',
          desc: '24-bed high-acuity facility equipped with advanced mechanical invasive ventilators, CRRT, multi-channel hemodynamic monitors.',
          badge: 'Critical Life Support'
        },
        {
          name: 'Coronary Care Unit (CCU) & Cath Lab',
          desc: 'Dedicated cardiac emergency recovery bay for post-angioplasty and acute myocardial infarction monitoring.',
          badge: 'Door-to-Balloon < 60 mins'
        },
        {
          name: 'Level-III Neonatal ICU (NICU) & PICU',
          desc: 'Equipped with servo warmers, LED phototherapy, continuous positive airway pressure (CPAP), and high-frequency ventilation.',
          badge: 'Newborn Care'
        }
      ]
    },
    {
      title: 'Advanced Surgical Suites & Cath Lab',
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      description: 'Ultra-clean modular operation theatres adhering to international infection control guidelines.',
      services: [
        {
          name: 'Class 100 Modular Operation Theatres (OT)',
          desc: 'Laminar airflow suites with HEPA filtration, anti-microbial epoxy walls, and robotic surgical consoles for joint replacements.',
          badge: 'Zero Infection Protocol'
        },
        {
          name: 'Flat-Panel Digital Cardiac Cath Lab',
          desc: 'High-precision coronary angiography, complex angioplasties, pacemaker implants, and peripheral vascular interventions.',
          badge: '24x7 Interventional'
        },
        {
          name: 'Minimally Invasive & Laparoscopic OT',
          desc: '4K Ultra-HD laparoscopic towers for gallbladder, appendix, hernia, and bariatric keyhole surgeries.',
          badge: 'Faster Recovery'
        }
      ]
    },
    {
      title: '24x7 Diagnostics, Radiology & Pathology',
      icon: <ScanLine className="w-5 h-5 text-indigo-600" />,
      description: 'NABL accredited pathology and high-resolution imaging for accurate clinical decision-making.',
      services: [
        {
          name: '128-Slice Multi-Detector Cardiac CT',
          desc: 'Instant non-invasive coronary CT angiography, whole-body trauma imaging, and virtual colonoscopy with minimal radiation.',
          badge: 'Rapid 15-Min Scans'
        },
        {
          name: '1.5 Tesla Silent Scan MRI Suite',
          desc: 'Ultra-sharp neuro, spine, musculoskeletal, and abdominal imaging with ambient patient comfort system.',
          badge: 'High Field MRI'
        },
        {
          name: 'Automated NABL Accredited Laboratory',
          desc: 'Full-spectrum biochemistry, hematology, microbiology, immunology, and rapid blood gas (ABG) testing.',
          badge: 'Online Digital Reports'
        }
      ]
    },
    {
      title: 'Supportive & Emergency Infrastructure',
      icon: <Ambulance className="w-5 h-5 text-rose-600" />,
      description: 'Crucial life support utilities providing continuous uninterrupted clinical backup.',
      services: [
        {
          name: 'Advanced Life Support (ALS) Ambulances',
          desc: 'GPS-enabled ICU on wheels with transport ventilator, defibrillator, infusion pumps, and trained paramedics.',
          badge: 'Emergency Response'
        },
        {
          name: 'Government Approved Blood Storage Unit',
          desc: 'Round-the-clock availability of PRBC, Platelet Concentrate, Fresh Frozen Plasma (FFP), and Cryoprecipitate.',
          badge: 'Tested & Safe'
        },
        {
          name: '24-Hour Hospital Pharmacy',
          desc: 'Dispensing 100% authentic medicines, surgical consumables, implants, and cold-chain refrigerated biologics.',
          badge: '100% Genuine'
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 sm:py-14 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>Comprehensive Clinical Care</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Hospital Services & Clinical Facilities
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            From round-the-clock emergency triage and robotic surgical suites to modern outpatient consultation clinics and automated diagnostic labs, Prakash Hospital delivers dependable care at every stage.
          </p>
        </div>

        {/* Quick Service Highlights Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-sky-600">40</span>
            <span className="block text-xs font-bold text-slate-800 mt-0.5">Inpatient Bed Strength</span>
            <p className="text-[11px] text-slate-500 mt-0.5">ICU & Inpatient Care Beds</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">6</span>
            <span className="block text-xs font-bold text-slate-800 mt-0.5">Modular Operation OTs</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Class 100 Laminar Airflow</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-blue-600">24x7</span>
            <span className="block text-xs font-bold text-slate-800 mt-0.5">Digital Cath Lab</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Primary PCI for Heart Attack</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-red-600">&lt; 15m</span>
            <span className="block text-xs font-bold text-slate-800 mt-0.5">Ambulance Dispatch</span>
            <p className="text-[11px] text-slate-500 mt-0.5">GPS Tracked ALS Units</p>
          </div>
        </div>

        {/* Categories of Services */}
        <div className="space-y-10">
          {serviceCategories.map((category, catIndex) => (
            <div 
              key={category.title}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of sub-services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category.services.map((svc) => (
                  <div
                    key={svc.name}
                    className="p-4 bg-slate-50 hover:bg-sky-50/40 border border-slate-200 hover:border-sky-200 rounded-2xl flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
                        {svc.badge}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {svc.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onNavigateToBooking()}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Schedule Appointment</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Need Assistance Choosing the Right Service?
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Speak with our Hospital Patient Care Advisor
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our helpdesk is operational round-the-clock to guide you with OPD timings, consultant appointments, diagnostic prep, and cashless health insurance pre-authorizations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigateToBooking()}
              className="py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Consultation</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition-colors"
            >
              <Clock className="w-4 h-4 text-red-400" />
              <span>24x7 Help: {HOSPITAL_INFO.opdHelpline}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
