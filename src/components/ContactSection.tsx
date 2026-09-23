import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { ADMIN_EMAIL, createEnquiryMailtoUrl, recordNotification } from '../utils/notificationService';
import { CustomSelect } from './CustomSelect';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General OPD Enquiry',
    message: '',
  });
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
    mailtoUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = createEnquiryMailtoUrl({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    recordNotification('enquiry', {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    setSubmittedData({
      ...formData,
      mailtoUrl,
    });

    // Also trigger mailto so user's email client can immediately send if allowed
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback handled by direct button on UI
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({ name: '', phone: '', email: '', subject: 'General OPD Enquiry', message: '' });
  };

  return (
    <section id="contacts" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase mb-3">
            Reach Out To Us
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact & Hospital Location
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Conveniently located opposite Old Indian Oil Petrol Pump in Suriyawan, Bhadohi with dedicated parking, wheelchair access, and 24x7 emergency reception.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Map Embed */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Emergency Hotline */}
              <div className="bg-white p-5 rounded-2xl border border-red-200/80 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider">24x7 Emergency Line</div>
                  <a href={`tel:${HOSPITAL_INFO.emergencyPhoneRaw}`} className="text-base font-extrabold text-slate-900 hover:text-red-600 block mt-0.5">
                    {HOSPITAL_INFO.emergencyNumber}
                  </a>
                  <div className="text-[11px] text-slate-500 mt-1">Immediate trauma response</div>
                </div>
              </div>

              {/* OPD Helpline */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">OPD Helpdesk</div>
                  <a href={`tel:${HOSPITAL_INFO.opdHelpline}`} className="text-base font-extrabold text-slate-900 hover:text-sky-600 block mt-0.5">
                    {HOSPITAL_INFO.opdHelpline}
                  </a>
                  <div className="text-[11px] text-slate-500 mt-1">{HOSPITAL_INFO.opdHours}</div>
                </div>
              </div>

              {/* Location Address */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5 sm:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hospital Campus</div>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {HOSPITAL_INFO.address}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <a
                      href={HOSPITAL_INFO.googleMapsDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Get GPS Directions</span>
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={`mailto:${HOSPITAL_INFO.email}`}
                      className="text-xs font-bold text-slate-600 hover:text-sky-600 inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{HOSPITAL_INFO.email}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Map Preview Box */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs p-3">
              <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 relative">
                <iframe
                  title="Prakash Hospital Location Map"
                  src={HOSPITAL_INFO.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Patient Query Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
              
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-xl">
                  Send an Enquiry or Feedback
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Our patient relations desk will revert back promptly. All submissions are automatically routed to our administration.
              </p>

              {/* Email Route Notice */}
              <div className="mb-5 flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 border border-sky-200/80 text-xs text-sky-900">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  Official Desk Email: <strong className="font-bold text-sky-700">{ADMIN_EMAIL}</strong>
                </span>
              </div>

              {submittedData ? (
                <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center animate-in fade-in space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-950 text-lg">Enquiry Recorded & Dispatched</h4>
                    <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                      Your enquiry notification has been routed to Prakash Hospital Administration at <strong>{ADMIN_EMAIL}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-white rounded-xl p-3.5 border border-emerald-100 text-left text-xs space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Name:</span>
                      <strong className="text-slate-900">{submittedData.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone:</span>
                      <strong className="text-slate-900">{submittedData.phone}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subject:</span>
                      <strong className="text-sky-700">{submittedData.subject}</strong>
                    </div>
                    <div className="pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                      <strong>Admin Recipient:</strong> {ADMIN_EMAIL}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <a
                      href={submittedData.mailtoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email to {ADMIN_EMAIL}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 83838 26205"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Enquiry Subject
                      </label>
                      <CustomSelect
                        value={formData.subject}
                        onChange={(val) => setFormData({ ...formData, subject: val })}
                        options={[
                          { value: 'General OPD Enquiry', label: 'General OPD Enquiry' },
                          { value: 'Doctor Appointment Query', label: 'Doctor Appointment Query' },
                          { value: 'TPA Cashless Pre-Auth', label: 'TPA Cashless Pre-Auth' },
                          { value: 'Lab & MRI Report Status', label: 'Lab & MRI Report Status' },
                          { value: 'Feedback / Suggestion', label: 'Feedback / Suggestion' },
                        ]}
                        placeholder="Choose enquiry subject..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Medical Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please specify your query or symptoms..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-enquiry-btn"
                    className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry to {ADMIN_EMAIL}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
