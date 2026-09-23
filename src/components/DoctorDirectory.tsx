import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle,
  Filter,
  Stethoscope,
  Building2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Doctor } from '../types';
import { getAssetUrl } from '../utils/assetPath';

interface DoctorDirectoryProps {
  selectedDepartmentFilter: string;
  onFilterChange: (deptId: string) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({
  selectedDepartmentFilter,
  onFilterChange,
  onBookDoctor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function for smart multi-query, phonetic, and alias matching
  const checkDoctorMatchesQuery = (doc: Doctor, rawQuery: string): boolean => {
    if (!rawQuery || !rawQuery.trim()) return true;
    const qLower = rawQuery.toLowerCase().trim();
    const qClean = qLower.replace(/[.\-_,()/:]/g, ' ').replace(/\s+/g, ' ').trim();
    const qStripped = qLower.replace(/[^a-z0-9\u0900-\u097F]/g, '');

    if (!qStripped) return true;

    // Aggregate all doctor search tokens
    const allDocTokens = [
      doc.name,
      doc.hindiName || '',
      doc.specialty,
      doc.hindiSpecialty || '',
      doc.qualifications,
      doc.affiliation || '',
      doc.badge || '',
      doc.availability || '',
      doc.avatarInitials,
      ...(doc.aliases || [])
    ];

    // 1. Direct contains check across any token
    for (const token of allDocTokens) {
      if (token.toLowerCase().includes(qLower)) return true;
      const tClean = token.toLowerCase().replace(/[.\-_,()/:]/g, ' ').replace(/\s+/g, ' ').trim();
      if (tClean.includes(qClean)) return true;
      const tStripped = token.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, '');
      if (tStripped.includes(qStripped)) return true;
    }

    // 2. Phonetic transliteration checks (B <-> V, बी <-> वी, BK <-> VK)
    const qPhoneticVtoB = qStripped.replace(/^v/, 'b');
    const qPhoneticBtoV = qStripped.replace(/^b/, 'v');
    const qHindiBtoV = qStripped.replace(/^बी/, 'वी');
    const qHindiVtoB = qStripped.replace(/^वी/, 'बी');

    for (const token of allDocTokens) {
      const tStripped = token.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, '');
      if (
        tStripped.includes(qPhoneticVtoB) ||
        tStripped.includes(qPhoneticBtoV) ||
        tStripped.includes(qHindiBtoV) ||
        tStripped.includes(qHindiVtoB)
      ) {
        return true;
      }
    }

    // 3. Multi-word matching (e.g. "vk yadav", "बीके यादव", "manas gupta", "heart doctor")
    const words = qClean
      .split(' ')
      .filter((w) => w.length > 0 && w !== 'dr' && w !== 'डॉ' && w !== 'डॉक्टर');

    if (words.length > 1) {
      const combinedClean = allDocTokens.join(' ').toLowerCase().replace(/[.\-_,()/:]/g, ' ').replace(/\s+/g, ' ');
      const combinedStripped = allDocTokens.join(' ').toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, '');

      const allWordsMatch = words.every((word) => {
        const wStripped = word.replace(/[^a-z0-9\u0900-\u097F]/g, '');
        const wVtoB = wStripped.replace(/^v/, 'b');
        const wBtoV = wStripped.replace(/^b/, 'v');
        const wHindiBtoV = wStripped.replace(/^बी/, 'वी');
        const wHindiVtoB = wStripped.replace(/^वी/, 'बी');

        return (
          combinedClean.includes(word) ||
          combinedStripped.includes(wStripped) ||
          combinedStripped.includes(wVtoB) ||
          combinedStripped.includes(wBtoV) ||
          combinedStripped.includes(wHindiBtoV) ||
          combinedStripped.includes(wHindiVtoB)
        );
      });

      if (allWordsMatch) return true;
    }

