import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Menu, 
  X,
  Lock,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (practiceAreaId?: string, locationId?: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin, isAdminLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello Fortis Law Associates. I would like to inquire about a legal consultation for our corporate matters.");
    window.open(`https://wa.me/923080291021?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C] text-slate-100 shadow-xl border-b border-[#D4AF37]/30">
      {/* Top Utility Bar */}
      <div className="bg-[#060E1A] text-xs py-2 border-b border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Line & Office Location */}
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Direct Desk:</span>
              <a href="tel:03080291021" className="hover:underline text-white font-mono">
                03080291021
              </a>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium text-white">Fareed Chambers 3rd Floor, Karachi</span>
            </div>
            <span className="hidden lg:inline text-slate-700">|</span>
            <div className="hidden lg:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
          </div>

          {/* Direct Actions & Admin Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/90 border border-emerald-500/30 text-xs font-semibold transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: 03080291021</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
                isAdminLoggedIn 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-900'
                  : 'bg-slate-800/90 text-slate-300 hover:text-[#D4AF37] hover:bg-slate-800 border border-slate-700'
              }`}
            >
              {isAdminLoggedIn ? <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{isAdminLoggedIn ? 'Admin Portal (Active)' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0B192C] border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#162a42] group-hover:scale-105 transition-all">
            <span className="text-[#D4AF37] font-serif text-2xl font-black">F</span>
          </div>
          <div>
            <div className="font-serif font-bold text-lg sm:text-xl leading-tight tracking-tight text-white">
              FORTIS LAW ASSOCIATES
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Advocates & Corporate Consultants
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-widest font-bold text-slate-300">
          <a href="#practice-areas" className="hover:text-[#D4AF37] transition-colors py-1">
            Practice Areas
          </a>
          <a href="#partners" className="hover:text-[#D4AF37] transition-colors py-1">
            Senior Partners
          </a>
          <a href="#clients" className="hover:text-[#D4AF37] transition-colors py-1">
            Clients & Reviews
          </a>
          <a href="#publications" className="hover:text-[#D4AF37] transition-colors py-1">
            Legal Insights
          </a>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c2a030] text-[#0B192C] text-[11px] font-extrabold uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081220] border-t border-slate-800 px-4 py-5 space-y-4 rounded-b-2xl shadow-2xl">
          <nav className="flex flex-col gap-3 font-medium text-slate-200 text-xs">
            <a 
              href="#practice-areas" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-800/80 hover:text-[#D4AF37] uppercase font-bold tracking-wider"
            >
              Practice Areas
            </a>
            <a 
              href="#partners" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-800/80 hover:text-[#D4AF37] uppercase font-bold tracking-wider"
            >
              Senior Partners
            </a>
            <a 
              href="#clients" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-800/80 hover:text-[#D4AF37] uppercase font-bold tracking-wider"
            >
              Corporate Clients & Reviews
            </a>
            <a 
              href="#publications" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-800/80 hover:text-[#D4AF37] uppercase font-bold tracking-wider"
            >
              Legal Insights & Publications
            </a>
          </nav>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B192C] font-extrabold uppercase tracking-widest text-xs shadow-lg text-center flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Book Formal Consultation</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-[#D4AF37] text-xs font-semibold text-center flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAdminLoggedIn ? 'Access Admin Portal (Active)' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
