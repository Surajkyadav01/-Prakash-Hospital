import React, { useState, useEffect } from 'react';
import { EmergencyTopBar } from './components/EmergencyTopBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DepartmentGrid } from './components/DepartmentGrid';
import { DoctorDirectory } from './components/DoctorDirectory';
import { FacilityGallery } from './components/FacilityGallery';
import { TpaPartners } from './components/TpaPartners';
import { Services24x7Section } from './components/Services24x7Section';
import { AboutSection } from './components/AboutSection';
import { AboutUsPage } from './components/AboutUsPage';
import { HospitalServicesPage } from './components/HospitalServicesPage';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { BookingPage } from './components/BookingPage';
import { PatientLoginPage } from './components/PatientLoginPage';
import { AmbulanceDispatchPage } from './components/AmbulanceDispatchPage';
import { Footer } from './components/Footer';
import { AmbulanceModal } from './components/AmbulanceModal';
import { DirectionsModal } from './components/DirectionsModal';
import { Doctor, PageView } from './types';

export default function App() {
  // Global View Routing state
  const [currentView, setCurrentView] = useState<PageView>('home');

  // Parameters passed to booking view
  const [bookingDeptId, setBookingDeptId] = useState<string>('cardiology');
  const [bookingDoctorId, setBookingDoctorId] = useState<string>('dr-rajesh-sharma');
  const [bookingDate, setBookingDate] = useState<string>('');

  // Doctor directory filter state
  const [doctorDirectoryFilter, setDoctorDirectoryFilter] = useState<string>('all');

  // Emergency Ambulance modal state
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState<boolean>(false);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState<boolean>(false);

  // Instant snappy navigation handler
  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Quick Book Check from Hero Widget
  const handleQuickBookCheck = (deptId: string, doctorId: string, date: string) => {
    setBookingDeptId(deptId);
    setBookingDoctorId(doctorId);
    setBookingDate(date);
    handleNavigate('book-appointment');
  };

  // Select department from Key Departments grid to filter doctor directory
  const handleSelectDepartmentForDoctors = (deptId: string) => {
    setDoctorDirectoryFilter(deptId);
    handleNavigate('doctors');
  };

  // Open booking for specific department
  const handleOpenBookingForDept = (deptId: string) => {
    setBookingDeptId(deptId);
    handleNavigate('book-appointment');
  };

  // Book specific doctor from Doctor directory card
  const handleBookDoctor = (doctor: Doctor) => {
    setBookingDeptId(doctor.departmentId);
    setBookingDoctorId(doctor.id);
    handleNavigate('book-appointment');
  };

  // Render Full-Screen Dedicated Patient Login Portal
  if (currentView === 'login') {
    return (
      <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-900">
        <PatientLoginPage
          onBackToHome={() => handleNavigate('home')}
          onOpenBooking={() => handleNavigate('book-appointment')}
        />
      </div>
    );
  }

  // Render Full-Screen Dedicated Appointment Booking Page
  if (currentView === 'book-appointment') {
    return (
      <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-900">
        <BookingPage
          initialDeptId={bookingDeptId}
          initialDoctorId={bookingDoctorId}
          initialDate={bookingDate}
          onBackToHome={() => handleNavigate('home')}
          onNavigateToView={handleNavigate}
        />
      </div>
    );
  }

  // Render Full-Screen Dedicated 24x7 Ambulance Dispatch Portal
  if (currentView === 'ambulance') {
    return (
      <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-800 antialiased selection:bg-red-100 selection:text-red-900">
        <AmbulanceDispatchPage
          onBackToHome={() => handleNavigate('home')}
          onOpenBooking={() => handleNavigate('book-appointment')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-900">
      
      {/* 1. Sticky Top Emergency Header */}
      <EmergencyTopBar
        onOpenBooking={() => handleNavigate('book-appointment')}
        onOpenAmbulance={() => handleNavigate('ambulance')}
      />

      {/* 2. Navigation Header (Desktop Navbar & Mobile Hamburger Menu) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenLogin={() => handleNavigate('login')}
        onOpenBooking={() => handleNavigate('book-appointment')}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        
        {/* VIEW: Home */}
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-200">
            {/* Hero Section with Quick Booking Widget */}
            <HeroSection
              onQuickBookCheck={handleQuickBookCheck}
              onOpenBooking={() => handleNavigate('book-appointment')}
            />

            {/* Key Departments & Super Speciality Preview Grid */}
            <DepartmentGrid
              onSelectDepartmentForDoctors={handleSelectDepartmentForDoctors}
              onOpenBookingForDept={handleOpenBookingForDept}
            />

            {/* Doctors Directory Preview */}
            <DoctorDirectory
              selectedDepartmentFilter={doctorDirectoryFilter}
              onFilterChange={(deptId) => setDoctorDirectoryFilter(deptId)}
              onBookDoctor={handleBookDoctor}
            />

            {/* Hospital Photo Gallery Section */}
            <FacilityGallery />

            {/* Cashless TPA / Insurance Row */}
            <TpaPartners />

            {/* 24 X 7 Services Section */}
            <Services24x7Section
              onOpenAmbulance={() => handleNavigate('ambulance')}
              onOpenBooking={() => handleNavigate('book-appointment')}
            />

            {/* About Us Summary */}
            <AboutSection />

            {/* Health Blog Section */}
            <BlogSection 
              onOpenBooking={() => handleNavigate('book-appointment')}
            />

            {/* Compact FAQ Section */}
            <FaqSection 
              onOpenBooking={() => handleNavigate('book-appointment')}
            />

            {/* Contacts & Map Section */}
            <ContactSection />
          </div>
        )}

        {/* VIEW: About Us (Dedicated Full-Page) */}
        {currentView === 'about-us' && (
          <AboutUsPage
            onNavigateToBooking={() => handleNavigate('book-appointment')}
            onNavigateToDoctors={() => handleNavigate('doctors')}
          />
        )}

        {/* VIEW: Services (Dedicated Full-Page) */}
        {currentView === 'services' && (
          <HospitalServicesPage
            onNavigateToBooking={(deptId, docId) => {
              if (deptId) setBookingDeptId(deptId);
              if (docId) setBookingDoctorId(docId);
              handleNavigate('book-appointment');
            }}
            onNavigateToEmergency={() => handleNavigate('24-7-services')}
            onOpenAmbulance={() => handleNavigate('ambulance')}
          />
        )}

        {/* VIEW: Super Speciality (Dedicated Full-Page) */}
        {currentView === 'super-speciality' && (
          <div className="animate-in fade-in duration-200">
            <DepartmentGrid
              onSelectDepartmentForDoctors={handleSelectDepartmentForDoctors}
              onOpenBookingForDept={handleOpenBookingForDept}
              isStandalonePage={true}
            />
          </div>
        )}

        {/* VIEW: Doctors Directory (Dedicated Full-Page) */}
        {currentView === 'doctors' && (
          <div className="animate-in fade-in duration-200 min-h-screen bg-slate-50">
            <DoctorDirectory
              selectedDepartmentFilter={doctorDirectoryFilter}
              onFilterChange={(deptId) => setDoctorDirectoryFilter(deptId)}
              onBookDoctor={handleBookDoctor}
            />
          </div>
        )}

        {/* VIEW: 24 X 7 Services (Dedicated Full-Page) */}
        {currentView === '24-7-services' && (
          <div className="animate-in fade-in duration-200 min-h-screen bg-slate-900">
            <Services24x7Section
              onOpenAmbulance={() => handleNavigate('ambulance')}
              onOpenBooking={() => handleNavigate('book-appointment')}
            />
          </div>
        )}

        {/* VIEW: Blog (Dedicated Full-Page) */}
        {currentView === 'blog' && (
          <BlogSection
            isStandalonePage={true}
            onOpenBooking={() => handleNavigate('book-appointment')}
          />
        )}

        {/* VIEW: Contacts (Dedicated Full-Page) */}
        {currentView === 'contacts' && (
          <div className="animate-in fade-in duration-200 min-h-screen bg-slate-50">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleNavigate('book-appointment')}
        onOpenLogin={() => handleNavigate('login')}
        onOpenAmbulance={() => handleNavigate('ambulance')}
      />

      {/* Emergency Ambulance Dispatch Modal */}
      <AmbulanceModal
        isOpen={isAmbulanceModalOpen}
        onClose={() => setIsAmbulanceModalOpen(false)}
      />

      {/* Directions Quick Modal (if needed) */}
      <DirectionsModal
        isOpen={isDirectionsModalOpen}
        onClose={() => setIsDirectionsModalOpen(false)}
      />

    </div>
  );
}
