import React, { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_ORGANIZER = {
  id: 'org_priya_01',
  name: 'Priya Mehta',
  role: 'Head of Competitions & Partnerships',
  email: 'priya.mehta@innovatehub.org',
  phone: '+880 1800 000000',
  avatar: 'P',
  organizationName: 'InnovateHub Foundation',
  organizationType: 'Non-Profit Organization',
  contactPerson: 'Priya Mehta',
  website: 'https://innovatehub.org',
  facebook: 'https://facebook.com/innovatehub',
  linkedin: 'https://linkedin.com/company/innovatehub',
  instagram: 'https://instagram.com/innovatehub',
  twitter: 'https://x.com/innovatehub',
  location: 'Dhaka, Bangladesh',
  description: 'InnovateHub Foundation empowers ambitious students and young innovators by bridging the gap between talent, real-world industry problems, and venture capital opportunities.',
  verified: true,
  memberSince: 'January 2024',
  totalReach: '180,000+'
};

const INITIAL_COMPETITIONS = [
  {
    id: 'comp-1',
    title: 'InnoSpark Hackathon 2025',
    category: 'Technology',
    eventType: 'Hybrid',
    status: 'Published',
    registrationOpens: '2025-08-01',
    deadline: '20 Aug 2025',
    eventDate: '6 Sept 2025',
    bookmarks: 342,
    lastUpdated: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'A premier 36-hour hybrid hackathon focusing on AI agents, renewable tech, and next-gen developer tools.',
    fullDescription: 'InnoSpark Hackathon 2025 brings together over 1,500 builders, designers, and engineers across the globe. Compete for major incubation grants, mentorship from industry leaders, and launch-ready backing.\n\nParticipants will build functional prototypes, receive real-time technical feedback from veteran judges, and pitch live to seed investors.',
    educationLevels: ['University', 'College', 'Graduate'],
    participationType: 'Team',
    minTeamSize: 2,
    maxTeamSize: 4,
    eligibilityRules: 'Open to actively enrolled undergraduate/graduate students and recent alumni (graduated within 12 months). Valid student or institutional ID required upon final verification.',
    location: 'Innovation Hub Auditorium (Dhaka) & Global Discord Stage',
    prizes: '1st Place: $5,000 + Incubation Support\n2nd Place: $2,500 + Fast-track Interview\n3rd Place: $1,000\nCategory Track Winners: $500 each',
    rules: '1. All project code and design assets must be created during the official hackathon window.\n2. Open source libraries and public AI models are permitted with proper attribution.\n3. Plagiarism or pre-existing products will lead to instant disqualification.\n4. Teams must adhere to the Catalyst Code of Conduct.',
    timeline: [
      { stage: 'Registration Opens', date: 'August 1, 2025', desc: 'Team applications open worldwide' },
      { stage: 'Submission Deadline', date: 'August 20, 2025', desc: 'Concept proposals & registration close' },
      { stage: 'Shortlisting', date: 'August 28, 2025', desc: 'Top 30 teams advance to final round' },
      { stage: 'Final Round', date: 'September 6, 2025', desc: '36-hour live hackathon & judging' },
      { stage: 'Winner Announcement', date: 'September 8, 2025', desc: 'Global awards ceremony & demos' }
    ],
    registrationUrl: 'https://innovatehub.org/register/innospark',
    contactEmail: 'hackathon@innovatehub.org',
    additionalContact: 'Discord: discord.gg/innospark | WhatsApp: +880 1800 000000'
  },
  {
    id: 'comp-2',
    title: 'CaseX Business Challenge 2025',
    category: 'Case Competition',
    eventType: 'Offline',
    status: 'Published',
    registrationOpens: '2025-08-10',
    deadline: '1 Sept 2025',
    eventDate: '18 Oct 2025',
    bookmarks: 218,
    lastUpdated: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'National level business strategy case competition tackling sustainable supply chain disruptions.',
    fullDescription: 'CaseX 2025 is designed to challenge the analytical and strategic acumen of future business leaders. Solve live corporate cases crafted by Fortune 500 executives.',
    educationLevels: ['University', 'Graduate'],
    participationType: 'Team',
    minTeamSize: 3,
    maxTeamSize: 4,
    eligibilityRules: 'Open to current business school undergraduate and MBA students.',
    location: 'Grand Ballroom, Pan Pacific Sonargaon, Dhaka',
    prizes: 'Champion: ৳2,00,000\n1st Runner-up: ৳1,00,000\n2nd Runner-up: ৳50,000',
    rules: 'Solutions must be submitted in standard 10-slide deck format. Case embargo strictly enforced until case release date.',
    timeline: [
      { stage: 'Registration Opens', date: 'August 10, 2025', desc: 'CaseX portal registration opens' },
      { stage: 'Case Release', date: 'September 1, 2025', desc: 'Case prompt distributed to all teams' },
      { stage: 'Round 1 Submission', date: 'September 15, 2025', desc: 'Slide deck submission' },
      { stage: 'Grand Finale', date: 'October 18, 2025', desc: 'In-person pitch to executive panel' }
    ],
    registrationUrl: 'https://casex.org/register',
    contactEmail: 'contact@casex.org',
    additionalContact: 'LinkedIn: /company/casex'
  },
  {
    id: 'comp-3',
    title: 'DesignForward 2025',
    category: 'Design',
    eventType: 'Online',
    status: 'Published',
    registrationOpens: '2025-08-15',
    deadline: '15 Sept 2025',
    eventDate: '1 Oct 2025',
    bookmarks: 421,
    lastUpdated: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Product design sprint for reimagining accessibility and frictionless micro-interactions.',
    fullDescription: 'A 48-hour global UI/UX design sprint focusing on inclusive and accessible digital experiences. Create Figma prototypes and design systems evaluated by leading design directors.',
    educationLevels: ['Open to All'],
    participationType: 'Individual',
    minTeamSize: 1,
    maxTeamSize: 1,
    eligibilityRules: 'Open to all digital designers, students, and self-taught creatives worldwide.',
    location: 'Online / Figma Community',
    prizes: 'Winner: $3,000 + 1 Year Figma Enterprise License + Apple Studio Display\nRunner-up: $1,500',
    rules: 'Submissions must include interactive Figma link and a 2-minute Loom walkthrough.',
    timeline: [
      { stage: 'Registration Opens', date: 'August 15, 2025', desc: 'Early bird registration' },
      { stage: 'Submission Deadline', date: 'September 15, 2025', desc: 'Registration closes' },
      { stage: 'Design Sprint', date: 'October 1, 2025', desc: '48-hour design challenge' }
    ],
    registrationUrl: 'https://designforward.io',
    contactEmail: 'hello@designforward.io',
    additionalContact: 'Twitter: @DesignForward'
  },
  {
    id: 'comp-4',
    title: 'EcoVenture Pitch 2025',
    category: 'Entrepreneurship',
    eventType: 'Hybrid',
    status: 'Draft',
    registrationOpens: '2025-09-01',
    deadline: '5 Oct 2025',
    eventDate: '2 Nov 2025',
    bookmarks: 89,
    lastUpdated: '4 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Climate tech and circular economy venture pitch for pre-seed founders.',
    fullDescription: 'EcoVenture connects climate innovators with angel investors, sustainability funds, and research grants.',
    educationLevels: ['University', 'Graduate', 'Open to All'],
    participationType: 'Team',
    minTeamSize: 2,
    maxTeamSize: 5,
    eligibilityRules: 'Startups must have a functional MVP and clear climate/sustainability metrics.',
    location: 'Bengal Carbon Lab & Zoom',
    prizes: 'Seed Grant: ৳5,00,000 equity-free\nIncubation at GreenTech Valley',
    rules: 'Must be early stage (under $50k total external funding raised).',
    timeline: [
      { stage: 'Registration Opens', date: 'September 1, 2025', desc: 'Pitch deck submissions open' },
      { stage: 'Deadline', date: 'October 5, 2025', desc: 'Submissions close' },
      { stage: 'Pitch Day', date: 'November 2, 2025', desc: 'Demo day to 20+ VCs' }
    ],
    registrationUrl: 'https://ecoventure.org',
    contactEmail: 'pitch@ecoventure.org',
    additionalContact: 'Phone: +880 1711 000111'
  },
  {
    id: 'comp-5',
    title: 'AlgoArena Programming Contest',
    category: 'Programming',
    eventType: 'Online',
    status: 'Closed',
    registrationOpens: '2025-06-01',
    deadline: '10 Jul 2025',
    eventDate: '25 Jul 2025',
    bookmarks: 178,
    lastUpdated: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Competitive ICPC-style programming contest featuring advanced graph and dynamic programming challenges.',
    fullDescription: 'A 5-hour speed algorithmic contest on Codeforces-compatible engine with real-time live scoreboard.',
    educationLevels: ['College', 'University'],
    participationType: 'Individual',
    minTeamSize: 1,
    maxTeamSize: 1,
    eligibilityRules: 'All student coders welcome. Languages supported: C++, Java, Python 3, Rust, Go.',
    location: 'Catalyst Code Platform',
    prizes: '1st: $1,000 | 2nd: $500 | 3rd: $250 | Top 50 get Catalyst T-Shirts',
    rules: 'Standard ICPC penalties apply. Plagiarism detection tools run on all accepted code.',
    timeline: [
      { stage: 'Registration Opens', date: 'June 1, 2025', desc: 'Open for registration' },
      { stage: 'Contest Window', date: 'July 25, 2025', desc: '5-hour live contest' }
    ],
    registrationUrl: 'https://algoarena.org',
    contactEmail: 'algo@catalyst.org',
    additionalContact: ''
  },
  {
    id: 'comp-6',
    title: 'IdeaVault Innovation Challenge',
    category: 'Innovation',
    eventType: 'Online',
    status: 'Draft',
    registrationOpens: '2025-09-15',
    deadline: '20 Oct 2025',
    eventDate: '15 Nov 2025',
    bookmarks: 0,
    lastUpdated: '5 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Open-ended problem solving for civic technology and public service delivery.',
    fullDescription: 'Propose innovative tech architectures to solve public transport, healthcare, and education bottlenecks.',
    educationLevels: ['University', 'College', 'Open to All'],
    participationType: 'Both',
    minTeamSize: 1,
    maxTeamSize: 4,
    eligibilityRules: 'Citizens of Bangladesh or South Asia region.',
    location: 'Catalyst Virtual Arena',
    prizes: 'Grant: ৳3,00,000 + Pilot project deployment with municipality partners',
    rules: 'Solutions must be open-source or freely usable by civic entities.',
    timeline: [
      { stage: 'Call for Proposals', date: 'September 15, 2025', desc: 'Idea submission starts' },
      { stage: 'Deadline', date: 'October 20, 2025', desc: 'Proposals due' }
    ],
    registrationUrl: 'https://ideavault.org',
    contactEmail: 'ideas@ideavault.org',
    additionalContact: ''
  },
  {
    id: 'comp-7',
    title: 'ScienceOlympiad 2024 — National Round',
    category: 'Olympiad',
    eventType: 'Offline',
    status: 'Closed',
    registrationOpens: '2024-08-01',
    deadline: '30 Sept 2024',
    eventDate: '10 Nov 2024',
    bookmarks: 267,
    lastUpdated: '6 months ago',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'National theoretical physics, chemistry, and mathematics championship for high school students.',
    fullDescription: 'The premier national scientific olympiad selecting international olympiad team representatives.',
    educationLevels: ['School', 'College'],
    participationType: 'Individual',
    minTeamSize: 1,
    maxTeamSize: 1,
    eligibilityRules: 'Students enrolled in Class 9-12 or O/A Levels.',
    location: 'Curzon Hall, University of Dhaka',
    prizes: 'Gold, Silver, Bronze Medals + National Team training camp invitation',
    rules: 'Non-programmable scientific calculators only. Strict test conditions.',
    timeline: [
      { stage: 'Registration', date: 'August 1, 2024', desc: 'School nominations' },
      { stage: 'National Exam', date: 'November 10, 2024', desc: 'Written paper' }
    ],
    registrationUrl: 'https://scienceolympiad.bd',
    contactEmail: 'info@scienceolympiad.bd',
    additionalContact: ''
  },
  {
    id: 'comp-8',
    title: 'BizPlan National 2025',
    category: 'Business',
    eventType: 'Hybrid',
    status: 'Draft',
    registrationOpens: '2025-09-20',
    deadline: '1 Nov 2025',
    eventDate: '5 Dec 2025',
    bookmarks: 0,
    lastUpdated: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Comprehensive business model and feasibility competition for high-growth sectors.',
    fullDescription: 'Test your startup plan against rigorous financial modeling, market sizing, and unit economics standards.',
    educationLevels: ['University', 'Graduate'],
    participationType: 'Team',
    minTeamSize: 2,
    maxTeamSize: 4,
    eligibilityRules: 'Undergraduate and Master students with un-incorporated or early-stage ventures.',
    location: 'Hybrid (Dhaka & Virtual)',
    prizes: 'Pool: ৳3,50,000 + 6 Months Co-working space pass',
    rules: 'Financial pro-forma and business model canvas required in Round 2.',
    timeline: [
      { stage: 'Registration Opens', date: 'September 20, 2025', desc: 'Phase 1 begins' },
      { stage: 'Deadline', date: 'November 1, 2025', desc: 'Pitch decks due' }
    ],
    registrationUrl: 'https://bizplan.org',
    contactEmail: 'bizplan@catalyst.org',
    additionalContact: ''
  }
];

const OrganizerContext = createContext(null);

export const OrganizerProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('catalyst_organizer_auth');
    return saved !== null ? JSON.parse(saved) : true; // default logged in for organizer experience
  });

  // Organizer Profile State
  const [organizer, setOrganizer] = useState(() => {
    const saved = localStorage.getItem('catalyst_organizer_profile');
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZER;
  });

  // Competitions List State
  const [competitions, setCompetitions] = useState(() => {
    const saved = localStorage.getItem('catalyst_competitions');
    return saved ? JSON.parse(saved) : INITIAL_COMPETITIONS;
  });

  // UI Toast notification state
  const [toast, setToast] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('catalyst_organizer_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('catalyst_organizer_profile', JSON.stringify(organizer));
  }, [organizer]);

  useEffect(() => {
    localStorage.setItem('catalyst_competitions', JSON.stringify(competitions));
  }, [competitions]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // CRUD Operations
  const createCompetition = (data, status = 'Draft') => {
    const newComp = {
      ...data,
      id: `comp-${Date.now()}`,
      status,
      bookmarks: 0,
      lastUpdated: 'Just now',
      thumbnail: data.thumbnail || data.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      banner: data.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    };

    setCompetitions(prev => [newComp, ...prev]);
    showToast(status === 'Published' ? 'Competition published successfully!' : 'Competition saved as draft!');
    return newComp;
  };

  const updateCompetition = (id, updatedFields) => {
    setCompetitions(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields, lastUpdated: 'Just now' } : c))
    );
    showToast('Competition updated successfully!');
  };

  const deleteCompetition = (id) => {
    setCompetitions(prev => prev.filter(c => c.id !== id));
    showToast('Competition deleted.', 'info');
  };

  const toggleCompetitionStatus = (id, newStatus) => {
    setCompetitions(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus, lastUpdated: 'Just now' } : c))
    );
    showToast(`Status changed to ${newStatus}`);
  };

  const duplicateCompetition = (id) => {
    const source = competitions.find(c => c.id === id);
    if (!source) return;
    const duplicated = {
      ...source,
      id: `comp-${Date.now()}`,
      title: `${source.title} (Copy)`,
      status: 'Draft',
      bookmarks: 0,
      lastUpdated: 'Just now'
    };
    setCompetitions(prev => [duplicated, ...prev]);
    showToast('Competition duplicated as Draft!');
  };

  const updateProfile = (updatedProfile) => {
    setOrganizer(prev => ({ ...prev, ...updatedProfile }));
    showToast('Organization profile saved successfully!');
  };

  const registerOrganizer = (accountData, token) => {
    const newOrg = {
      ...organizer,
      ...accountData,
      organizationName: accountData.organizationName || organizer.organizationName || 'New Organization',
      organizationType: accountData.organizationType || organizer.organizationType || 'Organization',
      contactPerson: accountData.contactPerson || organizer.contactPerson || 'Contact Person',
      name: accountData.contactPerson || organizer.name || 'Organizer',
      phone: accountData.phone || '',
      email: accountData.email || '',
      website: accountData.website || '',
      description: accountData.description || '',
      verified: true
    };
    if (token) {
      localStorage.setItem('organizer_token', token);
    }
    setOrganizer(newOrg);
    setIsAuthenticated(true);
    showToast('Organizer application submitted and account created!');
  };

  const login = (organizerData, token) => {
    if (organizerData) {
      const updatedOrg = {
        ...organizer,
        ...organizerData,
        name: organizerData.contactPerson || organizerData.name || organizer.name
      };
      setOrganizer(updatedOrg);
    }
    if (token) {
      localStorage.setItem('organizer_token', token);
    }
    setIsAuthenticated(true);
    showToast('Signed in successfully!');
  };

  const logout = () => {
    localStorage.removeItem('organizer_token');
    setIsAuthenticated(false);
    showToast('Signed out.', 'info');
  };

  // Calculated Stats
  const publishedCount = competitions.filter(c => c.status === 'Published').length;
  const draftCount = competitions.filter(c => c.status === 'Draft').length;
  const totalBookmarks = competitions.reduce((acc, c) => acc + (c.bookmarks || 0), 0);
  const upcomingEventsCount = competitions.filter(c => c.status === 'Published' || c.status === 'Draft').length;

  return (
    <OrganizerContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        organizer,
        competitions,
        publishedCount,
        draftCount,
        totalBookmarks,
        upcomingEventsCount,
        createCompetition,
        updateCompetition,
        deleteCompetition,
        toggleCompetitionStatus,
        duplicateCompetition,
        updateProfile,
        registerOrganizer,
        login,
        logout,
        toast,
        showToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3 bg-[#162127] border border-[#3a3534] text-[#e8dfd0] px-4 py-3 rounded-xl shadow-2xl">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'info' ? 'bg-[#cf9d7b]' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </OrganizerContext.Provider>
  );
};

export const useOrganizer = () => {
  const context = useContext(OrganizerContext);
  if (!context) {
    throw new Error('useOrganizer must be used within an OrganizerProvider');
  }
  return context;
};
