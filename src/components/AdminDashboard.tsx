import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  UserCheck, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  ShieldAlert, 
  User, 
  X,
  Phone,
  Mail,
  Building2,
  Scale,
  RefreshCw
} from 'lucide-react';
import { ConsultationInquiry, LegalPublication, InquiryStatus } from '../types';
import { 
  subscribeConsultations, 
  updateConsultationStatus, 
  subscribePublications, 
  savePublication,
  auth
} from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  setIsAdminLoggedIn
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'publications'>('leads');
  
  // Auth Form State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubError, setAuthSubError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Clear auth inputs whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setEmailInput('');
      setPasswordInput('');
      setAuthError('');
      setAuthSubError('');
    }
  }, [isOpen]);

  // Consultations State
  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiryNotesModal, setSelectedInquiryNotesModal] = useState<ConsultationInquiry | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [assignedPartnerInput, setAssignedPartnerInput] = useState('');

  // Publications State
  const [publications, setPublications] = useState<LegalPublication[]>([]);
  const [isPubModalOpen, setIsPubModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<LegalPublication | null>(null);

  // Publication Form State
  const [pubTitle, setPubTitle] = useState('');
  const [pubCategory, setPubCategory] = useState<'Corporate Insight' | 'Supreme Court Rulings' | 'Tax Advisory' | 'FinTech & IP' | 'Arbitration'>('Corporate Insight');
  const [pubExcerpt, setPubExcerpt] = useState('');
  const [pubContent, setPubContent] = useState('');
  const [pubAuthor, setPubAuthor] = useState('Adv. Barrister M. Kakakhel');
  const [pubAuthorRole, setPubAuthorRole] = useState('Senior Managing Partner');
  const [pubTags, setPubTags] = useState('Corporate, SECP, High Court');

  // Firebase Auth Listener
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        setIsAdminLoggedIn(true);
      }
    });
    return () => unsub();
  }, [setIsAdminLoggedIn]);

  // Subscribe to Consultations & Publications
  useEffect(() => {
    if (!isAdminLoggedIn) return;
    const unsubInquiries = subscribeConsultations((data) => {
      setInquiries(data);
    });
    const unsubPubs = subscribePublications((data) => {
      setPublications(data);
    });
    return () => {
      unsubInquiries();
      unsubPubs();
    };
  }, [isAdminLoggedIn]);

  if (!isOpen) return null;

  // Handle Login with Server-Side Validation
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubError('');
    setIsAuthLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Attempt Firebase Auth sign in if SDK is available
        if (auth) {
          try {
            await signInWithEmailAndPassword(auth, emailInput, passwordInput);
          } catch {
            // Backend authenticated successfully
          }
        }
        setIsAdminLoggedIn(true);
        setAuthError('');
        setAuthSubError('');
      } else {
        setIsAdminLoggedIn(false);
        setAuthError(data.error || 'Failed to Access');
        setAuthSubError(data.subError || 'Add correct Credentials');
        setPasswordInput(''); // Clear password field for security
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setIsAdminLoggedIn(false);
      setAuthError('Failed to Access');
      setAuthSubError('Add correct Credentials');
      setPasswordInput(''); // Clear password field for security
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (auth) await signOut(auth);
    } catch {}
    setIsAdminLoggedIn(false);
  };

  // Status Change
  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await updateConsultationStatus(id, { status: newStatus });
  };

  // Save Notes Modal
  const handleSaveNotes = async () => {
    if (!selectedInquiryNotesModal || !selectedInquiryNotesModal.id) return;
    await updateConsultationStatus(selectedInquiryNotesModal.id, {
      lawyerNotes: notesInput,
      assignedPartner: assignedPartnerInput
    });
    setSelectedInquiryNotesModal(null);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Ref ID', 'Client Name', 'Company', 'Email', 'Phone', 'Practice Area', 'Location', 'Date', 'Urgent', 'Status', 'Assigned Partner'];
    const rows = inquiries.map(i => [
      i.referenceId,
      `"${i.clientName}"`,
      `"${i.companyName || ''}"`,
      i.clientEmail,
      i.clientPhone,
      `"${i.practiceAreaTitle}"`,
      i.locationCity,
      i.preferredDate,
      i.isUrgent ? 'YES' : 'NO',
      i.status.toUpperCase(),
      `"${i.assignedPartner || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Kakakhel-Consultation-Leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Save Publication
  const handleSavePubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = pubTags.split(',').map(t => t.trim()).filter(Boolean);

    await savePublication({
      id: editingPub ? editingPub.id : undefined,
      title: pubTitle,
      category: pubCategory,
      excerpt: pubExcerpt,
      content: pubContent,
      author: pubAuthor,
      authorRole: pubAuthorRole,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.max(3, Math.ceil(pubContent.length / 500))} min read`,
      tags: tagArray
    });

    setIsPubModalOpen(false);
    setEditingPub(null);
    setPubTitle('');
    setPubExcerpt('');
    setPubContent('');
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = statusFilter === 'ALL' || inq.status === statusFilter;
    const matchesSearch = inq.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.practiceAreaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (inq.companyName && inq.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Analytics counts
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'pending').length;
  const urgentLeads = inquiries.filter(i => i.isUrgent).length;
  const completedLeads = inquiries.filter(i => i.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden max-h-[95vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 bg-[#060E1A] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Fortis Law Associates Admin Portal</span>
                <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-sans uppercase">
                  Protected System
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Inquiry Routing, Lead Intake Management & Legal Insights Publishing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* BODY */}
        {!isAdminLoggedIn ? (
          /* LOGIN SCREEN */
          <div className="p-8 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#1E293B] border border-[#D4AF37] text-[#D4AF37] mx-auto flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-2xl font-bold text-white">Chambers Staff Access</h4>
              <p className="text-xs text-slate-400">
                Enter your administrative credentials to access incoming client leads and publications manager.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs shadow-lg space-y-1 text-center animate-fade-in">
                <p className="font-bold text-sm text-rose-300">{authError}</p>
                {authSubError && <p className="text-rose-200 text-xs font-medium">{authSubError}</p>}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left text-xs" autoComplete="off">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  placeholder="Enter administrator email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Security Password</label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#0B192C] font-extrabold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 active:scale-98 transition-all"
              >
                {isAuthLoading ? 'Authenticating...' : 'Sign In To Portal'}
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN ADMIN DASHBOARD PANEL */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
                    activeTab === 'leads'
                      ? 'bg-[#D4AF37] text-[#0B192C] shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Consultation Leads ({totalLeads})</span>
                </button>

                <button
                  onClick={() => setActiveTab('publications')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
                    activeTab === 'publications'
                      ? 'bg-[#D4AF37] text-[#0B192C] shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>Case Publications ({publications.length})</span>
                </button>
              </div>

              {activeTab === 'leads' ? (
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Export Leads (CSV)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingPub(null);
                    setPubTitle('');
                    setPubExcerpt('');
                    setPubContent('');
                    setIsPubModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0B192C] hover:bg-[#b89628] text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish New Advisory</span>
                </button>
              )}
            </div>

            {/* TAB 1: CONSULTATION LEADS MANAGEMENT */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                
                {/* Stats Summary Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium block">Total Leads</span>
                    <span className="text-2xl font-bold font-heading text-white">{totalLeads}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/30">
                    <span className="text-xs text-amber-300 font-medium block">Pending Review</span>
                    <span className="text-2xl font-bold font-heading text-amber-400">{pendingLeads}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-600/30">
                    <span className="text-xs text-rose-300 font-medium block">Urgent Court Stay</span>
                    <span className="text-2xl font-bold font-heading text-rose-400">{urgentLeads}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/30">
                    <span className="text-xs text-emerald-300 font-medium block">Completed Matters</span>
                    <span className="text-2xl font-bold font-heading text-emerald-400">{completedLeads}</span>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by ref, client, practice..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-slate-400 font-medium">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-950 text-white border border-slate-700 rounded-lg px-3 py-2 focus:outline-none font-medium cursor-pointer"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="rounded-xl border border-slate-800 overflow-x-auto bg-slate-900/50">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#060E1A] text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5">Ref ID / Client</th>
                        <th className="p-3.5">Practice Area</th>
                        <th className="p-3.5">Location & Date</th>
                        <th className="p-3.5">Assigned Partner / Routing</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                            No consultation inquiries found matching filters.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                            
                            {/* Ref & Client */}
                            <td className="p-3.5 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#D4AF37] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {inq.referenceId}
                                </span>
                                {inq.isUrgent && (
                                  <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600/50 text-[9px] font-bold animate-pulse">
                                    URGENT
                                  </span>
                                )}
                              </div>
                              <p className="font-bold text-white text-xs">{inq.clientName}</p>
                              <p className="text-[10px] text-slate-400">
                                {inq.companyName || 'Individual'} • {inq.clientPhone}
                              </p>
                            </td>

                            {/* Practice Area */}
                            <td className="p-3.5">
                              <span className="font-bold text-slate-200 block">{inq.practiceAreaTitle}</span>
                              <p className="text-[10px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                                {inq.caseSummary}
                              </p>
                            </td>

                            {/* Location & Date */}
                            <td className="p-3.5">
                              <span className="font-semibold text-white block">
                                {inq.meetingType === 'video' ? 'Secure Video' : inq.locationCity}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {inq.preferredDate} ({inq.preferredTimeSlot})
                              </span>
                            </td>

                            {/* Routing & Partner */}
                            <td className="p-3.5 space-y-1">
                              <span className="text-slate-200 font-semibold block text-xs">
                                {inq.assignedPartner || 'Unassigned Duty Partner'}
                              </span>
                              <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 inline-block">
                                {inq.routingDestination || 'Central Intake'}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="p-3.5">
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id!, e.target.value as InquiryStatus)}
                                className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase focus:outline-none cursor-pointer ${
                                  inq.status === 'pending'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                                    : inq.status === 'contacted'
                                    ? 'bg-sky-950 text-sky-300 border border-sky-600/50'
                                    : 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>

                            {/* Action Notes */}
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => {
                                  setSelectedInquiryNotesModal(inq);
                                  setNotesInput(inq.lawyerNotes || '');
                                  setAssignedPartnerInput(inq.assignedPartner || '');
                                }}
                                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-[#D4AF37] hover:text-[#0B192C] text-slate-200 font-semibold text-xs transition-colors"
                              >
                                Notes / Route
                              </button>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 2: PUBLICATIONS MANAGER */}
            {activeTab === 'publications' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publications.map((pub) => (
                    <div
                      key={pub.id}
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase">
                          {pub.category}
                        </span>
                        <h4 className="font-bold text-white text-sm leading-snug">{pub.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{pub.excerpt}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-500">{pub.date}</span>
                        <button
                          onClick={() => {
                            setEditingPub(pub);
                            setPubTitle(pub.title);
                            setPubCategory(pub.category);
                            setPubExcerpt(pub.excerpt);
                            setPubContent(pub.content);
                            setPubAuthor(pub.author);
                            setPubAuthorRole(pub.authorRole);
                            setPubTags(pub.tags ? pub.tags.join(', ') : '');
                            setIsPubModalOpen(true);
                          }}
                          className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Article</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Internal Notes & Partner Assign Modal */}
      {selectedInquiryNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-[#D4AF37] p-6 space-y-4">
            <button
              onClick={() => setSelectedInquiryNotesModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-heading font-bold text-lg text-white">
              Lawyer Notes & Partner Assignment
            </h4>
            <p className="text-xs text-slate-400">
              Ref ID: <strong className="text-[#D4AF37]">{selectedInquiryNotesModal.referenceId}</strong> ({selectedInquiryNotesModal.clientName})
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assign Senior Lead Partner</label>
                <input
                  type="text"
                  value={assignedPartnerInput}
                  onChange={(e) => setAssignedPartnerInput(e.target.value)}
                  placeholder="e.g. Adv. Barrister M. Kakakhel"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Internal Case Intake Notes</label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record conflict checks, initial phone call findings, or statutory strategy..."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedInquiryNotesModal(null)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded bg-[#D4AF37] text-[#0B192C] font-bold"
              >
                Save Internal Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Publication Modal */}
      {isPubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-[#D4AF37] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPubModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-heading font-bold text-lg text-white">
              {editingPub ? 'Edit Legal Publication' : 'Publish New Legal Advisory'}
            </h4>

            <form onSubmit={handleSavePubSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  placeholder="e.g. Constitutional Review of High Court Writ Orders"
                  className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={pubCategory}
                    onChange={(e: any) => setPubCategory(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Corporate Insight">Corporate Insight</option>
                    <option value="Supreme Court Rulings">Supreme Court Rulings</option>
                    <option value="Tax Advisory">Tax Advisory</option>
                    <option value="FinTech & IP">FinTech & IP</option>
                    <option value="Arbitration">Arbitration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={pubAuthor}
                    onChange={(e) => setPubAuthor(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Excerpt Summary *</label>
                <input
                  type="text"
                  required
                  value={pubExcerpt}
                  onChange={(e) => setPubExcerpt(e.target.value)}
                  placeholder="Short 2-sentence summary for preview cards..."
                  className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Article Content *</label>
                <textarea
                  required
                  rows={6}
                  value={pubContent}
                  onChange={(e) => setPubContent(e.target.value)}
                  placeholder="Write full legal commentary and statute references..."
                  className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Search Tags (Comma separated)</label>
                <input
                  type="text"
                  value={pubTags}
                  onChange={(e) => setPubTags(e.target.value)}
                  placeholder="SECP, High Court, Corporate"
                  className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPubModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#D4AF37] text-[#0B192C] font-extrabold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
