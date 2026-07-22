export type MeetingType = 'office' | 'video';
export type InquiryStatus = 'pending' | 'contacted' | 'completed';

export interface PracticeArea {
  id: string;
  title: string;
  category: 'Corporate' | 'Constitutional' | 'IP' | 'Banking' | 'Tax' | 'Dispute';
  shortDesc: string;
  fullDesc: string;
  keyServices: string[];
  relevantStatutes: string[];
  leadPartner: string;
  caseCount: string;
  badge: string;
}

export interface SeniorPartner {
  id: string;
  name: string;
  title: string;
  supremeCourtStatus: string;
  experienceYears: number;
  practiceSpecialties: string[];
  education: string[];
  bio: string;
  landmarkCases: string[];
  email: string;
  phone: string;
  imageUrl: string;
}

export interface OfficeLocation {
  id: string;
  city: string;
  officeName: string;
  address: string;
  phone: string;
  emergencyHotline: string;
  email: string;
  managingPartner: string;
  mapEmbedUrl: string;
  operatingHours: string;
}

export interface ConsultationInquiry {
  id?: string;
  referenceId: string;
  clientName: string;
  companyName?: string;
  clientEmail: string;
  clientPhone: string;
  practiceAreaId: string;
  practiceAreaTitle: string;
  locationId: string;
  locationCity: string;
  meetingType: MeetingType;
  preferredDate: string;
  preferredTimeSlot: string;
  caseSummary: string;
  isUrgent: boolean;
  status: InquiryStatus;
  assignedPartner?: string;
  lawyerNotes?: string;
  routingDestination?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface LegalPublication {
  id: string;
  title: string;
  category: 'Corporate Insight' | 'Supreme Court Rulings' | 'Tax Advisory' | 'FinTech & IP' | 'Arbitration';
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  isFeatured?: boolean;
  tags: string[];
}

export interface CorporateClient {
  id: string;
  name: string;
  sector: string;
  badge: string;
  description: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  practiceArea: string;
}
