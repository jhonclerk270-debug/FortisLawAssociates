import React from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Award, 
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { TRUST_BADGES } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello Fortis Law Associates. I need an urgent consultation regarding corporate advisory / litigation.");
    window.open(`https://wa.me/923080291021?text=${text}`, '_blank');
  };

  return (
    <section className="relative bg-[#0B192C] text-white pt-10 pb-16 lg:py-20 overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background Subtle Geometric Grid Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#162a42] border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Supreme Court Practitioners & Corporate Consultants</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[80px] leading-[0.92] font-black text-white tracking-tight">
              FORTIS LAW<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                ASSOCIATES
              </span>
            </h1>

            {/* Description Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed border-l-4 border-[#D4AF37] pl-5 text-left rounded-r-lg bg-slate-900/40 py-2">
              Strategic counsel for corporate disputes, constitutional litigation, cross-border arbitration, and regulatory compliance. Operating from Fareed Chambers, Karachi.
            </p>

            {/* Key Trust Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-300 pt-1 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Supreme Court & High Court Advocates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>SECP, FBR & SBP Regulatory Advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Fareed Chambers 3rd Floor, Karachi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Direct WhatsApp Helpline: 03080291021</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4AF37] hover:bg-[#c2a030] text-[#0B192C] font-extrabold uppercase tracking-widest text-xs shadow-xl shadow-[#D4AF37]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Book Formal Consultation</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-widest text-xs border border-slate-700 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: 03080291021</span>
              </button>
            </div>

            {/* Chambers & Legal Trust Badges Row */}
            <div className="pt-6 border-t border-slate-800/80">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3 text-left">
                Recognized By International Legal Directories & Bar Councils
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {TRUST_BADGES.slice(0, 4).map((badge, idx) => (
                  <div 
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-[#060E1A] border border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-300 flex items-center gap-2 shadow-sm"
                  >
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-white">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Hero Visual Right Column: High-End Credentials & Portal Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B192C] border-2 border-slate-800 hover:border-[#D4AF37]/50 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 transition-all">
              <div>
                <span className="text-[#D4AF37] font-serif text-2xl font-bold mb-1 block">Consultation Portal</span>
                <p className="text-slate-400 text-xs">Direct intake to Fortis Law Associates Senior Lead Counsel.</p>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 block">Practice Discipline</label>
                  <div className="w-full bg-[#162a42] border border-slate-700 rounded-xl p-3 text-xs font-semibold text-white flex justify-between items-center">
                    <span>Corporate Law & Finance</span>
                    <span className="text-[#D4AF37]">▾</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 block">Chambers Address</label>
                    <div className="w-full bg-[#162a42] border border-slate-700 rounded-xl p-3 text-xs font-semibold text-slate-200 truncate">
                      Fareed Chambers 3rd Floor
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 block">Schedule</label>
                    <div className="w-full bg-[#162a42] border border-slate-700 rounded-xl p-3 text-xs font-semibold text-slate-200">
                      Next Business Day
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#0B192C] font-extrabold uppercase tracking-widest text-xs hover:bg-[#c2a030] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20 mt-2"
                >
                  Schedule Appointment
                </button>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
                <div className="flex justify-between items-center opacity-90 text-left">
                  <span className="text-[10px] text-white uppercase tracking-widest font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Fareed Chambers, Karachi
                  </span>
                  <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">Direct Contact</span>
                </div>
                <div className="text-white font-mono text-xl font-bold text-left flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>03080291021</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
