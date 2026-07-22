import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  Firestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ConsultationInquiry, LegalPublication } from '../types';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  // Pass non-default firestoreDatabaseId if configured
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization warning, using fallback mode:", error);
}

export { db, auth };

// Collections
const CONSULTATIONS_COL = 'consultations';
const PUBLICATIONS_COL = 'publications';

// LOCAL STORAGE FALLBACK KEYS
const LS_CONSULTATIONS = 'fortis_consultations_v1';
const LS_PUBLICATIONS = 'fortis_publications_v1';

// Seed consultations for admin demo if empty
export const initialSeedConsultations: ConsultationInquiry[] = [
  {
    id: 'seed-1',
    referenceId: 'FLA-2026-9012',
    clientName: 'Tariq Mehmood',
    companyName: 'Apex Telecom Energy Ltd',
    clientEmail: 'tariq.mehmood@apextelecom.com',
    clientPhone: '+92 300 5551234',
    practiceAreaId: 'corp-law',
    practiceAreaTitle: 'Corporate Law & M&A',
    locationId: 'fareed-chambers',
    locationCity: 'Karachi (Fareed Chambers 3rd Floor)',
    meetingType: 'office',
    preferredDate: '2026-07-28',
    preferredTimeSlot: '11:00 AM - 12:00 PM',
    caseSummary: 'Structuring cross-border $45M M&A acquisition agreement and SECP regulatory compliance filing.',
    isUrgent: true,
    status: 'pending',
    assignedPartner: 'Adv. Barrister M. Fortis',
    routingDestination: 'Karachi Corporate Desk',
    createdAt: Date.now() - 3600000 * 4,
    lawyerNotes: 'High-value transaction. Requires Antitrust / Competition Commission review.'
  },
  {
    id: 'seed-2',
    referenceId: 'FLA-2026-8843',
    clientName: 'Dr. Ayesha Siddiqui',
    companyName: 'BioPharm Solutions Global',
    clientEmail: 'a.siddiqui@biopharm.org',
    clientPhone: '+92 321 9876543',
    practiceAreaId: 'ip-law',
    practiceAreaTitle: 'Intellectual Property & Patents',
    locationId: 'fareed-chambers',
    locationCity: 'Karachi (Fareed Chambers 3rd Floor)',
    meetingType: 'video',
    preferredDate: '2026-07-29',
    preferredTimeSlot: '02:30 PM - 03:30 PM',
    caseSummary: 'International patent infringement litigation defense in the High Court of Sindh.',
    isUrgent: false,
    status: 'contacted',
    assignedPartner: 'Adv. Siraaj Khan Fortis',
    routingDestination: 'Karachi IP Desk',
    createdAt: Date.now() - 3600000 * 24,
    lawyerNotes: 'First round intake done via Zoom. Documents requested for prior art analysis.'
  },
  {
    id: 'seed-3',
    referenceId: 'FLA-2026-7421',
    clientName: 'Bilal Hassan Qureshi',
    companyName: 'First National Banking Corp',
    clientEmail: 'bilal.hassan@fnbank.com.pk',
    clientPhone: '+92 333 4445566',
    practiceAreaId: 'banking-fin',
    practiceAreaTitle: 'Banking, Finance & Fintech',
    locationId: 'fareed-chambers',
    locationCity: 'Karachi (Fareed Chambers 3rd Floor)',
    meetingType: 'office',
    preferredDate: '2026-07-25',
    preferredTimeSlot: '04:00 PM - 05:00 PM',
    caseSummary: 'State Bank of Pakistan regulatory sandbox compliance and digital payment licensing advisory.',
    isUrgent: false,
    status: 'completed',
    assignedPartner: 'Adv. Hassan Raza Fortis',
    routingDestination: 'Karachi Banking Desk',
    createdAt: Date.now() - 3600000 * 72,
    lawyerNotes: 'Formal legal opinion delivered and signed by Senior Partner.'
  }
];

