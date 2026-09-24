import React from 'react';
import { Award, ShieldCheck, Heart, Users, Bed, Activity, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { getAssetUrl } from '../utils/assetPath';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Years of Clinical Trust', value: '10+', icon: Award },
    { label: 'Specialist Consultants', value: '15+', icon: Users },
    { label: 'Hospital Beds', value: '40', icon: Bed },
    { label: 'Surgeries Performed', value: '4,500+', icon: Activity },
  ];

  return (
    <section id="about-us" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image with Stats overlay */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-right" durationMs={550}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[16/9] sm:aspect-[16/10] bg-slate-900 group">
                  <picture>
                    <source srcSet={getAssetUrl('/assets/prakash-hospital-real.webp')} type="image/webp" />
                    <img
                      src={getAssetUrl('/assets/prakash-hospital-real.jpg')}
                      alt="Prakash Hospital 7-Story Building Suriyawan Bhadohi"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://www.image2url.com/r2/default/images/1790235449576-906af834-b306-4f3d-bea1-394c4f26dc1d.jpeg";
                      }}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Quality Benchmark</span>
                    </div>
                    <h4 className="font-extrabold text-base sm:text-lg">
                      NABH & NABL Accredited Healthcare
                    </h4>
                    <p className="text-xs text-slate-200 mt-1">
                      Pioneering modern healthcare services in Suriyawan, Bhadohi since 2020.
                    </p>
                  </div>
                </div>

                {/* Experience Floater Badge */}
                <div className="absolute -top-4 -right-4 bg-sky-600 text-white rounded-2xl p-4 shadow-lg border-2 border-white flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black leading-none">10+</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider mt-1 text-sky-100">Years Trust</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Mission, Vision, and Credentials */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-left" durationMs={550}>
              <div className="space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase">
                  About Prakash Hospital
                </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pioneering Ethical & Modern Healthcare in Bhadohi, Suriyawan
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded with the vision to deliver advanced medical treatment accessible to all, Prakash Hospital stands as a premier multi-speciality healthcare institution located at Prakash Hospital Bypass Road, Suriyawan, Uttar Pradesh 221404.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Equipped with a digital cardiac catheterization lab, modular operation theatres with HEPA filtration, Level-III NICU, robotic joint arthroplasty, and an in-house 24x7 emergency trauma centre, our compassionate medical fraternity prioritizes patient well-being at every step.
            </p>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block font-bold">Patient-Centric Ethos:</strong>
                  Transparent billing and compassionate bedside nursing care.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block font-bold">Cutting-Edge Tech:</strong>
                  Minimal invasive laparoscopy and digital imaging suites.
                </div>
              </div>
            </div>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {stats.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-sky-700">{item.value}</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Hospital Leadership & Manager Quick Support Strip */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={getAssetUrl('/assets/doctors/dr-op-yadav.jpg')}
                    alt="Dr. O.P. Yadav"
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-xl object-cover object-[center_25%] border-2 border-sky-200 shadow-2xs shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = getAssetUrl('/assets/doctors/dr-op-yadav.png');
                    }}
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 block">Hospital Owner &amp; Chief Surgeon</span>
                    <h5 className="font-extrabold text-sm text-slate-900">Dr. O.P. Yadav <span className="text-xs font-normal text-slate-500">(M.S. General Surgery)</span></h5>
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                <div className="flex items-center gap-3">
                  <img
                    src={getAssetUrl('/assets/team/kamlesh-yadav-manager.jpg')}
                    alt="Kamlesh Yadav"
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-xl object-cover object-[center_20%] border-2 border-amber-200 shadow-2xs shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = getAssetUrl('/assets/team/kamlesh-yadav-manager.jpeg');
                    }}
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">Hospital Manager &amp; Help Desk</span>
                    <h5 className="font-extrabold text-sm text-slate-900">Kamlesh Yadav</h5>
                    <p className="text-[11px] text-slate-600">For any help or assistance: <a href="tel:+918383826205" className="font-bold text-sky-600 hover:underline">+91 83838 26205</a></p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
