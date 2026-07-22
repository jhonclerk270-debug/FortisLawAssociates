import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Navigation, 
  Building2,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/mockData';

interface OfficesSectionProps {
  onSelectOfficeForBooking?: (locationId: string) => void;
}

export const OfficesSection: React.FC<OfficesSectionProps> = ({ onSelectOfficeForBooking }) => {
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('isl-office');

  const selectedOffice = OFFICE_LOCATIONS.find(o => o.id === selectedOfficeId) || OFFICE_LOCATIONS[0];

  return (
    <section id="offices" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] block">
            National Chamber Presence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] tracking-tight">
            Multi-City Office Chambers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-2 border-[#D4AF37] pl-4 max-w-2xl mx-auto text-left sm:text-center sm:border-l-0 sm:pl-0">
            Physical legal chambers in primary judicial capitals for rapid High Court filings and client consultations.
          </p>
        </div>

        {/* City Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {OFFICE_LOCATIONS.map((office) => (
            <button
              key={office.id}
              onClick={() => setSelectedOfficeId(office.id)}
              className={`px-5 py-3 font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 border ${
                selectedOfficeId === office.id
                  ? 'bg-[#0B192C] text-[#D4AF37] border-b-2 border-[#D4AF37] shadow-lg'
                  : 'bg-white text-slate-500 hover:text-[#0B192C] border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{office.city}</span>
            </button>
          ))}
        </div>

        {/* Office Details Card & Embedded Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Office Address & Info Left Column */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0B192C] text-white p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  Chamber Details
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mt-2">
                  {selectedOffice.city}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedOffice.officeName}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Physical Address</span>
                  <p className="text-slate-300 leading-relaxed">{selectedOffice.address}</p>
                </div>
              </div>

              {/* Managing Partner */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <User className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Managing Partner in Charge</span>
                  <p className="text-[#D4AF37] font-semibold">{selectedOffice.managingPartner}</p>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Chambers Phone</span>
                  <a href={`tel:${selectedOffice.phone}`} className="hover:underline text-slate-300">
                    {selectedOffice.phone}
                  </a>
                </div>
              </div>

              {/* Emergency Hotline */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-400 block mb-0.5">24/7 Injunction Emergency Line</span>
                  <a href={`tel:${selectedOffice.emergencyHotline}`} className="hover:underline text-white font-bold">
                    {selectedOffice.emergencyHotline}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Chambers Direct Email</span>
                  <a href={`mailto:${selectedOffice.email}`} className="hover:underline text-slate-300">
                    {selectedOffice.email}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Consultation Hours</span>
                  <p className="text-slate-300">{selectedOffice.operatingHours}</p>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onSelectOfficeForBooking && onSelectOfficeForBooking(selectedOffice.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#0B192C] font-extrabold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Schedule In-Person Consultation ({selectedOffice.city.split(' ')[0]})</span>
              </button>
            </div>

          </div>

          {/* Embedded Google Map Container Right Column */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 min-h-[380px] flex flex-col">
            <div className="p-3 bg-slate-900 text-white text-xs font-bold flex items-center justify-between border-b border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Interactive Location Map — {selectedOffice.officeName}</span>
              </span>
              <span className="text-[10px] text-[#D4AF37] font-semibold bg-slate-800 px-2 py-0.5 rounded">
                Verified Geo-Coordinates
              </span>
            </div>

            <div className="flex-1 w-full h-full min-h-[350px] relative">
              <iframe
                title={`Map for ${selectedOffice.city}`}
                src={selectedOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[350px]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