// Seed publications
export const initialSeedPublications: LegalPublication[] = [
  {
    id: 'pub-1',
    title: 'Navigating Cross-Border Regulatory Frameworks for FinTechs in Pakistan',
    category: 'Corporate Insight',
    excerpt: 'An in-depth legal analysis of SBP payment gateway licenses, data sovereignty laws, and SECP sandbox regulations for tech startups.',
    content: `Pakistan's financial technology sector is experiencing unprecedented growth, accompanied by evolving regulatory expectations from the State Bank of Pakistan (SBP) and the Securities and Exchange Commission of Pakistan (SECP).\n\nKey takeaways for fintech founders and legal counsel include compliance with foreign exchange regulations, customer data protection obligations, and anti-money laundering (AML/CFT) directives.\n\nOur corporate advisory division regularly assists foreign and domestic entities in securing EMI and Payment System Operator licenses.`,
    author: 'Adv. Barrister M. Fortis',
    authorRole: 'Senior Managing Partner (ASC)',
    date: 'July 18, 2026',
    readTime: '6 min read',
    isFeatured: true,
    tags: ['SECP', 'SBP License', 'Corporate Law', 'FinTech']
  },
  {
    title: 'Constitutional Remedies & Writ Petitions in High Courts: A Judicial Overview',
    id: 'pub-2',
    category: 'Supreme Court Rulings',
    excerpt: 'Examining recent jurisprudence under Article 199 of the Constitution regarding fundamental rights enforcement against regulatory bodies.',
    content: `The High Courts under Article 199 possess vast discretionary constitutional powers to issue writs of mandamus, prohibition, certiorari, habeas corpus, and quo warranto.\n\nRecent Supreme Court judgments have reinforced the principle that administrative bodies cannot act arbitrarily without giving affected parties a right of hearing (audi alteram partem).\n\nThis article outlines procedural steps for commercial litigants seeking immediate stay orders against unauthorized administrative actions.`,
    author: 'Adv. Supreme Court Siraaj Khan Fortis',
    authorRole: 'Senior Litigator',
    date: 'June 30, 2026',
    readTime: '8 min read',
    isFeatured: false,
    tags: ['Constitutional Law', 'Writ Petition', 'Supreme Court', 'Litigation']
  },
  {
    title: 'Intellectual Property Protection for Proprietary Software & AI Models',
    id: 'pub-3',
    category: 'FinTech & IP',
    excerpt: 'Understanding copyright vs patent protection under the Copyright Ordinance and Patents Ordinance in high-tech corporate environments.',
    content: `As artificial intelligence and custom algorithms drive business value, securing intellectual property rights has become a primary boardroom concern.\n\nWhile source code receives copyright protection automatically upon creation, securing patent rights for software-driven technical processes requires demonstrating novelty and technical effect.\n\nWe outline strategies for dual protection through copyright registration, trade secrets, and confidentiality covenants.`,
    author: 'Adv. Hassan Raza Fortis',
    authorRole: 'Partner - IP & Technology',
    date: 'May 12, 2026',
    readTime: '5 min read',
    isFeatured: false,
    tags: ['Intellectual Property', 'Patents', 'Software Copyright', 'AI Law']
  }
];

// Helper: Save consultation
export async function saveConsultationInquiry(data: Omit<ConsultationInquiry, 'id' | 'createdAt'>): Promise<string> {
  const newInquiry: ConsultationInquiry = {
    ...data,
    createdAt: Date.now(),
    status: data.status || 'pending',
    assignedPartner: data.assignedPartner || getAutoRoutedPartner(data.practiceAreaId)
  };

  try {
    if (db) {
      const docRef = await addDoc(collection(db, CONSULTATIONS_COL), {
        ...newInquiry,
        serverTimestamp: serverTimestamp()
      });
      // also save locally
      saveToLocalStorageList(LS_CONSULTATIONS, { ...newInquiry, id: docRef.id });
      return docRef.id;
    }
  } catch (err) {
    console.warn("Firestore save consultation error, falling back to local storage:", err);
  }

  const fallbackId = 'loc-' + Math.random().toString(36).substr(2, 9);
  const savedItem = { ...newInquiry, id: fallbackId };
  saveToLocalStorageList(LS_CONSULTATIONS, savedItem);
  return fallbackId;
}

// Helper: Subscribe / Fetch Consultations
export function subscribeConsultations(callback: (inquiries: ConsultationInquiry[]) => void) {
  if (db) {
    try {
      const q = query(collection(db, CONSULTATIONS_COL), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const list: ConsultationInquiry[] = [];
        snapshot.forEach((doc) => {
          const d = doc.data();
          list.push({
            id: doc.id,
            referenceId: d.referenceId || 'KLA-REF',
            clientName: d.clientName || '',
            companyName: d.companyName || '',
            clientEmail: d.clientEmail || '',
            clientPhone: d.clientPhone || '',
            practiceAreaId: d.practiceAreaId || '',
            practiceAreaTitle: d.practiceAreaTitle || '',
            locationId: d.locationId || '',
            locationCity: d.locationCity || '',
            meetingType: d.meetingType || 'office',
            preferredDate: d.preferredDate || '',
            preferredTimeSlot: d.preferredTimeSlot || '',
            caseSummary: d.caseSummary || '',
            isUrgent: !!d.isUrgent,
            status: d.status || 'pending',
            assignedPartner: d.assignedPartner || '',
            lawyerNotes: d.lawyerNotes || '',
            routingDestination: d.routingDestination || '',
            createdAt: d.createdAt || Date.now()
          });
        });

        if (list.length === 0) {
          // If firestore is empty, seed local
          const local = getFromLocalStorageList<ConsultationInquiry>(LS_CONSULTATIONS, initialSeedConsultations);
          callback(local);
        } else {
          // Sync to localStorage
          localStorage.setItem(LS_CONSULTATIONS, JSON.stringify(list));
          callback(list);
        }
      }, (error) => {
        console.warn("Firestore snapshot error, using local fallback:", error);
        callback(getFromLocalStorageList<ConsultationInquiry>(LS_CONSULTATIONS, initialSeedConsultations));
      });
    } catch (err) {
      console.warn("Firestore query error:", err);
    }
  }

  // Fallback
  callback(getFromLocalStorageList<ConsultationInquiry>(LS_CONSULTATIONS, initialSeedConsultations));
  return () => {};
}

