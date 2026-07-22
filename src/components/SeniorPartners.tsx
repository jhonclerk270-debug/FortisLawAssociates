import React, { useState } from 'react';
import { 
  Award, 
  Mail, 
  Phone, 
  GraduationCap, 
  Gavel, 
  CheckCircle2, 
  X, 
  UserCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SENIOR_PARTNERS } from '../data/mockData';
import { SeniorPartner } from '../types';

interface SeniorPartnersProps {
  onOpenBookingWithPartner?: (partnerName: string) => void;
}

export const SeniorPartners: React.FC<SeniorPartnersProps> = ({ onOpenBookingWithPartner }) => {
  const [selectedPartner, setSelectedPartner] = useState<SeniorPartner | null>(null);

  return (
    <section id="partners" className="py-16 sm:py-24 bg-[#0B192C] text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] block">
            Chambers Leadership & Senior Counsel
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Senior Partners & Advocates
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed border-l-2 border-[#D4AF37] pl-4 max-w-2xl mx-auto text-left sm:text-center sm:border-l-0 sm:pl-0">
            Distinguished legal minds with decades of Supreme Court enrollment, landmark judicial rulings, foreign legal accreditations, and corporate board directorships.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SENIOR_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="group bg-[#060E1A] border border-slate-800 hover:border-[#D4AF37]/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Enrollment Badge */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060E1A] via-transparent to-transparent opacity-90" />

                  {/* Supreme Court Status Pill */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#0B192C]/90 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest border border-[#D4AF37]/50 rounded-full shadow-md backdrop-blur-sm">
                    {partner.experienceYears}+ Yrs Standing
                  </div>
                </div>

                {/* Partner Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] mt-1">
                      {partner.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{partner.supremeCourtStatus}</span>
                    </p>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {partner.practiceSpecialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-900 text-slate-300 text-[10px] uppercase font-bold tracking-wider rounded-lg border border-slate-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Short Bio Snippet */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                    {partner.bio}
                  </p>
                </div>
              </div>

              {/* Partner Actions Footer */}
              <div className="p-4 bg-[#0B192C] border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedPartner(partner)}
                  className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <span>Credentials</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`mailto:${partner.email}?subject=Legal Inquiry for ${partner.name}`}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-[#D4AF37] text-slate-300 hover:text-[#0B192C] transition-all shadow-sm"
                  title={`Email ${partner.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Senior Partner Full Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#112239] text-white rounded-2xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 bg-[#0B192C] relative border-b border-slate-800 flex items-start gap-4">
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={selectedPartner.imageUrl}
                alt={selectedPartner.name}
                className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/50 shadow-md shrink-0"
              />

              <div className="space-y-1 pr-8">
                <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                  {selectedPartner.supremeCourtStatus}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  {selectedPartner.name}
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold">
                  {selectedPartner.title} • {selectedPartner.experienceYears} Years Standing
                </p>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto text-sm text-slate-200">
              {/* Bio */}
              <div>
                <h4 className="font-heading text-sm font-bold text-[#D4AF37] mb-1">
                  Professional Profile & Background
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPartner.bio}
                </p>
              </div>

              {/* Education Credentials */}
              <div className="p-4 rounded-xl bg-[#0A1424] border border-slate-800 space-y-2">
                <h4 className="font-heading text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                  <span>Academic Qualifications & Inns of Court</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedPartner.education.map((edu, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Landmark Cases */}
              <div className="space-y-2">
                <h4 className="font-heading text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-wider">
                  <Gavel className="w-4 h-4 text-[#D4AF37]" />
                  <span>Landmark Precedents & Reported Cases</span>
                </h4>
                <div className="space-y-2">
                  {selectedPartner.landmarkCases.map((c, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
                      <span className="font-bold text-white">Case #{i + 1}: </span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Direct Line */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs">
                <a
                  href={`mailto:${selectedPartner.email}`}
                  className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span className="truncate">{selectedPartner.email}</span>
                </a>
                <a
                  href={`tel:${selectedPartner.phone}`}
                  className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{selectedPartner.phone}</span>
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#0A1424] border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 rounded-md bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const pName = selectedPartner.name;
                  setSelectedPartner(null);
                  if (onOpenBookingWithPartner) {
                    onOpenBookingWithPartner(pName);
                  }
                }}
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#0B192C] font-extrabold text-xs shadow-md"
              >
                Request Intake With {selectedPartner.name.split(' ')[1] || 'Partner'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
