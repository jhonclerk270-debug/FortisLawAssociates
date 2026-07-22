import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  UserCheck, 
  ChevronRight, 
  X,
  Share2
} from 'lucide-react';
import { LegalPublication } from '../types';
import { subscribePublications } from '../lib/firebase';

export const PublicationsSection: React.FC = () => {
  const [publications, setPublications] = useState<LegalPublication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [readingPub, setReadingPub] = useState<LegalPublication | null>(null);

  useEffect(() => {
    const unsub = subscribePublications((data) => {
      setPublications(data);
    });
    return () => unsub();
  }, []);

  const categories = ['ALL', 'Corporate Insight', 'Supreme Court Rulings', 'Tax Advisory', 'FinTech & IP', 'Arbitration'];

  const filteredPubs = publications.filter(pub => {
    const matchesCategory = selectedCategory === 'ALL' || pub.category === selectedCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="publications" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] block">
            Legal Research & Case Commentaries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] tracking-tight">
            Publications & Judicial Insights
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-2 border-[#D4AF37] pl-4 max-w-2xl mx-auto text-left sm:text-center sm:border-l-0 sm:pl-0">
            Analysis of reported Supreme Court judgments, State Bank circulars, SECP corporate reforms, and cross-border commercial jurisprudence.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rulings, statutes, authors..."
              className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-[#D4AF37] shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPubs.map((pub) => (
            <article
              key={pub.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#0B192C] text-[#D4AF37] text-[10px] font-bold">
                    {pub.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{pub.readTime}</span>
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#0B192C] hover:text-[#B89628] transition-colors leading-snug">
                  {pub.title}
                </h3>

                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                  {pub.excerpt}
                </p>

                {/* Author Info */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <p className="font-bold text-[#0B192C] text-xs">{pub.author}</p>
                      <p className="text-[10px] text-slate-500">{pub.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{pub.date}</span>
                </div>
              </div>

              {/* Read Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {pub.tags?.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[9px] text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setReadingPub(pub)}
                  className="text-xs font-bold text-[#0B192C] hover:text-[#D4AF37] flex items-center gap-1"
                >
                  <span>Read Full Advisory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {readingPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-[#0B192C] text-white p-6 relative border-b border-[#D4AF37]/30">
              <button
                onClick={() => setReadingPub(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="px-2.5 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                {readingPub.category}
              </span>

              <h3 className="font-heading text-2xl font-bold text-white mt-2 leading-tight">
                {readingPub.title}
              </h3>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                <span>Author: <strong className="text-[#D4AF37]">{readingPub.author}</strong> ({readingPub.authorRole})</span>
                <span>•</span>
                <span>Published: {readingPub.date}</span>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 text-base italic border-l-4 border-[#D4AF37] pl-4 py-1 bg-slate-50 rounded-r">
                {readingPub.excerpt}
              </p>

              <div className="whitespace-pre-line text-slate-800 space-y-4 font-sans text-xs sm:text-sm">
                {readingPub.content}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setReadingPub(null)}
                className="px-4 py-2 rounded-md bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }}
                className="px-4 py-2 rounded-md bg-[#0B192C] text-[#D4AF37] font-bold text-xs flex items-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Legal Advisory</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
