import React from 'react';
import { ShieldCheck, CheckCircle, FileText, Phone, HelpCircle } from 'lucide-react';
import { TPA_PARTNERS, HOSPITAL_INFO } from '../data/hospitalData';
import { ScrollReveal } from './ScrollReveal';

export const TpaPartners: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header & Subtitle */}
        <ScrollReveal animation="fade-up" durationMs={500}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-2">
                Hassle-free Hospitalization
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Cashless TPA & Insurance Partners
              </h2>
              <p className="mt-1 text-slate-600 text-xs sm:text-sm">
                Empanelled with leading public & private health insurance networks, corporate TPAs, and Ayushman Bharat PM-JAY.
              </p>
            </div>

            {/* Dedicated TPA Desk Contact Pill */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3 self-start md:self-auto">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">24/7 TPA Helpdesk</div>
                <a href={`tel:${HOSPITAL_INFO.opdHelpline}`} className="text-sm font-extrabold text-emerald-800 hover:underline">
                  {HOSPITAL_INFO.opdHelpline}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Insurance Partners Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {TPA_PARTNERS.map((partner, idx) => (
            <ScrollReveal
              key={partner.id}
              animation="zoom-in"
              delayMs={(idx % 6) * 40}
              durationMs={400}
            >
              <div
                className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center min-h-[90px] group h-full"
              >
                <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {partner.logoText}
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <CheckCircle className="w-3 h-3" />
                  <span className="capitalize">{partner.badgeType}</span>
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5">{partner.category}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Informative Guidance Strip */}
        <div className="mt-6 bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Documents required for Cashless Admission:</strong> Patient Health Card, Aadhaar Card / Govt Photo ID, Policy copy & Doctor’s Admission Advice.
            </span>
          </div>
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
            className="inline-flex items-center gap-1.5 text-emerald-800 font-bold hover:underline shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Query Pre-Authorization</span>
          </a>
        </div>

      </div>
    </section>
  );
};
