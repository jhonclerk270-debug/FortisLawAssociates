import React, { useState } from 'react';
import { 
  Building2, 
  Star, 
  Quote, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  PlusCircle,
  X
} from 'lucide-react';
import { CORPORATE_CLIENTS, CLIENT_TESTIMONIALS } from '../data/mockData';
import { ClientTestimonial } from '../types';

export const ClientWall: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ClientTestimonial[]>(CLIENT_TESTIMONIALS);
  const [filterRating, setFilterRating] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state to post new client review
  const [newClientName, setNewClientName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newPracticeArea, setNewPracticeArea] = useState('Corporate M&A');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newCompany || !newText) return;

    const createdTestimonial: ClientTestimonial = {
      id: 'rev-' + Date.now(),
      clientName: newClientName,
      company: newCompany,
      designation: newDesignation || 'Corporate Executive',
      rating: newRating,
      text: newText,
      date: 'Just Now',
      verified: true,
      practiceArea: newPracticeArea
    };

    setTestimonials([createdTestimonial, ...testimonials]);
    setIsAddModalOpen(false);
    setNewClientName('');
    setNewCompany('');
    setNewDesignation('');
    setNewText('');
  };

  const filteredTestimonials = filterRating === 0
    ? testimonials
    : testimonials.filter(t => t.rating === filterRating);

  return (
    <section id="clients" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] block">
            Trusted Corporate Representation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] tracking-tight">
            Notable Corporate Clients & Testimonials
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-2 border-[#D4AF37] pl-4 max-w-2xl mx-auto text-left sm:text-center sm:border-l-0 sm:pl-0">
            Retained lead legal counsel for financial institutions, telecommunications conglomerates, power IPPs, and multinational healthcare leaders.
          </p>
        </div>

        {/* Corporate Client Logos / Cards Wall */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CORPORATE_CLIENTS.map((client) => (
            <div
              key={client.id}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all text-center flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#0B192C] text-[#D4AF37] mx-auto flex items-center justify-center font-bold text-sm font-heading">
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <h4 className="font-bold text-xs text-[#0B192C] leading-tight">
                  {client.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  {client.sector}
                </p>
              </div>
              <span className="mt-3 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-bold border border-slate-200 truncate">
                {client.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Google Reviews & Rating Summary Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B192C] text-white border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#1E293B] border border-[#D4AF37] flex flex-col items-center justify-center text-[#D4AF37] shadow-lg shrink-0">
              <span className="text-2xl font-extrabold font-heading">4.9</span>
              <div className="flex text-[#D4AF37] text-[10px]">
                ★★★★★
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="font-heading font-bold text-xl text-white">Google Client Reviews</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  Verified 100%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Based on 180+ verified corporate legal consultation feedback submissions
              </p>
            </div>
          </div>

          {/* Action to leave a review or filter */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400 font-medium">Filter Rating:</span>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="bg-transparent text-white focus:outline-none font-semibold cursor-pointer"
              >
                <option value={0} className="bg-slate-900">All Ratings</option>
                <option value={5} className="bg-slate-900">5 Stars Only</option>
                <option value={4} className="bg-slate-900">4 Stars & Above</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0B192C] hover:bg-[#b89628] font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Leave Client Feedback</span>
            </button>
          </div>
        </div>

        {/* Testimonials Wall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-100" />

              <div className="space-y-3 relative z-10">
                {/* Star Row */}
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-[#D4AF37]' : 'text-slate-200'}`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 font-semibold ml-2">
                    {testimonial.practiceArea}
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B192C] text-[#D4AF37] font-bold text-xs flex items-center justify-center font-heading">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#0B192C]">
                      {testimonial.clientName}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {testimonial.designation}, <span className="font-semibold text-slate-700">{testimonial.company}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Engagement</span>
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{testimonial.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Add Client Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0B192C] text-white p-5 relative border-b border-[#D4AF37]/30">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-heading font-bold text-lg text-white">
                Submit Corporate Client Review
              </h3>
              <p className="text-xs text-slate-300">
                Share your consultation experience with Fortis Law Associates
              </p>
            </div>

            <form onSubmit={handleAddReviewSubmit} className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-800">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Asad Umar Khan"
                    className="w-full p-2 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-800">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. National Logistics Group"
                    className="w-full p-2 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-800">Designation / Role</label>
                  <input
                    type="text"
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    placeholder="e.g. Head of Legal / Managing Director"
                    className="w-full p-2 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-800">Practice Area</label>
                  <select
                    value={newPracticeArea}
                    onChange={(e) => setNewPracticeArea(e.target.value)}
                    className="w-full p-2 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Corporate Law & M&A">Corporate Law & M&A</option>
                    <option value="Constitutional Litigation">Constitutional Litigation</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                    <option value="Banking & Finance">Banking & Finance</option>
                    <option value="Tax & FBR Disputes">Tax & FBR Disputes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-800">Overall Rating (Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`text-lg ${star <= newRating ? 'text-[#D4AF37]' : 'text-slate-300'}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="font-bold text-slate-800 ml-2">{newRating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-800">Review Comments *</label>
                <textarea
                  required
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Describe the legal advisory or litigation representation provided by the firm..."
                  className="w-full p-2 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#0B192C] text-[#D4AF37] hover:bg-[#112239] font-bold"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
