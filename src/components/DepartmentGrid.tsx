import React, { useState } from 'react';
import { 
  HeartPulse, 
  Brain, 
  Activity, 
  ShieldAlert, 
  Crosshair, 
  Baby, 
  Stethoscope, 
  Wind, 
  ChevronRight, 
  Bed, 
  UserCheck, 
  Check, 
  X,
  CalendarCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';
import { Department } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface DepartmentGridProps {
  onSelectDepartmentForDoctors: (deptId: string) => void;
  onOpenBookingForDept: (deptId: string) => void;
  isStandalonePage?: boolean;
}

export const DepartmentGrid: React.FC<DepartmentGridProps> = ({
  onSelectDepartmentForDoctors,
  onOpenBookingForDept,
  isStandalonePage = false,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId);

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-red-600" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-purple-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-sky-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-600" />;
      case 'Crosshair':
        return <Crosshair className="w-6 h-6 text-rose-600" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-emerald-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-blue-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-sky-600" />;
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'Brain':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Activity':
        return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'ShieldAlert':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Crosshair':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Baby':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default:
        return 'bg-sky-50 text-sky-600 border-sky-100';
    }
  };

  return (
    <section id="super-speciality" className={`py-10 sm:py-16 ${isStandalonePage ? 'bg-slate-50 min-h-screen' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" durationMs={500}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Centres of Clinical Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Key Departments & Super Speciality Care
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Multi-disciplinary medical teams with state-of-the-art diagnostic imaging, robotic technology, and dedicated intensive care units.
            </p>
          </div>
        </ScrollReveal>

        {/* Inline Expanded Department Detail (No small modal!) */}
        {selectedDept && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-500/40 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${getIconBg(selectedDept.iconName)} shrink-0`}>
                  {getDepartmentIcon(selectedDept.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                      Centre of Excellence
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Bed Strength: <strong>{selectedDept.bedCapacity}</strong>
                    </span>
                  </div>
                  <h3 className="font-black text-xl sm:text-2xl text-slate-900 mt-1">
                    {selectedDept.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Department Head: <strong className="text-slate-900">{selectedDept.headDoctor}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDeptId(null)}
                className="self-start sm:self-center p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Close Details</span>
              </button>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {selectedDept.fullDesc}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Clinical Procedures & Advanced Facilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {selectedDept.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenBookingForDept(selectedDept.id)}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book OPD Appointment in {selectedDept.name}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectDepartmentForDoctors(selectedDept.id)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View {selectedDept.name} Specialists</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Departments Grid - Mobile Tap Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {DEPARTMENTS.map((dept, idx) => {
            const isSelected = selectedDeptId === dept.id;
            return (
              <ScrollReveal
                key={dept.id}
                animation="fade-up"
                delayMs={(idx % 4) * 60}
                durationMs={500}
                className="h-full"
              >
                <div
                  id={`dept-card-${dept.id}`}
                  className={`h-full group bg-slate-50 hover:bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                    isSelected ? 'border-sky-500 shadow-md ring-2 ring-sky-500/20 bg-white' : 'border-slate-200/90 hover:border-sky-300 hover:shadow-lg'
                  }`}
                >
                  <div>
                    {/* Header with Icon and Capacity */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${getIconBg(dept.iconName)} group-hover:scale-105 transition-transform`}>
                        {getDepartmentIcon(dept.iconName)}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <Bed className="w-3 h-3 text-sky-600" />
                        {dept.bedCapacity}
                      </span>
                    </div>

                    {/* Department Name */}
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-sky-600 transition-colors">
                      {dept.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {dept.shortDesc}
                    </p>

                    {/* Highlights Bullet List */}
                    <ul className="mt-3 space-y-1 text-xs text-slate-500">
                      {dept.features.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDeptId(isSelected ? null : dept.id)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>{isSelected ? 'Hide Details' : 'View Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenBookingForDept(dept.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      title={`Book appointment with ${dept.name} specialist`}
                    >
                      Book OPD
                    </button>
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
