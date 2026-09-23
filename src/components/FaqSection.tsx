import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  PhoneCall, 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  Activity, 
  Building2, 
  FileText,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'booking' | 'emergency' | 'insurance' | 'facilities';
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'booking',
    question: 'How do I book an OPD appointment at Prakash Hospital?',
    answer: 'Click the "Book Appointment" button on the website to select your department and doctor to get an instant digital appointment slip. You can also call or WhatsApp our help desk directly at +91 83838 26205.',
    icon: Calendar
  },
  {
    id: 'faq-2',
    category: 'emergency',
    question: 'Are 24x7 Emergency, ICU, and Ambulance services available?',
    answer: 'Yes, our emergency trauma center, critical care ICU beds, and oxygen-equipped ambulances operate 24 hours a day, 365 days a year. For immediate ambulance dispatch, call our hotline at +91 83838 26205.',
    icon: Activity
  },
  {
    id: 'faq-3',
    category: 'insurance',
    question: 'Do you accept Ayushman Bharat (PM-JAY) and Cashless Health Insurance?',
    answer: 'Yes, we accept Ayushman Bharat Golden Cards along with leading health insurance TPAs (Star Health, Care Health, HDFC ERGO, ICICI Lombard, etc.) with complete pre-authorization desk assistance.',
    icon: ShieldCheck
  },
  {
    id: 'faq-4',
    category: 'facilities',
    question: 'Who is the Chief Surgeon and what surgical treatments are offered?',
    answer: 'Our hospital owner and chief surgeon is Dr. O.P. Yadav (M.S. General Surgery). We offer general, laparoscopic, gallbladder stone, hernia, appendix, and trauma surgeries in modern modular operation theatres.',
    icon: Building2
  },
  {
    id: 'faq-5',
    category: 'facilities',
    question: 'Are pathology lab tests, digital X-ray, and medicines available in-house?',
    answer: 'Yes, our campus houses a 24x7 in-house pharmacy, fully automated pathology diagnostic laboratory, and digital X-ray/ultrasound facilities for immediate reports.',
    icon: FileText
  },
  {
    id: 'faq-6',
    category: 'booking',
    question: 'Where is the hospital located and how do I contact management?',
    answer: 'Prakash Hospital is located on Main Station Road, Suriyawan, Bhadohi (UP - 221404). For admissions or patient support, contact Hospital Manager Kamlesh Yadav directly at +91 83838 26205.',
    icon: Clock
  }
];

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'booking', label: 'OPD & Booking' },
    { id: 'emergency', label: '24x7 Emergency' },
    { id: 'insurance', label: 'Ayushman & TPA' },
    { id: 'facilities', label: 'Facilities & Labs' },
  ];

  const filteredFaqs = activeTab === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === activeTab);

  const toggleItem = (id: string) => {
    setOpenId(prev => prev === id ? '' : id);
  };

  return (
    <section id="faq-section" className="py-7 sm:py-9 bg-slate-50/80 border-t border-slate-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Sleek Compact Header */}
        <div className="text-center max-w-xl mx-auto mb-5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <HelpCircle className="w-3 h-3 text-sky-600" />
            <span>Support & FAQs</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Quick answers about appointments, emergency trauma care, insurance, and medical facilities.
          </p>

          {/* Compact Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1 mt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-sky-600 text-white shadow-2xs font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Low-Profile Accordion List */}
        <div className="space-y-1.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-150 bg-white overflow-hidden ${
                  isOpen 
                    ? 'border-sky-300 shadow-2xs ring-1 ring-sky-100' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-sky-600 bg-sky-50' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-4 pb-3 pt-1 border-t border-slate-100 animate-in fade-in-50 duration-100">
                    <p className="text-xs text-slate-600 leading-relaxed pl-8.5">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Compact Quick Assistance Strip */}
        <div className="mt-4 rounded-xl bg-gradient-to-r from-slate-900 to-sky-950 p-2.5 sm:p-3 text-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0 text-sky-300">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">
                Have more questions or need direct assistance?
              </span>
              <span className="text-[11px] text-sky-200/80">
                Contact Hospital Manager Kamlesh Yadav (+91 83838 26205)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+918383826205"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call</span>
            </a>
            <a
              href="https://wa.me/918383826205?text=Hello%20Prakash%20Hospital,%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-[11px] transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3 h-3 text-sky-300" />
              <span>Book OPD</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
