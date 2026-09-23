import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  User, 
  HeartPulse, 
  ChevronRight, 
  Phone, 
  Ambulance,
  Home,
  Building2,
  Stethoscope,
  Sparkles,
  UserCheck,
  Clock,
  BookOpen,
  MapPin,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Mail
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { PageView } from '../types';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenLogin: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenLogin,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scrolling when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Strict Menu items required by prompt:
  // Home, About Us, Services, Super Speciality, Doctors, 24 X 7 Services, Blog, Contacts
  const navItems: { label: string; id: PageView; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Home', id: 'home', icon: Home },
    { label: 'About Us', id: 'about-us', icon: Building2 },
    { label: 'Services', id: 'services', icon: Stethoscope },
    { label: 'Super Speciality', id: 'super-speciality', icon: Sparkles },
    { label: 'Doctors', id: 'doctors', icon: UserCheck },
    { label: '24 X 7 Services', id: '24-7-services', icon: Clock },
    { label: 'Blog', id: 'blog', icon: BookOpen },
    { label: 'Contacts', id: 'contacts', icon: MapPin },
  ];

  const handleNavClick = (viewId: PageView) => {
    setMobileMenuOpen(false);
    onNavigate(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-[37px] z-40 bg-gradient-to-r from-slate-900 via-[#0d223d] to-slate-900 border-b border-sky-900/40 text-white transition-all duration-200 ${isScrolled ? 'shadow-xl shadow-slate-950/40 bg-slate-900/98 backdrop-blur-md' : 'shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Identity */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none text-left cursor-pointer"
            id="brand-logo-btn"
          >
            <img
              src="/assets/prakash-hospital-logo.webp"
              alt="Prakash Hospital Logo"
              width={56}
              height={56}
              loading="eager"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md shadow-slate-950/40 group-hover:scale-105 transition-all shrink-0"
              onError={(e) => {
                e.currentTarget.src = "/assets/prakash-hospital-logo.png";
              }}
            />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
                <span className="font-extrabold text-xl sm:text-[22px] text-white tracking-tight group-hover:text-sky-200 transition-colors">
                  Prakash
                </span>
                <span className="font-extrabold text-xl sm:text-[22px] text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 tracking-tight">
                  Hospital
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[9px] font-bold tracking-wider uppercase ml-0.5">
                  NABH
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300/90 tracking-wide">
                  Multi-Speciality Hospital
                </span>
                <span className="text-sky-400/50 text-[9px] hidden xs:inline">•</span>
                <span className="text-[10px] sm:text-[11px] font-medium text-sky-300 hidden xs:inline tracking-wide">
                  Suriyawan, Bhadohi
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links (Strict items) */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-semibold">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-${item.id}`}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-sky-600 to-blue-600 shadow-md shadow-sky-600/30 font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Patient Login & Appointment CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenLogin}
              id="patient-login-cta-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-sky-600/25 hover:shadow-sky-500/40 active:scale-95 border border-sky-400/30 cursor-pointer"
            >
              <User className="w-4 h-4 text-white" />
              <span>Patient Login</span>
            </button>
          </div>

          {/* Mobile Hamburger & Actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={onOpenLogin}
              className="sm:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
              title="Patient Login"
              aria-label="Patient Login"
            >
              <User className="w-5 h-5 text-sky-300" />
            </button>

            <button
              type="button"
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Full-Screen Mobile Navigation Overlay mounted to document.body via portal */}
      {typeof document !== 'undefined' && mobileMenuOpen && createPortal(
        <div 
          id="mobile-fullscreen-menu"
          className="fixed inset-0 z-[99999] bg-slate-950 text-white flex flex-col w-screen h-[100dvh] overflow-hidden animate-in fade-in duration-150"
        >
          {/* 1. Header Bar with Back Button, Hospital Logo, and Close Button */}
          <div className="shrink-0 px-3.5 sm:px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-md">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-400/40 text-xs font-bold active:scale-95 transition-all cursor-pointer"
              title="Go back to website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Hospital Brand in Center */}
            <div className="flex items-center gap-2">
              <img
                src="/assets/prakash-hospital-logo.webp"
                alt="Prakash Hospital Logo"
                width={44}
                height={44}
                loading="eager"
                className="w-10 h-10 rounded-full object-cover shadow-xs shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "/assets/prakash-hospital-logo.png";
                }}
              />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-base text-white tracking-tight">
                    Prakash
                  </span>
                  <span className="font-extrabold text-base text-sky-400 tracking-tight">
                    Hospital
                  </span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[8px] font-bold rounded-full">
                    NABH
                  </span>
                </div>
                <span className="text-[10px] text-slate-300/80 mt-1">
                  Multi-Speciality • Suriyawan, Bhadohi
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 active:scale-95 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Top 24x7 Emergency Alert Quick Banner */}
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`}
            className="shrink-0 bg-red-950/90 hover:bg-red-900/90 border-b border-red-800/80 px-4 py-2 flex items-center justify-between text-xs transition-colors"
          >
            <div className="flex items-center gap-2 text-red-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>24x7 Emergency Trauma Desk</span>
            </div>
            <span className="font-extrabold text-red-300 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-red-400" />
              {HOSPITAL_INFO.emergencyNumber}
            </span>
          </a>

          {/* 3. Main Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5">
            
            {/* Navigation Links Group */}
            <div>
              <div className="pb-2 mb-2 border-b border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Hospital Navigation Directory
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {navItems.map((item) => {
                  const isActive = currentView === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-sky-600 to-blue-600 font-bold shadow-md shadow-sky-600/30'
                          : 'text-slate-200 hover:bg-slate-800/80 hover:text-white border border-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-sky-400'}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick CTAs Group */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Direct Patient Actions
              </span>

              {/* Patient Login */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                id="mobile-fullscreen-patient-login-btn"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all active:scale-98 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Patient Login / View Lab Reports</span>
              </button>

              {/* Book OPD Appointment */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                id="mobile-fullscreen-book-opd-btn"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-sky-500/60 bg-sky-950/40 text-sky-300 hover:bg-sky-900/60 font-bold text-sm cursor-pointer transition-colors active:scale-98"
              >
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Book OPD Doctor Consultation</span>
              </button>

              {/* 24x7 Ambulance Dispatch */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('ambulance');
                }}
                id="mobile-fullscreen-ambulance-btn"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/30 transition-colors cursor-pointer active:scale-98"
              >
                <Ambulance className="w-4 h-4 animate-pulse" />
                <span>24x7 Ambulance Dispatch (GPS Portal)</span>
              </button>

              {/* Email Administration Contact */}
              <a
                href={`mailto:${HOSPITAL_INFO.email}`}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-xs border border-slate-700/80 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email Admin: {HOSPITAL_INFO.email}</span>
              </a>

              {/* Back to Website Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 active:scale-98 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-sky-400" />
                <span>← Back to Website</span>
              </button>
            </div>

            {/* Hospital Accreditation & Location Footer */}
            <div className="pt-3 pb-6 border-t border-slate-800 text-center space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NABH & NABL Accredited Hospital • Cashless TPA</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {HOSPITAL_INFO.address}
              </p>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
