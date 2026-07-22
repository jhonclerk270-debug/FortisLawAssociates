import React from 'react';
import { X, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

interface DisclaimerModalProps {
  type: 'disclaimer' | 'privacy' | 'fee' | null;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 relative border-b border-[#D4AF37]/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Legal Compliance & Governance
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold text-white">
            {type === 'disclaimer' && 'Attorney-Client Relationship Disclaimer'}
            {type === 'privacy' && 'Privacy Policy & Data Privilege Standards'}
            {type === 'fee' && 'Bar Council Fee Transparency & Rules'}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
          {type === 'disclaimer' && (
            <>
              <p>
                <strong>No Attorney-Client Relationship Formed:</strong> Transmission of information from this platform, submission of initial consultation booking forms, or direct electronic mail communication with Kakakhel & Associates does not create or constitute an attorney-client relationship between the sender and Kakakhel Law Chambers.
              </p>
              <p>
                <strong>Formal Engagement Requirement:</strong> An attorney-client relationship is strictly established only after a conflict-of-interest verification process is completed and a formal written Engagement Letter / Power of Attorney (Wakalatnama) is executed by both parties.
              </p>
              <p>
                <strong>Confidentiality Notice:</strong> Information submitted via the consultation booking form is protected under strict professional privilege and will not be disclosed to any third party without explicit client consent.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                <strong>Data Protection Commitment:</strong> Kakakhel & Associates adheres strictly to the highest standards of client data protection and confidentiality governed by Bar Council rules and data privacy laws.
              </p>
              <p>
                <strong>Data Utilization:</strong> Personal contact information, corporate details, and case summaries gathered through the intake system are used solely for the purpose of scheduling consultations, conducting internal conflict checks, and routing cases to duty Senior Partners.
              </p>
              <p>
                <strong>No Third-Party Monetization:</strong> We do not sell, rent, or trade client personal or corporate data to any commercial entities or marketing networks.
              </p>
            </>
          )}

          {type === 'fee' && (
            <>
              <p>
                <strong>Bar Council Fee Rules Compliance:</strong> All legal retainer agreements, consultation fees, and court appearance scales are structured in strict compliance with the Legal Practitioners and Bar Councils Act and relevant High Court rules.
              </p>
              <p>
                <strong>Fee Transparency:</strong> Clients receive a detailed fee estimate prior to formal engagement, outlining hourly rates, fixed transaction fees, and estimated court out-of-pocket expenses.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0B192C] text-[#D4AF37] hover:bg-[#112239] font-bold text-xs"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
