import React, { useState } from 'react';
import { 
  Scale, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  ShieldCheck, 
  FileText, 
  Lock, 
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'disclaimer' | 'privacy' | 'fee' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060E1A] text-slate-300 border-t border-[#D4AF37]/30 text-xs pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0B192C] border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-md">
                <span className="text-[#D4AF37] font-serif text-2xl font-black">K</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-tight block">
                  FORTIS
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
                  Law Associates • Advocates
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed border-l-2 border-[#D4AF37] pl-3">
              Full-service corporate, constitutional, intellectual property, banking, and international arbitration firm with active Supreme Court and High Court enrollment across Pakistan.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Licensed Advocates of Supreme Court of Pakistan (ASC)</span>
            </div>
          </div>

          {/* Col 2: Practice Areas Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-[#D4AF37]">
              Key Disciplines
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#practice-areas" className="hover:text-[#D4AF37] transition-colors">
                  Corporate M&A & SECP Filings
                </a>
              </li>
              <li>
                <a href="#practice-areas" className="hover:text-[#D4AF37] transition-colors">
                  Constitutional Writs & High Court Benches
                </a>
              </li>
              <li>
                <a href="#practice-areas" className="hover:text-[#D4AF37] transition-colors">
                  Intellectual Property, Patents & Tech
                </a>
              </li>
              <li>
                <a href="#practice-areas" className="hover:text-[#D4AF37] transition-colors">
                  State Bank & Islamic Banking Advisory
                </a>
              </li>
              <li>
                <a href="#practice-areas" className="hover:text-[#D4AF37] transition-colors">
                  FBR Tax & Customs Appellate Litigation
                </a>
              </li>
            </ul>
          </div>

  

          {/* Col 4: Compliance & Disclaimer Triggers */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-[#D4AF37]">
              Governance
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setModalType('disclaimer')}
                className="text-left text-slate-400 hover:text-[#D4AF37] transition-colors"
              >
                Attorney Disclaimer
              </button>
              <button
                onClick={() => setModalType('privacy')}
                className="text-left text-slate-400 hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModalType('fee')}
                className="text-left text-slate-400 hover:text-[#D4AF37] transition-colors"
              >
                Bar Council Fee Rules
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Fortis Law Associates. All rights reserved. Registered Law Chambers.
            <br/>
            DEVELOPED BY MUHAMMAD DANIYAL USMAN 
          </div>

          <div className="flex items-center gap-4">
            <span>Supreme Court Bar Association Member</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-[#D4AF37] hover:text-[#0B192C] text-slate-400 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <DisclaimerModal
        type={modalType}
        onClose={() => setModalType(null)}
      />
    </footer>
  );
};
