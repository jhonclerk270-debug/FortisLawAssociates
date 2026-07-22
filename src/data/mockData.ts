import { PracticeArea, SeniorPartner, OfficeLocation, CorporateClient, ClientTestimonial } from '../types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'corp-law',
    title: 'Corporate Law, Mergers & Advisory',
    category: 'Corporate',
    shortDesc: 'Structuring cross-border joint ventures, SECP regulatory filings, foreign direct investments, and high-value corporate restructuring.',
    fullDesc: 'Our Corporate & Commercial practice is internationally recognized for advising conglomerates, financial institutions, and business entities on complex M&A, cross-border investments, corporate governance, and regulatory compliance under SECP and Board of Investment frameworks.',
    keyServices: [
      'Mergers, Acquisitions & Joint Ventures',
      'SECP Incorporation & Compliance Filings',
      'Cross-Border Private Equity & Venture Capital',
      'Competition Commission of Pakistan (CCP) Filings',
      'Corporate Governance & Director Liability'
    ],
    relevantStatutes: [
      'Companies Act, 2017',
      'Competition Act, 2010',
      'Foreign Private Investment (Promotion and Protection) Act'
    ],
    leadPartner: 'Adv. Barrister M. Fortis',
    caseCount: '350+ Transactions Closed',
    badge: 'Chambers Tier 1 Ranked'
  },
  {
    id: 'const-law',
    title: 'Constitutional & Administrative Disputes',
    category: 'Constitutional',
    shortDesc: 'High-stakes Supreme Court & High Court writ litigation challenging arbitrary administrative regulations and fundamental rights enforcement.',
    fullDesc: 'Advocating before the Supreme Court of Pakistan and provincial High Courts in milestone constitutional writ petitions, public interest litigation, regulatory challenges against statutory bodies, and statutory interpretations.',
    keyServices: [
      'Article 199 High Court Writ Petitions',
      'Supreme Court Appellate & Advisory Practice',
      'Regulatory Authority Orders Challenges (NEPRA, OGRA, PTA)',
      'Public Procurement & Bidding Disputes (PPRA)',
      'Human Rights & Fundamental Rights Injunctions'
    ],
    relevantStatutes: [
      'Constitution of Pakistan, 1973',
      'Public Procurement Regulatory Authority (PPRA) Rules',
      'Civil Procedure Code (CPC), 1908'
    ],
    leadPartner: 'Adv. Supreme Court Siraaj Khan Fortis',
    caseCount: '120+ High Court Judgments',
    badge: 'Supreme Court Advocate'
  },
  {
    id: 'ip-law',
    title: 'Intellectual Property, Patents & Tech',
    category: 'IP',
    shortDesc: 'Comprehensive patent prosecution, trademark portfolio defense, software copyright, and trade secret protection across global jurisdictions.',
    fullDesc: 'Protecting corporate innovation across technology, pharmaceuticals, digital platforms, and manufacturing sectors through IPO Pakistan prosecution, anti-counterfeiting enforcement, WIPO domain disputes, and technology licensing contracts.',
    keyServices: [
      'Trademark, Patent & Industrial Design Registrations',
      'IPO Appellate Tribunal & High Court IP Infringement Suits',
      'Software Copyright & Proprietary Code Covenants',
      'Anti-Counterfeiting Customs Interventions',
      'Franchise Agreements & Brand Licensing'
    ],
    relevantStatutes: [
      'Trade Marks Ordinance, 2001',
      'Patents Ordinance, 2000',
      'Copyright Ordinance, 1962'
    ],
    leadPartner: 'Adv. Hassan Raza Fortis',
    caseCount: '800+ IP Registrations',
    badge: 'WIPO & IPO Specialist'
  },
  {
    id: 'banking-fin',
    title: 'Banking, Islamic Finance & FinTech',
    category: 'Banking',
    shortDesc: 'Syndicated loan structuring, State Bank of Pakistan digital banking licenses, recovery suits, and Sukuk bond issuance.',
    fullDesc: 'Advising commercial banks, microfinance institutions, and digital wallet platforms on State Bank of Pakistan (SBP) prudential regulations, project finance, loan syndication, Islamic Shariah-compliant financing instruments, and Banking Court recovery litigation.',
    keyServices: [
      'SBP Electronic Money Institution (EMI) Licensing',
      'Syndicated Project Finance & Debt Restructuring',
      'Islamic Sukuk & Murabaha Contract Structuring',
      'Banking Court Recovery Suits & Financial Enforcement',
      'Fintech Regulatory Sandbox Compliance'
    ],
    relevantStatutes: [
      'Banking Companies Ordinance, 1962',
      'Financial Institutions (Recovery of Finances) Ordinance, 2001',
      'State Bank of Pakistan Act, 1956'
    ],
    leadPartner: 'Adv. Ayesha Fortis',
    caseCount: '$1.8B Financial Structuring',
    badge: 'SBP Regulatory Expert'
  },
  {
    id: 'tax-law',
    title: 'Taxation, Customs & Transfer Pricing',
    category: 'Tax',
    shortDesc: 'Federal Board of Revenue (FBR) tax litigation, Appellate Tribunal representation, corporate sales tax, and transfer pricing audit defense.',
    fullDesc: 'Representing multinational corporations and high-net-worth individuals before FBR assessment authorities, Appellate Tribunal Inland Revenue, and High Courts in income tax, sales tax, customs valuation, and double taxation treaty interpretations.',
    keyServices: [
      'FBR Tax Audit & Notice Defenses',
      'Appellate Tribunal Inland Revenue (ATIR) Appeals',
      'Customs Valuation & Smuggling Defense Litigation',
      'Double Tax Avoidance Agreement (DTAA) Advisory',
      'Sales Tax on Services (SRB, PRA, BRA, KPRA) Compliance'
    ],
    relevantStatutes: [
      'Income Tax Ordinance, 2001',
      'Sales Tax Act, 1990',
      'Customs Act, 1969'
    ],
    leadPartner: 'Adv. Zulfiqar Fortis',
    caseCount: '450+ FBR Tribunal Matters',
    badge: 'FBR Appellate Counsel'
  },
  {
    id: 'dispute-res',
    title: 'International Arbitration & Commercial Litigation',
    category: 'Dispute',
    shortDesc: 'ICC, LCIA, and domestic commercial arbitration alongside high-stakes civil and contractual breach litigation.',
    fullDesc: 'Resolving multi-million dollar commercial conflicts through domestic and international arbitration under ICC, LCIA, and ICSID rules, supplemented by expedited injunctions in High Courts to protect commercial assets.',
    keyServices: [
      'ICC / LCIA / ICSID Commercial Arbitration',
      'Arbitration Award Enforcement & Challenge Suits',
      'Shareholder & Commercial Contract Breach Litigation',
      'Infrastructure & EPC Construction Disputes',
      'Mediation & Pre-Litigation Settlement Negotiations'
    ],
    relevantStatutes: [
      'Arbitration Act, 1940',
      'Recognition and Enforcement (Arbitration Agreements and Foreign Arbitral Awards) Act',
      'Specific Relief Act, 1877'
    ],
    leadPartner: 'Adv. Barrister M. Fortis',
    caseCount: '98.6% Litigation Success',
    badge: 'LCIA Registered Arbitrator'
  }
];