// Helper: Update Consultation
export async function updateConsultationStatus(
  id: string, 
  updates: Partial<ConsultationInquiry>
): Promise<void> {
  try {
    if (db && !id.startsWith('seed-') && !id.startsWith('loc-')) {
      const docRef = doc(db, CONSULTATIONS_COL, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Date.now()
      });
    }
  } catch (err) {
    console.warn("Firestore update error:", err);
  }

  // Always update local storage
  const current = getFromLocalStorageList<ConsultationInquiry>(LS_CONSULTATIONS, initialSeedConsultations);
  const updated = current.map(item => item.id === id ? { ...item, ...updates, updatedAt: Date.now() } : item);
  localStorage.setItem(LS_CONSULTATIONS, JSON.stringify(updated));
}

// Helper: Save Publication
export async function savePublication(pub: Omit<LegalPublication, 'id'> & { id?: string }): Promise<string> {
  const pubId = pub.id || 'pub-' + Date.now();
  const fullPub: LegalPublication = {
    ...pub,
    id: pubId
  };

  try {
    if (db) {
      if (pub.id && !pub.id.startsWith('pub-') && !pub.id.startsWith('loc-')) {
        await updateDoc(doc(db, PUBLICATIONS_COL, pub.id), { ...pub });
      } else {
        const docRef = await addDoc(collection(db, PUBLICATIONS_COL), { ...fullPub, createdAt: serverTimestamp() });
        fullPub.id = docRef.id;
      }
    }
  } catch (err) {
    console.warn("Firestore pub error:", err);
  }

  const current = getFromLocalStorageList<LegalPublication>(LS_PUBLICATIONS, initialSeedPublications);
  const exists = current.some(p => p.id === fullPub.id);
  const updated = exists ? current.map(p => p.id === fullPub.id ? fullPub : p) : [fullPub, ...current];
  localStorage.setItem(LS_PUBLICATIONS, JSON.stringify(updated));
  return fullPub.id;
}

export function subscribePublications(callback: (pubs: LegalPublication[]) => void) {
  if (db) {
    try {
      const q = query(collection(db, PUBLICATIONS_COL));
      return onSnapshot(q, (snapshot) => {
        const list: LegalPublication[] = [];
        snapshot.forEach((doc) => {
          const d = doc.data();
          list.push({
            id: doc.id,
            title: d.title || '',
            category: d.category || 'Corporate Insight',
            excerpt: d.excerpt || '',
            content: d.content || '',
            author: d.author || 'Senior Counsel',
            authorRole: d.authorRole || 'Partner',
            date: d.date || 'Recent',
            readTime: d.readTime || '5 min read',
            isFeatured: !!d.isFeatured,
            tags: d.tags || []
          });
        });

        if (list.length === 0) {
          callback(getFromLocalStorageList<LegalPublication>(LS_PUBLICATIONS, initialSeedPublications));
        } else {
          localStorage.setItem(LS_PUBLICATIONS, JSON.stringify(list));
          callback(list);
        }
      }, (err) => {
        console.warn("Pub snapshot error:", err);
        callback(getFromLocalStorageList<LegalPublication>(LS_PUBLICATIONS, initialSeedPublications));
      });
    } catch (e) {
      console.warn("Pub catch:", e);
    }
  }

  callback(getFromLocalStorageList<LegalPublication>(LS_PUBLICATIONS, initialSeedPublications));
  return () => {};
}

// Automated routing logic helper based on practice area and location
export function getAutoRoutedPartner(practiceAreaId: string): string {
  switch (practiceAreaId) {
    case 'corp-law':
      return 'Adv. Barrister M. Fortis (Senior Managing Partner)';
    case 'const-law':
      return 'Adv. Supreme Court Siraaj Khan Fortis (Head of Constitutional Bench)';
    case 'ip-law':
      return 'Adv. Hassan Raza Fortis (Partner - IP & Fintech)';
    case 'banking-fin':
      return 'Adv. Ayesha Fortis (Senior Partner - Banking)';
    case 'tax-law':
      return 'Adv. Zulfiqar Fortis (Head of Tax & Customs)';
    default:
      return 'Senior Duty Litigator - Corporate Desk';
  }
}

// Storage helpers
function getFromLocalStorageList<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function saveToLocalStorageList<T>(key: string, item: T): void {
  try {
    const current = getFromLocalStorageList<T>(key, []);
    localStorage.setItem(key, JSON.stringify([item, ...current]));
  } catch (e) {
    console.warn("LS save error:", e);
  }
}