    return false;
  };

  // Department filter list with 'all'
  const filterTabs = [
    { id: 'all', name: 'All Departments' },
    ...DEPARTMENTS.map((d) => ({
      id: d.id,
      name: d.name.split('(')[0].split('&')[0].trim()
    }))
  ];

  // Filtered doctors based on active tab & search query
  const matchingDoctorsInCurrentDept = DOCTORS.filter((doc) => {
    const matchesDept = selectedDepartmentFilter === 'all' || doc.departmentId === selectedDepartmentFilter;
    const matchesQuery = checkDoctorMatchesQuery(doc, searchQuery);
    return matchesDept && matchesQuery;
  });

  // If search query is entered and current department yields no result, search hospital-wide
  const isSearchCrossDeptFallback =
    searchQuery.trim().length > 0 &&
    selectedDepartmentFilter !== 'all' &&
    matchingDoctorsInCurrentDept.length === 0;

  const filteredDoctors = isSearchCrossDeptFallback
    ? DOCTORS.filter((doc) => checkDoctorMatchesQuery(doc, searchQuery))
    : matchingDoctorsInCurrentDept;

  return (
    <section id="doctors" className="py-12 sm:py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase mb-2">
              Our Medical Team
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Doctors Directory
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Meet our team of senior consultants, surgeons, and specialists available at Prakash Hospital & Multi-Speciality Care.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search doctor, specialty, degree..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filterable Tabs by Department (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-sky-600" />
            <span>Filter:</span>
          </div>
          {filterTabs.map((tab) => {
            const isActive = selectedDepartmentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Doctor Profile Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                id={`doctor-card-${doc.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Section with Doctor Identity & Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex gap-4 items-start">
                    
                    {/* Doctor Avatar / Photo Placeholder */}
                    <div className="relative shrink-0">
                      {doc.photoUrl ? (
                        <img
                          src={getAssetUrl(doc.photoUrl)}
                          alt={doc.name}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl object-cover object-[center_20%] border-2 border-sky-200 shadow-xs"
                          onError={(e) => {
                            // If primary path fails, try png extension
                            if (doc.photoUrl && !doc.photoUrl.endsWith('.png')) {
                              e.currentTarget.src = getAssetUrl(doc.photoUrl.replace('.jpg', '.png'));
                            } else {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                              const fallback = document.getElementById(`doc-fallback-${doc.id}`);
                              if (fallback) fallback.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        id={`doc-fallback-${doc.id}`}
                        className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-slate-800 via-sky-900 to-slate-900 flex flex-col items-center justify-center text-white border-2 border-sky-200/60 shadow-xs relative overflow-hidden group ${doc.photoUrl ? 'hidden' : 'flex'}`}
                      >
                        <Stethoscope className="w-6 h-6 text-sky-300 mb-1 opacity-90" />
                        <span className="text-base sm:text-lg font-black tracking-wider text-sky-100">
                          {doc.avatarInitials}
                        </span>
                        <span className="text-[9px] text-sky-300/80 font-bold uppercase tracking-widest mt-0.5">
                          Doctor
                        </span>
                      </div>
                      
                      {/* Verified Doctor Badge */}
                      <div 
                        className="absolute -bottom-2 -right-1 bg-white text-emerald-600 border border-emerald-200 shadow-2xs px-1.5 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-bold"
                        title="Verified Medical Staff"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>MD</span>
                      </div>
                    </div>

                    {/* Name, Hindi Name, Qual & Specialty */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {doc.name}
                        </h3>
                        {doc.hindiName && (
                          <span className="text-xs font-semibold text-slate-500">
                            ({doc.hindiName})
                          </span>
                        )}
                      </div>

                      {/* Doctor Distinction / Honor Badge if on board */}
                      {doc.badge && (
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                          {doc.badge.toLowerCase().includes('gold') ? (
                            <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                          ) : (
                            <Award className="w-3 h-3 text-amber-600 shrink-0" />
                          )}
                          <span className="truncate">{doc.badge}</span>
                        </div>
                      )}

                      {/* Qualifications with proper wrapping */}
                      <p className="text-xs font-semibold text-sky-800 mt-2 break-words leading-relaxed">
                        {doc.qualifications}
                      </p>
                    </div>
                  </div>

                  {/* Specialization Box */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      विशेषज्ञता / Specialization
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug break-words">
                      {doc.specialty}
                    </p>
                  </div>

                  {/* Institutional Affiliation / Training if specified in reference image */}
                  {doc.affiliation && (
                    <div className="mt-3 flex items-start gap-1.5 p-2 rounded-lg bg-sky-50/80 border border-sky-100 text-xs text-sky-900">
                      <Building2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span className="font-semibold leading-tight">{doc.affiliation}</span>
                    </div>
                  )}

                  {/* Doctor OPD Availability / Schedule Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs mt-auto">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-slate-900 block">
                          उपलब्धता / Availability Schedule:
                        </span>
                        <p className="text-slate-700 font-semibold mt-0.5 leading-snug break-words">
                          {doc.availability}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card Footer with Verified OPD status & Book CTA */}
                <div className="p-4 sm:px-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-semibold">Hospital OPD</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookDoctor(doc)}
                    id={`book-doctor-${doc.id}`}
                    className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <CheckCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-base">No doctors found matching criteria</h4>
            <p className="text-slate-500 text-xs mt-1">Try resetting the department filter or clearing your search term.</p>
            <button
              type="button"
              onClick={() => {
                onFilterChange('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
