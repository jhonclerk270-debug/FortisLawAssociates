import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Menu, 
  X
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (practiceAreaId?: string, locationId?: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin, isAdminLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C] text-slate-100 shadow-xl border-b border-[#D4AF37]/30">
      {/* Main Brand & Navigation */}
  
          <div>
            <div className="font-serif font-bold text-lg sm:text-xl leading-tight tracking-tight text-white group-hover:text-amber-100 transition-colors">
              FORTIS LAW ASSOCIATES
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Advocates & Corporate Consultants
            </p>
          </div>
        </button>

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
          </div>
        </div>
      )}
    </header>
  );
};