export const SENIOR_PARTNERS: SeniorPartner[] = [
  {
    id: 'partner-1',
    name: 'Adv. Barrister M. Fortis',
    title: 'Senior Managing Partner & Lead Counsel',
    supremeCourtStatus: 'Advocate Supreme Court of Pakistan (ASC)',
    experienceYears: 28,
    practiceSpecialties: ['Corporate M&A', 'Constitutional Law', 'International Arbitration'],
    education: [
      'LL.M. (Master of Laws) - Harvard Law School',
      'Barrister-at-Law - Lincoln’s Inn, London',
      'LL.B. (Hons) - University of London'
    ],
    bio: 'Senior managing partner at Fortis Law Associates. Has represented multinational corporations, federal entities, and financial institutions in landmark Supreme Court judgments.',
    landmarkCases: [
      'Federal Power Conglomerate v. Federation of Pakistan (Supreme Court landmark on tariff sovereignty)',
      'Telecom Spectrum Auction Regulatory Review (High Court stay judgment)',
      'Cross-Border $120M Sovereign Energy Sukuk Structuring'
    ],
    email: 'fortislaw313@gmail.com',
    phone: '03080291021',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'partner-2',
    name: 'Adv. Siraaj Khan Fortis',
    title: 'Head of Constitutional & Regulatory Litigation',
    supremeCourtStatus: 'Advocate Supreme Court of Pakistan (ASC)',
    experienceYears: 22,
    practiceSpecialties: ['Constitutional Writs', 'Public Procurement', 'Energy & Petroleum'],
    education: [
      'LL.M. in Public International Law - University of Cambridge',
      'LL.B. (Hons) - Punjab University Law College'
    ],
    bio: 'Lead counsel for energy sector infrastructure litigation and regulatory enforcement at Fortis Law Associates.',
    landmarkCases: [
      'State Bank Regulatory Challenge on Digital Banking (Sindh High Court)',
      'National Oil Refinery Distribution Tariff Injunction (High Court)'
    ],
    email: 'fortislaw313@gmail.com',
    phone: '03080291021',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'partner-3',
    name: 'Adv. Hassan Raza Fortis',
    title: 'Partner - Intellectual Property, Tech & FinTech',
    supremeCourtStatus: 'Advocate High Court (AHC) & IP Specialist',
    experienceYears: 18,
    practiceSpecialties: ['Intellectual Property', 'FinTech & Cryptography Law', 'Cross-Border Licensing'],
    education: [
      'LL.M. in Intellectual Property & Tech Law - King’s College London',
      'B.Sc. Computer Science & Law - LUMS'
    ],
    bio: 'Pioneer in technology law at Fortis Law Associates. Author of reference works on software patents, electronic transactions, and domain dispute arbitration.',
    landmarkCases: [
      'Global Pharmaceutical Patent Infringement Bench Defense (Sindh High Court)',
      'National E-Wallet Payment Gateway SBP Authorization Framework'
    ],
    email: 'fortislaw313@gmail.com',
    phone: '03080291021',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'partner-4',
    name: 'Adv. Ayesha Fortis',
    title: 'Senior Partner - Banking & Corporate Advisory',
    supremeCourtStatus: 'Advocate Supreme Court of Pakistan (ASC)',
    experienceYears: 20,
    practiceSpecialties: ['Banking & Islamic Finance', 'Securities & SECP', 'Employment & Labor'],
    education: [
      'LL.M. Commercial Law - London School of Economics (LSE)',
      'Advocate Supreme Court Enrollment'
    ],
    bio: 'Specializing in syndicated banking finance, Islamic Shariah Sukuk structures, and executive employment governance at Fortis Law Associates.',
    landmarkCases: [
      '$450M Consortium Hydroelectric Project Finance Guarantee',
      'SECP Director Disqualification Defense Appellate Bench'
    ],
    email: 'fortislaw313@gmail.com',
    phone: '03080291021',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'fareed-chambers',
    city: 'Karachi',
    officeName: 'Fortis Law Associates Chambers',
    address: 'Fareed Chambers 3rd Floor, Abdullah Haroon Road, Saddar, Karachi',
    phone: '03080291021',
    emergencyHotline: '03080291021',
    email: 'fortislaw313@gmail.com',
    managingPartner: 'Adv. Barrister M. Fortis',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.21!2d67.025!3d24.855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e1000000001%3A0x1!2sFareed%20Chambers%2C%20Abdullah%20Haroon%20Rd%2C%20Saddar%2C%20Karachi!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk',
    operatingHours: 'Mon - Sat: 09:00 AM - 07:00 PM'
  }
];

