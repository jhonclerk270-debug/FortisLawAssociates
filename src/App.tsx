import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PracticeAreas } from './components/PracticeAreas';
import { SeniorPartners } from './components/SeniorPartners';
import { ClientWall } from './components/ClientWall';
import { PublicationsSection } from './components/PublicationsSection';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { JsonLdSchema } from './components/JsonLdSchema';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPracticeAreaId, setBookingPracticeAreaId] = useState('corp-law');
  const [bookingLocationId, setBookingLocationId] = useState('fareed-chambers');
  const [bookingPartnerName, setBookingPartnerName] = useState<string | undefined>(undefined);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleOpenBooking = (practiceAreaId?: string, locationId?: string) => {
    if (practiceAreaId) setBookingPracticeAreaId(practiceAreaId);
    if (locationId) setBookingLocationId(locationId);
    setBookingPartnerName(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithPartner = (partnerName: string) => {
    setBookingPartnerName(partnerName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      {/* JSON-LD LegalService Schema for SEO */}
      <JsonLdSchema />

      {/* Main Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Practice Areas Grid */}
        <PracticeAreas
          onSelectPracticeAreaForBooking={(areaId) => handleOpenBooking(areaId)}
        />

        {/* 3. Senior Partners Grid */}
        <SeniorPartners
          onOpenBookingWithPartner={handleOpenBookingWithPartner}
        />

        {/* 4. Corporate Client Logos & Google Reviews Wall */}
        <ClientWall />

        {/* 5. Legal Publications & Supreme Court Commentaries */}
        <PublicationsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Appointment & Consultation Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPracticeAreaId={bookingPracticeAreaId}
        initialLocationId={bookingLocationId}
        initialPartnerName={bookingPartnerName}
      />

      {/* Admin Portal Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />
    </div>
  );
}
