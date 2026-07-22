import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  Video, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Download,
  MessageSquare,
  Scale
} from 'lucide-react';
import { PRACTICE_AREAS, OFFICE_LOCATIONS } from '../data/mockData';
import { MeetingType, ConsultationInquiry } from '../types';
import { saveConsultationInquiry, getAutoRoutedPartner } from '../lib/firebase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPracticeAreaId?: string;
  initialLocationId?: string;
  initialPartnerName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPracticeAreaId = 'corp-law',
  initialLocationId = 'fareed-chambers',
  initialPartnerName
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [practiceAreaId, setPracticeAreaId] = useState(initialPracticeAreaId);
  const [locationId, setLocationId] = useState(initialLocationId);
  const [meetingType, setMeetingType] = useState<MeetingType>('office');
  const [preferredDate, setPreferredDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [caseSummary, setCaseSummary] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  // Success State
  const [confirmedInquiry, setConfirmedInquiry] = useState<ConsultationInquiry | null>(null);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM - 10:30 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM',
    '05:00 PM - 06:00 PM'
  ];

  const selectedPracticeObj = PRACTICE_AREAS.find(p => p.id === practiceAreaId) || PRACTICE_AREAS[0];
  const selectedOfficeObj = OFFICE_LOCATIONS.find(o => o.id === locationId) || OFFICE_LOCATIONS[0];

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refNumber = `FLA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const partner = initialPartnerName || getAutoRoutedPartner(practiceAreaId);
    const routingDest = `Karachi ${selectedPracticeObj.category} Desk`;

    const payload: Omit<ConsultationInquiry, 'id' | 'createdAt'> = {
      referenceId: refNumber,
      clientName,
      companyName,
      clientEmail,
      clientPhone,
      practiceAreaId,
      practiceAreaTitle: selectedPracticeObj.title,
      locationId: 'fareed-chambers',
      locationCity: 'Fareed Chambers 3rd Floor, Karachi',
      meetingType,
      preferredDate,
      preferredTimeSlot,
      caseSummary,
      isUrgent,
      status: 'pending',
      assignedPartner: partner,
      routingDestination: routingDest
    };

    try {
      const savedId = await saveConsultationInquiry(payload);
      setConfirmedInquiry({
        ...payload,
        id: savedId,
        createdAt: Date.now()
      });
    } catch (err) {
      console.warn("Booking submit err:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCalendarIcs = () => {
    if (!confirmedInquiry) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Fortis Law Associates//NONSGML Consultation//EN
BEGIN:VEVENT
SUMMARY:Legal Consultation - ${confirmedInquiry.practiceAreaTitle}
DESCRIPTION:Reference: ${confirmedInquiry.referenceId}\\nClient: ${confirmedInquiry.clientName}\\nLocation: ${confirmedInquiry.meetingType === 'video' ? 'Secure Video Link' : confirmedInquiry.locationCity}\\nAssigned Partner: ${confirmedInquiry.assignedPartner}
DTSTART:${confirmedInquiry.preferredDate.replace(/-/g, '')}T090000Z
DTEND:${confirmedInquiry.preferredDate.replace(/-/g, '')}T100000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedInquiry.referenceId}-consultation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppQuickConfirm = () => {
    if (!confirmedInquiry) return;
    const msg = encodeURIComponent(
      `Hello Fortis Law Associates. I have booked a legal consultation.\nRef ID: ${confirmedInquiry.referenceId}\nClient: ${confirmedInquiry.clientName}\nPractice Area: ${confirmedInquiry.practiceAreaTitle}\nDate: ${confirmedInquiry.preferredDate} (${confirmedInquiry.preferredTimeSlot})\nUrgent: ${confirmedInquiry.isUrgent ? 'YES' : 'NO'}`
    );
    window.open(`https://wa.me/923080291021?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-6 relative border-b border-[#D4AF37]/50">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em]">
              Fortis Law Associates • Intake Portal
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Schedule Legal Consultation
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Direct intake to Lead Counsel at Fareed Chambers 3rd Floor, Karachi.
          </p>

          {/* Stepper Dots (if not finished) */}
          {!confirmedInquiry && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-xs">
              <span className={`font-semibold ${step >= 1 ? 'text-[#D4AF37]' : 'text-slate-500'}`}>
                1. Practice Area
              </span>
              <span className="text-slate-600">•</span>
              <span className={`font-semibold ${step >= 2 ? 'text-[#D4AF37]' : 'text-slate-500'}`}>
                2. Schedule & Mode
              </span>
              <span className="text-slate-600">•</span>
              <span className={`font-semibold ${step >= 3 ? 'text-[#D4AF37]' : 'text-slate-500'}`}>
                3. Contact & Case Notes
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-slate-800">
          
          {/* SUCCESS SCREEN */}
          {confirmedInquiry ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Inquiry Registered
                </span>
                <h4 className="font-heading text-2xl font-extrabold text-[#0B192C] mt-2">
                  Booking Confirmed!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Reference ID: <span className="font-mono font-bold text-[#0B192C] bg-slate-100 px-2 py-0.5 rounded border border-slate-300">{confirmedInquiry.referenceId}</span>
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs text-slate-700 max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">Practice Area</span>
                    <span className="font-bold text-[#0B192C]">{confirmedInquiry.practiceAreaTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Meeting Mode</span>
                    <span className="font-bold text-[#0B192C]">
                      {confirmedInquiry.meetingType === 'video' ? 'Secure Video Meeting' : 'Chambers Visit (Fareed Chambers)'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">Preferred Date & Slot</span>
                    <span className="font-bold text-[#0B192C]">{confirmedInquiry.preferredDate} ({confirmedInquiry.preferredTimeSlot})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Assigned Senior Counsel</span>
                    <span className="font-bold text-[#0B192C]">{confirmedInquiry.assignedPartner}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Client Info</span>
                  <span className="font-semibold text-slate-800">{confirmedInquiry.clientName} ({confirmedInquiry.clientEmail})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendarIcs}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download Calendar Event (.ics)</span>
                </button>

                <button
                  onClick={handleWhatsAppQuickConfirm}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Desk Quick-Confirm</span>
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              
              {/* STEP 1: Practice Area */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-base text-[#0B192C] flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#D4AF37]" />
                    <span>Select Legal Practice Area</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRACTICE_AREAS.map((area) => (
                      <div
                        key={area.id}
                        onClick={() => setPracticeAreaId(area.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          practiceAreaId === area.id
                            ? 'bg-[#0B192C] text-white border-[#D4AF37] shadow-lg'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${practiceAreaId === area.id ? 'text-[#D4AF37]' : 'text-[#0B192C]'}`}>
                            {area.category} Law
                          </span>
                          {practiceAreaId === area.id && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                        </div>
                        <h5 className="font-bold text-sm leading-tight">{area.title}</h5>
                        <p className={`text-[11px] mt-1 line-clamp-2 ${practiceAreaId === area.id ? 'text-slate-300' : 'text-slate-500'}`}>
                          {area.shortDesc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-[#0B192C] text-[#D4AF37] hover:bg-[#112239] font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Next: Select Date & Slot</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Meeting Type, City & Date/Time */}
              {step === 2 && (
                <div className="space-y-5">
                  <h4 className="font-heading font-bold text-base text-[#0B192C] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span>Schedule & Meeting Mode</span>
                  </h4>

                  {/* Meeting Mode Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMeetingType('office')}
                      className={`p-3.5 rounded-xl border text-left font-semibold text-xs flex items-center gap-3 transition-all ${
                        meetingType === 'office'
                          ? 'bg-[#0B192C] text-white border-[#D4AF37] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Building2 className={`w-5 h-5 ${meetingType === 'office' ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                      <div>
                        <span>Chambers In-Person Visit</span>
                        <p className="text-[10px] opacity-80 font-normal">Fareed Chambers 3rd Floor, Karachi</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMeetingType('video')}
                      className={`p-3.5 rounded-xl border text-left font-semibold text-xs flex items-center gap-3 transition-all ${
                        meetingType === 'video'
                          ? 'bg-[#0B192C] text-white border-[#D4AF37] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Video className={`w-5 h-5 ${meetingType === 'video' ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                      <div>
                        <span>Secure Video Call</span>
                        <p className="text-[10px] opacity-80 font-normal">Encrypted video consultation link</p>
                      </div>
                    </button>
                  </div>

                  {/* Office Hub Location Badge */}
                  <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#0B192C] block">Fortis Law Associates Chambers</span>
                      <span className="text-xs text-slate-600">Fareed Chambers 3rd Floor, Abdullah Haroon Road, Saddar, Karachi</span>
                    </div>
                  </div>

                  {/* Date & Time slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Preferred Consultation Date *</label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Available Time Slot *</label>
                      <select
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
                      >
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 hover:bg-slate-200 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-[#0B192C] text-[#D4AF37] hover:bg-[#112239] font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Next: Contact Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact & Case Summary Notes */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-base text-[#0B192C] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#D4AF37]" />
                    <span>Client & Case Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Full Name / Designation *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Adv. Imran Malik / CEO"
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Company / Organization Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Zenith Energy Corp"
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Official Email Address *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="fortislaw313@gmail.com"
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Direct Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="03080291021"
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Brief Case Summary / Notes *</label>
                    <textarea
                      required
                      rows={3}
                      value={caseSummary}
                      onChange={(e) => setCaseSummary(e.target.value)}
                      placeholder="Summarize the legal dispute, regulatory filing, contract drafting, or court writ required..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Urgency Checkbox */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <span className="font-bold text-xs text-amber-900 block">Urgent Injunction / Court Stay Needed?</span>
                        <span className="text-[10px] text-amber-700">Flags inquiry for 2-hour emergency Senior Partner routing</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 hover:bg-slate-200 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#0B192C] font-extrabold text-xs tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? 'Registering Intake...' : 'Submit & Route Consultation'}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          <span>Attorney-Client Privilege Confidentiality Notice: All submitted details are encrypted under legal professional privilege.</span>
        </div>

      </div>
    </div>
  );
};