export const CORPORATE_CLIENTS: CorporateClient[] = [
  {
    id: 'c-1',
    name: 'Habib Bank Group',
    sector: 'Banking & Financial Services',
    badge: 'Retained Lead Counsel',
    description: 'Advising on cross-border syndicated financing and State Bank regulatory compliance.'
  },
  {
    id: 'c-2',
    name: 'Jazz Telecom (VEON)',
    sector: 'Telecommunications & Infrastructure',
    badge: 'Regulatory & License Advisory',
    description: 'Represented in spectrum allocation disputes and tower infrastructure leases.'
  },
  {
    id: 'c-3',
    name: 'Engro Energy Conglomerate',
    sector: 'Energy & Power Generation',
    badge: 'NEPRA & EPC Contract Counsel',
    description: 'Structured $600M IPP power purchase agreements and environmental tribunal defense.'
  },
  {
    id: 'c-4',
    name: 'Standard Chartered Bank',
    sector: 'International Commercial Banking',
    badge: 'Banking Recovery Suits',
    description: 'Lead representation in high-value commercial recovery proceedings in High Court.'
  },
  {
    id: 'c-5',
    name: 'Novartis Pharmaceuticals',
    sector: 'Healthcare & Biotech',
    badge: 'Patent & IP Enforcement',
    description: 'Prosecuting pharmaceutical patents and defending against generic infringement.'
  },
  {
    id: 'c-6',
    name: 'Airblue Airlines',
    sector: 'Aviation & Transportation',
    badge: 'Aircraft Leasing & Regulatory',
    description: 'Advising on CAA air operator certificates and cross-border aircraft dry-lease contracts.'
  }
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 't-1',
    clientName: 'Shahid Farooq',
    company: 'Metropolitan Energy Infrastructure',
    designation: 'Chief Executive Officer',
    rating: 5,
    text: 'Fortis Law Associates represented our consortium in a $85M energy arbitration before the High Court and NEPRA tribunal. Their legal acumen and strategic foresight secured an absolute ruling in our favor.',
    date: 'June 2026',
    verified: true,
    practiceArea: 'Energy & Dispute Resolution'
  },
  {
    id: 't-2',
    clientName: 'Fatima Zahra',
    company: 'FinX Digital Payments',
    designation: 'General Counsel & VP',
    rating: 5,
    text: 'Fortis Law Associates guided us through the complex State Bank EMI licensing process smoothly. Their grasp of technology law, sandbox compliance, and fintech regulations is outstanding.',
    date: 'May 2026',
    verified: true,
    practiceArea: 'FinTech & Intellectual Property'
  },
  {
    id: 't-3',
    clientName: 'Kamran Al-Thani',
    company: 'Gulf Horizon Private Equity',
    designation: 'Managing Director',
    rating: 5,
    text: 'During our cross-border acquisition of a national logistics network, Fortis Law Associates handled due diligence, SECP clearances, and competition law filings flawlessly.',
    date: 'April 2026',
    verified: true,
    practiceArea: 'Corporate M&A'
  },
  {
    id: 't-4',
    clientName: 'Engr. Zohaib Aslam',
    company: 'Apex Industrial Synthetics',
    designation: 'Director Operations',
    rating: 5,
    text: 'When our company received an arbitrary tax demand, Fortis Law Associates secured an immediate stay order at the High Court Appellate bench. Irreplaceable legal partner.',
    date: 'March 2026',
    verified: true,
    practiceArea: 'Taxation & FBR Litigation'
  }
];

export const TRUST_BADGES = [
  { name: 'Chambers & Partners', detail: 'Tier 1 Corporate & Dispute Resolution' },
  { name: 'The Legal 500', detail: 'Top Tier Leading Law Firm in Asia Pacific' },
  { name: 'IFLR1000', detail: 'Highly Recommended Financial & Corporate Firm' },
  { name: 'AsiaLaw Profiles', detail: 'Outstanding Law Firm for Commercial Litigation' },
  { name: 'Supreme Court Bar Association', detail: 'Senior Advocates of Supreme Court Enrolled' }
];
