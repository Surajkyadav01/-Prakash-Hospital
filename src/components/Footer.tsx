import React, { useState } from 'react';
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ExternalLink,
  Share2
} from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS, SOCIAL_MEDIA_CHANNELS } from '../data/hospitalData';
import { PageView } from '../types';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { getAssetUrl } from '../utils/assetPath';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
  onOpenAmbulance: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenLogin,
  onOpenAmbulance,
}) => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (view: PageView) => {
    onNavigate(view);
    scrollToTop();
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Social Media Ribbon / Connect Section */}
        <div className="pb-10 mb-10 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-950/80 border border-sky-800 text-sky-400 text-xs font-bold tracking-wide uppercase mb-1.5">
                <Share2 className="w-3.5 h-3.5" />
                <span>Stay Connected & Informed</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Connect With Us On Social Media
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Follow our official social profiles for daily health tips, doctor live sessions, free health camps, and instant WhatsApp queries.
              </p>
            </div>

            <div className="text-xs text-slate-400 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 shrink-0 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="text-emerald-400 font-bold">24x7 WhatsApp Help:</span>{' '}
                <span className="text-slate-300">Instant OPD & Emergency guidance</span>
              </div>
            </div>
          </div>

          {/* Social Channels Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {SOCIAL_MEDIA_CHANNELS.map((channel) => {
              const getSocialIcon = (id: string) => {
                switch (id) {
                  case 'whatsapp':
                    return <MessageCircle className="w-5 h-5" />;
                  case 'instagram':
                    return <Instagram className="w-5 h-5" />;
                  case 'facebook':
                    return <Facebook className="w-5 h-5" />;
                  case 'youtube':
                    return <Youtube className="w-5 h-5" />;
                  default:
                    return <Share2 className="w-5 h-5" />;
                }
              };

              return (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-all ${channel.iconBg}`}>
                    {getSocialIcon(channel.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-white group-hover:text-sky-400 transition-colors">
                        {channel.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-slate-600">
                        {channel.badge}
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                      {channel.handle}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-400 font-semibold group-hover:underline">
                      <span>{channel.id === 'whatsapp' ? 'Start Chat' : 'Open Channel'}</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Accreditations (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <img
                src={getAssetUrl('/assets/prakash-hospital-logo.webp')}
                alt="Prakash Hospital Logo"
                width={56}
                height={56}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover shadow-md shadow-slate-950/50 group-hover:scale-105 transition-transform shrink-0"
                onError={(e) => {
                  e.currentTarget.src = getAssetUrl('/assets/prakash-hospital-logo.png');
                }}
              />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
                  <span className="font-extrabold text-2xl text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    Prakash
                  </span>
                  <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 tracking-tight">
                    Hospital
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[9px] font-bold tracking-wider uppercase ml-1">
                    NABH
                  </span>
                </div>
                <span className="text-xs text-sky-300/90 font-medium mt-1">
                  Multi-Speciality Care • Suriyawan, Bhadohi
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              A trusted healthcare destination in Suriyawan, Bhadohi, Uttar Pradesh, established in 2020. Dedicated to clinical excellence, compassionate bedside nursing, and advanced surgical care.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>NABH & NABL Accredited Multi-Speciality Tertiary Care Hospital</span>
            </div>

            {/* Quick Social Media Circle Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Follow Official Channels
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={HOSPITAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                  title="WhatsApp: +91 83838 26205"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                  title="Instagram: @prakashhospital_suriyawan"
                >
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                  title="Facebook: Prakash Hospital"
                >
                  <Facebook className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                  title="YouTube: Prakash Hospital Health Care"
                >
                  <Youtube className="w-4 h-4 text-red-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button type="button" onClick={() => handleNav('home')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('about-us')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('services')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('super-speciality')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  Super Speciality
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('doctors')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  Doctors Directory
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('24-7-services')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  24 X 7 Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('blog')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  Health Blog
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contacts')} className="hover:text-sky-400 transition-colors text-left cursor-pointer">
                  Contacts
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    handleNav('home');
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }} 
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer text-sky-400/90 font-semibold"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Super Specialities (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Centres of Excellence
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <button 
                    type="button" 
                    onClick={() => handleNav('super-speciality')} 
                    className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: 24/7 Contacts & Emergency (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              24x7 Emergency Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 font-bold hover:bg-red-900/80 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <span>Trauma Desk: {HOSPITAL_INFO.emergencyNumber}</span>
              </a>

              <button
                type="button"
                onClick={onOpenAmbulance}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors text-left cursor-pointer"
              >
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Ambulance: {HOSPITAL_INFO.ambulanceNumber}</span>
              </button>

              <a
                href={`mailto:${HOSPITAL_INFO.email}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-300 hover:text-white hover:bg-sky-900/60 transition-colors"
                title="Send Email to Hospital Admin"
              >
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">Email: {HOSPITAL_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenLogin}
                className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Patient Portal Login →</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="text-slate-400 font-medium">
              © {new Date().getFullYear()} Prakash Hospital. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-500">NABH Accredited Hospital</span>
          </div>

          {/* Built by Suraj Tech Hub */}
          <a
            href="https://surajkyadav01.github.io/Suraj-Tech-Hub/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/50 text-xs shadow-xs transition-all duration-200 hover:scale-105 cursor-pointer select-none"
            title="Visit Suraj Tech Hub Website & Services"
          >
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Built by</span>
            <span className="font-bold text-sky-400 group-hover:text-sky-300 tracking-wide flex items-center gap-1">
              Suraj Tech Hub
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-xs text-slate-400 hover:text-sky-400 hover:underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-800"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>

      {/* Hospital Privacy Policy & Patient Data Protection Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </footer>
  );
};
