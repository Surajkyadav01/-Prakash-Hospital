import React from 'react';
import { 
  PhoneCall, 
  Ambulance, 
  Droplets, 
  ScanLine, 
  Pill, 
  Activity, 
  Clock, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SERVICES_24X7, HOSPITAL_INFO } from '../data/hospitalData';
import { ScrollReveal } from './ScrollReveal';

interface Services24x7SectionProps {
  onOpenAmbulance: () => void;
  onOpenBooking: () => void;
}

export const Services24x7Section: React.FC<Services24x7SectionProps> = ({
  onOpenAmbulance,
  onOpenBooking,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance className="w-6 h-6 text-red-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-rose-600" />;
      case 'ScanLine':
        return <ScanLine className="w-6 h-6 text-sky-600" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-emerald-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-blue-600" />;
      default:
        return <Clock className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <section id="24-7-services" className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Subtle red/blue emergency glow backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" durationMs={500}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-400 text-xs font-bold tracking-wide uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Round-The-Clock Critical Response
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                24 X 7 Emergency & Critical Services
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
                When every second matters, our specialized trauma teams, ALS ambulances, and intensive care specialists are operational 24 hours a day, 365 days a year.
              </p>
            </div>

            {/* Quick Emergency Action Box */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAmbulance}
                id="services-request-ambulance-btn"
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <Ambulance className="w-4 h-4" />
                <span>Request Ambulance</span>
              </button>

              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>Call: {HOSPITAL_INFO.emergencyNumber}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 24x7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_24X7.map((srv, idx) => {
            const isAmbulanceCard = srv.iconName === 'Ambulance' || srv.iconName === 'ShieldAlert';
            return (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delayMs={(idx % 3) * 70}
                durationMs={450}
                className="h-full"
              >
                <div
                  onClick={isAmbulanceCard ? onOpenAmbulance : undefined}
                  className={`h-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group ${
                    isAmbulanceCard ? 'cursor-pointer hover:border-red-500/50 hover:shadow-lg hover:shadow-red-950/30' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getIcon(srv.iconName)}
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isAmbulanceCard 
                          ? 'bg-red-950/80 text-red-300 border-red-800' 
                          : 'bg-slate-900 text-sky-400 border-slate-700'
                      }`}>
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Available 24x7x365</span>
                    <span className={`${isAmbulanceCard ? 'text-red-400 font-bold' : 'text-sky-400'} group-hover:translate-x-1 transition-transform inline-flex items-center gap-1`}>
                      {isAmbulanceCard ? 'Dispatch Ambulance' : 'Ready'} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
