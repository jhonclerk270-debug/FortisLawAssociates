import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Globe2, 
  Landmark, 
  Receipt, 
  Gavel, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  ShieldAlert, 
  X,
  UserCheck,
  Check
} from 'lucide-react';
import { PRACTICE_AREAS } from '../data/mockData';
import { PracticeArea } from '../types';

interface PracticeAreasProps {
  onSelectPracticeAreaForBooking: (practiceAreaId: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({ onSelectPracticeAreaForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedAreaModal, setSelectedAreaModal] = useState<PracticeArea | null>(null);

  const categories = ['ALL', 'Corporate', 'Constitutional', 'IP', 'Banking', 'Tax', 'Dispute'];

  const filteredAreas = activeCategory === 'ALL' 
    ? PRACTICE_AREAS 
    : PRACTICE_AREAS.filter(area => area.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Corporate': return <Building2 className="w-5 h-5 text-[#D4AF37]" />;
      case 'Constitutional': return <Scale className="w-5 h-5 text-[#D4AF37]" />;
      case 'IP': return <Globe2 className="w-5 h-5 text-[#D4AF37]" />;
      case 'Banking': return <Landmark className="w-5 h-5 text-[#D4AF37]" />;
      case 'Tax': return <Receipt className="w-5 h-5 text-[#D4AF37]" />;
      case 'Dispute': return <Gavel className="w-5 h-5 text-[#D4AF37]" />;
      default: return <Scale className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="practice-areas" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] block">
            Specialized Legal Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] tracking-tight">
            Comprehensive Practice Areas & Advisory
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-2 border-[#D4AF37] pl-4 max-w-2xl mx-auto text-left sm:text-center sm:border-l-0 sm:pl-0">
            Delivering authoritative legal advocacy across key financial, regulatory, constitutional, and technological domains before High Courts and statutory tribunals.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-[#0B192C] text-[#D4AF37] border border-[#D4AF37]/50 shadow-md scale-105'
                  : 'bg-white text-slate-600 hover:text-[#0B192C] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Disciplines' : cat}
            </button>
          ))}
        </div>

        {/* Practice Area Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="group relative bg-white border border-slate-200 hover:border-[#D4AF37]/80 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 bg-[#0B192C] rounded-xl flex items-center justify-center text-[#D4AF37] shrink-0 shadow-md">
                    {getCategoryIcon(area.category)}
                  </div>
                  <span className="px-3 py-1 bg-[#0B192C] text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest rounded-full border border-[#D4AF37]/30">
                    {area.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0B192C] group-hover:text-[#B89628] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {area.shortDesc}
                  </p>
                </div>

                {/* Key Services Preview Bullets */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  {area.keyServices.slice(0, 3).map((service, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                      <span className="truncate font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedAreaModal(area)}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#0B192C] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>Statutes & Scope</span>
                </button>

                <button
                  onClick={() => onSelectPracticeAreaForBooking(area.id)}
                  className="px-4 py-2 rounded-xl bg-[#0B192C] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B192C] text-[10px] font-extrabold uppercase tracking-widest transition-all shadow-md active:scale-95"
                >
                  Consult
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Practice Area Detail Modal */}
      {selectedAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#0B192C] text-white p-6 relative border-b border-[#D4AF37]/30">
              <button
                onClick={() => setSelectedAreaModal(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                  {getCategoryIcon(selectedAreaModal.category)}
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  {selectedAreaModal.category} Practice
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">
                {selectedAreaModal.title}
              </h3>
              <p className="text-slate-300 text-xs mt-1">
                Lead Counsel: <span className="text-[#D4AF37] font-semibold">{selectedAreaModal.leadPartner}</span>
              </p>
            </div>

            {/* Modal Body Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto text-sm text-slate-700">
              <div>
                <h4 className="font-heading text-base font-bold text-[#0B192C] mb-2">
                  Practice Area Overview
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {selectedAreaModal.fullDesc}
                </p>
              </div>

              {/* Key Services List */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-heading text-sm font-bold text-[#0B192C] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Key Service Scope & Advisory Capabilities</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                  {selectedAreaModal.keyServices.map((service, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Statutes & Frameworks */}
              <div className="space-y-2">
                <h4 className="font-heading text-sm font-bold text-[#0B192C] flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-[#D4AF37]" />
                  <span>Governing Statutes & Statutory Frameworks</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAreaModal.relevantStatutes.map((statute, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded.md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      {statute}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lead Counsel Banner */}
              <div className="p-4 rounded-xl bg-[#0B192C]/5 border border-[#D4AF37]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-8 h-8 text-[#0B192C]" />
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Assigned Lead Partner</span>
                    <p className="font-bold text-[#0B192C] text-sm">{selectedAreaModal.leadPartner}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#D4AF37] bg-[#0B192C] px-3 py-1 rounded-full">
                  {selectedAreaModal.caseCount}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedAreaModal(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  const areaId = selectedAreaModal.id;
                  setSelectedAreaModal(null);
                  onSelectPracticeAreaForBooking(areaId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#0B192C] font-extrabold text-xs shadow-md hover:brightness-110"
              >
                Book Consultation For {selectedAreaModal.category} Law
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
